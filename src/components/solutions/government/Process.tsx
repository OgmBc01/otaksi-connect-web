'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Needs Assessment',
    description: 'We analyze current government processes, citizen needs, and regulatory requirements.',
    icon: '🔍',
    image: '/images/solutions/government/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Stakeholder interviews',
      'Process analysis',
      'Regulatory review',
      'Citizen feedback'
    ]
  },
  {
    phase: 'Strategy',
    title: 'Digital Roadmap',
    description: 'We develop a comprehensive digital transformation roadmap aligned with government vision.',
    icon: '📐',
    image: '/images/solutions/government/process-strategy.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Vision definition',
      'Technology selection',
      'Phased approach',
      'Success metrics'
    ]
  },
  {
    phase: 'Implementation',
    title: 'Solution Development',
    description: 'We build and deploy government solutions with rigorous security and compliance.',
    icon: '⚙️',
    image: '/images/solutions/government/process-implementation.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Agile development',
      'Security integration',
      'User acceptance testing',
      'Data migration'
    ]
  },
  {
    phase: 'Evolution',
    title: 'Continuous Improvement',
    description: 'We continuously enhance services based on citizen feedback and emerging needs.',
    icon: '📈',
    image: '/images/solutions/government/process-evolution.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Performance monitoring',
      'Citizen feedback',
      'Service enhancement',
      'Technology updates'
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

  // Unique animated background for Process section (government timeline)
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

    // Create government building timeline
    const milestones: { x: number; y: number; label: string; progress: number }[] = [
      { x: 200, y: 300, label: 'Assessment', progress: 0 },
      { x: 400, y: 300, label: 'Planning', progress: 0 },
      { x: 600, y: 300, label: 'Implementation', progress: 0 },
      { x: 800, y: 300, label: 'Evolution', progress: 0 },
    ]

    // Create document flow animation
    const documents: { x: number; y: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 8; i++) {
      documents.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw timeline path
      ctx.beginPath()
      ctx.moveTo(150, 300)
      ctx.lineTo(850, 300)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw milestones
      milestones.forEach((milestone, i) => {
        // Milestone marker
        ctx.beginPath()
        ctx.arc(milestone.x, milestone.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = i === activeStep ? 'rgba(255, 46, 159, 0.3)' : 'rgba(91, 108, 255, 0.2)'
        ctx.fill()

        // Label
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(milestone.label, milestone.x - 30, milestone.y - 20)
      })

      // Draw floating documents
      documents.forEach((doc) => {
        doc.progress += doc.speed

        if (doc.progress > 1) {
          doc.progress = 0
        }

        const x = 150 + doc.progress * 700
        const y = 250 + Math.sin(time * 2 + doc.x) * 20

        // Document icon
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillRect(x, y, 20, 25)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(x + 3, y + 3, 14, 3)
        ctx.fillRect(x + 3, y + 8, 14, 3)
        ctx.fillRect(x + 3, y + 13, 10, 3)
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
            Government{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Implementation Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A structured approach to successfully implementing digital government solutions 
            with citizen-centric design.
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