'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Link = {
  id: string
  title: string
  url: string
  description: string | null
  icon: string
  is_featured: boolean
  color_theme: string
  category: {
    id: string
    name: string
    slug: string
    icon: string
  }
}

export default function LinksHubPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [selectedCategory])

  const fetchData = async () => {
    setLoading(true)

    let query = supabase
      .from('links')
      .select(`
        *,
        category:link_categories(*)
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (selectedCategory) {
      query = query.eq('link_categories.slug', selectedCategory)
    }

    const { data: linksData } = await query
    const { data: categoriesData } = await supabase
      .from('link_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    setLinks(linksData || [])
    setCategories(categoriesData || [])
    setLoading(false)
  }

  const handleClick = async (link: Link) => {
    // Track click
    await fetch(`/api/links/${link.id}/click`, { method: 'POST' })
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  const featuredLinks = links.filter(l => l.is_featured)
  const regularLinks = links.filter(l => !l.is_featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0ff] to-[#eae1ff] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-2" style={{ fontFamily: 'var(--font-clash)' }}>
            Social Media Links & More
          </h1>
          <p className="text-gray-600">
            Your gateway to all our important links and resources
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* Featured Links */}
        {featuredLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">⭐ Featured Links</h2>
            <div className="grid gap-4">
              {featuredLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleClick(link)}
                  className="group relative w-full text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  <div className="relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{link.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                        )}
                      </div>
                      <div className="text-gray-400 group-hover:translate-x-1 transition-transform">
                        →
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Links */}
        {regularLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid gap-3">
              {regularLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleClick(link)}
                  className="group relative w-full text-left"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{link.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#5B6CFF] transition-colors">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                        )}
                      </div>
                      <div className="text-gray-400 group-hover:translate-x-1 transition-transform text-sm">
                        →
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
        </motion.div>
      </div>
    </div>
  )
}