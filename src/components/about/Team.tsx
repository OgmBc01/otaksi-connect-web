'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const teamMembers = [
  {
    name: 'Engr. Dr. Farouq Sadik Bashir',
    title: 'CEO & Chairman',
    qualifications: 'PhD. Computer Science',
    expertise: 'AI, Machine Learning, Deep Learning, Big Data',
    description: 'Expert in leveraging data-driven strategies to create value for clients through advanced AI technologies.',
    image: '/images/team/farouq.jpg',
    social: {
      facebook: 'https://web.facebook.com/profile.php?id=100006751037416',
      instagram: 'https://www.instagram.com/farouq_sadik/',
      linkedin: 'https://www.linkedin.com/in/farouq-sadik-bashir-191521191',
      twitter: 'https://twitter.com/The_Cryptic_?t=4Yo39Y5XCgZMYFQrwvEqcg&s=09',
    },
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    name: 'Engr. Abdullah Bala Madaki',
    title: 'Co-Founder & CTO',
    qualifications: 'MSc. Computer Science',
    expertise: 'UX/UI Design, Full Stack Development, AI Integration',
    description: 'User-centric Senior UX/UI Designer with multinational experience. Leverages latest design trends to develop user-friendly platforms.',
    image: '/images/team/abdullah.jpg',
    website: 'https://madaki.dev/',
    social: {
      facebook: 'https://web.facebook.com/profile.php?id=100006751037416',
      instagram: 'https://www.instagram.com/a_b_madaki/',
      linkedin: 'https://www.linkedin.com/in/abdullah-bala-madaki-ab8804129/',
      twitter: 'https://twitter.com/Abdaullahbalam',
    },
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
]

export default function Team() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Team section animation - connecting minds
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const section = canvas.parentElement?.parentElement
      if (section) {
        const rect = section.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Two main nodes representing the founders
    const nodes = [
      { x: canvas.width * 0.3, y: canvas.height * 0.5, pulse: 0 },
      { x: canvas.width * 0.7, y: canvas.height * 0.5, pulse: 0 },
    ]

    // Connection between them
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connection
      ctx.beginPath()
      ctx.moveTo(nodes[0].x, nodes[0].y)
      ctx.lineTo(nodes[1].x, nodes[1].y)
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw flowing data between them
      const flowPos = time % 1
      const flowX = nodes[0].x + (nodes[1].x - nodes[0].x) * flowPos
      const flowY = nodes[0].y + (nodes[1].y - nodes[0].y) * flowPos

      ctx.beginPath()
      ctx.arc(flowX, flowY, 6, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 12)
      gradient.addColorStop(0, 'rgba(255, 46, 159, 0.4)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight border-t border-white/5 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />
      
      <div className="absolute inset-0 bg-gradient-glow" />
      
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
            Meet the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Neural Network</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The brains behind Otaksi Connect - combining AI expertise with design excellence
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r ${member.gradient}`}
                />
                
                {/* Card */}
                <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-8 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Image Placeholder */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] p-[2px]">
                        <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                          <span className="text-4xl">{index === 0 ? '🧠' : '💻'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 group-hover:gradient-text transition-all duration-300">
                        {member.name}
                      </h3>
                      <p className="text-lg gradient-text mb-2">{member.title}</p>
                      <p className="text-sm text-gray-500 mb-3">{member.qualifications}</p>
                      <p className="text-sm text-gray-400 mb-4">{member.description}</p>
                      
                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.split(', ').map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-3">
                        {member.social.facebook && (
                          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                            </svg>
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.38 1.13a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
                            </svg>
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                              <path d="M17.53 2.477h3.924l-8.564 9.877 10.09 13.169h-7.944l-6.22-8.181-7.13 8.181H0l9.162-10.567L-.637 2.477h8.09l5.44 7.166zm-1.09 17.145h2.17L7.1 4.6H4.8z" />
                            </svg>
                          </a>
                        )}
                        {member.website && (
                          <a href={member.website} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF2E9F] hover:to-[#5B6CFF] transition-all duration-300">
                            <span className="text-sm">🌐</span>
                          </a>
                        )}
                      </div>
                    </div>
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