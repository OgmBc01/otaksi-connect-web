'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Logistics Domain Expertise',
    description: 'Deep understanding of freight, fleet management, warehousing, and last-mile delivery operations.',
    icon: '🚛',
    image: '/images/solutions/logistics/why-expertise.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '20+ years experience'
  },
  {
    title: 'End-to-End Visibility',
    description: 'Complete transparency across your supply chain with real-time tracking and analytics.',
    icon: '👁️',
    image: '/images/solutions/logistics/why-visibility.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'Real-time tracking'
  },
  {
    title: 'IoT & Sensor Integration',
    description: 'Expertise in IoT devices, sensors, and telematics for asset tracking and monitoring.',
    icon: '📡',
    image: '/images/solutions/logistics/why-iot.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '10K+ devices connected'
  },
  {
    title: 'Scalable Solutions',
    description: 'Platforms that grow with your business, from local fleets to global supply chains.',
    icon: '📈',
    image: '/images/solutions/logistics/why-scalable.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'Enterprise ready'
  },
  {
    title: 'Cost Optimization',
    description: 'Proven track record of reducing logistics costs through technology and optimization.',
    icon: '💰',
    image: '/images/solutions/logistics/why-cost.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '30% cost reduction'
  },
  {
    title: 'Proven Track Record',
    description: 'Successful implementations for leading logistics providers in UAE and globally.',
    icon: '🏆',
    image: '/images/solutions/logistics/why-proven.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '50+ logistics clients'
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Why Choose Us section (logistics badges)
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

    // Create floating logistics badges
    const badges = ['ISO 28000', 'TAPA', 'GDP', 'HACCP', 'IMO', 'IATA', 'FIATA', 'WCA']
    const floatingBadges: { x: number; y: number; text: string; size: number; speedX: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 12; i++) {
      floatingBadges.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: badges[Math.floor(Math.random() * badges.length)],
        size: 14 + Math.random() * 8,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create container outlines
    const containers: { x: number; y: number; width: number; height: number; stacked: boolean }[] = []

    for (let i = 0; i < 5; i++) {
      containers.push({
        x: 150 + i * 200,
        y: 300,
        width: 60,
        height: 40,
        stacked: i % 2 === 0,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw containers
      containers.forEach((container) => {
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1
        ctx.strokeRect(container.x, container.y, container.width, container.height)

        if (container.stacked) {
          ctx.strokeRect(container.x - 5, container.y - 25, container.width, container.height)
        }

        // Container details
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillRect(container.x + 10, container.y + 5, 10, 5)
        ctx.fillRect(container.x + 30, container.y + 5, 10, 5)
      })

      // Draw floating badges
      floatingBadges.forEach((badge) => {
        badge.x += badge.speedX
        badge.y += badge.speedY

        if (badge.x < 0 || badge.x > canvas.width) badge.speedX *= -1
        if (badge.y < 0 || badge.y > canvas.height) badge.speedY *= -1

        ctx.font = `${badge.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${badge.opacity})`
        ctx.fillText(badge.text, badge.x, badge.y)
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Logistics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine logistics expertise with innovative technology to deliver 
            solutions that optimize your supply chain.
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
          <p className="text-sm text-gray-500 mb-6">Trusted by leading logistics companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['DP World', 'Aramex', 'Fetchr', 'Al Futtaim', 'Emirates Post', 'DHL'].map((company, index) => (
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