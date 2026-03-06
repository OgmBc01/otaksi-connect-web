'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const capabilities = [
  {
    title: 'Software Engineering',
    description: 'Enterprise-grade web and mobile applications built with modern architectures and robust API integrations.',
    icon: '💻',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    technologies: ['React/Next.js', 'Node.js', 'Python', 'Java', '.NET Core', 'Microservices'],
    deliverables: ['Custom Web Apps', 'Mobile Apps (iOS/Android)', 'API Development', 'Legacy Modernization'],
    expertise: '15+ enterprise projects delivered in UAE'
  },
  {
    title: 'Enterprise Web Systems',
    description: 'Scalable, secure, and high-performance web platforms for mission-critical business operations.',
    icon: '🌐',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    technologies: ['AWS/Azure/GCP', 'Kubernetes', 'Docker', 'GraphQL', 'PostgreSQL', 'MongoDB'],
    deliverables: ['ERP Systems', 'CRM Platforms', 'Portals & Dashboards', 'E-commerce Solutions'],
    expertise: '99.9% uptime for enterprise clients'
  },
  {
    title: 'Cloud Platforms',
    description: 'Cloud-native solutions with DevOps practices, containerization, and serverless architectures.',
    icon: '☁️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Jenkins', 'GitHub Actions'],
    deliverables: ['Cloud Migration', 'Infrastructure as Code', 'CI/CD Pipelines', 'Cloud Optimization'],
    expertise: '40% average cost reduction'
  },
  {
    title: 'AI & Automation',
    description: 'Intelligent automation solutions powered by machine learning and computer vision.',
    icon: '🤖',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'RPA', 'NLP'],
    deliverables: ['ML Models', 'Process Automation', 'Computer Vision', 'Chatbots & Assistants'],
    expertise: '85% efficiency improvement'
  }
]

export default function EngineeringCapabilities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#5B6CFF] to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-[#FF2E9F] to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#5B6CFF] to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E9F] to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E9F] to-transparent" />
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
            Engineering{' '}
            <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Deep technical expertise across the modern software engineering landscape, 
            delivering enterprise-grade solutions for UAE organizations.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              {/* Card Container with Border */}
              <div className="relative h-full">
                {/* Glow Effect - Matching Industries and What We Do */}
                <div 
                  className={`absolute -inset-0.5 bg-gradient-to-r ${capability.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Premium Card with Border */}
                <div className="relative h-full glass-card p-8 transition-all duration-500 rounded-2xl border border-white/10 group-hover:border-white/20 hover:scale-[1.02]">
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden pointer-events-none">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${capability.gradient} rounded-full blur-3xl`} />
                    <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r ${capability.gradient} rounded-full blur-3xl`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with Icon and Expand Indicator */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        {/* Icon with Gradient Border */}
                        <div className="relative">
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${capability.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                          <div className="relative w-16 h-16 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center overflow-hidden">
                            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-500">
                              {capability.icon}
                            </span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                          {capability.title}
                        </h3>
                      </div>

                      {/* Expand/Collapse Indicator - Matching Industries */}
                      <motion.div
                        animate={{ rotate: expandedCard === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {capability.description}
                    </p>

                    {/* Expertise Badge - Matching Stats Badge Style */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 bg-gradient-to-r ${capability.gradient} bg-opacity-10 text-white border border-white/10`}>
                      {capability.expertise}
                    </div>

                    {/* Expanded Content */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: expandedCard === index ? 'auto' : 0,
                        opacity: expandedCard === index ? 1 : 0
                      }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {capability.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Deliverables</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {capability.deliverables.map((item, idx) => (
                              <div key={idx} className="flex items-center text-xs text-gray-400">
                                <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${capability.gradient} mr-2`} />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Learn More Button (shown when collapsed) */}
                    {expandedCard !== index && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-6"
                      >
                        <button className="text-sm font-medium gradient-text hover:opacity-80 transition-opacity flex items-center gap-2 group/btn">
                          View Technologies & Deliverables
                          <svg 
                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card inline-block p-1 rounded-xl border border-white/10">
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-8 py-4 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg font-medium hover:opacity-90 transition-opacity">
                Discuss Your Project
              </button>
              <button className="px-8 py-4 rounded-lg font-medium hover:bg-white/5 transition-colors">
                Download Capabilities Deck
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}