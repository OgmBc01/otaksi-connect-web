'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string | null
  message: string
  location: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    fetchSubmissions()
  }, [statusFilter])

  const fetchSubmissions = async () => {
    setLoading(true)

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching submissions:', error)
    } else {
      setSubmissions(data || [])
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
    } else {
      fetchSubmissions()
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">New</span>
      case 'read':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Read</span>
      case 'replied':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Replied</span>
      case 'archived':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Archived</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100">{status}</span>
    }
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Contact 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Submissions</span>
            </h1>
            <p className="text-midnight">Manage and respond to contact form inquiries</p>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
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
        </div>

        {/* Submissions Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted">No submissions found</p>
          </div>
        ) : (
          <div className="admin-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-midnight">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-midnight">{submission.name}</td>
                    <td className="py-3 px-4 text-sm text-midnight">
                      <a href={`mailto:${submission.email}`} className="text-[#5B6CFF] hover:underline">
                        {submission.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm text-midnight">{submission.service || '-'}</td>
                    <td className="py-3 px-4 text-sm text-midnight capitalize">{submission.location}</td>
                    <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <select
                          value={submission.status}
                          onChange={(e) => updateStatus(submission.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-200 rounded"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </select>
                        <button
                          onClick={() => window.location.href = `mailto:${submission.email}`}
                          className="text-xs px-2 py-1 bg-[#5B6CFF] text-white rounded hover:bg-[#4B5CFF]"
                        >
                          Reply
                        </button>
                      </div>
                    </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}