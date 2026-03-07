'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // FinTech-themed animated background (financial data flow)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create currency symbols floating
    const currencies = ['$', '€', '£', '¥', 'د.إ', '﷼', '₿', 'Ξ']
    const currencyParticles: { x: number; y: number; symbol: string; size: number; speedY: number; opacity: number }[] = []

    for (let i = 0; i < 20; i++) {
      currencyParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: currencies[Math.floor(Math.random() * currencies.length)],
        size: 14 + Math.random() * 10,
        speedY: 0.1 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    // Create transaction flow lines
    const transactions: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 8; i++) {
      transactions.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Create candlestick chart elements
    const candles: { x: number; y: number; height: number; color: string }[] = []

    for (let i = 0; i < 30; i++) {
      candles.push({
        x: 100 + i * 30,
        y: 200 + Math.random() * 100,
        height: 20 + Math.random() * 60,
        color: Math.random() > 0.5 ? 'rgba(91, 108, 255' : 'rgba(255, 46, 159',
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw candlestick chart
      candles.forEach((candle) => {
        // Update candle positions for scrolling effect
        candle.x -= 0.5
        if (candle.x < -30) {
          candle.x = canvas.width
          candle.y = 200 + Math.random() * 100
          candle.height = 20 + Math.random() * 60
        }

        // Draw candle
        ctx.fillStyle = `${candle.color}, 0.1)`
        ctx.fillRect(candle.x, candle.y - candle.height / 2, 10, candle.height)
        
        // Draw wick
        ctx.beginPath()
        ctx.moveTo(candle.x + 5, candle.y - candle.height / 2)
        ctx.lineTo(candle.x + 5, candle.y + candle.height / 2)
        ctx.strokeStyle = `${candle.color}, 0.2)`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw transaction flows
      transactions.forEach((tx) => {
        tx.progress += tx.speed
        if (tx.progress > 1) {
          tx.progress = 0
          tx.x1 = Math.random() * canvas.width
          tx.y1 = Math.random() * canvas.height
          tx.x2 = Math.random() * canvas.width
          tx.y2 = Math.random() * canvas.height
        }

        // Draw flow line
        ctx.beginPath()
        ctx.moveTo(tx.x1, tx.y1)
        ctx.lineTo(tx.x2, tx.y2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw moving dot
        const currentX = tx.x1 + (tx.x2 - tx.x1) * tx.progress
        const currentY = tx.y1 + (tx.y2 - tx.y1) * tx.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw floating currency symbols
      currencyParticles.forEach((currency) => {
        currency.y -= currency.speedY
        if (currency.y < 0) {
          currency.y = canvas.height
          currency.x = Math.random() * canvas.width
        }

        ctx.font = `${currency.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${currency.opacity})`
        ctx.fillText(currency.symbol, currency.x, currency.y)
      })

      // Draw grid lines (like trading charts)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.3

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight pt-24">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent z-10" />
        <Image
          src="/images/solutions/fintech/hero-fintech.jpg"
          alt="FinTech Solutions Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>•</span>
                <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                <span>•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FinTech</span>
              </nav>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              <span className="text-white">FinTech</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Transform financial services with cutting-edge technology. From digital banking 
              and payment gateways to regulatory compliance and Islamic finance, we deliver 
              secure, scalable FinTech solutions for UAE financial institutions.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: 'AED 2.5B+', label: 'Transactions' },
                { value: '99.99%', label: 'Uptime' },
                { value: '15+', label: 'Financial Clients' },
                { value: 'PCI DSS', label: 'Compliant' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="large">
                Discuss Your FinTech Project
              </Button>
              <Button variant="secondary" size="large">
                View Case Studies
              </Button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-3xl opacity-30" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/solutions/fintech/hero-fintech.jpg"
                  alt="FinTech Solutions"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="w-1 h-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}