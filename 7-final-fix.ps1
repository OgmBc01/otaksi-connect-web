# 7-final-fix.ps1
# Final fix for all case study pages

$caseStudiesDir = "app\case-studies"

# Get all case study directories
$caseStudyDirs = Get-ChildItem -Path $caseStudiesDir -Directory

foreach ($dir in $caseStudyDirs) {
    $pagePath = "$($dir.FullName)\page.tsx"
    $contentPath = "$($dir.FullName)\CaseStudyContent.tsx"
    
    if (Test-Path $pagePath) {
        Write-Host "Processing: $($dir.Name)" -ForegroundColor Cyan
        
        # Read the current content
        $content = Get-Content -Path $pagePath -Raw
        
        # Extract metadata - look for the metadata object
        if ($content -match "export const metadata: Metadata = \{(.*?)\};") {
            $metadataObject = $matches[1]
            
            # Create the client component content
            $clientContent = @"
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Button from '@/components/ui/Button'

export default function $($dir.Name.Replace('-', ''))Page() {
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

    let time = 0
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // TODO: Add unique animation
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
      title="TITLE_PLACEHOLDER"
      client="CLIENT_PLACEHOLDER"
      industry="INDUSTRY_PLACEHOLDER"
      gradient="GRADIENT_PLACEHOLDER"
      icon="ICON_PLACEHOLDER"
      technologies={[]}
      metrics={[]}
      results="RESULTS_PLACEHOLDER"
    >
      <div>Content will be added later</div>
    </CaseStudyLayout>
  )
}
"@
            
            # Create the server component with metadata
            $serverContent = @"
import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
$metadataObject
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
"@
            
            # Save files
            $clientContent | Set-Content -Path $contentPath -Encoding UTF8
            $serverContent | Set-Content -Path $pagePath -Encoding UTF8
            
            Write-Host "  ✅ Fixed: $($dir.Name)" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Could not find metadata in: $($dir.Name)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n✅ All done! Run 'npm run dev' to test." -ForegroundColor Green