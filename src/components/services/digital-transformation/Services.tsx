'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const services = [
  {
    title: 'Digital Maturity Assessment',
    description: 'Comprehensive evaluation of your organization\'s digital capabilities across people, processes, and technology.',
    icon: '📊',
    image: '/images/digital-transformation/service-assessment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Capability Benchmarking', 'Gap Analysis', 'ROI Modeling', 'Roadmap Creation'],
    benefits: ['Clear starting point', 'Prioritized initiatives', 'Measurable KPIs']
  },
  {
    title: 'Digital Strategy Development',
    description: 'Future-proof digital strategies aligned with your business goals and market dynamics.',
    icon: '🎯',
    image: '/images/digital-transformation/service-strategy.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Vision & Roadmap', 'Technology Selection', 'Investment Planning', 'Risk Management'],
    benefits: ['Competitive advantage', 'Clear direction', 'Stakeholder alignment']
  },
  {
    title: 'Process Automation',
    description: 'End-to-end automation of manual processes to improve efficiency and reduce errors.',
    icon: '⚙️',
    image: '/images/digital-transformation/service-automation.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Workflow Analysis', 'RPA Implementation', 'BPM Solutions', 'Continuous Optimization'],
    benefits: ['80% faster processing', 'Zero manual errors', 'Significant cost savings']
  },
  {
    title: 'Change Management',
    description: 'Structured approach to transitioning individuals, teams, and organizations to new ways of working.',
    icon: '🔄',
    image: '/images/digital-transformation/service-change.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Stakeholder Analysis', 'Communication Plans', 'Training Programs', 'Culture Transformation'],
    benefits: ['Higher adoption rates', 'Reduced resistance', 'Sustainable change']
  },
  {
    title: 'Legacy Modernization',
    description: 'Transform outdated systems into modern, scalable platforms that enable innovation.',
    icon: '🏗️',
    image: '/images/digital-transformation/service-modernization.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['System Assessment', 'Migration Strategy', 'API-led Integration', 'Cloud Adoption'],
    benefits: ['Reduced technical debt', 'Faster time-to-market', 'Lower maintenance costs']
  },
  {
    title: 'Digital Culture & Training',
    description: 'Build digital capabilities across your organization through targeted training and cultural initiatives.',
    icon: '👥',
    image: '/images/digital-transformation/service-culture.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Skills Assessment', 'Learning Programs', 'Agile Coaching', 'Leadership Development'],
    benefits: ['Digitally-savvy workforce', 'Innovation mindset', 'Employee engagement']
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Services section
  useEffect(() => {
    const canvas = canvasRef.current
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

    // Create transformation spirals (representing evolution)
    const spirals: {
      centerX: number
      centerY: number
      radius: number
      turns: number
      points: { x: number; y: number; progress: number }[]
      speed: number
    }[] = []

    for (let s = 0; s < 3; s++) {
      const centerX = Math.random() * canvas.width
      const centerY = Math.random() * canvas.height
      const radius = 100 + Math.random() * 100
      const turns = 3 + Math.random() * 2
      const points: { x: number; y: number; progress: number }[] = []
      
      for (let i = 0; i < 20; i++) {
        points.push({
          x: centerX,
          y: centerY,
          progress: i / 20,
        })
      }
      
      spirals.push({
        centerX,
        centerY,
        radius,
        turns,
        points,
        speed: 0.002 + Math.random() * 0.002,
      })
    }

    // Create floating transformation symbols
    const symbols = ['🔄', '⚡', '📈', '🎯', '💡', '🚀']
    const particles: {
      x: number
      y: number
      symbol: string
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 16 + Math.random() * 16,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw transformation spirals
      spirals.forEach((spiral) => {
        const angle = time * 2
        
        for (let i = 0; i < spiral.points.length; i++) {
          const point = spiral.points[i]
          const t = point.progress + time * spiral.speed
          const spiralAngle = t * Math.PI * 2 * spiral.turns + angle
          const spiralRadius = spiral.radius * t
          
          const x = spiral.centerX + Math.cos(spiralAngle) * spiralRadius
          const y = spiral.centerY + Math.sin(spiralAngle) * spiralRadius

          // Draw spiral trail
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          const opacity = 0.1 * (1 - t)
          ctx.fillStyle = `rgba(91, 108, 255, ${opacity})`
          ctx.fill()
        }
      })

      // Draw transformation particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.opacity += Math.sin(time) * 0.001

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.font = `${particle.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${particle.opacity})`
        ctx.fillText(particle.symbol, particle.x, particle.y)
      })

      // Draw energy waves
      for (let i = 0; i < 3; i++) {
        const waveY = canvas.height * (0.3 + i * 0.2) + Math.sin(time * 2 + i) * 20
        
        ctx.beginPath()
        ctx.moveTo(0, waveY)
        for (let x = 0; x < canvas.width; x += 20) {
          const y = waveY + Math.sin(x * 0.02 + time * 3) * 10
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(91, 108, 255, 0.05)`
        ctx.lineWidth = 1
        ctx.stroke()
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(91, 108, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

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
            Transformation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive services to guide your organization through every stage 
            of the digital transformation journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: service.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: service.gradient }}
                      >
                        <span className="text-xl">{service.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: service.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}