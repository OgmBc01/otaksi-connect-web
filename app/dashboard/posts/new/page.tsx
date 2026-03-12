'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import RichTextEditor from '@/components/dashboard/RichTextEditor'
import ImageUploader from '@/components/dashboard/ImageUploader'

type Category = {
  id: string
  name: string
  slug: string
}

type Tag = {
  id: string
  name: string
  slug: string
}

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [published, setPublished] = useState(false)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchCategoriesAndTags()
    generateSlug()
  }, [title])

  const fetchCategoriesAndTags = async () => {
    const [categoriesRes, tagsRes] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('tags').select('*').order('name'),
    ])

    if (categoriesRes.data) setCategories(categoriesRes.data)
    if (tagsRes.data) setTags(tagsRes.data)
  }

  const generateSlug = () => {
    if (title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      )
    }
  }

  const handleSave = async (publish: boolean) => {
    if (!title || !content) {
      alert('Please add a title and content')
      return
    }

    setSaving(true)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/dashboard/login')
      return
    }

    // Ensure author exists in authors table
    const { data: author, error: authorError } = await supabase
      .from('authors')
      .select('*')
      .eq('id', user.id)
      .single()
    if (authorError || !author) {
      // Insert author if not exists (only columns that exist in schema)
      const { error: insertAuthorError } = await supabase
        .from('authors')
        .insert([
          {
            id: user.id,
            display_name: user.user_metadata?.name || user.email,
            avatar_url: user.user_metadata?.avatar_url || null,
            role: 'author',
            // bio, created_at, updated_at are optional and can be omitted
          },
        ])
      if (insertAuthorError) {
        alert('Failed to create author profile: ' + (insertAuthorError.message || JSON.stringify(insertAuthorError)))
        setSaving(false)
        return
      }
    }

    const postData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      featured_image: featuredImage,
      author_id: user.id,
      category_id: categoryId || null,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt || content.substring(0, 160),
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post: ' + (error.message || JSON.stringify(error)))
      setSaving(false)
      return
    }

    // Add tags
    if (selectedTags.length > 0) {
      await supabase
        .from('post_tags')
        .insert(
          selectedTags.map(tagId => ({
            post_id: post.id,
            tag_id: tagId,
          }))
        )
    }

    setSaving(false)
    router.push('/dashboard/posts')
  }

  return (
    <div className="relative p-8 min-h-screen">
      {/* Mesh-like, faddy, subtle gradient overlay */}
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2 text-midnight"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              Create New
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]"> Post</span>
            </h1>
            <p className="text-gray-500">Write and publish your blog post</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 bg-midnight border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="glass-card p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white text-xl placeholder:text-gray-500"
                placeholder="Enter post title"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="glass-card p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            {/* Excerpt */}
            <div className="glass-card p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white resize-none placeholder:text-gray-500"
                placeholder="Brief summary of your post (optional)"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="glass-card p-6">
              <h3 className="font-medium text-white mb-4">Featured Image</h3>
              <ImageUploader
                onImageUploaded={(url) => setFeaturedImage(url)}
                currentImage={featuredImage}
              />
            </div>

            {/* Category */}
            <div className="glass-card p-6">
              <h3 className="font-medium text-white mb-4">Category</h3>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-midnight border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white placeholder:text-gray-500"
              >
                <option value="" className="bg-midnight">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-midnight">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="glass-card p-6">
              <h3 className="font-medium text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag.id)
                          ? prev.filter(id => id !== tag.id)
                          : [...prev, tag.id]
                      )
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedTags.includes(tag.id)
                        ? 'bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                        : 'bg-midnight text-gray-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="glass-card p-6">
              <h3 className="font-medium text-white mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-midnight border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white text-sm placeholder:text-gray-500"
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-midnight border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white text-sm resize-none placeholder:text-gray-500"
                    placeholder="SEO description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}