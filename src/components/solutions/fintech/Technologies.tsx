'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'Core Banking',
    icon: '🏦',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/fintech/tech-core.jpg',
    items: [
      { name: 'Temenos', level: 90, description: 'Core banking platform' },
      { name: 'Oracle FLEXCUBE', level: 85, description: 'Universal banking' },
      { name: 'Silverlake', level: 80, description: 'Core banking system' },
      { name: 'SAP for Banking', level: 85, description: 'Banking suite' },
    ]
  },
  {
    category: 'Payment Processing',
    icon: '💳',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/fintech/tech-payments.jpg',
    items: [
      { name: 'Stripe', level: 95, description: 'Payment gateway' },
      { name: 'Adyen', level: 90, description: 'Global payments' },
      { name: 'Checkout.com', level: 90, description: 'Payment processing' },
      { name: 'Network International', level: 95, description: 'MENA payments' },
    ]
  },
  {
    category: 'Blockchain & Crypto',
    icon: '⛓️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/solutions/fintech/tech-blockchain.jpg',
    items: [
      { name: 'Ethereum', level: 85, description: 'Smart contracts' },
      { name: 'Hyperledger', level: 80, description: 'Enterprise blockchain' },
      { name: 'R3 Corda', level: 75, description: 'Financial blockchain' },
      { name: 'Solana', level: 70, description: 'High-performance chain' },
    ]
  },
  {
    category: 'RegTech',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/solutions/fintech/tech-regtech.jpg',
    items: [
      { name: 'ComplyAdvantage', level: 85, description: 'AML screening' },
      { name: 'Onfido', level: 90, description: 'KYC verification' },
      { name: 'Trulioo', level: 85, description: 'Identity verification' },
      { name: 'Chainalysis', level: 80, description: 'Crypto compliance' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section (blockchain visualization)
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

    // Create blockchain blocks
    const blocks: { x: number; y: number; hash: string; connections: number[] }[] = []

    for (let i = 0; i < 8; i++) {
      blocks.push({
        x: 100 + i * 120,
        y: 200 + Math.sin(i) * 50,
        hash: Math.random().toString(16).substring(2, 10),
        connections: [],
      })
    }

    // Create connections
    blocks.forEach((block, i) => {
      if (i > 0) {
        block.connections.push(i - 1)
      }
    })

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connections
      blocks.forEach((block) => {
        block.connections.forEach(connIndex => {
          const target = blocks[connIndex]
          
          ctx.beginPath()
          ctx.moveTo(block.x, block.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw data flow
          const flowPos = (time + block.x * 0.01) % 1
          const flowX = block.x + (target.x - block.x) * flowPos
          const flowY = block.y + (target.y - block.y) * flowPos

          ctx.beginPath()
          ctx.arc(flowX, flowY, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
          ctx.fill()
        })
      })

      // Draw blocks
      blocks.forEach((block) => {
        // Block outline
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.strokeRect(block.x - 40, block.y - 20, 80, 40)

        // Block hash
        ctx.font = '8px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(block.hash.substring(0, 8), block.x - 30, block.y)
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
            FinTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage best-in-class financial technology platforms and tools to build 
            secure, scalable, and compliant solutions.
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