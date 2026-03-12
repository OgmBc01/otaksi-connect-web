'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Contact = {
  id?: string
  first_name: string
  last_name: string
  job_title: string
  email: string
  phone: string
  mobile: string
  is_primary: boolean
}

export default function NewClientPage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([
    { first_name: '', last_name: '', job_title: '', email: '', phone: '', mobile: '', is_primary: true }
  ])
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    company_name: '',
    trading_name: '',
    registration_number: '',
    tax_number: '',
    industry: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'UAE',
    postal_code: '',
    notes: '',
    status: 'prospect' as 'active' | 'inactive' | 'prospect',
  })

  // Generate client code
  const generateClientCode = async () => {
    const { data: lastClient } = await supabase
      .from('clients')
      .select('client_code')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1
    if (lastClient) {
      const lastNumber = parseInt(lastClient.client_code.replace('CLI', ''))
      nextNumber = lastNumber + 1
    }
    return `CLI${String(nextNumber).padStart(4, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Generate client code
    const clientCode = await generateClientCode()

    // Insert client
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert([{
        client_code: clientCode,
        ...formData,
      }])
      .select()
      .single()

    if (clientError) {
      console.error('Error creating client:', clientError)
      alert('Failed to create client')
      setSaving(false)
      return
    }

    // Insert contacts
    if (contacts.length > 0) {
      const contactsToInsert = contacts.map(contact => ({
        client_id: client.id,
        ...contact,
      }))

      const { error: contactsError } = await supabase
        .from('client_contacts')
        .insert(contactsToInsert)

      if (contactsError) {
        console.error('Error adding contacts:', contactsError)
      }
    }

    setSaving(false)
    router.push('/dashboard/clients')
  }

  const addContact = () => {
    setContacts([
      ...contacts,
      { first_name: '', last_name: '', job_title: '', email: '', phone: '', mobile: '', is_primary: false }
    ])
  }

  const removeContact = (index: number) => {
    if (contacts.length === 1) {
      alert('You must have at least one primary contact')
      return
    }
    const newContacts = contacts.filter((_, i) => i !== index)
    // Ensure at least one primary contact
    if (!newContacts.some(c => c.is_primary)) {
      newContacts[0].is_primary = true
    }
    setContacts(newContacts)
  }

  const updateContact = (index: number, field: keyof Contact, value: any) => {
    const newContacts = [...contacts]
    newContacts[index] = { ...newContacts[index], [field]: value }
    
    // Handle primary contact logic
    if (field === 'is_primary' && value === true) {
      newContacts.forEach((c, i) => {
        if (i !== index) c.is_primary = false
      })
    }
    
    setContacts(newContacts)
  }

  return (
    <div className="relative p-8 min-h-screen text-midnight">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Add New
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Client</span>
            </h1>
            <p className="text-admin-muted">Enter client information and contacts</p>
          </div>
          <Link
            href="/dashboard/clients"
            className="admin-button-secondary flex items-center gap-2 text-sm"
          >
            <span>←</span>
            Back to Clients
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Information */}
          <div className="admin-card mb-8 text-midnight">
            <h2 className="text-lg font-medium text-midnight mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  required
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="e.g., Acme Corporation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Trading Name
                </label>
                <input
                  type="text"
                  value={formData.trading_name}
                  onChange={(e) => setFormData({ ...formData, trading_name: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="e.g., Acme Trading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registration_number}
                  onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="e.g., 12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Tax Number
                </label>
                <input
                  type="text"
                  value={formData.tax_number}
                  onChange={(e) => setFormData({ ...formData, tax_number: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="e.g., 123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="admin-select bg-gray-50 border border-gray-200 text-midnight"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Education">Education</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="admin-card mb-8 text-midnight">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Primary Contact Information</h2>
              <button
                type="button"
                onClick={addContact}
                className="admin-button-secondary text-sm flex items-center gap-2"
              >
                <span>➕</span>
                Add Another Contact
              </button>
            </div>

            {contacts.map((contact, index) => (
              <div key={index} className={`mb-6 pb-6 ${index < contacts.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-midnight">Contact {index + 1}</h3>
                  {contacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={contact.first_name}
                      onChange={(e) => updateContact(index, 'first_name', e.target.value)}
                      required={index === 0}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={contact.last_name}
                      onChange={(e) => updateContact(index, 'last_name', e.target.value)}
                      required={index === 0}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={contact.job_title}
                      onChange={(e) => updateContact(index, 'job_title', e.target.value)}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="CEO"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                      required={index === 0}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="+971 4 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      value={contact.mobile}
                      onChange={(e) => updateContact(index, 'mobile', e.target.value)}
                      className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  {index === 0 && (
                    <div className="md:col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`primary-${index}`}
                        checked={contact.is_primary}
                        onChange={(e) => updateContact(index, 'is_primary', e.target.checked)}
                        className="w-4 h-4 text-[#5B6CFF] border-gray-300 rounded focus:ring-[#5B6CFF]"
                      />
                      <label htmlFor={`primary-${index}`} className="text-sm text-midnight">
                        This is the primary contact
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Address Information */}
            <div className="admin-card mb-8 text-midnight">
            <h2 className="text-lg font-medium text-midnight mb-6">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Street Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className="admin-input bg-gray-50 border border-gray-200 resize-none text-midnight"
                  placeholder="123 Business Bay"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="Dubai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="admin-select bg-gray-50 border border-gray-200 text-midnight"
                >
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  className="admin-input bg-gray-50 border border-gray-200 text-midnight"
                  placeholder="00000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="admin-select bg-gray-50 border border-gray-200 text-midnight"
                >
                  <option value="prospect">Prospect</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="admin-card mb-8 text-midnight">
            <h2 className="text-lg font-medium text-midnight mb-6">Additional Notes</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="admin-input bg-gray-50 border border-gray-200 resize-none w-full text-midnight"
              placeholder="Any additional information about this client..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/dashboard/clients"
              className="admin-button-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || !formData.company_name}
              className="admin-button"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </span>
              ) : (
                'Create Client'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}