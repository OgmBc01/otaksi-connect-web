'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const services = [
  {
    title: 'AWS Consulting & Management',
    description: 'Comprehensive AWS solutions including architecture design, migration, optimization, and managed services.',
    icon: '☁️',
    image: '/images/cloud-platforms/service-aws.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['EC2, S3, RDS', 'Lambda & Serverless', 'CloudFront & CDN', 'IAM & Security'],
    benefits: ['40% cost reduction', '99.99% uptime', 'Enterprise support']
  },
  {
    title: 'Azure Solutions',
    description: 'End-to-end Azure cloud services for enterprises, from infrastructure to AI and analytics.',
    icon: '🔷',
    image: '/images/cloud-platforms/service-azure.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Azure VMs & AKS', 'Azure SQL & Cosmos DB', 'Active Directory', 'DevOps & Pipelines'],
    benefits: ['Hybrid capability', 'Microsoft integration', 'Enterprise grade']
  },
  {
    title: 'Google Cloud Platform',
    description: 'Innovative GCP solutions leveraging Google\'s data, AI, and Kubernetes expertise.',
    icon: '🟢',
    image: '/images/cloud-platforms/service-gcp.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['GKE & Compute Engine', 'BigQuery & Dataflow', 'Cloud Functions', 'Firebase'],
    benefits: ['Data analytics', 'AI/ML ready', 'Global network']
  },
  {
    title: 'Multi-Cloud & Hybrid',
    description: 'Seamless management across multiple cloud providers and on-premise infrastructure.',
    icon: '🌐',
    image: '/images/cloud-platforms/service-multi.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Cross-cloud networking', 'Unified management', 'Workload portability', 'Disaster recovery'],
    benefits: ['Vendor independence', 'Best-of-breed', 'Resilience']
  },
  {
    title: 'Kubernetes & Containers',
    description: 'Container orchestration and management at scale with Kubernetes, Docker, and related technologies.',
    icon: '⚓',
    image: '/images/cloud-platforms/service-k8s.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['EKS/AKS/GKE', 'Docker', 'Helm charts', 'Service mesh'],
    benefits: ['Scalability', 'Portability', 'Resource efficiency']
  },
  {
    title: 'Cloud Security & Compliance',
    description: 'Comprehensive security solutions ensuring your cloud infrastructure meets UAE regulatory requirements.',
    icon: '🔒',
    image: '/images/cloud-platforms/service-security.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Identity & Access', 'Encryption', 'Compliance audits', 'Threat detection'],
    benefits: ['GDPR/PDPL compliant', 'Zero trust', '24/7 monitoring']
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
      
      {/* Cloud Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(91, 108, 255, 0.1) 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }} />
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
            Cloud{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cloud solutions tailored to your business needs, from migration 
            to optimization and everything in between.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: service.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: service.gradient }}
                      >
                        <span className="text-xl">{service.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: service.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {benefit}
                        </span>
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