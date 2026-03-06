'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'How long does it take to implement an ERP system?',
    answer: 'Implementation timelines vary based on scope and complexity. A standard ERP implementation for a mid-sized company typically takes 6-9 months. Large enterprises with complex requirements may take 12-18 months. We provide detailed timelines during the discovery phase.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer: 'Yes, we specialize in integrating new enterprise systems with existing legacy applications, third-party software, and custom-built solutions. Our integration experts use modern middleware, APIs, and ETL tools to ensure seamless data flow across your entire technology landscape.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you ensure data migration is accurate?',
    answer: 'We follow a rigorous data migration methodology including data auditing, cleansing, transformation, and validation. We run multiple test migrations, reconcile data with source systems, and involve business users in acceptance testing to ensure 100% data accuracy.',
    category: 'Data',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What training and support do you provide?',
    answer: 'We provide comprehensive training programs including end-user training, super-user training, and train-the-trainer sessions. Post-go-live, we offer ongoing support with service level agreements (SLAs), regular system health checks, and continuous optimization services.',
    category: 'Support',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle business process changes?',
    answer: 'We work closely with your team to map current processes, identify improvement opportunities, and design future-state workflows. Our change management approach includes stakeholder engagement, communication plans, and phased rollouts to ensure smooth adoption.',
    category: 'Process',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What about mobile access and remote work?',
    answer: 'All our enterprise solutions include mobile capabilities, allowing employees to access systems securely from anywhere. We design responsive interfaces, mobile apps, and cloud-based architectures that support hybrid and remote work models.',
    category: 'Mobility',
    icon: '📱',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you ensure system security?',
    answer: 'We implement defense-in-depth security including role-based access control, encryption, audit logging, and regular security assessments. All solutions comply with UAE data protection laws and industry-specific regulations like GDPR, PCI DSS, or HIPAA as required.',
    category: 'Security',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models including fixed-price projects, time-and-materials, and managed service subscriptions. We provide detailed proposals with transparent pricing, and can work with your budget constraints while ensuring quality delivery.',
    category: 'Pricing',
    icon: '💰',
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

    // Create question mark particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 20,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw floating question marks
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.font = `${particle.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${particle.opacity})`
        ctx.fillText('?', particle.x, particle.y)
      })

      // Draw pulsing circles
      for (let i = 0; i < 3; i++) {
        const radius = 100 + Math.sin(time * 2 + i) * 20
        const x = canvas.width * (0.3 + i * 0.2)
        const y = canvas.height * 0.5
        
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 46, 159, 0.03)`
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
        className="absolute inset-0 w-full h-full opacity-50"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18132a] via-[#23204a] to-[#FF2E9F]/20 opacity-80" />
      
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
            Enterprise Systems{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about implementing enterprise business systems.
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
                  <p className="text-sm text-gray-400">Our enterprise systems experts are ready to help</p>
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