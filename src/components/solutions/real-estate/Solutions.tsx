'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Property Management System',
    description: 'End-to-end platform for managing residential and commercial properties, tenants, and operations.',
    icon: '🏢',
    image: '/images/solutions/real-estate/solution-pms.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Tenant Portal', 'Lease Management', 'Maintenance Tracking', 'Rent Collection'],
    benefits: ['30% operational efficiency', 'Real-time insights', 'Tenant satisfaction']
  },
  {
    title: 'Real Estate Listing Portal',
    description: 'Powerful property listing platform with advanced search, virtual tours, and agent tools.',
    icon: '🌐',
    image: '/images/solutions/real-estate/solution-portal.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Property Listings', 'Map Search', 'Virtual Tours', 'Lead Generation'],
    benefits: ['50K+ monthly visitors', 'High conversion', 'SEO optimized']
  },
  {
    title: 'Smart Building IoT Platform',
    description: 'IoT-enabled building management for energy efficiency, security, and predictive maintenance.',
    icon: '🏙️',
    image: '/images/solutions/real-estate/solution-iot.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Energy Monitoring', 'Access Control', 'Predictive Maintenance', 'Tenant App'],
    benefits: ['35% energy savings', '24/7 security', 'Reduced downtime']
  },
  {
    title: 'Real Estate CRM',
    description: 'Customer relationship management designed specifically for real estate professionals.',
    icon: '🤝',
    image: '/images/solutions/real-estate/solution-crm.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Lead Tracking', 'Client Portal', 'Transaction Management', 'Email Marketing'],
    benefits: ['45% more leads', 'Faster closures', 'Better client relationships']
  },
  {
    title: 'Ejari Integration System',
    description: "Seamless integration with Dubai's Ejari system for automated tenancy contract registration.",
    icon: '📝',
    image: '/images/solutions/real-estate/solution-ejari.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Ejari API', 'Document Management', 'Automated Renewals', 'Compliance Tracking'],
    benefits: ['90% faster registration', 'Zero errors', 'Fully compliant']
  },
  {
    title: 'Property Analytics Dashboard',
    description: 'Data-driven insights for property valuation, market trends, and investment decisions.',
    icon: '📊',
    image: '/images/solutions/real-estate/solution-analytics.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Market Analysis', 'Valuation Models', 'Portfolio Analytics', 'Predictive Insights'],
    benefits: ['Data-driven decisions', 'Competitive advantage', 'ROI optimization']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (property market heat map)
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

    // Create heat map points
    const heatPoints: { x: number; y: number; intensity: number; pulse: number }[] = []

    for (let i = 0; i < 20; i++) {
      heatPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        intensity: 0.1 + Math.random() * 0.2,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create property value indicators
    const values = ['AED 1.2M', 'AED 2.5M', 'AED 850K', 'AED 3.1M', 'AED 1.8M', 'AED 4.2M']
    const markers: { x: number; y: number; value: string; size: number }[] = []

    for (let i = 0; i < 8; i++) {
      markers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: values[Math.floor(Math.random() * values.length)],
        size: 10 + Math.random() * 10,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw heat map
      heatPoints.forEach((point) => {
        point.pulse += 0.02
        const pulseIntensity = point.intensity + Math.sin(point.pulse) * 0.05

        ctx.beginPath()
        ctx.arc(point.x, point.y, 50, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 100)
        gradient.addColorStop(0, `rgba(255, 46, 159, ${pulseIntensity})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw property markers
      markers.forEach((marker) => {
        ctx.font = `${marker.size}px monospace`
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fillText(marker.value, marker.x, marker.y)

        // Draw pin
        ctx.beginPath()
        ctx.arc(marker.x - 15, marker.y - 10, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fill()
      })

      // Draw map grid
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
            PropTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed for every aspect of the 
            real estate industry, from property management to smart buildings.
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