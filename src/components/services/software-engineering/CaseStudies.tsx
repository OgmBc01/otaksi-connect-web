'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

const caseStudies = [
  {
    id: 1,
    title: 'Digital Banking Platform',
    client: 'Gulf Financial',
    description: 'Built a cloud-native microservices platform handling 500K+ daily transactions with 200ms latency.',
    image: '🏦',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    technologies: ['React Native', 'Node.js', 'AWS', 'Kubernetes'],
    results: '99.99% uptime, 2M+ active users',
    slug: 'digital-banking-gulf-financial'
  },
  {
    id: 2,
    title: 'E-commerce Marketplace',
    client: 'Gulf Mart',
    description: 'Headless commerce platform handling 5M+ monthly users with real-time inventory sync.',
    image: '🛍️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    technologies: ['Next.js', 'GraphQL', 'AWS', 'Elasticsearch'],
    results: '200% increase in mobile conversion',
    slug: 'multi-vendor-marketplace'
  },
  {
    id: 3,
    title: 'Healthcare Portal',
    client: 'Gulf Health System',
    description: 'Unified healthcare platform serving 2M+ patients across 15+ hospitals in Dubai.',
    image: '🏥',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    technologies: ['React', 'Python', 'FHIR', 'PostgreSQL'],
    results: '40% faster diagnosis, 500K+ records',
    slug: 'ehr-gulf-health'
  },
  {
    id: 4,
    title: 'Logistics Tracking System',
    client: 'Gulf Logistics',
    description: 'IoT-enabled tracking platform for real-time container monitoring at Jebel Ali port.',
    image: '🚢',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    technologies: ['IoT', 'Python', 'TensorFlow', 'RabbitMQ'],
    results: '30% faster processing, 1M+ shipments',
    slug: 'fleet-management-gulf-logistics'
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
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            Success{' '}
            <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading UAE enterprises transform their businesses 
            through exceptional software engineering.
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
                    className={`absolute -inset-0.5 bg-linear-to-r ${study.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                  />
                  
                  {/* Card */}
                  <div className="relative h-full glass-card p-8 rounded-2xl border border-white/10 group-hover:border-white/20">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-r ${study.gradient} rounded-full blur-3xl`} />
                      <div className={`absolute bottom-0 left-0 w-32 h-32 bg-linear-to-r ${study.gradient} rounded-full blur-3xl`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Icon */}
                          <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${study.gradient} bg-opacity-10 flex items-center justify-center text-3xl border border-white/10`}>
                            {study.image}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                              {study.title}
                            </h3>
                            <p className="text-sm text-gray-500">{study.client}</p>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <svg className="w-4 h-4 text-gray-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 mb-4">
                        {study.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Results */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${study.gradient} bg-opacity-10 text-white border border-white/10`}>
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
            <span>View All Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
