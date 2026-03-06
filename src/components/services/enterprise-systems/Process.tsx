'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Requirements Analysis',
    description: 'We work with stakeholders to understand business processes, pain points, and system requirements.',
    icon: '🔍',
    image: '/images/enterprise-systems/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Stakeholder interviews',
      'Process mapping',
      'Gap analysis',
      'Requirements documentation'
    ]
  },
  {
    phase: 'Design',
    title: 'Solution Architecture',
    description: 'We design the system architecture, data models, and integration points for optimal performance.',
    icon: '📐',
    image: '/images/enterprise-systems/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'System architecture',
      'Data modeling',
      'Integration design',
      'Security framework'
    ]
  },
  {
    phase: 'Development',
    title: 'Configuration & Customization',
    description: 'We configure and customize the enterprise system to match your specific business requirements.',
    icon: '⚙️',
    image: '/images/enterprise-systems/process-development.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'System configuration',
      'Custom development',
      'Integration development',
      'Data migration'
    ]
  },
  {
    phase: 'Testing',
    title: 'Quality Assurance',
    description: 'Rigorous testing ensures the system meets all functional and performance requirements.',
    icon: '✅',
    image: '/images/enterprise-systems/process-testing.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Unit testing',
      'Integration testing',
      'User acceptance testing',
      'Performance testing'
    ]
  },
  {
    phase: 'Deployment',
    title: 'Go-Live & Migration',
    description: 'We manage the cutover, data migration, and go-live with minimal business disruption.',
    icon: '🚀',
    image: '/images/enterprise-systems/process-deployment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Cutover planning',
      'Data migration',
      'Go-live support',
      'Rollback procedures'
    ]
  },
  {
    phase: 'Support',
    title: 'Ongoing Optimization',
    description: 'Continuous support, training, and system optimization to maximize business value.',
    icon: '🔧',
    image: '/images/enterprise-systems/process-support.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'User training',
      'System monitoring',
      'Performance optimization',
      'Continuous improvement'
    ]
  }
]

export default function Process() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Process section
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

    // Create workflow visualization
    const nodes: { x: number; y: number; connections: number[]; phase: number }[] = []
    
    for (let i = 0; i < 6; i++) {
      nodes.push({
        x: 100 + i * 200,
        y: canvas.height / 2,
        connections: [],
        phase: i,
      })
    }

    // Connect nodes in sequence
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].connections.push(i + 1)
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach(connIndex => {
          const target = nodes[connIndex]
          
          // Animated flow along connection
          const flowPos = (time + node.phase) % 1
          const flowX = node.x + (target.x - node.x) * flowPos
          const flowY = node.y + (target.y - node.y) * flowPos

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw flowing pulse
          ctx.beginPath()
          ctx.arc(flowX, flowY, 4, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.4)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.1)`
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = i === activeStep ? '#FF2E9F' : '#5B6CFF'
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
  }, [activeStep])

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
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Timeline Background */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-20 hidden lg:block" />

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
            Implementation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successful enterprise system implementation 
            with minimal disruption and maximum business value.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-30' : ''
                  }`}
                  style={{ background: step.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.phase}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Phase */}
                    <div 
                      className="text-sm font-medium mb-2 text-transparent bg-clip-text"
                      style={{ backgroundImage: step.gradient }}
                    >
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4">
                      {step.description}
                    </p>

                    {/* Details (visible on hover) */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-1">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <span 
                              className="w-1 h-1 rounded-full"
                              style={{ background: step.gradient }}
                            />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
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