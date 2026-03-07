'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Certified DevOps Experts',
    description: 'Our team holds top-tier certifications across AWS, Azure, Google Cloud, and Kubernetes.',
    icon: '🏆',
    image: '/images/devops-sre/why-certified.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '50+ certifications'
  },
  {
    title: 'Proven Track Record',
    description: '100+ successful DevOps transformations across banking, healthcare, logistics, and retail.',
    icon: '📊',
    image: '/images/devops-sre/why-proven.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '100+ transformations'
  },
  {
    title: '24/7 Reliability Engineering',
    description: 'Round-the-clock monitoring, incident response, and reliability optimization.',
    icon: '⚡',
    image: '/images/devops-sre/why-reliability.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '99.99% uptime'
  },
  {
    title: 'Cost Optimization',
    description: 'We optimize cloud spend and infrastructure costs, typically reducing expenses by 30-50%.',
    icon: '💰',
    image: '/images/devops-sre/why-cost.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '40% average savings'
  },
  {
    title: 'Security-First Mindset',
    description: 'DevSecOps practices integrated throughout the pipeline for continuous security.',
    icon: '🔒',
    image: '/images/devops-sre/why-security.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: 'Zero breaches'
  },
  {
    title: 'Multi-Cloud Expertise',
    description: 'Deep expertise across AWS, Azure, and Google Cloud for flexible, vendor-neutral solutions.',
    icon: '☁️',
    image: '/images/devops-sre/why-multicloud.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'All major clouds'
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Why Choose Us section (reliability dashboard)
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

    // Create reliability gauges
    const gauges: { x: number; y: number; value: number; target: number; label: string }[] = []
    const gaugeLabels = ['uptime', 'latency', 'errors', 'saturation']
    
    for (let i = 0; i < 8; i++) {
      gauges.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.floor(Math.random() * 100),
        target: 95 + Math.floor(Math.random() * 5),
        label: gaugeLabels[Math.floor(Math.random() * gaugeLabels.length)],
      })
    }

    // Create heartbeat lines
    const heartbeats: { x: number; y: number; amplitude: number; frequency: number }[] = []

    for (let i = 0; i < 3; i++) {
      heartbeats.push({
        x: 50,
        y: 100 + i * 150,
        amplitude: 20 + Math.random() * 30,
        frequency: 0.02 + Math.random() * 0.02,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.05

      // Draw heartbeat lines
      heartbeats.forEach((heartbeat) => {
        ctx.beginPath()
        ctx.moveTo(heartbeat.x, heartbeat.y)

        for (let x = heartbeat.x; x < canvas.width; x += 5) {
          const y = heartbeat.y + Math.sin(x * heartbeat.frequency + time) * heartbeat.amplitude
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw gauges
      gauges.forEach((gauge) => {
        // Update gauge value
        if (gauge.value < gauge.target) {
          gauge.value += 0.1
        }

        // Draw gauge background
        ctx.beginPath()
        ctx.arc(gauge.x, gauge.y, 25, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.lineWidth = 4
        ctx.stroke()

        // Draw gauge fill
        const angle = (gauge.value / 100) * Math.PI * 2
        ctx.beginPath()
        ctx.arc(gauge.x, gauge.y, 25, 0, angle)
        ctx.strokeStyle = `rgba(255, 46, 159, 0.3)`
        ctx.lineWidth = 4
        ctx.stroke()

        // Draw label
        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(gauge.label, gauge.x - 20, gauge.y + 40)
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
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#FF2E9F] to-transparent opacity-30" />

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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">DevOps & SRE</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine deep technical expertise with operational excellence to deliver 
            reliable, automated, and scalable infrastructure.
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
                    <div className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/50 to-transparent" />
                    
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
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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
          <p className="text-sm text-gray-500 mb-6">Trusted by industry leaders for DevOps transformation</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Emirates NBD', 'DP World', 'DHA', 'Majid Al Futtaim', 'ADNOC', 'Etisalat'].map((company, index) => (
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