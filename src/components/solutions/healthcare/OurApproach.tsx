'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'Electronic Health Records',
    description: 'Comprehensive EHR systems that centralize patient data, improve care coordination, and enhance clinical decisions.',
    icon: '📋',
    image: '/images/solutions/healthcare/approach-ehr.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Patient Records', 'Clinical Documentation', 'Medication Management', 'Lab Integration']
  },
  {
    title: 'Telemedicine Platforms',
    description: 'Secure video consultation platforms connecting patients with healthcare providers remotely.',
    icon: '📹',
    image: '/images/solutions/healthcare/approach-telemedicine.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Video Consultations', 'Secure Messaging', 'Prescription Management', 'Appointment Scheduling']
  },
  {
    title: 'Patient Portals',
    description: 'Empower patients with 24/7 access to their health information, appointments, and communication.',
    icon: '👥',
    image: '/images/solutions/healthcare/approach-portal.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Health Records Access', 'Appointment Booking', 'Bill Payment', 'Secure Messaging']
  },
  {
    title: 'Hospital Management Systems',
    description: 'Integrated solutions for managing operations, administration, and patient flow across healthcare facilities.',
    icon: '🏥',
    image: '/images/solutions/healthcare/approach-hms.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Admission/Discharge', 'Billing & Insurance', 'Inventory Management', 'Staff Scheduling']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section (medical scans)
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

    // Create MRI scan lines
    const scanLines: { y: number; intensity: number; speed: number }[] = []

    for (let i = 0; i < 10; i++) {
      scanLines.push({
        y: i * 80,
        intensity: 0.1 + Math.random() * 0.1,
        speed: 0.5 + Math.random() * 0.5,
      })
    }

    // Create medical cross-sections
    const sections: { x: number; y: number; radius: number; pulse: number }[] = []

    for (let i = 0; i < 5; i++) {
      sections.push({
        x: 200 + i * 250,
        y: 300,
        radius: 60,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw scanning lines
      scanLines.forEach((line) => {
        line.y += line.speed
        if (line.y > canvas.height) {
          line.y = 0
        }

        ctx.beginPath()
        ctx.moveTo(0, line.y)
        ctx.lineTo(canvas.width, line.y)
        ctx.strokeStyle = `rgba(91, 108, 255, ${line.intensity})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw medical cross-sections (like CT scans)
      sections.forEach((section) => {
        section.pulse += 0.02
        const pulseRadius = section.radius + Math.sin(section.pulse) * 10

        ctx.beginPath()
        ctx.arc(section.x, section.y, pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner circles
        ctx.beginPath()
        ctx.arc(section.x, section.y, pulseRadius * 0.7, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(section.x, section.y, pulseRadius * 0.4, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.stroke()
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
        staggerChildren: 0.15,
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
        damping: 25,
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
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine healthcare expertise with innovative technology to improve 
            patient outcomes and operational efficiency.
          </p>
        </motion.div>

        {/* Approach Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: approach.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={approach.image}
                      alt={approach.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: approach.gradient }}
                      >
                        <span className="text-xl">{approach.icon}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{approach.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {approach.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {approach.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span 
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ background: approach.gradient }}
                          />
                          {feature}
                        </div>
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