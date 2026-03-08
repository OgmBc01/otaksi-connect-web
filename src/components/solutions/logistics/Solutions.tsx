'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Fleet Management System',
    description: 'Complete fleet management solution with real-time tracking, route optimization, and driver performance monitoring.',
    icon: '🚛',
    image: '/images/solutions/logistics/solution-fleet.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['GPS Tracking', 'Route Planning', 'Driver Behavior', 'Fuel Management'],
    benefits: ['30% fuel savings', '25% efficiency gain', 'Real-time alerts']
  },
  {
    title: 'Warehouse Management System',
    description: 'Advanced WMS for inventory control, picking optimization, and warehouse automation.',
    icon: '🏭',
    image: '/images/solutions/logistics/solution-wms.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Inventory Tracking', 'Pick & Pack', 'Cycle Counting', 'Putaway Optimization'],
    benefits: ['40% faster picking', '99.9% accuracy', 'Space optimization']
  },
  {
    title: 'Real-time Tracking Platform',
    description: 'End-to-end visibility platform for shipments, vehicles, and assets across your supply chain.',
    icon: '📍',
    image: '/images/solutions/logistics/solution-tracking.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Live GPS Tracking', 'IoT Sensors', 'Status Updates', 'Customer Portal'],
    benefits: ['Real-time visibility', 'Proactive alerts', 'Customer satisfaction']
  },
  {
    title: 'Last Mile Delivery',
    description: 'Optimize last-mile operations with route optimization, delivery scheduling, and proof of delivery.',
    icon: '🚚',
    image: '/images/solutions/logistics/solution-lastmile.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Route Optimization', 'Delivery Scheduling', 'Proof of Delivery', 'Customer Notifications'],
    benefits: ['20% faster deliveries', 'Reduced costs', 'Better customer experience']
  },
  {
    title: 'Inventory Optimization',
    description: 'Data-driven inventory management to reduce carrying costs while maintaining service levels.',
    icon: '📦',
    image: '/images/solutions/logistics/solution-inventory.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Demand Forecasting', 'Safety Stock', 'Reorder Points', 'ABC Analysis'],
    benefits: ['30% inventory reduction', 'Stockout prevention', 'Working capital optimization']
  },
  {
    title: 'Supply Chain Control Tower',
    description: 'Centralized visibility and control across your entire supply chain network.',
    icon: '🏢',
    image: '/images/solutions/logistics/solution-controltower.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Multi-party Visibility', 'Exception Management', 'Analytics Dashboard', 'Collaboration Portal'],
    benefits: ['End-to-end visibility', 'Faster decisions', 'Risk mitigation']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (supply chain network)
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

    // Create supply chain nodes (warehouses, ports, distribution centers)
    const nodes: { x: number; y: number; type: string; pulse: number }[] = []
    const types = ['🏭', '🚢', '🏢', '🚛', '📦']

    for (let i = 0; i < 8; i++) {
      nodes.push({
        x: 150 + i * 200,
        y: 200 + Math.sin(i) * 100,
        type: types[Math.floor(Math.random() * types.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create shipment flows between nodes
    const flows: { from: number; to: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 12; i++) {
      flows.push({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connections between nodes
      flows.forEach((flow) => {
        flow.progress += flow.speed

        if (flow.progress > 1) {
          flow.progress = 0
          flow.from = Math.floor(Math.random() * nodes.length)
          flow.to = Math.floor(Math.random() * nodes.length)
        }

        const fromNode = nodes[flow.from]
        const toNode = nodes[flow.to]

        if (fromNode && toNode) {
          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw moving shipment
          const currentX = fromNode.x + (toNode.x - fromNode.x) * flow.progress
          const currentY = fromNode.y + (toNode.y - fromNode.y) * flow.progress

          ctx.beginPath()
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += 0.02
        const pulseSize = 6 + Math.sin(node.pulse) * 2

        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fill()

        ctx.font = '20px Arial'
        ctx.fillStyle = 'rgba(255, 46, 159, 0.3)'
        ctx.fillText(node.type, node.x - 10, node.y - 20)
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
            Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to optimize every aspect 
            of your logistics and supply chain operations.
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