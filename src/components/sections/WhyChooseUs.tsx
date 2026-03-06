'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'

const benefits = [
  {
    title: 'Engineering-First Approach',
    description: 'We build systems with clean code, scalable architecture, and best engineering practices—not shortcuts. Every solution is crafted for long-term success.',
    icon: '⚙️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: '100% code coverage',
    details: [
      'Test-driven development',
      'Clean architecture patterns',
      'Code reviews & pair programming',
      'Continuous integration'
    ]
  },
  {
    title: 'Scalable Architecture',
    description: 'Systems designed to grow with your business—from startup to enterprise scale without compromising performance or reliability.',
    icon: '📈',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '99.9% scalability',
    details: [
      'Microservices ready',
      'Horizontal scaling',
      'Load balancing',
      'Caching strategies'
    ]
  },
  {
    title: 'Security-Driven Systems',
    description: 'Security embedded at every layer—from code to infrastructure. We protect your data and ensure compliance with UAE regulations.',
    icon: '🔒',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    stats: 'ISO 27001 compliant',
    details: [
      'Penetration testing',
      'Data encryption',
      'GDPR & UAE PDPL',
      'Regular audits'
    ]
  },
  {
    title: 'Global Development Capability',
    description: 'Access top-tier talent across Dubai and international tech hubs. We bring global expertise with local understanding.',
    icon: '🌍',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    stats: '50+ engineers',
    details: [
      'Dubai-based team',
      'Global talent network',
      '24/7 support',
      'Multi-timezone delivery'
    ]
  }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  // Data stream animation
  useEffect(() => {
    if (!inView) return

    const container = containerRef.current
    if (!container) return

    const createDataStream = () => {
      const stream = document.createElement('div')
      stream.className = 'absolute h-px bg-gradient-to-r from-transparent via-[#5B6CFF] to-transparent'
      stream.style.width = '100%'
      stream.style.left = '0'
      stream.style.animation = 'dataStream 3s linear infinite'
      return stream
    }

    const dividers = container.querySelectorAll('.data-stream-divider')
    dividers.forEach((divider) => {
      for (let i = 0; i < 3; i++) {
        const stream = createDataStream()
        stream.style.top = `${i * 4}px`
        stream.style.animationDelay = `${i * 0.5}s`
        divider.appendChild(stream)
      }
    })

    // Add keyframe animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes dataStream {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  // Hydration-safe random binary background
  const [binaryRows, setBinaryRows] = useState<string[]>([]);
  useEffect(() => {
    const rows: string[] = [];
    for (let i = 0; i < 50; i++) {
      let row = '';
      for (let j = 0; j < 20; j++) {
        row += Math.random() > 0.5 ? '1 ' : '0 ';
      }
      rows.push(row.trim());
    }
    setBinaryRows(rows);
  }, []);

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      {/* Binary Code Background (subtle) */}
      <div className="absolute inset-0 opacity-5 text-[#5B6CFF] text-xs overflow-hidden select-none">
        {binaryRows.map((row, i) => (
          <div key={i} className="whitespace-nowrap" style={{
            transform: `translateY(${i * 30}px) translateX(${Math.sin(i) * 20}px)`,
            animation: `float ${5 + i % 3}s linear infinite`
          }}>
            {row}
          </div>
        ))}
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
            Why Choose{' '}
            <span className="gradient-text">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine engineering excellence with deep industry understanding to deliver 
            software that drives real business outcomes for UAE enterprises.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Data Stream Divider (above each item except first) */}
              {index > 0 && (
                <div className="data-stream-divider absolute -top-6 left-0 w-full h-1 overflow-hidden opacity-30">
                  {/* Streams will be added by useEffect */}
                </div>
              )}

              {/* Benefit Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F]/0 via-[#5B6CFF]/5 to-[#FF2E9F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-2xl" />
                
                <div className="relative glass-card p-8 md:p-10 hover:scale-[1.01] transition-transform duration-500">
                  {/* Content Grid */}
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Left: Icon & Title */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-4">
                        {/* Icon with Gradient */}
                        <div className="relative">
                          <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${benefit.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                          <div className="relative w-16 h-16 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center">
                            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-500">
                              {benefit.icon}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                            {benefit.title}
                          </h3>
                          <div className={`text-sm font-medium mt-1 bg-linear-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                            {benefit.stats}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Description */}
                    <div className="md:col-span-1">
                      <p className="text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Right: Details List */}
                    <div className="md:col-span-1">
                      <div className="grid grid-cols-2 gap-3">
                        {benefit.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 bg-linear-to-r ${benefit.gradient}`} />
                            <span className="text-sm text-gray-400">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-linear-to-r ${benefit.gradient} transition-all duration-700 opacity-50`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">Trusted by leading UAE enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Emaar', 'DP World', 'Emirates NBD', 'ADNOC', 'Dubai Airports', 'Etisalat'].map((company, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg font-light text-gray-400"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '50+', label: 'Enterprise Clients', icon: '🏢' },
            { value: '100+', label: 'Projects Delivered', icon: '🚀' },
            { value: '5+', label: 'Years in UAE', icon: '🇦🇪' },
            { value: '24/7', label: 'Support & Monitoring', icon: '⚡' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}