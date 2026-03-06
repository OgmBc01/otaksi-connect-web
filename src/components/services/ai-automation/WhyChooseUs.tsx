'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const reasons = [
  {
    title: 'AI-First Approach',
    description: 'We don\'t just add AI as an afterthought—we build intelligent systems designed from the ground up to leverage machine learning and automation.',
    icon: '🧠',
    image: '/images/ai-automation/why-ai-first.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '15+ AI patents filed'
  },
  {
    title: 'UAE Data Compliance',
    description: 'Full compliance with UAE data protection laws (PDPL), Dubai Data Law, and industry-specific regulations for finance, healthcare, and government.',
    icon: '🛡️',
    image: '/images/ai-automation/why-compliance.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '100% compliance rate'
  },
  {
    title: 'Proven ROI',
    description: 'Every AI solution is built with clear business metrics in mind—we measure success by the tangible value we deliver to your organization.',
    icon: '📈',
    image: '/images/ai-automation/why-roi.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '300% average ROI'
  },
  {
    title: 'Expert AI Team',
    description: 'Our team includes PhD-level data scientists, ML engineers, and AI researchers with deep experience across industries.',
    icon: '👥',
    image: '/images/ai-automation/why-team.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '50+ AI specialists'
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Cloud-native AI solutions that scale effortlessly from pilot projects to enterprise-wide deployment.',
    icon: '☁️',
    image: '/images/ai-automation/why-scalable.jpg',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '99.99% uptime'
  },
  {
    title: 'Continuous Learning',
    description: 'Models that improve over time—our systems continuously learn from new data, adapting to changing business conditions.',
    icon: '🔄',
    image: '/images/ai-automation/why-learning.jpg',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: 'Monthly model updates'
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
      
      {/* Neural Network Background */}
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
            <span className="gradient-text">AI & Automation</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine deep technical expertise with business acumen to deliver AI solutions 
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
                  className={`absolute -inset-0.5 bg-gradient-to-r ${reason.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
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
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${reason.gradient} flex items-center justify-center`}>
                        <span className="text-2xl">{reason.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Stats Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${reason.gradient} bg-opacity-10 text-white border border-white/10`}>
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
          <p className="text-sm text-gray-500 mb-6">Trusted by industry leaders in AI innovation</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['DHA', 'Emirates NBD', 'DP World', 'ADNOC', 'Etisalat', 'Majid Al Futtaim'].map((company, index) => (
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