'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for CTA section (rising sales)
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

    // Create rising sales graph
    const salesData: number[] = []
    for (let i = 0; i < 50; i++) {
      salesData.push(50 + Math.random() * 100)
    }

    // Create floating revenue numbers
    const revenues: { x: number; y: number; amount: string; size: number; speedY: number; opacity: number }[] = []
    const revenueValues = ['$1M', '$5M', '$10M', '$25M', '$50M', '$100M']

    for (let i = 0; i < 10; i++) {
      revenues.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        amount: revenueValues[Math.floor(Math.random() * revenueValues.length)],
        size: 20 + Math.random() * 16,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create shopping bag icons
    const bags: { x: number; y: number; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 8; i++) {
      bags.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 24 + Math.random() * 16,
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
      salesData.push(50 + Math.random() * 100 + Math.sin(time) * 50)

      ctx.beginPath()
      ctx.moveTo(0, 400 - salesData[0])

      for (let i = 1; i < salesData.length; i++) {
        ctx.lineTo(i * 20, 400 - salesData[i])
      }

      ctx.strokeStyle = 'rgba(255, 46, 159, 0.2)'
      ctx.lineWidth = 3
      ctx.stroke()

      // Fill area under graph
      ctx.lineTo(salesData.length * 20, 400)
      ctx.lineTo(0, 400)
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
        ctx.fillStyle = `rgba(255, 46, 159, ${revenue.opacity})`
        ctx.fillText(revenue.amount, revenue.x, revenue.y)
      })

      // Draw floating shopping bags
      bags.forEach((bag) => {
        bag.y -= bag.speedY

        if (bag.y < 0) {
          bag.y = canvas.height
          bag.x = Math.random() * canvas.width
        }

        ctx.font = `${bag.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${bag.opacity})`
        ctx.fillText('🛍️', bag.x, bag.y)
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

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight z-10" />
        <Image
          src="/images/solutions/ecommerce/cta-bg.jpg"
          alt="E-commerce CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Floating E-commerce Icons */}
      <div className="absolute top-20 left-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float">🛒</div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-2000">💳</div>
      </div>
      <div className="absolute top-40 right-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-3000">📱</div>
      </div>
      <div className="absolute bottom-40 left-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-1000">📦</div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 md:p-16 rounded-3xl border border-white/10"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                <span className="text-5xl">🛍️</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Ready to Launch Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Online Store</span>?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss how our e-commerce solutions can help you reach more customers,
            increase sales, and grow your business online.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button variant="primary" size="large">
              Start Your E-commerce Journey
            </Button>
            <Button variant="secondary" size="large">
              Download E-commerce Guide
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 mb-4">Or contact us directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <Link href="mailto:ecommerce@otaksi.ae" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  ✉️
                </span>
                <span>ecommerce@otaksi.ae</span>
              </Link>
              <Link href="tel:+97141234567" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  📞
                </span>
                <span>+971 4 123 4567</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  💬
                </span>
                <span>Live Chat</span>
              </Link>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <p className="text-xs text-gray-600">
              ⚡ Free consultation | PCI compliant | Mobile optimized | 24/7 support
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}