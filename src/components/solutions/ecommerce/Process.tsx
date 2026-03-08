'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Business & Requirements Analysis',
    description: 'We analyze your business model, target audience, and technical requirements to create a comprehensive e-commerce strategy.',
    icon: '🔍',
    image: '/images/solutions/ecommerce/process-discovery.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Business model analysis',
      'Target audience research',
      'Competitor analysis',
      'Technical requirements'
    ]
  },
  {
    phase: 'Design',
    title: 'UX/UI & Store Design',
    description: 'We design intuitive user experiences and visually stunning storefronts that drive conversions.',
    icon: '🎨',
    image: '/images/solutions/ecommerce/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'User journey mapping',
      'Wireframing',
      'Visual design',
      'Mobile optimization'
    ]
  },
  {
    phase: 'Development',
    title: 'Platform Development',
    description: 'We build and configure your e-commerce platform with all features and integrations.',
    icon: '⚙️',
    image: '/images/solutions/ecommerce/process-development.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Platform setup',
      'Custom development',
      'Payment integration',
      'Testing & QA'
    ]
  },
  {
    phase: 'Launch',
    title: 'Go-Live & Optimization',
    description: 'We launch your store and continuously optimize for performance and conversions.',
    icon: '🚀',
    image: '/images/solutions/ecommerce/process-launch.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Soft launch',
      'Performance monitoring',
      'Conversion optimization',
      'Ongoing support'
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

  // Unique animated background for Process section (shopping funnel)
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

    // Create conversion funnel
    const funnelLevels = [
      { y: 100, width: 400, label: 'Visitors' },
      { y: 200, width: 300, label: 'Product Views' },
      { y: 300, width: 200, label: 'Add to Cart' },
      { y: 400, width: 100, label: 'Purchases' },
    ]

    // Create floating shopping behavior indicators
    const behaviors: { x: number; y: number; text: string; size: number; speedY: number; opacity: number }[] = []
    const behaviorTexts = ['Add to Cart', 'Wishlist', 'Review', 'Share', 'Compare', 'Buy Now']

    for (let i = 0; i < 12; i++) {
      behaviors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: behaviorTexts[Math.floor(Math.random() * behaviorTexts.length)],
        size: 12 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw conversion funnel
      funnelLevels.forEach((level, i) => {
        const x = (canvas.width - level.width) / 2

        // Funnel outline
        ctx.strokeStyle = i === activeStep ? 'rgba(255, 46, 159, 0.3)' : 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.strokeRect(x, level.y, level.width, 40)

        // Fill
        ctx.fillStyle = i === activeStep ? 'rgba(255, 46, 159, 0.1)' : 'rgba(91, 108, 255, 0.05)'
        ctx.fillRect(x, level.y, level.width, 40)

        // Label
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(level.label, x + 10, level.y - 10)

        // Conversion rate
        if (i > 0) {
          const rate = ((level.width / funnelLevels[i-1].width) * 100).toFixed(0)
          ctx.font = '10px monospace'
          ctx.fillStyle = 'rgba(91, 108, 255, 0.3)'
          ctx.fillText(`${rate}% conversion`, x + level.width + 20, level.y + 20)
        }
      })

      // Draw floating behavior indicators
      behaviors.forEach((behavior) => {
        behavior.y -= behavior.speedY

        if (behavior.y < 0) {
          behavior.y = canvas.height
          behavior.x = Math.random() * canvas.width
        }

        ctx.font = `${behavior.size}px monospace`
        ctx.fillStyle = `rgba(255, 46, 159, ${behavior.opacity})`
        ctx.fillText(behavior.text, behavior.x, behavior.y)
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
            E-commerce{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Development Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successfully launching and scaling your 
            online store.
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