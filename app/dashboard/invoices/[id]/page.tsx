'use client'

import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Invoice = {
  id: string
  invoice_number: string
  client_id: string
  engagement_id: string | null
  invoice_date: string
  due_date: string
  status: string
  subtotal: number
  tax_rate: number
  tax_amount: number
  discount_rate: number
  discount_amount: number
  total_amount: number
  amount_paid: number
  balance_due: number
  payment_terms: string | null
  notes: string | null
  terms: string | null
  clients: {
    company_name: string
    client_code: string
    email: string | null
    phone: string | null
    address: string | null
  }
  engagements: {
    project_name: string
    engagement_code: string
  } | null
}

type LineItem = {
  id: string
  description: string
  quantity: number
  unit_price: number
  tax_rate: number
  tax_amount: number
  discount_rate: number
  discount_amount: number
  line_total: number
}

type Payment = {
  id: string
  payment_number: string
  payment_date: string
  amount: number
  payment_method: string
  reference_number: string | null
  status: string
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const invoiceId = params.id as string
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(false)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchInvoiceData()
  }, [invoiceId])

  const fetchInvoiceData = async () => {
    setLoading(true)

    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        clients:client_id (
          company_name,
          client_code,
          email,
          phone,
          address
        ),
        engagements:engagement_id (
          project_name,
          engagement_code
        )
      `)
      .eq('id', invoiceId)
      .single()

    if (invoiceError || !invoiceData) {
      console.error('Error fetching invoice:', invoiceError)
      router.push('/dashboard/invoices')
      return
    }

    setInvoice(invoiceData)

    const { data: itemsData } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('created_at')

    setLineItems(itemsData || [])

    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('payment_date', { ascending: false })

    setPayments(paymentsData || [])

    setLoading(false)
  }

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

  const sendEmail = async () => {
    // Email functionality will be implemented later
    alert('Email functionality coming soon!')
  }

  const downloadPDF = async () => {
    if (!invoice) return;
    setDownloadingPDF(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.id}/pdf`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to download PDF');
      }
      // Get the PDF blob
      const blob = await response.blob();
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Extract filename from Content-Disposition header or generate one
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `invoice-${invoice.invoice_number}.pdf`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
      setDownloadingPDF(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  if (!invoice) return null

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/dashboard/invoices" className="text-[#5B6CFF] hover:text-[#4B5CFF] transition-colors">
                ← Invoices
              </Link>
              <span className="text-admin-muted">/</span>
              <span className="text-sm font-mono text-[#5B6CFF]">{invoice.invoice_number}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Invoice Details
            </h1>
            <div className="flex items-center gap-3">
              {getStatusBadge(invoice.status)}
              <span className="text-sm font-semibold text-gray-900">
                Client: {invoice.clients.company_name}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
              <button onClick={sendEmail} className="admin-button-secondary flex items-center gap-2">
                <span>✉️</span>
                <span className="font-semibold text-gray-900">Email</span>
              </button>
              <button 
                onClick={downloadPDF} 
                disabled={downloadingPDF}
                className="admin-button-secondary flex items-center gap-2 disabled:opacity-50"
              >
                {downloadingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span>📄</span>
                    <span className="font-semibold text-gray-900">PDF</span>
                  </>
                )}
              </button>
            {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
              <button onClick={() => setShowPayModal(true)} className="admin-button flex items-center gap-2">
                <span>💰</span>
                Record Payment
              </button>
            )}
            <Link href={`/dashboard/invoices/${invoice.id}/edit`} className="admin-button-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-semibold text-gray-900">Edit</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="admin-card print:shadow-none print:border">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-midnight">INVOICE</h2>
                  <p className="text-sm text-admin-muted mt-1">#{invoice.invoice_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-admin-muted">Issue Date</p>
                  <p className="text-midnight">{new Date(invoice.invoice_date).toLocaleDateString()}</p>
                  <p className="text-sm text-admin-muted mt-2">Due Date</p>
                  <p className="text-midnight">{new Date(invoice.due_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-admin-muted mb-2">BILL TO</h3>
                  <p className="text-midnight font-medium">{invoice.clients.company_name}</p>
                  {invoice.clients.address && <p className="text-sm text-admin-muted">{invoice.clients.address}</p>}
                  {invoice.clients.email && <p className="text-sm text-admin-muted">{invoice.clients.email}</p>}
                  {invoice.clients.phone && <p className="text-sm text-admin-muted">{invoice.clients.phone}</p>}
                </div>
                {invoice.engagements && (
                  <div>
                    <h3 className="text-sm font-semibold text-admin-muted mb-2">ENGAGEMENT</h3>
                    <p className="text-midnight font-medium">{invoice.engagements.project_name}</p>
                    <p className="text-sm text-admin-muted">{invoice.engagements.engagement_code}</p>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-admin-muted">Item</th>
                      <th className="text-right py-3 text-sm font-medium text-admin-muted">Qty</th>
                      <th className="text-right py-3 text-sm font-medium text-admin-muted">Unit Price</th>
                      <th className="text-right py-3 text-sm font-medium text-admin-muted">Tax</th>
                      <th className="text-right py-3 text-sm font-medium text-admin-muted">Discount</th>
                      <th className="text-right py-3 text-sm font-medium text-admin-muted">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-midnight">{item.description}</td>
                        <td className="py-3 text-sm text-right text-midnight">{item.quantity}</td>
                        <td className="py-3 text-sm text-right text-midnight">AED {item.unit_price.toFixed(2)}</td>
                        <td className="py-3 text-sm text-right text-midnight">{item.tax_rate}%</td>
                        <td className="py-3 text-sm text-right text-midnight">{item.discount_rate}%</td>
                        <td className="py-3 text-sm text-right font-medium text-midnight">AED {item.line_total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                 </table>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 max-w-xs ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-admin-muted">Subtotal:</span>
                    <span className="text-midnight">AED {invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-admin-muted">Tax ({invoice.tax_rate}%):</span>
                    <span className="text-midnight">AED {invoice.tax_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-admin-muted">Discount ({invoice.discount_rate}%):</span>
                    <span className="text-midnight">- AED {invoice.discount_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-midnight">Total:</span>
                    <span className="text-[#5B6CFF]">AED {invoice.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-admin-muted">Amount Paid:</span>
                    <span className="text-green-600">AED {invoice.amount_paid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-midnight">Balance Due:</span>
                    <span className="text-red-500">AED {invoice.balance_due.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-admin-muted mb-2">Notes</h3>
                  <p className="text-sm text-midnight">{invoice.notes}</p>
                </div>
              )}

              {invoice.terms && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-admin-muted mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-midnight">{invoice.terms}</p>
                </div>
              )}
            </div>

            {payments.length > 0 && (
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Payment History</h2>
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-midnight">{payment.payment_number}</p>
                        <p className="text-xs text-admin-muted">{new Date(payment.payment_date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">AED {payment.amount.toFixed(2)}</p>
                        <p className="text-xs text-admin-muted capitalize">{payment.payment_method}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="admin-card">
              <h2 className="text-lg font-medium text-midnight mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {invoice.status === 'draft' && (
                  <button className="w-full admin-button py-2">
                    Mark as Sent
                  </button>
                )}
                {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                  <Link
                    href={`/dashboard/invoices/${invoice.id}/pay`}
                    className="block w-full admin-button py-2 text-center"
                  >
                    Record Payment
                  </Link>
                )}
                <Link
                  href={`/dashboard/invoices/${invoice.id}/edit`}
                  className="block w-full admin-button-secondary py-2 text-center"
                >
                  Edit Invoice
                </Link>
              </div>
            </div>

            {invoice.payment_terms && (
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-2">Payment Terms</h2>
                <p className="text-sm text-midnight">{invoice.payment_terms}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}