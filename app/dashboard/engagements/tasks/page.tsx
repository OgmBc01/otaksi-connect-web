'use client'

import { motion } from 'framer-motion'
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
    first_name: string
    last_name: string
  } | null
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchTasks()
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
  )
}