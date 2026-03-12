'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

type Client = {
  id: string
  client_code: string
  company_name: string
  trading_name: string | null
  registration_number: string | null
  tax_number: string | null
  industry: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  notes: string | null
  status: 'active' | 'inactive' | 'prospect'
  created_at: string
}

type Contact = {
  id: string
  first_name: string
  last_name: string
  job_title: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  is_primary: boolean
}

type Engagement = {
  id: string
  engagement_code: string
  project_name: string
  status: string
  total_amount: number
  currency: string
  start_date: string
  end_date: string | null
}

type Invoice = {
  id: string
  invoice_number: string
  invoice_date: string
  due_date: string
  status: string
  total_amount: number
  currency: string
}

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id as string
  const [client, setClient] = useState<Client | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [engagements, setEngagements] = useState<Engagement[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'engagements' | 'invoices'>('overview')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchClientData()
  }, [clientId])

  const fetchClientData = async () => {
    setLoading(true)

    // Fetch client details
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single()

    if (clientError || !clientData) {
      console.error('Error fetching client:', clientError)
      router.push('/dashboard/clients')
      return
    }

    setClient(clientData)

    // Fetch contacts
    const { data: contactsData } = await supabase
      .from('client_contacts')
      .select('*')
      .eq('client_id', clientId)
      .order('is_primary', { ascending: false })

    setContacts(contactsData || [])

    // Fetch engagements
    const { data: engagementsData } = await supabase
      .from('engagements')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    setEngagements(engagementsData || [])

    // Fetch invoices
    const { data: invoicesData } = await supabase
      .from('invoices')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    setInvoices(invoicesData || [])

    setLoading(false)
  }

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

  const getInvoiceStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <span className="admin-badge admin-badge-success">Paid</span>
      case 'sent':
        return <span className="admin-badge admin-badge-info">Sent</span>
      case 'overdue':
        return <span className="admin-badge admin-badge-danger">Overdue</span>
      case 'draft':
        return <span className="admin-badge admin-badge-warning">Draft</span>
      default:
        return <span className="admin-badge">{status}</span>
    }
  }

  const getEngagementStatusBadge = (status: string) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="relative p-8 min-h-screen text-midnight">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href="/dashboard/clients"
                className="text-admin-muted hover:text-midnight transition-colors"
              >
                ← Clients
              </Link>
              <span className="text-admin-muted">/</span>
              <span className="text-sm font-mono text-[#5B6CFF]">{client.client_code}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              {client.company_name}
              {client.trading_name && (
                <span className="text-lg font-normal text-admin-muted ml-3">
                  (Trading as: {client.trading_name})
                </span>
              )}
            </h1>
            <div className="flex items-center gap-3">
              {getStatusBadge(client.status)}
              <span className="text-sm text-admin-muted">
                Client since {new Date(client.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/dashboard/clients/${client.id}/edit`}
              className="admin-button-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <Link
              href="/dashboard/engagements/new"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] text-white hover:opacity-95 transform-gpu hover:-translate-y-0.5 transition"
            >
              <span>➕</span>
              New Engagement
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          {(['overview', 'contacts', 'engagements', 'invoices'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                  : 'text-admin-muted hover:text-midnight'
              }`}
            >
              {tab}
              {tab === 'contacts' && contacts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                  {contacts.length}
                </span>
              )}
              {tab === 'engagements' && engagements.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                  {engagements.length}
                </span>
              )}
              {tab === 'invoices' && invoices.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                  {invoices.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Company Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Company Details</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.registration_number && (
                    <>
                      <dt className="text-sm text-admin-muted">Registration Number</dt>
                      <dd className="text-sm text-midnight">{client.registration_number}</dd>
                    </>
                  )}
                  {client.tax_number && (
                    <>
                      <dt className="text-sm text-admin-muted">Tax Number</dt>
                      <dd className="text-sm text-midnight">{client.tax_number}</dd>
                    </>
                  )}
                  {client.industry && (
                    <>
                      <dt className="text-sm text-admin-muted">Industry</dt>
                      <dd className="text-sm text-midnight">{client.industry}</dd>
                    </>
                  )}
                  {client.website && (
                    <>
                      <dt className="text-sm text-admin-muted">Website</dt>
                      <dd className="text-sm text-midnight">
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-[#5B6CFF] hover:underline">
                          {client.website.replace(/^https?:\/\//, '')}
                        </a>
                      </dd>
                    </>
                  )}
                  {client.email && (
                    <>
                      <dt className="text-sm text-admin-muted">Email</dt>
                      <dd className="text-sm text-midnight">
                        <a href={`mailto:${client.email}`} className="text-[#5B6CFF] hover:underline">
                          {client.email}
                        </a>
                      </dd>
                    </>
                  )}
                  {client.phone && (
                    <>
                      <dt className="text-sm text-admin-muted">Phone</dt>
                      <dd className="text-sm text-midnight">
                        <a href={`tel:${client.phone}`} className="hover:underline">
                          {client.phone}
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
              </div>

              {client.address && (
                <div className="admin-card">
                  <h2 className="text-lg font-medium text-midnight mb-4">Address</h2>
                  <p className="text-sm text-midnight">
                    {client.address}<br />
                    {[client.city, client.postal_code].filter(Boolean).join(' ')}<br />
                    {client.country}
                  </p>
                </div>
              )}

              {client.notes && (
                <div className="admin-card">
                  <h2 className="text-lg font-medium text-midnight mb-4">Notes</h2>
                  <p className="text-sm text-midnight whitespace-pre-wrap">{client.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Quick Stats */}
            <div className="space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Total Contacts</span>
                    <span className="text-2xl font-bold text-[#5B6CFF]">{contacts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Active Engagements</span>
                    <span className="text-2xl font-bold text-[#FF2E9F]">
                      {engagements.filter(e => e.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Total Invoices</span>
                    <span className="text-2xl font-bold text-midnight">{invoices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Outstanding Amount</span>
                    <span className="text-lg font-bold text-red-500">
                      AED {invoices
                        .filter(i => i.status !== 'paid')
                        .reduce((sum, i) => sum + i.total_amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Contact */}
              {contacts.filter(c => c.is_primary).length > 0 && (
                <div className="admin-card">
                  <h2 className="text-lg font-medium text-midnight mb-4">Primary Contact</h2>
                  {contacts.filter(c => c.is_primary).map(contact => (
                    <div key={contact.id} className="space-y-2">
                      <p className="font-medium text-midnight">
                        {contact.first_name} {contact.last_name}
                      </p>
                      {contact.job_title && (
                        <p className="text-sm text-admin-muted">{contact.job_title}</p>
                      )}
                      {contact.email && (
                        <p className="text-sm text-[#5B6CFF]">
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </p>
                      )}
                      {contact.phone && (
                        <p className="text-sm text-midnight">{contact.phone}</p>
                      )}
                      {contact.mobile && (
                        <p className="text-sm text-midnight">{contact.mobile}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="admin-card text-midnight">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">All Contacts</h2>
              <button className="admin-button-secondary text-sm flex items-center gap-2 text-midnight">
                <span>➕</span>
                Add Contact
              </button>
            </div>
            {contacts.length === 0 ? (
              <p className="text-admin-muted text-center py-8">No contacts added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <Link
                        href="/dashboard/engagements/new"
                        className="admin-button inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      </div>
                    <div className="space-y-1 text-sm">
                      {contact.email && (
                        <p className="text-[#5B6CFF]">
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </p>
                      )}
                      {contact.phone && <p className="text-midnight">{contact.phone}</p>}
                      {contact.mobile && <p className="text-midnight">{contact.mobile}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Engagements Tab */}
        {activeTab === 'engagements' && (
          <div className="admin-card text-midnight">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Engagements</h2>
              <Link
                href={`/dashboard/engagements/new?client=${clientId}`}
                className="admin-button text-sm flex items-center gap-2 text-midnight"
              >
                <span>➕</span>
                New Engagement
              </Link>
            </div>
            {engagements.length === 0 ? (
              <p className="text-admin-muted text-center py-8">No engagements yet</p>
            ) : (
              <div className="space-y-4">
                {engagements.map((engagement) => (
                  <Link
                    key={engagement.id}
                    href={`/dashboard/engagements/${engagement.id}`}
                    className="block p-4 bg-white/50 rounded-xl border border-gray-200 hover:border-[#5B6CFF] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-midnight">{engagement.project_name}</p>
                        <p className="text-xs font-mono text-admin-muted">{engagement.engagement_code}</p>
                      </div>
                      {getEngagementStatusBadge(engagement.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-admin-muted">
                        Start: {new Date(engagement.start_date).toLocaleDateString()}
                      </span>
                      {engagement.end_date && (
                        <span className="text-admin-muted">
                          End: {new Date(engagement.end_date).toLocaleDateString()}
                        </span>
                      )}
                      <span className="ml-auto font-medium text-[#5B6CFF]">
                        {engagement.currency} {engagement.total_amount.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="admin-card text-midnight">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Invoices</h2>
              <Link
                href={`/dashboard/invoices/new?client=${clientId}`}
                className="admin-button text-sm flex items-center gap-2 text-midnight"
              >
                <span>➕</span>
                Create Invoice
              </Link>
            </div>
            {invoices.length === 0 ? (
              <p className="text-admin-muted text-center py-8">No invoices yet</p>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block p-4 bg-white/50 rounded-xl border border-gray-200 hover:border-[#5B6CFF] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-midnight">Invoice #{invoice.invoice_number}</p>
                        <p className="text-xs text-admin-muted">
                          Issued: {new Date(invoice.invoice_date).toLocaleDateString()}
                        </p>
                      </div>
                      {getInvoiceStatusBadge(invoice.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-muted">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </span>
                      <span className="font-medium text-[#5B6CFF]">
                        {invoice.currency} {invoice.total_amount.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}