'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Assessment',
    title: 'Current State Analysis',
    description: 'We assess your current development and operations processes, identifying bottlenecks and opportunities.',
    icon: '🔍',
    image: '/images/devops-sre/process-assessment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Process audit',
      'Toolchain review',
      'Team capabilities',
      'Infrastructure assessment'
    ]
  },
  {
    phase: 'Strategy',
    title: 'Roadmap Definition',
    description: 'We define a phased roadmap for DevOps transformation aligned with your business goals.',
    icon: '📐',
    image: '/images/devops-sre/process-strategy.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Tool selection',
      'Pipeline design',
      'SLO definition',
      'Migration planning'
    ]
  },
  {
    phase: 'Implementation',
    title: 'Pipeline & Automation',
    description: 'We implement CI/CD pipelines, infrastructure automation, and monitoring solutions.',
    icon: '⚙️',
    image: '/images/devops-sre/process-implementation.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'CI/CD setup',
      'Infrastructure as Code',
      'Monitoring deployment',
      'Team training'
    ]
  },
  {
    phase: 'Optimization',
    title: 'Continuous Improvement',
    description: 'We continuously optimize processes, reduce toil, and improve reliability metrics.',
    icon: '📈',
    image: '/images/devops-sre/process-optimization.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Performance tuning',
      'Cost optimization',
      'Reliability engineering',
      'Process refinement'
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

  // Unique animated background for Process section (pipeline visualization)
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

    // Create pipeline stages
    const stages: { x: number; y: number; status: string; pulse: number }[] = []
    const stageLabels = ['Build', 'Test', 'Deploy', 'Monitor']
    
    for (let i = 0; i < 4; i++) {
      stages.push({
        x: 100 + i * 200,
        y: canvas.height / 2,
        status: stageLabels[i],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create flowing deployment units
    const deployments: { stage: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 5; i++) {
      deployments.push({
        stage: Math.floor(Math.random() * 3),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw pipeline connections
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2

      for (let i = 0; i < stages.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(stages[i].x, stages[i].y)
        ctx.lineTo(stages[i + 1].x, stages[i + 1].y)
        ctx.stroke()
      }

      // Draw deployments moving through pipeline
      deployments.forEach((deploy) => {
        deploy.progress += deploy.speed

        if (deploy.progress > 1) {
          deploy.progress = 0
          deploy.stage = (deploy.stage + 1) % 3
        }

        const fromStage = stages[deploy.stage]
        const toStage = stages[deploy.stage + 1]

        if (fromStage && toStage) {
          const x = fromStage.x + (toStage.x - fromStage.x) * deploy.progress
          const y = fromStage.y + (toStage.y - fromStage.y) * deploy.progress

          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw stages
      stages.forEach((stage, i) => {
        stage.pulse += 0.02
        const pulseSize = 20 + Math.sin(stage.pulse) * 5

        ctx.beginPath()
        ctx.arc(stage.x, stage.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.1)`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(stage.x, stage.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = i === activeStep ? '#FF2E9F' : '#5B6CFF'
        ctx.fill()

        ctx.font = '12px monospace'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(stage.status, stage.x - 20, stage.y - 30)
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
      
      {/* Pipeline Background */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent opacity-20" />

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
            DevOps{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Pipeline</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A structured approach to implementing DevOps practices and building 
            reliable, automated delivery pipelines.
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
                    <div className="absolute inset-0 bg-linear-to-t from-midnight to-transparent" />
                    
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
                    <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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