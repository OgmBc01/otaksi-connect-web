'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Retail Digital Transformation',
    client: 'Majid Al Futtaim',
    description: 'End-to-end digital transformation across 50+ retail locations, integrating e-commerce, CRM, and supply chain.',
    image: '/images/digital-transformation/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '85% omnichannel growth, unified customer view',
    metrics: ['50+ stores', '2M+ customers', '40% efficiency gain'],
    slug: 'majid-al-futtaim-transformation'
  },
  {
    id: 2,
    title: 'Banking Process Automation',
    client: 'Emirates NBD',
    description: 'Automated 50+ manual processes across retail and corporate banking, reducing processing time by 70%.',
    image: '/images/digital-transformation/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '70% faster processing, 99.9% accuracy',
    metrics: ['50+ processes', '1M+ transactions', 'Zero errors'],
    slug: 'emirates-nbd-automation'
  },
  {
    id: 3,
    title: 'Healthcare Digital Maturity',
    client: 'DHA',
    description: 'Comprehensive digital transformation across 15 hospitals, improving patient experience and operational efficiency.',
    image: '/images/digital-transformation/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '60% faster service, 2M+ patients served',
    metrics: ['15 hospitals', 'Digital records', 'Patient portal'],
    slug: 'dha-digital-maturity'
  },
  {
    id: 4,
    title: 'Logistics Digital Strategy',
    client: 'DP World',
    description: 'Developed and executed digital strategy transforming port operations with IoT, AI, and automation.',
    image: '/images/digital-transformation/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '35% efficiency gain, real-time visibility',
    metrics: ['1M+ containers', 'Real-time tracking', 'Predictive analytics'],
    slug: 'dp-world-digital-strategy'
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

    // Create success indicators
    const successParticles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      symbol: string
    }[] = []

    const symbols = ['🏆', '⭐', '📈', '💯', '🚀', '✅']

    for (let i = 0; i < 20; i++) {
      successParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 16 + Math.random() * 16,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.1,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      })
    }

    // Create transformation paths
    const paths: { startX: number; startY: number; endX: number; endY: number; progress: number }[] = []

    for (let i = 0; i < 5; i++) {
      paths.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height,
        progress: Math.random(),
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw transformation paths
      paths.forEach((path) => {
        path.progress += 0.002
        
        if (path.progress > 1) {
          path.progress = 0
          path.startX = Math.random() * canvas.width
          path.startY = Math.random() * canvas.height
          path.endX = Math.random() * canvas.width
          path.endY = Math.random() * canvas.height
        }

        // Draw path
        ctx.beginPath()
        ctx.moveTo(path.startX, path.startY)
        ctx.lineTo(path.endX, path.endY)
        ctx.strokeStyle = `rgba(91, 108, 255, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw moving indicator
        const currentX = path.startX + (path.endX - path.startX) * path.progress
        const currentY = path.startY + (path.endY - path.startY) * path.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw success particles
      successParticles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.opacity += Math.sin(time) * 0.001

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.font = `${particle.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${particle.opacity})`
        ctx.fillText(particle.symbol, particle.x, particle.y)
      })

      // Draw glowing orbs
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + Math.sin(time + i) * 0.1)
        const y = canvas.height * (0.3 + Math.cos(time * 0.5 + i) * 0.2)
        
        ctx.beginPath()
        ctx.arc(x, y, 60, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 120)
        gradient.addColorStop(0, 'rgba(91, 108, 255, 0.05)')
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
            Transformation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real results from organizations that have successfully transformed 
            their operations, culture, and technology.
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
            <span>View All Transformation Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}