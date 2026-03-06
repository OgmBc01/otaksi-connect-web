'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Enterprise Systems hero
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

    // Create flowing data streams (representing enterprise data flow)
    const streams: {
      x: number
      y: number
      length: number
      speed: number
      segments: { x: number; y: number }[]
    }[] = []

    for (let i = 0; i < 8; i++) {
      const segments: { x: number; y: number }[] = []
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      
      for (let j = 0; j < 5; j++) {
        segments.push({
          x: startX + (Math.random() - 0.5) * 300,
          y: startY + j * 80 + (Math.random() - 0.5) * 40,
        })
      }
      
      streams.push({
        x: startX,
        y: startY,
        length: 5,
        speed: 0.3 + Math.random() * 0.4,
        segments,
      })
    }

    // Create floating nodes (representing enterprise systems)
    const nodes: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      pulse: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw grid lines (enterprise architecture grid)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.5

      // Horizontal lines with perspective
      for (let i = 0; i < 20; i++) {
        const y = i * 60 + (time * 20) % 60
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = `rgba(91, 108, 255, ${0.02 + Math.sin(time + i) * 0.01})`
        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < 30; i++) {
        const x = i * 80 + (time * 10) % 80
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = `rgba(255, 46, 159, ${0.02 + Math.cos(time + i) * 0.01})`
        ctx.stroke()
      }

      // Draw data streams
      streams.forEach((stream) => {
        ctx.beginPath()
        ctx.moveTo(stream.segments[0].x, stream.segments[0].y)
        
        for (let i = 1; i < stream.segments.length; i++) {
          ctx.lineTo(stream.segments[i].x, stream.segments[i].y)
        }

        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw moving pulse along stream
        const pulsePos = (time * stream.speed) % 1
        const index = Math.floor(pulsePos * (stream.segments.length - 1))
        const t = (pulsePos * (stream.segments.length - 1)) - index

        if (index < stream.segments.length - 1) {
          const x = stream.segments[index].x + (stream.segments[index + 1].x - stream.segments[index].x) * t
          const y = stream.segments[index].y + (stream.segments[index + 1].y - stream.segments[index].y) * t

          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.4)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw and connect nodes
      nodes.forEach((node, i) => {
        node.x += node.speedX
        node.y += node.speedY
        node.pulse += 0.02

        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1

        // Connect nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.1
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = `rgba(91, 108, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })

        // Draw node
        const pulseSize = node.size * (1 + Math.sin(node.pulse) * 0.3)
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2)
        gradient.addColorStop(0, `rgba(255, 46, 159, 0.3)`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, 0.2)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight pt-24">
      {/* Animated Canvas Background */}
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
          src="/images/enterprise-systems/hero-enterprise.jpg"
          alt="Enterprise Systems Background"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Enterprise Systems</span>
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
              <span className="text-white">Enterprise</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Systems</span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-400">& Solutions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Comprehensive business software solutions including ERP, CRM, HRMS, 
              and custom enterprise applications. We help UAE organizations streamline 
              operations, enhance productivity, and drive growth.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '50+', label: 'Enterprise Clients' },
                { value: '100+', label: 'Systems Deployed' },
                { value: '15+', label: 'Industries Served' },
                { value: '99.9%', label: 'System Uptime' },
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
                Discuss Your Enterprise Needs
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
                  src="/images/enterprise-systems/hero-enterprise.jpg"
                  alt="Enterprise Systems"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">⚙️</span>
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