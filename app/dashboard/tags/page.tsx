'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
  post_count?: number
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [newTagName, setNewTagName] = useState('')
  const [showNewForm, setShowNewForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchTags()
  }, [])

const fetchTags = async () => {
  setLoading(true)

  const { data, error } = await supabase
    .from('tags')
    .select(`
      *,
      post_tags!inner (
        tag_id
      )
    `)

  if (error) {
    console.error('Error fetching tags:', error)
  } else {
    // Group and count manually
    const tagCounts = new Map()
    data?.forEach((item: any) => {
      const tagId = item.id
      tagCounts.set(tagId, (tagCounts.get(tagId) || 0) + 1)
    })

    // Get unique tags with counts
    const uniqueTags = Array.from(
      new Map(data?.map((item: any) => [item.id, item])).values()
    ).map((tag: any) => ({
      ...tag,
      post_count: tagCounts.get(tag.id) || 0,
    }))

    setTags(uniqueTags)
  }
  setLoading(false)
}

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleCreate = async () => {
    if (!newTagName) return

    const slug = generateSlug(newTagName)

    const { error } = await supabase
      .from('tags')
      .insert([{
        name: newTagName,
        slug,
      }])

    if (error) {
      console.error('Error creating tag:', error)
      alert('Failed to create tag')
    } else {
      setNewTagName('')
      setShowNewForm(false)
      fetchTags()
    }
  }

  const handleUpdate = async (id: string) => {
    if (!editName) return

    const slug = generateSlug(editName)

    const { error } = await supabase
      .from('tags')
      .update({
        name: editName,
        slug,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating tag:', error)
      alert('Failed to update tag')
    } else {
      setEditingId(null)
      fetchTags()
    }
  }

  const handleDelete = async (id: string) => {
    // Check if tag is used in posts
    const tag = tags.find(t => t.id === id)
    if (tag?.post_count && tag.post_count > 0) {
      if (!confirm(`This tag is used in ${tag.post_count} posts. Deleting it will remove it from these posts. Continue?`)) {
        return
      }
    } else {
      if (!confirm('Are you sure you want to delete this tag?')) {
        return
      }
    }

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting tag:', error)
      alert('Failed to delete tag')
    } else {
      fetchTags()
    }
  }

  return (
    <div className="relative p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
            Tags
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
          </h1>
          <p className="text-midnight">Manage your content tags</p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="admin-button flex items-center gap-2"
        >
          <span>+</span>
          New Tag
        </button>
      </div>

      {/* New Tag Form */}
      {showNewForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-6 mb-8"
        >
          <h2 className="text-lg font-medium text-white mb-4">Create New Tag</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tag Name *
              </label>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                placeholder="e.g., Artificial Intelligence"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newTagName}
                className="px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Create Tag
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tags List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-16 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10">
          <p className="text-gray-500 mb-4">No tags yet</p>
          <button
            onClick={() => setShowNewForm(true)}
            className="text-[#5B6CFF] hover:text-white transition-colors"
          >
            Create your first tag →
          </button>
        </div>
      ) : (
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <motion.div
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative inline-block"
                >
                  {editingId === tag.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-40 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdate(tag.id)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="group relative"
                      onDoubleClick={() => {
                        setEditingId(tag.id)
                        setEditName(tag.name)
                      }}
                    >
                      <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                      <div className="relative px-4 py-2 rounded-full bg-white border-2 border-[#5B6CFF] flex items-center gap-2">
                        <span className="text-sm text-midnight font-semibold">{tag.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-white border border-[#5B6CFF] text-midnight">
                          {tag.post_count || 0}
                        </span>
                        
                        {/* Hover Actions */}
                        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingId(tag.id)
                              setEditName(tag.name)
                            }}
                            className="p-1 bg-midnight border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id)}
                            className="p-1 bg-midnight border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                          >
                            <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}