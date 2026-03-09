'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: '📊',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  { 
    name: 'Posts', 
    href: '/dashboard/posts', 
    icon: '📝',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  },
  { 
    name: 'New Post', 
    href: '/dashboard/posts/new', 
    icon: '✏️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  { 
    name: 'Categories', 
    href: '/dashboard/categories', 
    icon: '📂',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  },
  { 
    name: 'Tags', 
    href: '/dashboard/tags', 
    icon: '🏷️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  { 
    name: 'Media Library', 
    href: '/dashboard/media', 
    icon: '🖼️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  },
  { 
    name: 'Profile', 
    href: '/dashboard/profile', 
    icon: '👤',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Get author details
        const { data: author } = await supabase
          .from('authors')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setUser({ ...user, ...author })
      }
    }
    getUser()
  }, [supabase])

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isCollapsed ? 80 : 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="relative h-screen sticky top-0 overflow-hidden border-r border-white/5"
      >
        {/* Sidebar Background with Neural Animation */}
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-6 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg blur-md opacity-50" />
                <div className="relative w-full h-full rounded-lg bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
              </div>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold gradient-text"
                >
                  Admin Panel
                </motion.span>
              )}
            </Link>

            {/* Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-midnight border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"
            >
              <svg className={`w-3 h-3 text-gray-400 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group block mb-2"
                >
                  <div className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} bg-opacity-10 text-white` 
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                    }
                  `}>
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute left-0 w-1 h-8 rounded-full bg-gradient-to-r ${item.gradient}`}
                      />
                    )}
                    
                    {/* Icon */}
                    <span className="text-xl">{item.icon}</span>
                    
                    {/* Label */}
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* User Info */}
          {user && (
            <div className="p-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-md opacity-50" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.display_name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-lg">{user.display_name?.[0] || 'U'}</span>
                    )}
                  </div>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.display_name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role || 'Author'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="relative min-h-screen">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-glow" />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}