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
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Posts
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-gray-400">Manage your blog posts</p>
          </div>
          <Link
            href="/dashboard/posts/new"
            className="admin-button-primary flex items-center gap-2"
          >
            <span>+</span>
            New Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="glass-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {(['all', 'published', 'draft'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`admin-button-secondary ${filter === f ? 'admin-button-primary' : ''}`}
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
                className="admin-input"
              />
            </div>

            {selectedPosts.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="admin-button-secondary text-red-500 border-red-500"
              >
                Delete Selected ({selectedPosts.length})
              </button>
            )}
          </div>
        </div>

        {/* Posts Table */}
        <div className="admin-table-container">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No posts found</p>
              <Link
                href="/dashboard/posts/new"
                className="text-[#5B6CFF] hover:text-white transition-colors"
              >
                Create your first post →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === filteredPosts.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts(filteredPosts.map(p => p.id))
                          } else {
                            setSelectedPosts([])
                          }
                        }}
                        className="admin-input"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Views</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/5 transition-colors group"
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
                          className="admin-input"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-midnight mb-1">{post.title}</div>
                          <div className="text-xs text-gray-500">{post.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {post.author?.display_name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        {post.category ? (
                          <span className="admin-badge">{post.category.name}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={post.published ? "admin-badge admin-badge-success" : "admin-badge admin-badge-warning"}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {post.view_count || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/dashboard/posts/edit/${post.id}`}
                            className="admin-button-secondary"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="admin-button-secondary text-red-500 border-red-500"
                          >
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>
    </div>
  )
}