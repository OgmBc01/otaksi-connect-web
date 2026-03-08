'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

interface CaseStudyLayoutProps {
  children: React.ReactNode
  title: string
  client: string
  industry: string
  gradient: string
  icon: string
  technologies: string[]
  metrics: string[]
  results: string
}

export default function CaseStudyLayout({ 
  children, 
  title, 
  client, 
  industry, 
  gradient,
  icon,
  technologies,
  metrics,
  results 
}: CaseStudyLayoutProps) {
  
  // Hero section canvas animation (placeholder for unique animation)
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // This is a placeholder - each case study will override this with unique animation
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Default animation (will be replaced with unique ones)
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.arc(200 + i * 100, 200 + Math.sin(time + i) * 50, 30, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.1)`
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <main className="bg-midnight">
      {/* Hero Canvas - Unique animation per case study */}
      <canvas
        id="hero-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">{title}</span>
              </nav>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{ background: gradient }} />
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: gradient }}>
                  <span className="text-3xl">{icon}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400 mb-8"
            >
              {client} • {industry}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {metrics.slice(0, 3).map((metric, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-full">
                  <span className="text-sm font-medium gradient-text">{metric}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {children}
    </main>
  )
}
