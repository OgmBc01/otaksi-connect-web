'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  created_at: string
  author: { display_name: string } | null
  category: { name: string; slug: string } | null
  view_count: number
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    setLoading(true)
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:authors(display_name),
        category:categories(name, slug)
      `)
      .order('created_at', { ascending: false })

    if (filter === 'published') {
      query = query.eq('published', true)
    } else if (filter === 'draft') {
      query = query.eq('published', false)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    } else {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .in('id', selectedPosts)

    if (error) {
      console.error('Error deleting posts:', error)
      alert('Failed to delete posts')
    } else {
      setPosts(posts.filter(post => !selectedPosts.includes(post.id)))
      setSelectedPosts([])
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('posts')
      .update({ 
        published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null
      })
      .eq('id', id)

    if (error) {
      console.error('Error toggling publish status:', error)
      alert('Failed to update post')
    } else {
      setPosts(posts.map(post => 
        post.id === id 
          ? { ...post, published: !currentStatus }
          : post
      ))
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative p-8 min-h-screen ">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-clash)' }}>
              Posts
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-gray-600">Manage your blog posts</p>
          </div>
          <Link
            href="/dashboard/posts/new"
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 hover:shadow-md transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <span className="text-lg">+</span>
            New Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {(['all', 'published', 'draft'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {selectedPosts.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete Selected ({selectedPosts.length})
              </button>
            )}
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No posts found</p>
              <Link
                href="/dashboard/posts/new"
                className="text-[#5B6CFF] hover:text-[#FF2E9F] transition-colors font-medium"
              >
                Create your first post →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts(filteredPosts.map(p => p.id))
                          } else {
                            setSelectedPosts([])
                          }
                        }}
                        className="w-4 h-4 text-[#5B6CFF] border-gray-300 rounded focus:ring-[#5B6CFF]"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPosts.map((post, index) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPosts([...selectedPosts, post.id])
                            } else {
                              setSelectedPosts(selectedPosts.filter(id => id !== post.id))
                            }
                          }}
                          className="w-4 h-4 text-[#5B6CFF] border-gray-300 rounded focus:ring-[#5B6CFF]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">{post.title}</div>
                          <div className="text-xs text-gray-500 font-mono">{post.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {post.author?.display_name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        {post.category ? (
                          <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          post.published 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.view_count || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTogglePublish(post.id, post.published)}
                            className={`p-2 rounded-lg transition-colors ${
                              post.published
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            {post.published ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 12.728M5.636 5.636L18.364 18.364" />
                              </svg>
                            )}
                          </button>
                          <Link
                            href={`/dashboard/posts/edit/${post.id}`}
                            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Published: {posts.filter(p => p.published).length}
            </span>
            <span className="inline-flex items-center gap-1 ml-3">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Draft: {posts.filter(p => !p.published).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}