'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Fleet Management Transformation',
    client: 'DP World',
    description: 'Implemented comprehensive fleet management system for 1,000+ vehicles, optimizing routes and reducing fuel costs.',
    image: '/images/solutions/logistics/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '30% fuel savings, 1,000+ vehicles',
    metrics: ['Real-time tracking', 'Route optimization', 'Driver behavior'],
    slug: 'fleet-management-gulf-logistics'
  },
  {
    id: 2,
    title: 'Warehouse Automation',
    client: 'Aramex',
    description: 'Automated warehouse operations with WMS and robotics, increasing throughput by 40%.',
    image: '/images/solutions/logistics/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '40% throughput increase, 99.9% accuracy',
    metrics: ['Automated picking', 'Inventory accuracy', 'Space optimization'],
    slug: 'warehouse-automation-gulf-logistics'
  },
  {
    id: 3,
    title: 'Last Mile Delivery Optimization',
    client: 'Fetchr',
    description: 'AI-powered last mile delivery platform serving 1M+ customers with real-time tracking.',
    image: '/images/solutions/logistics/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '25% faster deliveries, 1M+ customers',
    metrics: ['Route optimization', 'Proof of delivery', 'Customer notifications'],
    slug: 'fleet-management-gulf-logistics'
  },
  {
    id: 4,
    title: 'Supply Chain Control Tower',
    client: 'Al Futtaim Logistics',
    description: 'End-to-end supply chain visibility platform across 50+ distribution centers.',
    image: '/images/solutions/logistics/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: 'End-to-end visibility, 50+ DCs',
    metrics: ['Real-time alerts', 'Predictive analytics', 'Supplier collaboration'],
    slug: 'fleet-management-gulf-logistics'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section (performance metrics)
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

    // Create performance metrics
    const metrics: { label: string; value: number; target: number; x: number; y: number; speed: number }[] = [
      { label: 'On-time Delivery', value: 92, target: 98, x: 200, y: 200, speed: 0.1 },
      { label: 'Inventory Accuracy', value: 95, target: 99, x: 500, y: 250, speed: 0.15 },
      { label: 'Fleet Utilization', value: 78, target: 90, x: 800, y: 300, speed: 0.2 },
    ]

    // Create floating shipment indicators
    const shipments: { x: number; y: number; status: string; size: number; speedY: number; opacity: number }[] = []
    const statuses = ['Delivered', 'In Transit', 'Processing', 'Out for Delivery']

    for (let i = 0; i < 12; i++) {
      shipments.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        size: 10 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw performance metrics
      metrics.forEach((metric) => {
        if (metric.value < metric.target) {
          metric.value += metric.speed
        }

        // Progress bar background
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(metric.x, metric.y, 150, 8)

        // Progress bar fill
        const progress = (metric.value / metric.target) * 150
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(metric.x, metric.y, progress, 8)

        // Label
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(`${metric.label}: ${Math.round(metric.value)}%`, metric.x, metric.y - 10)
      })

      // Draw floating shipments
      shipments.forEach((shipment) => {
        shipment.y -= shipment.speedY

        if (shipment.y < 0) {
          shipment.y = canvas.height
          shipment.x = Math.random() * canvas.width
        }

        ctx.font = `${shipment.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${shipment.opacity})`
        ctx.fillText('📦', shipment.x, shipment.y)
        
        ctx.font = '8px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, ${shipment.opacity})`
        ctx.fillText(shipment.status, shipment.x + 15, shipment.y - 5)
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
      
      {/* Success Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading logistics companies optimize operations 
            and drive efficiency.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                    style={{ background: study.gradient }}
                  />
                  
                  {/* Card */}
                  <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Client Badge */}
                      <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs border border-white/10">
                        {study.client}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <span 
                              className="w-1 h-1 rounded-full mr-2"
                              style={{ background: study.gradient }}
                            />
                            {metric}
                          </div>
                        ))}
                      </div>

                      {/* Result Badge */}
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                        style={{ 
                          background: `${study.gradient}`, 
                          opacity: 0.9 
                        }}
                      >
                        {study.results}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span>View All Logistics Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
