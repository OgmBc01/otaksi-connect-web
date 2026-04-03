'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Link = {
  id: string
  title: string
  url: string
  description: string | null
  icon: string
  icon_type: string
  display_order: number
  target: string
  is_active: boolean
  is_featured: boolean
  click_count: number
  color_theme: string
  category: {
    id: string
    name: string
    slug: string
  }
}

export default function LinksManagementPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchLinks()
    fetchCategories()
  }, [])

  const fetchLinks = async () => {
    const { data } = await supabase
      .from('links')
      .select(`
        *,
        category:link_categories(*)
      `)
      .order('display_order', { ascending: true })

    setLinks(data || [])
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('link_categories')
      .select('*')
      .order('display_order', { ascending: true })

    setCategories(data || [])
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return

    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Failed to delete link')
    } else {
      setLinks(links.filter(l => l.id !== id))
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('links')
      .update({ is_active: !currentStatus })
      .eq('id', id)

    if (!error) {
      setLinks(links.map(l => 
        l.id === id ? { ...l, is_active: !currentStatus } : l
      ))
    }
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-clash)' }}>
              Links
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-gray-600">Manage all your social media and important links</p>
          </div>
          <button
            onClick={() => {
              setEditingLink(null)
              setShowModal(true)
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 hover:shadow-md transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <span className="text-lg">+</span>
            Add New Link
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:shadow-md transition-all"
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{link.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{link.title}</h3>
                        <p className="text-sm text-gray-500">{link.category?.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleActive(link.id, link.is_active)}
                        className={`px-2 py-1 text-xs rounded ${
                          link.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {link.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{link.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {link.click_count} clicks
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingLink(link)
                          setShowModal(true)
                        }}
                        className="p-1 text-gray-500 hover:text-[#5B6CFF] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <LinkModal
          link={editingLink}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchLinks()
          }}
        />
      )}
    </div>
  )
}

// Link Modal Component
function LinkModal({ link, categories, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    title: link?.title || '',
    url: link?.url || '',
    description: link?.description || '',
    icon: link?.icon || '🔗',
    category_id: link?.category_id || categories[0]?.id || '',
    target: link?.target || '_blank',
    is_featured: link?.is_featured || false,
    color_theme: link?.color_theme || 'default',
    display_order: link?.display_order || 0,
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg(null)

    // Ensure category_id is set
    if (!formData.category_id) {
      setErrorMsg('Please select a category.')
      setSaving(false)
      return
    }

    // Only include id if editing
    const upsertData = link?.id ? { ...formData, id: link.id } : { ...formData };
    const { data, error } = await supabase
      .from('links')
      .upsert([upsertData])
      .select()

    if (error) {
      setErrorMsg(error.message || 'Failed to save link')
    } else {
      onSave()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {link ? 'Edit Link' : 'Add New Link'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
              {errorMsg}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900"
              placeholder="e.g., LinkedIn Profile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon (Emoji)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900"
              placeholder="🔗"
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900"
            >
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900 resize-none"
              placeholder="Brief description of this link..."
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-[#5B6CFF] border-gray-300 rounded focus:ring-[#5B6CFF]"
              />
              <span className="text-sm text-gray-700">Feature this link</span>
            </label>
          </div>
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Link'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}