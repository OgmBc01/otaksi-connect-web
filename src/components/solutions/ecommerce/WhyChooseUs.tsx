'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'E-commerce Domain Expertise',
    description: 'Deep understanding of online retail, consumer behavior, and digital commerce trends in UAE.',
    icon: '🛍️',
    image: '/images/solutions/ecommerce/why-expertise.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '10+ years experience'
  },
  {
    title: 'Conversion-Focused Design',
    description: 'User experiences designed to maximize conversions and reduce cart abandonment.',
    icon: '📈',
    image: '/images/solutions/ecommerce/why-conversion.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '40% avg. conversion lift'
  },
  {
    title: 'Payment Integration Experts',
    description: 'Seamless integration with all major payment gateways and regional payment methods.',
    icon: '💳',
    image: '/images/solutions/ecommerce/why-payment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '50+ payment gateways'
  },
  {
    title: 'Scalable Architecture',
    description: 'Platforms that handle traffic spikes during sales events and peak seasons.',
    icon: '📊',
    image: '/images/solutions/ecommerce/why-scalable.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '1M+ transactions/day'
  },
  {
    title: 'Mobile-First Approach',
    description: 'Optimized for the growing mobile commerce market in UAE and beyond.',
    icon: '📱',
    image: '/images/solutions/ecommerce/why-mobile.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '65% mobile traffic'
  },
  {
    title: 'Proven Track Record',
    description: 'Successful e-commerce implementations for leading retail brands in UAE.',
    icon: '🏆',
    image: '/images/solutions/ecommerce/why-proven.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '50+ e-commerce clients'
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Why Choose Us section (trust badges)
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

    // Create floating trust badges
    const badges = ['SSL', 'PCI', '3DS', 'GDPR', 'ISO', 'VISA', 'MC', 'AMEX']
    const floatingBadges: { x: number; y: number; text: string; size: number; speedX: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 12; i++) {
      floatingBadges.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: badges[Math.floor(Math.random() * badges.length)],
        size: 14 + Math.random() * 8,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create shopping cart outlines
    const carts: { x: number; y: number; size: number; pulse: number }[] = []

    for (let i = 0; i < 5; i++) {
      carts.push({
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

      // Draw shopping carts
      carts.forEach((cart) => {
        cart.pulse += 0.02
        const pulseSize = cart.size + Math.sin(cart.pulse) * 5

        ctx.font = `${pulseSize}px Arial`
        ctx.fillStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.fillText('🛒', cart.x, cart.y)
      })

      // Draw floating badges
      floatingBadges.forEach((badge) => {
        badge.x += badge.speedX
        badge.y += badge.speedY

        if (badge.x < 0 || badge.x > canvas.width) badge.speedX *= -1
        if (badge.y < 0 || badge.y > canvas.height) badge.speedY *= -1

        ctx.font = `${badge.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${badge.opacity})`
        ctx.fillText(badge.text, badge.x, badge.y)
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
      
      {/* Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91, 108, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Data Stream Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E9F] to-transparent opacity-30" />

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
            Why Choose Us for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">E-commerce</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine e-commerce expertise with innovative technology to deliver 
            online stores that drive sales and growth.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: reason.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: reason.gradient }}
                      >
                        <span className="text-2xl">{reason.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Stats Badge */}
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                      style={{ 
                        background: `${reason.gradient}`, 
                        opacity: 0.9 
                      }}
                    >
                      {reason.stats}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">Trusted by leading retail brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Noon', 'Namshi', 'Majid Al Futtaim', 'Al-Futtaim', 'Carrefour', 'Amazon.ae'].map((company, index) => (
              <span key={index} className="text-sm text-gray-400 font-medium">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}