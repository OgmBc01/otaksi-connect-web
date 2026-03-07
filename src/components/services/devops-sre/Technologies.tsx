'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const technologies = [
  {
    category: 'CI/CD Tools',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/devops-sre/tech-cicd.jpg',
    items: [
      { name: 'Jenkins', level: 95, description: 'Automation server' },
      { name: 'GitHub Actions', level: 95, description: 'CI/CD pipelines' },
      { name: 'GitLab CI', level: 90, description: 'Integrated CI/CD' },
      { name: 'CircleCI', level: 85, description: 'Cloud CI/CD' },
    ]
  },
  {
    category: 'Containerization',
    icon: '⎈',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/devops-sre/tech-containers.jpg',
    items: [
      { name: 'Kubernetes', level: 95, description: 'Container orchestration' },
      { name: 'Docker', level: 95, description: 'Container runtime' },
      { name: 'Helm', level: 90, description: 'Package management' },
      { name: 'Istio', level: 85, description: 'Service mesh' },
    ]
  },
  {
    category: 'Infrastructure as Code',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    image: '/images/devops-sre/tech-iac.jpg',
    items: [
      { name: 'Terraform', level: 95, description: 'Multi-cloud IaC' },
      { name: 'CloudFormation', level: 90, description: 'AWS IaC' },
      { name: 'Ansible', level: 90, description: 'Configuration management' },
      { name: 'Pulumi', level: 80, description: 'Modern IaC' },
    ]
  },
  {
    category: 'Monitoring & Observability',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    image: '/images/devops-sre/tech-monitoring.jpg',
    items: [
      { name: 'Prometheus', level: 95, description: 'Metrics collection' },
      { name: 'Grafana', level: 95, description: 'Visualization' },
      { name: 'Datadog', level: 90, description: 'Cloud monitoring' },
      { name: 'ELK Stack', level: 90, description: 'Log aggregation' },
    ]
  }
]

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Technologies section (terminal-style)
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

    // Create terminal-like command lines
    const commands: { x: number; y: number; text: string; opacity: number; speed: number }[] = []
    const cmdTexts = [
      '$ kubectl get pods',
      '$ terraform apply',
      '$ docker build -t app',
      '$ git push origin main',
      '$ helm install release',
      '$ prometheus query',
      '$ ansible-playbook',
      '$ k9s',
    ]

    for (let i = 0; i < 15; i++) {
      commands.push({
        x: 20 + Math.random() * 200,
        y: Math.random() * canvas.height,
        text: cmdTexts[Math.floor(Math.random() * cmdTexts.length)],
        opacity: 0.05 + Math.random() * 0.1,
        speed: 0.1 + Math.random() * 0.2,
      })
    }

    // Create blinking cursor effect
    const cursors: { x: number; y: number; blink: number }[] = []

    for (let i = 0; i < 5; i++) {
      cursors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        blink: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw command lines
      commands.forEach((cmd) => {
        cmd.y -= cmd.speed

        if (cmd.y < 0) {
          cmd.y = canvas.height
          cmd.x = 20 + Math.random() * 200
        }

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(91, 108, 255, ${cmd.opacity})`
        ctx.fillText(cmd.text, cmd.x, cmd.y)
      })

      // Draw blinking cursors
      cursors.forEach((cursor) => {
        cursor.blink += 0.05
        const visible = Math.sin(cursor.blink) > 0

        if (visible) {
          ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
          ctx.fillRect(cursor.x, cursor.y, 10, 2)
        }
      })

      // Draw binary code rain
      for (let i = 0; i < 20; i++) {
        const x = i * 40 + (time * 20) % 40
        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(91, 108, 255, 0.05)'
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, (time * 50) % canvas.height)
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
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Tech Grid */}
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
            DevOps{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Toolchain</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage industry-leading tools and platforms to build robust, 
            automated, and reliable infrastructure.
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
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: category.gradient }}
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
                    <div className="absolute inset-0 bg-linear-to-r from-midnight via-midnight/80 to-transparent" />
                    
                    {/* Category Header */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: category.gradient }}
                      >
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technology List */}
                  <div className="p-6 space-y-4">
                    {category.items.map((tech, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-white">{tech.name}</span>
                            <p className="text-xs text-gray-500">{tech.description}</p>
                          </div>
                          <span className="text-sm text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">
                            {tech.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: category.gradient }}
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