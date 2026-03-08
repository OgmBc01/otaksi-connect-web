'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const approaches = [
  {
    title: 'Custom Online Stores',
    description: 'Tailored e-commerce platforms designed to showcase your products and deliver exceptional shopping experiences.',
    icon: '🛍️',
    image: '/images/solutions/ecommerce/approach-custom.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Product Catalog', 'Shopping Cart', 'Checkout Optimization', 'Customer Accounts']
  },
  {
    title: 'Marketplace Platforms',
    description: 'Multi-vendor marketplace solutions enabling third-party sellers and scalable commerce operations.',
    icon: '🏪',
    image: '/images/solutions/ecommerce/approach-marketplace.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Vendor Management', 'Commission Tracking', 'Seller Dashboards', 'Review Systems']
  },
  {
    title: 'Payment Integration',
    description: 'Secure payment processing with support for multiple gateways, wallets, and buy-now-pay-later options.',
    icon: '💳',
    image: '/images/solutions/ecommerce/approach-payment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Multiple Gateways', 'Digital Wallets', 'Recurring Billing', 'Fraud Protection']
  },
  {
    title: 'Mobile Commerce',
    description: 'Native and progressive web apps that deliver seamless shopping experiences on any device.',
    icon: '📱',
    image: '/images/solutions/ecommerce/approach-mobile.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Mobile Apps', 'PWA', 'Push Notifications', 'Mobile Payments']
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Approach section (shopping cart/product grid)
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

    // Create product grid animation
    const gridItems: { x: number; y: number; size: number; pulse: number }[] = []

    for (let i = 0; i < 20; i++) {
      gridItems.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 30,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create floating shopping cart icons
    const carts: { x: number; y: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      carts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 15,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw product grid
      gridItems.forEach((item) => {
        item.pulse += 0.02
        const pulseSize = item.size + Math.sin(item.pulse) * 5

        // Product card outline
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.strokeRect(item.x, item.y, pulseSize, pulseSize * 1.2)

        // Product image placeholder
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillRect(item.x + 5, item.y + 5, pulseSize - 10, 15)

        // Product title line
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(item.x + 5, item.y + 25, pulseSize - 20, 3)
        ctx.fillRect(item.x + 5, item.y + 32, pulseSize - 30, 3)
      })

      // Draw floating shopping carts
      carts.forEach((cart) => {
        cart.y -= cart.speedY

        if (cart.y < 0) {
          cart.y = canvas.height
          cart.x = Math.random() * canvas.width
        }

        ctx.font = `${cart.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${cart.opacity})`
        ctx.fillText('🛒', cart.x, cart.y)
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
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine e-commerce expertise with innovative technology to create 
            engaging shopping experiences that drive conversions.
          </p>
        </motion.div>

        {/* Approach Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: approach.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={approach.image}
                      alt={approach.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: approach.gradient }}
                      >
                        <span className="text-xl">{approach.icon}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{approach.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {approach.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {approach.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span 
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ background: approach.gradient }}
                          />
                          {feature}
                        </div>
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