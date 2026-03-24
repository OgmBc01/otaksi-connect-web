'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  task_name: string
  description: string | null
  status: string
  estimated_hours: number | null
  actual_hours: number | null
  start_date: string | null
  due_date: string | null
  completion_date: string | null
  engagement_id: string
  assigned_to: string | null
  engagements: {
    project_name: string
    engagement_code: string
    clients: {
      company_name: string
    }
  }
  employees: {
    id: string
    first_name: string
    last_name: string
  } | null
}

type Employee = {
  id: string
  first_name: string
  last_name: string
  job_title: string
  hourly_rate: number
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('engagement_tasks')
      .select(`
        *,
        engagements:engagement_id (
          project_name,
          engagement_code,
          clients:client_id (
            company_name
          )
        ),
        employees:assigned_to (
          id,
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tasks:', error)
    } else {
      setTasks(data || [])
    }
    setLoading(false)
  }

  const fetchEmployees = async () => {
    const { data } = await supabase
      .from('employees')
      .select('id, first_name, last_name, job_title, hourly_rate')
      .eq('status', 'active')
      .order('first_name')
    
    setEmployees(data || [])
  }

  const updateTaskStatus = async (taskId: string, newStatus: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
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
      fetchTasks()
    }
  }

  const handleEditTask = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingTask(task)
  }

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTask) return

    setSaving(true)

    const { error } = await supabase
      .from('engagement_tasks')
      .update({
        task_name: editingTask.task_name,
        description: editingTask.description || null,
        assigned_to: editingTask.assigned_to || null,
        start_date: editingTask.start_date || null,
        due_date: editingTask.due_date || null,
        estimated_hours: editingTask.estimated_hours || 0,
        actual_hours: editingTask.actual_hours || null,
        status: editingTask.status,
      })
      .eq('id', editingTask.id)

    if (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task')
    } else {
      fetchTasks()
      setEditingTask(null)
    }

    setSaving(false)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.engagements?.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.engagements?.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <>
      <div className="relative p-8 min-h-screen">
        <div className="admin-mesh-bg" />
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
                Engagement
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Tasks</span>
              </h1>
              <p className="text-admin-muted">Track and manage all tasks across engagements</p>
            </div>
          </div>

          {/* Filters */}
          <div className="admin-card mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      statusFilter === status
                        ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                        : 'bg-white/50 text-midnight hover:bg-white/80'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search tasks by name, project, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Tasks Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-16 admin-card">
              <p className="text-admin-muted">No tasks found</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className="group relative cursor-pointer"
                  onClick={() => router.push(`/dashboard/engagements/${task.engagement_id}`)}
                >
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                  <div className="relative admin-card p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(task.status)}
                        </div>
                        <h3 className="text-xl font-bold text-midnight group-hover:gradient-text transition-all duration-300">
                          {task.task_name}
                        </h3>
                        <p className="text-sm text-[#5B6CFF] mt-1">
                          {task.engagements?.project_name}
                        </p>
                        <p className="text-xs text-admin-muted">
                          {task.engagements?.clients?.company_name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleEditTask(task, e)}
                        className="p-2 rounded-lg border border-[#5B6CFF] bg-white text-midnight hover:bg-[#F3F4F6] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>

                    {/* Assignment */}
                    {task.employees && (
                      <div className="mb-3">
                        <span className="text-xs text-admin-muted">Assigned to:</span>
                        <p className="text-sm text-midnight">
                          {task.employees.first_name} {task.employees.last_name}
                        </p>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      {task.start_date && (
                        <div>
                          <span className="text-xs text-admin-muted">Start</span>
                          <p className="text-sm text-midnight">
                            {new Date(task.start_date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {task.due_date && (
                        <div>
                          <span className="text-xs text-admin-muted">Due</span>
                          <p className="text-sm text-midnight">
                            {new Date(task.due_date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <span className="text-xs text-admin-muted">Est. Hours</span>
                        <p className="text-sm font-medium text-midnight">
                          {task.estimated_hours || 0}
                        </p>
                      </div>
                      {task.actual_hours && (
                        <div>
                          <span className="text-xs text-admin-muted">Actual</span>
                          <p className="text-sm font-medium text-midnight">
                            {task.actual_hours}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                      {task.status === 'pending' && (
                        <button
                          onClick={(e) => updateTaskStatus(task.id, 'in-progress', e)}
                          className="text-xs px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button
                          onClick={(e) => updateTaskStatus(task.id, 'completed', e)}
                          className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {task.status === 'pending' && (
                        <button
                          onClick={(e) => updateTaskStatus(task.id, 'cancelled', e)}
                          className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <span className="text-xs text-admin-muted ml-auto">
                        View Details →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingTask(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
                  Edit Task
                </h2>
                <p className="text-admin-muted mt-1">Update task details and assignment</p>
              </div>

              <form onSubmit={handleUpdateTask} className="p-6 space-y-6">
                {/* Task Name */}
                <div>
                  <label className="block text-sm font-medium text-admin-muted mb-2">
                    Task Name *
                  </label>
                  <input
                    type="text"
                    value={editingTask.task_name}
                    onChange={(e) => setEditingTask({ ...editingTask, task_name: e.target.value })}
                    required
                    className="admin-input"
                    placeholder="Task name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-admin-muted mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingTask.description || ''}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    rows={3}
                    className="admin-input resize-none"
                    placeholder="Task description..."
                  />
                </div>

                {/* Assignment and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Assign To
                    </label>
                    <select
                      value={editingTask.assigned_to || ''}
                      onChange={(e) => setEditingTask({ ...editingTask, assigned_to: e.target.value || null })}
                      className="admin-select"
                    >
                      <option value="">Unassigned</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.first_name} {emp.last_name} - {emp.job_title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Status
                    </label>
                    <select
                      value={editingTask.status}
                      onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                      className="admin-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editingTask.start_date || ''}
                      onChange={(e) => setEditingTask({ ...editingTask, start_date: e.target.value || null })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={editingTask.due_date || ''}
                      onChange={(e) => setEditingTask({ ...editingTask, due_date: e.target.value || null })}
                      className="admin-input"
                    />
                  </div>
                </div>

                {/* Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      value={editingTask.estimated_hours || 0}
                      onChange={(e) => setEditingTask({ ...editingTask, estimated_hours: parseFloat(e.target.value) || 0 })}
                      className="admin-input"
                      step="0.5"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Actual Hours
                    </label>
                    <input
                      type="number"
                      value={editingTask.actual_hours || ''}
                      onChange={(e) => setEditingTask({ ...editingTask, actual_hours: e.target.value ? parseFloat(e.target.value) : null })}
                      className="admin-input"
                      step="0.5"
                      min="0"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Completion Date (if completed) */}
                {editingTask.status === 'completed' && (
                  <div>
                    <label className="block text-sm font-medium text-admin-muted mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={editingTask.completion_date || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEditingTask({ ...editingTask, completion_date: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="admin-button-secondary px-6 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="admin-button px-6 py-2 disabled:opacity-50"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}