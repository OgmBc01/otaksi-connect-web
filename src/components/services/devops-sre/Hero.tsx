'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // DevOps-themed animated background (CI/CD pipeline visualization)
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

    // Create pipeline stages (like CI/CD stages)
    const stages: { x: number; y: number; label: string; active: boolean; pulse: number }[] = []
    const stageLabels = ['DEV', 'TEST', 'STAGE', 'PROD']
    
    for (let i = 0; i < 4; i++) {
      stages.push({
        x: 150 + i * 250,
        y: canvas.height / 2,
        label: stageLabels[i],
        active: false,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create flowing deployment pipelines
    const pipelines: {
      startX: number
      startY: number
      endX: number
      endY: number
      progress: number
      speed: number
    }[] = []

    for (let i = 0; i < 8; i++) {
      pipelines.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      })
    }

    // Create monitoring metrics (floating numbers)
    const metrics: { x: number; y: number; value: string; size: number; speedY: number }[] = []
    const metricValues = ['99.9%', '200ms', '0 err', '100%', '1.2x', '50ms', '95%', '0.1%']
    
    for (let i = 0; i < 12; i++) {
      metrics.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: metricValues[Math.floor(Math.random() * metricValues.length)],
        size: 10 + Math.random() * 10,
        speedY: 0.1 + Math.random() * 0.2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw pipeline connections
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < stages.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(stages[i].x, stages[i].y)
        ctx.lineTo(stages[i + 1].x, stages[i + 1].y)
        ctx.stroke()

        // Draw flowing indicators on pipelines
        const flowPos = (time + i) % 1
        const flowX = stages[i].x + (stages[i + 1].x - stages[i].x) * flowPos
        const flowY = stages[i].y + (stages[i + 1].y - stages[i].y) * flowPos

        ctx.beginPath()
        ctx.arc(flowX, flowY, 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8)
        gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw stages
      stages.forEach((stage, i) => {
        stage.pulse += 0.02
        const pulseSize = Math.sin(stage.pulse) * 3 + 8

        // Stage circle
        ctx.beginPath()
        ctx.arc(stage.x, stage.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.2)`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(stage.x, stage.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = i === 0 ? '#FF2E9F' : '#5B6CFF'
        ctx.fill()

        // Stage label
        ctx.font = '12px monospace'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(stage.label, stage.x - 20, stage.y - 20)
      })

      // Draw flowing pipelines
      pipelines.forEach((pipeline) => {
        pipeline.progress += pipeline.speed

        if (pipeline.progress > 1) {
          pipeline.progress = 0
          pipeline.startX = Math.random() * canvas.width
          pipeline.startY = Math.random() * canvas.height
          pipeline.endX = Math.random() * canvas.width
          pipeline.endY = Math.random() * canvas.height
        }

        const currentX = pipeline.startX + (pipeline.endX - pipeline.startX) * pipeline.progress
        const currentY = pipeline.startY + (pipeline.endY - pipeline.startY) * pipeline.progress

        ctx.beginPath()
        ctx.moveTo(pipeline.startX, pipeline.startY)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 108, 255, 0.2)'
        ctx.fill()
      })

      // Draw floating metrics
      metrics.forEach((metric) => {
        metric.y -= metric.speedY

        if (metric.y < 0) {
          metric.y = canvas.height
          metric.x = Math.random() * canvas.width
        }

        ctx.font = `${metric.size}px monospace`
        ctx.fillStyle = `rgba(255, 46, 159, 0.1)`
        ctx.fillText(metric.value, metric.x, metric.y)
      })

      // Draw monitoring grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.03)'
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
      <div className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/50 to-transparent" />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-midnight via-midnight/80 to-transparent z-10" />
        <Image
          src="/images/devops-sre/hero-devops.jpg"
          alt="DevOps & SRE Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

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
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span>•</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">DevOps & SRE</span>
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
              <span className="text-white">DevOps</span>{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">& SRE</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Accelerate delivery, improve reliability, and optimize operations with 
              enterprise DevOps and Site Reliability Engineering. CI/CD pipelines, 
              infrastructure automation, and 24/7 monitoring.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '99.99%', label: 'Uptime SLA' },
                { value: '10x', label: 'Faster Deployments' },
                { value: '50%', label: 'Cost Reduction' },
                { value: '24/7', label: 'Monitoring' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">{stat.value}</div>
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
                Optimize Your Pipeline
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
              <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-3xl opacity-30" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/devops-sre/hero-devops.jpg"
                  alt="DevOps & SRE"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center">
                <span className="text-3xl">⚙️</span>
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
            className="w-1 h-2 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}