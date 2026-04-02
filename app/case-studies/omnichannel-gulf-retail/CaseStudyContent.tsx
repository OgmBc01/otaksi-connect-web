'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function OmnichannelGulfRetailPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // Omnichannel retail themed animation - online/offline integration, customer journey
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

    // Store locations (pulsing dots)
    const stores: { x: number; y: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 8; i++) {
      stores.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.25,
      })
    }

    // Online shoppers (floating devices)
    const devices: { x: number; y: number; type: string; pulse: number; opacity: number }[] = []
    const deviceTypes = ['📱', '💻', '🖥️', '📱', '💻', '📱']
    for (let i = 0; i < 12; i++) {
      devices.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.2,
      })
    }

    // Data flow lines (connecting online to offline)
    const connections: { from: number; to: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 20; i++) {
      connections.push({
        from: Math.floor(Math.random() * devices.length),
        to: Math.floor(Math.random() * stores.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      })
    }

    // Shopping cart icons floating
    const carts: { x: number; y: number; size: number; speedY: number; opacity: number }[] = []
    for (let i = 0; i < 10; i++) {
      carts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 16,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.12 + Math.random() * 0.18,
      })
    }

    // Customer journey paths
    const paths: { x: number; y: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 8; i++) {
      paths.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw retail grid (store floor plan)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.06)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 60) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw connection lines between online and offline
      connections.forEach((conn) => {
        conn.progress += conn.speed
        if (conn.progress > 1) conn.progress = 0

        const fromDevice = devices[conn.from]
        const toStore = stores[conn.to]

        if (fromDevice && toStore) {
          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromDevice.x, fromDevice.y)
          ctx.lineTo(toStore.x, toStore.y)
          ctx.strokeStyle = 'rgba(255, 46, 159, 0.15)'
          ctx.lineWidth = 1.2
          ctx.stroke()

          // Draw data packet (shopping data)
          const currentX = fromDevice.x + (toStore.x - fromDevice.x) * conn.progress
          const currentY = fromDevice.y + (toStore.y - fromDevice.y) * conn.progress

          ctx.beginPath()
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
          gradient.addColorStop(0, 'rgba(91, 108, 255, 0.4)')
          gradient.addColorStop(0.7, 'rgba(255, 46, 159, 0.2)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw store locations
      stores.forEach((store) => {
        store.pulse += 0.02
        const pulseSize = 10 + Math.sin(store.pulse) * 4

        // Store building icon
        ctx.fillStyle = `rgba(91, 108, 255, ${store.opacity})`
        ctx.fillRect(store.x - 10, store.y - 10, 20, 15)
        
        // Roof
        ctx.beginPath()
        ctx.moveTo(store.x - 12, store.y - 10)
        ctx.lineTo(store.x, store.y - 18)
        ctx.lineTo(store.x + 12, store.y - 10)
        ctx.fillStyle = `rgba(255, 46, 159, ${store.opacity})`
        ctx.fill()

        // Pulsing glow
        ctx.beginPath()
        ctx.arc(store.x, store.y - 5, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${store.opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw online shoppers (devices)
      devices.forEach((device) => {
        device.pulse += 0.03
        const yOffset = Math.sin(device.pulse) * 8

        ctx.font = '24px Arial'
        ctx.fillStyle = `rgba(255, 46, 159, ${device.opacity})`
        ctx.fillText(device.type, device.x, device.y + yOffset)

        // Connection indicator
        ctx.beginPath()
        ctx.arc(device.x + 15, device.y - 15 + yOffset, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, ${device.opacity})`
        ctx.fill()
      })

      // Draw floating shopping carts
      carts.forEach((cart) => {
        cart.y -= cart.speedY
        if (cart.y < 0) {
          cart.y = canvas.height
          cart.x = Math.random() * canvas.width
        }

        ctx.font = `${cart.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${cart.opacity})`
        ctx.fillText('🛒', cart.x, cart.y)
      })

      // Draw customer journey paths
      paths.forEach((path) => {
        path.progress += path.speed
        if (path.progress > 1) path.progress = 0

        const angle = path.progress * Math.PI * 2
        const radius = 80
        const x = path.x + Math.cos(angle + time) * radius
        const y = path.y + Math.sin(angle + time) * radius

        // Journey dot
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 46, 159, 0.3)'
        ctx.fill()

        // Path circle
        ctx.beginPath()
        ctx.arc(path.x, path.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const metrics = [
    { value: '50+', label: 'Physical Stores' },
    { value: '150%', label: 'Online Growth' },
    { value: '40%', label: 'Omnichannel Sales' },
    { value: '4.8★', label: 'App Rating' },
  ]

  const processSteps = [
    {
      phase: 'Discovery',
      title: 'Channel Audit',
      description: 'Analyzed online and offline customer journeys across 50+ stores',
      icon: '🔍',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Integration',
      title: 'Unified Commerce',
      description: 'Integrated POS, e-commerce, and inventory systems',
      icon: '🔄',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
    {
      phase: 'Development',
      title: 'Mobile App',
      description: 'Built mobile app with click & collect and loyalty features',
      icon: '📱',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Analytics',
      title: 'Customer 360',
      description: 'Unified customer profiles across all channels',
      icon: '📊',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
  ]

  const technologies = [
    { name: 'React Native', level: 95, description: 'Mobile app' },
    { name: 'Node.js', level: 92, description: 'API gateway' },
    { name: 'PostgreSQL', level: 90, description: 'Customer data' },
    { name: 'Redis', level: 88, description: 'Session management' },
    { name: 'Elasticsearch', level: 85, description: 'Product search' },
    { name: 'Stripe', level: 90, description: 'Payments' },
    { name: 'Segment', level: 88, description: 'Customer analytics' },
    { name: 'AWS', level: 92, description: 'Cloud infrastructure' },
  ]

  return (
    <main className="bg-midnight">
      {/* Floating Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* Hero Section - Clean Header */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Gradient Orbs */}
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <nav className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>•</span>
              <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              <span>•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Omnichannel Retail</span>
            </nav>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            <span className="text-white">Omnichannel</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Retail Platform</span>
          </motion.h1>

          {/* Client & Industry */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-8"
          >
            Gulf Retail Group • E-commerce / Retail
          </motion.p>

          {/* Quick Stats - Transparent pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">50+ Stores</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">150% Online Growth</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">Click & Collect</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Challenge</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Gulf Retail Group operated 50+ physical stores and an e-commerce site as separate silos.
                  Inventory wasn't synchronized, customers couldn't buy online and pickup in-store, and loyalty
                  programs didn't work across channels.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Separate inventory systems - online vs. store stock',
                    'No click & collect - 30% of customers abandoned purchase',
                    'Fragmented customer data across 5 different systems',
                    "Loyalty points couldn't be used across channels",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-30 blur-2xl" />
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <Image
                    src="/images/case-studies/omnichannel-gulf-retail/challenge.jpg"
                    alt="Omnichannel retail challenge"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:order-2"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solution</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  We built a unified omnichannel platform connecting all 50+ stores with e-commerce, providing
                  real-time inventory, unified customer profiles, and seamless cross-channel experiences.
                </p>

                <div className="space-y-4">
                  {[
                    'Real-time inventory sync between all stores and online',
                    'Click & collect with 2-hour pickup from any store',
                    'Unified customer profiles with cross-channel purchase history',
                    'Universal loyalty program - earn and burn anywhere',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:order-1 relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-3xl opacity-30 blur-2xl" />
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <Image
                    src="/images/case-studies/omnichannel-gulf-retail/solution.jpg"
                    alt="Omnichannel retail solution"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline - Individual Blurred Glass Cards */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
              Implementation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              How we unified online and offline retail in 8 months
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseEnter={() => setActiveProcess(index)}
              >
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                      activeProcess === index ? 'opacity-30' : ''
                    }`}
                    style={{ background: `linear-gradient(135deg, ${step.gradient.includes('FF2E9F') ? '#FF2E9F' : '#5B6CFF'}, ${step.gradient.includes('5B6CFF') ? '#5B6CFF' : '#FF2E9F'})` }}
                  />
                  
                  {/* Glass Card - Blurred */}
                  <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 transition-all duration-300">
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <div className={`text-sm font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                      {step.phase}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Omnichannel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '📱', title: 'Mobile App', tech: 'React Native' },
                { icon: '🛒', title: 'E-commerce', tech: 'Next.js' },
                { icon: '🏪', title: 'POS System', tech: 'Store Integration' },
                { icon: '📊', title: 'Customer 360', tech: 'Segment, BigQuery' },
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Stack</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The technologies powering Gulf Retail Group's omnichannel platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                  <div className="relative backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 p-4 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-medium text-white">{tech.name}</span>
                        <p className="text-xs text-gray-500">{tech.description}</p>
                      </div>
                      <span className="text-sm font-bold gradient-text">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Impact</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Measurable results from omnichannel transformation
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                  <div className="relative backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 text-center transition-all">
                    <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block backdrop-blur-lg bg-white/5 px-8 py-4 rounded-full border border-white/10">
                <p className="text-lg font-medium">
                  <span className="gradient-text">35% higher basket value</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">2.5x customer lifetime value</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">50% faster fulfillment</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            <div className="relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 group-hover:border-white/20 p-12 text-center transition-all">
              <div className="text-6xl mb-6 text-gray-600">"</div>
              <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                "The omnichannel platform has completely transformed how we serve our customers. They can now
                shop seamlessly across our app, website, and physical stores. Click & collect has been a game-changer,
                and having unified customer data has enabled personalized marketing that actually works. Our
                online sales have grown 150% since launch."
              </p>
              <div>
                <p className="font-bold text-white text-lg">Layla Al Hashimi</p>
                <p className="text-sm text-gray-500">Chief Digital Officer, Gulf Retail Group</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Case Studies - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Case Studies</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Multi-vendor Marketplace', client: 'Gulf Mart', slug: 'multi-vendor-marketplace' },
                { title: 'Digital Banking Platform', client: 'Gulf Financial', slug: 'digital-banking-gulf-financial' },
              ].map((related, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/case-studies/${related.slug}`} className="group block relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                    <div className="relative backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 transition-all">
                      <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all duration-300">{related.title}</h3>
                      <p className="text-sm text-gray-500">{related.client}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blurred Glass Card */}
      <section className="relative py-16 md:py-20 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        {/* Restrict background orb to not overflow viewport */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[60vw] max-h-[600px] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 md:p-16 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
              Ready to Unify Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Retail Channels</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how our omnichannel solutions can help you deliver seamless customer experiences.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="large">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}