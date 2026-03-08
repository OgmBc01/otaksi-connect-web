'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'ERP Transformation for Retail Giant',
    client: 'Majid Al Futtaim',
    description: 'Implemented SAP S/4HANA across 50+ retail locations, unifying finance, supply chain, and HR operations.',
    image: '/images/enterprise-systems/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '40% operational efficiency, unified platform',
    metrics: ['50+ locations', '10K+ users', 'Real-time inventory'],
    slug: 'property-management-dubai-heights'
  },
  {
    id: 2,
    title: 'CRM Implementation for Banking',
    client: 'Emirates NBD',
    description: 'Deployed Salesforce CRM to manage 2M+ customer relationships, improving sales and service delivery.',
    image: '/images/enterprise-systems/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '45% sales growth, 360° customer view',
    metrics: ['2M+ customers', '30% faster response', 'AI-powered insights'],
    slug: 'digital-banking-gulf-financial'
  },
  {
    id: 3,
    title: 'HCM Modernization for Healthcare',
    client: 'DHA',
    description: 'Implemented Oracle HCM Cloud for 15,000+ healthcare workers, streamlining HR and payroll processes.',
    image: '/images/enterprise-systems/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '50% HR efficiency, 100% compliance',
    metrics: ['15K+ employees', 'Automated payroll', 'Self-service portal'],
    slug: 'ehr-gulf-health'
  },
  {
    id: 4,
    title: 'SCM Optimization for Logistics',
    client: 'DP World',
    description: 'End-to-end supply chain management system integrating ports, warehouses, and transportation networks.',
    image: '/images/enterprise-systems/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '30% cost reduction, 99% accuracy',
    metrics: ['1M+ shipments', 'Real-time tracking', 'Predictive analytics'],
    slug: 'fleet-management-gulf-logistics'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section
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

    // Create floating achievement badges
    const badges: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotSpeed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      badges.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 30,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    const symbols = ['🏆', '⭐', '📈', '💯', '🚀', '✅', '🎯', '💡']

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw floating badges
      badges.forEach((badge) => {
        badge.x += badge.speedX
        badge.y += badge.speedY
        badge.rotation += badge.rotSpeed

        if (badge.x < 0 || badge.x > canvas.width) badge.speedX *= -1
        if (badge.y < 0 || badge.y > canvas.height) badge.speedY *= -1

        ctx.save()
        ctx.translate(badge.x, badge.y)
        ctx.rotate(badge.rotation)
        ctx.font = `${badge.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${badge.opacity})`
        ctx.fillText(symbols[Math.floor(Math.random() * symbols.length)], -badge.size/2, badge.size/2)
        ctx.restore()
      })

      // Draw glowing orbs
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + Math.sin(time + i) * 0.1)
        const y = canvas.height * (0.3 + Math.cos(time * 0.5 + i) * 0.2)
        
        ctx.beginPath()
        ctx.arc(x, y, 50, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100)
        gradient.addColorStop(0, `rgba(91, 108, 255, 0.05)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
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
            Enterprise{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading UAE enterprises transform their operations 
            with powerful business systems.
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
            <span>View All Enterprise Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
