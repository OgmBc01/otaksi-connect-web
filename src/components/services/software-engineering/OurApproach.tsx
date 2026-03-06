'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const approaches = [
  {
    title: 'Custom Web Applications',
    description: 'Scalable, secure, and high-performance web applications built with modern frameworks like React, Next.js, and Vue.js.',
    icon: '🌐',
    features: ['Single Page Applications', 'Progressive Web Apps', 'Real-time Dashboards', 'E-commerce Platforms'],
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
    icon: '📱',
    features: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter'],
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  },
  {
    title: 'Microservices Architecture',
    description: 'Decoupled, independently deployable services that enable scalability, resilience, and faster time-to-market.',
    icon: '⚙️',
    features: ['Service Mesh', 'API Gateway', 'Event-Driven Architecture', 'Container Orchestration'],
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]'
  },
  {
    title: 'API Development & Integration',
    description: 'Robust, well-documented APIs that connect your systems and enable seamless data flow across your ecosystem.',
    icon: '🔌',
    features: ['RESTful APIs', 'GraphQL', 'WebSockets', 'Third-party Integration'],
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]'
  }
]

export default function OurApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
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
            Our{' '}
            <span className="gradient-text">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine technical excellence with industry best practices to deliver 
            software that drives real business outcomes.
          </p>
        </motion.div>

        {/* Approach Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 bg-linear-to-r ${approach.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card p-8 rounded-2xl border border-white/10 group-hover:border-white/20">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-r ${approach.gradient} rounded-full blur-3xl`} />
                    <div className={`absolute bottom-0 left-0 w-32 h-32 bg-linear-to-r ${approach.gradient} rounded-full blur-3xl`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${approach.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative w-16 h-16 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center">
                        <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          {approach.icon}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                      {approach.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {approach.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {approach.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${approach.gradient} mr-2`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}