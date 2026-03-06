'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const reasons = [
  {
    title: 'UAE Market Expertise',
    description: 'Deep understanding of local business requirements, regulations, and market dynamics across Dubai, Abu Dhabi, and the wider UAE.',
    icon: '🇦🇪',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '5+ years in UAE'
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Bank-level security practices, data encryption, and compliance with UAE data protection regulations (PDPL).',
    icon: '🔒',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: 'ISO 27001 compliant'
  },
  {
    title: 'Scalable Architecture',
    description: 'Systems designed to grow from startup to enterprise scale without compromising performance or reliability.',
    icon: '📈',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '99.9% scalability'
  },
  {
    title: 'Agile Methodology',
    description: 'Iterative development with continuous feedback, ensuring your project adapts to changing requirements.',
    icon: '🔄',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '2-week sprints'
  },
  {
    title: 'Dedicated Team',
    description: 'Access to senior engineers, architects, and QA specialists who are fully committed to your project success.',
    icon: '👥',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '50+ engineers'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock monitoring, maintenance, and support to ensure your systems run smoothly at all times.',
    icon: '⚡',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '99.9% uptime'
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
      
      {/* Data Stream Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#FF2E9F] to-transparent opacity-30" />

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
            Why Choose{' '}
            <span className="gradient-text">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine technical excellence with deep industry knowledge to deliver 
            software that drives real business outcomes.
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
                  className={`absolute -inset-0.5 bg-linear-to-r ${reason.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card p-8 rounded-2xl border border-white/10 group-hover:border-white/20">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-xl bg-linear-to-r ${reason.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative w-14 h-14 rounded-xl bg-midnight border border-white/10 flex items-center justify-center">
                      <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {reason.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Stats Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${reason.gradient} bg-opacity-10 text-white border border-white/10`}>
                    {reason.stats}
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
          <p className="text-sm text-gray-500 mb-6">Trusted by leading UAE enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Emirates NBD', 'DP World', 'DHA', 'Majid Al Futtaim', 'ADNOC', 'Etisalat'].map((company, index) => (
              <span key={index} className="text-sm text-gray-400">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}