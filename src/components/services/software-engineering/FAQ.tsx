'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const faqs = [
  {
    question: 'What is your software development process?',
    answer: 'We follow an agile methodology with 2-week sprints. Each sprint includes planning, development, testing, and a demo. This ensures transparency, flexibility, and regular progress updates throughout the project lifecycle.',
    category: 'Process'
  },
  {
    question: 'How do you ensure code quality?',
    answer: 'We maintain 90%+ code coverage through automated testing, conduct regular code reviews, use static code analysis tools, and follow industry best practices like SOLID principles and design patterns.',
    category: 'Quality'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'Our core expertise includes React/Next.js for frontend, Node.js/Python for backend, AWS/Azure for cloud, and Kubernetes/Docker for containerization. We select the best tech stack based on your specific requirements.',
    category: 'Technology'
  },
  {
    question: 'How do you handle project timelines and budgets?',
    answer: 'We provide detailed estimates during the discovery phase, maintain transparent tracking through project management tools, and alert you immediately if any factors might impact timeline or budget.',
    category: 'Project Management'
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, we offer comprehensive maintenance packages including 24/7 monitoring, bug fixes, security updates, performance optimization, and feature enhancements.',
    category: 'Support'
  },
  {
    question: 'How do you protect intellectual property?',
    answer: 'We sign NDAs, maintain strict access controls, use encrypted repositories, and ensure all code and deliverables are legally transferred to you upon project completion.',
    category: 'Security'
  },
  {
    question: 'What is your experience with UAE businesses?',
    answer: 'We have 5+ years of experience serving UAE enterprises across banking, healthcare, logistics, and government sectors. We understand local regulations, business practices, and market dynamics.',
    category: 'Experience'
  },
  {
    question: 'How do you handle communication and reporting?',
    answer: 'We provide daily updates through project management tools, weekly progress reports, and bi-weekly demos. You have direct access to the development team and project manager.',
    category: 'Communication'
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
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about our software engineering services.
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
                className="glass-card rounded-2xl border border-white/10 overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {/* Question */}
                <div className="p-6 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-500">{faq.category}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {faq.question}
                    </h3>
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
                  <div className="p-6 pt-0 border-t border-white/10">
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
          <p className="text-gray-400 mb-4">
            Still have questions? We're here to help.
          </p>
          <button className="glass-card px-8 py-3 gradient-text font-medium hover:scale-105 transition-transform duration-300 rounded-xl border border-white/10 hover:border-white/20">
            Contact Our Team
          </button>
        </motion.div>
      </div>
    </section>
  )
}