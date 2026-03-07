'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'How long does digital transformation typically take?',
    answer: 'Timelines vary based on scope and complexity. A focused transformation initiative might take 6-12 months, while enterprise-wide transformation can span 2-3 years. We work in phases, delivering value at each stage while building toward the long-term vision.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you measure transformation success?',
    answer: 'We define KPIs aligned with your business goals—financial metrics (ROI, cost reduction), operational metrics (efficiency, productivity), and customer metrics (satisfaction, engagement). We track these throughout the journey and adjust as needed.',
    category: 'Measurement',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you manage resistance to change?',
    answer: 'We use proven change management methodologies including stakeholder engagement, communication plans, training programs, and leadership alignment. We identify champions early and address concerns proactively to build momentum.',
    category: 'Change Management',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What if we have legacy systems?',
    answer: 'Legacy systems are common in transformation. We assess your current landscape and develop strategies that may include integration, modernization, or phased replacement—always ensuring business continuity.',
    category: 'Legacy',
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you ensure employee adoption?',
    answer: 'We involve employees early through workshops, training, and feedback loops. Our change management programs build digital skills, create advocates, and address concerns. We celebrate wins and share success stories to build momentum.',
    category: 'Adoption',
    icon: '👥',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is your approach to ROI?',
    answer: 'We develop business cases before starting, identifying expected benefits and payback periods. We track realized benefits throughout implementation and provide regular ROI reporting. Most clients see positive returns within 12-18 months.',
    category: 'ROI',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle data migration?',
    answer: 'Data migration follows a structured process: audit, cleansing, mapping, validation, and testing. We run multiple test migrations, reconcile with source systems, and ensure data integrity before going live.',
    category: 'Data',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What ongoing support do you provide?',
    answer: 'We offer continuous optimization services including performance monitoring, capability building, and innovation roadmapping. Our goal is to help you build internal momentum for ongoing transformation beyond our engagement.',
    category: 'Support',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  }
]

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for FAQ section
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

    // Create thought bubbles
    const thoughtBubbles: {
      x: number
      y: number
      size: number
      pulse: number
      opacity: number
    }[] = []

    for (let i = 0; i < 8; i++) {
      thoughtBubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 40,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.05 + Math.random() * 0.05,
      })
    }

    // Create question mark particles
    const questionMarks: {
      x: number
      y: number
      size: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < 10; i++) {
      questionMarks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 12 + Math.random() * 12,
        speedY: 0.2 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw thought bubbles
      thoughtBubbles.forEach((bubble) => {
        bubble.pulse += 0.02
        const pulseSize = bubble.size + Math.sin(bubble.pulse) * 5

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${bubble.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw smaller connecting bubbles
        ctx.beginPath()
        ctx.arc(bubble.x - 10, bubble.y - 10, pulseSize * 0.3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 46, 159, ${bubble.opacity})`
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(bubble.x - 15, bubble.y - 15, pulseSize * 0.2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${bubble.opacity})`
        ctx.stroke()
      })

      // Draw floating question marks
      questionMarks.forEach((mark) => {
        mark.y -= mark.speedY

        if (mark.y < 0) {
          mark.y = canvas.height
          mark.x = Math.random() * canvas.width
        }

        ctx.font = `${mark.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${mark.opacity})`
        ctx.fillText('?', mark.x, mark.y)
      })

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.02)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < 5; i++) {
        const y = i * 200 + (time * 50) % 200
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
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
    hidden: { y: 20, opacity: 0 },
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
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about digital transformation and how 
            we can help your organization evolve.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div
                className="glass-card rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {/* Question */}
                <div className="p-6 flex items-start justify-between">
                  <div className="flex-1 flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-white/10"
                      style={{ background: faq.gradient, opacity: 0.2 }}
                    >
                      <span style={{ opacity: 1 }}>{faq.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium text-gray-500">{faq.category}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </div>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-white/10 ml-14">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-1">Still have questions?</h3>
                  <p className="text-sm text-gray-400">Our transformation experts are ready to help</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}