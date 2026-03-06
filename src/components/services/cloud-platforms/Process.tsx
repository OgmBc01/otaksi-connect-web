'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'

const steps = [
  {
    phase: 'Assessment',
    title: 'Discovery & Planning',
    description: 'We analyze your current infrastructure, applications, and business requirements to create a comprehensive cloud strategy.',
    icon: '🔍',
    image: '/images/cloud-platforms/process-assessment.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Infrastructure audit',
      'Application dependency mapping',
      'Cost analysis & TCO',
      'Security & compliance review'
    ]
  },
  {
    phase: 'Design',
    title: 'Architecture & Migration Plan',
    description: 'We design a target architecture and create a detailed migration roadmap with minimal disruption to your business.',
    icon: '📐',
    image: '/images/cloud-platforms/process-design.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Cloud architecture design',
      'Migration strategy (6 Rs)',
      'Network & security design',
      'Phased implementation plan'
    ]
  },
  {
    phase: 'Migration',
    title: 'Execution & Validation',
    description: 'We execute the migration according to plan, with rigorous testing at each phase to ensure data integrity and performance.',
    icon: '🚀',
    image: '/images/cloud-platforms/process-migration.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    details: [
      'Phased migration',
      'Data replication',
      'Performance validation',
      'User acceptance testing'
    ]
  },
  {
    phase: 'Optimization',
    title: 'Continuous Improvement',
    description: 'Post-migration, we optimize performance, reduce costs, and implement best practices for ongoing cloud management.',
    icon: '⚡',
    image: '/images/cloud-platforms/process-optimization.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    details: [
      'Cost optimization',
      'Performance tuning',
      'Security hardening',
      'Automation & DevOps'
    ]
  }
]

export default function Process() {
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
      
      {/* Timeline Background */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-20 hidden lg:block" />

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
            Cloud Migration{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology for successful cloud migration with minimal disruption 
            and maximum business value.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-30' : ''
                  }`}
                  style={{ background: step.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.phase}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Phase */}
                    <div 
                      className="text-sm font-medium mb-2 text-transparent bg-clip-text"
                      style={{ backgroundImage: step.gradient }}
                    >
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
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
                            <span 
                              className="w-1 h-1 rounded-full"
                              style={{ background: step.gradient }}
                            />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
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