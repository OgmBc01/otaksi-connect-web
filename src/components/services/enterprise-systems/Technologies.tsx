'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'ERP Platforms',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/enterprise-systems/tech-erp.jpg',
    items: [
      { name: 'SAP S/4HANA', level: 90, description: 'Enterprise ERP suite' },
      { name: 'Oracle ERP Cloud', level: 85, description: 'Cloud ERP solution' },
      { name: 'Microsoft Dynamics 365', level: 90, description: 'Integrated ERP & CRM' },
      { name: 'Odoo', level: 85, description: 'Open source ERP' },
    ]
  },
  {
    category: 'CRM Systems',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/enterprise-systems/tech-crm.jpg',
    items: [
      { name: 'Salesforce', level: 95, description: 'Leading CRM platform' },
      { name: 'HubSpot', level: 90, description: 'Marketing & sales hub' },
      { name: 'Microsoft Dynamics CRM', level: 90, description: 'Enterprise CRM' },
      { name: 'Zoho CRM', level: 85, description: 'SMB CRM solution' },
    ]
  },
  {
    category: 'Integration Platforms',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/enterprise-systems/tech-integration.jpg',
    items: [
      { name: 'MuleSoft', level: 85, description: 'Anypoint Platform' },
      { name: 'Dell Boomi', level: 80, description: 'Cloud integration' },
      { name: 'Apache Camel', level: 85, description: 'Open source integration' },
      { name: 'Kafka', level: 90, description: 'Event streaming' },
    ]
  },
  {
    category: 'Databases',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/enterprise-systems/tech-database.jpg',
    items: [
      { name: 'Oracle Database', level: 90, description: 'Enterprise RDBMS' },
      { name: 'Microsoft SQL Server', level: 90, description: 'Microsoft DB platform' },
      { name: 'PostgreSQL', level: 95, description: 'Open source RDBMS' },
      { name: 'MongoDB', level: 85, description: 'NoSQL database' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section
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

    // Create binary code rain effect (representing technology)
    const columns = Math.floor(canvas.width / 20)
    const drops: { y: number; speed: number; chars: string[] }[] = []

    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        chars: [],
      })
    }

    // Generate random binary characters
    const generateChars = () => {
      const chars = []
      for (let i = 0; i < 10; i++) {
        chars.push(Math.random() > 0.5 ? '1' : '0')
      }
      return chars
    }

    drops.forEach(drop => {
      drop.chars = generateChars()
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw binary rain
      ctx.font = '12px monospace'
      
      drops.forEach((drop, i) => {
        const x = i * 20
        
        drop.chars.forEach((char, j) => {
          const y = drop.y - j * 20
          if (y > 0 && y < canvas.height) {
            const opacity = 0.1 * (1 - j / drop.chars.length)
            ctx.fillStyle = `rgba(91, 108, 255, ${opacity})`
            ctx.fillText(char, x, y)
          }
        })

        drop.y += drop.speed

        if (drop.y > canvas.height + 200) {
          drop.y = -200
          drop.chars = generateChars()
        }
      })

      // Draw scanning line effect
      const scanY = (time * 100) % canvas.height
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(canvas.width, scanY)
      ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
      ctx.lineWidth = 2
      ctx.stroke()

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
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18132a] via-[#23204a] to-[#5B6CFF]/30 opacity-80" />
      
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
            Enterprise{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage industry-leading enterprise platforms and technologies to build 
            robust, scalable business solutions.
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