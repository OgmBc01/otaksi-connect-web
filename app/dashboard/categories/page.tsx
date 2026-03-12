'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  post_count?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', description: '' })
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [showNewForm, setShowNewForm] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        posts:posts(count)
      `)
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error.message)
      alert('Failed to load categories')
    } else {
      // Map posts.count to post_count for each category
      const mapped = (data || []).map((cat: any) => ({
        ...cat,
        post_count: cat.posts?.[0]?.count ?? 0,
      }))
      setCategories(mapped)
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
    if (!newCategory.name) return

    const slug = generateSlug(newCategory.name)

    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name: newCategory.name,
        slug,
        description: newCategory.description || null,
      }])
      .select()

    if (error) {
      console.error('Error creating category:', error.message)
      alert(`Failed to create category: ${error.message}`)
    } else {
      setNewCategory({ name: '', description: '' })
      setShowNewForm(false)
      fetchCategories()
    }
  }

  const handleUpdate = async (id: string) => {
    if (!editForm.name) return

    const slug = generateSlug(editForm.name)

    const { error } = await supabase
      .from('categories')
      .update({
        name: editForm.name,
        slug,
        description: editForm.description || null,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating category:', error.message)
      alert(`Failed to update category: ${error.message}`)
    } else {
      setEditingId(null)
      fetchCategories()
    }
  }

  const handleDelete = async (id: string) => {
    // Check if category has posts
    const category = categories.find(c => c.id === id)
    if (category?.post_count && category.post_count > 0) {
      if (!confirm(`This category has ${category.post_count} posts. Deleting it will uncategorize these posts. Continue?`)) {
        return
      }
    } else {
      if (!confirm('Are you sure you want to delete this category?')) {
        return
      }
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting category:', error.message)
      alert(`Failed to delete category: ${error.message}`)
    } else {
      fetchCategories()
    }
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setEditForm({
      name: category.name,
      description: category.description || '',
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Categories
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-admin-muted">Organize your content with categories</p>
          </div>
          <button
            onClick={() => setShowNewForm(true)}
            className="admin-button flex items-center gap-2"
          >
            <span>+</span>
            New Category
          </button>
        </div>

        {/* New Category Form */}
        {showNewForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="admin-card mb-8"
          >
            <h2 className="text-lg font-medium text-midnight mb-4">Create New Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="admin-input"
                  placeholder="e.g., Technology News"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={2}
                  className="admin-input resize-none"
                  placeholder="Brief description of this category"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowNewForm(false)}
                  className="admin-button admin-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newCategory.name}
                  className="admin-button"
                >
                  Create Category
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories List */}
        <div className="">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-white/50 border-2 border-transparent bg-clip-padding" style={{ borderImage: 'linear-gradient(90deg, #FF2E9F, #5B6CFF) 1', borderImageSlice: 1 }}>
              <p className="text-admin-muted mb-4">No categories yet</p>
              <button
                onClick={() => setShowNewForm(true)}
                className="admin-button"
              >
                Create your first category →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                  <div className="relative rounded-2xl bg-white/50 p-6">
                    {editingId === category.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="admin-input"
                          placeholder="Category name"
                        />
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={2}
                          className="admin-input resize-none"
                          placeholder="Description"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingId(null)}
                            className="admin-button admin-button-secondary text-xs font-semibold px-4 py-2 border-2 border-[#FF2E9F] bg-white text-[#FF2E9F] hover:bg-[#F3F4F6] transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdate(category.id)}
                            className="text-xs font-semibold px-4 py-2 rounded-lg border border-[#5B6CFF] bg-white text-midnight hover:bg-[#F3F4F6] transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                            {category.name}
                          </h3>
                          <span className="admin-badge admin-badge-success">
                            {category.post_count || 0} posts
                          </span>
                        </div>
                        {category.description && (
                          <p className="text-sm text-midnight mb-4">
                            {category.description}
                          </p>
                        )}
                        <div className="text-xs text-midnight mb-4">
                          Slug: /{category.slug}
                        </div>
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEdit(category)}
                            className="p-2 rounded-lg border border-[#5B6CFF] bg-white text-midnight hover:bg-[#F3F4F6] transition-colors"
                          >
                            <svg className="w-4 h-4 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="admin-button admin-button-danger p-2"
                          >
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}