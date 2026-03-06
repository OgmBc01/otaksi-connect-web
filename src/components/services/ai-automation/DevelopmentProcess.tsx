'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'

const steps = [
  {
    phase: 'Discovery',
    title: 'Data Assessment & Strategy',
    description: 'We evaluate your data quality, identify AI opportunities, and create a roadmap for implementation.',
    icon: '🔍',
    image: '/images/ai-automation/process-discovery.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    details: [
      'Data audit & quality assessment',
      'Use case identification',
      'ROI analysis',
      'Technology selection'
    ]
  },
  {
    phase: 'Development',
    title: 'Model Training & Testing',
    description: 'We build, train, and validate AI models using your data, ensuring accuracy and reliability.',
    icon: '⚙️',
    image: '/images/ai-automation/process-development.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    details: [
      'Data preparation',
      'Model training',
      'Validation & testing',
      'Performance optimization'
    ]
  },
  {
    phase: 'Integration',
    title: 'Deployment & Integration',
    description: 'Seamlessly integrate AI solutions into your existing systems with minimal disruption.',
    icon: '🚀',
    image: '/images/ai-automation/process-deployment.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    details: [
      'API development',
      'System integration',
      'User training',
      'Performance monitoring'
    ]
  },
  {
    phase: 'Evolution',
    title: 'Continuous Learning',
    description: 'Models continuously learn from new data, improving accuracy and adapting to changing conditions.',
    icon: '🔄',
    image: '/images/ai-automation/process-evolution.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    details: [
      'Model retraining',
      'Performance tracking',
      'Feature enhancement',
      'Ongoing optimization'
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
            AI Development{' '}
            <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A systematic approach to building and deploying intelligent solutions that 
            deliver measurable business impact.
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
                  className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-30' : ''
                  }`}
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
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Phase */}
                    <div className={`text-sm font-medium mb-2 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">
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
                            <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${step.gradient}`} />
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