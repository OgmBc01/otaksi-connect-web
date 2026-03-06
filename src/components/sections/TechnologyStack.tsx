'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'

const technologies = [
  {
    name: 'React',
    icon: '⚛️',
    category: 'Frontend',
    gradient: 'from-[#61DAFB] to-[#5B6CFF]',
    description: 'Building dynamic user interfaces with React and Next.js for enterprise applications.',
    experience: '5+ years',
    projects: ['Emaar Portal', 'DHA Platform', 'Emirates NBD App']
  },
  {
    name: 'Node.js',
    icon: '🟢',
    category: 'Backend',
    gradient: 'from-[#68A063] to-[#5B6CFF]',
    description: 'Scalable server-side applications with Node.js and Express for high-performance APIs.',
    experience: '5+ years',
    projects: ['DP World Tracking', 'ADNOC Analytics', 'Dubai Airports API']
  },
  {
    name: 'Python',
    icon: '🐍',
    category: 'AI/ML',
    gradient: 'from-[#3776AB] to-[#FF2E9F]',
    description: 'AI-powered solutions with Python, TensorFlow, and PyTorch for intelligent automation.',
    experience: '4+ years',
    projects: ['DHA Diagnosis AI', 'Emirates NBD Fraud Detection', 'Dubai Municipality IoT']
  },
  {
    name: 'AWS',
    icon: '☁️',
    category: 'Cloud',
    gradient: 'from-[#FF9900] to-[#5B6CFF]',
    description: 'Cloud-native architectures on AWS with serverless, containers, and infrastructure as code.',
    experience: '5+ years',
    projects: ['Majid Al Futtaim E-commerce', 'DEWA Smart Grid', 'DMCC Platform']
  },
  {
    name: 'Laravel',
    icon: '🎨',
    category: 'Backend',
    gradient: 'from-[#FF2E9F] to-[#F05340]',
    description: 'Rapid enterprise application development with Laravel and PHP.',
    experience: '4+ years',
    projects: ['RAK Free Zone Portal', 'Aster Healthcare', 'Rotana Booking System']
  },
  {
    name: 'Kubernetes',
    icon: '⎈',
    category: 'DevOps',
    gradient: 'from-[#326CE5] to-[#5B6CFF]',
    description: 'Container orchestration and microservices management at enterprise scale.',
    experience: '4+ years',
    projects: ['DP World Microservices', 'Emirates NBD Cloud', 'Etisalat Platform']
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    category: 'Database',
    gradient: 'from-[#47A248] to-[#5B6CFF]',
    description: 'Flexible NoSQL databases for modern applications with high scalability.',
    experience: '4+ years',
    projects: ['Noon Product Catalog', 'Jumeirah Guest Platform', 'Amazon.ae Reviews']
  },
  {
    name: 'TensorFlow',
    icon: '🧠',
    category: 'AI/ML',
    gradient: 'from-[#FF6F00] to-[#FF2E9F]',
    description: 'Machine learning models for predictive analytics and computer vision.',
    experience: '3+ years',
    projects: ['Dubai Police AI', 'ADNOC Predictive Maintenance', 'DHA Imaging AI']
  }
]

export default function TechnologyStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedTech, setSelectedTech] = useState<typeof technologies[0] | null>(null)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-rotation effect
  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [inView])

  // Calculate orbit positions
  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 + (rotation * Math.PI / 180)
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6, // Elliptical orbit
      scale: 0.8 + Math.sin(angle) * 0.3, // Perspective effect
      zIndex: Math.sin(angle) > 0 ? 10 : 20,
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-px h-32 bg-linear-to-b from-transparent via-[#5B6CFF] to-transparent"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 18}deg) translateY(-200px)`,
                opacity: 0.1,
              }}
            />
          ))}
        </div>
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
            Our Technology{' '}
            <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and future-proof 
            solutions for UAE enterprises.
          </p>
        </motion.div>

        {/* Tech Orbit Visualization */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-16"
        >
          <div 
            ref={containerRef}
            className="relative h-150 flex items-center justify-center"
          >
            {/* Central Neural Core */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative z-30"
            >
              <div className="w-32 h-32 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] p-0.75">
                <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">⚡</div>
                    <div className="text-xs font-bold gradient-text">NEURAL CORE</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Technologies */}
            {technologies.map((tech, index) => {
              const { x, y, scale, zIndex } = getOrbitPosition(index, technologies.length, 220)
              
              return (
                <motion.div
                  key={tech.name}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    x: x - 40, // Center offset
                    y: y - 40,
                    scale,
                    zIndex,
                  }}
                  whileHover={{ scale: scale * 1.2 }}
                  onClick={() => setSelectedTech(tech)}
                >
                  <div className={`relative group w-20 h-20 rounded-2xl bg-linear-to-r ${tech.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-midnight flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <span className="text-3xl transform group-hover:scale-110 transition-transform">
                        {tech.icon}
                      </span>
                    </div>
                    
                    {/* Tooltip on Hover */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-xs glass-card px-2 py-1">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Orbit Rings */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 border border-[#5B6CFF]/20 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 border border-[#FF2E9F]/10 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-[#5B6CFF]/5 rounded-full" />
          </div>
        </motion.div>

        {/* Technology Details Modal/Panel */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="relative glass-card p-8">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-start gap-6">
                  {/* Large Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-linear-to-r ${selectedTech.gradient} p-0.75`}>
                    <div className="w-full h-full rounded-2xl bg-midnight flex items-center justify-center">
                      <span className="text-4xl">{selectedTech.icon}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold gradient-text">{selectedTech.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                        {selectedTech.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                        {selectedTech.experience}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-4">
                      {selectedTech.description}
                    </p>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Featured Projects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTech.projects.map((project, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ...removed Tech Categories Grid as requested... */}
      </div>
    </section>
  )
}