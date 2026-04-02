'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function DevOpsTransformationGulfTechPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // DevOps themed animation - CI/CD pipelines, deployment flows, monitoring
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // CI/CD pipeline stages
    const stages: { x: number; y: number; name: string; pulse: number; opacity: number }[] = [
      { x: 150, y: 200, name: 'DEV', pulse: 0, opacity: 0.3 },
      { x: 350, y: 200, name: 'TEST', pulse: 0, opacity: 0.3 },
      { x: 550, y: 200, name: 'STAGE', pulse: 0, opacity: 0.3 },
      { x: 750, y: 200, name: 'PROD', pulse: 0, opacity: 0.3 },
    ]

    // Deployment pipelines (connections between stages)
    const pipelines: { from: number; to: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 8; i++) {
      pipelines.push({
        from: Math.floor(Math.random() * (stages.length - 1)),
        to: Math.floor(Math.random() * (stages.length - 1)) + 1,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      })
    }

    // Kubernetes pods (container icons)
    const pods: { x: number; y: number; size: number; pulse: number; opacity: number }[] = []
    for (let i = 0; i < 15; i++) {
      pods.push({
        x: Math.random() * canvas.width,
        y: 400 + Math.random() * 200,
        size: 15 + Math.random() * 15,
        pulse: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.2,
      })
    }

    // Monitoring graphs (line charts)
    const graphs: { points: number[]; color: string; y: number }[] = []
    for (let g = 0; g < 3; g++) {
      const points = []
      for (let i = 0; i < 50; i++) {
        points.push(50 + Math.random() * 50)
      }
      graphs.push({
        points,
        color: g % 2 === 0 ? '#FF2E9F' : '#5B6CFF',
        y: 500 + g * 80,
      })
    }

    // Floating deployment versions
    const versions: { x: number; y: number; ver: string; size: number; speedY: number; opacity: number }[] = []
    const verValues = ['v1.2.3', 'v2.0.1', 'v1.5.0', 'v3.0.0', 'v2.1.4', 'v1.8.2']
    for (let i = 0; i < 12; i++) {
      versions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        ver: verValues[Math.floor(Math.random() * verValues.length)],
        size: 12 + Math.random() * 8,
        speedY: 0.1 + Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.15,
      })
    }

    // CI/CD workflow icons
    const tools: { x: number; y: number; icon: string; size: number; opacity: number }[] = []
    const toolIcons = ['🔧', '🔄', '📦', '🐳', '⎈', '📊', '⚡', '🔍']
    for (let i = 0; i < 10; i++) {
      tools.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        icon: toolIcons[Math.floor(Math.random() * toolIcons.length)],
        size: 20 + Math.random() * 16,
        opacity: 0.1 + Math.random() * 0.15,
      })
    }

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw pipeline grid
      ctx.strokeStyle = 'rgba(91, 108, 255, 0.06)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 60) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw CI/CD stages
      stages.forEach((stage, i) => {
        stage.pulse += 0.02
        const glow = Math.sin(stage.pulse) * 5 + 15

        // Stage circle
        ctx.beginPath()
        ctx.arc(stage.x, stage.y, 25, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, ${stage.opacity})`
        ctx.fill()
        ctx.strokeStyle = `rgba(255, 46, 159, ${stage.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Stage label
        ctx.font = 'bold 14px monospace'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(stage.name, stage.x - 18, stage.y - 15)

        // Glow effect for active stage
        if (i === activeProcess % 4) {
          ctx.beginPath()
          ctx.arc(stage.x, stage.y, glow, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(stage.x, stage.y, 0, stage.x, stage.y, glow * 2)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.3)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw pipeline connections
      pipelines.forEach((pipe) => {
        pipe.progress += pipe.speed
        if (pipe.progress > 1) pipe.progress = 0

        const fromStage = stages[pipe.from]
        const toStage = stages[pipe.to]

        if (fromStage && toStage) {
          // Draw pipeline line
          ctx.beginPath()
          ctx.moveTo(fromStage.x, fromStage.y)
          ctx.lineTo(toStage.x, toStage.y)
          ctx.strokeStyle = 'rgba(91, 108, 255, 0.2)'
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.stroke()
          ctx.setLineDash([])

          // Draw moving deployment
          const currentX = fromStage.x + (toStage.x - fromStage.x) * pipe.progress
          const currentY = fromStage.y + (toStage.y - fromStage.y) * pipe.progress

          ctx.beginPath()
          ctx.arc(currentX, currentY, 6, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 12)
          gradient.addColorStop(0, 'rgba(255, 46, 159, 0.6)')
          gradient.addColorStop(0.7, 'rgba(91, 108, 255, 0.3)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fill()

          // Version label
          ctx.font = '10px monospace'
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.fillText('v2.1.4', currentX - 15, currentY - 15)
        }
      })

      // Draw Kubernetes pods
      pods.forEach((pod) => {
        pod.pulse += 0.03
        const pulseSize = pod.size + Math.sin(pod.pulse) * 3

        // Pod container
        ctx.fillStyle = `rgba(91, 108, 255, ${pod.opacity})`
        ctx.fillRect(pod.x - pod.size/2, pod.y - pod.size/2, pod.size, pod.size)

        // Container label
        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText('⎈', pod.x - 5, pod.y - pod.size/2 - 5)

        // Pod status
        ctx.beginPath()
        ctx.arc(pod.x + pod.size/2 - 3, pod.y - pod.size/2 + 3, 2, 0, Math.PI * 2)
        ctx.fillStyle = Math.random() > 0.8 ? '#FF2E9F' : '#5B6CFF'
        ctx.fill()
      })

      // Draw monitoring graphs
      graphs.forEach((graph) => {
        ctx.beginPath()
        ctx.moveTo(50, graph.y - graph.points[0])

        for (let i = 1; i < graph.points.length; i++) {
          graph.points[i] += (Math.random() - 0.5) * 2
          graph.points[i] = Math.max(20, Math.min(100, graph.points[i]))
          ctx.lineTo(50 + i * 15, graph.y - graph.points[i])
        }

        ctx.strokeStyle = graph.color + '40'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw floating version tags
      versions.forEach((ver) => {
        ver.y -= ver.speedY
        if (ver.y < 0) {
          ver.y = canvas.height
          ver.x = Math.random() * canvas.width
        }

        ctx.font = `${ver.size}px monospace`
        ctx.fillStyle = `rgba(91, 108, 255, ${ver.opacity})`
        ctx.fillText(ver.ver, ver.x, ver.y)
      })

      // Draw DevOps tools
      tools.forEach((tool) => {
        tool.y += 0.1
        if (tool.y > canvas.height) tool.y = 0

        ctx.font = `${tool.size}px Arial`
        ctx.fillStyle = `rgba(255, 46, 159, ${tool.opacity})`
        ctx.fillText(tool.icon, tool.x, tool.y)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [activeProcess])

  const metrics = [
    { value: '10x', label: 'Faster Deployments' },
    { value: '99.9%', label: 'Deployment Success' },
    { value: '50+', label: 'Microservices' },
    { value: '24/7', label: 'Automated Monitoring' },
  ]

  const processSteps = [
    {
      phase: 'Assessment',
      title: 'DevOps Maturity Audit',
      description: 'Assessed current processes across 15 development teams',
      icon: '🔍',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Pipeline',
      title: 'CI/CD Implementation',
      description: 'Built automated pipelines with GitHub Actions',
      icon: '🔄',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
    {
      phase: 'Containerization',
      title: 'Kubernetes Migration',
      description: 'Migrated 50+ services to Kubernetes',
      icon: '⎈',
      gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
    },
    {
      phase: 'Observability',
      title: 'Monitoring & SRE',
      description: 'Implemented full observability stack',
      icon: '📊',
      gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
    },
  ]

  const technologies = [
    { name: 'GitHub Actions', level: 95, description: 'CI/CD pipelines' },
    { name: 'Kubernetes', level: 92, description: 'Container orchestration' },
    { name: 'Docker', level: 95, description: 'Containerization' },
    { name: 'Terraform', level: 90, description: 'Infrastructure as Code' },
    { name: 'Prometheus', level: 88, description: 'Monitoring' },
    { name: 'Grafana', level: 90, description: 'Visualization' },
    { name: 'ArgoCD', level: 85, description: 'GitOps' },
    { name: 'Jenkins', level: 80, description: 'Legacy integration' },
  ]

  return (
    <main className="bg-midnight">
      {/* Floating Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* Hero Section - Clean Header */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Gradient Orbs */}
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <nav className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>•</span>
              <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              <span>•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">DevOps Transformation</span>
            </nav>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                <span className="text-5xl">⚙️</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            <span className="text-white">DevOps</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Transformation</span>
          </motion.h1>

          {/* Client & Industry */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 mb-8"
          >
            Gulf Tech • Technology / DevOps
          </motion.p>

          {/* Quick Stats - Transparent pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">10x Faster</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">50+ Microservices</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-full border border-white/10 px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-sm font-medium gradient-text">99.9% Success</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Challenge</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Gulf Tech's development and operations teams were siloed, with manual deployments taking days
                  and frequent production issues. They needed to modernize to stay competitive.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Deployments took 3-5 days with 40% failure rate',
                    'No automated testing - bugs found in production',
                    'Configuration drift between environments',
                    'No monitoring or alerting for production systems',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-30 blur-2xl" />
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <Image
                    src="/images/case-studies/devops-transformation-gulf-tech/challenge.jpg"
                    alt="DevOps challenge"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:order-2"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solution</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  We implemented a complete DevOps transformation with automated CI/CD pipelines, containerization,
                  and full observability, enabling 10x faster deployments with 99.9% success rate.
                </p>

                <div className="space-y-4">
                  {[
                    'Automated CI/CD pipelines with GitHub Actions',
                    'Containerized microservices on Kubernetes',
                    'Infrastructure as Code with Terraform',
                    'Full observability with Prometheus & Grafana',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:order-1 relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-3xl opacity-30 blur-2xl" />
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <Image
                    src="/images/case-studies/devops-transformation-gulf-tech/solution.jpg"
                    alt="DevOps solution"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline - Individual Blurred Glass Cards */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
              Transformation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              How we transformed 15 teams to DevOps excellence in 9 months
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseEnter={() => setActiveProcess(index)}
              >
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div 
                    className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 ${
                      activeProcess === index ? 'opacity-30' : ''
                    }`}
                    style={{ background: `linear-gradient(135deg, ${step.gradient.includes('FF2E9F') ? '#FF2E9F' : '#5B6CFF'}, ${step.gradient.includes('5B6CFF') ? '#5B6CFF' : '#FF2E9F'})` }}
                  />
                  
                  {/* Glass Card - Blurred */}
                  <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 transition-all duration-300">
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <div className={`text-sm font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                      {step.phase}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                DevOps <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '🔄', title: 'CI/CD', tech: 'GitHub Actions' },
                { icon: '⎈', title: 'Orchestration', tech: 'Kubernetes' },
                { icon: '📝', title: 'IaC', tech: 'Terraform' },
                { icon: '📊', title: 'Observability', tech: 'Prometheus/Grafana' },
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Stack</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The technologies powering Gulf Tech's DevOps transformation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                  <div className="relative backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 p-4 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-medium text-white">{tech.name}</span>
                        <p className="text-xs text-gray-500">{tech.description}</p>
                      </div>
                      <span className="text-sm font-bold gradient-text">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Impact</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Measurable results from DevOps transformation
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                  <div className="relative backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 text-center transition-all">
                    <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block backdrop-blur-lg bg-white/5 px-8 py-4 rounded-full border border-white/10">
                <p className="text-lg font-medium">
                  <span className="gradient-text">From 5 days to 30 minutes</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">85% reduction in incidents</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="gradient-text">40% team productivity gain</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            <div className="relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 group-hover:border-white/20 p-12 text-center transition-all">
              <div className="text-6xl mb-6 text-gray-600">"</div>
              <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                "The DevOps transformation has revolutionized how we build and deploy software. What used to take
                days now happens in minutes with zero manual intervention. Our developers are happier, our systems
                are more reliable, and we're shipping features faster than ever. This isn't just a technical
                improvement—it's a cultural transformation."
              </p>
              <div>
                <p className="font-bold text-white text-lg">Sara Al Mulla</p>
                <p className="text-sm text-gray-500">VP of Engineering, Gulf Tech</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Case Studies - Blurred Glass Card */}
      <section className="relative py-24 bg-midnight border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
                Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Case Studies</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Cloud Migration', client: 'Gulf Financial', slug: 'cloud-migration-gulf-financial' },
                { title: 'Digital Banking Platform', client: 'Gulf Financial', slug: 'digital-banking-gulf-financial' },
              ].map((related, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/case-studies/${related.slug}`} className="group block relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                    <div className="relative backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-6 transition-all">
                      <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all duration-300">{related.title}</h3>
                      <p className="text-sm text-gray-500">{related.client}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blurred Glass Card */}
      <section className="relative py-16 md:py-20 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        {/* Restrict background orb to not overflow viewport */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[60vw] max-h-[600px] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-12 md:p-16 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
              Ready to Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Engineering Culture</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss how our DevOps expertise can help you ship faster and more reliably.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="large">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}