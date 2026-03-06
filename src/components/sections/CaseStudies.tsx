'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Digital Banking Platform',
    client: 'Emirates NBD',
    industry: 'FinTech',
    location: 'Dubai, UAE',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    challenge: 'Legacy banking system struggling with 500K+ daily transactions, 3-second latency, and limited mobile capabilities.',
    solution: 'Built a cloud-native microservices platform with real-time processing, AI-powered fraud detection, and seamless mobile integration.',
    impact: [
      '99.99% uptime achieved',
      '200ms average transaction time',
      '2M+ active users',
      '45% reduction in operational costs'
    ],
    technologies: ['React Native', 'Node.js', 'AWS', 'Kubernetes', 'MongoDB', 'Redis'],
    image: '🏦',
    results: 'Processed AED 2.5B+ in transactions within first month'
  },
  {
    id: 2,
    title: 'Smart Logistics Platform',
    client: 'DP World',
    industry: 'Logistics',
    location: 'Jebel Ali, Dubai',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    challenge: 'Manual tracking processes causing delays, lost containers, and inefficient route planning across Jebel Ali port.',
    solution: 'IoT-enabled tracking system with real-time container monitoring, predictive analytics for route optimization, and automated documentation.',
    impact: [
      '30% faster container processing',
      'Real-time tracking for 10K+ containers',
      '25% reduction in fuel costs',
      'Automated 50K+ documents/month'
    ],
    technologies: ['IoT', 'Python', 'TensorFlow', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    image: '🚢',
    results: 'Processing 1M+ shipments annually with 99.9% accuracy'
  },
  {
    id: 3,
    title: 'AI-Powered Healthcare',
    client: 'DHA',
    industry: 'Healthcare',
    location: 'Dubai Healthcare City',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    challenge: 'Fragmented patient records across 15+ hospitals, slow diagnosis times, and manual appointment scheduling.',
    solution: 'Unified healthcare platform with AI-assisted diagnosis, predictive patient analytics, and automated scheduling system.',
    impact: [
      '500K+ patient records unified',
      '40% faster diagnosis',
      '60% reduction in wait times',
      'Integrated 15+ hospitals'
    ],
    technologies: ['React', 'FastAPI', 'PyTorch', 'FHIR', 'Redis', 'Docker'],
    image: '🏥',
    results: 'Serving 2M+ patients across Dubai'
  },
  {
    id: 4,
    title: 'E-commerce Marketplace',
    client: 'Majid Al Futtaim',
    industry: 'Retail',
    location: 'Dubai, UAE',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    challenge: 'Outdated e-commerce platform unable to handle peak traffic (1M+ users), poor mobile experience, and inventory sync issues.',
    solution: 'Headless commerce platform with progressive web app, real-time inventory sync, and AI-powered recommendations.',
    impact: [
      '5M+ monthly active users',
      '200% increase in mobile conversion',
      'Real-time inventory for 100+ stores',
      '99.99% Black Friday uptime'
    ],
    technologies: ['Next.js', 'GraphQL', 'AWS', 'Elasticsearch', 'Kafka', 'Redis'],
    image: '🛍️',
    results: 'Processed AED 1B+ in annual digital sales'
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91, 108, 255, 0.1) 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }} />

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
            Client{' '}
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real results for leading UAE enterprises through innovative software solutions 
            and engineering excellence.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="relative group"
              onHoverStart={() => setHoveredId(study.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Card Container */}
              <div 
                className={`relative cursor-pointer transition-all duration-500 ${
                  expandedId === study.id ? 'md:col-span-2 scale-100' : ''
                }`}
                onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
              >
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-1 bg-linear-to-r ${study.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 ${
                    expandedId === study.id ? 'opacity-40' : ''
                  }`} 
                />

                {/* Card */}
                <div className={`relative glass-card overflow-hidden transition-all duration-500 ${
                  expandedId === study.id ? 'p-8' : 'p-6'
                }`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Icon/Image Placeholder */}
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${study.gradient} bg-opacity-10 flex items-center justify-center text-2xl`}>
                          {study.image}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                            {study.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{study.client}</span>
                            <span>•</span>
                            <span>{study.industry}</span>
                            <span>•</span>
                            <span>{study.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expand/Collapse Indicator */}
                      <motion.div
                        animate={{ rotate: expandedId === study.id ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Result Badge (always visible) */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-linear-to-r ${study.gradient} bg-opacity-10 text-white`}>
                      {study.results}
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedId === study.id ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-6">
                            {/* Challenge & Solution */}
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className="w-1 h-4 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full" />
                                  Challenge
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                  {study.challenge}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className="w-1 h-4 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full" />
                                  Solution
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                  {study.solution}
                                </p>
                              </div>
                            </div>

                            {/* Impact Metrics */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Outcomes</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {study.impact.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                                    <span className="text-sm text-gray-400">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        /* Preview Content (when collapsed) */
                        <motion.div
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex gap-4">
                            {study.impact.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="w-1 h-1 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]" />
                                {item}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs gradient-text opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to expand →
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Cases CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="glass-card px-8 py-4 gradient-text font-medium hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2 group">
            View All Case Studies
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}