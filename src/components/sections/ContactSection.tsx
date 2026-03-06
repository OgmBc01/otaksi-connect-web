'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Button from '../ui/Button'

const contactInfo = [
  {
    icon: '📍',
    title: 'Dubai Office',
    details: ['Dubai Internet City', 'Building 1, Office 205', 'Dubai, UAE'],
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  {
    icon: '📞',
    title: 'Contact',
    details: ['+971 4 123 4567', 'hello@otaksi.ae', 'support@otaksi.ae'],
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  },
  {
    icon: '⏰',
    title: 'Business Hours',
    details: ['Sunday - Thursday', '9:00 AM - 6:00 PM', '24/7 Support Available'],
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  }
]

const socialLinks = [
  { name: 'LinkedIn', icon: '💼', color: 'from-[#0077B5] to-[#00A0DC]' },
  { name: 'Twitter', icon: '🐦', color: 'from-[#1DA1F2] to-[#1A91DA]' },
  { name: 'GitHub', icon: '🐙', color: 'from-[#333] to-[#6e5494]' },
  { name: 'Instagram', icon: '📷', color: 'from-[#E4405F] to-[#D52B5C]' },
]

const projectTypes = [
  'Web Development',
  'Mobile App Development',
  'Cloud Migration',
  'AI & Automation',
  'Digital Transformation',
  'Enterprise Software',
  'Consulting',
  'Other'
]

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: ''
      })
    }, 5000)
  }

  // Tech background animation
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = document.getElementById('tech-canvas')
    if (!container) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    container.appendChild(canvas)

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // Gradient particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, '#FF2E9F')
        gradient.addColorStop(1, '#5B6CFF')
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = 1 - distance / 100
            ctx.strokeStyle = `rgba(91, 108, 255, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(canvas)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Tech Canvas Background */}
      <div id="tech-canvas" className="absolute inset-0" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0B0616] via-[#0F0820] to-[#1A0F2E]" />
      
      {/* Neural Network Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to transform your business with intelligent software solutions? 
            Get in touch with our team of experts today.
          </p>
        </motion.div>

        {/* Contact Details Cards - Now Glass Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full glass-card p-8 hover:scale-105 transition-all duration-500 overflow-hidden rounded-2xl border-2 border-transparent before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:z-20 before:border-2 before:border-transparent before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-[#FF2E9F] before:via-[#5B6CFF] before:to-[#FF2E9F] before:opacity-40 before:animate-gradient-fade">
                {/* Gradient Background on Hover - Fixed with border radius */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-linear-to-r ${info.gradient} rounded-2xl`}
                />
                
                {/* Blur Effect Layer - Fixed with blur and border radius */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-linear-to-r ${info.gradient} rounded-2xl blur-xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Gradient Border */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${info.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative w-16 h-16 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center overflow-hidden">
                      <span className="text-3xl transform group-hover:scale-110 transition-transform duration-500">
                        {info.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {info.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {detail}
                      </p>
                    ))}
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 right-0 w-24 h-24 bg-linear-to-r ${info.gradient} opacity-5 rounded-full blur-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form and Social Links Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Social Links Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="glass-card p-8 h-full flex flex-col rounded-2xl">
              <h3 className="text-xl font-bold mb-6 gradient-text">Connect With Us</h3>
              
              <div className="space-y-4 flex-1">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="relative block group"
                  >
                    {/* Hover background with proper border radius and blur */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-xl`}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-xl blur-md`}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4 p-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                      <svg className="w-4 h-4 ml-auto text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Response Guarantee */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-md opacity-50" />
                    <div className="relative w-10 h-10 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                      <span className="text-white text-lg">⚡</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">24-Hour Response</p>
                    <p className="text-xs text-gray-500">Guaranteed on all inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Now Glass Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 rounded-2xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full animate-ping opacity-30" />
                    <div className="relative w-24 h-24 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 gradient-text">Thank You!</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Your message has been sent. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold mb-6 gradient-text">Send Us a Message</h3>
                  
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Company & Project Type Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                      >
                        <option value="" disabled>Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-midnight">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white resize-none"
                      placeholder="Tell us about your project, goals, and requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      * Required fields
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>

                  {/* Form Footer */}
                  <p className="text-xs text-center text-gray-600 mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Map/Office Location Preview - Now Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="glass-card p-4 rounded-2xl overflow-hidden group cursor-pointer">
            <div className="relative h-48 rounded-lg overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F]/20 to-[#5B6CFF]/20">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Hover overlay with blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] blur-xl"
              />
              
              {/* Map Content */}
              <div className="relative h-full flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="text-5xl mb-3 animate-pulse-slow group-hover:scale-110 transition-transform duration-500">📍</div>
                  <p className="text-lg font-medium gradient-text group-hover:scale-105 transition-transform duration-500">Dubai Internet City</p>
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Building 1, Office 205</p>
                  <p className="text-xs text-gray-500 mt-2 group-hover:text-gray-300 transition-colors duration-300">Click to open in Google Maps</p>
                </div>
              </div>

              {/* Data Stream Animation */}
              <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
                <div className="w-full h-full bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent animate-data-stream" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}