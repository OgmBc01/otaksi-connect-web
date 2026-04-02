'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

const caseStudies = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Diagnosis',
    client: 'Medisys Health',
    description: 'Implemented computer vision system for medical imaging analysis, reducing diagnosis time by 40%.',
    image: '/images/ai-automation/case-study-1.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    results: '500K+ images analyzed with 95% accuracy',
    metrics: ['40% faster diagnosis', '95% accuracy rate', '15+ hospitals integrated'],
    slug: 'ehr-gulf-health'
  },
  {
    id: 2,
    title: 'Fraud Detection for Banking',
    client: 'SecureBank',
    description: 'Real-time ML model detecting fraudulent transactions with 99.9% accuracy, saving millions in potential losses.',
    image: '/images/ai-automation/case-study-2.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    results: '99.9% accuracy, 2M+ transactions processed',
    metrics: ['99.9% accuracy', 'Real-time detection', '50% false positive reduction'],
    slug: 'emirates-nbd-fraud-detection'
  },
  {
    id: 3,
    title: 'Predictive Maintenance for Logistics',
    client: 'LogistiX Solutions',
    description: 'IoT sensors + ML models predict equipment failures before they occur, reducing downtime by 35%.',
    image: '/images/ai-automation/case-study-3.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    results: '35% downtime reduction, 10K+ sensors monitored',
    metrics: ['35% less downtime', '40% cost savings', 'Real-time monitoring'],
    slug: 'fleet-management-gulf-logistics'
  },
  {
    id: 4,
    title: 'Personalized Recommendation Engine',
    client: 'OmniMart',
    description: 'AI-powered product recommendations increasing cross-sell and customer engagement.',
    image: '/images/ai-automation/case-study-4.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    results: '45% increase in cross-sell, 5M+ users',
    metrics: ['45% revenue lift', '60% engagement boost', 'Real-time personalization'],
    slug: 'multi-vendor-marketplace'
  }
]

export default function CaseStudies() {
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
            AI Success{' '}
            <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading UAE enterprises transform their operations 
            with intelligent automation.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className={`absolute -inset-0.5 bg-gradient-to-r ${study.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                  />
                  
                  {/* Card */}
                  <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                      
                      {/* Client Badge */}
                      <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs border border-white/10">
                        {study.client}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${study.gradient} mr-2`} />
                            {metric}
                          </div>
                        ))}
                      </div>

                      {/* Result Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${study.gradient} bg-opacity-10 text-white border border-white/10`}>
                        {study.results}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span>View All AI Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
