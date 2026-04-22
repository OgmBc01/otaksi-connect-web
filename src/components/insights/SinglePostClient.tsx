'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { format } from 'date-fns'
import { useState } from 'react'

type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  published_at: string
  view_count: number
  author: {
    display_name: string
    bio: string | null
    avatar_url: string | null
  } | null
  category: {
    name: string
    slug: string
    description: string | null
  } | null
  tags: {
    id: string
    name: string
    slug: string
  }[]
}

type RelatedPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  published_at: string
}

interface SinglePostClientProps {
  post: Post
  relatedPosts: RelatedPost[]
}

export default function SinglePostClient({ post, relatedPosts }: SinglePostClientProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setShowShareTooltip(true)
    setTimeout(() => setShowShareTooltip(false), 2000)
  }

  // Default author if none exists
  const author = post.author || {
    display_name: 'Otaksi Connect',
    bio: 'Official account of Otaksi Connect',
    avatar_url: null,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0ff] to-[#eae1ff]">
      {/* Article Header - Dark Mesh Gradient Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Dark Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2a1858] to-[#3a267a]" />
        
        {/* Mesh Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(91, 108, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 46, 159, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />
        
        {/* Subtle Neural Network Dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, #FF2E9F 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb - Light text for dark background */}
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
            <Link href="/" className="hover:text-[#FF2E9F] transition-colors">Home</Link>
            <span>•</span>
            <Link href="/insights" className="hover:text-[#FF2E9F] transition-colors">Insights</Link>
            <span>•</span>
            {post.category && (
              <>
                <Link href={`/insights/category/${post.category.slug}`} className="hover:text-[#FF2E9F] transition-colors">
                  {post.category.name}
                </Link>
                <span>•</span>
              </>
            )}
            <span className="text-gray-400 line-clamp-1">{post.title}</span>
          </nav>

          {/* Title - White text for dark background */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            {post.title}
          </motion.h1>

          {/* Meta Info - Light text for dark background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center flex-wrap gap-6 text-gray-300"
          >
            <div className="flex items-center gap-3">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.display_name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#5B6CFF]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {author.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-white">{author.display_name}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.view_count?.toLocaleString() || 0} views
              </div>

              <button
                onClick={handleShare}
                className="relative flex items-center gap-1 text-sm text-gray-400 hover:text-[#FF2E9F] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
                {showShareTooltip && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-gray-100"
            >
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-contain bg-white"
                style={{ maxHeight: '400px', margin: '0 auto', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content - Subtle purple background */}
      <section className="py-12 bg-gradient-to-br from-[#faf7ff] to-[#f0eaff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-a:text-[#5B6CFF] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-900 prose-blockquote:text-gray-700 prose-blockquote:border-l-[#5B6CFF] prose-code:text-[#FF2E9F] prose-pre:bg-gray-900 prose-pre:text-gray-100"
            style={{ color: '#18181b' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <style>{`
            .prose p { color: #18181b !important; }
          `}</style>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-purple-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/insights/tag/${tag.slug}`}
                    className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm shadow-sm hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] hover:text-white hover:shadow-md transition-all duration-300"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author Bio */}
          {author.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-purple-100"
            >
              <div className="flex items-center gap-4">
                {author.avatar_url ? (
                  <img
                    src={author.avatar_url}
                    alt={author.display_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#5B6CFF]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                    <span className="text-2xl text-white font-medium">
                      {author.display_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    About {author.display_name}
                  </h4>
                  <p className="text-gray-600 mt-1">{author.bio}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-clash)' }}>
              Related{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Articles</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href={`/insights/${related.slug}`}>
                    <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                      {related.featured_image ? (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={related.featured_image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 flex items-center justify-center">
                          <span className="text-3xl text-gray-400">📝</span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(related.published_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#faf7ff] to-[#f0eaff] border-t border-purple-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Enjoyed this article?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter to get more insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900 placeholder-gray-400 bg-white"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 hover:shadow-md transition-all duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}