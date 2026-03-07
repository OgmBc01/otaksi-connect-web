'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'EHR Implementation',
    client: 'Dubai Health Authority',
    description: 'Enterprise-wide EHR system implementation across 15 hospitals, serving 2M+ patients.',
    image: '/images/solutions/healthcare/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '2M+ patients, 15 hospitals',
    metrics: ['Unified records', 'Real-time data', 'DHA compliant'],
    slug: 'dha-ehr-implementation'
  },
  {
    id: 2,
    title: 'Telemedicine Platform',
    client: 'Mediclinic Middle East',
    description: 'Secure telemedicine platform enabling 100K+ virtual consultations annually.',
    image: '/images/solutions/healthcare/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '100K+ consultations, 95% satisfaction',
    metrics: ['Video visits', 'E-prescriptions', 'Patient portal'],
    slug: 'mediclinic-telemedicine'
  },
  {
    id: 3,
    title: 'Patient Portal',
    client: 'NMC Healthcare',
    description: 'Patient engagement platform serving 500K+ patients across UAE.',
    image: '/images/solutions/healthcare/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '500K+ users, 40% engagement',
    metrics: ['Appointments', 'Records access', 'Secure messaging'],
    slug: 'nmc-patient-portal'
  },
  {
    id: 4,
    title: 'Laboratory Information System',
    client: 'Aster DM Healthcare',
    description: 'Integrated LIS across 100+ labs, processing 1M+ tests monthly.',
    image: '/images/solutions/healthcare/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '1M+ tests/month, 50% faster',
    metrics: ['Auto-verification', 'Quality control', 'HL7 integration'],
    slug: 'aster-lis'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Case Studies section (patient outcome metrics)
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

    // Create outcome metrics
    const metrics: { label: string; value: number; target: number; x: number; y: number; speed: number }[] = [
      { label: 'Patient Satisfaction', value: 85, target: 95, x: 200, y: 200, speed: 0.1 },
      { label: 'Readmission Rate', value: 12, target: 8, x: 450, y: 250, speed: 0.15 },
      { label: 'Avg Wait Time', value: 18, target: 15, x: 700, y: 300, speed: 0.2 },
    ]

    // Create floating health indicators
    const indicators: { x: number; y: number; symbol: string; size: number; speedY: number; opacity: number }[] = []
    const symbols = ['❤️', '⚕️', '💊', '🏥', '🩺', '📊']

    for (let i = 0; i < 10; i++) {
      indicators.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 20 + Math.random() * 20,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw metrics
      metrics.forEach((metric) => {
        // Progress bar background
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(metric.x, metric.y, 150, 8)

        // Progress bar fill
        const progress = (metric.value / metric.target) * 150
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(metric.x, metric.y, progress, 8)

        // Label
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(`${metric.label}: ${metric.value}%`, metric.x, metric.y - 10)
      })

      // Draw floating indicators
      indicators.forEach((indicator) => {
        indicator.y -= indicator.speedY

        if (indicator.y < 0) {
          indicator.y = canvas.height
          indicator.x = Math.random() * canvas.width
        }

        ctx.font = `${indicator.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${indicator.opacity})`
        ctx.fillText(indicator.symbol, indicator.x, indicator.y)
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
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading healthcare providers transform patient care 
            and operational efficiency.
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
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Client Badge */}
                      <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs border border-white/10">
                        {study.client}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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
            <span>View All Healthcare Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}