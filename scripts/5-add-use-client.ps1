# 5-add-use-client.ps1
# Adds "use client" directive to all case study page.tsx files

$caseStudiesDir = "app\case-studies"

# Get all case study directories
$caseStudyDirs = Get-ChildItem -Path $caseStudiesDir -Directory

Write-Host "🚀 Adding 'use client' directive to case study pages..." -ForegroundColor Magenta
Write-Host ""

$count = 0
foreach ($dir in $caseStudyDirs) {
    $pagePath = "$($dir.FullName)\page.tsx"
    
    if (Test-Path $pagePath) {
        # Read the file content
        $content = Get-Content -Path $pagePath -Raw
        
        # Check if file already has use client directive
        if ($content -match "^'use client'") {
            Write-Host "  ⚠️  Already has use client: $($dir.Name)" -ForegroundColor Yellow
        } else {
            # Add use client at the top of the file
            $newContent = "'use client'`n`n" + $content
            $newContent | Set-Content -Path $pagePath -Encoding UTF8
            Write-Host "  ✅ Added use client to: $($dir.Name)" -ForegroundColor Green
            $count++
        }
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Updated $count case study pages with 'use client' directive" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test the case study page again:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000/case-studies/smart-building-dubai-heights" -ForegroundColor Yellow