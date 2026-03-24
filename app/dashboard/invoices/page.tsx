'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Invoice = {
  id: string
  invoice_number: string
  client_id: string
  invoice_date: string
  due_date: string
  status: string
  total_amount: number
  amount_paid: number
  balance_due: number
  currency: string
  clients: {
    company_name: string
    client_code: string
  }
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [stats, setStats] = useState({ totalOutstanding: 0, overdueAmount: 0, totalInvoices: 0 })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        clients:client_id (
          company_name,
          client_code
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invoices:', error)
    } else {
      setInvoices(data || [])
      
      const outstanding = (data || []).reduce((sum, inv) => sum + (inv.balance_due || 0), 0)
      const overdue = (data || []).reduce((sum, inv) => {
        if (inv.status === 'overdue') return sum + (inv.balance_due || 0)
        return sum
      }, 0)
      
      setStats({
        totalOutstanding: outstanding,
        overdueAmount: overdue,
        totalInvoices: (data || []).length
      })
    }
    setLoading(false)
  }

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
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

  const exportToCSV = () => {
    const headers = ['Invoice #', 'Client', 'Date', 'Due Date', 'Status', 'Total', 'Paid', 'Balance']
    const csvData = filteredInvoices.map(inv => [
      inv.invoice_number,
      inv.clients?.company_name,
      new Date(inv.invoice_date).toLocaleDateString(),
      new Date(inv.due_date).toLocaleDateString(),
      inv.status,
      inv.total_amount,
      inv.amount_paid,
      inv.balance_due
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Invoices
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-gray-900 font-semibold">Track and manage all invoices</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="admin-button-secondary flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 font-semibold shadow-sm px-4 py-2 rounded transition"
            >
              <span>📊</span>
              <span className="font-semibold">Export CSV</span>
            </button>
            <Link
              href="/dashboard/invoices/new"
              className="admin-button flex items-center gap-2"
            >
              <span>➕</span>
              Create Invoice
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">Total Invoices</p>
                <p className="text-2xl font-bold text-midnight">{stats.totalInvoices}</p>
              </div>
              <div className="text-3xl">📄</div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">Total Outstanding</p>
                <p className="text-2xl font-bold text-[#FF2E9F]">AED {stats.totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">Overdue Amount</p>
                <p className="text-2xl font-bold text-red-500">AED {stats.overdueAmount.toLocaleString()}</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>

        <div className="admin-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'draft', 'sent', 'paid', 'overdue', 'cancelled'].map((status) => (
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
                placeholder="Search by invoice number or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted mb-4">No invoices found</p>
            <Link href="/dashboard/invoices/new" className="admin-button inline-flex items-center gap-2">
              <span>➕</span>
              Create Your First Invoice
            </Link>
          </div>
        ) : (
          <div className="admin-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Invoice #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-admin-muted">Total</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-admin-muted">Balance</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-admin-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}
                  >
                    <td className="py-3 px-4 text-sm font-mono text-[#5B6CFF]">{invoice.invoice_number}</td>
                    <td className="py-3 px-4 text-sm text-midnight">{invoice.clients?.company_name}</td>
                    <td className="py-3 px-4 text-sm text-midnight">{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-midnight">{new Date(invoice.due_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{getStatusBadge(invoice.status)}</td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-midnight">AED {invoice.total_amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-red-500">AED {invoice.balance_due.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/dashboard/invoices/${invoice.id}`} onClick={(e) => e.stopPropagation()} className="text-[#5B6CFF] hover:underline text-sm">
                        View →
                      </Link>
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