'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Portfolio showcase animation - floating project cards
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

    // Floating project cards with different industry icons
    const projects: { 
      x: number; 
      y: number; 
      width: number; 
      height: number; 
      icon: string;
      speedX: number; 
      speedY: number; 
      opacity: number;
      pulse: number;
    }[] = []

    const icons = ['💰', '🏥', '🏢', '🚛', '🛍️', '👥', '☁️', '⚙️', '🔒', '📹', '🏙️', '📱']
    
    for (let i = 0; i < 15; i++) {
      projects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 80 + Math.random() * 60,
        height: 60 + Math.random() * 40,
        icon: icons[Math.floor(Math.random() * icons.length)],
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: 0.12 + Math.random() * 0.15,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Connection lines between projects (portfolio network)
    const connections: { from: number; to: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 20; i++) {
      connections.push({
        from: Math.floor(Math.random() * projects.length),
        to: Math.floor(Math.random() * projects.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw portfolio grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.06)'
      ctx.lineWidth = 0.5

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

      // Draw connection lines
      connections.forEach((conn) => {
        conn.progress += conn.speed
        if (conn.progress > 1) conn.progress = 0

        const fromProj = projects[conn.from]
        const toProj = projects[conn.to]

        if (fromProj && toProj) {
          ctx.beginPath()
          ctx.moveTo(fromProj.x + fromProj.width/2, fromProj.y + fromProj.height/2)
          ctx.lineTo(toProj.x + toProj.width/2, toProj.y + toProj.height/2)
          ctx.strokeStyle = `rgba(255, 46, 159, 0.1)`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Draw floating project cards
      projects.forEach((proj) => {
        proj.x += proj.speedX
        proj.y += proj.speedY
        proj.pulse += 0.02

        if (proj.x < -proj.width || proj.x > canvas.width) proj.speedX *= -1
        if (proj.y < -proj.height || proj.y > canvas.height) proj.speedY *= -1

        // Card outline
        ctx.strokeStyle = `rgba(91, 108, 255, ${proj.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(proj.x, proj.y, proj.width, proj.height)

        // Card icon
        ctx.font = `${24 + Math.sin(proj.pulse) * 4}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${proj.opacity})`
        ctx.fillText(proj.icon, proj.x + proj.width/2 - 12, proj.y + proj.height/2 + 8)

        // Card lines (simulating text)
        ctx.fillStyle = `rgba(91, 108, 255, ${proj.opacity * 0.7})`
        ctx.fillRect(proj.x + 10, proj.y + 15, proj.width - 20, 4)
        ctx.fillRect(proj.x + 10, proj.y + 25, proj.width - 30, 4)
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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Case Studies</span>
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
              <span className="text-5xl">📚</span>
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
          <span className="text-white">Success</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Stories</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
        >
          Explore how we've helped leading UAE enterprises transform their businesses
          through innovative technology solutions across every industry.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '15+', label: 'Industry Leaders' },
            { value: '100%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}