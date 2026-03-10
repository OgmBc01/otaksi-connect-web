'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  published_at: string
  view_count: number
  author: {
    display_name: string
    avatar_url: string | null
  }
  category: {
    name: string
    slug: string
  } | null
  tags: {
    id: string
    name: string
    slug: string
  }[]
}

type Category = {
  id: string
  name: string
  slug: string
  post_count: number
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 9

  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [currentPage, selectedCategory, searchTerm])

  const fetchPosts = async () => {
    setLoading(true)

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:authors(display_name, avatar_url),
        category:categories(name, slug),
        post_tags(
          tag:tags(id, name, slug)
        )
      `, { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1)

    if (selectedCategory) {
      query = query.eq('category.slug', selectedCategory)
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      const transformedPosts = (data || []).map((post: any) => ({
        ...post,
        tags: post.post_tags?.map((pt: any) => pt.tag) || [],
      }))
      setPosts(transformedPosts)
      setTotalPages(Math.ceil((count || 0) / postsPerPage))
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        posts:posts(count)
      `)
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
    } else {
      const categoriesWithCounts = (data || []).map((cat: any) => ({
        ...cat,
        post_count: cat.posts?.[0]?.count || 0,
      }))
      setCategories(categoriesWithCounts)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-[#eae1ff]">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#3a267a] to-[#2a1858] py-20 overflow-hidden">
        {/* Subtle Neural Network Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, #FF2E9F 1px, transparent 1px),
              radial-gradient(circle at 40px 40px, #5B6CFF 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Insights &{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Exploring the frontiers of technology, AI, and digital transformation
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="bg-[#3a267a] rounded-2xl border border-gray-700 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B6CFF] transition-colors text-gray-900"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-[#3a267a] rounded-2xl border border-gray-700 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === null
                          ? 'bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      All Posts
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.slug)
                          setCurrentPage(1)
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.slug
                            ? 'bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                          {cat.post_count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-linear-to-br from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-2xl border border-gray-700 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Newsletter</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest insights delivered to your inbox
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:border-[#5B6CFF] transition-colors"
                  />
                  <button className="w-full px-4 py-2 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16 bg-[#3a267a] rounded-3xl border border-gray-700">
                  <p className="text-gray-300 mb-4">No posts found</p>
                </div>
              ) : (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {posts.map((post) => (
                      <motion.article
                        key={post.id}
                        variants={itemVariants}
                        className="group relative bg-[#3a267a] rounded-2xl border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        <Link href={`/insights/${post.slug}`}>
                          {/* Featured Image */}
                          {post.featured_image ? (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            </div>
                          ) : (
                            <div className="h-48 bg-linear-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 flex items-center justify-center">
                              <span className="text-4xl text-gray-400">📝</span>
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6">
                            {/* Category & Date */}
                            <div className="flex items-center gap-2 text-sm mb-3">
                              {post.category && (
                                <span className="px-2 py-1 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] text-white text-xs rounded-full">
                                  {post.category.name}
                                </span>
                              )}
                              <span className="text-gray-400 text-xs">
                                {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:gradient-text transition-all duration-300">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>

                            {/* Author & Tags */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {post.author.avatar_url ? (
                                  <img
                                    src={post.author.avatar_url}
                                    alt={post.author.display_name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                                    <span className="text-xs text-white">
                                      {post.author.display_name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className="text-xs text-gray-500">
                                  {post.author.display_name}
                                </span>
                              </div>

                              {/* View Count */}
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {post.view_count}
                              </div>
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-4">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                                  >
                                    #{tag.name}
                                  </span>
                                ))}
                                {post.tags.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                    +{post.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-[#5B6CFF] hover:text-[#5B6CFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-[#5B6CFF] hover:text-[#5B6CFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}