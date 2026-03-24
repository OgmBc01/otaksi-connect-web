'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Payment = {
  id: string
  payment_number: string
  invoice_id: string
  payment_date: string
  amount: number
  payment_method: string
  reference_number: string | null
  status: string
  invoices: {
    invoice_number: string
    clients: {
      company_name: string
    }
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        invoices:invoice_id (
          invoice_number,
          clients:client_id (
            company_name
          )
        )
      `)
      .eq('status', 'completed')
      .order('payment_date', { ascending: false })

    if (error) {
      console.error('Error fetching payments:', error)
    } else {
      setPayments(data || [])
      const total = (data || []).reduce((sum, p) => sum + p.amount, 0)
      setTotalAmount(total)
    }
    setLoading(false)
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.payment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoices?.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoices?.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
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
              Payment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> History</span>
            </h1>
            <p className="text-gray-900 font-semibold">Track all received payments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Total Payments Received</p>
                <p className="text-2xl font-bold text-midnight">{payments.length}</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Total Amount Collected</p>
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
                placeholder="Search by payment #, invoice #, or client..."
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
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <p className="text-admin-muted">No payments found</p>
          </div>
        ) : (
          <div className="admin-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Payment #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Invoice #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-admin-muted">Method</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-admin-muted">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-admin-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/dashboard/invoices/${payment.invoice_id}`)}
                  >
                    <td className="py-3 px-4 text-sm font-mono text-[#5B6CFF]">{payment.payment_number}</td>
                    <td className="py-3 px-4 text-sm font-mono text-midnight">{payment.invoices?.invoice_number}</td>
                    <td className="py-3 px-4 text-sm text-midnight">{payment.invoices?.clients?.company_name}</td>
                    <td className="py-3 px-4 text-sm text-midnight">{new Date(payment.payment_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPaymentMethodBadge(payment.payment_method)}`}>
                        {payment.payment_method?.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-green-600">AED {payment.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/dashboard/invoices/${payment.invoice_id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#5B6CFF] hover:underline text-sm"
                      >
                        View Invoice →
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