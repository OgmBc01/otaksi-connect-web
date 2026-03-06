'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const solutions = [
  {
    title: 'Predictive Analytics',
    description: 'Forecast trends, predict customer behavior, and optimize operations with advanced machine learning models.',
    icon: '📊',
    image: '/images/ai-automation/solution-predictive.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    benefits: [
      'Reduce downtime by 40%',
      'Increase forecast accuracy by 35%',
      'Optimize inventory levels',
      'Identify market opportunities'
    ]
  },
  {
    title: 'Intelligent Document Processing',
    description: 'Automate data extraction from invoices, contracts, and forms with OCR and NLP technologies.',
    icon: '📄',
    image: '/images/ai-automation/solution-document.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    benefits: [
      '90% faster processing',
      '99.5% extraction accuracy',
      'Reduce manual errors',
      'Process 10,000+ docs/day'
    ]
  },
  {
    title: 'AI-Powered Chatbots',
    description: 'Enhance customer service with intelligent virtual assistants that understand context and intent.',
    icon: '💬',
    image: '/images/ai-automation/solution-chatbot.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    benefits: [
      '24/7 customer support',
      '80% query resolution rate',
      'Multi-language support',
      'Seamless human handoff'
    ]
  },
  {
    title: 'Process Automation',
    description: 'Automate repetitive workflows and business processes with intelligent RPA solutions.',
    icon: '⚙️',
    image: '/images/ai-automation/solution-rpa.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    benefits: [
      '70% reduction in processing time',
      'Eliminate manual errors',
      'Scale operations instantly',
      'ROI in 6-8 months'
    ]
  }
]

export default function Solutions() {
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
      
      {/* Data Flow Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent"
            style={{
              width: '100%',
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

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
            Intelligent{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tailored AI and automation solutions designed to address specific business 
            challenges across industries.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 bg-gradient-to-r ${solution.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Image Side */}
                    <div className="relative h-48 md:h-full overflow-hidden">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${solution.gradient} flex items-center justify-center`}>
                          <span className="text-2xl">{solution.icon}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {solution.description}
                      </p>
                      <div className="space-y-2">
                        {solution.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${solution.gradient} mr-2`} />
                            {benefit}
                          </div>
                        ))}
                      </div>
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