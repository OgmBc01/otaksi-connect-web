'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

const values = [
  {
    title: 'Neural Intelligence',
    description: 'We think like neural networks - connected, adaptive, and constantly learning. Every solution builds on the last.',
    icon: '🧠',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    title: 'Precision Observation',
    description: 'Like a keen observer, we analyze complex systems deeply before engineering solutions that truly address root causes.',
    icon: '👁️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    title: 'Data-Driven Innovation',
    description: 'Decisions guided by data, not assumptions. We leverage AI and machine learning to create measurable impact.',
    icon: '📊',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    title: 'Human-Centered Design',
    description: 'Technology should serve people. We combine technical excellence with intuitive experiences that users love.',
    icon: '👥',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
  {
    title: 'Ethical AI',
    description: 'Responsible innovation is at our core. We build systems that are fair, transparent, and trustworthy.',
    icon: '⚖️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    title: 'Continuous Evolution',
    description: 'The neural network never stops learning. We continuously improve and adapt to new challenges.',
    icon: '🔄',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
]

export default function Values() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Values animation - neural pulses
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

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw pulsing circles
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + i * 0.15)
        const y = canvas.height * 0.5
        const radius = 50 + Math.sin(time * 2 + i) * 20

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${0.1 + Math.sin(time + i) * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Neural Values</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The principles that guide every connection in our neural network
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r ${value.gradient}`}
                />
                
                {/* Card */}
                <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-8 transition-all duration-300">
                  <div className="text-5xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}