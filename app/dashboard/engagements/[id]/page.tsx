'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

type Engagement = {
  id: string
  engagement_code: string
  project_name: string
  description: string | null
  client_id: string
  start_date: string
  end_date: string | null
  status: string
  payment_terms: string
  deposit_amount: number | null
  deposit_paid: boolean
  total_amount: number
  currency: string
  billing_cycle: string
  invoice_notes: string | null
  created_at: string
  clients: {
    id: string
    company_name: string
    client_code: string
    email: string | null
    phone: string | null
  }
}

type Task = {
  id: string
  task_name: string
  description: string | null
  assigned_to: string | null
  start_date: string | null
  due_date: string | null
  completion_date: string | null
  status: string
  estimated_hours: number | null
  actual_hours: number | null
  hourly_rate: number | null
  total_amount: number | null
  notes: string | null
  employees?: {
    first_name: string
    last_name: string
  }
}

type Invoice = {
  id: string
  invoice_number: string
  invoice_date: string
  due_date: string
  status: string
  total_amount: number
  amount_paid: number
  balance_due: number
}

export default function EngagementDetailPage() {
  const params = useParams()
  const engagementId = params.id as string
  const [engagement, setEngagement] = useState<Engagement | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'invoices'>('overview')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchEngagementData()
  }, [engagementId])

  const fetchEngagementData = async () => {
    setLoading(true)

    // Fetch engagement details with client
    const { data: engagementData, error: engagementError } = await supabase
      .from('engagements')
      .select(`
        *,
        clients:client_id (
          id,
          company_name,
          client_code,
          email,
          phone
        )
      `)
      .eq('id', engagementId)
      .single()

    if (engagementError || !engagementData) {
      console.error('Error fetching engagement:', engagementError)
      router.push('/dashboard/engagements')
      return
    }

    setEngagement(engagementData)

    // Fetch tasks
    const { data: tasksData } = await supabase
      .from('engagement_tasks')
      .select(`
        *,
        employees:assigned_to (
          first_name,
          last_name
        )
      `)
      .eq('engagement_id', engagementId)
      .order('created_at')

    setTasks(tasksData || [])

    // Fetch invoices
    const { data: invoicesData } = await supabase
      .from('invoices')
      .select('*')
      .eq('engagement_id', engagementId)
      .order('created_at', { ascending: false })

    setInvoices(invoicesData || [])

    setLoading(false)
  }

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    const { error } = await supabase
      .from('engagement_tasks')
      .update({ 
        status: newStatus,
        completion_date: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
      })
      .eq('id', taskId)

    if (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task')
    } else {
      fetchEngagementData()
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="admin-badge admin-badge-success">Active</span>
      case 'completed':
        return <span className="admin-badge admin-badge-info">Completed</span>
      case 'on-hold':
        return <span className="admin-badge admin-badge-warning">On Hold</span>
      case 'cancelled':
        return <span className="admin-badge admin-badge-danger">Cancelled</span>
      case 'draft':
        return <span className="admin-badge">Draft</span>
      default:
        return <span className="admin-badge">{status}</span>
    }
  }

  const getTaskStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="admin-badge admin-badge-success">Completed</span>
      case 'in-progress':
        return <span className="admin-badge admin-badge-info">In Progress</span>
      case 'pending':
        return <span className="admin-badge admin-badge-warning">Pending</span>
      case 'cancelled':
        return <span className="admin-badge admin-badge-danger">Cancelled</span>
      default:
        return <span className="admin-badge">{status}</span>
    }
  }

  const getPaymentTermsLabel = (terms: string) => {
    const labels: Record<string, string> = {
      'full': 'Full Payment',
      'half': '50% Deposit + 50% on Completion',
      'quarterly': 'Quarterly Payments',
      'monthly': 'Monthly Payments',
      'milestone': 'Milestone Based',
    }
    return labels[terms] || terms
  }

  const calculateProgress = () => {
    if (tasks.length === 0) return 0
    const completed = tasks.filter(t => t.status === 'completed').length
    return Math.round((completed / tasks.length) * 100)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  if (!engagement) return null

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href="/dashboard/engagements"
                className="text-admin-muted hover:text-midnight transition-colors"
              >
                ← Engagements
              </Link>
              <span className="text-admin-muted">/</span>
              <span className="text-sm font-mono text-[#5B6CFF]">{engagement.engagement_code}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              {engagement.project_name}
            </h1>
            <div className="flex items-center gap-3">
              {getStatusBadge(engagement.status)}
              <span className="text-sm text-admin-muted">
                Client: {engagement.clients.company_name}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/dashboard/engagements/${engagement.id}/edit`}
              className="admin-button-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <Link
              href={`/dashboard/invoices/new?engagement=${engagement.id}`}
              className="admin-button flex items-center gap-2"
            >
              <span>➕</span>
              Create Invoice
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="admin-card mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-midnight">Overall Progress</span>
            <span className="text-sm text-[#5B6CFF]">{calculateProgress()}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          {(['overview', 'tasks', 'invoices'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                  : 'bg-gray-100 text-midnight hover:bg-gray-200'
              }`}
            >
              {tab}
              {tab === 'tasks' && tasks.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-midnight">
                  {tasks.length}
                </span>
              )}
              {tab === 'invoices' && invoices.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-midnight">
                  {invoices.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Engagement Details</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-admin-muted">Client</dt>
                    <dd className="text-sm text-midnight">
                      <Link href={`/dashboard/clients/${engagement.clients.id}`} className="text-[#5B6CFF] hover:underline">
                        {engagement.clients.company_name}
                      </Link>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-admin-muted">Payment Terms</dt>
                    <dd className="text-sm text-midnight">{getPaymentTermsLabel(engagement.payment_terms)}</dd>
                  </div>

                  <div>
                    <dt className="text-sm text-admin-muted">Billing Cycle</dt>
                    <dd className="text-sm text-midnight capitalize">{engagement.billing_cycle}</dd>
                  </div>

                  <div>
                    <dt className="text-sm text-admin-muted">Start Date</dt>
                    <dd className="text-sm text-midnight">{new Date(engagement.start_date).toLocaleDateString()}</dd>
                  </div>

                  {engagement.end_date && (
                    <div>
                      <dt className="text-sm text-admin-muted">End Date</dt>
                      <dd className="text-sm text-midnight">{new Date(engagement.end_date).toLocaleDateString()}</dd>
                    </div>
                  )}

                  {engagement.deposit_amount && engagement.deposit_amount > 0 && (
                    <div>
                      <dt className="text-sm text-admin-muted">Deposit Required</dt>
                      <dd className="text-sm text-midnight">
                        {engagement.currency} {engagement.deposit_amount.toLocaleString()}
                        {engagement.deposit_paid && (
                          <span className="ml-2 text-green-600">(Paid)</span>
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {engagement.description && (
                <div className="admin-card">
                  <h2 className="text-lg font-medium text-midnight mb-4">Description</h2>
                  <p className="text-sm text-midnight whitespace-pre-wrap">{engagement.description}</p>
                </div>
              )}

              {engagement.invoice_notes && (
                <div className="admin-card">
                  <h2 className="text-lg font-medium text-midnight mb-4">Invoice Notes</h2>
                  <p className="text-sm text-midnight whitespace-pre-wrap">{engagement.invoice_notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Financial Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Total Value</span>
                    <span className="text-2xl font-bold text-[#5B6CFF]">
                      {engagement.currency} {engagement.total_amount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-admin-muted">Invoiced</span>
                      <span className="text-sm font-medium text-midnight">
                        {engagement.currency} {invoices.reduce((sum, inv) => sum + inv.total_amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-muted">Paid</span>
                      <span className="text-sm font-medium text-green-600">
                        {engagement.currency} {invoices.reduce((sum, inv) => sum + inv.amount_paid, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-midnight">Balance Due</span>
                      <span className="text-lg font-bold text-red-500">
                        {engagement.currency} {invoices.reduce((sum, inv) => sum + inv.balance_due, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h2 className="text-lg font-medium text-midnight mb-4">Task Summary</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Total Tasks</span>
                    <span className="text-lg font-bold text-midnight">{tasks.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Completed</span>
                    <span className="text-lg font-bold text-green-600">
                      {tasks.filter(t => t.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">In Progress</span>
                    <span className="text-lg font-bold text-blue-600">
                      {tasks.filter(t => t.status === 'in-progress').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-muted">Pending</span>
                    <span className="text-lg font-bold text-amber-600">
                      {tasks.filter(t => t.status === 'pending').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="admin-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Tasks & Assignments</h2>
              <button
                onClick={() => {/* TODO: Add task modal */}}
                className="admin-button-secondary text-sm flex items-center gap-2"
              >
                <span>➕</span>
                Add Task
              </button>
            </div>
            
            {tasks.length === 0 ? (
              <p className="text-admin-muted text-center py-8">No tasks added yet</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-midnight">{task.task_name}</h3>
                        {task.description && (
                          <p className="text-sm text-admin-muted mt-1">{task.description}</p>
                        )}
                      </div>
                      {getTaskStatusBadge(task.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      {task.employees && (
                        <div>
                          <span className="text-admin-muted">Assigned to:</span>
                          <p className="text-midnight">
                            {task.employees.first_name} {task.employees.last_name}
                          </p>
                        </div>
                      )}
                      
                      {task.start_date && (
                        <div>
                          <span className="text-admin-muted">Start:</span>
                          <p className="text-midnight">{new Date(task.start_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      
                      {task.due_date && (
                        <div>
                          <span className="text-admin-muted">Due:</span>
                          <p className="text-midnight">{new Date(task.due_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-admin-muted">Hours:</span>
                        <p className="text-midnight">
                          {task.actual_hours || task.estimated_hours || 0} hrs
                        </p>
                      </div>
                    </div>

                    {/* Task Actions */}
                    <div className="flex gap-2 justify-end">
                      {task.status === 'pending' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="text-xs px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          Start Task
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      {task.status === 'pending' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'cancelled')}
                          className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="admin-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Invoices</h2>
              <Link
                href={`/dashboard/invoices/new?engagement=${engagement.id}`}
                className="admin-button text-sm flex items-center gap-2"
              >
                <span>➕</span>
                Create Invoice
              </Link>
            </div>
            
            {invoices.length === 0 ? (
              <p className="text-admin-muted text-center py-8">No invoices created yet</p>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block p-4 bg-white/50 rounded-xl border border-gray-200 hover:border-[#5B6CFF] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-midnight">Invoice #{invoice.invoice_number}</p>
                        <p className="text-xs text-admin-muted">
                          Issued: {new Date(invoice.invoice_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`admin-badge ${
                        invoice.status === 'paid' ? 'admin-badge-success' :
                        invoice.status === 'overdue' ? 'admin-badge-danger' :
                        invoice.status === 'sent' ? 'admin-badge-info' :
                        'admin-badge-warning'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-muted">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </span>
                      <div className="text-right">
                        <span className="font-medium text-[#5B6CFF]">
                          {engagement.currency} {invoice.total_amount.toLocaleString()}
                        </span>
                        {invoice.balance_due > 0 && (
                          <p className="text-xs text-red-500">
                            Balance: {engagement.currency} {invoice.balance_due.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}