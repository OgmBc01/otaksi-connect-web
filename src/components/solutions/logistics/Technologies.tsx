'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'Fleet Management',
    icon: '🚛',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/logistics/tech-fleet.jpg',
    items: [
      { name: 'Samsara', level: 90, description: 'Fleet management platform' },
      { name: 'Geotab', level: 85, description: 'Telematics' },
      { name: 'Trimble', level: 80, description: 'Transportation software' },
      { name: 'Teletrac Navman', level: 80, description: 'Fleet tracking' },
    ]
  },
  {
    category: 'Warehouse Management',
    icon: '🏭',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/logistics/tech-wms.jpg',
    items: [
      { name: 'Manhattan WMS', level: 85, description: 'Enterprise WMS' },
      { name: 'JDA/BlueYonder', level: 85, description: 'Supply chain platform' },
      { name: 'SAP EWM', level: 80, description: 'Extended warehouse mgmt' },
      { name: 'Oracle WMS', level: 80, description: 'Warehouse management' },
    ]
  },
  {
    category: 'IoT & Tracking',
    icon: '📍',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/logistics/tech-iot.jpg',
    items: [
      { name: 'Cisco IoT', level: 85, description: 'IoT infrastructure' },
      { name: 'Sierra Wireless', level: 80, description: 'IoT connectivity' },
      { name: 'HERE Technologies', level: 85, description: 'Location services' },
      { name: 'TomTom Telematics', level: 80, description: 'Fleet tracking' },
    ]
  },
  {
    category: 'Supply Chain Analytics',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/logistics/tech-analytics.jpg',
    items: [
      { name: 'Tableau', level: 90, description: 'Data visualization' },
      { name: 'Power BI', level: 90, description: 'Business analytics' },
      { name: 'Qlik', level: 85, description: 'Data analytics' },
      { name: 'SAS', level: 80, description: 'Advanced analytics' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section (radar/dashboard)
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

    // Create radar sweep effect
    let radarAngle = 0

    // Create data points on radar
    const radarPoints: { distance: number; angle: number; size: number }[] = []

    for (let i = 0; i < 15; i++) {
      radarPoints.push({
        distance: 50 + Math.random() * 150,
        angle: Math.random() * Math.PI * 2,
        size: 2 + Math.random() * 3,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01
      radarAngle += 0.02

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw radar circles
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
      ctx.lineWidth = 1

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, i * 60, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw radar sweep
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(radarAngle) * 300, centerY + Math.sin(radarAngle) * 300)
      ctx.strokeStyle = 'rgba(255, 46, 159, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw radar points
      radarPoints.forEach((point) => {
        const x = centerX + Math.cos(point.angle + time) * point.distance
        const y = centerY + Math.sin(point.angle + time) * point.distance

        ctx.beginPath()
        ctx.arc(x, y, point.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
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
            Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage industry-leading platforms and tools to build robust, 
            scalable logistics solutions.
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