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
}

type Employee = {
  id: string
  first_name: string
  last_name: string
  job_title: string
  hourly_rate: number
}

type Task = {
  id?: string
  task_name: string
  description: string
  assigned_to: string
  start_date: string
  due_date: string
  estimated_hours: number
  hourly_rate: number
  total_amount?: number
}

type PaymentTerms = 'full' | 'half' | 'quarterly' | 'monthly' | 'milestone'
type BillingCycle = 'one-time' | 'monthly' | 'quarterly' | 'yearly'
type EngagementStatus = 'draft' | 'active' | 'on-hold' | 'completed' | 'cancelled'

import { Suspense } from 'react'

function NewEngagementPageInner() {
  const searchParams = useSearchParams()
  const preselectedClient = searchParams.get('client')
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [tasks, setTasks] = useState<Task[]>([
    { 
      task_name: '', 
      description: '', 
      assigned_to: '', 
      start_date: '', 
      due_date: '', 
      estimated_hours: 0,
      hourly_rate: 0
    }
  ])
  
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    client_id: preselectedClient || '',
    project_name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'draft' as EngagementStatus,
    payment_terms: 'full' as PaymentTerms,
    deposit_amount: 0,
    deposit_paid: false,
    total_amount: 0,
    currency: 'AED',
    billing_cycle: 'one-time' as BillingCycle,
    invoice_notes: '',
  })

  useEffect(() => {
    fetchClients()
    fetchEmployees()
  }, [])

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('id, company_name, client_code')
      .eq('status', 'active')
      .order('company_name')
    
    setClients(data || [])
  }

  const fetchEmployees = async () => {
    const { data } = await supabase
      .from('employees')
      .select('id, first_name, last_name, job_title, hourly_rate')
      .eq('status', 'active')
      .order('first_name')
    
    setEmployees(data || [])
  }

  const generateEngagementCode = async () => {
    const { data: lastEngagement } = await supabase
      .from('engagements')
      .select('engagement_code')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    let nextNumber = 1
    if (lastEngagement) {
      const lastNumber = parseInt(lastEngagement.engagement_code.replace('ENG', ''))
      nextNumber = lastNumber + 1
    }
    return `ENG${String(nextNumber).padStart(4, '0')}`
  }

  const calculateTotalAmount = () => {
    const tasksTotal = tasks.reduce((sum, task) => {
      return sum + (task.estimated_hours * task.hourly_rate)
    }, 0)
    return tasksTotal
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const engagementCode = await generateEngagementCode()
      const totalAmount = calculateTotalAmount()

      // Insert engagement
      const { data: engagement, error: engagementError } = await supabase
        .from('engagements')
        .insert([{
          engagement_code: engagementCode,
          client_id: formData.client_id,
          project_name: formData.project_name,
          description: formData.description || null,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          status: formData.status,
          payment_terms: formData.payment_terms,
          deposit_amount: formData.deposit_amount || 0,
          deposit_paid: formData.deposit_paid,
          total_amount: totalAmount,
          currency: formData.currency,
          billing_cycle: formData.billing_cycle,
          invoice_notes: formData.invoice_notes || null,
        }])
        .select()
        .single()

      if (engagementError) {
        console.error('Error creating engagement:', engagementError)
        alert(`Failed to create engagement: ${engagementError.message}`)
        setSaving(false)
        return
      }

      // Insert tasks - filter out empty tasks and handle NULL values
      if (tasks.length > 0) {
        // Filter out tasks with empty task_name (don't insert empty tasks)
        const validTasks = tasks.filter(task => task.task_name && task.task_name.trim() !== '')
        
        if (validTasks.length > 0) {
          const tasksToInsert = validTasks.map(task => ({
            engagement_id: engagement.id,
            task_name: task.task_name,
            description: task.description || null,
            assigned_to: task.assigned_to && task.assigned_to !== '' ? task.assigned_to : null, // Convert empty string to null
            start_date: task.start_date || null,
            due_date: task.due_date || null,
            estimated_hours: task.estimated_hours || 0,
            hourly_rate: task.hourly_rate || 0,
            status: 'pending',
          }))

          console.log('Tasks to insert:', tasksToInsert)

          const { error: tasksError } = await supabase
            .from('engagement_tasks')
            .insert(tasksToInsert)

          if (tasksError) {
            console.error('Error adding tasks:', tasksError)
            alert(`Failed to add tasks: ${tasksError.message}`)
            // Don't redirect if tasks failed, but engagement was created
            setSaving(false)
            return
          }
        }
      }

      setSaving(false)
      router.push('/dashboard/engagements')
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred')
      setSaving(false)
    }
  }

  const addTask = () => {
    setTasks([
      ...tasks,
      { 
        task_name: '', 
        description: '', 
        assigned_to: '', 
        start_date: '', 
        due_date: '', 
        estimated_hours: 0,
        hourly_rate: 0
      }
    ])
  }

  const removeTask = (index: number) => {
    if (tasks.length === 1) {
      alert('You must have at least one task')
      return
    }
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const updateTask = (index: number, field: keyof Task, value: any) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], [field]: value }
    
    // If employee selected, auto-fill their hourly rate
    if (field === 'assigned_to' && value && value !== '') {
      const employee = employees.find(e => e.id === value)
      if (employee) {
        newTasks[index].hourly_rate = employee.hourly_rate || 0
      }
    }
    
    setTasks(newTasks)
  }

  return (
    <div className="relative p-8 min-h-screen">
      <div className="admin-mesh-bg" />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
              Create New
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Engagement</span>
            </h1>
            <p className="text-admin-muted">Set up a new client project or engagement</p>
          </div>
          <Link
            href="/dashboard/engagements"
            className="admin-button-secondary flex items-center gap-2"
          >
            <span>←</span>
            Back to Engagements
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="admin-card mb-8">
            <h2 className="text-lg font-medium text-midnight mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Client *
                </label>
                <select
                  value={formData.client_id}
                  onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                  required
                  className="admin-select"
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.company_name} ({client.client_code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  required
                  className="admin-input"
                  placeholder="e.g., Website Development Project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="admin-input resize-none"
                  placeholder="Detailed description of the engagement..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="admin-card mb-8">
            <h2 className="text-lg font-medium text-midnight mb-6">Payment Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Payment Terms *
                </label>
                <select
                  value={formData.payment_terms}
                  onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value as PaymentTerms })}
                  className="admin-select"
                >
                  <option value="full">Full Payment</option>
                  <option value="half">50% Deposit + 50% on Completion</option>
                  <option value="quarterly">Quarterly Payments</option>
                  <option value="monthly">Monthly Payments</option>
                  <option value="milestone">Milestone Based</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Billing Cycle
                </label>
                <select
                  value={formData.billing_cycle}
                  onChange={(e) => setFormData({ ...formData, billing_cycle: e.target.value as BillingCycle })}
                  className="admin-select"
                >
                  <option value="one-time">One Time</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="admin-select"
                >
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>

              {/* Deposit Amount - Only show when payment terms is 'half' */}
              {formData.payment_terms === 'half' && (
                <div>
                  <label className="block text-sm font-medium text-admin-muted mb-2">
                    Deposit Amount (AED)
                  </label>
                  <input
                    type="number"
                    value={formData.deposit_amount}
                    onChange={(e) => setFormData({ ...formData, deposit_amount: parseFloat(e.target.value) || 0 })}
                    className="admin-input"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-2">
                  Invoice Notes
                </label>
                <textarea
                  value={formData.invoice_notes}
                  onChange={(e) => setFormData({ ...formData, invoice_notes: e.target.value })}
                  rows={2}
                  className="admin-input resize-none"
                  placeholder="Notes to appear on invoices..."
                />
              </div>
            </div>
          </div>

          {/* Tasks/Assignments */}
          <div className="admin-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-midnight">Tasks & Assignments</h2>
              <button
                type="button"
                onClick={addTask}
                className="admin-button-secondary text-sm flex items-center gap-2"
              >
                <span>➕</span>
                Add Task
              </button>
            </div>

            {tasks.map((task, index) => (
              <div key={index} className={`mb-6 pb-6 ${index < tasks.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-midnight">Task {index + 1}</h3>
                  {tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={task.task_name}
                      onChange={(e) => updateTask(index, 'task_name', e.target.value)}
                      className="admin-input"
                      placeholder="e.g., Design Homepage (optional)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Description
                    </label>
                    <textarea
                      value={task.description}
                      onChange={(e) => updateTask(index, 'description', e.target.value)}
                      rows={2}
                      className="admin-input resize-none"
                      placeholder="Task description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Assign To
                    </label>
                    <select
                      value={task.assigned_to}
                      onChange={(e) => updateTask(index, 'assigned_to', e.target.value)}
                      className="admin-select"
                    >
                      <option value="">Select Employee (Optional)</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.first_name} {emp.last_name} - {emp.job_title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Hourly Rate (AED)
                    </label>
                    <input
                      type="number"
                      value={task.hourly_rate || ''}
                      onChange={(e) => updateTask(index, 'hourly_rate', parseFloat(e.target.value) || 0)}
                      className="admin-input"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={task.start_date}
                      onChange={(e) => updateTask(index, 'start_date', e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={task.due_date}
                      onChange={(e) => updateTask(index, 'due_date', e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      value={task.estimated_hours || ''}
                      onChange={(e) => updateTask(index, 'estimated_hours', parseFloat(e.target.value) || 0)}
                      className="admin-input"
                      placeholder="0"
                      step="0.5"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Task Total
                    </label>
                    <div className="admin-input bg-gray-50">
                      AED {((task.estimated_hours || 0) * (task.hourly_rate || 0)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-midnight">Total Engagement Value</span>
                <span className="text-2xl font-bold text-[#5B6CFF]">
                  {formData.currency} {calculateTotalAmount().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/dashboard/engagements"
              className="admin-button-secondary px-6 py-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || !formData.client_id || !formData.project_name}
              className="admin-button px-8 py-3 disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </span>
              ) : (
                'Create Engagement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewEngagementPage() {
  return (
    <Suspense>
      <NewEngagementPageInner />
    </Suspense>
  )
}