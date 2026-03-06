'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'Enterprise Architecture',
    description: 'We design scalable, secure, and integrated architectures that align with your business goals and IT strategy.',
    icon: '🏛️',
    image: '/images/enterprise-systems/approach-architecture.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['TOGAF Framework', 'Business Capability Mapping', 'Application Portfolio Management', 'Technology Roadmap']
  },
  {
    title: 'Custom ERP Solutions',
    description: 'Tailored ERP systems that integrate finance, HR, supply chain, and operations into a unified platform.',
    icon: '📊',
    image: '/images/enterprise-systems/approach-erp.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Financial Management', 'Supply Chain', 'HR & Payroll', 'Business Intelligence']
  },
  {
    title: 'CRM & Customer Experience',
    description: 'Comprehensive CRM solutions to manage customer relationships, sales pipelines, and service delivery.',
    icon: '🤝',
    image: '/images/enterprise-systems/approach-crm.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Sales Force Automation', 'Marketing Automation', 'Customer Service', 'Analytics & Reporting']
  },
  {
    title: 'Integration & Middleware',
    description: 'Seamless integration between disparate systems using modern middleware and API management.',
    icon: '🔌',
    image: '/images/enterprise-systems/approach-integration.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['ESB Architecture', 'API Gateway', 'Event-Driven Integration', 'Legacy System Integration']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section
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

    // Create system nodes and connections (enterprise integration visualization)
    const nodes: { x: number; y: number; connections: number[]; pulse: number }[] = []
    
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200) {
            node.connections.push(j)
          }
        }
      })
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(connIndex => {
          const target = nodes[connIndex]
          
          const opacity = 0.1 + Math.sin(time * 2 + i) * 0.05
          const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
          gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(91, 108, 255, ${opacity})`)
          gradient.addColorStop(1, `rgba(255, 46, 159, ${opacity})`)

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        node.pulse += 0.02
        const size = 3 + Math.sin(node.pulse) * 1

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
        gradient.addColorStop(0, `rgba(255, 46, 159, 0.4)`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, 0.3)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A systematic methodology for designing and implementing enterprise systems 
            that drive business transformation.
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
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
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