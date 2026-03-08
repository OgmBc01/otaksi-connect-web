'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Public Sector Expertise',
    description: 'Deep understanding of government operations, regulations, and citizen service delivery.',
    icon: '🏛️',
    image: '/images/solutions/government/why-expertise.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '15+ government clients'
  },
  {
    title: 'Security & Compliance',
    description: 'Solutions built to meet government security standards and regulatory requirements.',
    icon: '🔒',
    image: '/images/solutions/government/why-security.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'ISO 27001 certified'
  },
  {
    title: 'Citizen-Centric Design',
    description: 'Services designed around citizen needs for maximum accessibility and satisfaction.',
    icon: '👥',
    image: '/images/solutions/government/why-citizen.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '90% satisfaction rate'
  },
  {
    title: 'Smart City Expertise',
    description: 'Proven experience in implementing smart city initiatives and IoT infrastructure.',
    icon: '🏙️',
    image: '/images/solutions/government/why-smartcity.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '5+ smart cities'
  },
  {
    title: 'Inter-agency Integration',
    description: 'Seamless integration between different government entities and systems.',
    icon: '🔄',
    image: '/images/solutions/government/why-integration.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '50+ integrations'
  },
  {
    title: 'Proven Track Record',
    description: 'Successful implementations for leading government entities in UAE.',
    icon: '🏆',
    image: '/images/solutions/government/why-proven.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '100% project success'
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Why Choose Us section (government seals)
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

    // Create floating government seals
    const seals = ['🇦🇪', '⚖️', '🏛️', '📜', '🛡️', '🔰']
    const floatingSeals: { x: number; y: number; seal: string; size: number; speedX: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 12; i++) {
      floatingSeals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        seal: seals[Math.floor(Math.random() * seals.length)],
        size: 24 + Math.random() * 16,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create building outlines
    const buildings: { x: number; y: number; height: number; width: number }[] = []

    for (let i = 0; i < 5; i++) {
      buildings.push({
        x: 200 + i * 250,
        y: 350,
        height: 100 + Math.random() * 80,
        width: 60,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw buildings
      buildings.forEach((building) => {
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1
        ctx.strokeRect(building.x, building.y - building.height, building.width, building.height)

        // Windows
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        for (let w = 0; w < 4; w++) {
          if (building.height > w * 25) {
            ctx.fillRect(building.x + 10, building.y - building.height + w * 25 + 10, 10, 10)
            ctx.fillRect(building.x + 35, building.y - building.height + w * 25 + 10, 10, 10)
          }
        }
      })

      // Draw floating seals
      floatingSeals.forEach((seal) => {
        seal.x += seal.speedX
        seal.y += seal.speedY

        if (seal.x < 0 || seal.x > canvas.width) seal.speedX *= -1
        if (seal.y < 0 || seal.y > canvas.height) seal.speedY *= -1

        ctx.font = `${seal.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${seal.opacity})`
        ctx.fillText(seal.seal, seal.x, seal.y)
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Government</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine public sector expertise with innovative technology to deliver 
            secure, accessible, and efficient government services.
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
          <p className="text-sm text-gray-500 mb-6">Trusted by leading government entities</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Smart Dubai', 'Abu Dhabi Digital', 'Dubai Police', 'MOI', 'DHA', 'TRA'].map((entity, index) => (
              <span key={index} className="text-sm text-gray-400 font-medium">
                {entity}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}