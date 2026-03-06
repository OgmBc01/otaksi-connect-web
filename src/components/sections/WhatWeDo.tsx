'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'

const capabilities = [
  {
    title: 'Software Engineering',
    description: 'Enterprise-grade web and mobile applications built with modern architectures, scalable microservices, and robust API integrations tailored for UAE businesses.',
    icon: '💻',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    features: ['Custom Web Apps', 'Mobile Development', 'API Integration', 'Microservices']
  },
  {
    title: 'AI & Automation',
    description: 'Intelligent automation solutions powered by machine learning, computer vision, and NLP to transform Dubai enterprises into AI-driven organizations.',
    icon: '🤖',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    features: ['Machine Learning', 'Process Automation', 'Computer Vision', 'NLP Solutions']
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'Scalable cloud solutions on AWS, Azure, and Google Cloud with DevOps practices, containerization, and serverless architectures for optimal performance.',
    icon: '☁️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    features: ['Cloud Migration', 'DevOps', 'Kubernetes', 'Serverless']
  }
]

export default function WhatWeDo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network connections animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !inView) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()

    // Create nodes for each card position
    const cards = document.querySelectorAll('.capability-card')
    if (cards.length === 0) return

    const nodes = Array.from(cards).map((card) => {
      const rect = card.getBoundingClientRect()
      const containerRect = canvas.parentElement?.getBoundingClientRect()
      if (!containerRect) return { x: 0, y: 0 }

      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      }
    })

    // Animation loop
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect if not too far
          if (distance < 400) {
            const opacity = Math.sin(time + i + j) * 0.1 + 0.1
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, 
              nodes[j].x, nodes[j].y
            )
            gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
            gradient.addColorStop(1, `rgba(91, 108, 255, ${opacity})`)

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw nodes
        ctx.beginPath()
        ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          nodes[i].x, nodes[i].y, 0,
          nodes[i].x, nodes[i].y, 8
        )
        gradient.addColorStop(0, '#FF2E9F')
        gradient.addColorStop(1, '#5B6CFF')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            What We{' '}
            <span className="gradient-text">Do</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We engineer intelligent software systems that power modern digital businesses across the UAE and Middle East.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="capability-card group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full glass-card p-8 hover:scale-105 transition-transform duration-300 overflow-hidden">
                {/* Gradient Background on Hover - Fixed to not cover text */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${capability.gradient}`}
                />
                
                {/* Subtle Glow Effect */}
                <div 
                  className={`absolute -inset-1 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r ${capability.gradient} blur-xl`}
                />

                {/* Content - Ensure it's above all backgrounds */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 flex items-center justify-center">
                      <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {capability.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {capability.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Explore Link */}
                  <div className="mt-6">
                    <button className="text-sm font-medium gradient-text hover:opacity-80 transition-opacity flex items-center gap-2 group/btn">
                      Explore Capability
                      <svg 
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10"
        >
          {[
            { value: '50+', label: 'Enterprise Clients' },
            { value: '100+', label: 'Projects Delivered' },
            { value: '5+', label: 'Years in UAE' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}