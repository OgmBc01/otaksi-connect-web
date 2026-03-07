'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Digital Banking Platform',
    description: 'Complete digital banking solutions for retail and corporate customers with seamless omnichannel experiences.',
    icon: '🏦',
    image: '/images/solutions/fintech/solution-digital-banking.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Mobile Banking', 'Internet Banking', 'Account Management', 'Fund Transfers'],
    benefits: ['500K+ users', '99.99% uptime', 'Real-time processing']
  },
  {
    title: 'Payment Gateway',
    description: 'Secure, scalable payment processing solutions supporting multiple payment methods and currencies.',
    icon: '💳',
    image: '/images/solutions/fintech/solution-payment.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Card Payments', 'Digital Wallets', 'Recurring Billing', 'Multi-currency'],
    benefits: ['PCI DSS Level 1', '100+ currencies', '3D Secure']
  },
  {
    title: 'RegTech & Compliance',
    description: 'Automated regulatory compliance solutions for AML, KYC, and fraud detection.',
    icon: '⚖️',
    image: '/images/solutions/fintech/solution-regtech.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['AML Screening', 'KYC Verification', 'Transaction Monitoring', 'Sanctions Screening'],
    benefits: ['Real-time screening', '98% accuracy', 'Audit ready']
  },
  {
    title: 'Islamic Banking System',
    description: 'Sharia-compliant banking solutions following Islamic finance principles and standards.',
    icon: '🕌',
    image: '/images/solutions/fintech/solution-islamic.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Profit Calculation', 'Murabaha', 'Ijarah', 'Takaful'],
    benefits: ['AAOIFI compliant', 'Sharia board approved', 'Islamic windows']
  },
  {
    title: 'Wealth Management',
    description: 'Digital wealth management platforms for investment advisory, portfolio management, and trading.',
    icon: '📈',
    image: '/images/solutions/fintech/solution-wealth.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Portfolio Management', 'Robo-advisory', 'Investment Analytics', 'Trading Platform'],
    benefits: ['Real-time valuations', 'Risk profiling', 'Regulatory reporting']
  },
  {
    title: 'Open Banking APIs',
    description: 'Secure API platforms enabling third-party integration and compliance with open banking regulations.',
    icon: '🔌',
    image: '/images/solutions/fintech/solution-openbanking.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Account Information', 'Payment Initiation', 'Consent Management', 'Developer Portal'],
    benefits: ['PSD2 compliant', 'OAuth2/OIDC', 'API analytics']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (financial dashboard)
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

    // Create financial metrics ticker
    const metrics = [
      { label: 'BTC', value: 43250, change: '+2.4%' },
      { label: 'ETH', value: 2250, change: '+1.8%' },
      { label: 'S&P', value: 4780, change: '-0.3%' },
      { label: 'AED/USD', value: 3.67, change: '0.0%' },
    ]

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw scrolling ticker
      metrics.forEach((metric, i) => {
        const x = (time * 100 + i * 200) % (canvas.width + 200) - 200
        
        ctx.font = '14px monospace'
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fillText(`${metric.label} ${metric.value} ${metric.change}`, x, 50)
      })

      // Draw market depth visualization
      for (let i = 0; i < 20; i++) {
        const x = i * 60 + (time * 20) % 60
        const height = 30 + Math.sin(i * 0.5 + time) * 20
        
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillRect(x, canvas.height - 100 - height, 20, height)
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
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(91, 108, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
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
            FinTech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive financial technology solutions designed for the unique needs 
            of UAE banks, fintechs, and financial institutions.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: solution.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: solution.gradient }}
                      >
                        <span className="text-xl">{solution.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: solution.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {solution.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}