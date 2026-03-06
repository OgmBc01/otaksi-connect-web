'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const technologies = [
  {
    category: 'Frontend',
    icon: '🎨',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    items: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 95 },
      { name: 'Vue.js', level: 90 },
      { name: 'TypeScript', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    items: [
      { name: 'Node.js', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: '.NET Core', level: 85 },
      { name: 'Go', level: 80 },
    ]
  },
  {
    category: 'Database',
    icon: '🗄️',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    items: [
      { name: 'PostgreSQL', level: 95 },
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 90 },
      { name: 'Redis', level: 85 },
      { name: 'Elasticsearch', level: 80 },
    ]
  },
  {
    category: 'DevOps',
    icon: '🚀',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    items: [
      { name: 'Docker', level: 95 },
      { name: 'Kubernetes', level: 90 },
      { name: 'AWS', level: 95 },
      { name: 'CI/CD', level: 90 },
      { name: 'Terraform', level: 85 },
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
      
      {/* Tech Grid Background */}
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
            Technologies We{' '}
            <span className="gradient-text">Master</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions.
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
                  className={`absolute -inset-0.5 bg-linear-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card p-8 rounded-2xl border border-white/10 group-hover:border-white/20">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-xl bg-linear-to-r ${category.gradient} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative w-12 h-12 rounded-xl bg-midnight border border-white/10 flex items-center justify-center">
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                      {category.category}
                    </h3>
                  </div>

                  {/* Technology List */}
                  <div className="space-y-4">
                    {category.items.map((tech, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{tech.name}</span>
                          <span className="text-gray-500">{tech.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className={`h-full bg-linear-to-r ${category.gradient}`}
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