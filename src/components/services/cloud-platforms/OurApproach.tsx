'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const approaches = [
  {
    title: 'Cloud Strategy & Consulting',
    description: 'We help you define the right cloud strategy—whether public, private, hybrid, or multi-cloud—aligned with your business goals.',
    icon: '📋',
    image: '/images/cloud-platforms/approach-strategy.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Cloud Readiness Assessment', 'Total Cost of Ownership Analysis', 'Migration Roadmap', 'Security & Compliance Planning']
  },
  {
    title: 'Cloud Migration',
    description: 'Seamless migration of applications, data, and workloads to the cloud with minimal disruption and zero downtime.',
    icon: '🚀',
    image: '/images/cloud-platforms/approach-migration.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Lift & Shift', 'Re-platforming', 'Re-architecting', 'Database Migration']
  },
  {
    title: 'Cloud-Native Development',
    description: 'Build modern, scalable applications designed specifically for cloud environments using containers, microservices, and serverless.',
    icon: '⚙️',
    image: '/images/cloud-platforms/approach-native.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['Microservices Architecture', 'Containerization', 'Serverless Computing', 'API Design']
  },
  {
    title: 'DevOps & Automation',
    description: 'Implement DevOps practices to accelerate delivery, improve reliability, and automate infrastructure management.',
    icon: '🔄',
    image: '/images/cloud-platforms/approach-devops.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Configuration Management', 'Monitoring & Observability']
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Approach</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive methodology for cloud transformation that ensures security, 
            scalability, and business continuity.
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
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: approach.gradient }}
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
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: approach.gradient }}
                      >
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
                          <span 
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ background: approach.gradient }}
                          />
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