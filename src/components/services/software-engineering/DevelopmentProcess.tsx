'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const steps = [
  {
    phase: 'Discovery',
    title: 'Requirements & Planning',
    description: 'We dive deep into your business needs, technical requirements, and project goals to create a comprehensive roadmap.',
    icon: '🔍',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    details: [
      'Stakeholder interviews',
      'Technical feasibility analysis',
      'Architecture design',
      'Project roadmap creation'
    ]
  },
  {
    phase: 'Design',
    title: 'UX/UI & Architecture',
    description: 'Our designers and architects create intuitive user experiences and robust system architectures.',
    icon: '🎨',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    details: [
      'User journey mapping',
      'Wireframing & prototyping',
      'System architecture design',
      'Technology stack selection'
    ]
  },
  {
    phase: 'Development',
    title: 'Agile Implementation',
    description: 'We build your solution using agile methodologies, with continuous integration and regular demos.',
    icon: '⚙️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    details: [
      'Sprint planning',
      'Iterative development',
      'Code reviews',
      'Continuous integration'
    ]
  },
  {
    phase: 'Testing',
    title: 'Quality Assurance',
    description: 'Rigorous testing ensures your software is reliable, secure, and performs flawlessly.',
    icon: '✅',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    details: [
      'Automated testing',
      'Performance testing',
      'Security audits',
      'User acceptance testing'
    ]
  },
  {
    phase: 'Deployment',
    title: 'Launch & Migration',
    description: 'We ensure smooth deployment with zero downtime and comprehensive data migration.',
    icon: '🚀',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    details: [
      'Deployment automation',
      'Data migration',
      'Performance monitoring',
      'Rollback procedures'
    ]
  },
  {
    phase: 'Support',
    title: 'Maintenance & Evolution',
    description: 'Ongoing support, maintenance, and continuous improvement to keep your software ahead.',
    icon: '🔧',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    details: [
      '24/7 monitoring',
      'Bug fixes & patches',
      'Feature enhancements',
      'Performance optimization'
    ]
  }
]

export default function DevelopmentProcess() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState(0)

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
    hidden: { y: 30, opacity: 0 },
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
            Development{' '}
            <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our proven methodology ensures successful delivery of complex software projects 
            on time and within budget.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 bg-linear-to-r ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-30' : ''
                  }`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card p-8 rounded-2xl border border-white/10 group-hover:border-white/20">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-xl bg-linear-to-r ${step.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative w-14 h-14 rounded-xl bg-midnight border border-white/10 flex items-center justify-center">
                      <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  {/* Phase */}
                  <div className={`text-sm font-medium mb-2 bg-linear-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    {step.phase}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4">
                    {step.description}
                  </p>

                  {/* Details (visible on hover) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeStep === index ? 'auto' : 0,
                      opacity: activeStep === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-1">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className={`w-1 h-1 rounded-full bg-linear-to-r ${step.gradient}`} />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Connector Line (for desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] opacity-30" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}