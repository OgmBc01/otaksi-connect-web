'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Supply Chain Analysis',
    description: 'We analyze your current logistics operations, identify bottlenecks, and map out optimization opportunities.',
    icon: '🔍',
    image: '/images/solutions/logistics/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Operations audit',
      'Data collection',
      'Bottleneck identification',
      'KPI definition'
    ]
  },
  {
    phase: 'Design',
    title: 'Solution Architecture',
    description: 'We design integrated logistics solutions tailored to your specific supply chain needs.',
    icon: '📐',
    image: '/images/solutions/logistics/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'System architecture',
      'Integration planning',
      'IoT device selection',
      'Dashboard design'
    ]
  },
  {
    phase: 'Implementation',
    title: 'Deployment & Integration',
    description: 'We deploy and integrate your logistics solution with existing systems and hardware.',
    icon: '⚙️',
    image: '/images/solutions/logistics/process-implementation.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'System deployment',
      'IoT device installation',
      'ERP/WMS integration',
      'Data migration'
    ]
  },
  {
    phase: 'Optimization',
    title: 'Continuous Improvement',
    description: 'We continuously monitor performance and optimize your logistics operations.',
    icon: '📈',
    image: '/images/solutions/logistics/process-optimization.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Performance monitoring',
      'Route optimization',
      'Inventory tuning',
      'Ongoing support'
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

  // Unique animated background for Process section (logistics timeline)
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

    // Create timeline with moving shipments
    const timeline: { x: number; y: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 5; i++) {
      timeline.push({
        x: 100 + i * 200,
        y: 300,
        progress: 0,
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Create milestone markers
    const milestones: { x: number; y: number; label: string; pulse: number }[] = [
      { x: 150, y: 300, label: 'Analysis', pulse: 0 },
      { x: 350, y: 300, label: 'Design', pulse: 0 },
      { x: 550, y: 300, label: 'Implement', pulse: 0 },
      { x: 750, y: 300, label: 'Optimize', pulse: 0 },
    ]

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw timeline path
      ctx.beginPath()
      ctx.moveTo(100, 300)
      ctx.lineTo(900, 300)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw milestones
      milestones.forEach((milestone, i) => {
        milestone.pulse += 0.02
        const pulseSize = 8 + Math.sin(milestone.pulse) * 3

        ctx.beginPath()
        ctx.arc(milestone.x, milestone.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = i === activeStep ? 'rgba(255, 46, 159, 0.3)' : 'rgba(91, 108, 255, 0.2)'
        ctx.fill()

        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(milestone.label, milestone.x - 30, milestone.y - 20)
      })

      // Draw moving shipments
      timeline.forEach((shipment) => {
        shipment.progress += shipment.speed

        if (shipment.progress > 1) {
          shipment.progress = 0
        }

        const x = 100 + shipment.progress * 800
        const y = 290 + Math.sin(time * 2 + shipment.x) * 10

        // Shipment icon (container)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(x - 10, y - 5, 20, 10)

        // Shipment label
        ctx.font = '8px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.fillText('📦', x - 5, y - 10)
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
            Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Implementation Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successfully implementing logistics technology 
            solutions and optimizing your supply chain.
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