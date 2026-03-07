'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'What is DevOps and how can it benefit my organization?',
    answer: 'DevOps combines development and operations to shorten development cycles, increase deployment frequency, and deliver more reliable releases. Benefits include faster time-to-market, improved collaboration, reduced failures, and faster recovery times.',
    category: 'General',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How long does a DevOps transformation take?',
    answer: 'Timelines vary based on complexity. A basic CI/CD pipeline can be implemented in 4-6 weeks. Full organizational transformation with cultural change typically takes 6-12 months. We deliver value incrementally throughout the journey.',
    category: 'Timeline',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'What is Site Reliability Engineering (SRE)?',
    answer: 'SRE applies software engineering principles to operations. It uses service level indicators (SLIs), service level objectives (SLOs), and error budgets to balance reliability with feature velocity. SRE teams automate operations, reduce toil, and improve system reliability.',
    category: 'SRE',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you ensure security in DevOps?',
    answer: 'We implement DevSecOps practices including security scanning in CI/CD pipelines, infrastructure as code security, secrets management, container scanning, and compliance as code. Security is integrated throughout the development lifecycle, not added at the end.',
    category: 'Security',
    icon: '🔒',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'What tools do you use for monitoring?',
    answer: 'We use industry-leading tools including Prometheus for metrics, Grafana for visualization, ELK Stack for logs, Jaeger for tracing, and Datadog for comprehensive observability. We select tools based on your specific needs and existing stack.',
    category: 'Monitoring',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'How do you handle container orchestration?',
    answer: 'We specialize in Kubernetes (EKS, AKS, GKE) for container orchestration, including service mesh (Istio), package management (Helm), and GitOps workflows (ArgoCD). We design for scalability, resilience, and operational efficiency.',
    category: 'Containers',
    icon: '⎈',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  },
  {
    question: 'What is Infrastructure as Code?',
    answer: 'Infrastructure as Code (IaC) manages infrastructure through machine-readable definition files, enabling version control, automated provisioning, and consistent environments. We use Terraform, CloudFormation, and Pulumi across AWS, Azure, and GCP.',
    category: 'IaC',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer comprehensive managed services including 24/7 monitoring, incident response, performance optimization, cost management, and continuous improvement. We can act as your extended SRE team.',
    category: 'Support',
    icon: '🔧',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)'
  }
]

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for FAQ section (terminal with commands)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()

    // Create terminal command history
    const history: { x: number; y: number; text: string; opacity: number }[] = []
    const commands = [
      '$ kubectl get pods -n production',
      '$ terraform plan',
      '$ docker ps',
      '$ git commit -m "fix"',
      '$ helm upgrade release',
      '$ prometheus query',
      '$ ansible-playbook deploy.yml',
      '$ k9s'
    ]

    for (let i = 0; i < 20; i++) {
      history.push({
        x: 20 + Math.random() * 300,
        y: i * 30,
        text: commands[Math.floor(Math.random() * commands.length)],
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    // Create blinking cursor
    let cursorY = 0
    let cursorBlink = 0

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Scroll terminal history
      history.forEach((line) => {
        line.y -= 0.1

        if (line.y < 0) {
          line.y = canvas.height
          line.x = 20 + Math.random() * 300
        }

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(91, 108, 255, ${line.opacity})`
        ctx.fillText(line.text, line.x, line.y)
      })

      // Draw blinking cursor
      cursorBlink += 0.05
      if (Math.sin(cursorBlink) > 0) {
        ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
        ctx.fillRect(20, canvas.height - 40, 10, 2)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

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
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-linear-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full blur-3xl" />
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
            DevOps & SRE{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about DevOps, SRE, and how they can 
            transform your software delivery.
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
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-1">Still have questions?</h3>
                  <p className="text-sm text-gray-400">Our DevOps experts are ready to help</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}