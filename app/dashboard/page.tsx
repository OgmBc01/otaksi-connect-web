'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const statCards = [
  { label: 'Total Posts', icon: '📝', color: 'from-[#FF2E9F] to-[#5B6CFF]', key: 'posts' },
  { label: 'Categories', icon: '📂', color: 'from-[#5B6CFF] to-[#FF2E9F]', key: 'categories' },
  { label: 'Tags', icon: '🏷️', color: 'from-[#FF2E9F] to-[#5B6CFF]', key: 'tags' },
  { label: 'Comments', icon: '💬', color: 'from-[#5B6CFF] to-[#FF2E9F]', key: 'comments' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    tags: 0,
    comments: 0,
  })
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      // Get counts
      const [posts, categories, tags, comments] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('tags').select('*', { count: 'exact', head: true }),
        supabase.from('comments').select('*', { count: 'exact', head: true }),
      ])

      // Get recent posts
      const { data: recent } = await supabase
        .from('posts')
        .select(`
          *,
          author:authors(display_name),
          category:categories(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        posts: posts.count || 0,
        categories: categories.count || 0,
        tags: tags.count || 0,
        comments: comments.count || 0,
      })
      setRecentPosts(recent || [])
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

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
    <div className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow-slate-950" style={{ fontFamily: 'var(--font-clash)' }}>
          Dashboard
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Overview</span>
        </h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your content.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.key}
            variants={itemVariants}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r ${stat.color}`} />
            {/* Dark purple card with glass effect */}
            <div className="relative glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {loading ? '...' : stats[stat.key as keyof typeof stats]}
                </span>
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-midnight">Recent Posts</h2>
          <Link
            href="/dashboard/posts"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No posts yet</p>
            <Link
              href="/dashboard/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              <span>Create Your First Post</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div>
                  <h3 className="font-medium text-white mb-1">{post.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>By {post.author?.display_name || 'Unknown'}</span>
                    <span>•</span>
                    <span>{post.category?.name || 'Uncategorized'}</span>
                    <span>•</span>
                    <span className={post.published ? 'text-green-500' : 'text-yellow-500'}>
                      {post.published ? '✅ Published' : '📝 Draft'}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/posts/edit/${post.id}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}