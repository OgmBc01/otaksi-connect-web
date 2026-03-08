'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const solutions = [
  {
    title: 'Custom E-commerce Platform',
    description: 'Tailored online stores with advanced product management, shopping cart, and checkout optimization.',
    icon: '🛍️',
    image: '/images/solutions/ecommerce/solution-custom.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Product Catalog', 'Shopping Cart', 'Checkout', 'Order Management'],
    benefits: ['40% higher conversion', 'SEO optimized', 'Mobile responsive']
  },
  {
    title: 'Multi-vendor Marketplace',
    description: 'Platform for multiple sellers with commission management, vendor dashboards, and dispute resolution.',
    icon: '🏪',
    image: '/images/solutions/ecommerce/solution-marketplace.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Vendor Onboarding', 'Commission Tracking', 'Seller Analytics', 'Review System'],
    benefits: ['Scale faster', 'Automated payouts', 'Vendor satisfaction']
  },
  {
    title: 'Payment Gateway Integration',
    description: 'Secure payment processing with support for cards, digital wallets, and buy-now-pay-later options.',
    icon: '💳',
    image: '/images/solutions/ecommerce/solution-payment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Multiple Gateways', 'Digital Wallets', 'Subscription Billing', 'Fraud Detection'],
    benefits: ['98% success rate', 'PCI compliant', 'Global payments']
  },
  {
    title: 'Mobile Commerce Apps',
    description: 'Native iOS and Android apps that deliver seamless shopping experiences on mobile devices.',
    icon: '📱',
    image: '/images/solutions/ecommerce/solution-mobile.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['iOS & Android', 'Push Notifications', 'Mobile Payments', 'Offline Mode'],
    benefits: ['65% mobile revenue', 'Higher engagement', 'App store presence']
  },
  {
    title: 'Inventory Management',
    description: 'Real-time inventory tracking across multiple warehouses and sales channels.',
    icon: '📦',
    image: '/images/solutions/ecommerce/solution-inventory.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Stock Tracking', 'Multi-warehouse', 'Low Stock Alerts', 'Inventory Forecasting'],
    benefits: ['Stockout prevention', '30% less inventory', 'Multi-channel sync']
  },
  {
    title: 'E-commerce Analytics',
    description: 'Data-driven insights into customer behavior, sales trends, and marketing performance.',
    icon: '📊',
    image: '/images/solutions/ecommerce/solution-analytics.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Sales Dashboards', 'Customer Analytics', 'Conversion Funnels', 'Cohort Analysis'],
    benefits: ['Data-driven decisions', 'ROI tracking', 'Customer insights']
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Solutions section (sales dashboard)
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

    // Create sales graph
    const salesData: number[] = []
    for (let i = 0; i < 50; i++) {
      salesData.push(50 + Math.random() * 100)
    }

    // Create floating revenue numbers
    const revenues: { x: number; y: number; amount: string; size: number; speedY: number; opacity: number }[] = []
    const revenueValues = ['$1.2M', '$850K', '$2.1M', '$500K', '$3.4M', '$950K']

    for (let i = 0; i < 10; i++) {
      revenues.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        amount: revenueValues[Math.floor(Math.random() * revenueValues.length)],
        size: 14 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update and draw sales graph
      salesData.shift()
      salesData.push(50 + Math.random() * 100 + Math.sin(time) * 30)

      ctx.beginPath()
      ctx.moveTo(0, 300 - salesData[0])

      for (let i = 1; i < salesData.length; i++) {
        ctx.lineTo(i * 20, 300 - salesData[i])
      }

      ctx.strokeStyle = 'rgba(255, 46, 159, 0.2)'
      ctx.lineWidth = 3
      ctx.stroke()

      // Fill area under graph
      ctx.lineTo(salesData.length * 20, 300)
      ctx.lineTo(0, 300)
      ctx.fillStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.fill()

      // Draw floating revenue numbers
      revenues.forEach((revenue) => {
        revenue.y -= revenue.speedY

        if (revenue.y < 0) {
          revenue.y = canvas.height
          revenue.x = Math.random() * canvas.width
        }

        ctx.font = `${revenue.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${revenue.opacity})`
        ctx.fillText(revenue.amount, revenue.x, revenue.y)
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
            E-commerce{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to help you launch, scale, 
            and optimize your online business.
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