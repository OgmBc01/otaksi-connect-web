'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'CI/CD Pipeline Automation',
    description: 'Automated build, test, and deployment pipelines that enable rapid, reliable software delivery.',
    icon: '🔄',
    image: '/images/devops-sre/approach-cicd.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Continuous Integration', 'Continuous Delivery', 'Automated Testing', 'Deployment Strategies']
  },
  {
    title: 'Infrastructure as Code',
    description: 'Manage and provision infrastructure through code, ensuring consistency, version control, and repeatability.',
    icon: '📝',
    image: '/images/devops-sre/approach-iac.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Terraform', 'CloudFormation', 'Configuration Management', 'Immutable Infrastructure']
  },
  {
    title: 'Observability & Monitoring',
    description: 'Comprehensive monitoring, logging, and tracing to ensure system health and rapid incident response.',
    icon: '📊',
    image: '/images/devops-sre/approach-observability.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Metrics Collection', 'Log Aggregation', 'Distributed Tracing', 'Alerting']
  },
  {
    title: 'Site Reliability Engineering',
    description: 'Apply software engineering principles to operations, balancing reliability with feature velocity.',
    icon: '🔧',
    image: '/images/devops-sre/approach-sre.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['SLI/SLO Definition', 'Error Budgets', 'Incident Management', 'Chaos Engineering']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section (monitoring dashboard style)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()

    // Create monitoring graphs
    const graphs: {
      type: 'line' | 'bar'
      x: number
      y: number
      width: number
      height: number
      data: number[]
      color: string
    }[] = []

    for (let i = 0; i < 3; i++) {
      const data = []
      for (let j = 0; j < 20; j++) {
        data.push(Math.random() * 30 + 20)
      }
      graphs.push({
        type: 'line',
        x: 50 + i * 300,
        y: 100,
        width: 200,
        height: 80,
        data,
        color: i % 2 === 0 ? 'rgba(255, 46, 159' : 'rgba(91, 108, 255',
      })
    }

    // Create floating metrics
    const metrics: { x: number; y: number; label: string; value: string; change: number }[] = []
    const labels = ['CPU', 'Memory', 'Disk', 'Network', 'Requests', 'Errors']
    
    for (let i = 0; i < 8; i++) {
      metrics.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        label: labels[Math.floor(Math.random() * labels.length)],
        value: `${Math.floor(Math.random() * 100)}%`,
        change: (Math.random() - 0.5) * 0.5,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw graphs
      graphs.forEach((graph) => {
        // Update data
        graph.data.shift()
        graph.data.push(Math.random() * 30 + 20 + Math.sin(time) * 10)

        // Draw graph line
        ctx.beginPath()
        ctx.moveTo(graph.x, graph.y + 80 - graph.data[0])

        for (let i = 1; i < graph.data.length; i++) {
          ctx.lineTo(graph.x + i * 10, graph.y + 80 - graph.data[i])
        }

        ctx.strokeStyle = `${graph.color}, 0.3)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw area under graph
        ctx.lineTo(graph.x + graph.data.length * 10, graph.y + 80)
        ctx.lineTo(graph.x, graph.y + 80)
        ctx.fillStyle = `${graph.color}, 0.05)`
        ctx.fill()
      })

      // Draw metrics
      metrics.forEach((metric) => {
        metric.y += metric.change

        if (metric.y < 0 || metric.y > canvas.height) {
          metric.change *= -1
        }

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(91, 108, 255, 0.2)`
        ctx.fillText(`${metric.label}: ${metric.value}`, metric.x, metric.y)
      })

      // Draw grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.3

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A systematic methodology for implementing DevOps practices and Site 
            Reliability Engineering principles.
          </p>
        </motion.div>

        {/* Approach Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: approach.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={approach.image}
                      alt={approach.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: approach.gradient }}
                      >
                        <span className="text-xl">{approach.icon}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{approach.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {approach.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {approach.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span 
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ background: approach.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}