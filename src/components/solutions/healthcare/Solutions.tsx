'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Electronic Health Records (EHR)',
    description: 'Comprehensive digital records system for managing patient health information securely and efficiently.',
    icon: '📋',
    image: '/images/solutions/healthcare/solution-ehr.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Patient Demographics', 'Clinical Notes', 'Medication Lists', 'Lab Results'],
    benefits: ['30% time savings', 'Improved accuracy', 'Better coordination']
  },
  {
    title: 'Telemedicine Platform',
    description: 'Secure virtual care platform enabling remote consultations and follow-ups.',
    icon: '📹',
    image: '/images/solutions/healthcare/solution-telemedicine.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['HD Video Calls', 'E-Prescriptions', 'Digital Intake', 'Follow-up Scheduling'],
    benefits: ['50% no-shows reduction', 'Expanded reach', 'Patient convenience']
  },
  {
    title: 'Patient Portal',
    description: 'Self-service platform empowering patients to manage their healthcare journey.',
    icon: '👥',
    image: '/images/solutions/healthcare/solution-portal.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Records Access', 'Appointment Booking', 'Bill Pay', 'Secure Messaging'],
    benefits: ['90% patient satisfaction', 'Reduced calls', '24/7 access']
  },
  {
    title: 'Practice Management System',
    description: 'Complete solution for managing daily operations, scheduling, and revenue cycle.',
    icon: '⚙️',
    image: '/images/solutions/healthcare/solution-pms.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Appointment Scheduling', 'Billing & Claims', 'Inventory', 'Reporting'],
    benefits: ['40% admin efficiency', 'Faster payments', 'Optimized schedules']
  },
  {
    title: 'Radiology Information System',
    description: 'Specialized system for managing medical imaging workflows and reporting.',
    icon: '🔬',
    image: '/images/solutions/healthcare/solution-ris.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Worklist Management', 'Image Tracking', 'Reporting', 'PACS Integration'],
    benefits: ['Faster reporting', 'Improved accuracy', 'Seamless workflow']
  },
  {
    title: 'Laboratory Information System',
    description: 'Comprehensive solution for managing lab operations and results delivery.',
    icon: '🧪',
    image: '/images/solutions/healthcare/solution-lis.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Order Entry', 'Result Entry', 'Quality Control', 'Interface Management'],
    benefits: ['50% faster results', 'Error reduction', 'Regulatory compliance']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (medical data visualization)
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

    // Create patient data points
    const dataPoints: { x: number; y: number; size: number; pulse: number }[] = []

    for (let i = 0; i < 30; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create vital signs lines
    const vitals: { y: number; values: number[] }[] = []

    for (let i = 0; i < 3; i++) {
      const values = []
      for (let j = 0; j < 50; j++) {
        values.push(50 + Math.random() * 30)
      }
      vitals.push({
        y: 200 + i * 150,
        values,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update and draw vital signs
      vitals.forEach((vital) => {
        vital.values.shift()
        vital.values.push(50 + Math.random() * 30 + Math.sin(time) * 10)

        ctx.beginPath()
        ctx.moveTo(0, vital.y - vital.values[0])

        for (let i = 1; i < vital.values.length; i++) {
          ctx.lineTo(i * 20, vital.y - vital.values[i])
        }

        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw data points
      dataPoints.forEach((point) => {
        point.pulse += 0.02
        const pulseSize = point.size + Math.sin(point.pulse) * 1

        ctx.beginPath()
        ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.15)'
        ctx.fill()
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
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to improve patient care, 
            streamline operations, and ensure regulatory compliance.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: solution.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: solution.gradient }}
                      >
                        <span className="text-xl">{solution.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: solution.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {solution.benefits.map((benefit, idx) => (
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