'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Holistic Approach',
    description: 'We address people, processes, and technology together—not in silos—ensuring sustainable transformation.',
    icon: '🔄',
    image: '/images/digital-transformation/why-holistic.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '360° transformation'
  },
  {
    title: 'Proven Methodology',
    description: 'Our transformation framework has been refined through 50+ successful engagements across industries.',
    icon: '📋',
    image: '/images/digital-transformation/why-methodology.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '50+ transformations'
  },
  {
    title: 'Change Management Excellence',
    description: 'We prioritize the human side of transformation, ensuring adoption and cultural change.',
    icon: '👥',
    image: '/images/digital-transformation/why-change.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '90% adoption rate'
  },
  {
    title: 'Measurable Results',
    description: 'We define and track KPIs from day one, delivering tangible business outcomes and ROI.',
    icon: '📊',
    image: '/images/digital-transformation/why-results.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '3x average ROI'
  },
  {
    title: 'Industry Expertise',
    description: 'Deep domain knowledge across retail, banking, healthcare, logistics, and government sectors.',
    icon: '🎯',
    image: '/images/digital-transformation/why-industry.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '15+ industries'
  },
  {
    title: 'Sustainable Transformation',
    description: 'We build internal capabilities and momentum for continuous evolution beyond our engagement.',
    icon: '🌱',
    image: '/images/digital-transformation/why-sustainable.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'Long-term impact'
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

    // Create value propositions as floating elements
    const values = [
      { text: 'INNOVATION', size: 14 },
      { text: 'AGILITY', size: 16 },
      { text: 'EFFICIENCY', size: 18 },
      { text: 'GROWTH', size: 20 },
      { text: 'IMPACT', size: 22 },
      { text: 'VALUE', size: 24 },
    ]

    const floatingElements: {
      x: number
      y: number
      text: string
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      const value = values[Math.floor(Math.random() * values.length)]
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: value.text,
        size: value.size,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    // Create radiating energy lines
    const rays: { angle: number; length: number; speed: number }[] = []

    for (let i = 0; i < 12; i++) {
      rays.push({
        angle: (i / 12) * Math.PI * 2,
        length: 100 + Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw radiating rays
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      rays.forEach((ray) => {
        const pulseLength = ray.length + Math.sin(time * ray.speed) * 20
        const endX = centerX + Math.cos(ray.angle) * pulseLength
        const endY = centerY + Math.sin(ray.angle) * pulseLength

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(91, 108, 255, 0.03)`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw floating value elements
      floatingElements.forEach((element) => {
        element.x += element.speedX
        element.y += element.speedY
        element.opacity += Math.sin(time) * 0.001

        if (element.x < 0 || element.x > canvas.width) element.speedX *= -1
        if (element.y < 0 || element.y > canvas.height) element.speedY *= -1

        ctx.font = `${element.size}px monospace`
        ctx.fillStyle = `rgba(255, 46, 159, ${element.opacity})`
        ctx.fillText(element.text, element.x, element.y)
      })

      // Draw energy pulses
      for (let i = 0; i < 3; i++) {
        const pulseX = canvas.width * (0.3 + Math.sin(time * 2 + i) * 0.1)
        const pulseY = canvas.height * (0.4 + Math.cos(time * 1.5 + i) * 0.1)
        const pulseRadius = 80 + Math.sin(time * 3 + i) * 20

        ctx.beginPath()
        ctx.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, pulseRadius * 2)
        gradient.addColorStop(0, `rgba(91, 108, 255, 0.05)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Digital Transformation</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine strategic vision with practical execution to deliver 
            transformation that creates lasting competitive advantage.
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
          <p className="text-sm text-gray-500 mb-6">Trusted by industry leaders for digital transformation</p>
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