# 13-create-all-content-files.ps1
# Create CaseStudyContent.tsx files for all case studies and fix page.tsx

$caseStudiesDir = "app\case-studies"

# Get all case study directories
$caseStudyDirs = Get-ChildItem -Path $caseStudiesDir -Directory

Write-Host "🚀 Creating CaseStudyContent.tsx files for all case studies..." -ForegroundColor Magenta
Write-Host ""

$createdCount = 0
$skippedCount = 0

# Template for CaseStudyContent.tsx based on industry
function Get-ClientContentTemplate {
    param($studyName, $title, $client, $industry, $gradient, $icon, $technologies, $metrics, $results)
    
    $componentName = $studyName.Replace('-', '') + "Page"
    
    # Format technologies as a proper JavaScript array
    $techArray = $technologies -split ',\s*' | ForEach-Object { "'$_'" }
    $techArrayString = $techArray -join ', '
    
    # Format metrics as a proper JavaScript array
    $metricArray = $metrics -split ',\s*' | ForEach-Object { "'$_'" }
    $metricArrayString = $metricArray -join ', '
    
    return @"
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Button from '@/components/ui/Button'

export default function $componentName() {
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

    // TODO: Implement unique animation for $industry case study
    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Placeholder animation
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
      title="$title"
      client="$client"
      industry="$industry"
      gradient="$gradient"
      icon="$icon"
      technologies={[$techArrayString]}
      metrics={[$metricArrayString]}
      results="$results"
    >
      {/* Challenge Section */}
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
                $client, a leading $industry organization in the UAE, faced significant 
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
                src="/images/case-studies/$studyName/challenge.jpg"
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
                src="/images/case-studies/$studyName/solution.jpg"
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
                We developed a comprehensive $industry solution that transformed their operations:
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
            $(($technologies -split ',\s*' | ForEach-Object { "              <span className='px-4 py-2 glass-card rounded-full text-sm text-gray-300 border border-white/10'>$_</span>" }) -join "`n")
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
            $(($metrics -split ',\s*' | ForEach-Object { 
@"
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold gradient-text mb-2">$_</div>
              <div className="text-sm text-gray-500">Improvement</div>
            </div>
"@
            }) -join "`n")
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block glass-card px-8 py-4 rounded-full">
              <p className="text-xl font-bold gradient-text">$results</p>
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
}

# Data for each case study
$caseStudies = @(
    @{
        name = "digital-banking-gulf-financial"
        title = "Digital Banking Platform"
        client = "Gulf Financial"
        industry = "FinTech"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "💰"
        technologies = "React Native, Node.js, AWS, Kubernetes, MongoDB, Redis"
        metrics = "2M+ users, Real-time payments, AI insights, 99.99% uptime"
        results = "45% digital adoption, 40% operational efficiency"
        description = "Complete digital banking transformation serving 2M+ customers with real-time payments and AI-powered insights."
    },
    @{
        name = "payment-gateway-gulf-pay"
        title = "Payment Gateway Integration"
        client = "Gulf Pay"
        industry = "FinTech"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "💳"
        technologies = "Stripe, Node.js, AWS, Redis, PostgreSQL"
        metrics = "1M+ daily txns, 100+ currencies, PCI DSS Level 1, 3D Secure"
        results = "99.99% uptime, 98% success rate"
        description = "Enterprise payment gateway processing 1M+ daily transactions with multi-currency support."
    },
    @{
        name = "ehr-gulf-health"
        title = "Electronic Health Records System"
        client = "Gulf Health System"
        industry = "Healthcare"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "🏥"
        technologies = "React, FastAPI, FHIR, PostgreSQL, Redis, Docker"
        metrics = "2M+ patients, 15 hospitals, Unified records, Real-time data"
        results = "40% faster diagnosis, 500K+ records"
        description = "Enterprise-wide EHR system implementation across 15 hospitals, serving 2M+ patients."
    },
    @{
        name = "telemedicine-gulf-health"
        title = "Telemedicine Platform"
        client = "Gulf Health System"
        industry = "Healthcare"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "📹"
        technologies = "React, WebRTC, Node.js, MongoDB, Redis"
        metrics = "100K+ consultations, 95% satisfaction, Video visits, E-prescriptions"
        results = "50% no-show reduction, expanded reach"
        description = "Secure telemedicine platform enabling 100K+ virtual consultations annually."
    },
    @{
        name = "property-management-dubai-heights"
        title = "Property Management System"
        client = "Dubai Heights Real Estate"
        industry = "Real Estate"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "🏢"
        technologies = "React, Node.js, PostgreSQL, Redis, AWS"
        metrics = "20K+ units, Tenant portal, Automated payments, Maintenance tracking"
        results = "40% efficiency gain, 90% faster Ejari registration"
        description = "Comprehensive property management platform for 20,000+ residential units."
    },
    @{
        name = "fleet-management-gulf-logistics"
        title = "Fleet Management System"
        client = "Gulf Logistics"
        industry = "Logistics"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "🚛"
        technologies = "React, Node.js, PostgreSQL, Redis, GPS Integration"
        metrics = "1,000+ vehicles, Real-time tracking, Route optimization, Driver behavior"
        results = "30% fuel savings, 25% efficiency gain"
        description = "Comprehensive fleet management system for 1,000+ vehicles, optimizing routes and reducing fuel costs."
    },
    @{
        name = "warehouse-automation-gulf-logistics"
        title = "Warehouse Automation"
        client = "Gulf Logistics"
        industry = "Logistics"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "🏭"
        technologies = "React, Python, PostgreSQL, IoT, Robotics"
        metrics = "40% throughput increase, 99.9% accuracy, Automated picking, Space optimization"
        results = "50% faster order processing"
        description = "Automated warehouse operations with WMS and robotics, increasing throughput by 40%."
    },
    @{
        name = "multi-vendor-marketplace"
        title = "Multi-vendor Marketplace"
        client = "Gulf Mart"
        industry = "E-commerce"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "🛍️"
        technologies = "Next.js, Node.js, PostgreSQL, Redis, Elasticsearch"
        metrics = "1M+ customers, 5K+ sellers, Multi-vendor, Commission tracking"
        results = "200% growth in 2 years"
        description = "Scalable marketplace platform serving 1M+ customers with 5,000+ sellers."
    },
    @{
        name = "omnichannel-gulf-retail"
        title = "Omnichannel Retail Platform"
        client = "Gulf Retail Group"
        industry = "E-commerce"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "🏪"
        technologies = "React, Node.js, PostgreSQL, Redis, Elasticsearch"
        metrics = "50+ stores, Click & collect, Real-time inventory, Unified commerce"
        results = "150% online growth, 40% omnichannel sales"
        description = "Integrated e-commerce platform connecting online stores with 50+ physical retail locations."
    },
    @{
        name = "citizen-service-portal"
        title = "Citizen Service Portal"
        client = "Dubai Digital Government"
        industry = "Government"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "👥"
        technologies = "React, Node.js, PostgreSQL, Redis, Identity Management"
        metrics = "1.5M+ users, 80% satisfaction, Document center, Payment gateway"
        results = "90% digital adoption, 50% faster processing"
        description = "Unified digital portal for government services serving 1.5M+ citizens."
    },
    @{
        name = "smart-city-platform"
        title = "Smart City Platform"
        client = "Dubai Digital Government"
        industry = "Government"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "🏙️"
        technologies = "React, Node.js, InfluxDB, Grafana, MQTT"
        metrics = "50+ services, IoT sensors, Real-time monitoring, Smart lighting"
        results = "25% energy savings, 30% traffic reduction"
        description = "Integrated smart city platform connecting 50+ government services and IoT infrastructure."
    },
    @{
        name = "cloud-migration-gulf-financial"
        title = "Cloud Migration Journey"
        client = "Gulf Financial"
        industry = "Financial Services"
        gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
        icon = "☁️"
        technologies = "AWS, Terraform, Kubernetes, Docker, Jenkins"
        metrics = "50+ apps migrated, Zero downtime, 40% cost reduction, 99.99% uptime"
        results = "Cloud-native transformation complete in 6 months"
        description = "Migrated 50+ critical applications to AWS with zero downtime, achieving 40% cost reduction."
    },
    @{
        name = "devops-transformation-gulf-tech"
        title = "DevOps Transformation"
        client = "Gulf Tech"
        industry = "Technology"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "⚙️"
        technologies = "Jenkins, GitHub Actions, Docker, Kubernetes, Terraform"
        metrics = "10x faster deployments, Daily deployments, Zero-downtime, 50+ microservices"
        results = "From monthly to daily releases"
        description = "Implemented automated CI/CD pipelines reducing deployment time from days to minutes."
    },
    @{
        name = "fraud-detection-securebank"
        title = "AI-Powered Fraud Detection"
        client = "SecureBank"
        industry = "FinTech"
        gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
        icon = "🔒"
        technologies = "Python, TensorFlow, Apache Kafka, Redis, PostgreSQL"
        metrics = "99.9% accuracy, Real-time detection, 50% false positive reduction, 2M+ transactions/day"
        results = "Saved AED 50M+ in potential fraud losses"
        description = "Real-time ML model detecting fraudulent transactions with 99.9% accuracy, saving millions in potential losses."
    }
)

foreach ($study in $caseStudies) {
    $dir = Join-Path $caseStudiesDir $study.name
    $pagePath = Join-Path $dir "page.tsx"
    $contentPath = Join-Path $dir "CaseStudyContent.tsx"
    
    if (Test-Path $dir) {
        Write-Host "📄 Processing: $($study.name)" -ForegroundColor Cyan
        
        # Create CaseStudyContent.tsx
        $clientContent = Get-ClientContentTemplate -studyName $study.name -title $study.title -client $study.client -industry $study.industry -gradient $study.gradient -icon $study.icon -technologies $study.technologies -metrics $study.metrics -results $study.results
        $clientContent | Set-Content -Path $contentPath -Encoding UTF8
        
        # Update page.tsx
        $serverContent = @"
import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: '$($study.title) - $($study.client) | Otaksi Connect',
  description: '$($study.description)',
  openGraph: {
    title: '$($study.title) - $($study.client)',
    description: '$($study.description)',
    url: 'https://otaksi.ae/case-studies/$($study.name)',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/$($study.name)/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '$($study.title)',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
"@
        $serverContent | Set-Content -Path $pagePath -Encoding UTF8
        
        Write-Host "  ✅ Created CaseStudyContent.tsx and updated page.tsx for: $($study.name)" -ForegroundColor Green
        $createdCount++
    } else {
        Write-Host "  ⚠️  Directory not found: $($study.name)" -ForegroundColor Yellow
        $skippedCount++
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Created/Updated: $createdCount case studies" -ForegroundColor Green
Write-Host "  ⚠️  Skipped: $skippedCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test the case study pages:" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/digital-banking-gulf-financial" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/property-management-dubai-heights" -ForegroundColor Yellow
Write-Host "   - etc." -ForegroundColor Yellow