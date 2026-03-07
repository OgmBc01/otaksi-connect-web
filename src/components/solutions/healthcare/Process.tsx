'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Clinical Workflow Analysis',
    description: 'We analyze your clinical workflows, patient journey, and operational needs to create a comprehensive plan.',
    icon: '🔍',
    image: '/images/solutions/healthcare/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Workflow assessment',
      'Stakeholder interviews',
      'Compliance review',
      'Technology audit'
    ]
  },
  {
    phase: 'Design',
    title: 'Solution Architecture',
    description: 'We design integrated healthcare solutions that improve patient care and operational efficiency.',
    icon: '📐',
    image: '/images/solutions/healthcare/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'System architecture',
      'Integration design',
      'Security framework',
      'Data migration plan'
    ]
  },
  {
    phase: 'Development',
    title: 'Implementation & Integration',
    description: 'We build and configure your healthcare platform with seamless integration to existing systems.',
    icon: '⚙️',
    image: '/images/solutions/healthcare/process-development.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Agile development',
      'HL7/FHIR integration',
      'Data migration',
      'Quality assurance'
    ]
  },
  {
    phase: 'Deployment',
    title: 'Go-Live & Training',
    description: 'We deploy your solution, train your staff, and ensure smooth adoption across your organization.',
    icon: '🚀',
    image: '/images/solutions/healthcare/process-deployment.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Phased rollout',
      'Staff training',
      'Go-live support',
      'Performance monitoring'
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

  // Unique animated background for Process section (patient monitoring)
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

    // Create patient monitoring stations
    const monitors: { x: number; y: number; width: number; height: number; waveform: number[] }[] = []

    for (let i = 0; i < 3; i++) {
      const waveform = []
      for (let j = 0; j < 30; j++) {
        waveform.push(Math.random() * 40)
      }
      monitors.push({
        x: 200 + i * 350,
        y: 200,
        width: 250,
        height: 180,
        waveform,
      })
    }

    // Create vital signs data stream
    const vitals: { label: string; value: number; target: number; unit: string; x: number; y: number }[] = [
      { label: 'HR', value: 72, target: 75, unit: 'bpm', x: 100, y: 400 },
      { label: 'BP', value: 120, target: 120, unit: 'mmHg', x: 250, y: 400 },
      { label: 'SpO2', value: 98, target: 98, unit: '%', x: 400, y: 400 },
      { label: 'RR', value: 16, target: 16, unit: '/min', x: 550, y: 400 },
    ]

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw monitors
      monitors.forEach((monitor, idx) => {
        // Monitor frame
        ctx.strokeStyle = `rgba(91, 108, 255, ${activeStep === idx ? 0.3 : 0.15})`
        ctx.lineWidth = 2
        ctx.strokeRect(monitor.x, monitor.y, monitor.width, monitor.height)

        // Monitor label
        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, ${activeStep === idx ? 0.3 : 0.15})`
        ctx.fillText(`Patient ${idx + 1}`, monitor.x + 10, monitor.y + 25)

        // Waveform
        ctx.beginPath()
        ctx.moveTo(monitor.x + 10, monitor.y + 100)

        for (let i = 0; i < monitor.waveform.length; i++) {
          const x = monitor.x + 10 + i * 8
          const y = monitor.y + 100 + Math.sin(time * 3 + i) * 20
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `rgba(255, 46, 159, ${activeStep === idx ? 0.3 : 0.15})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // Draw vital signs
      vitals.forEach((vital) => {
        // Slight variation in values
        const displayValue = vital.value + Math.sin(time * 2) * 2

        ctx.font = '14px monospace'
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fillText(`${vital.label}: ${Math.round(displayValue)} ${vital.unit}`, vital.x, vital.y)
      })

      // Draw connecting lines between monitors
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < monitors.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(monitors[i].x + monitors[i].width, monitors[i].y + monitors[i].height / 2)
        ctx.lineTo(monitors[i + 1].x, monitors[i + 1].y + monitors[i + 1].height / 2)
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
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Implementation Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successfully implementing healthcare technology solutions 
            with minimal disruption to patient care.
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