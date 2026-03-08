'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'Fleet Management',
    description: 'Comprehensive solutions for managing vehicle fleets, optimizing routes, and reducing operational costs.',
    icon: '🚛',
    image: '/images/solutions/logistics/approach-fleet.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Real-time Tracking', 'Route Optimization', 'Driver Management', 'Maintenance Scheduling']
  },
  {
    title: 'Warehouse Automation',
    description: 'Smart warehouse solutions with inventory management, picking optimization, and automation integration.',
    icon: '🏭',
    image: '/images/solutions/logistics/approach-warehouse.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Inventory Control', 'Pick & Pack Optimization', 'WMS Integration', 'Automation Ready']
  },
  {
    title: 'Real-time Tracking',
    description: 'End-to-end visibility across your supply chain with IoT sensors and GPS tracking.',
    icon: '📍',
    image: '/images/solutions/logistics/approach-tracking.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['GPS Tracking', 'IoT Sensors', 'Status Updates', 'Customer Notifications']
  },
  {
    title: 'Supply Chain Analytics',
    description: 'Data-driven insights to optimize inventory, forecast demand, and improve decision-making.',
    icon: '📊',
    image: '/images/solutions/logistics/approach-analytics.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Demand Forecasting', 'Inventory Optimization', 'Performance Analytics', 'Cost Analysis']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section (warehouse conveyor belt)
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

    // Create conveyor belt with moving packages
    const packages: { x: number; y: number; size: number; speed: number; color: string }[] = []

    for (let i = 0; i < 15; i++) {
      packages.push({
        x: Math.random() * canvas.width,
        y: 300 + Math.random() * 100,
        size: 15 + Math.random() * 10,
        speed: 0.5 + Math.random() * 1,
        color: i % 2 === 0 ? 'rgba(91, 108, 255' : 'rgba(255, 46, 159',
      })
    }

    // Create warehouse racking lines
    const racks: { x: number; y: number; height: number; levels: number }[] = []

    for (let i = 0; i < 5; i++) {
      racks.push({
        x: 200 + i * 250,
        y: 400,
        height: 150,
        levels: 4,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw conveyor belt line
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, 350)
      ctx.lineTo(canvas.width, 350)
      ctx.stroke()

      // Draw moving packages on conveyor
      packages.forEach((pkg) => {
        pkg.x += pkg.speed

        if (pkg.x > canvas.width + 50) {
          pkg.x = -50
          pkg.y = 300 + Math.random() * 100
        }

        // Package body
        ctx.fillStyle = `${pkg.color}, 0.2)`
        ctx.fillRect(pkg.x, pkg.y, pkg.size, pkg.size * 0.7)

        // Package label
        ctx.fillStyle = `${pkg.color}, 0.3)`
        ctx.fillRect(pkg.x + 3, pkg.y + 3, pkg.size - 6, 4)
      })

      // Draw warehouse racks
      racks.forEach((rack) => {
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1

        // Vertical supports
        ctx.beginPath()
        ctx.moveTo(rack.x, rack.y)
        ctx.lineTo(rack.x, rack.y - rack.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(rack.x + 100, rack.y)
        ctx.lineTo(rack.x + 100, rack.y - rack.height)
        ctx.stroke()

        // Horizontal shelves
        for (let i = 0; i <= rack.levels; i++) {
          const y = rack.y - (i * rack.height / rack.levels)
          ctx.beginPath()
          ctx.moveTo(rack.x, y)
          ctx.lineTo(rack.x + 100, y)
          ctx.stroke()
        }
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
            We combine logistics expertise with innovative technology to optimize 
            your supply chain from end to end.
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