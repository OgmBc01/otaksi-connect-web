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
  // Clients Module
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: '👥',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    children: [
      { name: 'All Clients', href: '/dashboard/clients', icon: '📋' },
      { name: 'Add New Client', href: '/dashboard/clients/new', icon: '➕' },
      { name: 'Contacts', href: '/dashboard/clients/contacts', icon: '👤' },
    ],
  },
  // Engagements Module
  {
    name: 'Engagements',
    href: '/dashboard/engagements',
    icon: '🚀',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    children: [
      { name: 'All Engagements', href: '/dashboard/engagements', icon: '📋' },
      { name: 'New Engagement', href: '/dashboard/engagements/new', icon: '➕' },
      { name: 'Tasks', href: '/dashboard/engagements/tasks', icon: '✅' },
    ],
  },
  // Invoices Module (coming soon)
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: '💰',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    children: [
      { name: 'All Invoices', href: '/dashboard/invoices', icon: '📋' },
      { name: 'Create Invoice', href: '/dashboard/invoices/new', icon: '➕' },
      { name: 'Payments', href: '/dashboard/invoices/payments', icon: '💳' },
      { name: 'Receipts', href: '/dashboard/invoices/receipts', icon: '🧾' },
    ],
  },
  // Posts (existing)
  {
    name: 'Posts',
    href: '/dashboard/posts',
    icon: '📝',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    children: [
      { name: 'All Posts', href: '/dashboard/posts', icon: '📝' },
      { name: 'New Post', href: '/dashboard/posts/new', icon: '✏️' },
      { name: 'Categories', href: '/dashboard/categories', icon: '📂' },
      { name: 'Tags', href: '/dashboard/tags', icon: '🏷️' },
      { name: 'Media Library', href: '/dashboard/media', icon: '🖼️' },
    ],
  },
  // Employees (for engagement assignments)
  {
    name: 'Employees',
    href: '/dashboard/employees',
    icon: '👨‍💻',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    children: [
      { name: 'All Employees', href: '/dashboard/employees', icon: '📋' },
      { name: 'Add Employee', href: '/dashboard/employees/new', icon: '➕' },
    ],
  },
  // Contact Submission
  {
    name: 'Contact Submissions',
    href: '/dashboard/contact-submissions',
    icon: '📨',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
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

  // Auto-expand dropdown if a child is active
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => pathname === child.href || pathname.startsWith(child.href + '/'))
        if (hasActiveChild) {
          setOpenDropdown(item.name)
        }
      }
    })
  }, [pathname])

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar (hide on login page) */}
      {pathname !== '/dashboard/login' && (
        <motion.aside
          initial={{ width: isCollapsed ? 80 : 280 }}
          animate={{ width: isCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3 }}
          className="dashboard-sidebar relative sticky top-0 overflow-hidden border-r border-white/5 bg-midnight z-50"
          style={{ zIndex: 50, height: 'calc(100vh - 80px)' }}
        >
          {/* Sidebar Background Elements */}
          <div className="absolute inset-0 bg-gradient-glow opacity-20" />
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
                className="absolute -right-1 top-10 w-6 h-6 rounded-full bg-midnight border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"
              >
                <svg className={`w-3 h-3 text-gray-400 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Menu - with hidden scrollbar */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
              {menuItems.map((item) => {
                const hasChildren = Array.isArray((item as any).children) && (item as any).children.length > 0
                const isActive = hasChildren
                  ? (item as any).children.some((c: any) => pathname === c.href || pathname.startsWith(c.href + '/')) || pathname === item.href || pathname.startsWith(item.href + '/')
                  : pathname === item.href

                if (hasChildren) {
                  return (
                    <div key={item.href} className="mb-2">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`w-full text-left relative group block`}
                        aria-expanded={openDropdown === item.name}
                      >
                        <div className={`
                          relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                          ${isActive
                            ? `bg-gradient-to-r ${item.gradient} bg-opacity-20 text-white`
                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                          }
                        `}>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className={`absolute left-0 w-1 h-8 rounded-full bg-gradient-to-r ${item.gradient}`}
                            />
                          )}
                          <span className="text-xl">{item.icon}</span>
                          {!isCollapsed && (
                            <motion.div className="flex-1 flex items-center justify-between">
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-medium"
                              >
                                {item.name}
                              </motion.span>
                              <motion.span
                                animate={{ rotate: openDropdown === item.name ? 90 : 0 }}
                                className="text-xs text-gray-400"
                              >
                                ▶
                              </motion.span>
                            </motion.div>
                          )}
                        </div>
                      </button>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={openDropdown === item.name ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        {(item as any).children.map((child: any) => {
                          const childActive = pathname === child.href || pathname.startsWith(child.href + '/')
                          return (
                            <Link key={child.href} href={child.href} className="block mb-2">
                              <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ml-8 transition-all duration-200 ${childActive ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/3'}`}>
                                <span className="text-lg">{child.icon}</span>
                                {!isCollapsed && (
                                  <span className="text-sm">{child.name}</span>
                                )}
                              </div>
                            </Link>
                          )
                        })}
                      </motion.div>
                    </div>
                  )
                }

                // default single item render
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group block mb-2"
                  >
                    <div className={`
                      relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r ${item.gradient} bg-opacity-20 text-white` 
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
      )}
      
      {/* Main Content Area - with mesh background */}
      <main className="flex-1 relative bg-white z-10 flex flex-col" style={{ minHeight: '100vh' }}>
        {/* Admin Mesh Background */}
        <div className="admin-mesh-bg" />
        {/* Content wrapper, scrollable and fits above footer */}
        <div className="flex-1 p-8 overflow-y-auto" style={{ marginBottom: 80 }}>
          {children}
        </div>
        {/* Footer - Dark purple (admin only, full width, z-10) */}
        <div className="fixed left-0 right-0 bottom-0 z-10" style={{ height: 80 }}>
          <footer className="w-full bg-midnight border-t border-white/5 py-6 px-8">
            <div className="flex items-center justify-between max-w-full">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Otaksi Connect. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-xs text-gray-500 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Serving</span>
                <span className="text-lg">🇦🇪</span>
                <span className="text-sm text-gray-400">UAE</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}