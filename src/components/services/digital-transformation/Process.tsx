'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discover',
    title: 'Assessment & Vision',
    description: 'We assess your current state, define your digital vision, and identify opportunities for transformation.',
    icon: '🔍',
    image: '/images/digital-transformation/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Digital maturity assessment',
      'Stakeholder interviews',
      'Opportunity identification',
      'Vision & roadmap creation'
    ]
  },
  {
    phase: 'Strategize',
    title: 'Planning & Design',
    description: 'We design the target architecture, select technologies, and create detailed implementation plans.',
    icon: '📐',
    image: '/images/digital-transformation/process-strategy.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Solution architecture',
      'Technology selection',
      'Change management plan',
      'ROI modeling'
    ]
  },
  {
    phase: 'Execute',
    title: 'Implementation & Integration',
    description: 'We execute the transformation plan, integrating new technologies while managing organizational change.',
    icon: '⚙️',
    image: '/images/digital-transformation/process-execution.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Agile implementation',
      'System integration',
      'Process automation',
      'Change execution'
    ]
  },
  {
    phase: 'Evolve',
    title: 'Optimization & Growth',
    description: 'We continuously optimize and evolve your digital capabilities to maintain competitive advantage.',
    icon: '📈',
    image: '/images/digital-transformation/process-evolution.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Performance monitoring',
      'Continuous improvement',
      'Skills development',
      'Innovation roadmap'
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

  // Unique animated background for Process section
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

    // Create transformation timeline visualization
    const timelineNodes: { x: number; y: number; phase: number; pulse: number }[] = []
    
    for (let i = 0; i < 4; i++) {
      timelineNodes.push({
        x: 150 + i * 250,
        y: canvas.height / 2,
        phase: i,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create floating transformation indicators
    const indicators: { x: number; y: number; symbol: string; progress: number; speed: number }[] = []
    const symbols = ['📈', '🔄', '⚡', '🎯', '💡', '🚀']
    
    for (let i = 0; i < 8; i++) {
      indicators.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connecting timeline
      ctx.beginPath()
      ctx.moveTo(timelineNodes[0].x, timelineNodes[0].y)
      for (let i = 1; i < timelineNodes.length; i++) {
        ctx.lineTo(timelineNodes[i].x, timelineNodes[i].y)
      }
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw timeline nodes
      timelineNodes.forEach((node, i) => {
        node.pulse += 0.02
        const pulseSize = Math.sin(node.pulse) * 5 + 8

        // Node glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2)
        gradient.addColorStop(0, i === activeStep ? 'rgba(255, 46, 159, 0.3)' : 'rgba(91, 108, 255, 0.2)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()

        // Node center
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = i === activeStep ? '#FF2E9F' : '#5B6CFF'
        ctx.fill()
      })

      // Draw flowing indicators
      indicators.forEach((indicator) => {
        indicator.progress += indicator.speed
        
        if (indicator.progress > 1) {
          indicator.progress = 0
          indicator.x = Math.random() * canvas.width
          indicator.y = Math.random() * canvas.height
        }

        const y = indicator.y + Math.sin(indicator.progress * Math.PI * 2) * 20

        ctx.font = '20px Arial'
        ctx.fillStyle = `rgba(255, 46, 159, 0.1)`
        ctx.fillText(indicator.symbol, indicator.x, y)
      })

      // Draw transformation waves
      for (let i = 0; i < 3; i++) {
        const waveOffset = time * 2 + i
        const y = canvas.height * 0.3 + Math.sin(waveOffset) * 20
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x < canvas.width; x += 30) {
          const waveY = y + Math.sin(x * 0.02 + time * 3) * 10
          ctx.lineTo(x, waveY)
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
  }, [activeStep])

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
            Transformation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A structured, proven approach to guide your organization through every 
            phase of digital transformation.
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