'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Button from '@/components/ui/Button'

export default function multivendormarketplacePage() {
  // Unique canvas animation for this case study
  useEffect(() => {
    const canvas = document.getElementById('case-study-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement?.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // TODO: Implement unique animation for E-commerce case study
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Placeholder animation
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(200 + i * 150, 300, 40, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 46, 159, 0.1)' : 'rgba(91, 108, 255, 0.1)'
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
    <CaseStudyLayout
      title="Multi-vendor Marketplace"
      client="Gulf Mart"
      industry="E-commerce"
      gradient="linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
      icon="🛍️"
      technologies={['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch']}
      metrics={['1M+ customers', '5K+ sellers', 'Multi-vendor', 'Commission tracking']}
      results="200% growth in 2 years"
    >
      {/* Challenge Section */}
      <section className="relative py-16 bg-midnight overflow-hidden">
        <canvas
          id="case-study-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Challenge</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Gulf Mart, a leading E-commerce organization in the UAE, faced significant 
                challenges with their legacy systems and manual processes. Operations were 
                inefficient, data was siloed, and they needed to scale to meet growing demand.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Manual processes causing delays and errors</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Legacy systems unable to scale with business growth</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Limited visibility into operations and performance</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/case-studies/multi-vendor-marketplace/challenge.jpg"
                alt="Challenge illustration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden md:order-2"
            >
              <Image
                src="/images/case-studies/multi-vendor-marketplace/solution.jpg"
                alt="Solution illustration"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solution</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We developed a comprehensive E-commerce solution that transformed their operations:
              </p>
              <div className="space-y-4">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Modern Architecture</h3>
                  <p className="text-gray-400">Built with scalable microservices and cloud-native technologies</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Automated Workflows</h3>
                  <p className="text-gray-400">Eliminated manual processes with intelligent automation</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Real-time Analytics</h3>
                  <p className="text-gray-400">Comprehensive dashboards and reporting capabilities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Used</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
                          <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>Next.js</span>
              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>Node.js</span>
              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>PostgreSQL</span>
              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>Redis</span>
              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>Elasticsearch</span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Impact</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">1M+ customers</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">5K+ sellers</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">Multi-vendor</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">Commission tracking</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block glass-card px-8 py-4 rounded-full">
              <p className="text-xl font-bold gradient-text">200% growth in 2 years</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 bg-midnight border-t border-white/5 overflow-hidden">
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
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
              Ready to Achieve Similar <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Results</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with technology.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="large">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
