'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from '../ui/Button'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Enterprise-style animated background
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

    // Create flowing data streams
    const streams: {
      x: number
      y: number
      length: number
      speed: number
      segments: { x: number; y: number }[]
    }[] = []

    for (let i = 0; i < 8; i++) { // Reduced from 12 for cleaner look
      const segments: { x: number; y: number }[] = []
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      
      for (let j = 0; j < 6; j++) {
        segments.push({
          x: startX + (Math.random() - 0.5) * 300,
          y: startY + j * 120 + (Math.random() - 0.5) * 40,
        })
      }
      
      streams.push({
        x: startX,
        y: startY,
        length: 6,
        speed: 0.15 + Math.random() * 0.2,
        segments,
      })
    }

    // Create floating nodes
    const nodes: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      pulse: number
      baseOpacity: number
    }[] = []

    for (let i = 0; i < 15; i++) { // Reduced from 20 for cleaner look
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        pulse: Math.random() * Math.PI * 2,
        baseOpacity: 0.1 + Math.random() * 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.008

      // Draw grid lines - more subtle
      ctx.lineWidth = 0.3

      // Horizontal lines
      for (let i = 0; i < 20; i++) {
        const y = i * 80 + (time * 10) % 80
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = `rgba(91, 108, 255, 0.02)`
        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < 25; i++) {
        const x = i * 100 + (time * 8) % 100
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = `rgba(255, 46, 159, 0.02)`
        ctx.stroke()
      }

      // Draw data streams - made more visible
      streams.forEach((stream) => {
        ctx.beginPath()
        ctx.moveTo(stream.segments[0].x, stream.segments[0].y)
        
        for (let i = 1; i < stream.segments.length; i++) {
          ctx.lineTo(stream.segments[i].x, stream.segments[i].y)
        }

        ctx.strokeStyle = `rgba(91, 108, 255, 0.22)`
        ctx.lineWidth = 2.2
        ctx.stroke()

        // Draw moving pulse along stream
        const pulsePos = (time * stream.speed) % 1
        const index = Math.floor(pulsePos * (stream.segments.length - 1))
        const t = (pulsePos * (stream.segments.length - 1)) - index

        if (index < stream.segments.length - 1) {
          const x = stream.segments[index].x + (stream.segments[index + 1].x - stream.segments[index].x) * t
          const y = stream.segments[index].y + (stream.segments[index + 1].y - stream.segments[index].y) * t

          ctx.beginPath()
          ctx.arc(x, y, 7, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 16)
          gradient.addColorStop(0, `rgba(255, 46, 159, 0.55)`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw nodes with connections
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
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.18
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = `rgba(91, 108, 255, ${opacity})`
              ctx.lineWidth = 1.1
              ctx.stroke()
            }
          }
        })

        // Draw node with pulse
        const pulseFactor = Math.sin(node.pulse) * 0.3 + 0.7
        const size = node.size * 1.7
        const opacity = node.baseOpacity * 2.2

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3.5)
        gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
        gradient.addColorStop(0.6, `rgba(91, 108, 255, ${opacity * 0.7})`)
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
    <section 
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight"
    >
      {/* Enterprise-style Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-midnight/30 to-midnight" />
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intelligence Center - The Neural Observer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="intelligence-center relative w-20 h-20 mx-auto">
            {/* Outer glow rings */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] blur-xl"
            />
            
            {/* Main logo container */}
            <div className="relative w-full h-full rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] p-0.5">
              <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">
                  OC
                </span>
              </div>
            </div>

            {/* Intelligence rays */}
            <motion.div
              animate={{
                rotate: 360,
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute -inset-3 rounded-full border border-[#5B6CFF] opacity-20"
            />
          </div>

          {/* Neural Observer Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-3"
          >
            The Neural Observer
          </motion.p>
        </motion.div>

        {/* Main Headline - Refined Typography */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-clash)' }}
        >
          <span className="text-white block">We Observe Complex</span>
          <span className="text-white block">Systems and Engineer</span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] block">
            Intelligent Digital Solutions
          </span>
        </motion.h1>

        {/* Subtext - Refined */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Premium software engineering consultancy in Dubai. We observe, process, 
          and connect digital ecosystems across the UAE and Middle East.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="default">
            Activate Intelligence
          </Button>
          <Button variant="secondary" size="default">
            Observe Solutions
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-1 h-1.5 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mt-1.5"
            />
          </div>
        </motion.div>



      </div>

    </section>
  )
}




