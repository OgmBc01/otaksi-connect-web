'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network animation - The Observer
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

    // Neural network nodes
    const nodes: { x: number; y: number; pulse: number; connections: number[] }[] = []
    const nodeCount = 25

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        connections: [],
      })
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150 && Math.random() > 0.7) {
            node.connections.push(j)
          }
        }
      })
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(connIndex => {
          const target = nodes[connIndex]
          if (!target) return

          const opacity = 0.1 + Math.sin(time * 2 + i) * 0.05
          const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
          gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(91, 108, 255, ${opacity})`)
          gradient.addColorStop(1, `rgba(255, 46, 159, ${opacity})`)

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += 0.02
        const size = 3 + Math.sin(node.pulse) * 1

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
        gradient.addColorStop(0, `rgba(255, 46, 159, 0.3)`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, 0.2)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
      {/* Floating Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">About</span>
          </nav>
        </motion.div>

        {/* Icon - The Neural Observer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-28 h-28 mx-auto">
            {/* Outer glow rings */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] blur-xl"
            />
            
            {/* Main logo container */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] p-1">
              <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">
                  OC
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Title - The Neural Observer */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-clash)' }}
        >
          <span className="text-white">The</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Neural Observer</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
        >
          We Observe Complex Systems and Engineer{' '}
          <span className="text-white">Intelligent Digital Solutions</span>
        </motion.p>
      </div>
    </section>
  )
}