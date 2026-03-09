'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 50, label: 'Projects Delivered', suffix: '+' },
  { value: 15, label: 'Industries Served', suffix: '+' },
  { value: 6, label: 'Years of Innovation', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
]

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [counts, setCounts] = useState(stats.map(() => 0))
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural data flow animation
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

      // Draw flowing neural data
      for (let i = 0; i < 10; i++) {
        const x = (time * 50 + i * 100) % canvas.width
        const y = canvas.height * 0.3 + Math.sin(time * 2 + i) * 50

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Animate counters when in view
  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const duration = 2000
        const stepTime = 20
        const steps = duration / stepTime
        const increment = end / steps

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            start = end
            clearInterval(timer)
          }
          setCounts(prev => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(start)
            return newCounts
          })
        }, stepTime)

        return () => clearInterval(timer)
      })
    }
  }, [inView])

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
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                
                {/* Stat */}
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    {counts[index]}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
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