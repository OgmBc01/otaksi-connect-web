'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // E-commerce-themed animated background (shopping cart/transactions)
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

    // Create floating product cards
    const products: { x: number; y: number; width: number; height: number; speed: number; color: string }[] = []

    for (let i = 0; i < 10; i++) {
      products.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 40 + Math.random() * 30,
        height: 50 + Math.random() * 20,
        speed: 0.3 + Math.random() * 0.5,
        color: i % 2 === 0 ? 'rgba(91, 108, 255' : 'rgba(255, 46, 159',
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

    // Create price tags
    const prices: { x: number; y: number; price: string; size: number; speedY: number; opacity: number }[] = []
    const priceValues = ['$49.99', '$129.99', '$19.99', '$299.99', '$79.99', '$999.99']

    for (let i = 0; i < 12; i++) {
      prices.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        price: priceValues[Math.floor(Math.random() * priceValues.length)],
        size: 12 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.1,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

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

        // Draw moving payment dot
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

      // Draw floating product cards
      products.forEach((product) => {
        product.x += product.speed

        if (product.x > canvas.width + 100) {
          product.x = -100
          product.y = Math.random() * canvas.height
        }

        // Product card
        ctx.fillStyle = `${product.color}, 0.1)`
        ctx.fillRect(product.x, product.y, product.width, product.height)

        // Product image placeholder
        ctx.fillStyle = `${product.color}, 0.2)`
        ctx.fillRect(product.x + 5, product.y + 5, product.width - 10, 15)

        // Product title line
        ctx.fillStyle = `${product.color}, 0.15)`
        ctx.fillRect(product.x + 5, product.y + 25, product.width - 20, 5)
        ctx.fillRect(product.x + 5, product.y + 35, product.width - 30, 5)
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

      // Draw floating price tags
      prices.forEach((price) => {
        price.y -= price.speedY

        if (price.y < 0) {
          price.y = canvas.height
          price.x = Math.random() * canvas.width
        }

        ctx.font = `${price.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${price.opacity})`
        ctx.fillText(price.price, price.x, price.y)
      })

      // Draw grid (like product grid)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.05)'
      ctx.lineWidth = 0.3

      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 100) {
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
          src="/images/solutions/ecommerce/hero-ecommerce.jpg"
          alt="E-commerce Solutions Background"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">E-commerce</span>
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
              <span className="text-white">E-commerce</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solutions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Launch and scale your online business with cutting-edge e-commerce technology. 
              From custom online stores and marketplace platforms to payment integration 
              and mobile commerce, we deliver solutions that drive sales and growth.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '1M+', label: 'Transactions/Month' },
                { value: '50+', label: 'E-commerce Clients' },
                { value: '99.99%', label: 'Uptime' },
                { value: '40%', label: 'Conversion Lift' },
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
                Launch Your Store
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
                  src="/images/solutions/ecommerce/hero-ecommerce.jpg"
                  alt="E-commerce Solutions"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">🛒</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">💳</span>
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