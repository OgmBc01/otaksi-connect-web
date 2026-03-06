'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const reasons = [
  {
    title: 'Certified Cloud Experts',
    description: 'Our team holds top-tier certifications across AWS, Azure, and Google Cloud, ensuring best-in-class expertise.',
    icon: '🏆',
    image: '/images/cloud-platforms/why-certified.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '50+ cloud certifications'
  },
  {
    title: 'UAE Data Sovereignty',
    description: 'We ensure all cloud solutions comply with UAE data residency laws and regional regulatory requirements.',
    icon: '🛡️',
    image: '/images/cloud-platforms/why-compliance.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '100% compliance guaranteed'
  },
  {
    title: 'Cost Optimization',
    description: 'We continuously monitor and optimize cloud spending, typically reducing costs by 30-40% without compromising performance.',
    icon: '💰',
    image: '/images/cloud-platforms/why-cost.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '40% average savings'
  },
  {
    title: '24/7 Managed Services',
    description: 'Round-the-clock monitoring, support, and incident response to ensure your cloud infrastructure runs smoothly.',
    icon: '⚡',
    image: '/images/cloud-platforms/why-support.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: '15-minute response time'
  },
  {
    title: 'Disaster Recovery',
    description: 'Comprehensive backup and disaster recovery solutions to protect your data and ensure business continuity.',
    icon: '🔄',
    image: '/images/cloud-platforms/why-dr.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    stats: '99.99% data durability'
  },
  {
    title: 'Multi-Cloud Strategy',
    description: 'Avoid vendor lock-in with our multi-cloud expertise, leveraging the best services from each provider.',
    icon: '🌐',
    image: '/images/cloud-platforms/why-multi.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    stats: 'AWS, Azure, GCP certified'
  }
]

export default function WhyChooseUs() {
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
      
      {/* Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91, 108, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Data Stream Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E9F] to-transparent opacity-30" />

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
            Why Choose Us for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Cloud</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine deep technical expertise with business acumen to deliver cloud solutions 
            that drive real competitive advantage.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: reason.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: reason.gradient }}
                      >
                        <span className="text-2xl">{reason.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Stats Badge */}
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                      style={{ 
                        background: `${reason.gradient}`, 
                        opacity: 0.9 
                      }}
                    >
                      {reason.stats}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">Trusted by leading UAE enterprises for cloud transformation</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Emirates NBD', 'DP World', 'DHA', 'Majid Al Futtaim', 'ADNOC', 'Etisalat'].map((company, index) => (
              <span key={index} className="text-sm text-gray-400 font-medium">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}