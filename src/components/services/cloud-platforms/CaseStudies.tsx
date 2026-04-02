'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

const caseStudies = [
  {
    id: 1,
    title: 'AWS Migration for Financial Services',
    client: 'Nimbus Capital', // matches Cloud Migration Journey
    description: 'Migrated 50+ critical banking applications to AWS with zero downtime, achieving 40% cost reduction and enhanced security.',
    image: '/images/cloud-platforms/case-study-1.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '40% cost reduction, 99.99% uptime',
    metrics: ['50+ apps migrated', 'Zero downtime', 'PCI DSS compliant'],
    slug: 'cloud-migration-gulf-financial'
  },
  {
    id: 2,
    title: 'Hybrid Cloud for Logistics Giant',
    client: 'LogistiX Solutions', // best match for logistics
    description: 'Implemented hybrid cloud solution connecting on-premise systems with Azure, enabling real-time tracking across global ports.',
    image: '/images/cloud-platforms/case-study-2.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: 'Real-time tracking, 30% efficiency gain',
    metrics: ['10K+ containers tracked', 'Global deployment', '99.9% availability'],
    slug: 'fleet-management-gulf-logistics'
  },
  {
    id: 3,
    title: 'Kubernetes Modernization',
    client: 'Medisys Health', // best match for healthcare
    description: 'Modernized healthcare applications with Kubernetes on GCP, enabling auto-scaling and improved patient data access.',
    image: '/images/cloud-platforms/case-study-3.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    results: '60% faster deployments, auto-scaling',
    metrics: ['15+ microservices', '2M+ patient records', 'HIPAA compliant'],
    slug: 'ehr-gulf-health'
  },
  {
    id: 4,
    title: 'Multi-Cloud Strategy',
    client: 'OmniMart', // best match for e-commerce
    description: 'Designed and implemented multi-cloud strategy across AWS and Azure for e-commerce platform handling peak traffic.',
    image: '/images/cloud-platforms/case-study-4.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    results: '5M+ users served, 200% peak handling',
    metrics: ['Multi-cloud active-active', 'Black Friday ready', '99.99% uptime'],
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
      
      {/* Cloud Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            Cloud Success{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've helped leading UAE enterprises transform their infrastructure 
            and achieve remarkable results with cloud technology.
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
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                    style={{ background: study.gradient }}
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
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <span 
                              className="w-1 h-1 rounded-full mr-2"
                              style={{ background: study.gradient }}
                            />
                            {metric}
                          </div>
                        ))}
                      </div>

                      {/* Result Badge */}
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                        style={{ 
                          background: `${study.gradient}`, 
                          opacity: 0.9 
                        }}
                      >
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
            <span>View All Cloud Case Studies</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
