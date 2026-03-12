'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Contact = {
  id: string
  first_name: string
  last_name: string
  job_title: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  is_primary: boolean
  client_id: string
  clients: {
    company_name: string
    client_code: string
  }
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('client_contacts')
      .select(`
        *,
        clients:client_id (
          company_name,
          client_code
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts:', error)
    } else {
      setContacts(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return

    const { error } = await supabase
      .from('client_contacts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact:', error)
      alert('Failed to delete contact')
    } else {
      setContacts(contacts.filter(c => c.id !== id))
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase()
    const companyName = contact.clients?.company_name?.toLowerCase() || ''
    const search = searchTerm.toLowerCase()
    
    return fullName.includes(search) || 
           companyName.includes(search) ||
           contact.email?.toLowerCase().includes(search)
  })

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Client
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Contacts</span>
            </h1>
            <p className="text-admin-muted">Manage all client contacts across your portfolio</p>
          </div>
        </div>

        {/* Search */}
        <div className="admin-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search contacts by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input bg-gray-50 border border-gray-200 text-midnight"
              />
            </div>
            <div className="text-sm text-admin-muted">
              Total: {filteredContacts.length} contacts
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted">No contacts found</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                onClick={() => router.push(`/dashboard/clients/${contact.client_id}`)}
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                <div className="relative admin-card p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {contact.is_primary && (
                        <span className="inline-block admin-badge admin-badge-success mb-2">Primary Contact</span>
                      )}
                      <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                        {contact.first_name} {contact.last_name}
                      </h3>
                      {contact.job_title && (
                        <p className="text-sm text-admin-muted">{contact.job_title}</p>
                      )}
                      <p className="text-sm text-[#5B6CFF] mt-1">
                        {contact.clients?.company_name}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(contact.id, `${contact.first_name} ${contact.last_name}`)
                      }}
                      className="p-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">✉️</span>
                        <a 
                          href={`mailto:${contact.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-[#5B6CFF]"
                        >
                          {contact.email}
                        </a>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">📞</span>
                        <a 
                          href={`tel:${contact.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-[#5B6CFF]"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    {contact.mobile && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span className="text-lg">📱</span>
                        <a 
                          href={`tel:${contact.mobile}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-[#5B6CFF]"
                        >
                          {contact.mobile}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-admin-muted">
                        Client Code: {contact.clients?.client_code}
                      </span>
                      <span className="text-xs text-[#5B6CFF]">View Client →</span>
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

export default ContactsPage