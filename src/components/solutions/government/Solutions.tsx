'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Citizen Service Portal',
    description: 'Unified digital portal providing citizens with access to all government services in one place.',
    icon: '👥',
    image: '/images/solutions/government/solution-portal.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Service Catalog', 'Digital Applications', 'Payment Gateway', 'Status Tracking'],
    benefits: ['24/7 access', 'Reduced wait times', 'Paperless processes']
  },
  {
    title: 'Smart City Platform',
    description: 'Integrated IoT platform connecting city infrastructure for smarter urban management.',
    icon: '🏙️',
    image: '/images/solutions/government/solution-smartcity.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Traffic Management', 'Waste Management', 'Street Lighting', 'Environmental Monitoring'],
    benefits: ['35% efficiency gain', 'Real-time insights', 'Cost savings']
  },
  {
    title: 'Document Management System',
    description: 'Secure digital repository for government documents with workflow automation.',
    icon: '📋',
    image: '/images/solutions/government/solution-dms.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Version Control', 'Access Management', 'Approval Workflows', 'Audit Trail'],
    benefits: ['50% faster processing', 'Enhanced security', 'Regulatory compliance']
  },
  {
    title: 'E-Services Platform',
    description: 'Comprehensive platform for delivering digital government services to citizens and businesses.',
    icon: '⚙️',
    image: '/images/solutions/government/solution-eservices.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['License Renewals', 'Permit Applications', 'Certificate Requests', 'Fee Payments'],
    benefits: ['80% digital adoption', 'Reduced paperwork', 'Citizen satisfaction']
  },
  {
    title: 'Open Data Platform',
    description: 'Transparent data sharing platform promoting innovation and civic engagement.',
    icon: '📊',
    image: '/images/solutions/government/solution-opendata.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Data Catalog', 'APIs', 'Visualization Tools', 'Developer Portal'],
    benefits: ['Transparency', 'Innovation', 'Economic growth']
  },
  {
    title: 'Emergency Response System',
    description: 'Integrated platform for coordinating emergency services and disaster response.',
    icon: '🚨',
    image: '/images/solutions/government/solution-emergency.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Incident Management', 'Resource Tracking', 'Alert System', 'Multi-agency Coordination'],
    benefits: ['Faster response', 'Better coordination', 'Lives saved']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (government dashboard)
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

    // Create service usage metrics
    const metrics: { label: string; value: number; target: number; x: number; y: number; speed: number }[] = [
      { label: 'Service Requests', value: 75, target: 100, x: 200, y: 200, speed: 0.1 },
      { label: 'Digital Adoption', value: 65, target: 90, x: 500, y: 250, speed: 0.15 },
      { label: 'Citizen Satisfaction', value: 82, target: 95, x: 800, y: 300, speed: 0.1 },
    ]

    // Create floating citizen satisfaction stars
    const stars: { x: number; y: number; rating: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 12; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        rating: 3 + Math.floor(Math.random() * 2),
        size: 16 + Math.random() * 12,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw metrics
      metrics.forEach((metric) => {
        if (metric.value < metric.target) {
          metric.value += metric.speed
        }

        // Metric card
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.strokeRect(metric.x, metric.y, 150, 80)

        // Label
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(metric.label, metric.x + 10, metric.y + 20)

        // Value
        ctx.font = '24px monospace'
        ctx.fillStyle = 'rgba(255, 46, 159, 0.3)'
        ctx.fillText(`${Math.round(metric.value)}%`, metric.x + 30, metric.y + 60)
      })

      // Draw floating stars
      stars.forEach((star) => {
        star.y -= star.speedY

        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        ctx.font = `${star.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${star.opacity})`
        ctx.fillText('★'.repeat(star.rating), star.x, star.y)
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
            Government{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to modernize government operations 
            and enhance citizen services.
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