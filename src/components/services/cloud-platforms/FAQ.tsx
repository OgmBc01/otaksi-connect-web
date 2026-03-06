'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const faqs = [
  {
    question: 'Which cloud provider is best for my business?',
    answer: 'The best cloud provider depends on your specific needs. AWS offers the broadest service portfolio, Azure integrates seamlessly with Microsoft products, and GCP excels in data analytics and AI. We help you evaluate based on factors like existing infrastructure, technical requirements, budget, and compliance needs.',
    category: 'Selection',
    icon: '☁️',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How long does a cloud migration take?',
    answer: 'Timelines vary based on complexity. A simple lift-and-shift of 10-20 servers might take 2-4 weeks. Complex migrations involving 50+ applications with re-architecting can take 3-6 months. We provide detailed timelines during the assessment phase.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'How do you ensure security during migration?',
    answer: 'We follow a security-first approach with encryption in transit and at rest, identity and access management, network segmentation, and continuous monitoring. All migrations comply with UAE data protection laws and industry-specific regulations.',
    category: 'Security',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What is the cost of cloud migration?',
    answer: 'Costs depend on scope, complexity, and chosen provider. We provide detailed TCO analysis comparing current on-premise costs with projected cloud spending. Most clients see ROI within 12-18 months through reduced infrastructure costs and increased efficiency.',
    category: 'Pricing',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'Do you provide managed services after migration?',
    answer: 'Yes, we offer comprehensive managed services including 24/7 monitoring, patch management, backup & disaster recovery, cost optimization, and technical support. Choose from basic monitoring to full infrastructure management.',
    category: 'Support',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you handle downtime during migration?',
    answer: 'We use blue-green deployment strategies and data replication to minimize downtime. For critical systems, we plan migrations during maintenance windows and ensure rollback procedures are in place. Most migrations achieve zero-downtime.',
    category: 'Reliability',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'Can you help with cloud cost optimization?',
    answer: 'Absolutely. We continuously monitor usage, right-size resources, leverage reserved instances, and implement auto-scaling. Our clients typically see 30-40% cost reduction within the first year.',
    category: 'Optimization',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'What about hybrid cloud and on-premise integration?',
    answer: 'We specialize in hybrid architectures that seamlessly connect cloud environments with on-premise infrastructure using VPN, Direct Connect, or ExpressRoute. This is ideal for businesses with data residency requirements or legacy systems.',
    category: 'Hybrid',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  }
]

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
    hidden: { y: 20, opacity: 0 },
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
      
      {/* Decorative Cloud Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about cloud migration, management, 
            and optimization.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div
                className="glass-card rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {/* Question */}
                <div className="p-6 flex items-start justify-between">
                  <div className="flex-1 flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-white/10"
                      style={{ background: faq.gradient, opacity: 0.2 }}
                    >
                      <span style={{ opacity: 1 }}>{faq.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium text-gray-500">{faq.category}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </div>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-white/10 ml-14">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-1">Still have questions?</h3>
                  <p className="text-sm text-gray-400">Our cloud experts are ready to help</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
                Schedule a Cloud Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}