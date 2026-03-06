'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const technologies = [
  {
    category: 'Cloud Providers',
    icon: '☁️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/cloud-platforms/tech-providers.jpg',
    items: [
      { name: 'AWS', level: 95, description: 'Compute, Storage, Database, ML' },
      { name: 'Microsoft Azure', level: 90, description: 'VMs, AKS, DevOps, Active Directory' },
      { name: 'Google Cloud', level: 85, description: 'GKE, BigQuery, Cloud Functions' },
      { name: 'Oracle Cloud', level: 80, description: 'IaaS, PaaS, Autonomous DB' },
    ]
  },
  {
    category: 'Containerization',
    icon: '🐳',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/cloud-platforms/tech-containers.jpg',
    items: [
      { name: 'Kubernetes', level: 95, description: 'Orchestration, EKS/AKS/GKE' },
      { name: 'Docker', level: 95, description: 'Container runtime, images' },
      { name: 'OpenShift', level: 85, description: 'Enterprise Kubernetes' },
      { name: 'Helm', level: 90, description: 'Package management' },
    ]
  },
  {
    category: 'Infrastructure as Code',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/cloud-platforms/tech-iac.jpg',
    items: [
      { name: 'Terraform', level: 95, description: 'Multi-cloud provisioning' },
      { name: 'CloudFormation', level: 90, description: 'AWS native IaC' },
      { name: 'Pulumi', level: 80, description: 'Modern IaC with programming languages' },
      { name: 'Ansible', level: 85, description: 'Configuration management' },
    ]
  },
  {
    category: 'CI/CD & DevOps',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/cloud-platforms/tech-cicd.jpg',
    items: [
      { name: 'Jenkins', level: 90, description: 'Automation server' },
      { name: 'GitHub Actions', level: 95, description: 'CI/CD pipelines' },
      { name: 'GitLab CI', level: 90, description: 'Integrated CI/CD' },
      { name: 'ArgoCD', level: 85, description: 'GitOps continuous delivery' },
    ]
  }
]

export default function Technologies() {
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
      
      {/* Tech Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage the latest cloud technologies to build robust, scalable, 
            and future-proof infrastructure.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {technologies.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: category.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image Header */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.category}
                      fill
                      className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-transparent" />
                    
                    {/* Category Header */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: category.gradient }}
                      >
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="p-6 space-y-4">
                    {category.items.map((tech, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-white">{tech.name}</span>
                            <p className="text-xs text-gray-500">{tech.description}</p>
                          </div>
                          <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">
                            {tech.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: category.gradient }}
                          />
                        </div>
                      </div>
                    ))}
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