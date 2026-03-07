'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'Digital Platforms',
    icon: '🏗️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/digital-transformation/tech-platforms.jpg',
    items: [
      { name: 'Salesforce', level: 90, description: 'Customer platform' },
      { name: 'Microsoft Power Platform', level: 95, description: 'Low-code development' },
      { name: 'ServiceNow', level: 85, description: 'Digital workflows' },
      { name: 'OutSystems', level: 80, description: 'Low-code apps' },
    ]
  },
  {
    category: 'Automation Tools',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/digital-transformation/tech-automation.jpg',
    items: [
      { name: 'UiPath', level: 90, description: 'RPA platform' },
      { name: 'Automation Anywhere', level: 85, description: 'Intelligent automation' },
      { name: 'Blue Prism', level: 80, description: 'Enterprise RPA' },
      { name: 'Zapier', level: 85, description: 'Workflow automation' },
    ]
  },
  {
    category: 'Analytics & BI',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/digital-transformation/tech-analytics.jpg',
    items: [
      { name: 'Power BI', level: 95, description: 'Business intelligence' },
      { name: 'Tableau', level: 90, description: 'Data visualization' },
      { name: 'Looker', level: 85, description: 'Modern BI platform' },
      { name: 'Qlik', level: 80, description: 'Analytics platform' },
    ]
  },
  {
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/digital-transformation/tech-integration.jpg',
    items: [
      { name: 'MuleSoft', level: 85, description: 'Integration platform' },
      { name: 'Dell Boomi', level: 80, description: 'Cloud integration' },
      { name: 'Apache Kafka', level: 90, description: 'Event streaming' },
      { name: 'Azure Integration', level: 85, description: 'Cloud integration' },
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

    // Create technology connection nodes
    const nodes: { x: number; y: number; connections: number[]; pulse: number }[] = []
    
    for (let i = 0; i < 10; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && Math.random() > 0.7) {
          node.connections.push(j)
        }
      })
    })

    // Create floating binary data
    const dataPoints: { x: number; y: number; value: string; speed: number }[] = []
    for (let i = 0; i < 20; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.random() > 0.5 ? '1' : '0',
        speed: 0.5 + Math.random() * 1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach(connIndex => {
          const target = nodes[connIndex]
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = `rgba(91, 108, 255, 0.1)`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Draw data flow
          const flowPos = (time + node.pulse) % 1
          const flowX = node.x + (target.x - node.x) * flowPos
          const flowY = node.y + (target.y - node.y) * flowPos

          ctx.beginPath()
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 46, 159, 0.2)`
          ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += 0.02
        const size = 3 + Math.sin(node.pulse) * 1

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
        gradient.addColorStop(0, `rgba(91, 108, 255, 0.3)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw floating binary data
      dataPoints.forEach((point) => {
        point.y -= point.speed
        
        if (point.y < 0) {
          point.y = canvas.height
          point.x = Math.random() * canvas.width
        }

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, 0.1)`
        ctx.fillText(point.value, point.x, point.y)
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
            Transformation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge digital platforms and tools to enable your 
            transformation journey.
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