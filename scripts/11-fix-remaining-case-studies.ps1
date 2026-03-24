# 11-fix-remaining-case-studies.ps1
# Fix all case study pages that still have metadata in Client Components

$caseStudiesDir = "app\case-studies"

# List of case studies that need fixing (from the error)
$problematicOnes = @(
    "digital-banking-gulf-financial",
    "payment-gateway-gulf-pay",
    "ehr-gulf-health",
    "telemedicine-gulf-health",
    "property-management-dubai-heights",
    "fleet-management-gulf-logistics",
    "warehouse-automation-gulf-logistics",
    "multi-vendor-marketplace",
    "omnichannel-gulf-retail",
    "citizen-service-portal",
    "smart-city-platform",
    "cloud-migration-gulf-financial",
    "devops-transformation-gulf-tech"
)

Write-Host "🚀 Fixing remaining case study pages..." -ForegroundColor Magenta
Write-Host ""

$fixedCount = 0

foreach ($study in $problematicOnes) {
    $dir = Join-Path $caseStudiesDir $study
    $pagePath = Join-Path $dir "page.tsx"
    $contentPath = Join-Path $dir "CaseStudyContent.tsx"
    
    if (Test-Path $pagePath) {
        Write-Host "📄 Processing: $study" -ForegroundColor Cyan
        
        # Read the current page content
        $content = Get-Content -Path $pagePath -Raw
        
        # Extract metadata
        if ($content -match "(?s)export const metadata: Metadata = \{(.*?)\};") {
            $metadataContent = $matches[1].Trim()
            
            # Extract everything after the metadata declaration (the component)
            $componentFull = ""
            if ($content -match "(?s)export const metadata: Metadata = \{(.*?)\};(.*)") {
                $componentFull = $matches[2].Trim()
            }
            
            if ($componentFull -ne "") {
                # Create the Client Component file
                $clientContent = @"
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Button from '@/components/ui/Button'

$componentFull
"@
                
                # Create the Server Component file
                $serverContent = @"
import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
$metadataContent
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
"@
                
                # Write the files
                $clientContent | Set-Content -Path $contentPath -Encoding UTF8
                $serverContent | Set-Content -Path $pagePath -Encoding UTF8
                
                Write-Host "  ✅ Fixed: $study" -ForegroundColor Green
                $fixedCount++
            } else {
                Write-Host "  ⚠️  Could not find component in: $study" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ⚠️  Could not find metadata in: $study" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ⚠️  Page not found: $study" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Fixed $fixedCount case study pages" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test the case study pages:" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/digital-banking-gulf-financial" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/smart-building-dubai-heights (already fixed)" -ForegroundColor Yellow