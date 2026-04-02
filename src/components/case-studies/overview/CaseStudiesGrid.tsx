'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const allCaseStudies = [
  // FinTech (3)
  {
    id: 1,
    title: 'Digital Banking Platform',
    client: 'Finexa Bank',
    industry: 'FinTech',
    icon: '💰',
    results: '45% digital adoption',
    slug: 'digital-banking-gulf-financial',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    id: 2,
    title: 'Payment Gateway Integration',
    client: 'Payverse',
    industry: 'FinTech',
    icon: '💳',
    results: '1M+ daily txns',
    slug: 'payment-gateway-gulf-pay',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    id: 3,
    title: 'AI-Powered Fraud Detection',
    client: 'SecureBank',
    industry: 'FinTech',
    icon: '🔒',
    results: '99.9% accuracy',
    slug: 'fraud-detection-securebank',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },

  // Healthcare (2)
  {
    id: 4,
    title: 'Electronic Health Records',
    client: 'Medisys Health',
    industry: 'Healthcare',
    icon: '🏥',
    results: '2M+ patients',
    slug: 'ehr-gulf-health',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    id: 5,
    title: 'Telemedicine Platform',
    client: 'Medisys Health',
    industry: 'Healthcare',
    icon: '📹',
    results: '100K+ consultations',
    slug: 'telemedicine-gulf-health',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },

  // Real Estate (2)
  {
    id: 6,
    title: 'Property Management System',
    client: 'Vertex Estates',
    industry: 'Real Estate',
    icon: '🏢',
    results: '20K+ units',
    slug: 'property-management-dubai-heights',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    id: 7,
    title: 'Smart Building IoT Platform',
    client: 'Vertex Estates',
    industry: 'Real Estate',
    icon: '🏙️',
    results: '35% energy savings',
    slug: 'smart-building-dubai-heights',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },

  // Logistics (2)
  {
    id: 8,
    title: 'Fleet Management System',
    client: 'LogistiX Solutions',
    industry: 'Logistics',
    icon: '🚚',
    results: '99.99% uptime',
    slug: 'fleet-management-gulf-logistics',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    id: 9,
    title: 'Warehouse Automation',
    client: 'LogistiX Solutions',
    industry: 'Logistics',
    icon: '🏭',
    results: '3x faster ops',
    slug: 'warehouse-automation-gulf-logistics',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    id: 10,
    title: 'Smart City Platform',
    client: 'CityGov',
    industry: 'Government',
    icon: '🌆',
    results: '50+ services',
    slug: 'smart-city-platform',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },

  // Cloud & DevOps (2)
  {
    id: 14,
    title: 'Cloud Migration Journey',
    client: 'Nimbus Capital',
    industry: 'Cloud',
    icon: '☁️',
    results: '40% cost reduction',
    slug: 'cloud-migration-gulf-financial',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    id: 15,
    title: 'DevOps Transformation',
    client: 'DevCore Solutions',
    industry: 'DevOps',
    icon: '⚙️',
    results: '10x faster deployments',
    slug: 'devops-transformation-gulf-tech',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
]

const industries = ['All', 'FinTech', 'Healthcare', 'Real Estate', 'Logistics', 'E-commerce', 'Government', 'Cloud', 'DevOps']

export default function CaseStudiesGrid() {
  const [activeIndustry, setActiveIndustry] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Grid animation - floating particles
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

    // Floating particles
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, ${particle.opacity})`
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

  const filteredStudies = activeIndustry === 'All' 
    ? allCaseStudies 
    : allCaseStudies.filter(study => study.industry === activeIndustry)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <section className="relative py-24 bg-midnight border-t border-white/5 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />
      
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            All{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Projects</span>
          </h2>
        </motion.div>

        {/* Industry Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndustry === industry
                  ? 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white'
                  : 'glass-card border border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group relative"
              onHoverStart={() => setHoveredId(study.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                      hoveredId === study.id ? 'opacity-30' : ''
                    }`}
                    style={{ background: `linear-gradient(135deg, ${study.gradient.includes('FF2E9F') ? '#FF2E9F' : '#5B6CFF'}, ${study.gradient.includes('5B6CFF') ? '#5B6CFF' : '#FF2E9F'})` }}
                  />
                  
                  {/* Card */}
                  <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${study.gradient} bg-opacity-10 flex items-center justify-center`}>
                        <span className="text-2xl">{study.icon}</span>
                      </div>
                      
                      {/* Industry Tag */}
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {study.industry}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all duration-300">
                      {study.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{study.client}</p>
                    
                    {/* Result Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${study.gradient} bg-opacity-10 text-white border border-white/10`}>
                      {study.results}
                    </div>

                    {/* Arrow Indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            Showing <span className="text-white font-medium">{filteredStudies.length}</span> of{' '}
            <span className="text-white font-medium">{allCaseStudies.length}</span> case studies
          </p>
        </motion.div>
      </div>
    </section>
  )
}