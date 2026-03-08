'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Logistics-themed animated background (moving shipments/global network)
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

    // Create moving shipment containers
    const containers: { x: number; y: number; width: number; height: number; speed: number; color: string }[] = []

    for (let i = 0; i < 8; i++) {
      containers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 30 + Math.random() * 20,
        height: 20 + Math.random() * 15,
        speed: 0.5 + Math.random() * 1,
        color: i % 2 === 0 ? 'rgba(91, 108, 255' : 'rgba(255, 46, 159',
      })
    }

    // Create global network connections
    const connections: { startX: number; startY: number; endX: number; endY: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 10; i++) {
      connections.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Create location markers
    const markers: { x: number; y: number; label: string; pulse: number }[] = []
    const locations = ['Jebel Ali', 'Dubai South', 'Abu Dhabi', 'Sharjah', 'Doha', 'Riyadh', 'Kuwait']

    for (let i = 0; i < 7; i++) {
      markers.push({
        x: 200 + i * 150,
        y: 200 + Math.sin(i) * 50,
        label: locations[i],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw global network connections
      connections.forEach((conn) => {
        conn.progress += conn.speed

        if (conn.progress > 1) {
          conn.progress = 0
          conn.startX = Math.random() * canvas.width
          conn.startY = Math.random() * canvas.height
          conn.endX = Math.random() * canvas.width
          conn.endY = Math.random() * canvas.height
        }

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(conn.startX, conn.startY)
        ctx.lineTo(conn.endX, conn.endY)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw moving shipment
        const currentX = conn.startX + (conn.endX - conn.startX) * conn.progress
        const currentY = conn.startY + (conn.endY - conn.startY) * conn.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw moving containers
      containers.forEach((container) => {
        container.x += container.speed

        if (container.x > canvas.width + 50) {
          container.x = -50
          container.y = Math.random() * canvas.height
        }

        // Container body
        ctx.fillStyle = `${container.color}, 0.15)`
        ctx.fillRect(container.x, container.y, container.width, container.height)

        // Container details
        ctx.fillStyle = `${container.color}, 0.25)`
        ctx.fillRect(container.x + 5, container.y + 3, 5, container.height - 6)
        ctx.fillRect(container.x + container.width - 10, container.y + 3, 5, container.height - 6)
      })

      // Draw location markers
      markers.forEach((marker) => {
        marker.pulse += 0.02
        const pulseSize = 5 + Math.sin(marker.pulse) * 2

        // Marker dot
        ctx.beginPath()
        ctx.arc(marker.x, marker.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fill()

        // Label
        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(marker.label, marker.x - 20, marker.y - 15)
      })

      // Draw world map grid lines
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.3

      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 100) {
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
          src="/images/solutions/logistics/hero-logistics.jpg"
          alt="Logistics & Supply Chain Solutions Background"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Logistics & Supply Chain</span>
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
              <span className="text-white">Logistics &</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Supply Chain</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Optimize your logistics operations with cutting-edge technology. From fleet 
              management and warehouse automation to real-time tracking and inventory 
              optimization, we deliver solutions that drive efficiency and visibility.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '1M+', label: 'Shipments/Month' },
                { value: '99.9%', label: 'Tracking Accuracy' },
                { value: '30%', label: 'Cost Reduction' },
                { value: '24/7', label: 'Real-time Visibility' },
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
                Optimize Your Supply Chain
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
                  src="/images/solutions/logistics/hero-logistics.jpg"
                  alt="Logistics & Supply Chain Solutions"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">🚢</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">📦</span>
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