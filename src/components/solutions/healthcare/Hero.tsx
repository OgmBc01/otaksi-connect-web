'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Healthcare-themed animated background (heartbeat/EKG)
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

    // Create heartbeat lines
    const heartbeats: { y: number; amplitude: number; frequency: number; phase: number }[] = []

    for (let i = 0; i < 3; i++) {
      heartbeats.push({
        y: 200 + i * 150,
        amplitude: 30 + Math.random() * 20,
        frequency: 0.02 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Create floating medical cross symbols
    const crosses: { x: number; y: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 12; i++) {
      crosses.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 12 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create DNA helix dots
    const dnaPoints: { x: number; y: number; offset: number }[] = []

    for (let i = 0; i < 20; i++) {
      dnaPoints.push({
        x: 100 + i * 30,
        y: 400,
        offset: Math.random() * 20,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw heartbeat lines
      heartbeats.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(0, line.y)

        for (let x = 0; x < canvas.width; x += 5) {
          // Create EKG-like pattern with sharp peaks
          let y = line.y
          const t = x * line.frequency + time + line.phase
          
          if (Math.sin(t) > 0.8) {
            y += line.amplitude * 2
          } else if (Math.sin(t) < -0.8) {
            y -= line.amplitude
          } else {
            y += Math.sin(t) * line.amplitude * 0.5
          }

          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = 'rgba(255, 46, 159, 0.15)'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw DNA helix
      dnaPoints.forEach((point, i) => {
        const y1 = point.y + Math.sin(time * 2 + i) * 30
        const y2 = point.y + Math.cos(time * 2 + i) * 30

        ctx.beginPath()
        ctx.arc(point.x, y1, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(point.x, y2, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fill()

        if (i < dnaPoints.length - 1) {
          ctx.beginPath()
          ctx.moveTo(point.x, y1)
          ctx.lineTo(dnaPoints[i + 1].x, dnaPoints[i + 1].y + Math.sin(time * 2 + i + 1) * 30)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Draw floating crosses
      crosses.forEach((cross) => {
        cross.y -= cross.speedY

        if (cross.y < 0) {
          cross.y = canvas.height
          cross.x = Math.random() * canvas.width
        }

        // Draw plus sign
        ctx.fillStyle = `rgba(255, 46, 159, ${cross.opacity})`
        ctx.fillRect(cross.x - cross.size/2, cross.y - cross.size/6, cross.size, cross.size/3)
        ctx.fillRect(cross.x - cross.size/6, cross.y - cross.size/2, cross.size/3, cross.size)
      })

      // Draw medical grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.3

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

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
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent z-10" />
        <Image
          src="/images/solutions/healthcare/hero-healthcare.jpg"
          alt="Healthcare Solutions Background"
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
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <span>•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Healthcare</span>
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
              <span className="text-white">Healthcare</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Transform patient care with innovative healthcare technology. From electronic 
              health records and telemedicine platforms to patient portals and DHA-compliant 
              systems, we deliver solutions that improve outcomes and efficiency.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '2M+', label: 'Patient Records' },
                { value: '50+', label: 'Healthcare Clients' },
                { value: '99.9%', label: 'System Uptime' },
                { value: 'DHA', label: 'Compliant' },
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
                Transform Your Healthcare Practice
              </Button>
              <Button variant="secondary" size="large">
                View Case Studies
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
                  src="/images/solutions/healthcare/hero-healthcare.jpg"
                  alt="Healthcare Solutions"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">🏥</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">❤️</span>
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