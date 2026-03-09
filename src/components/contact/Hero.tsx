'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Contact hero animation - floating message bubbles
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

    // Message bubbles
    const bubbles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; pulse: number }[] = []
    for (let i = 0; i < 12; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 40,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: 0.1 + Math.random() * 0.15,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Connection lines
    const connections: { from: number; to: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 15; i++) {
      connections.push({
        from: Math.floor(Math.random() * bubbles.length),
        to: Math.floor(Math.random() * bubbles.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < canvas.width; i += 80) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 80) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw connections
      connections.forEach((conn) => {
        conn.progress += conn.speed
        if (conn.progress > 1) conn.progress = 0

        const fromBubble = bubbles[conn.from]
        const toBubble = bubbles[conn.to]

        if (fromBubble && toBubble) {
          ctx.beginPath()
          ctx.moveTo(fromBubble.x, fromBubble.y)
          ctx.lineTo(toBubble.x, toBubble.y)
          ctx.strokeStyle = `rgba(255, 46, 159, 0.1)`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      // Draw bubbles
      bubbles.forEach((bubble) => {
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY
        bubble.pulse += 0.02

        if (bubble.x < -bubble.size || bubble.x > canvas.width + bubble.size) bubble.speedX *= -1
        if (bubble.y < -bubble.size || bubble.y > canvas.height + bubble.size) bubble.speedY *= -1

        // Bubble outline
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${bubble.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner glow
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size * 0.7, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, bubble.size)
        gradient.addColorStop(0, `rgba(255, 46, 159, ${bubble.opacity * 0.3})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()

        // Message icon
        ctx.font = `${16 + Math.sin(bubble.pulse) * 4}px Arial`
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`
        ctx.fillText('💬', bubble.x - 12, bubble.y + 6)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
      {/* Floating Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Contact</span>
          </nav>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
              <span className="text-5xl">📬</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-clash)' }}
        >
          <span className="text-white">Get In</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Touch</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Have a project in mind? We'd love to hear about it. Reach out to our teams in Dubai and Nigeria.
        </motion.p>
      </div>
    </section>
  )
}