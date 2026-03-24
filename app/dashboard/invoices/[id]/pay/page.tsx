'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

type Client = {
  company_name: string
  client_code: string
}

type Invoice = {
  id: string
  invoice_number: string
  client_id: string
  total_amount: number
  amount_paid: number
  currency: string
  clients: Client
  balance_due: number
}

type PaymentMethod = 'cash' | 'bank-transfer' | 'credit-card' | 'cheque' | 'online'

export default function RecordPaymentPage() {
  const params = useParams()
  const invoiceId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank-transfer' as PaymentMethod,
    reference_number: '',
    bank_name: '',
    cheque_number: '',
    notes: '',
  })

  useEffect(() => {
    fetchInvoice()
  }, [invoiceId])

  const fetchInvoice = async () => {
    setLoading(true)

    // Fetch invoice with explicit fields
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        id,
        invoice_number,
        client_id,
        total_amount,
        amount_paid,
        currency,
        clients:client_id (
          company_name,
          client_code
        )
      `)
      .eq('id', invoiceId)
      .single()

    if (error || !data) {
      console.error('Error fetching invoice:', error, 'invoiceId:', invoiceId, 'data:', data)
      alert(`Could not fetch invoice.\nInvoice ID: ${invoiceId}\nError: ${JSON.stringify(error)}`)
      router.push('/dashboard/invoices')
      return
    }

    // Handle clients data - it might be an array or object
    const clientsData = data.clients as any;
    const clientInfo = Array.isArray(clientsData) ? clientsData[0] : clientsData;
    
    // Calculate balance due manually and add to invoice object
    const balanceDue = data.total_amount - data.amount_paid
    setInvoice({
      id: data.id,
      invoice_number: data.invoice_number,
      client_id: data.client_id,
      total_amount: data.total_amount,
      amount_paid: data.amount_paid,
      currency: data.currency,
      clients: {
        company_name: clientInfo?.company_name || 'N/A',
        client_code: clientInfo?.client_code || 'N/A',
      },
      balance_due: balanceDue,
    })
    setFormData(prev => ({ ...prev, amount: balanceDue }))
    setLoading(false)
  }

  const generatePaymentNumber = async () => {
    const { data: lastPayment } = await supabase
      .from('payments')
      .select('payment_number')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1
    if (lastPayment) {
      const lastNum = parseInt(lastPayment.payment_number.replace('PAY', ''))
      nextNumber = lastNum + 1
    }
    return `PAY${String(nextNumber).padStart(6, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (!invoice) return

    const paymentNumber = await generatePaymentNumber()
    const currentBalanceDue = invoice.total_amount - invoice.amount_paid
    const newAmountPaid = invoice.amount_paid + formData.amount
    const newBalanceDue = invoice.total_amount - newAmountPaid
    const isFullyPaid = newBalanceDue <= 0

    // Validate payment amount
    if (formData.amount > currentBalanceDue) {
      alert(`Payment amount cannot exceed balance due of AED ${currentBalanceDue.toFixed(2)}`)
      setSaving(false)
      return
    }

    // Record payment
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        payment_number: paymentNumber,
        invoice_id: invoice.id,
        client_id: invoice.client_id,
        payment_date: formData.payment_date,
        amount: formData.amount,
        payment_method: formData.payment_method,
        reference_number: formData.reference_number || null,
        bank_name: formData.bank_name || null,
        cheque_number: formData.cheque_number || null,
        status: 'completed',
        notes: formData.notes || null,
      }])
      .select()
      .single()

    if (paymentError) {
      console.error('Error recording payment:', paymentError)
      alert(`Failed to record payment: ${paymentError.message}`)
      setSaving(false)
      return
    }

    // Update invoice
    const { error: updateError } = await supabase
      .from('invoices')
      .update({
        amount_paid: newAmountPaid,
        status: isFullyPaid ? 'paid' : 'sent',
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoice.id)

    if (updateError) {
      console.error('Error updating invoice:', updateError)
      alert(`Failed to update invoice: ${updateError.message}`)
      setSaving(false)
      return
    }

    // Generate receipt if fully paid
    if (isFullyPaid) {
      const receiptNumber = `RCP${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
      
      const { error: receiptError } = await supabase
        .from('receipts')
        .insert([{
          receipt_number: receiptNumber,
          payment_id: payment.id,
          invoice_id: invoice.id,
          client_id: invoice.client_id,
          receipt_date: new Date().toISOString().split('T')[0],
          amount: formData.amount,
          payment_method: formData.payment_method,
          reference_number: formData.reference_number || null,
        }])

      if (receiptError) {
        console.error('Error generating receipt:', receiptError)
        // Don't fail the payment if receipt fails, just log it
      }
    }

    setSaving(false)
    router.push(`/dashboard/invoices/${invoice.id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  if (!invoice) return null

  const balanceDue = invoice.total_amount - invoice.amount_paid
  const isBankTransfer = formData.payment_method === 'bank-transfer'
  const isCheque = formData.payment_method === 'cheque'

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Record
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Payment</span>
            </h1>
            <p className="text-admin-muted">Record payment for invoice #{invoice.invoice_number}</p>
          </div>
          <Link href={`/dashboard/invoices/${invoice.id}`} className="admin-button-secondary flex items-center gap-2">
            <span>←</span>
            Back to Invoice
          </Link>
        </div>

        <div className="admin-card mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-admin-muted">Client</p>
              <p className="text-midnight font-medium">{invoice.clients.company_name}</p>
            </div>
            <div>
              <p className="text-sm text-admin-muted">Invoice Total</p>
              <p className="text-midnight font-medium">AED {invoice.total_amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-admin-muted">Amount Paid</p>
              <p className="text-green-600 font-medium">AED {invoice.amount_paid.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-admin-muted">Balance Due</p>
              <p className="text-red-500 font-medium">AED {balanceDue.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Payment Amount *
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
                step="0.01"
                min="0.01"
                max={balanceDue}
                className="admin-input text-lg font-medium"
              />
              <p className="text-xs text-admin-muted mt-1">Maximum: AED {balanceDue.toFixed(2)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Payment Date *
              </label>
              <input
                type="date"
                value={formData.payment_date}
                onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                required
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Payment Method *
              </label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as PaymentMethod })}
                required
                className="admin-select"
              >
                <option value="cash">Cash</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="credit-card">Credit Card</option>
                <option value="cheque">Cheque</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            {isBankTransfer && (
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bank_name}
                  onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                  className="admin-input"
                  placeholder="e.g., Emirates NBD"
                />
              </div>
            )}

            {isCheque && (
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Cheque Number
                </label>
                <input
                  type="text"
                  value={formData.cheque_number}
                  onChange={(e) => setFormData({ ...formData, cheque_number: e.target.value })}
                  className="admin-input"
                  placeholder="e.g., 123456"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Reference Number (Optional)
              </label>
              <input
                type="text"
                value={formData.reference_number}
                onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                className="admin-input"
                placeholder="Transaction ID, Receipt No, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="admin-input resize-none"
                placeholder="Additional notes about this payment..."
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Link
                href={`/dashboard/invoices/${invoice.id}`}
                className="admin-button-secondary px-6 py-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving || formData.amount <= 0 || formData.amount > balanceDue}
                className="admin-button px-8 py-3 disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </span>
                ) : (
                  'Record Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}