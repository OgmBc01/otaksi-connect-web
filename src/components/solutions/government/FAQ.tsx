'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'How do you ensure compliance with government regulations?',
    answer: 'We work closely with government stakeholders to ensure all solutions comply with UAE laws, data protection regulations, and sector-specific requirements. Our team includes compliance experts who stay updated with the latest regulatory changes.',
    category: 'Compliance',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What security measures do you implement for government systems?',
    answer: 'We implement defense-in-depth security including encryption, multi-factor authentication, role-based access control, and continuous monitoring. All solutions undergo rigorous security audits and penetration testing before deployment.',
    category: 'Security',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle citizen data privacy?',
    answer: 'We follow strict data protection protocols compliant with UAE data privacy laws. Citizen data is encrypted, access is strictly controlled, and we implement comprehensive audit trails for all data access and modifications.',
    category: 'Privacy',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Can you integrate with existing government systems?',
    answer: 'Yes, we specialize in integrating with legacy government systems, national databases, and inter-agency platforms. Our API-first approach ensures seamless data exchange while maintaining security and data integrity.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you ensure accessibility for all citizens?',
    answer: 'We design with accessibility in mind, following WCAG guidelines to ensure services are usable by people with disabilities. We also support multiple languages, including Arabic and English, and design for users with varying digital literacy.',
    category: 'Accessibility',
    icon: '👥',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is your approach to change management?',
    answer: 'We work closely with government stakeholders to develop comprehensive change management programs including training, communication, and support to ensure smooth adoption of new systems by government employees.',
    category: 'Change Management',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you measure citizen satisfaction?',
    answer: 'We implement feedback mechanisms, surveys, and analytics to continuously measure citizen satisfaction. Real-time dashboards provide insights into service usage, completion rates, and user feedback.',
    category: 'Analytics',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What ongoing support do you provide?',
    answer: 'We offer comprehensive support including 24/7 monitoring, regular security updates, performance optimization, and helpdesk support for government employees and citizens.',
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

  // Unique animated background for FAQ section (citizen inquiries)
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

    // Create floating citizen inquiries
    const inquiries: { x: number; y: number; text: string; size: number; speedY: number; opacity: number }[] = []
    const inquiryTexts = ['ID Renewal?', 'Visa Status?', 'License?', 'Permit?', 'Certificate?', 'Payment?']

    for (let i = 0; i < 15; i++) {
      inquiries.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: inquiryTexts[Math.floor(Math.random() * inquiryTexts.length)],
        size: 14 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create service request tickets
    const tickets: { x: number; y: number; number: string; status: string; opacity: number }[] = []
    const statuses = ['Open', 'In Progress', 'Completed']

    for (let i = 0; i < 8; i++) {
      tickets.push({
        x: 150 + i * 200,
        y: 300,
        number: `SRQ-${Math.floor(Math.random() * 10000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        opacity: 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw service tickets
      tickets.forEach((ticket) => {
        // Ticket outline
        ctx.strokeStyle = `rgba(91, 108, 255, ${ticket.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(ticket.x, ticket.y, 120, 40)

        // Ticket number
        ctx.font = '8px monospace'
        ctx.fillStyle = `rgba(255, 46, 159, ${ticket.opacity})`
        ctx.fillText(ticket.number, ticket.x + 5, ticket.y + 15)

        // Status
        ctx.font = '8px monospace'
        ctx.fillStyle = `rgba(91, 108, 255, ${ticket.opacity})`
        ctx.fillText(ticket.status, ticket.x + 5, ticket.y + 30)
      })

      // Draw floating inquiries
      inquiries.forEach((inquiry) => {
        inquiry.y -= inquiry.speedY

        if (inquiry.y < 0) {
          inquiry.y = canvas.height
          inquiry.x = Math.random() * canvas.width
        }

        ctx.font = `${inquiry.size}px monospace`
        ctx.fillStyle = `rgba(255, 46, 159, ${inquiry.opacity})`
        ctx.fillText(inquiry.text, inquiry.x, inquiry.y)
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
            Government{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about government digital transformation 
            and citizen services.
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
                  <p className="text-sm text-gray-400">Our government solutions experts are ready to help</p>
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