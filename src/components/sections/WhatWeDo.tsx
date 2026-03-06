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
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)

  // Enhanced background animation
  useEffect(() => {
    const canvas = bgCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()

    // Create neural particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      pulse: number
    }[] = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create energy waves
    const waves: {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 3; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 50 + Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw grid with perspective effect
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(time * 0.05)
      
      // Grid lines
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.03)'
      ctx.lineWidth = 0.5
      
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath()
        ctx.moveTo(i * 100, -canvas.height)
        ctx.lineTo(i * 100, canvas.height)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(-canvas.width, i * 100)
        ctx.lineTo(canvas.width, i * 100)
        ctx.stroke()
      }
      
      ctx.restore()

      // Draw energy waves
      waves.forEach((wave, index) => {
        wave.radius += wave.speed
        wave.opacity = 0.05 * (1 - wave.radius / 300)
        
        if (wave.radius > 300) {
          wave.radius = 50
          wave.x = Math.random() * canvas.width
          wave.y = Math.random() * canvas.height
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          wave.x, wave.y, 0,
          wave.x, wave.y, wave.radius
        )
        gradient.addColorStop(0, `rgba(255, 46, 159, ${wave.opacity})`)
        gradient.addColorStop(0.5, `rgba(91, 108, 255, ${wave.opacity * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw particles with connections
      particles.forEach((particle, i) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.pulse += 0.05

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Connect nearby particles
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(91, 108, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })

        // Draw particle with pulse
        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.3)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 2
        )
        gradient.addColorStop(0, `rgba(255, 46, 159, ${particle.opacity})`)
        gradient.addColorStop(0.7, `rgba(91, 108, 255, ${particle.opacity * 0.7})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw floating data bits
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(time * 2 + i) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 1.5 + i) * 0.5 + 0.5) * canvas.height
        
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.2)`
        ctx.fill()
        
        // Draw binary text
        ctx.font = '8px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, 0.1)`
        ctx.fillText(Math.random() > 0.5 ? '01' : '10', x - 10, y - 10)
      }

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

  // Neural network connections animation between cards
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

    const cards = document.querySelectorAll('.capability-card')
    if (cards.length === 0) return

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const visibleCards = document.querySelectorAll('.capability-card')
      if (visibleCards.length === 0) return

      const containerRect = canvas.parentElement?.getBoundingClientRect()
      if (!containerRect) return

      const nodes = Array.from(visibleCards).map((card) => {
        const rect = card.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        }
      })

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 400) {
            const opacity = (1 - distance / 400) * 0.2
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            )
            gradient.addColorStop(0, `rgba(255, 46, 159, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(91, 108, 255, ${opacity})`)
            gradient.addColorStop(1, `rgba(255, 46, 159, ${opacity})`)

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
        ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          nodes[i].x, nodes[i].y, 0,
          nodes[i].x, nodes[i].y, 8
        )
        gradient.addColorStop(0, '#FF2E9F')
        gradient.addColorStop(1, '#5B6CFF')
        ctx.fillStyle = gradient
        ctx.fill()
      }

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
      {/* Enhanced Techy Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000" />
        
        {/* Animated Background Canvas */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
        />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          mask: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }} />
        
        {/* Data Flow Lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent"
              style={{
                width: '100%',
                top: `${20 + i * 15}%`,
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Neural Network Connections Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-5"
        style={{ opacity: 0.4 }}
      />

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
              {/* Card Container with Border */}
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 bg-linear-to-r ${capability.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Glass Card with Border */}
                <div className="relative h-full glass-card p-8 transition-all duration-300 rounded-2xl border border-white/10 group-hover:border-white/20 hover:scale-105">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-r ${capability.gradient} rounded-full blur-3xl`} />
                    <div className={`absolute bottom-0 left-0 w-32 h-32 bg-linear-to-r ${capability.gradient} rounded-full blur-3xl`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Gradient Border */}
                    <div className="relative mb-6 flex items-start">
                      <div className="relative w-16 h-16">
                        <div className={`absolute inset-0 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r ${capability.gradient}`} />
                        <div className="relative w-16 h-16 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center">
                          <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                            {capability.icon}
                          </span>
                        </div>
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
                          <span className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${capability.gradient} mr-2`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Stats Badge */}
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${capability.gradient} bg-opacity-10 text-white border border-white/10`}>
                        50+ Projects Delivered
                      </span>
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar removed */}
      </div>

      {/* Animation Keyframes */}
      {/* Animation classes moved to globals.css */}
    </section>
  )
}