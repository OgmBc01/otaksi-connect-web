'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function SoftwareEngineeringHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-midnight pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

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
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>•</span>
            <span className="gradient-text">Software Engineering</span>
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
            <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
            <div className="relative w-24 h-24 rounded-2xl bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
              <span className="text-5xl">💻</span>
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
          <span className="text-white">Software</span>{' '}
          <span className="gradient-text">Engineering</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          Enterprise-grade web and mobile applications built with modern architectures, 
          scalable microservices, and robust API integrations tailored for UAE businesses.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '15+', label: 'Enterprise Clients' },
            { value: '5+', label: 'Years in UAE' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="large">
            Discuss Your Project
          </Button>
          <Button variant="secondary" size="large">
            View Case Studies
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
      </div>

      {/* Animation Keyframes */}
      {/* Animation classes moved to globals.css */}
    </section>
  )
}