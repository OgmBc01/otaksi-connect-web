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

  // Unique animated background for CTA section (deployment visualization)
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

    // Create deployment progress bars
    const progressBars: { x: number; y: number; width: number; progress: number; target: number; speed: number }[] = []

    for (let i = 0; i < 10; i++) {
      progressBars.push({
        x: 50 + Math.random() * 300,
        y: 50 + i * 60,
        width: 200,
        progress: Math.random() * 100,
        target: 100,
        speed: 0.1 + Math.random() * 0.2,
      })
    }

    // Create success checkmarks
    const checkmarks: { x: number; y: number; opacity: number; pulse: number }[] = []

    for (let i = 0; i < 5; i++) {
      checkmarks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw progress bars
      progressBars.forEach((bar) => {
        if (bar.progress < bar.target) {
          bar.progress += bar.speed
        }

        // Bar background
        ctx.fillStyle = 'rgba(91, 108, 255, 0.1)'
        ctx.fillRect(bar.x, bar.y, bar.width, 20)

        // Bar fill
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(bar.x, bar.y, bar.progress * 2, 20)

        // Percentage text
        ctx.font = '12px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillText(`${Math.floor(bar.progress)}%`, bar.x + bar.width + 10, bar.y + 15)
      })

      // Draw success checkmarks
      checkmarks.forEach((mark) => {
        mark.pulse += 0.02
        mark.opacity = 0.1 + Math.sin(mark.pulse) * 0.05

        ctx.font = '30px Arial'
        ctx.fillStyle = `rgba(91, 108, 255, ${mark.opacity})`
        ctx.fillText('✓', mark.x, mark.y)
      })

      // Draw deployment timeline
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 50)
      
      for (let x = 0; x < canvas.width; x += 20) {
        const y = canvas.height - 50 + Math.sin(x * 0.02 + time) * 20
        ctx.lineTo(x, y)
      }
      
      ctx.strokeStyle = 'rgba(255, 46, 159, 0.1)'
      ctx.lineWidth = 2
      ctx.stroke()

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
        <div className="absolute inset-0 bg-linear-to-r from-midnight via-midnight/80 to-midnight z-10" />
        <Image
          src="/images/devops-sre/cta-bg.jpg"
          alt="DevOps & SRE CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square">
        <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Floating DevOps Icons */}
      <div className="absolute top-20 left-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float">⚙️</div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-2000">⎈</div>
      </div>
      <div className="absolute top-40 right-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-3000">📊</div>
      </div>
      <div className="absolute bottom-40 left-40 opacity-20 hidden lg:block">
        <div className="text-6xl animate-float animation-delay-1000">🔄</div>
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
              <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-2xl bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                <span className="text-5xl">⚙️</span>
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
            Ready to Optimize Your{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">DevOps Pipeline</span>?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss how DevOps and SRE practices can accelerate your delivery, 
            improve reliability, and reduce operational costs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button variant="primary" size="large">
              Start Your DevOps Journey
            </Button>
            <Button variant="secondary" size="large">
              Download DevOps Assessment
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
              <Link href="mailto:devops@otaksi.ae" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  ✉️
                </span>
                <span>devops@otaksi.ae</span>
              </Link>
              <Link href="tel:+97141234567" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                  📞
                </span>
                <span>+971 4 123 4567</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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
              ⚡ Free DevOps assessment | Certified experts | 24/7 support | Proven results
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}