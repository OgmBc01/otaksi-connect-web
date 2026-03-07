'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

// Make sure this is a default export
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Transformation-themed animated background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create morphing particles (representing transformation)
    const particles: {
      x: number
      y: number
      targetX: number
      targetY: number
      size: number
      progress: number
      speed: number
      color: string
    }[] = []

    const colors = [
      'rgba(255, 46, 159, 0.3)',
      'rgba(91, 108, 255, 0.3)',
      'rgba(255, 46, 159, 0.2)',
      'rgba(91, 108, 255, 0.2)',
    ]

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        size: 4 + Math.random() * 6,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create flowing light beams (representing transformation energy)
    const beams: {
      x1: number
      y1: number
      x2: number
      y2: number
      progress: number
      speed: number
    }[] = []

    for (let i = 0; i < 5; i++) {
      beams.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw energy waves in background
      for (let i = 0; i < 3; i++) {
        const centerX = canvas.width * (0.3 + Math.sin(time * 0.5 + i) * 0.1)
        const centerY = canvas.height * (0.5 + Math.cos(time * 0.3 + i) * 0.1)
        const radius = 150 + Math.sin(time * 2 + i) * 30

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2)
        gradient.addColorStop(0, 'rgba(91, 108, 255, 0.03)')
        gradient.addColorStop(0.5, 'rgba(255, 46, 159, 0.02)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw morphing particles
      particles.forEach((particle) => {
        particle.progress += particle.speed

        if (particle.progress >= 1) {
          particle.progress = 0
          particle.x = particle.targetX
          particle.y = particle.targetY
          particle.targetX = Math.random() * canvas.width
          particle.targetY = Math.random() * canvas.height
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress

        // Draw particle trail
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw particle
        ctx.beginPath()
        ctx.arc(currentX, currentY, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw flowing beams
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
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw beam head
        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
        gradient.addColorStop(0, 'rgba(91, 108, 255, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight pt-24">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent z-10" />
        <Image
          src="/images/digital-transformation/hero-digital.jpg"
          alt="Digital Transformation Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>•</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span>•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Digital Transformation</span>
              </nav>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              <span className="text-white">Digital</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Transformation</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Future-proof your business with end-to-end digital transformation. 
              From strategy to execution, we help UAE organizations reinvent 
              processes, culture, and technology for the digital age.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '85%', label: 'Process Efficiency' },
                { value: '50+', label: 'Transformations' },
                { value: '40%', label: 'Cost Reduction' },
                { value: '3x', label: 'ROI Average' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="large">
                Start Your Transformation
              </Button>
              <Button variant="secondary" size="large">
                Download Transformation Guide
              </Button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-3xl opacity-30" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/digital-transformation/hero-digital.jpg"
                  alt="Digital Transformation"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">🔄</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="w-1 h-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}