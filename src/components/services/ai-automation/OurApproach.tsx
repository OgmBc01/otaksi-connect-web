'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const approaches = [
  {
    title: 'Machine Learning',
    description: 'Custom ML models for predictive analytics, classification, and pattern recognition tailored to your business data.',
    icon: '🧠',
    image: '/images/ai-automation/machine-learning.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    features: ['Predictive Analytics', 'Classification Models', 'Regression Analysis', 'Time Series Forecasting']
  },
  {
    title: 'Computer Vision',
    description: 'Advanced image and video analysis solutions for object detection, facial recognition, and visual quality control.',
    icon: '👁️',
    image: '/images/ai-automation/computer-vision.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    features: ['Object Detection', 'Image Classification', 'Facial Recognition', 'OCR & Document Processing']
  },
  {
    title: 'Natural Language Processing',
    description: 'Understand and process human language with sentiment analysis, chatbots, and document understanding.',
    icon: '💬',
    image: '/images/ai-automation/nlp.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    features: ['Sentiment Analysis', 'Chatbots & Assistants', 'Document Understanding', 'Language Translation']
  },
  {
    title: 'Robotic Process Automation',
    description: 'Automate repetitive tasks and workflows with intelligent bots that learn and adapt to your processes.',
    icon: '🤖',
    image: '/images/ai-automation/robotics.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    features: ['Workflow Automation', 'Data Entry Automation', 'Process Mining', 'Intelligent Decision Making']
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
            We combine cutting-edge AI technologies with deep industry expertise to deliver 
            intelligent automation solutions that drive real business value.
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
                  className={`absolute -inset-0.5 bg-gradient-to-r ${approach.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={approach.image}
                      alt={approach.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${approach.gradient} flex items-center justify-center`}>
                        <span className="text-xl">{approach.icon}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{approach.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {approach.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {approach.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${approach.gradient} mr-2`} />
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