'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
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

export default function EditClientPage() {
  const params = useParams()
  const clientId = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
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

    setFormData({
      company_name: clientData.company_name,
      trading_name: clientData.trading_name || '',
      registration_number: clientData.registration_number || '',
      tax_number: clientData.tax_number || '',
      industry: clientData.industry || '',
      website: clientData.website || '',
      phone: clientData.phone || '',
      email: clientData.email || '',
      address: clientData.address || '',
      city: clientData.city || '',
      country: clientData.country || 'UAE',
      postal_code: clientData.postal_code || '',
      notes: clientData.notes || '',
      status: clientData.status,
    })

    // Fetch contacts
    const { data: contactsData } = await supabase
      .from('client_contacts')
      .select('*')
      .eq('client_id', clientId)
      .order('is_primary', { ascending: false })

    setContacts(contactsData || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Check for at least one primary contact
    if (!contacts.some(c => c.is_primary)) {
      alert('Please check the "Is Primary" checkbox for at least one contact. Every client must have a primary contact.');
      return;
    }
    setSaving(true)

    // Update client
    const { error: clientError } = await supabase
      .from('clients')
      .update(formData)
      .eq('id', clientId)

    if (clientError) {
      console.error('Error updating client:', clientError)
      alert('Failed to update client')
      setSaving(false)
      return
    }

    // Handle contacts - delete existing and insert new ones
    // First delete all existing contacts
    await supabase
      .from('client_contacts')
      .delete()
      .eq('client_id', clientId)

    // Then insert updated contacts
    if (contacts.length > 0) {
      const contactsToInsert = contacts.map(({ id, ...contact }) => ({
        client_id: clientId,
        ...contact,
      }))

      const { error: contactsError } = await supabase
        .from('client_contacts')
        .insert(contactsToInsert)

      if (contactsError) {
        console.error('Error updating contacts:', contactsError)
      }
    }

    setSaving(false)
    router.push(`/dashboard/clients/${clientId}`)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Edit
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Client</span>
            </h1>
            <p className="text-admin-muted">Update client information and contacts</p>
          </div>
          <Link
            href={`/dashboard/clients/${clientId}`}
            className="admin-button-secondary flex items-center gap-2"
          >
            <span>←</span>
            Back to Client
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Information */}
          <div className="admin-card mb-8">
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
                  className="admin-input"
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
                  className="admin-input"
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
                  className="admin-input"
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
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="admin-select"
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
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="admin-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Contact Information</h2>
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
                      className="admin-input"
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
                      className="admin-input"
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
                      className="admin-input"
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
                      className="admin-input"
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
                      className="admin-input"
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
                      className="admin-input"
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
          <div className="admin-card mb-8">
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
                  className="admin-input resize-none"
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
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="admin-select"
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
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="admin-select"
                >
                  <option value="prospect">Prospect</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="admin-card mb-8">
            <h2 className="text-lg font-medium text-midnight mb-6">Additional Notes</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="admin-input resize-none w-full"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Link
              href={`/dashboard/clients/${clientId}`}
              className="admin-button-secondary px-6 py-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || !formData.company_name}
              className="admin-button px-8 py-3 disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}