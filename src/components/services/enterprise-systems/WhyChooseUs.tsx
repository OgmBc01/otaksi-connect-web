'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Industry-Specific Expertise',
    description: 'Deep domain knowledge across retail, banking, healthcare, logistics, and government sectors in the UAE.',
    icon: '🎯',
    image: '/images/enterprise-systems/why-industry.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '15+ industries served'
  },
  {
    title: 'End-to-End Implementation',
    description: 'Complete lifecycle support from requirements analysis to go-live and ongoing optimization.',
    icon: '🔄',
    image: '/images/enterprise-systems/why-end-to-end.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '100+ successful implementations'
  },
  {
    title: 'Integration Excellence',
    description: 'Seamless integration with existing systems, third-party applications, and legacy platforms.',
    icon: '🔌',
    image: '/images/enterprise-systems/why-integration.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '500+ integrations'
  },
  {
    title: 'Data Security & Compliance',
    description: 'Enterprise-grade security with compliance to UAE data protection laws and industry regulations.',
    icon: '🛡️',
    image: '/images/enterprise-systems/why-security.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'ISO 27001 certified'
  },
  {
    title: 'Scalable Solutions',
    description: 'Systems designed to grow with your business, from SMEs to large enterprises.',
    icon: '📈',
    image: '/images/enterprise-systems/why-scalable.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '99.99% scalability'
  },
  {
    title: 'Local Support Team',
    description: 'Dedicated UAE-based support team providing on-site assistance and rapid response.',
    icon: '🇦🇪',
    image: '/images/enterprise-systems/why-local.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '24/7 local support'
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Why Choose Us section
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

    // Create value particles (representing business value)
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      value: string
      opacity: number
    }[] = []

    const values = ['ROI', 'EFFICIENCY', 'GROWTH', 'INNOVATION', 'SCALABILITY', 'SECURITY', 'INTEGRATION', 'ANALYTICS']

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 12 + Math.random() * 8,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        value: values[Math.floor(Math.random() * values.length)],
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw floating value tags
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.font = `${particle.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${particle.opacity})`
        ctx.fillText(particle.value, particle.x, particle.y)
      })

      // Draw connecting energy lines
      for (let i = 0; i < 5; i++) {
        const x1 = canvas.width * (0.2 + Math.sin(time * 2 + i) * 0.1)
        const y1 = canvas.height * (0.3 + Math.cos(time + i) * 0.2)
        const x2 = canvas.width * (0.8 + Math.cos(time * 1.5 + i) * 0.1)
        const y2 = canvas.height * (0.7 + Math.sin(time * 2.5 + i) * 0.2)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 46, 159, 0.05)`
        ctx.lineWidth = 1
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
      
      {/* Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91, 108, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Data Stream Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E9F] to-transparent opacity-30" />

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
            Why Choose Us for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Enterprise Systems</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine deep technical expertise with business acumen to deliver enterprise 
            solutions that drive real competitive advantage.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: reason.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: reason.gradient }}
                      >
                        <span className="text-2xl">{reason.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Stats Badge */}
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                      style={{ 
                        background: `${reason.gradient}`, 
                        opacity: 0.9 
                      }}
                    >
                      {reason.stats}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">Trusted by leading UAE enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Majid Al Futtaim', 'Emirates NBD', 'DHA', 'DP World', 'ADNOC', 'Etisalat'].map((company, index) => (
              <span key={index} className="text-sm text-gray-400 font-medium">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}