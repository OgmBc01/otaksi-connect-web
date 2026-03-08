'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'Which e-commerce platform is best for my business?',
    answer: 'The best platform depends on your business size, budget, and requirements. Shopify Plus is great for mid-to-large businesses wanting quick setup. Magento/Adobe Commerce offers maximum flexibility for complex requirements. WooCommerce is ideal for WordPress-based sites. We help you choose the right platform based on your specific needs.',
    category: 'Platform',
    icon: '🛍️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you handle payment gateway integration?',
    answer: 'We integrate with all major payment gateways including Stripe, PayPal, Checkout.com, and local UAE gateways. Our solutions support multiple payment methods, digital wallets, buy-now-pay-later options, and recurring billing. All integrations are PCI compliant and secure.',
    category: 'Payments',
    icon: '💳',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How long does it take to launch an e-commerce store?',
    answer: 'Timelines vary based on complexity. A basic store on Shopify or WooCommerce can launch in 4-6 weeks. A custom Magento or custom-built solution typically takes 3-6 months. Marketplace platforms with multi-vendor functionality may take 4-8 months.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Can you integrate with my existing ERP or inventory system?',
    answer: 'Yes, we specialize in integrating e-commerce platforms with ERP systems (SAP, Oracle, Microsoft Dynamics), inventory management, and accounting software. Real-time synchronization ensures accurate stock levels across all channels.',
    category: 'Integration',
    icon: '🔌',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you optimize for mobile commerce?',
    answer: 'We build mobile-first experiences with responsive design, touch-friendly interfaces, and mobile-specific features. For higher engagement, we develop native iOS and Android apps or progressive web apps (PWAs) that deliver app-like experiences.',
    category: 'Mobile',
    icon: '📱',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What about SEO and marketing features?',
    answer: 'Our e-commerce solutions include built-in SEO features like customizable meta tags, clean URLs, sitemaps, and schema markup. We also integrate with marketing tools for email campaigns, retargeting, social media, and analytics.',
    category: 'Marketing',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you handle high traffic during sales events?',
    answer: 'We build scalable architecture using cloud infrastructure (AWS/Azure) that auto-scales during traffic spikes. Load testing, caching strategies, and CDN integration ensure your store stays up during Black Friday, White Friday, and peak seasons.',
    category: 'Scalability',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What ongoing support do you provide?',
    answer: 'We offer comprehensive support including 24/7 monitoring, security patches, platform updates, performance optimization, and conversion rate optimization. Our team ensures your store runs smoothly and continues to improve.',
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

  // Unique animated background for FAQ section (customer questions)
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

    // Create floating customer questions
    const questions: { x: number; y: number; text: string; size: number; speedY: number; opacity: number }[] = []
    const questionTexts = ['Size?', 'Delivery?', 'Returns?', 'Price?', 'Stock?', 'Warranty?']

    for (let i = 0; i < 15; i++) {
      questions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: questionTexts[Math.floor(Math.random() * questionTexts.length)],
        size: 14 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create chat bubbles
    const bubbles: { x: number; y: number; size: number; pulse: number }[] = []

    for (let i = 0; i < 5; i++) {
      bubbles.push({
        x: 200 + i * 300,
        y: 300,
        size: 40,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw chat bubbles
      bubbles.forEach((bubble) => {
        bubble.pulse += 0.02
        const pulseSize = bubble.size + Math.sin(bubble.pulse) * 5

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Question mark inside bubble
        ctx.font = '20px Arial'
        ctx.fillStyle = 'rgba(255, 46, 159, 0.15)'
        ctx.fillText('?', bubble.x - 5, bubble.y + 7)
      })

      // Draw floating questions
      questions.forEach((q) => {
        q.y -= q.speedY

        if (q.y < 0) {
          q.y = canvas.height
          q.x = Math.random() * canvas.width
        }

        ctx.font = `${q.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${q.opacity})`
        ctx.fillText(q.text, q.x, q.y)
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
            E-commerce{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about e-commerce solutions and 
            launching your online store.
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
                  <p className="text-sm text-gray-400">Our e-commerce experts are ready to help</p>
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