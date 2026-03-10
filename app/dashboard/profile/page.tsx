'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Profile = {
  id: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  role: 'admin' | 'editor' | 'author'
  created_at: string
  email?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
  })
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  })
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      router.push('/dashboard/login')
      return
    }

    // Get profile from authors table
    const { data: profileData, error: profileError } = await supabase
      .from('authors')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError)
    }

    // If profile doesn't exist, create one
    if (!profileData) {
      const { data: newProfile, error: createError } = await supabase
        .from('authors')
        .insert([{
          id: user.id,
          display_name: user.email?.split('@')[0] || 'User',
          role: 'author',
        }])
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
      } else {
        setProfile({
          ...newProfile,
          email: user.email,
        })
        setFormData({
          display_name: newProfile.display_name,
          bio: newProfile.bio || '',
        })
      }
    } else {
      setProfile({
        ...profileData,
        email: user.email,
      })
      setFormData({
        display_name: profileData.display_name,
        bio: profileData.bio || '',
      })
    }

    // Fetch author stats
    const { count: totalPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', user.id)

    const { count: publishedPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', user.id)
      .eq('published', true)

    const { count: draftPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', user.id)
      .eq('published', false)

    const { data: viewsData } = await supabase
      .from('posts')
      .select('view_count')
      .eq('author_id', user.id)

    const totalViews = viewsData?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0

    setStats({
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      draftPosts: draftPosts || 0,
      totalViews,
    })

    setLoading(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${profile.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      alert('Failed to upload avatar')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath)

    // Update profile with new avatar
    const { error: updateError } = await supabase
      .from('authors')
      .update({ avatar_url: publicUrl })
      .eq('id', profile.id)

    if (updateError) {
      console.error('Error updating avatar:', updateError)
      alert('Failed to update avatar')
    } else {
      setProfile({ ...profile, avatar_url: publicUrl })
    }

    setUploading(false)
  }

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)

    const { error } = await supabase
      .from('authors')
      .update({
        display_name: formData.display_name,
        bio: formData.bio || null,
      })
      .eq('id', profile.id)

    if (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } else {
      setProfile({
        ...profile,
        display_name: formData.display_name,
        bio: formData.bio || null,
      })
      setEditMode(false)
    }

    setSaving(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/dashboard/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-clash)' }}>
          Profile
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Settings</span>
        </h1>
        <p className="text-gray-400">Manage your personal information and account settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Stats */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-medium text-white mb-4">Profile Picture</h3>
            
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/20 transition-all">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.display_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                      <span className="text-4xl text-white">
                        {profile?.display_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Overlay */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full"
                >
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </label>
              </div>

              <p className="text-sm text-gray-400 text-center">
                Click to upload a new avatar
              </p>
              <p className="text-xs text-gray-600 mt-1">
                JPG, PNG, GIF up to 2MB
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-medium text-white mb-4">Author Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Posts</span>
                <span className="text-2xl font-bold gradient-text">{stats.totalPosts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Published</span>
                <span className="text-lg text-green-500">{stats.publishedPosts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Drafts</span>
                <span className="text-lg text-yellow-500">{stats.draftPosts}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-gray-400">Total Views</span>
                <span className="text-2xl font-bold gradient-text">{stats.totalViews}</span>
              </div>
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-medium text-white mb-4">Account</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="text-xl">📧</span>
                <span className="text-sm text-gray-400">{profile?.email}</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="text-xl">🎭</span>
                <span className="text-sm text-gray-400 capitalize">Role: {profile?.role}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="text-xl">📅</span>
                <span className="text-sm text-gray-400">
                  Member since {new Date(profile?.created_at || '').toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full mt-4 px-4 py-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-white">Personal Information</h3>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditMode(false)
                      setFormData({
                        display_name: profile?.display_name || '',
                        bio: profile?.bio || '',
                      })
                    }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>

            {editMode ? (
              <div className="space-y-6">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                    placeholder="Your name"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.bio.length}/500 characters
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Display Name - View Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Display Name
                  </label>
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white">
                    {profile?.display_name}
                  </div>
                </div>

                {/* Bio - View Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-gray-300 min-h-[100px] whitespace-pre-wrap">
                    {profile?.bio || 'No bio yet.'}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Feed */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="text-sm text-white">You have {stats.draftPosts} draft posts waiting</p>
                    <p className="text-xs text-gray-500">Finish them to publish</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">👁️</span>
                  <div>
                    <p className="text-sm text-white">Your posts have been viewed {stats.totalViews} times</p>
                    <p className="text-xs text-gray-500">Keep up the great work!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-sm text-white">You've written {stats.totalPosts} posts</p>
                    <p className="text-xs text-gray-500">{stats.publishedPosts} published, {stats.draftPosts} in draft</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}