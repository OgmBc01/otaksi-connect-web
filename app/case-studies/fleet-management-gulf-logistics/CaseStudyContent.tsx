'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function FleetManagementGulfLogisticsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // Fleet management themed animation - moving vehicles, routes, GPS tracking
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

    // Moving vehicles (represented by dots with trails)
    const vehicles: { x: number; y: number; speed: number; direction: number; trail: { x: number; y: number }[] }[] = []
    for (let i = 0; i < 12; i++) {
      vehicles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        direction: Math.random() * Math.PI * 2,
        trail: [],
      })
    }

    // Route lines (road network)
    const routes: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []
    for (let i = 0; i < 15; i++) {
      routes.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: 0.12 + Math.random() * 0.15,
      })
    }

    // GPS satellites (scanning dots)
    const satellites: { x: number; y: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 6; i++) {
      satellites.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.25,
      })
    }

    // Delivery locations (pulsing markers)
    const locations: { x: number; y: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 8; i++) {
      locations.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.18 + Math.random() * 0.22,
      })
    }

    // Fuel efficiency data (floating numbers)
    const efficiency: { x: number; y: number; value: string; speedY: number; opacity: number }[] = []
    const values = ['8.2 L/100km', '6.5 L/100km', '7.1 L/100km', '5.9 L/100km', '9.3 L/100km']
    for (let i = 0; i < 10; i++) {
      efficiency.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: values[Math.floor(Math.random() * values.length)],
        speedY: 0.1 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.15,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw road network grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.06)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < canvas.width; i += 70) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 70) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw route lines
      routes.forEach((route) => {
        ctx.beginPath()
        ctx.moveTo(route.x1, route.y1)
        ctx.lineTo(route.x2, route.y2)
        ctx.strokeStyle = `rgba(255, 46, 159, ${route.opacity})`
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Dashed line effect for highways
        ctx.strokeStyle = `rgba(91, 108, 255, ${route.opacity * 0.5})`
        ctx.setLineDash([10, 15])
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Update and draw vehicles
      vehicles.forEach((vehicle) => {
        // Store trail position
        vehicle.trail.push({ x: vehicle.x, y: vehicle.y })
        if (vehicle.trail.length > 10) vehicle.trail.shift()

        // Move vehicle
        vehicle.x += Math.cos(vehicle.direction) * vehicle.speed
        vehicle.y += Math.sin(vehicle.direction) * vehicle.speed

        // Bounce off edges
        if (vehicle.x < 0 || vehicle.x > canvas.width) {
          vehicle.direction = Math.PI - vehicle.direction
          vehicle.x = Math.max(0, Math.min(canvas.width, vehicle.x))
        }
        if (vehicle.y < 0 || vehicle.y > canvas.height) {
          vehicle.direction = -vehicle.direction
          vehicle.y = Math.max(0, Math.min(canvas.height, vehicle.y))
        }

        // Draw trail
        vehicle.trail.forEach((pos, index) => {
          const opacity = (index / vehicle.trail.length) * 0.3
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91, 108, 255, ${opacity})`
          ctx.fill()
        })

        // Draw vehicle
        ctx.beginPath()
        ctx.arc(vehicle.x, vehicle.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#FF2E9F'
        ctx.fill()
        
        // Direction indicator
        ctx.beginPath()
        ctx.moveTo(vehicle.x, vehicle.y)
        ctx.lineTo(
          vehicle.x + Math.cos(vehicle.direction) * 12,
          vehicle.y + Math.sin(vehicle.direction) * 12
        )
        ctx.strokeStyle = '#5B6CFF'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw GPS satellites
      satellites.forEach((sat) => {
        sat.pulse += 0.02
        const pulseSize = 15 + Math.sin(sat.pulse) * 8

        ctx.beginPath()
        ctx.arc(sat.x, sat.y, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91, 108, 255, ${sat.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Scanning lines
        ctx.beginPath()
        ctx.moveTo(sat.x - 25, sat.y)
        ctx.lineTo(sat.x + 25, sat.y)
        ctx.strokeStyle = `rgba(255, 46, 159, ${sat.opacity * 0.5})`
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(sat.x, sat.y - 25)
        ctx.lineTo(sat.x, sat.y + 25)
        ctx.stroke()
      })

      // Draw delivery locations (map pins)
      locations.forEach((loc) => {
        loc.pulse += 0.03
        const pulseY = Math.sin(loc.pulse) * 8

        // Pin body
        ctx.beginPath()
        ctx.moveTo(loc.x, loc.y - 15 + pulseY)
        ctx.lineTo(loc.x - 8, loc.y + pulseY)
        ctx.lineTo(loc.x + 8, loc.y + pulseY)
        ctx.closePath()
        ctx.fillStyle = `rgba(91, 108, 255, ${loc.opacity})`
        ctx.fill()

        // Pin head
        ctx.beginPath()
        ctx.arc(loc.x, loc.y - 15 + pulseY, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 46, 159, ${loc.opacity})`
        ctx.fill()
      })

      // Draw floating fuel efficiency data
      efficiency.forEach((eff) => {
        eff.y -= eff.speedY
        if (eff.y < 0) {
          eff.y = canvas.height
          eff.x = Math.random() * canvas.width
        }

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(91, 108, 255, ${eff.opacity})`
        ctx.fillText(eff.value, eff.x, eff.y)
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
    { value: '30%', label: 'Fuel Savings' },
    { value: '1,000+', label: 'Vehicles Managed' },
    { value: '25%', label: 'Efficiency Gain' },
    { value: '99.9%', label: 'Tracking Accuracy' },
  ]

  const processSteps = [
    {
      phase: 'Discovery',
      title: 'Fleet Audit',
      description: 'Analyzed 1,000+ vehicles across UAE operations',
      icon: '🔍',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Installation',
      title: 'GPS Deployment',
      description: 'Installed GPS trackers and IoT sensors in all vehicles',
      icon: '📡',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
    {
      phase: 'Development',
      title: 'Platform Build',
      description: 'Built real-time tracking and route optimization platform',
      icon: '⚙️',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Optimization',
      title: 'AI Routing',
      description: 'ML algorithms for dynamic route optimization',
      icon: '🧠',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
  ]

  const technologies = [
    { name: 'GPS Tracking', level: 98, description: 'Real-time location' },
    { name: 'IoT Sensors', level: 95, description: 'Engine diagnostics' },
    { name: 'React', level: 92, description: 'Fleet dashboard' },
    { name: 'Node.js', level: 90, description: 'Tracking API' },
    { name: 'PostgreSQL', level: 88, description: 'Trip data' },
    { name: 'Redis', level: 85, description: 'Real-time caching' },
    { name: 'TensorFlow', level: 82, description: 'Route optimization' },
    { name: 'Grafana', level: 88, description: 'Analytics dashboard' },
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Fleet Management</span>
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
                <span className="text-5xl">🚛</span>
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
            <span className="text-white">Fleet Management</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">System</span>
          </motion.h1>

          {/* Client & Industry */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-8"
          >
            Gulf Logistics • Logistics & Supply Chain
          </motion.p>

          {/* Quick Stats - Transparent pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">1,000+ Vehicles</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">30% Fuel Savings</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">Real-time Tracking</span>
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
                  Gulf Logistics operated a fleet of 1,000+ vehicles with no real-time visibility. 
                  Fuel costs were spiraling, routes were inefficient, and customer delivery estimates were unreliable.
                </p>
                
                <div className="space-y-4">
                  {[
                    'No real-time tracking - estimated delivery times off by hours',
                    'AED 50M+ annual fuel costs with 15% waste from inefficient routing',
                    'Unauthorized vehicle use and harsh driving impacting maintenance',
                    'Manual dispatch leading to 30% empty return trips',
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
                    src="/images/case-studies/fleet-management-gulf-logistics/challenge.jpg"
                    alt="Fleet management challenge"
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
                  We deployed a comprehensive fleet management platform with GPS tracking, IoT sensors,
                  and AI-powered route optimization that transformed operations.
                </p>

                <div className="space-y-4">
                  {[
                    'Real-time GPS tracking with 5-second updates',
                    'IoT sensors monitoring fuel consumption, engine health, and driver behavior',
                    'AI route optimization reducing empty miles by 40%',
                    'Automated dispatch and dynamic re-routing based on traffic',
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
                    src="/images/case-studies/fleet-management-gulf-logistics/solution.jpg"
                    alt="Fleet management solution"
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
              How we deployed the fleet management system across 1,000+ vehicles in 5 months
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
                Fleet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '📡', title: 'Tracking Layer', tech: 'GPS, IoT Sensors' },
                { icon: '⚡', title: 'Real-time Engine', tech: 'Node.js, Socket.io' },
                { icon: '🧠', title: 'Route Optimizer', tech: 'AI/ML Algorithms' },
                { icon: '📊', title: 'Analytics', tech: 'Grafana, InfluxDB' },
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
                The technologies powering Gulf Logistics' fleet management platform
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
                Measurable results from fleet management transformation
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
                  <span className="gradient-text">AED 15M annual fuel savings</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">40% reduction in empty miles</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">98% on-time delivery</span>
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
                "The fleet management system has given us complete visibility into our operations. We're saving
                millions in fuel costs, our drivers are safer, and our customers get accurate delivery estimates.
                The AI route optimization alone paid for the system in the first year. This has been transformative
                for our business."
              </p>
              <div>
                <p className="font-bold text-white text-lg">Mohamed Al Blooshi</p>
                <p className="text-sm text-gray-500">Fleet Director, Gulf Logistics</p>
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
                { title: 'Warehouse Automation', client: 'Gulf Logistics', slug: 'warehouse-automation-gulf-logistics' },
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
              Ready to Optimize Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Fleet Operations</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how our fleet management solutions can reduce costs and improve efficiency.
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