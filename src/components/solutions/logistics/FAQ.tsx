'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'How can real-time tracking improve my logistics operations?',
    answer: 'Real-time tracking provides complete visibility into your shipments, enabling proactive issue resolution, accurate ETAs for customers, optimized routing, and reduced theft or loss. Our tracking solutions integrate with GPS, IoT sensors, and mobile apps for comprehensive monitoring.',
    category: 'Tracking',
    icon: '📍',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is warehouse automation and how does it work?',
    answer: 'Warehouse automation uses technology to streamline operations including automated storage and retrieval systems (AS/RS), conveyor belts, sorting systems, and robotic picking. Our WMS integrates with these systems to optimize inventory placement, picking routes, and labor allocation.',
    category: 'Warehouse',
    icon: '🏭',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you optimize fleet routes?',
    answer: 'Our route optimization algorithms consider multiple factors including traffic patterns, delivery windows, vehicle capacity, driver hours, and fuel costs. We provide dynamic re-routing based on real-time conditions, reducing fuel consumption and improving on-time delivery.',
    category: 'Fleet',
    icon: '🚛',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Can you integrate with our existing ERP/WMS?',
    answer: 'Yes, we specialize in integrating with major ERP and WMS platforms including SAP, Oracle, Microsoft Dynamics, and leading logistics systems. Our API-first approach ensures seamless data flow between systems.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'What IoT devices do you support for asset tracking?',
    answer: 'We support a wide range of IoT devices including GPS trackers, temperature sensors, humidity monitors, shock/vibration sensors, and RFID tags. Our platform aggregates data from multiple devices for comprehensive visibility.',
    category: 'IoT',
    icon: '📡',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you handle last-mile delivery optimization?',
    answer: 'Our last-mile solution optimizes delivery routes, provides real-time tracking for customers, electronic proof of delivery, and driver mobile apps. Features include dynamic scheduling, customer notifications, and performance analytics.',
    category: 'Last Mile',
    icon: '🚚',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'What is a supply chain control tower?',
    answer: 'A control tower provides end-to-end visibility and control across your entire supply chain. It aggregates data from suppliers, warehouses, carriers, and customers into a single dashboard with real-time alerts, predictive analytics, and collaboration tools.',
    category: 'Control Tower',
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How long does implementation typically take?',
    answer: 'Implementation timelines vary based on scope. A fleet management system for 100 vehicles may take 2-3 months, while a full supply chain control tower for a large enterprise could take 6-9 months. We deliver value in phases.',
    category: 'Timeline',
    icon: '⏱️',
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

  // Unique animated background for FAQ section (shipping labels/questions)
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

    // Create floating shipping labels
    const labels: { x: number; y: number; text: string; size: number; speedY: number; opacity: number }[] = []
    const labelTexts = ['FRAGILE', 'THIS WAY UP', 'KEEP DRY', 'HAZMAT', 'PERISHABLE', 'PRIORITY', 'RETURN']

    for (let i = 0; i < 10; i++) {
      labels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: labelTexts[Math.floor(Math.random() * labelTexts.length)],
        size: 12 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create barcode-like patterns
    const barcodes: { x: number; y: number; width: number; bars: number[] }[] = []

    for (let i = 0; i < 5; i++) {
      const bars = []
      for (let j = 0; j < 10; j++) {
        bars.push(Math.random() * 20 + 5)
      }
      barcodes.push({
        x: 200 + i * 250,
        y: 300,
        width: 100,
        bars,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw barcodes
      barcodes.forEach((barcode) => {
        let xPos = barcode.x
        barcode.bars.forEach((width) => {
          ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
          ctx.fillRect(xPos, barcode.y, width, 40)
          xPos += width + 2
        })
      })

      // Draw floating labels
      labels.forEach((label) => {
        label.y -= label.speedY

        if (label.y < 0) {
          label.y = canvas.height
          label.x = Math.random() * canvas.width
        }

        // Label outline
        ctx.strokeStyle = `rgba(255, 46, 159, ${label.opacity})`
        ctx.lineWidth = 1
        ctx.strokeRect(label.x, label.y, 80, 20)

        // Label text
        ctx.font = `${label.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${label.opacity})`
        ctx.fillText(label.text, label.x + 5, label.y + 15)
      })

      // Draw question marks
      for (let i = 0; i < 8; i++) {
        const x = 100 + i * 200 + Math.sin(time + i) * 20
        const y = 500 + Math.cos(time * 0.5 + i) * 30

        ctx.font = '24px Arial'
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillText('?', x, y)
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
            Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about logistics technology solutions 
            and supply chain optimization.
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
                  <p className="text-sm text-gray-400">Our logistics experts are ready to help</p>
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