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

  // Unique animated background for CTA section
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

    // Create transformation vortex (representing the journey)
    const vortex: {
      x: number
      y: number
      particles: { angle: number; distance: number; speed: number; size: number; color: string }[]
    } = {
      x: 0,
      y: 0,
      particles: [],
    }

    for (let i = 0; i < 50; i++) {
      vortex.particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 200,
        speed: 0.002 + Math.random() * 0.003,
        size: 2 + Math.random() * 4,
        color: i % 2 === 0 ? 'rgba(255, 46, 159' : 'rgba(91, 108, 255',
      })
    }

    // Create rising transformation symbols
    const symbols = ['🚀', '⚡', '📈', '💡', '🎯', '🔄', '🌟']
    const risingElements: {
      x: number
      y: number
      symbol: string
      size: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      risingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 20 + Math.random() * 20,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    // Create energy beams
    const beams: {
      x1: number
      y1: number
      x2: number
      y2: number
      progress: number
      speed: number
    }[] = []

    for (let i = 0; i < 8; i++) {
      beams.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Update vortex center to follow mouse? No, just animate in place
      vortex.x = canvas.width / 2
      vortex.y = canvas.height / 2

      // Draw vortex particles
      vortex.particles.forEach((particle) => {
        particle.angle += particle.speed

        const x = vortex.x + Math.cos(particle.angle) * particle.distance
        const y = vortex.y + Math.sin(particle.angle) * particle.distance

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 2)
        gradient.addColorStop(0, `${particle.color}, 0.2)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw rising transformation symbols
      risingElements.forEach((element) => {
        element.y -= element.speed
        element.opacity += Math.sin(time) * 0.001

        if (element.y < 0) {
          element.y = canvas.height
          element.x = Math.random() * canvas.width
        }

        ctx.font = `${element.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${element.opacity})`
        ctx.fillText(element.symbol, element.x, element.y)
      })

      // Draw energy beams
      beams.forEach((beam) => {
        beam.progress += beam.speed

        if (beam.progress > 1) {
          beam.progress = 0
          beam.x1 = Math.random() * canvas.width
          beam.y1 = Math.random() * canvas.height
          beam.x2 = Math.random() * canvas.width
          beam.y2 = Math.random() * canvas.height
        }

        const currentX = beam.x1 + (beam.x2 - beam.x1) * beam.progress
        const currentY = beam.y1 + (beam.y2 - beam.y1) * beam.progress

        ctx.beginPath()
        ctx.moveTo(beam.x1, beam.y1)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = `rgba(91, 108, 255, 0.1)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw beam head
        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.2)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw pulsing circles
      for (let i = 0; i < 3; i++) {
        const radius = 100 + Math.sin(time * 2 + i) * 30
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, 0.03)`
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
        <div className="absolute inset-0 bg-linear-to-r from-midnight via-midnight/80 to-midnight z-10" />
        <Image
          src="/images/digital-transformation/cta-bg.jpg"
          alt="Digital Transformation CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square">
        <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Floating Transformation Icons */}
      <div className="absolute top-20 left-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float">🔄</div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-2000">🚀</div>
      </div>
      <div className="absolute top-40 right-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-3000">⚡</div>
      </div>
      <div className="absolute bottom-40 left-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-1000">📈</div>
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
              <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-2xl bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                <span className="text-5xl">🔄</span>
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
            Ready to Start Your{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Transformation</span> Journey?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss how digital transformation can future-proof your business, 
            unlock new opportunities, and create lasting competitive advantage.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button variant="primary" size="large">
              Start Your Transformation
            </Button>
            <Button variant="secondary" size="large">
              Download Transformation Guide
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
              <Link href="mailto:transformation@otaksi.ae" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  ✉️
                </span>
                <span>transformation@otaksi.ae</span>
              </Link>
              <Link href="tel:+97141234567" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  📞
                </span>
                <span>+971 4 123 4567</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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
              ⚡ Free initial consultation | Proven methodology | Industry expertise | Sustainable results
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}