'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'

const faqs = [
  {
    question: 'What types of AI solutions do you offer?',
    answer: 'We offer a comprehensive range of AI solutions including machine learning models for predictive analytics, computer vision systems for image analysis, natural language processing for text understanding, and robotic process automation for workflow optimization. Each solution is tailored to your specific business needs.',
    category: 'Services',
    icon: '🤖'
  },
  {
    question: 'How much data do I need to start an AI project?',
    answer: 'The amount of data needed depends on the complexity of the problem. For some use cases, we can start with as little as 1,000 labeled examples. For more complex applications like computer vision, we typically recommend 5,000-10,000 samples. We also work with you to augment existing data and can help with data collection strategies.',
    category: 'Data',
    icon: '📊'
  },
  {
    question: 'How long does it take to develop an AI solution?',
    answer: 'Timelines vary based on complexity. A proof of concept typically takes 4-8 weeks. Full production deployment can range from 3-6 months for standard solutions to 6-12 months for complex, enterprise-wide implementations. We follow agile methodology with regular deliverables throughout the process.',
    category: 'Timeline',
    icon: '⏱️'
  },
  {
    question: 'How do you ensure AI models are accurate and reliable?',
    answer: 'We follow rigorous testing protocols including cross-validation, A/B testing, and continuous monitoring. Models are trained on diverse datasets to prevent bias, and we maintain separate training, validation, and test sets. Post-deployment, we monitor performance metrics and retrain models as needed.',
    category: 'Quality',
    icon: '✅'
  },
  {
    question: 'Can AI integrate with my existing systems?',
    answer: 'Yes, we design all solutions with integration in mind. Whether you use SAP, Oracle, Salesforce, or custom-built systems, we create APIs and microservices that seamlessly connect with your existing infrastructure. We support on-premise, cloud, or hybrid deployments.',
    category: 'Integration',
    icon: '🔌'
  },
  {
    question: 'How do you handle data privacy and security?',
    answer: 'We implement enterprise-grade security including encryption at rest and in transit, role-based access control, and audit logging. All solutions comply with UAE data protection laws (PDPL) and industry-specific regulations like HIPAA for healthcare or PCI DSS for finance.',
    category: 'Security',
    icon: '🔒'
  },
  {
    question: 'What is the ROI timeline for AI investments?',
    answer: 'Most clients see positive ROI within 6-12 months of deployment. Efficiency gains from automation typically show immediate results, while predictive analytics and revenue-generating applications may take 3-6 months to reach full potential. We provide detailed ROI projections during the discovery phase.',
    category: 'ROI',
    icon: '💰'
  },
  {
    question: 'Do you provide ongoing support and model maintenance?',
    answer: 'Yes, we offer comprehensive maintenance packages including model retraining, performance monitoring, feature updates, and technical support. Models can drift over time as data patterns change, so regular maintenance ensures continued accuracy and relevance.',
    category: 'Support',
    icon: '🔧'
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
      
      {/* Decorative AI Pattern */}
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
            AI & Automation{' '}
            <span className="gradient-text">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about implementing AI and automation 
            in your business.
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
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
                      index % 2 === 0 ? 'from-[#FF2E9F] to-[#5B6CFF]' : 'from-[#5B6CFF] to-[#FF2E9F]'
                    } bg-opacity-10 flex items-center justify-center text-xl border border-white/10`}>
                      {faq.icon}
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
                  <p className="text-sm text-gray-400">Our AI experts are ready to help</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}