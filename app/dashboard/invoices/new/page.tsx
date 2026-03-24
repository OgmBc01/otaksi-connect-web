'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Client = {
  id: string
  company_name: string
  client_code: string
  email: string | null
  phone: string | null
  address: string | null
}

type Engagement = {
  id: string
  engagement_code: string
  project_name: string
  total_amount: number
  currency: string
}

type LineItem = {
  id?: string
  description: string
  quantity: number
  unit_price: number
  tax_rate: number
  discount_rate: number
}

export default function NewInvoicePage() {
  const searchParams = useSearchParams()
  const preselectedClient = searchParams.get('client')
  const preselectedEngagement = searchParams.get('engagement')
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [engagements, setEngagements] = useState<Engagement[]>([])
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_price: 0, tax_rate: 5, discount_rate: 0 }
  ])
  
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    client_id: preselectedClient || '',
    engagement_id: preselectedEngagement || '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    status: 'draft' as const,
    payment_terms: '',
    notes: '',
    terms: '',
    tax_rate: 5,
    discount_rate: 0,
  })

  useEffect(() => {
    fetchClients()
    if (preselectedClient) {
      fetchEngagements(preselectedClient)
    }
  }, [])

  useEffect(() => {
    if (formData.client_id) {
      fetchEngagements(formData.client_id)
    } else {
      setEngagements([])
    }
  }, [formData.client_id])

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('id, company_name, client_code, email, phone, address')
      .eq('status', 'active')
      .order('company_name')
    
    setClients(data || [])
  }

  const fetchEngagements = async (clientId: string) => {
    const { data } = await supabase
      .from('engagements')
      .select('id, engagement_code, project_name, total_amount, currency')
      .eq('client_id', clientId)
      .in('status', ['active', 'completed'])
      .order('created_at', { ascending: false })
    
    setEngagements(data || [])
  }

  const generateInvoiceNumber = async () => {
    const year = new Date().getFullYear()
    const { data: lastInvoice } = await supabase
      .from('invoices')
      .select('invoice_number')
      .like('invoice_number', `INV-${year}-%`)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1
    if (lastInvoice) {
      const lastNum = parseInt(lastInvoice.invoice_number.split('-')[2])
      nextNumber = lastNum + 1
    }
    return `INV-${year}-${String(nextNumber).padStart(4, '0')}`
  }

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unit_price)
    }, 0)
  }

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal()
    return subtotal * (formData.tax_rate / 100)
  }

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal()
    return subtotal * (formData.discount_rate / 100)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTaxAmount()
    const discount = calculateDiscountAmount()
    return subtotal + tax - discount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const invoiceNumber = await generateInvoiceNumber()
    const subtotal = calculateSubtotal()
    const taxAmount = calculateTaxAmount()
    const discountAmount = calculateDiscountAmount()
    const total = calculateTotal()

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert([{
        invoice_number: invoiceNumber,
        client_id: formData.client_id,
        engagement_id: formData.engagement_id || null,
        invoice_date: formData.invoice_date,
        due_date: formData.due_date,
        status: formData.status,
        subtotal: subtotal,
        tax_rate: formData.tax_rate,
        tax_amount: taxAmount,
        discount_rate: formData.discount_rate,
        discount_amount: discountAmount,
        total_amount: total,
        amount_paid: 0,
        payment_terms: formData.payment_terms || null,
        notes: formData.notes || null,
        terms: formData.terms || null,
      }])
      .select()
      .single()

    if (invoiceError) {
      console.error('Error creating invoice:', invoiceError)
      alert(`Failed to create invoice: ${invoiceError.message}`)
      setSaving(false)
      return
    }

    // Insert line items
    const validItems = lineItems.filter(item => item.description.trim() !== '')
    if (validItems.length > 0) {
      const itemsToInsert = validItems.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate,
        discount_rate: item.discount_rate,
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert)

      if (itemsError) {
        console.error('Error adding line items:', itemsError)
      }
    }

    setSaving(false)
    router.push(`/dashboard/invoices/${invoice.id}`)
  }

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: '', quantity: 1, unit_price: 0, tax_rate: 5, discount_rate: 0 }
    ])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length === 1) {
      alert('You must have at least one line item')
      return
    }
    setLineItems(lineItems.filter((_, i) => i !== index))
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...lineItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setLineItems(newItems)
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Create New
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Invoice</span>
            </h1>
            <p className="text-gray-900 font-semibold">Generate a new invoice for your client</p>
          </div>
          <Link href="/dashboard/invoices" className="admin-button-secondary flex items-center gap-2">
            <span className="text-gray-900 font-bold">←</span>
            <span className="text-gray-900 font-semibold">Back to Invoices</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-6">Client & Engagement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Client *</label>
                    <select
                      value={formData.client_id}
                      onChange={(e) => setFormData({ ...formData, client_id: e.target.value, engagement_id: '' })}
                      required
                      className="admin-select"
                    >
                      <option value="">Select Client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.company_name} ({client.client_code})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Engagement (Optional)</label>
                    <select
                      value={formData.engagement_id}
                      onChange={(e) => setFormData({ ...formData, engagement_id: e.target.value })}
                      disabled={!formData.client_id}
                      className="admin-select"
                    >
                      <option value="">No Engagement</option>
                      {engagements.map(eng => (
                        <option key={eng.id} value={eng.id}>{eng.project_name} ({eng.engagement_code})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-6">Invoice Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Invoice Date *</label>
                    <input
                      type="date"
                      value={formData.invoice_date}
                      onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
                      required
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Due Date *</label>
                    <input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      required
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={formData.tax_rate}
                      onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                      className="admin-input"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Discount Rate (%)</label>
                    <input
                      type="number"
                      value={formData.discount_rate}
                      onChange={(e) => setFormData({ ...formData, discount_rate: parseFloat(e.target.value) || 0 })}
                      className="admin-input"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-admin-muted mb-2">Payment Terms</label>
                    <input
                      type="text"
                      value={formData.payment_terms}
                      onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                      className="admin-input"
                      placeholder="e.g., Due upon receipt, Net 30"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-midnight">Line Items</h2>
                  <button type="button" onClick={addLineItem} className="admin-button-secondary text-sm flex items-center gap-2">
                    <span>➕</span>
                    Add Item
                  </button>
                </div>

                {lineItems.map((item, index) => (
                  <div key={index} className={`mb-6 pb-6 ${index < lineItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-midnight">Item {index + 1}</h3>
                      {lineItems.length > 1 && (
                        <button type="button" onClick={() => removeLineItem(index)} className="text-sm text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-admin-muted mb-2">Description *</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          required
                          className="admin-input"
                          placeholder="Item description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-admin-muted mb-2">Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          step="1"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-admin-muted mb-2">Unit Price (AED)</label>
                        <input
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => updateLineItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-admin-muted mb-2">Tax Rate (%)</label>
                        <input
                          type="number"
                          value={item.tax_rate}
                          onChange={(e) => updateLineItem(index, 'tax_rate', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-admin-muted mb-2">Discount Rate (%)</label>
                        <input
                          type="number"
                          value={item.discount_rate}
                          onChange={(e) => updateLineItem(index, 'discount_rate', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm text-admin-muted">
                      Line Total: AED {(item.quantity * item.unit_price).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-admin-muted">Subtotal:</span>
                      <span className="text-midnight">AED {calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-admin-muted">Tax ({formData.tax_rate}%):</span>
                      <span className="text-midnight">AED {calculateTaxAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-admin-muted">Discount ({formData.discount_rate}%):</span>
                      <span className="text-midnight">- AED {calculateDiscountAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-midnight">Total:</span>
                      <span className="text-[#5B6CFF]">AED {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Notes & Terms</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Invoice Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="admin-input resize-none"
                      placeholder="Additional notes for the client..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">Terms & Conditions</label>
                    <textarea
                      value={formData.terms}
                      onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                      rows={4}
                      className="admin-input resize-none"
                      placeholder="Payment terms, late fees, etc..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <Link href="/dashboard/invoices" className="admin-button-secondary px-6 py-3">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving || !formData.client_id || !formData.due_date}
                  className="admin-button px-8 py-3 disabled:opacity-50"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating...
                    </span>
                  ) : (
                    'Create Invoice'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}