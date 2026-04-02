'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function FraudDetectionSecurebankPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // Fraud detection themed animation - security scanning, threat detection
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

    // Security scan lines (radar-like)
    const scanLines: { angle: number; distance: number; speed: number }[] = []
    for (let i = 0; i < 8; i++) {
      scanLines.push({
        angle: (i / 8) * Math.PI * 2,
        distance: 100 + Math.random() * 200,
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Threat detection particles (red flags)
    const threats: {
      x: number
      y: number
      size: number
      pulse: number
      opacity: number
    }[] = []

    for (let i = 0; i < 12; i++) {
      threats.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 4 + Math.random() * 8,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.2,
      })
    }

    // Security shield outlines
    const shields: { x: number; y: number; size: number; rotation: number }[] = []
    for (let i = 0; i < 5; i++) {
      shields.push({
        x: 200 + i * 300,
        y: 300,
        size: 60,
        rotation: Math.random() * 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw security grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.06)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw scanning radar effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, 150 + Math.sin(time * 2) * 20, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 46, 159, 0.15)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw scan lines
      scanLines.forEach((line) => {
        line.angle += line.speed
        const x = centerX + Math.cos(line.angle) * line.distance
        const y = centerY + Math.sin(line.angle) * line.distance

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.25)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Scanning dot
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.4)')
        gradient.addColorStop(0.8, 'rgba(91, 108, 255, 0.2)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw shield outlines
      shields.forEach((shield) => {
        ctx.save()
        ctx.translate(shield.x, shield.y)
        ctx.rotate(shield.rotation + Math.sin(time) * 0.1)
        
        // Draw shield shape
        ctx.beginPath()
        ctx.moveTo(0, -shield.size)
        ctx.lineTo(shield.size * 0.8, 0)
        ctx.lineTo(0, shield.size)
        ctx.lineTo(-shield.size * 0.8, 0)
        ctx.closePath()
        
        ctx.strokeStyle = 'rgba(91, 108, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
      })

      // Draw threat particles
      threats.forEach((threat) => {
        threat.pulse += 0.03
        const pulseSize = threat.size + Math.sin(threat.pulse) * 2

        ctx.beginPath()
        ctx.arc(threat.x, threat.y, pulseSize, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(threat.x, threat.y, 0, threat.x, threat.y, pulseSize * 3)
        gradient.addColorStop(0, `rgba(255, 46, 159, ${threat.opacity})`)
        gradient.addColorStop(0.7, 'rgba(91, 108, 255, 0.1)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
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
    { value: '99.9%', label: 'Detection Accuracy' },
    { value: '50M+', label: 'Transactions Analyzed' },
    { value: '50%', label: 'False Positive Reduction' },
    { value: '50ms', label: 'Real-time Detection' },
  ]

  const processSteps = [
    {
      phase: 'Discovery',
      title: 'Threat Analysis',
      description: 'Analyzed historical fraud patterns and security requirements',
      icon: '🔍',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Model Development',
      title: 'ML Training',
      description: 'Trained ensemble models on 5 years of transaction data',
      icon: '🧠',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
    {
      phase: 'Integration',
      title: 'Real-time Pipeline',
      description: 'Integrated with core banking systems via Kafka streams',
      icon: '⚡',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Optimization',
      title: 'Continuous Learning',
      description: 'Automated retraining pipeline for model improvement',
      icon: '🔄',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
  ]

  const technologies = [
    { name: 'TensorFlow', level: 95, description: 'Deep learning models' },
    { name: 'Python', level: 98, description: 'Model training & API' },
    { name: 'Apache Kafka', level: 92, description: 'Real-time event streaming' },
    { name: 'Redis', level: 90, description: 'Feature store' },
    { name: 'PostgreSQL', level: 88, description: 'Transaction logs' },
    { name: 'Docker', level: 90, description: 'Model containerization' },
    { name: 'Kubernetes', level: 85, description: 'Model orchestration' },
    { name: 'Prometheus', level: 85, description: 'Model monitoring' },
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Fraud Detection</span>
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
                <span className="text-5xl">🔒</span>
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
            <span className="text-white">AI-Powered</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Fraud Detection</span>
          </motion.h1>

          {/* Client & Industry */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-8"
          >
            SecureBank • FinTech
          </motion.p>

          {/* Quick Stats - Transparent pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">99.9% Accuracy</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">Real-time Detection</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">AED 50M+ Saved</span>
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
                  SecureBank was losing millions annually to fraud, with their rule-based detection system 
                  missing sophisticated attacks and flagging too many false positives, frustrating legitimate customers.
                </p>
                
                <div className="space-y-4">
                  {[
                    'AED 15M+ annual fraud losses',
                    '70% of fraud cases missed by rule-based system',
                    '25% false positive rate frustrating customers',
                    'Manual review taking 3-5 days per case',
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
                    src="/images/case-studies/fraud-detection-securebank/challenge.jpg"
                    alt="Fraud detection challenge"
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
                  We built an ensemble of machine learning models that analyzes transactions in real-time,
                  learning from patterns to detect fraud with unprecedented accuracy.
                </p>

                <div className="space-y-4">
                  {[
                    'Ensemble of 5 ML models (XGBoost, Neural Networks, Random Forest)',
                    'Real-time scoring with 50ms latency',
                    'Automated retraining pipeline for continuous improvement',
                    'Explainable AI for compliance and audit trails',
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
                    src="/images/case-studies/fraud-detection-securebank/solution.jpg"
                    alt="Fraud detection solution"
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
              How we built and deployed the fraud detection system in 5 months
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
                Fraud Detection <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '📊', title: 'Data Pipeline', tech: 'Kafka, Spark' },
                { icon: '🧠', title: 'ML Models', tech: 'TensorFlow, XGBoost' },
                { icon: '⚡', title: 'Real-time Scoring', tech: 'Redis, FastAPI' },
                { icon: '📈', title: 'Monitoring', tech: 'Prometheus, Grafana' },
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
                The technologies powering SecureBank's fraud detection system
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
                Measurable results that transformed SecureBank's fraud prevention
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
                  <span className="gradient-text">AED 50M+ saved annually</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">95% fraud detection rate</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">5x ROI in first year</span>
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
                "The AI fraud detection system Otaksi Connect built has been transformative for our security operations. 
                We're catching fraud that would have slipped through our old rules-based system, and our customers 
                are no longer being falsely flagged. The ROI in the first year alone was over 5x our investment."
              </p>
              <div>
                <p className="font-bold text-white text-lg">Dr. Khalid Al Rais</p>
                <p className="text-sm text-gray-500">Chief Risk Officer, SecureBank</p>
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
                { title: 'Digital Banking Platform', client: 'Gulf Financial', slug: 'digital-banking-gulf-financial' },
                { title: 'Payment Gateway Integration', client: 'Gulf Pay', slug: 'payment-gateway-gulf-pay' },
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
              Ready to Protect Your Business from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Fraud</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how our AI-powered fraud detection can save you millions while improving customer experience.
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