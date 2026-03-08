# 2-update-pages.ps1
# Scans and updates case studies arrays in all service/solution pages

# Load the template registry
$templates = Get-Content -Path "case-study-templates.json" | ConvertFrom-Json
$templateMap = @{}

# Create a mapping from industry/category to template
foreach ($template in $templates.templates) {
    $key = $template.category.ToLower()
    if (-not $templateMap.ContainsKey($key)) {
        $templateMap[$key] = @()
    }
    $templateMap[$key] += $template
}

# Define all service and solution pages to update
$pages = @(
    # Service Pages (7)
    @{ path = "app\services\software-engineering\page.tsx"; industry = "Software Engineering" },
    @{ path = "app\services\ai-automation\page.tsx"; industry = "AI" },
    @{ path = "app\services\cloud-platforms\page.tsx"; industry = "Cloud" },
    @{ path = "app\services\devops-sre\page.tsx"; industry = "DevOps" },
    @{ path = "app\services\enterprise-systems\page.tsx"; industry = "Enterprise" },
    @{ path = "app\services\digital-transformation\page.tsx"; industry = "Transformation" },
    
    # Solution Pages (6)
    @{ path = "app\solutions\fintech\page.tsx"; industry = "FinTech" },
    @{ path = "app\solutions\real-estate\page.tsx"; industry = "Real Estate" },
    @{ path = "app\solutions\healthcare\page.tsx"; industry = "Healthcare" },
    @{ path = "app\solutions\logistics\page.tsx"; industry = "Logistics" },
    @{ path = "app\solutions\ecommerce\page.tsx"; industry = "E-commerce" },
    @{ path = "app\solutions\government\page.tsx"; industry = "Government" }
)

function Update-PageCaseStudies {
    param($pagePath, $industry)
    
    if (-not (Test-Path $pagePath)) {
        Write-Host "⚠️  Page not found: $pagePath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "📄 Processing: $pagePath" -ForegroundColor Cyan
    
    # Read the file content
    $content = Get-Content -Path $pagePath -Raw
    
    # More flexible pattern to find caseStudies array
    # This handles various formats like:
    # const caseStudies = [ ... ];
    # const caseStudies: any[] = [ ... ];
    # const caseStudies: CaseStudy[] = [ ... ];
    # let caseStudies = [ ... ];
    
    $pattern = '(?:const|let)\s+caseStudies\s*(?::\s*[^=]+)?\s*=\s*(\[[\s\S]*?\])\s*;'
    
    if ($content -match $pattern) {
        $fullMatch = $matches[0]
        $arrayContent = $matches[1]
        
        Write-Host "  Found caseStudies array, updating..." -ForegroundColor Gray
        
        # Get relevant templates for this industry
        $relevantTemplates = @()
        $industryLower = $industry.ToLower()
        
        # Map industries to template categories
        $industryMap = @{
            "software engineering" = @("cloud", "devops", "enterprise")
            "ai" = @("fintech", "healthcare", "e-commerce")
            "cloud" = @("cloud")
            "devops" = @("devops")
            "enterprise" = @("enterprise", "cloud")
            "transformation" = @("fintech", "healthcare", "logistics", "e-commerce", "government")
            "fintech" = @("fintech")
            "real estate" = @("proptech")
            "healthcare" = @("healthcare")
            "logistics" = @("logistics")
            "e-commerce" = @("e-commerce")
            "government" = @("government")
        }
        
        # Find matching categories for this industry
        $matchingCategories = @()
        foreach ($key in $industryMap.Keys) {
            if ($industryLower -like "*$key*") {
                $matchingCategories += $industryMap[$key]
            }
        }
        
        # Flatten and get unique categories
        $matchingCategories = $matchingCategories | ForEach-Object { $_ } | Sort-Object -Unique
        
        # Collect templates from matching categories
        foreach ($cat in $matchingCategories) {
            if ($templateMap.ContainsKey($cat)) {
                $relevantTemplates += $templateMap[$cat]
            }
        }
        
        # Flatten and remove duplicates
        $relevantTemplates = $relevantTemplates | ForEach-Object { $_ } | Sort-Object -Property id -Unique
        
        # If no specific templates found, use first 4 templates as fallback
        if ($relevantTemplates.Count -eq 0) {
            Write-Host "  No specific templates found for industry '$industry', using fallback templates" -ForegroundColor Yellow
            $relevantTemplates = $templates.templates | Select-Object -First 4
        }
        
        # Select up to 4 templates for this page
        $selectedTemplates = $relevantTemplates | Select-Object -First 4
        
        if ($selectedTemplates.Count -eq 0) {
            Write-Host "  ⚠️  No templates available for this page" -ForegroundColor Yellow
            return
        }
        
        # Generate new caseStudies array
        $newArrayContent = @()
        $index = 1
        foreach ($template in $selectedTemplates) {
            # Format metrics array
            $metricsArray = ($template.metrics | ForEach-Object { "'$_'" }) -join ', '
            
            $newArrayContent += @"
    {
        id: $index,
        title: '$($template.title)',
        client: '$($template.client)',
        description: '$($template.description)',
        image: '/images/case-studies/$($template.id).jpg',
        gradient: '$($template.gradient)',
        results: '$($template.results)',
        metrics: [$metricsArray],
        slug: '$($template.id)'
    }
"@
            $index++
        }
        
        $newArrayText = $newArrayContent -join ",\n"
        
        # Create the new caseStudies array with proper indentation
        $newCaseStudies = "const caseStudies = [
$newArrayText
];"
        
        # Replace the old caseStudies array with the new one
        $newContent = $content -replace $pattern, $newCaseStudies
        
        # Write back to file
        $newContent | Set-Content -Path $pagePath -Encoding UTF8
        
        Write-Host "  ✅ Updated with $($selectedTemplates.Count) templates" -ForegroundColor Green
        
        # Show which templates were added
        foreach ($template in $selectedTemplates) {
            Write-Host "    - $($template.title) ($($template.client))" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ⚠️  No caseStudies array found in $pagePath" -ForegroundColor Yellow
        Write-Host "  Please check the file format and ensure it contains a caseStudies array" -ForegroundColor Yellow
    }
}

# Process each page
$successCount = 0
$failCount = 0

foreach ($page in $pages) {
    Write-Host ""
    Update-PageCaseStudies -pagePath $page.path -industry $page.industry
    if ($?) {
        $successCount++
    } else {
        $failCount++
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Successfully processed: $successCount pages" -ForegroundColor Green
Write-Host "  ⚠️  Failed/Not found: $failCount pages" -ForegroundColor Yellow
Write-Host "`n✅ All pages processed!" -ForegroundColor Green