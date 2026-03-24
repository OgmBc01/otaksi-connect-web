'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Receipt = {
  id: string
  receipt_number: string
  payment_id: string
  invoice_id: string
  receipt_date: string
  amount: number
  payment_method: string
  reference_number: string | null
  pdf_url: string | null
  invoices: {
    invoice_number: string
    clients: {
      company_name: string
      client_code: string
    }
  }
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('receipts')
      .select(`
        *,
        invoices:invoice_id (
          invoice_number,
          clients:client_id (
            company_name,
            client_code
          )
        )
      `)
      .order('receipt_date', { ascending: false })

    if (error) {
      console.error('Error fetching receipts:', error)
    } else {
      setReceipts(data || [])
      const total = (data || []).reduce((sum, r) => sum + r.amount, 0)
      setTotalAmount(total)
    }
    setLoading(false)
  }

  const downloadReceipt = async (receiptId: string) => {
    setDownloading(receiptId)
    try {
      const response = await fetch(`/api/receipts/${receiptId}/pdf`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to download receipt')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'receipt.pdf'
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/)
        if (match) filename = match[1]
      }
      
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading receipt:', error)
      alert('Failed to download receipt. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  const emailReceipt = async (receiptId: string) => {
    // Email functionality will be implemented later
    alert('Email functionality coming soon!')
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.invoices?.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.invoices?.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const getPaymentMethodBadge = (method: string) => {
    const badges: Record<string, string> = {
      'cash': 'bg-green-100 text-green-700',
      'bank-transfer': 'bg-blue-100 text-blue-700',
      'credit-card': 'bg-purple-100 text-purple-700',
      'cheque': 'bg-orange-100 text-orange-700',
      'online': 'bg-indigo-100 text-indigo-700',
    }
    return badges[method] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Receipts
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Management</span>
            </h1>
            <p className="text-admin-muted">View and manage all payment receipts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">Total Receipts Issued</p>
                <p className="text-2xl font-bold text-midnight">{receipts.length}</p>
              </div>
              <div className="text-3xl">🧾</div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-muted">Total Amount Receipted</p>
                <p className="text-2xl font-bold text-[#5B6CFF]">AED {totalAmount.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
        </div>

        <div className="admin-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by receipt #, invoice #, or client..."
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
        ) : filteredReceipts.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted">No receipts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReceipts.map((receipt) => (
              <motion.div
                key={receipt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                <div className="relative admin-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-admin-muted">{receipt.receipt_number}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPaymentMethodBadge(receipt.payment_method)}`}>
                          {receipt.payment_method?.replace('-', ' ')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                        {receipt.invoices?.clients?.company_name}
                      </h3>
                      <p className="text-sm text-admin-muted mt-1">
                        Invoice: {receipt.invoices?.invoice_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#5B6CFF]">
                        AED {receipt.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-midnight">
                      <span>📅</span>
                      <span>{new Date(receipt.receipt_date).toLocaleDateString()}</span>
                    </div>
                    {receipt.reference_number && (
                      <div className="flex items-center gap-2 text-sm text-midnight">
                        <span>🔖</span>
                        <span>Ref: {receipt.reference_number}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={() => downloadReceipt(receipt.id)}
                      disabled={downloading === receipt.id}
                      className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      {downloading === receipt.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <span>📄</span>
                          PDF
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => emailReceipt(receipt.id)}
                      className="text-xs px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      <span>✉️</span>
                      Email
                    </button>
                    <Link
                      href={`/dashboard/invoices/${receipt.invoice_id}`}
                      className="text-xs px-3 py-1 rounded-lg bg-[#5B6CFF] text-white hover:bg-[#4B5CFF] transition-colors"
                    >
                      View Invoice
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}