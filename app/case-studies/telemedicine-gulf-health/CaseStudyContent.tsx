'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function TelemedicineGulfHealthPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // Telemedicine-themed animation - video calls, patient connections, medical data
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

    // Video call connection nodes
    const nodes: { x: number; y: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.2,
      })
    }

    // Connection lines between nodes (simulating video streams)
    const connections: { from: number; to: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 15; i++) {
      connections.push({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Video camera icons
    const cameras: { x: number; y: number; size: number; rotation: number; opacity: number }[] = []
    for (let i = 0; i < 6; i++) {
      cameras.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 24 + Math.random() * 20,
        rotation: Math.random() * 0.2,
        opacity: 0.12 + Math.random() * 0.15,
      })
    }

    // Patient icons (representing users)
    const patients: { x: number; y: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 8; i++) {
      patients.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.18 + Math.random() * 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connection grid
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

      // Draw connection lines between nodes
      connections.forEach((conn) => {
        conn.progress += conn.speed
        if (conn.progress > 1) conn.progress = 0

        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        if (fromNode && toNode) {
          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.strokeStyle = 'rgba(255, 46, 159, 0.15)'
          ctx.lineWidth = 1.5
          ctx.stroke()

          // Draw moving data packet
          const currentX = fromNode.x + (toNode.x - fromNode.x) * conn.progress
          const currentY = fromNode.y + (toNode.y - fromNode.y) * conn.progress

          ctx.beginPath()
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 10)
          gradient.addColorStop(0, 'rgba(91, 108, 255, 0.35)')
          gradient.addColorStop(0.7, 'rgba(255, 46, 159, 0.2)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw video call nodes
      nodes.forEach((node) => {
        node.pulse += 0.02
        const pulseSize = 6 + Math.sin(node.pulse) * 2

        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 3)
        gradient.addColorStop(0, `rgba(91, 108, 255, ${node.opacity})`)
        gradient.addColorStop(0.8, `rgba(255, 46, 159, ${node.opacity * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw patient icons
      patients.forEach((patient) => {
        patient.pulse += 0.03
        const yOffset = Math.sin(patient.pulse) * 10

        ctx.font = '20px Arial'
        ctx.fillStyle = `rgba(255, 46, 159, ${patient.opacity})`
        ctx.fillText('👤', patient.x, patient.y + yOffset)
      })

      // Draw camera icons
      cameras.forEach((camera) => {
        ctx.save()
        ctx.translate(camera.x, camera.y)
        ctx.rotate(Math.sin(time * 0.5) * 0.1)
        
        ctx.font = `${camera.size}px Arial`
        ctx.fillStyle = `rgba(91, 108, 255, ${camera.opacity})`
        ctx.fillText('📹', -camera.size/2, -camera.size/2)
        
        ctx.restore()
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
    { value: '100K+', label: 'Virtual Consultations' },
    { value: '95%', label: 'Patient Satisfaction' },
    { value: '50%', label: 'No-Show Reduction' },
    { value: '24/7', label: 'Service Availability' },
  ]

  const processSteps = [
    {
      phase: 'Discovery',
      title: 'Clinical Workflow Analysis',
      description: 'Mapped telemedicine workflows across 50+ clinics',
      icon: '🔍',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Platform',
      title: 'Video Integration',
      description: 'Integrated WebRTC for HIPAA-compliant video calls',
      icon: '📹',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
    {
      phase: 'Integration',
      title: 'EHR Integration',
      description: 'Connected with existing EHR for seamless records',
      icon: '🔄',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Launch',
      title: 'Go-Live & Training',
      description: 'Trained 500+ physicians across 15 hospitals',
      icon: '🚀',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
  ]

  const technologies = [
    { name: 'WebRTC', level: 95, description: 'Real-time video' },
    { name: 'React', level: 95, description: 'Frontend platform' },
    { name: 'Node.js', level: 92, description: 'Signaling server' },
    { name: 'Socket.io', level: 90, description: 'Real-time messaging' },
    { name: 'PostgreSQL', level: 88, description: 'Consultation records' },
    { name: 'Redis', level: 85, description: 'Session management' },
    { name: 'FHIR', level: 85, description: 'EHR integration' },
    { name: 'AES-256', level: 98, description: 'End-to-end encryption' },
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Telemedicine</span>
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
                <span className="text-5xl">📹</span>
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
            <span className="text-white">Telemedicine</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Platform</span>
          </motion.h1>

          {/* Client & Industry */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-8"
          >
            Gulf Health System • Healthcare
          </motion.p>

          {/* Quick Stats - Transparent pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">100K+ Consultations</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">95% Satisfaction</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">HIPAA Compliant</span>
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
                  Gulf Health System needed to rapidly deploy a telemedicine solution during the pandemic.
                  They faced challenges with legacy infrastructure, physician adoption, and maintaining
                  the same quality of care as in-person visits.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Only 5% of visits conducted virtually pre-pandemic',
                    'No integration with existing EHR systems',
                    'Physicians struggling with multiple disjointed tools',
                    'Patients finding video visits difficult to access',
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
                    src="/images/case-studies/telemedicine-gulf-health/challenge.jpg"
                    alt="Telemedicine challenge"
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
                  We built a unified telemedicine platform that seamlessly integrates with their existing
                  EHR, providing a seamless experience for both physicians and patients across all devices.
                </p>

                <div className="space-y-4">
                  {[
                    'HD video consultations with waiting room and recording',
                    'Deep EHR integration for automatic visit documentation',
                    'Patient-friendly interface with appointment scheduling',
                    'Real-time vital signs monitoring during consultations',
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
                    src="/images/case-studies/telemedicine-gulf-health/solution.jpg"
                    alt="Telemedicine solution"
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
              How we deployed the telemedicine platform in just 3 months
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
                Telemedicine <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '👤', title: 'Patient Portal', tech: 'React, Mobile App' },
                { icon: '📹', title: 'Video Service', tech: 'WebRTC, SFU' },
                { icon: '⚙️', title: 'API Layer', tech: 'Node.js, Socket.io' },
                { icon: '🏥', title: 'EHR Integration', tech: 'FHIR, HL7' },
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
                The technologies powering Gulf Health System's telemedicine platform
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
                Measurable results that transformed patient care delivery
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
                  <span className="gradient-text">65% of visits now virtual</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">4.9★ app rating</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">500+ physicians trained</span>
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
                "The telemedicine platform has been a game-changer for our healthcare system. We went from 
                struggling to meet patient demand to offering seamless virtual care that our patients love. 
                The integration with our EHR means physicians don't have to double-document, and the quality 
                of video calls is exceptional even on mobile networks."
              </p>
              <div>
                <p className="font-bold text-white text-lg">Dr. Ahmed Al Mahmoud</p>
                <p className="text-sm text-gray-500">Director of Digital Health, Gulf Health System</p>
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
                { title: 'Electronic Health Records', client: 'Gulf Health System', slug: 'ehr-gulf-health' },
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
              Ready to Launch Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Telemedicine Platform</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you deliver virtual care that patients and physicians love.
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