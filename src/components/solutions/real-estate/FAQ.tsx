'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'What is Ejari integration and why is it important?',
    answer: 'Ejari is Dubai\'s mandatory tenancy contract registration system. Our Ejari integration automates the registration and renewal process, ensuring compliance, reducing manual work, and eliminating errors. It seamlessly connects your property management system with Dubai Land Department.',
    category: 'Ejari',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do smart building solutions work?',
    answer: 'Our smart building solutions use IoT sensors to monitor and control building systems including HVAC, lighting, security, and energy consumption. Data is analyzed in real-time to optimize operations, reduce costs, and enhance tenant comfort through mobile apps and automated controls.',
    category: 'Smart Buildings',
    icon: '🏙️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'Can you integrate with existing property management systems?',
    answer: 'Yes, we specialize in integrating with major property management systems including Yardi, MRI, and Buildium. Our API-first approach ensures seamless data flow between platforms, whether you\'re upgrading or adding new capabilities.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What RERA compliance features do you include?',
    answer: 'Our solutions include automated RERA compliance features such as rent calculation indices, tenancy contract management, broker registration verification, and regulatory reporting. We stay updated with the latest RERA regulations to ensure ongoing compliance.',
    category: 'Compliance',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How long does it take to implement a property management system?',
    answer: 'Implementation timelines vary based on portfolio size and complexity. A standard implementation for 1,000-5,000 units typically takes 3-4 months. Larger portfolios or custom solutions may take 6-8 months. We deliver value incrementally with phased rollouts.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Do you offer tenant portal solutions?',
    answer: 'Yes, our tenant portals provide self-service capabilities including rent payments, maintenance requests, document access, and community features. Mobile apps are available for iOS and Android, enhancing tenant satisfaction and reducing administrative workload.',
    category: 'Tenant Portal',
    icon: '👥',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle data migration from legacy systems?',
    answer: 'We follow a structured data migration process including audit, cleansing, mapping, validation, and testing. We ensure data integrity and provide rollback options. Historical data is preserved and accessible in the new system.',
    category: 'Migration',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What ongoing support do you provide?',
    answer: 'We offer comprehensive support including 24/7 technical support, regular system updates, security patches, and continuous optimization. Our team monitors system performance and provides proactive recommendations for improvement.',
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

  // Unique animated background for FAQ section (property documents)
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

    // Create floating documents
    const documents: { x: number; y: number; width: number; height: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      documents.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 100,
        height: 70,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create question mark particles
    const questions: { x: number; y: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 10; i++) {
      questions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 16 + Math.random() * 12,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw floating documents
      documents.forEach((doc) => {
        doc.y -= doc.speedY

        if (doc.y < -doc.height) {
          doc.y = canvas.height + doc.height
          doc.x = Math.random() * canvas.width
        }

        // Document outline
        ctx.strokeStyle = `rgba(91, 108, 255, ${doc.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(doc.x, doc.y, doc.width, doc.height)

        // Document lines
        ctx.fillStyle = `rgba(255, 46, 159, ${doc.opacity * 0.5})`
        ctx.fillRect(doc.x + 10, doc.y + 15, 50, 4)
        ctx.fillRect(doc.x + 10, doc.y + 30, 70, 4)
        ctx.fillRect(doc.x + 10, doc.y + 45, 40, 4)
      })

      // Draw floating question marks
      questions.forEach((q) => {
        q.y -= q.speedY

        if (q.y < 0) {
          q.y = canvas.height
          q.x = Math.random() * canvas.width
        }

        ctx.font = `${q.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${q.opacity})`
        ctx.fillText('?', q.x, q.y)
      })

      // Draw property deed outlines
      for (let i = 0; i < 3; i++) {
        const x = 200 + i * 300
        const y = 300 + Math.sin(time + i) * 20

        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, 150, 100)
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
            PropTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about real estate technology solutions 
            and implementation.
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
                  <p className="text-sm text-gray-400">Our PropTech experts are ready to help</p>
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