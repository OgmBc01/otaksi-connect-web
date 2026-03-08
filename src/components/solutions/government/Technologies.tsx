'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'Government Platforms',
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/government/tech-platforms.jpg',
    items: [
      { name: 'Salesforce Government', level: 90, description: 'Government CRM' },
      { name: 'ServiceNow Government', level: 85, description: 'Digital government' },
      { name: 'Microsoft Government', level: 90, description: 'Government cloud' },
      { name: 'Oracle Government', level: 85, description: 'Public sector solutions' },
    ]
  },
  {
    category: 'Smart City IoT',
    icon: '🏙️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/government/tech-iot.jpg',
    items: [
      { name: 'Cisco Smart City', level: 85, description: 'Connected infrastructure' },
      { name: 'Siemens', level: 80, description: 'Urban infrastructure' },
      { name: 'Honeywell', level: 80, description: 'Building automation' },
      { name: 'IBM Watson IoT', level: 85, description: 'IoT platform' },
    ]
  },
  {
    category: 'Identity & Access',
    icon: '🆔',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/government/tech-identity.jpg',
    items: [
      { name: 'Okta', level: 90, description: 'Identity management' },
      { name: 'ForgeRock', level: 85, description: 'Citizen identity' },
      { name: 'Ping Identity', level: 85, description: 'Access management' },
      { name: 'Microsoft Entra', level: 90, description: 'Identity platform' },
    ]
  },
  {
    category: 'Open Data',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/government/tech-opendata.jpg',
    items: [
      { name: 'CKAN', level: 85, description: 'Open data platform' },
      { name: 'Socrata', level: 80, description: 'Data portal' },
      { name: 'OpenDataSoft', level: 80, description: 'Data sharing' },
      { name: 'ArcGIS', level: 85, description: 'Geospatial data' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section (government data center)
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

    // Create server rack visualization
    const servers: { x: number; y: number; width: number; height: number; activity: number }[] = []

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 5; j++) {
        servers.push({
          x: 200 + i * 100,
          y: 200 + j * 40,
          width: 60,
          height: 30,
          activity: Math.random(),
        })
      }
    }

    // Create data transfer indicators
    const dataTransfers: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 10; i++) {
      dataTransfers.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw server racks
      servers.forEach((server) => {
        // Server outline
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1
        ctx.strokeRect(server.x, server.y, server.width, server.height)

        // Activity light
        const activity = Math.sin(time * 5 + server.x) > 0
        ctx.fillStyle = activity ? 'rgba(255, 46, 159, 0.2)' : 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(server.x + 45, server.y + 10, 5, 5)
      })

      // Draw data transfers
      dataTransfers.forEach((transfer) => {
        transfer.progress += transfer.speed

        if (transfer.progress > 1) {
          transfer.progress = 0
          transfer.x1 = Math.random() * canvas.width
          transfer.y1 = Math.random() * canvas.height
          transfer.x2 = Math.random() * canvas.width
          transfer.y2 = Math.random() * canvas.height
        }

        // Draw transfer line
        ctx.beginPath()
        ctx.moveTo(transfer.x1, transfer.y1)
        ctx.lineTo(transfer.x2, transfer.y2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw data packet
        const currentX = transfer.x1 + (transfer.x2 - transfer.x1) * transfer.progress
        const currentY = transfer.y1 + (transfer.y2 - transfer.y1) * transfer.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
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
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Tech Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
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
            Government{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage secure, scalable, and compliant platforms for government 
            digital transformation.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {technologies.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: category.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Header */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.category}
                      fill
                      className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent" />
                    
                    {/* Category Header */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: category.gradient }}
                      >
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="p-6 space-y-4">
                    {category.items.map((tech, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-white">{tech.name}</span>
                            <p className="text-xs text-gray-500">{tech.description}</p>
                          </div>
                          <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">
                            {tech.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: category.gradient }}
                          />
                        </div>
                      </div>
                    ))}
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