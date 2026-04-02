'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Smart Building Platform',
    client: 'Vertex Estates',
    description: 'IoT-enabled building management system for 50+ luxury residential towers in Dubai.',
    image: '/images/solutions/real-estate/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '35% energy savings, 50K+ residents',
    metrics: ['50+ buildings', 'IoT sensors', 'Tenant app'],
    slug: 'smart-building-dubai-heights'
  },
  {
    id: 2,
    title: 'Property Management Portal',
    client: 'Vertex Estates',
    description: 'Comprehensive property management platform for 20,000+ residential units.',
    image: '/images/solutions/real-estate/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '40% efficiency gain, 20K+ units',
    metrics: ['Tenant portal', 'Automated payments', 'Maintenance tracking'],
    slug: 'property-management-dubai-heights'
  },
  {
    id: 3,
    title: 'Real Estate Marketplace',
    client: 'OmniMart',
    description: 'Advanced property listing platform with AI-powered search and virtual tours.',
    image: '/images/solutions/real-estate/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '1M+ monthly users, 50K+ listings',
    metrics: ['AI search', 'Virtual tours', 'Agent portal'],
    slug: 'multi-vendor-marketplace'
  },
  {
    id: 4,
    title: 'Ejari Integration System',
    client: 'Wasl Asset Management',
    description: 'Automated Ejari registration and renewal system for 30,000+ tenancy contracts.',
    image: '/images/solutions/real-estate/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '90% faster registration, 30K+ contracts',
    metrics: ['Ejari API', 'Document management', 'Compliance'],
    slug: 'property-management-dubai-heights'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section (property portfolio visualization)
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

    // Create property cards floating
    const cards: { x: number; y: number; width: number; height: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      cards.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 120,
        height: 80,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create property value indicators
    const values = ['+25% ROI', '+30% occupancy', 'AED 2.5M', '95% leased']
    const indicators: { x: number; y: number; text: string; size: number; pulse: number }[] = []

    for (let i = 0; i < 6; i++) {
      indicators.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: values[Math.floor(Math.random() * values.length)],
        size: 14 + Math.random() * 8,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw floating property cards
      cards.forEach((card) => {
        card.y -= card.speedY

        if (card.y < -card.height) {
          card.y = canvas.height + card.height
          card.x = Math.random() * canvas.width
        }

        // Card outline
        ctx.strokeStyle = `rgba(91, 108, 255, ${card.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(card.x, card.y, card.width, card.height)

        // Card details (lines)
        ctx.fillStyle = `rgba(255, 46, 159, ${card.opacity * 0.5})`
        ctx.fillRect(card.x + 10, card.y + 15, 40, 5)
        ctx.fillRect(card.x + 10, card.y + 30, 60, 5)
        ctx.fillRect(card.x + 10, card.y + 45, 30, 5)
      })

      // Draw value indicators
      indicators.forEach((indicator) => {
        indicator.pulse += 0.02
        const opacity = 0.2 + Math.sin(indicator.pulse) * 0.1

        ctx.font = `${indicator.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${opacity})`
        ctx.fillText(indicator.text, indicator.x, indicator.y)
      })

      // Draw connecting lines between properties
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(100 + i * 200, 100)
        ctx.lineTo(200 + i * 200, 300)
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 1
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
            PropTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading real estate companies transform their 
            operations and enhance property experiences.
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
            <span>View All PropTech Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
