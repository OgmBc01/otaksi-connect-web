# 6-split-case-study-pages.ps1
# Splits case study pages into Server Component (metadata) + Client Component (content)

$caseStudiesDir = "app\case-studies"

# Get all case study directories
$caseStudyDirs = Get-ChildItem -Path $caseStudiesDir -Directory

Write-Host "🚀 Splitting case study pages into Server + Client components..." -ForegroundColor Magenta
Write-Host ""

$count = 0
foreach ($dir in $caseStudyDirs) {
    $pagePath = "$($dir.FullName)\page.tsx"
    $contentPath = "$($dir.FullName)\CaseStudyContent.tsx"
    
    if (Test-Path $pagePath) {
        Write-Host "📄 Processing: $($dir.Name)" -ForegroundColor Cyan
        
        # Read the current page content
        $content = Get-Content -Path $pagePath -Raw
        
        # Extract the complete metadata object
        if ($content -match "(?s)export const metadata: Metadata = \{(.*?)\};") {
            $metadataObject = $matches[1].Trim()
            
            # Extract the component function
            if ($content -match "(?s)(export default function .*)") {
                $componentFunction = $matches[1]
                
                Write-Host "  📊 Found metadata and component" -ForegroundColor Gray
                
                # Create the Client Component file with clean imports
                $clientContent = @"
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import Button from '@/components/ui/Button'

$componentFunction
"@
                
                # Create the Server Component file with properly formatted metadata
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
                
                # Write the files
                $clientContent | Set-Content -Path $contentPath -Encoding UTF8
                $serverContent | Set-Content -Path $pagePath -Encoding UTF8
                
                Write-Host "  ✅ Split successfully!" -ForegroundColor Green
                $count++
            } else {
                Write-Host "  ⚠️  Could not find component function" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ⚠️  Could not find metadata export" -ForegroundColor Yellow
            Write-Host "  Content preview: $($content.Substring(0, [Math]::Min(200, $content.Length)))" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Split $count case study pages into Server + Client components" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test the case study page again:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000/case-studies/smart-building-dubai-heights" -ForegroundColor Yellow