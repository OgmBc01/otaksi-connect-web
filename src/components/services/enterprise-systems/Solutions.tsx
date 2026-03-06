'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Enterprise Resource Planning (ERP)',
    description: 'Integrated management of core business processes including finance, HR, supply chain, and operations in real-time.',
    icon: '📊',
    image: '/images/enterprise-systems/solution-erp.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Financial Management', 'Supply Chain', 'Human Resources', 'Business Intelligence'],
    benefits: ['30% operational efficiency', 'Real-time visibility', 'Unified data platform']
  },
  {
    title: 'Customer Relationship Management (CRM)',
    description: 'Comprehensive platform to manage customer interactions, sales pipelines, and service delivery across all channels.',
    icon: '🤝',
    image: '/images/enterprise-systems/solution-crm.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Sales Automation', 'Marketing Campaigns', 'Customer Service', 'Analytics'],
    benefits: ['45% sales growth', 'Improved retention', '360° customer view']
  },
  {
    title: 'Human Capital Management (HCM)',
    description: 'End-to-end HR solutions covering recruitment, payroll, performance management, and employee engagement.',
    icon: '👥',
    image: '/images/enterprise-systems/solution-hcm.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Core HR', 'Payroll', 'Talent Management', 'Workforce Analytics'],
    benefits: ['50% HR efficiency', 'Compliance guaranteed', 'Employee self-service']
  },
  {
    title: 'Supply Chain Management (SCM)',
    description: 'Optimize procurement, inventory, logistics, and demand planning with intelligent supply chain solutions.',
    icon: '📦',
    image: '/images/enterprise-systems/solution-scm.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Procurement', 'Inventory Optimization', 'Warehouse Management', 'Demand Forecasting'],
    benefits: ['25% cost reduction', '99% inventory accuracy', 'Faster fulfillment']
  },
  {
    title: 'Business Intelligence & Analytics',
    description: 'Transform data into actionable insights with powerful BI tools, dashboards, and predictive analytics.',
    icon: '📈',
    image: '/images/enterprise-systems/solution-bi.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Interactive Dashboards', 'Data Visualization', 'Predictive Analytics', 'Reporting'],
    benefits: ['Faster decisions', 'Data-driven culture', 'Competitive advantage']
  },
  {
    title: 'Enterprise Content Management',
    description: 'Manage documents, records, and digital assets with secure, compliant, and accessible content management systems.',
    icon: '📄',
    image: '/images/enterprise-systems/solution-ecm.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Document Management', 'Records Retention', 'Workflow Automation', 'Collaboration'],
    benefits: ['90% faster retrieval', 'Regulatory compliance', 'Reduced paper costs']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section
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

    // Create data flow particles (representing data moving through systems)
    const particles: {
      x: number
      y: number
      targetX: number
      targetY: number
      progress: number
      speed: number
      size: number
    }[] = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 2 + Math.random() * 3,
      })
    }

    // Create pulsing grid lines
    const gridSize = 60
    const gridLines: { x: number; y: number; opacity: number }[] = []

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        gridLines.push({
          x,
          y,
          opacity: Math.random() * 0.3,
        })
      }
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw grid lines
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.03)'
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw and update particles
      particles.forEach((particle) => {
        particle.progress += particle.speed
        
        if (particle.progress >= 1) {
          particle.progress = 0
          particle.x = particle.targetX
          particle.y = particle.targetY
          particle.targetX = Math.random() * canvas.width
          particle.targetY = Math.random() * canvas.height
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress

        // Draw particle trail
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = `rgba(255, 46, 159, ${0.1 * (1 - particle.progress)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw particle
        ctx.beginPath()
        ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, particle.size * 2)
        gradient.addColorStop(0, `rgba(255, 46, 159, 0.3)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw pulsing grid intersections
      gridLines.forEach((point) => {
        const pulse = Math.sin(time * 2 + point.x * 0.05 + point.y * 0.05) * 0.1 + 0.1
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, ${pulse})`
        ctx.fill()
      })

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
        staggerChildren: 0.1,
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
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(91, 108, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

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
            Enterprise{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive business software solutions designed to streamline operations, 
            enhance productivity, and drive growth for UAE enterprises.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: solution.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: solution.gradient }}
                      >
                        <span className="text-xl">{solution.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: solution.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {solution.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {benefit}
                        </span>
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