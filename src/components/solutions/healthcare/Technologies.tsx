'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'EHR Platforms',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/healthcare/tech-ehr.jpg',
    items: [
      { name: 'Epic', level: 90, description: 'Enterprise EHR' },
      { name: 'Cerner', level: 85, description: 'Healthcare IT' },
      { name: 'Meditech', level: 80, description: 'EHR system' },
      { name: 'Allscripts', level: 85, description: 'EHR solutions' },
    ]
  },
  {
    category: 'Telemedicine',
    icon: '📹',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/healthcare/tech-telemed.jpg',
    items: [
      { name: 'Zoom Healthcare', level: 95, description: 'Secure video' },
      { name: 'Doxy.me', level: 90, description: 'Telemedicine platform' },
      { name: 'Teladoc', level: 85, description: 'Virtual care' },
      { name: 'Amwell', level: 85, description: 'Telehealth' },
    ]
  },
  {
    category: 'Health Information Exchange',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/healthcare/tech-hie.jpg',
    items: [
      { name: 'Mirth Connect', level: 90, description: 'Interface engine' },
      { name: 'Redox', level: 85, description: 'Healthcare API' },
      { name: 'Intersystems', level: 80, description: 'HealthShare' },
      { name: 'NextGen', level: 80, description: 'HIE solutions' },
    ]
  },
  {
    category: 'Medical Imaging',
    icon: '🔬',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/healthcare/tech-imaging.jpg',
    items: [
      { name: 'Agfa Healthcare', level: 85, description: 'PACS/RIS' },
      { name: 'Siemens Healthineers', level: 85, description: 'Medical imaging' },
      { name: 'GE Healthcare', level: 80, description: 'Imaging solutions' },
      { name: 'Philips', level: 80, description: 'Healthcare imaging' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section (medical device monitors)
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

    // Create medical monitors
    const monitors: { x: number; y: number; width: number; height: number; wave: number[] }[] = []

    for (let i = 0; i < 4; i++) {
      const wave = []
      for (let j = 0; j < 20; j++) {
        wave.push(Math.random() * 30)
      }
      monitors.push({
        x: 150 + i * 300,
        y: 250,
        width: 200,
        height: 150,
        wave,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw monitors
      monitors.forEach((monitor) => {
        // Monitor frame
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.strokeRect(monitor.x, monitor.y, monitor.width, monitor.height)

        // Screen content (waveform)
        ctx.beginPath()
        ctx.moveTo(monitor.x + 10, monitor.y + monitor.height / 2)

        for (let i = 0; i < monitor.wave.length; i++) {
          const x = monitor.x + 10 + i * 9
          const y = monitor.y + monitor.height / 2 + Math.sin(time * 2 + i) * 20
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Heart rate number
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fillText('HR: 72', monitor.x + 20, monitor.y + 30)
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
      
      {/* Tech Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage industry-leading healthcare platforms and standards to build 
            interoperable, secure, and compliant solutions.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {technologies.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: category.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Header */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.category}
                      fill
                      className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent" />
                    
                    {/* Category Header */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: category.gradient }}
                      >
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="p-6 space-y-4">
                    {category.items.map((tech, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-white">{tech.name}</span>
                            <p className="text-xs text-gray-500">{tech.description}</p>
                          </div>
                          <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">
                            {tech.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: category.gradient }}
                          />
                        </div>
                      </div>
                    ))}
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