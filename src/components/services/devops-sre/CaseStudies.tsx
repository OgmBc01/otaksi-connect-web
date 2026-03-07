'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'CI/CD Transformation for Banking',
    client: 'Emirates NBD',
    description: 'Implemented automated CI/CD pipelines reducing deployment time from days to minutes.',
    image: '/images/devops-sre/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '10x faster deployments, 99.99% uptime',
    metrics: ['50+ microservices', 'Daily deployments', 'Zero-downtime releases'],
    slug: 'emirates-nbd-cicd'
  },
  {
    id: 2,
    title: 'Kubernetes Migration for Logistics',
    client: 'DP World',
    description: 'Migrated 100+ applications to Kubernetes, enabling auto-scaling and improved resilience.',
    image: '/images/devops-sre/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '60% cost reduction, 99.99% availability',
    metrics: ['100+ apps migrated', 'Auto-scaling', 'Multi-region'],
    slug: 'dp-world-kubernetes'
  },
  {
    id: 3,
    title: 'Observability Platform for Healthcare',
    client: 'DHA',
    description: 'Deployed comprehensive monitoring and observability stack across critical healthcare systems.',
    image: '/images/devops-sre/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '5-minute incident detection, 99.9% uptime',
    metrics: ['1000+ metrics', 'Real-time alerts', 'Automated remediation'],
    slug: 'dha-observability'
  },
  {
    id: 4,
    title: 'Infrastructure as Code for Retail',
    client: 'Majid Al Futtaim',
    description: 'Implemented Infrastructure as Code across 200+ AWS resources, enabling version-controlled infrastructure.',
    image: '/images/devops-sre/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '100% infrastructure automation, 50% cost savings',
    metrics: ['200+ resources', 'GitOps workflow', 'Immutable infrastructure'],
    slug: 'majid-al-futtaim-iac'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section (deployment metrics visualization)
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

    // Create success metrics counters
    const metrics: { x: number; y: number; value: number; target: number; label: string; speed: number }[] = []
    const metricLabels = ['deployments', 'uptime', 'savings', 'performance']
    
    for (let i = 0; i < 8; i++) {
      metrics.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.floor(Math.random() * 100),
        target: Math.floor(Math.random() * 100) + 50,
        label: metricLabels[Math.floor(Math.random() * metricLabels.length)],
        speed: 0.1 + Math.random() * 0.2,
      })
    }

    // Create deployment success pulses
    const pulses: { x: number; y: number; radius: number; opacity: number }[] = []

    for (let i = 0; i < 5; i++) {
      pulses.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20,
        opacity: 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update and draw success pulses
      pulses.forEach((pulse) => {
        pulse.radius += 0.5
        pulse.opacity -= 0.002

        if (pulse.opacity <= 0) {
          pulse.radius = 20
          pulse.opacity = 0.2
          pulse.x = Math.random() * canvas.width
          pulse.y = Math.random() * canvas.height
        }

        ctx.beginPath()
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${pulse.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Update and draw metrics counters
      metrics.forEach((metric) => {
        if (metric.value < metric.target) {
          metric.value += metric.speed
        }

        ctx.font = '14px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, 0.2)`
        ctx.fillText(`${Math.floor(metric.value)}% ${metric.label}`, metric.x, metric.y)
      })

      // Draw deployment graph
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 50)
      
      for (let x = 0; x < canvas.width; x += 20) {
        const y = canvas.height - 50 - Math.sin(x * 0.01 + time) * 30 - Math.cos(x * 0.02 + time) * 20
        ctx.lineTo(x, y)
      }
      
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
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
        staggerChildren: 0.15,
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
        damping: 25,
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
      
      {/* Success Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            DevOps{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading UAE enterprises transform their delivery 
            pipelines and improve reliability.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                    style={{ background: study.gradient }}
                  />
                  
                  {/* Card */}
                  <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Client Badge */}
                      <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs border border-white/10">
                        {study.client}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <span 
                              className="w-1 h-1 rounded-full mr-2"
                              style={{ background: study.gradient }}
                            />
                            {metric}
                          </div>
                        ))}
                      </div>

                      {/* Result Badge */}
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                        style={{ 
                          background: `${study.gradient}`, 
                          opacity: 0.9 
                        }}
                      >
                        {study.results}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span>View All DevOps Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}