'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const featuredStudies = [
  {
    id: 1,
    title: 'Digital Banking Platform',
    client: 'Gulf Financial',
    industry: 'FinTech',
    description: 'Complete digital banking transformation serving 2M+ customers with real-time payments and AI-powered insights.',
    image: '/images/case-studies/featured/digital-banking.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    icon: '💰',
    results: '45% digital adoption',
    slug: 'digital-banking-gulf-financial',
    animation: 'fintech',
  },
  {
    id: 2,
    title: 'Smart Building IoT Platform',
    client: 'Dubai Heights Real Estate',
    industry: 'PropTech',
    description: 'IoT-enabled building management system for 50+ luxury residential towers with 35% energy savings.',
    image: '/images/case-studies/featured/smart-building.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    icon: '🏙️',
    results: '35% energy savings',
    slug: 'smart-building-dubai-heights',
    animation: 'proptech',
  },
  {
    id: 3,
    title: 'Multi-vendor Marketplace',
    client: 'Gulf Mart',
    industry: 'E-commerce',
    description: 'Scalable marketplace platform serving 1M+ customers with 5,000+ sellers and automated commission splitting.',
    image: '/images/case-studies/featured/marketplace.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    icon: '🛍️',
    results: 'AED 250M GMV',
    slug: 'multi-vendor-marketplace',
    animation: 'ecommerce',
  },
]

export default function FeaturedCaseStudies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Featured section animation - glowing orbs
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement?.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Glowing orbs
    const orbs: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 50 + Math.random() * 80,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.15,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      orbs.forEach((orb) => {
        orb.radius += Math.sin(time * orb.speed) * 0.5
        orb.opacity = 0.1 + Math.sin(time * orb.speed) * 0.05

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 2)
        gradient.addColorStop(0, `rgba(255, 46, 159, ${orb.opacity})`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, ${orb.opacity * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />
      
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Some of our most impactful projects across different industries
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredStudies.map((study) => (
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
                  <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4 backdrop-blur-md bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20">
                        {study.industry}
                      </div>

                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                        <span className="text-xl">{study.icon}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-1">{study.client}</p>
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {study.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium gradient-text">{study.results}</span>
                        <span className="text-sm text-gray-500 group-hover:text-white transition-colors flex items-center gap-1">
                          Read More
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}