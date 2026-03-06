'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'

const industries = [
  {
    name: 'Real Estate & PropTech',
    description: 'Digital solutions for Emaar, Nakheel, and Dubai property market',
    icon: '🏗️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['Emaar', 'Nakheel', 'DAMAC', 'Dubai Properties'],
    stats: '45% of UAE real estate transactions digitally enabled'
  },
  {
    name: 'FinTech & Banking',
    description: 'Compliant solutions for DIFC, ADGM, and Islamic banking',
    icon: '💰',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['Emirates NBD', 'ADCB', 'DIB', 'DIFC'],
    stats: 'AED 2.5B+ digital banking transactions processed'
  },
  {
    name: 'Oil & Gas',
    description: 'Enterprise systems for ADNOC, ENOC, and energy sector',
    icon: '🛢️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['ADNOC', 'ENOC', 'Dragon Oil', 'Emirates Gas'],
    stats: '30% efficiency increase in operations'
  },
  {
    name: 'Logistics & Supply Chain',
    description: 'Solutions for DP World, Aramex, and UAE trade ecosystem',
    icon: '🚢',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['DP World', 'Aramex', 'FedEx UAE', 'Emirates Post'],
    stats: '1M+ shipments tracked daily'
  },
  {
    name: 'Healthcare',
    description: 'Systems for DHA, Dubai Healthcare City, and medical providers',
    icon: '🏥',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['DHA', 'Mediclinic', 'NMC Healthcare', 'Aster'],
    stats: '500K+ patient records managed'
  },
  {
    name: 'Government & Public Sector',
    description: 'Smart city solutions aligned with Dubai Vision 2030',
    icon: '🏛️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['Smart Dubai', 'Dubai Municipality', 'TRA', 'Abu Dhabi Digital'],
    stats: '15+ government entities transformed'
  },
  {
    name: 'Aviation & Aerospace',
    description: 'Solutions for Emirates, Etihad, and Dubai Airports',
    icon: '✈️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['Emirates', 'Etihad', 'Dubai Airports', 'Sharjah Aviation'],
    stats: '25M+ passengers processed annually'
  },
  {
    name: 'Retail & E-commerce',
    description: 'Platforms for Majid Al Futtaim, Amazon.ae, and Noon',
    icon: '🛍️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['Majid Al Futtaim', 'Amazon.ae', 'Noon', 'Carrefour UAE'],
    stats: 'AED 1B+ annual digital sales'
  },
  {
    name: 'Education & EdTech',
    description: 'Solutions for KHDA, universities, and online learning platforms',
    icon: '🎓',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['KHDA', 'NYU Abu Dhabi', 'Mohammed Bin Rashid University'],
    stats: '100K+ students using our platforms'
  },
  {
    name: 'Hospitality & Tourism',
    description: 'Systems for Jumeirah, Atlantis, and Dubai tourism sector',
    icon: '🏨',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['Jumeirah', 'Atlantis', 'Emaar Hospitality', 'Rotana'],
    stats: '10M+ hotel bookings processed'
  },
  {
    name: 'Free Zones',
    description: 'Digital infrastructure for DMCC, DIFC, JAFZA, and more',
    icon: '🏢',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    companies: ['DMCC', 'JAFZA', 'Dubai South', 'RAK Free Zone'],
    stats: '5000+ company setups facilitated'
  },
  {
    name: 'Energy & Sustainability',
    description: 'Solutions for DEWA, Masdar, and renewable energy initiatives',
    icon: '⚡',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    companies: ['DEWA', 'Masdar', 'EWEC', 'Dubai Carbon'],
    stats: '20% reduction in energy consumption'
  }
]

export default function Industries() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network connections animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !inView) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()

    const cards = document.querySelectorAll('.industry-card')
    if (cards.length === 0) return

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const visibleCards = document.querySelectorAll('.industry-card')
      if (visibleCards.length === 0) return

      const containerRect = canvas.parentElement?.getBoundingClientRect()
      if (!containerRect) return

      const nodes = Array.from(visibleCards).map((card) => {
        const rect = card.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        }
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 300) {
            const opacity = (1 - distance / 300) * 0.2
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            )
            gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
            gradient.addColorStop(1, `rgba(91, 108, 255, ${opacity})`)

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
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
  }, [inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
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
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-glow" />

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
            Industries We{' '}
            <span className="gradient-text">Serve</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powering digital transformation across the UAE&apos;s most dynamic sectors, from real estate to renewable energy.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="industry-card group relative cursor-pointer"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative h-full glass-card p-6 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                {/* Hover Gradient Background */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${industry.gradient}`}
                />
                
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-1 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r ${industry.gradient} blur-xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 flex items-center justify-center">
                      <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                        {industry.icon}
                      </span>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                    {industry.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                    {industry.description}
                  </p>

                  {/* Companies (shown on hover) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredIndex === index ? 'auto' : 0,
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {industry.companies.map((company, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-[#5B6CFF]">
                        {industry.stats}
                      </p>
                    </div>
                  </motion.div>

                  {/* View Details Link */}
                  <div className="mt-4">
                    <button className="text-xs font-medium text-gray-500 group-hover:gradient-text transition-all duration-300 flex items-center gap-1">
                      View Industry Solutions
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            Don&apos;t see your industry? We serve all sectors of the UAE economy.
          </p>
          <button className="glass-card px-8 py-3 gradient-text font-medium hover:scale-105 transition-transform duration-300">
            Discuss Your Industry
          </button>
        </motion.div>
      </div>
    </section>
  )
}