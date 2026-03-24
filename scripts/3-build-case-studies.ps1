# 3-build-case-studies.ps1
# Creates 15 case study pages with animation placeholders and section structure

# Load the template registry
$templates = Get-Content -Path "case-study-templates.json" | ConvertFrom-Json

# Create directories
$caseStudiesDir = "app\case-studies"
if (-not (Test-Path $caseStudiesDir)) {
    New-Item -ItemType Directory -Path $caseStudiesDir -Force
    Write-Host "📁 Created main case studies directory" -ForegroundColor Green
}

# Create shared components directory
$componentsDir = "src\components\case-studies"
if (-not (Test-Path $componentsDir)) {
    New-Item -ItemType Directory -Path $componentsDir -Force
    Write-Host "📁 Created shared components directory" -ForegroundColor Green
}

# Create shared layout with animation support
$layoutComponent = @'
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

interface CaseStudyLayoutProps {
  children: React.ReactNode
  title: string
  client: string
  industry: string
  gradient: string
  icon: string
  technologies: string[]
  metrics: string[]
  results: string
}

export default function CaseStudyLayout({ 
  children, 
  title, 
  client, 
  industry, 
  gradient,
  icon,
  technologies,
  metrics,
  results 
}: CaseStudyLayoutProps) {
  
  // Hero section canvas animation (placeholder for unique animation)
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // This is a placeholder - each case study will override this with unique animation
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Default animation (will be replaced with unique ones)
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.arc(200 + i * 100, 200 + Math.sin(time + i) * 50, 30, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 108, 255, 0.1)`
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <main className="bg-midnight">
      {/* Hero Canvas - Unique animation per case study */}
      <canvas
        id="hero-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">{title}</span>
              </nav>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{ background: gradient }} />
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: gradient }}>
                  <span className="text-3xl">{icon}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400 mb-8"
            >
              {client} • {industry}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {metrics.slice(0, 3).map((metric, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-full">
                  <span className="text-sm font-medium gradient-text">{metric}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {children}
    </main>
  )
}
'@

$layoutComponent | Out-File -FilePath "$componentsDir\CaseStudyLayout.tsx" -Encoding UTF8
Write-Host "✅ Created enhanced layout component with animation support" -ForegroundColor Green

# Create each case study
$templateCount = 0
foreach ($template in $templates.templates) {
    $templateCount++
    $templateDir = "$caseStudiesDir\$($template.id)"
    
    if (-not (Test-Path $templateDir)) {
        New-Item -ItemType Directory -Path $templateDir -Force
    }
    
    # Generate technologies list as a string
    $techList = @()
    foreach ($tech in $template.technologies) {
        $techList += "              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>$tech</span>"
    }
    $techListString = $techList -join "`n"
    
    # Generate metrics list as a string
    $metricItems = @()
    foreach ($metric in $template.metrics) {
        $metricItems += @"
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">$metric</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
"@
    }
    $metricItemsString = $metricItems -join "`n"
    
    # Create page.tsx with full sections and animation placeholders
    $pageContent = @"
import { Metadata } from 'next'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useEffect, useRef } from 'react'

export const metadata: Metadata = {
  title: '$($template.title) - $($template.client) | Otaksi Connect',
  description: '$($template.description)',
  openGraph: {
    title: '$($template.title) - $($template.client)',
    description: '$($template.description)',
    url: 'https://otaksi.ae/case-studies/$($template.id)',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/$($template.id)/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '$($template.title)',
      },
    ],
  },
}

export default function $($template.id.Replace('-', ''))Page() {
  // Unique canvas animation for this case study
  useEffect(() => {
    const canvas = document.getElementById('case-study-canvas') as HTMLCanvasElement
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

    // TODO: Implement unique animation for $($template.industry) case study
    // This will be customized per template with industry-specific animations
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Placeholder animation - Will be replaced with unique one
      // For $($template.industry) case study
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(200 + i * 150, 300, 40, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 46, 159, 0.1)' : 'rgba(91, 108, 255, 0.1)'
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <CaseStudyLayout
      title="$($template.title)"
      client="$($template.client)"
      industry="$($template.industry)"
      gradient="$($template.gradient)"
      icon="$($template.icon)"
      technologies={[$(($template.technologies | ForEach-Object { "'$_'" }) -join ', ')]}
      metrics={[$(($template.metrics | ForEach-Object { "'$_'" }) -join ', ')]}
      results="$($template.results)"
    >
      {/* Challenge Section with its own animation canvas */}
      <section className="relative py-16 bg-midnight overflow-hidden">
        <canvas
          id="case-study-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Challenge</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                $($template.client), a leading $($template.industry) organization in the UAE, faced significant 
                challenges with their legacy systems and manual processes. Operations were 
                inefficient, data was siloed, and they needed to scale to meet growing demand.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Manual processes causing delays and errors</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Legacy systems unable to scale with business growth</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] mt-2" />
                  <p className="text-gray-400">Limited visibility into operations and performance</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/case-studies/$($template.id)/challenge.jpg"
                alt="Challenge illustration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden md:order-2"
            >
              <Image
                src="/images/case-studies/$($template.id)/solution.jpg"
                alt="Solution illustration"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Solution</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We developed a comprehensive $($template.industry) solution that transformed their operations:
              </p>
              <div className="space-y-4">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Modern Architecture</h3>
                  <p className="text-gray-400">Built with scalable microservices and cloud-native technologies</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Automated Workflows</h3>
                  <p className="text-gray-400">Eliminated manual processes with intelligent automation</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 gradient-text">Real-time Analytics</h3>
                  <p className="text-gray-400">Comprehensive dashboards and reporting capabilities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Solution <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Architecture</span>
            </h2>
          </motion.div>
          <div className="glass-card p-8 rounded-2xl">
            <div className="relative h-96 w-full">
              <Image
                src="/images/case-studies/$($template.id)/architecture.jpg"
                alt="Architecture diagram"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Used</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
$techListString
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Impact</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
$metricItemsString
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block glass-card px-8 py-4 rounded-full">
              <p className="text-xl font-bold gradient-text">$($template.results)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl text-center"
          >
            <div className="text-5xl mb-6 opacity-30">"</div>
            <p className="text-xl text-gray-300 italic mb-8">
              "Otaksi Connect transformed our operations completely. Their expertise and 
              dedication to delivering a solution that truly met our needs was exceptional. 
              We're now able to serve our customers better and scale our business efficiently."
            </p>
            <div>
              <p className="font-bold text-white">Chief Technology Officer</p>
              <p className="text-sm text-gray-500">$($template.client)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-clash)' }}>
              Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Case Studies</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder for related case studies - will be populated dynamically */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-bold mb-2">Another Success Story</h3>
              <p className="text-sm text-gray-400">Coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-midnight border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
              Ready to Achieve Similar <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Results</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with technology.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="large">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
"@

    $pageContent | Out-File -FilePath "$templateDir\page.tsx" -Encoding UTF8
    Write-Host "  ✅ Created: $($template.id) ($templateCount of 15)" -ForegroundColor Green
}

Write-Host "`n🎉 SUCCESS! All 15 case study templates created!" -ForegroundColor Green
Write-Host "📁 Location: app\case-studies\" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Review each case study in app\case-studies\" -ForegroundColor Yellow
Write-Host "2. We'll work together to create UNIQUE ANIMATIONS for each case study" -ForegroundColor Yellow
Write-Host "3. Replace placeholder images with actual screenshots/diagrams" -ForegroundColor Yellow
Write-Host "4. Customize content to tell each unique story" -ForegroundColor Yellow