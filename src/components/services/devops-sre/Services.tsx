'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const services = [
  {
    title: 'CI/CD Pipeline Implementation',
    description: 'Automated build, test, and deployment pipelines that enable rapid, reliable software delivery.',
    icon: '🔄',
    image: '/images/devops-sre/service-cicd.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI'],
    benefits: ['10x faster deployments', 'Zero-downtime releases', 'Automated rollbacks']
  },
  {
    title: 'Infrastructure Automation',
    description: 'Manage infrastructure through code for consistency, scalability, and repeatability.',
    icon: '⚙️',
    image: '/images/devops-sre/service-automation.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'],
    benefits: ['Infrastructure as Code', 'Version control', 'Self-healing systems']
  },
  {
    title: 'Kubernetes & Container Orchestration',
    description: 'Container management and orchestration at scale with Kubernetes and Docker.',
    icon: '⎈',
    image: '/images/devops-sre/service-kubernetes.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['EKS/AKS/GKE', 'Docker', 'Helm', 'Istio'],
    benefits: ['Auto-scaling', 'Service discovery', 'Load balancing']
  },
  {
    title: 'Observability & Monitoring',
    description: 'Comprehensive monitoring, logging, and tracing for full system visibility.',
    icon: '📊',
    image: '/images/devops-sre/service-observability.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Prometheus', 'Grafana', 'Datadog', 'ELK Stack'],
    benefits: ['Real-time alerts', 'Root cause analysis', 'Performance insights']
  },
  {
    title: 'Site Reliability Engineering',
    description: 'Apply software engineering principles to operations for optimal reliability.',
    icon: '🔧',
    image: '/images/devops-sre/service-sre.jpg',
    gradient: 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
    features: ['SLI/SLO definition', 'Error budgets', 'Incident management', 'Chaos engineering'],
    benefits: ['99.99% uptime', 'Balanced velocity', 'Reduced toil']
  },
  {
    title: 'Cloud Security & Compliance',
    description: 'Secure your infrastructure with DevSecOps practices and compliance automation.',
    icon: '🔒',
    image: '/images/devops-sre/service-security.jpg',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)',
    features: ['Security scanning', 'Compliance as Code', 'Secrets management', 'Policy as Code'],
    benefits: ['Automated security', 'Compliance reporting', 'Threat detection']
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique animated background for Services section (service mesh visualization)
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

    // Create service mesh nodes
    const nodes: { x: number; y: number; connections: number[]; pulse: number }[] = []
    
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && Math.random() > 0.7) {
          node.connections.push(j)
        }
      })
    })

    // Create data flow particles
    const particles: {
      fromNode: number
      toNode: number
      progress: number
      speed: number
    }[] = []

    for (let i = 0; i < 20; i++) {
      const fromNode = Math.floor(Math.random() * nodes.length)
      const toNode = Math.floor(Math.random() * nodes.length)
      if (fromNode !== toNode) {
        particles.push({
          fromNode,
          toNode,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
        })
      }
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach(connIndex => {
          const target = nodes[connIndex]
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.1)'
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Draw data flow particles
      particles.forEach((particle) => {
        particle.progress += particle.speed

        if (particle.progress > 1) {
          particle.progress = 0
          particle.fromNode = Math.floor(Math.random() * nodes.length)
          particle.toNode = Math.floor(Math.random() * nodes.length)
        }

        const from = nodes[particle.fromNode]
        const to = nodes[particle.toNode]
        
        if (from && to) {
          const x = from.x + (to.x - from.x) * particle.progress
          const y = from.y + (to.y - from.y) * particle.progress

          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 46, 159, 0.2)'
          ctx.fill()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += 0.02
        const size = 4 + Math.sin(node.pulse) * 1

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
        gradient.addColorStop(0, 'rgba(91, 108, 255, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

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
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(91, 108, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive DevOps and SRE services to accelerate delivery, improve 
            reliability, and optimize operations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                  style={{ background: service.gradient }}
                />
                
                {/* Card */}
                <div className="relative h-full glass-card rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: service.gradient }}
                      >
                        <span className="text-xl">{service.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#FF2E9F] group-hover:to-[#5B6CFF] transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span 
                            className="w-1 h-1 rounded-full mr-2"
                            style={{ background: service.gradient }}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {benefit}
                        </span>
                      ))}
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