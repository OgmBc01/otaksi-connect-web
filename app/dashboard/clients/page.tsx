'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Client = {
  id: string
  client_code: string
  company_name: string
  trading_name: string | null
  email: string | null
  phone: string | null
  industry: string | null
  city: string | null
  country: string | null
  status: 'active' | 'inactive' | 'prospect'
  created_at: string
  contacts?: { count: number }
  engagements?: { count: number }
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)

    // Fetch all clients
    const { data: clientsData, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !clientsData) {
      console.error('Error fetching clients:', error)
      setLoading(false)
      return
    }

    // Fetch all contacts and aggregate counts by client_id
    const { data: allContacts } = await supabase
      .from('client_contacts')
      .select('id,client_id')

    const contactsMap: Record<string, number> = {}
    for (const c of allContacts || []) {
      if (!contactsMap[c.client_id]) contactsMap[c.client_id] = 0
      contactsMap[c.client_id]++
    }

    // Fetch all engagements and aggregate counts by client_id
    const { data: allEngagements } = await supabase
      .from('engagements')
      .select('id,client_id')

    const engagementsMap: Record<string, number> = {}
    for (const e of allEngagements || []) {
      if (!engagementsMap[e.client_id]) engagementsMap[e.client_id] = 0
      engagementsMap[e.client_id]++
    }

    // Merge counts into clients
    const mergedClients = clientsData.map((client: any) => ({
      ...client,
      contacts: { count: contactsMap[client.id] || 0 },
      engagements: { count: engagementsMap[client.id] || 0 },
    }))

    setClients(mergedClients)
    setLoading(false)
  }

  const handleDelete = async (id: string, companyName: string) => {
    if (!confirm(`Are you sure you want to delete ${companyName}? This will also delete all associated contacts, engagements, and invoices.`)) return

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting client:', error)
      alert('Failed to delete client')
    } else {
      setClients(clients.filter(c => c.id !== id))
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.client_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="admin-badge admin-badge-success">Active</span>
      case 'inactive':
        return <span className="admin-badge admin-badge-warning">Inactive</span>
      case 'prospect':
        return <span className="admin-badge admin-badge-info">Prospect</span>
      default:
        return <span className="admin-badge">{status}</span>
    }
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
    <div className="relative p-8 min-h-screen text-midnight">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
          <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Clients
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-admin-muted">Manage your client portfolio and contacts</p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="admin-button inline-flex items-center gap-2"
          >
            <span>➕</span>
            Add New Client
          </Link>
        </div>

        {/* Filters */}
        <div className="admin-card mb-8 text-midnight">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {['all', 'active', 'inactive', 'prospect'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                      : 'bg-white/50 text-midnight hover:bg-white/80'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search clients by name, code, email, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input bg-gray-50 border border-gray-200 text-midnight"
              />
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
          ) : filteredClients.length === 0 ? (
          <div className="text-center py-16 admin-card text-midnight">
            <p className="text-admin-muted mb-4">No clients found</p>
            <Link
              href="/dashboard/clients/new"
              className="admin-button inline-flex items-center gap-2"
            >
              <span>➕</span>
              Add Your First Client
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                <div className="relative admin-card p-6 border border-gray-200 rounded-xl">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-admin-muted">{client.client_code}</span>
                        {getStatusBadge(client.status)}
                      </div>
                      <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                        {client.company_name}
                      </h3>
                      {client.trading_name && (
                        <p className="text-sm text-admin-muted">Trading as: {client.trading_name}</p>
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/dashboard/clients/${client.id}/edit`)
                        }}
                        className="p-2 rounded-lg border border-[#5B6CFF] bg-white text-midnight hover:bg-[#F3F4F6] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(client.id, client.company_name)
                        }}
                        className="p-2 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {client.email && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">✉️</span>
                        <span>{client.email}</span>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">📞</span>
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {(client.city || client.country) && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">📍</span>
                        <span>{[client.city, client.country].filter(Boolean).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-[#5B6CFF]">
                        {client.contacts?.count || 0}
                      </span>
                      <span className="text-xs text-admin-muted">contacts</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-[#FF2E9F]">
                        {client.engagements?.count || 0}
                      </span>
                      <span className="text-xs text-admin-muted">engagements</span>
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