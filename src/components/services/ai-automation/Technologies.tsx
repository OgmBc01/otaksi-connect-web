'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const technologies = [
  {
    category: 'Machine Learning',
    icon: '🧠',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    image: '/images/ai-automation/tech-ml.jpg',
    items: [
      { name: 'TensorFlow', level: 95 },
      { name: 'PyTorch', level: 90 },
      { name: 'Scikit-learn', level: 95 },
      { name: 'XGBoost', level: 90 },
      { name: 'Keras', level: 85 },
    ]
  },
  {
    category: 'Computer Vision',
    icon: '👁️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    image: '/images/ai-automation/tech-cv.jpg',
    items: [
      { name: 'OpenCV', level: 95 },
      { name: 'YOLO', level: 90 },
      { name: 'MediaPipe', level: 85 },
      { name: 'Detectron2', level: 80 },
      { name: 'Hugging Face', level: 85 },
    ]
  },
  {
    category: 'NLP',
    icon: '💬',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    image: '/images/ai-automation/tech-nlp.jpg',
    items: [
      { name: 'OpenAI', level: 95 },
      { name: 'LangChain', level: 90 },
      { name: 'spaCy', level: 85 },
      { name: 'BERT', level: 85 },
      { name: 'Transformers', level: 90 },
    ]
  },
  {
    category: 'Automation',
    icon: '⚙️',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    image: '/images/ai-automation/tech-automation.jpg',
    items: [
      { name: 'UiPath', level: 85 },
      { name: 'Automation Anywhere', level: 80 },
      { name: 'Blue Prism', level: 80 },
      { name: 'Airflow', level: 85 },
      { name: 'Kubeflow', level: 80 },
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
            AI & Automation{' '}
            <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge AI frameworks and automation tools to build 
            intelligent, scalable solutions for UAE enterprises.
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
                  className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
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
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center`}>
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="p-6 space-y-4">
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
                            className={`h-full bg-gradient-to-r ${category.gradient}`}
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