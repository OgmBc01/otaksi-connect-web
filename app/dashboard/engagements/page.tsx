'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Engagement = {
  id: string
  engagement_code: string
  project_name: string
  client_id: string
  status: 'draft' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  payment_terms: 'full' | 'half' | 'quarterly' | 'monthly' | 'milestone'
  total_amount: number
  currency: string
  start_date: string
  end_date: string | null
  created_at: string
  clients: {
    company_name: string
    client_code: string
  }
  tasks?: { count: number }
  invoices?: { count: number }
}

export default function EngagementsPage() {
  const [engagements, setEngagements] = useState<Engagement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchEngagements()
  }, [])

  const fetchEngagements = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('engagements')
      .select(`
        *,
        clients:client_id (
          company_name,
          client_code
        ),
        tasks:engagement_tasks(count),
        invoices:invoices(count)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching engagements:', error)
    } else {
      setEngagements(data || [])
    }
    setLoading(false)
  }

  const filteredEngagements = engagements.filter(eng => {
    const matchesSearch = 
      eng.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.engagement_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || eng.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="admin-badge admin-badge-success">Active</span>
      case 'completed':
        return <span className="admin-badge admin-badge-info">Completed</span>
      case 'on-hold':
        return <span className="admin-badge admin-badge-warning">On Hold</span>
      case 'cancelled':
        return <span className="admin-badge admin-badge-danger">Cancelled</span>
      case 'draft':
        return <span className="admin-badge">Draft</span>
      default:
        return <span className="admin-badge">{status}</span>
    }
  }

  const getPaymentTermsBadge = (terms: string) => {
    const badges: Record<string, { color: string, label: string }> = {
      'full': { color: 'bg-purple-100 text-purple-700', label: 'Full Payment' },
      'half': { color: 'bg-blue-100 text-blue-700', label: '50% Deposit' },
      'quarterly': { color: 'bg-green-100 text-green-700', label: 'Quarterly' },
      'monthly': { color: 'bg-amber-100 text-amber-700', label: 'Monthly' },
      'milestone': { color: 'bg-indigo-100 text-indigo-700', label: 'Milestone Based' },
    }
    const badge = badges[terms] || { color: 'bg-gray-100 text-gray-700', label: terms }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>{badge.label}</span>
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
              Engagements
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-gray-900 font-semibold">Manage client projects and assignments</p>
          </div>
          <Link
            href="/dashboard/engagements/new"
            className="admin-button flex items-center gap-2"
          >
            <span>➕</span>
            New Engagement
          </Link>
        </div>

        {/* Filters */}
        <div className="admin-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'draft', 'active', 'on-hold', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                      : 'bg-gray-100 text-midnight hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search engagements by name, code, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Engagements Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        ) : filteredEngagements.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted mb-4">No engagements found</p>
            <Link
              href="/dashboard/engagements/new"
              className="admin-button inline-flex items-center gap-2"
            >
              <span>➕</span>
              Create Your First Engagement
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEngagements.map((engagement) => (
              <motion.div
                key={engagement.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                onClick={() => router.push(`/dashboard/engagements/${engagement.id}`)}
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                <div className="relative admin-card p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-admin-muted">{engagement.engagement_code}</span>
                        {getStatusBadge(engagement.status)}
                        <Link
                          href={`/dashboard/engagements/${engagement.id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg border border-[#5B6CFF] bg-white text-midnight hover:bg-[#F3F4F6] transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Edit Engagement"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                      <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                        {engagement.project_name}
                      </h3>
                      <p className="text-sm text-admin-muted mt-1">
                        {engagement.clients?.company_name}
                      </p>
                    </div>
                  </div>

                  {/* Payment Terms & Amount */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-muted">Payment Terms:</span>
                      {getPaymentTermsBadge(engagement.payment_terms)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-muted">Total Value:</span>
                      <span className="text-lg font-bold text-[#5B6CFF]">
                        {engagement.currency} {engagement.total_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-1 text-sm text-admin-muted mb-4">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Start: {new Date(engagement.start_date).toLocaleDateString()}</span>
                    </div>
                    {engagement.end_date && (
                      <div className="flex items-center gap-2">
                        <span>🏁</span>
                        <span>End: {new Date(engagement.end_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-[#FF2E9F]">
                        {engagement.tasks?.count || 0}
                      </span>
                      <span className="text-xs text-admin-muted">tasks</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-[#5B6CFF]">
                        {engagement.invoices?.count || 0}
                      </span>
                      <span className="text-xs text-admin-muted">invoices</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-xs text-admin-muted">View Details</span>
                      <span className="text-xs text-[#5B6CFF]">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}