'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

const milestones = [
  {
    year: '2020',
    title: 'The Vision Born',
    description: 'Dr. Farouq Sadik Bashir envisioned a company that would combine artificial neural networks with practical business solutions.',
    icon: '🧠',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    year: '2021',
    title: 'Otaksi Connect Founded',
    description: 'Together with Abdullah Bala Madaki, they founded Otaksi Connect in Dubai, bringing together AI expertise and design excellence.',
    icon: '🚀',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    year: '2022',
    title: 'First Enterprise Clients',
    description: 'Secured first enterprise clients in FinTech and Healthcare sectors, delivering transformative AI solutions.',
    icon: '🏢',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    year: '2023',
    title: 'Expansion to Nigeria',
    description: 'Opened Lagos office to serve the growing West African market and tap into local talent.',
    icon: '🌍',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    year: '2024',
    title: '50+ Projects Delivered',
    description: 'Reached milestone of 50+ successful projects across 15+ industries in UAE and Africa.',
    icon: '🏆',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    year: '2025',
    title: 'The Neural Observer',
    description: 'Emerged as a recognized leader in AI-driven digital transformation across the Middle East and Africa.',
    icon: '👁️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
]

export default function OurStory() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Enhanced timeline animation - neural pathway
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

    // Create neural pathway nodes
    const nodes: { x: number; y: number; pulse: number; connections: number[] }[] = []
    
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: (i / 11) * canvas.width,
        y: canvas.height / 2 + Math.sin(i) * 100,
        pulse: Math.random() * Math.PI * 2,
        connections: [],
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        node.connections.push(i + 1)
      }
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw neural pathway
      ctx.beginPath()
      ctx.moveTo(nodes[0].x, nodes[0].y)
      
      for (let i = 1; i < nodes.length; i++) {
        const cp1x = nodes[i-1].x + (nodes[i].x - nodes[i-1].x) * 0.3
        const cp1y = nodes[i-1].y - 50
        const cp2x = nodes[i].x - (nodes[i].x - nodes[i-1].x) * 0.3
        const cp2y = nodes[i].y + 50
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nodes[i].x, nodes[i].y)
      }

      ctx.strokeStyle = 'rgba(91, 108, 255, 0.3)'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw moving pulses along pathway
      for (let p = 0; p < 3; p++) {
        const pulsePos = (time * 0.5 + p * 0.3) % 1
        const segmentIndex = Math.floor(pulsePos * (nodes.length - 1))
        const t = (pulsePos * (nodes.length - 1)) - segmentIndex

        if (segmentIndex < nodes.length - 1) {
          const x = nodes[segmentIndex].x + (nodes[segmentIndex + 1].x - nodes[segmentIndex].x) * t
          const y = nodes[segmentIndex].y + (nodes[segmentIndex + 1].y - nodes[segmentIndex].y) * t

          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.6)')
          gradient.addColorStop(0.7, 'rgba(91, 108, 255, 0.4)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        node.pulse += 0.02
        const size = 6 + Math.sin(node.pulse) * 2

        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 1.3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4)
        gradient.addColorStop(0, `rgba(255, 46, 159, 0.8)`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, 0.7)`)
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
    <section className="relative py-24 bg-midnight border-t border-white/5 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />
      
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
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Neural Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The evolution of our neural network - from vision to reality
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500 bg-gradient-to-r ${milestone.gradient}`}
                />
                
                {/* Card */}
                <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-8 transition-all duration-300 shadow-xl group-hover:shadow-[0_0_32px_8px_rgba(91,108,255,0.25)]">
                  {/* Year */}
                  <div className="text-5xl font-bold gradient-text mb-4">{milestone.year}</div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4">{milestone.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {milestone.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Neural Connection Indicator */}
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full bg-gradient-to-r ${milestone.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
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