'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for CTA section (global shipping network)
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

    // Create world map outline (simplified dots)
    const worldDots: { x: number; y: number; size: number; pulse: number }[] = []

    // Simulate major ports/cities
    const locations = [
      { x: 0.2, y: 0.3 }, // Dubai
      { x: 0.8, y: 0.4 }, // Shanghai
      { x: 0.1, y: 0.5 }, // London
      { x: 0.3, y: 0.7 }, // Singapore
      { x: 0.6, y: 0.2 }, // New York
      { x: 0.4, y: 0.4 }, // Mumbai
      { x: 0.7, y: 0.6 }, // Sydney
      { x: 0.2, y: 0.8 }, // Cape Town
      { x: 0.9, y: 0.3 }, // Los Angeles
      { x: 0.5, y: 0.5 }, // Tokyo
    ]

    locations.forEach((loc) => {
      worldDots.push({
        x: loc.x * canvas.width,
        y: loc.y * canvas.height,
        size: 4 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
      })
    })

    // Create shipping routes between locations
    const routes: { from: number; to: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 15; i++) {
      routes.push({
        from: Math.floor(Math.random() * worldDots.length),
        to: Math.floor(Math.random() * worldDots.length),
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
      })
    }

    // Create rising containers
    const containers: { x: number; y: number; speed: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      containers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw shipping routes
      routes.forEach((route) => {
        route.progress += route.speed

        if (route.progress > 1) {
          route.progress = 0
        }

        const fromNode = worldDots[route.from]
        const toNode = worldDots[route.to]

        if (fromNode && toNode) {
          // Draw route line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Draw moving ship
          const currentX = fromNode.x + (toNode.x - fromNode.x) * route.progress
          const currentY = fromNode.y + (toNode.y - fromNode.y) * route.progress

          ctx.beginPath()
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
          ctx.fill()
        }
      })

      // Draw world dots (ports/cities)
      worldDots.forEach((dot) => {
        dot.pulse += 0.02
        const pulseSize = dot.size + Math.sin(dot.pulse) * 1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fill()
      })

      // Draw rising containers
      containers.forEach((container) => {
        container.y -= container.speed

        if (container.y < 0) {
          container.y = canvas.height
          container.x = Math.random() * canvas.width
        }

        // Draw container
        ctx.fillStyle = `rgba(255, 46, 159, ${container.opacity})`
        ctx.fillRect(container.x, container.y, 20, 15)

        // Container details
        ctx.fillStyle = `rgba(91, 108, 255, ${container.opacity})`
        ctx.fillRect(container.x + 3, container.y + 2, 4, 3)
        ctx.fillRect(container.x + 12, container.y + 2, 4, 3)
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

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight z-10" />
        <Image
          src="/images/solutions/logistics/cta-bg.jpg"
          alt="Logistics CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Floating Logistics Icons */}
      <div className="absolute top-20 left-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float">🚢</div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-2000">📦</div>
      </div>
      <div className="absolute top-40 right-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-3000">🚛</div>
      </div>
      <div className="absolute bottom-40 left-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-1000">📊</div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 md:p-16 rounded-3xl border border-white/10"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                <span className="text-5xl">🚢</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Ready to Optimize Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Supply Chain</span>?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss how our logistics technology solutions can improve efficiency,
            reduce costs, and provide end-to-end visibility across your supply chain.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button variant="primary" size="large">
              Optimize Your Supply Chain
            </Button>
            <Button variant="secondary" size="large">
              Download Logistics Guide
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 mb-4">Or contact us directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <Link href="mailto:logistics@otaksi.ae" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  ✉️
                </span>
                <span>logistics@otaksi.ae</span>
              </Link>
              <Link href="tel:+97141234567" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  📞
                </span>
                <span>+971 4 123 4567</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  💬
                </span>
                <span>Live Chat</span>
              </Link>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <p className="text-xs text-gray-600">
              ⚡ Free consultation | IoT experts | Real-time tracking | 24/7 support
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}