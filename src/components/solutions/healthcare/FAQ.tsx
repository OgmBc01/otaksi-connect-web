'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'How do you ensure compliance with DHA regulations?',
    answer: 'We build solutions that are DHA-compliant by design, incorporating requirements for data security, patient privacy, and clinical documentation. Our team stays updated with the latest DHA guidelines and works closely with healthcare providers to ensure full compliance.',
    category: 'Compliance',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is HL7/FHIR and why is it important?',
    answer: 'HL7 and FHIR are healthcare data exchange standards that enable different healthcare systems to communicate and share information. We use these standards to ensure your EHR, lab system, and other platforms work together seamlessly, providing a unified view of patient data.',
    category: 'Interoperability',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you protect patient data?',
    answer: 'We implement enterprise-grade security including encryption at rest and in transit, role-based access control, audit logging, and regular security assessments. All solutions are designed to meet HIPAA and UAE data protection standards.',
    category: 'Security',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How long does it take to implement an EHR system?',
    answer: 'Implementation timelines vary based on facility size and complexity. A single clinic may take 2-3 months, while a multi-hospital system can take 8-12 months. We follow a phased approach to minimize disruption to patient care.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer: 'Yes, we specialize in healthcare integration using HL7, FHIR, and custom APIs. Whether you need to connect with lab systems, radiology PACS, billing platforms, or government health systems, we ensure seamless data exchange.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Do you offer patient portal solutions?',
    answer: 'Yes, our patient portals provide 24/7 access to health records, appointment scheduling, secure messaging, prescription refills, and bill payment. Mobile apps are available for iOS and Android, enhancing patient engagement.',
    category: 'Patient Portal',
    icon: '👥',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle data migration from legacy systems?',
    answer: 'We follow a rigorous data migration process including data audit, cleansing, mapping, validation, and testing. We ensure historical patient data is accurately preserved and accessible in the new system with complete audit trails.',
    category: 'Migration',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What training and support do you provide?',
    answer: 'We provide comprehensive training for clinical and administrative staff, including on-site sessions, e-learning modules, and super-user training. Ongoing support includes 24/7 technical support, system monitoring, and regular updates.',
    category: 'Support',
    icon: '🎓',
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

  // Unique animated background for FAQ section (medical records)
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

    // Create floating medical records
    const records: { x: number; y: number; width: number; height: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      records.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 120,
        height: 80,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create prescription symbols
    const prescriptions: { x: number; y: number; text: string; size: number; speedY: number; opacity: number }[] = []
    const rxSymbols = ['℞', '💊', '🩺', '📋', '❤️']

    for (let i = 0; i < 10; i++) {
      prescriptions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: rxSymbols[Math.floor(Math.random() * rxSymbols.length)],
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

      // Draw floating medical records
      records.forEach((record) => {
        record.y -= record.speedY

        if (record.y < -record.height) {
          record.y = canvas.height + record.height
          record.x = Math.random() * canvas.width
        }

        // Record outline
        ctx.strokeStyle = `rgba(91, 108, 255, ${record.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(record.x, record.y, record.width, record.height)

        // Record lines (representing text)
        ctx.fillStyle = `rgba(255, 46, 159, ${record.opacity * 0.5})`
        ctx.fillRect(record.x + 10, record.y + 15, 60, 4)
        ctx.fillRect(record.x + 10, record.y + 30, 80, 4)
        ctx.fillRect(record.x + 10, record.y + 45, 40, 4)
      })

      // Draw prescription symbols
      prescriptions.forEach((rx) => {
        rx.y -= rx.speedY

        if (rx.y < 0) {
          rx.y = canvas.height
          rx.x = Math.random() * canvas.width
        }

        ctx.font = `${rx.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${rx.opacity})`
        ctx.fillText(rx.text, rx.x, rx.y)
      })

      // Draw heartbeat line
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 100)

      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height - 100 + Math.sin(x * 0.02 + time * 5) * 30
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
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
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about healthcare technology solutions 
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
                  <p className="text-sm text-gray-400">Our healthcare technology experts are ready to help</p>
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