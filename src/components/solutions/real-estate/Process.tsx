'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Property Portfolio Analysis',
    description: 'We analyze your property portfolio, operations, and technology needs to create a comprehensive plan.',
    icon: '🔍',
    image: '/images/solutions/real-estate/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Portfolio assessment',
      'Operational analysis',
      'Technology audit',
      'Stakeholder interviews'
    ]
  },
  {
    phase: 'Design',
    title: 'Solution Architecture',
    description: 'We design integrated solutions for property management, tenant experience, and building operations.',
    icon: '📐',
    image: '/images/solutions/real-estate/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'System architecture',
      'Integration design',
      'Tenant journey mapping',
      'IoT infrastructure'
    ]
  },
  {
    phase: 'Development',
    title: 'Platform Development',
    description: 'We build and configure your PropTech platform with seamless integration to existing systems.',
    icon: '⚙️',
    image: '/images/solutions/real-estate/process-development.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Agile development',
      'IoT integration',
      'Data migration',
      'Quality assurance'
    ]
  },
  {
    phase: 'Deployment',
    title: 'Go-Live & Optimization',
    description: 'We deploy your solution, train your team, and continuously optimize for maximum value.',
    icon: '🚀',
    image: '/images/solutions/real-estate/process-deployment.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Phased rollout',
      'Team training',
      'Performance monitoring',
      'Continuous improvement'
    ]
  }
]

export default function Process() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Process section (construction timeline)
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

    // Create construction crane animation
    const cranes: { x: number; y: number; armAngle: number; armSpeed: number }[] = []

    for (let i = 0; i < 3; i++) {
      cranes.push({
        x: 200 + i * 400,
        y: 300,
        armAngle: 0,
        armSpeed: 0.01 + Math.random() * 0.01,
      })
    }

    // Create building progress bars
    const progressBars: { x: number; y: number; progress: number; target: number; speed: number }[] = []

    for (let i = 0; i < 5; i++) {
      progressBars.push({
        x: 100 + i * 200,
        y: 400,
        progress: Math.random() * 100,
        target: 100,
        speed: 0.1 + Math.random() * 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw cranes
      cranes.forEach((crane) => {
        crane.armAngle += crane.armSpeed

        // Crane tower
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(crane.x - 10, crane.y - 100, 20, 100)

        // Crane arm
        const armX = crane.x + Math.cos(crane.armAngle) * 80
        const armY = crane.y - 100 - Math.sin(crane.armAngle) * 20

        ctx.beginPath()
        ctx.moveTo(crane.x, crane.y - 100)
        ctx.lineTo(armX, armY)
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.lineWidth = 3
        ctx.stroke()

        // Crane cable
        ctx.beginPath()
        ctx.moveTo(armX, armY)
        ctx.lineTo(armX, armY + 40)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw progress bars
      progressBars.forEach((bar) => {
        if (bar.progress < bar.target) {
          bar.progress += bar.speed
        }

        // Bar background
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(bar.x, bar.y, 150, 20)

        // Bar fill
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(bar.x, bar.y, bar.progress * 1.5, 20)

        // Percentage
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(`${Math.floor(bar.progress)}%`, bar.x + 160, bar.y + 15)
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
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Timeline Background */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-20 hidden lg:block" />

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
            PropTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Implementation Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successfully implementing real estate technology solutions.
          </p>
        </motion.div>

        {/* Process Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-30' : ''
                  }`}
                  style={{ background: step.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.phase}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Phase */}
                    <div 
                      className="text-sm font-medium mb-2 text-transparent bg-clip-text"
                      style={{ backgroundImage: step.gradient }}
                    >
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4">
                      {step.description}
                    </p>

                    {/* Details (visible on hover) */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-1">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <span 
                              className="w-1 h-1 rounded-full"
                              style={{ background: step.gradient }}
                            />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
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