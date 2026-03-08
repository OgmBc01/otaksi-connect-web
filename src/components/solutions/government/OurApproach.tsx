'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'Smart City Platforms',
    description: 'Integrated platforms connecting city services, infrastructure, and citizens for smarter urban living.',
    icon: '🏙️',
    image: '/images/solutions/government/approach-smartcity.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['IoT Integration', 'Urban Analytics', 'Service Connectivity', 'Citizen Engagement']
  },
  {
    title: 'Citizen Service Portals',
    description: 'Digital portals providing citizens with 24/7 access to government services and information.',
    icon: '👥',
    image: '/images/solutions/government/approach-portal.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Service Requests', 'Document Management', 'Payment Processing', 'Status Tracking']
  },
  {
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation of government operations and service delivery.',
    icon: '🔄',
    image: '/images/solutions/government/approach-transformation.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Process Automation', 'Legacy Modernization', 'Change Management', 'Digital Strategy']
  },
  {
    title: 'E-Government Systems',
    description: 'Comprehensive systems for internal government operations and inter-agency collaboration.',
    icon: '⚙️',
    image: '/images/solutions/government/approach-egovernment.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Document Management', 'Workflow Automation', 'Inter-agency Integration', 'Compliance']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section (government infrastructure)
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

    // Create building silhouettes
    const buildings: { x: number; height: number; width: number; pulse: number }[] = []

    for (let i = 0; i < 10; i++) {
      buildings.push({
        x: 100 + i * 150,
        height: 100 + Math.random() * 150,
        width: 60,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create service indicators (floating icons)
    const services: { x: number; y: number; icon: string; size: number; speedY: number; opacity: number }[] = []
    const serviceIcons = ['📋', '🆔', '🚔', '🏥', '📚', '⚖️', '🏛️']

    for (let i = 0; i < 10; i++) {
      services.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        icon: serviceIcons[Math.floor(Math.random() * serviceIcons.length)],
        size: 20 + Math.random() * 16,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw buildings
      buildings.forEach((building) => {
        building.pulse += 0.02
        const pulseHeight = building.height + Math.sin(building.pulse) * 10

        // Building outline
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1
        ctx.strokeRect(building.x, 400 - pulseHeight, building.width, pulseHeight)

        // Windows
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        for (let w = 0; w < 5; w++) {
          if (pulseHeight > w * 30) {
            ctx.fillRect(building.x + 10, 400 - pulseHeight + w * 30 + 10, 10, 15)
            ctx.fillRect(building.x + 35, 400 - pulseHeight + w * 30 + 10, 10, 15)
          }
        }
      })

      // Draw floating service icons
      services.forEach((service) => {
        service.y -= service.speedY

        if (service.y < 0) {
          service.y = canvas.height
          service.x = Math.random() * canvas.width
        }

        ctx.font = `${service.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${service.opacity})`
        ctx.fillText(service.icon, service.x, service.y)
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
            We combine public sector expertise with innovative technology to deliver 
            efficient, accessible, and secure government services.
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