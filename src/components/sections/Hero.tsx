'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from '../ui/Button'
import { useNeuralNetwork } from '@/context/NeuralNetworkContext'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isActivated, activationProgress } = useNeuralNetwork()

  // Local neural animation (for hero background)
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

    // Simple nodes for hero background
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections
        nodes.forEach((otherNode) => {
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
        })

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 46, 159, 0.2)`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight"
    >
      {/* Hero Background Neural Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intelligence Center - The Cat/OC Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="intelligence-center relative w-24 h-24 mx-auto">
            {/* Outer glow rings */}
            <motion.div
              animate={{
                scale: isActivated ? [1, 1.2, 1] : 1,
                opacity: isActivated ? [0.5, 0.8, 0.5] : 0.3,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] blur-xl"
            />
            
            {/* Main logo container */}
            <div className="relative w-full h-full rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] p-0.75">
              <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">
                  OC
                </span>
              </div>
            </div>

            {/* Intelligence rays */}
            <motion.div
              animate={{
                rotate: isActivated ? 360 : 0,
                opacity: isActivated ? [0.5, 0.8, 0.5] : 0.2,
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
              className="absolute -inset-4 rounded-full border border-[#5B6CFF] opacity-30"
            />
          </div>

          {/* Neural Observer Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm uppercase tracking-wider text-gray-500 mt-4"
          >
            The Neural Observer
          </motion.p>
        </motion.div>

        {/* Main Headline (reverted style) */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white"
        >
          We Observe Complex Systems
          <br />
          <span className="gradient-text block mt-2">and Engineer Intelligent Digital Solutions</span>
        </motion.h1>

        {/* Subtext (reverted style) */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-base sm:text-lg text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Premium software engineering consultancy in Dubai. We observe, process, and connect digital ecosystems across the UAE and Middle East.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="large">
            Activate Intelligence
          </Button>
          <Button variant="secondary" size="large">
            Observe Solutions
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
              className="w-1 h-2 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}