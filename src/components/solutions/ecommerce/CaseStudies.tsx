'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Multi-vendor Marketplace',
    client: 'Noon',
    description: 'Scalable marketplace platform serving 1M+ customers with 5,000+ sellers.',
    image: '/images/solutions/ecommerce/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '1M+ customers, 5K+ sellers',
    metrics: ['Multi-vendor', 'Commission tracking', 'Seller dashboard'],
    slug: 'multi-vendor-marketplace'
  },
  {
    id: 2,
    title: 'Omnichannel Retail Platform',
    client: 'Majid Al Futtaim',
    description: 'Integrated e-commerce platform connecting online stores with physical retail locations.',
    image: '/images/solutions/ecommerce/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '200% online growth, 100+ stores',
    metrics: ['Click & collect', 'Real-time inventory', 'Unified commerce'],
    slug: 'omnichannel-gulf-retail'
  },
  {
    id: 3,
    title: 'Mobile Commerce App',
    client: 'Namshi',
    description: 'Native mobile app driving 65% of revenue with personalized shopping experience.',
    image: '/images/solutions/ecommerce/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '65% mobile revenue, 4.8★ rating',
    metrics: ['Push notifications', 'Mobile payments', 'Personalization'],
    slug: 'multi-vendor-marketplace'
  },
  {
    id: 4,
    title: 'B2B E-commerce Portal',
    client: 'Al-Futtaim Group',
    description: 'B2B portal for wholesale customers with bulk ordering and account management.',
    image: '/images/solutions/ecommerce/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '500+ B2B customers, 40% reorder rate',
    metrics: ['Bulk pricing', 'Account management', 'Reorder portal'],
    slug: 'omnichannel-gulf-retail'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section (sales metrics)
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

    // Create sales metrics
    const metrics: { label: string; value: number; target: number; x: number; y: number; speed: number }[] = [
      { label: 'Revenue', value: 85, target: 100, x: 200, y: 200, speed: 0.1 },
      { label: 'Conversion', value: 3.2, target: 4.5, x: 500, y: 250, speed: 0.005 },
      { label: 'AOV', value: 120, target: 150, x: 800, y: 300, speed: 0.1 },
    ]

    // Create floating product ratings
    const ratings: { x: number; y: number; stars: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 10; i++) {
      ratings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        stars: 3 + Math.floor(Math.random() * 2),
        size: 14 + Math.random() * 8,
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
        ctx.fillText(metric.value.toFixed(1), metric.x + 20, metric.y + 60)
      })

      // Draw floating ratings
      ratings.forEach((rating) => {
        rating.y -= rating.speedY

        if (rating.y < 0) {
          rating.y = canvas.height
          rating.x = Math.random() * canvas.width
        }

        ctx.font = `${rating.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${rating.opacity})`
        ctx.fillText('★'.repeat(rating.stars), rating.x, rating.y)
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
            E-commerce{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading retail brands transform their online 
            presence and drive sales.
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
            <span>View All E-commerce Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
