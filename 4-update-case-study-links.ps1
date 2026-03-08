# 4-update-case-study-links.ps1
# Updates all case study links in service/solution pages to point to new generic slugs

# Load the template registry
$templates = Get-Content -Path "case-study-templates.json" | ConvertFrom-Json

# Create a mapping of old slugs to new slugs
# This is based on the case studies we had in your original pages
$slugMapping = @{
    # FinTech old -> new
    "emirates-nbd-digital-banking" = "digital-banking-gulf-financial"
    "dubai-islamic-banking" = "digital-banking-gulf-financial"
    "network-international-payment" = "payment-gateway-gulf-pay"
    "adcb-regtech" = "fraud-detection-securebank"
    
    # Healthcare old -> new
    "dha-ehr-implementation" = "ehr-gulf-health"
    "mediclinic-telemedicine" = "telemedicine-gulf-health"
    "nmc-patient-portal" = "ehr-gulf-health"
    "aster-lis" = "ehr-gulf-health"
    
    # Real Estate old -> new
    "emaar-smart-building" = "smart-building-dubai-heights"
    "dubai-properties-pms" = "property-management-dubai-heights"
    "property-finder-marketplace" = "multi-vendor-marketplace"
    "wasl-ejari-integration" = "property-management-dubai-heights"
    
    # Logistics old -> new
    "dp-world-fleet" = "fleet-management-gulf-logistics"
    "aramex-warehouse" = "warehouse-automation-gulf-logistics"
    "fetchr-lastmile" = "fleet-management-gulf-logistics"
    "alfuttaim-controltower" = "fleet-management-gulf-logistics"
    
    # E-commerce old -> new
    "noon-marketplace" = "multi-vendor-marketplace"
    "majid-al-futtaim-omnichannel" = "omnichannel-gulf-retail"
    "namshi-mobile-app" = "multi-vendor-marketplace"
    "alfuttaim-b2b" = "omnichannel-gulf-retail"
    
    # Government old -> new
    "smart-dubai-platform" = "smart-city-platform"
    "ad-digital-portal" = "citizen-service-portal"
    "dubai-police-traffic" = "smart-city-platform"
    "moi-document-system" = "citizen-service-portal"
    
    # Services old -> new
    "digital-banking-platform" = "digital-banking-gulf-financial"
    "ecommerce-marketplace" = "multi-vendor-marketplace"
    "healthcare-portal" = "ehr-gulf-health"
    "logistics-tracking-system" = "fleet-management-gulf-logistics"
    "dha-ai-diagnosis" = "ehr-gulf-health"
    "emirates-nbd-fraud-detection" = "fraud-detection-securebank"
    "dp-world-predictive-maintenance" = "fleet-management-gulf-logistics"
    "majid-al-futtaim-recommendations" = "multi-vendor-marketplace"
    "emirates-nbd-aws-migration" = "cloud-migration-gulf-financial"
    "dp-world-hybrid-cloud" = "cloud-migration-gulf-financial"
    "dha-kubernetes-modernization" = "cloud-migration-gulf-financial"
    "majid-al-futtaim-multi-cloud" = "cloud-migration-gulf-financial"
    "emirates-nbd-cicd" = "devops-transformation-gulf-tech"
    "dp-world-kubernetes" = "devops-transformation-gulf-tech"
    "dha-observability" = "devops-transformation-gulf-tech"
    "majid-al-futtaim-iac" = "devops-transformation-gulf-tech"
    "majid-al-futtaim-erp" = "property-management-dubai-heights"
    "emirates-nbd-crm" = "digital-banking-gulf-financial"
    "dha-hcm" = "ehr-gulf-health"
    "dp-world-scm" = "fleet-management-gulf-logistics"
    "majid-al-futtaim-transformation" = "omnichannel-gulf-retail"
    "emirates-nbd-automation" = "fraud-detection-securebank"
    "dha-digital-maturity" = "ehr-gulf-health"
    "dp-world-digital-strategy" = "fleet-management-gulf-logistics"
}

# Define all service and solution pages to update
$pages = @(
    # Service Pages (7)
    "app\services\software-engineering\page.tsx",
    "app\services\ai-automation\page.tsx",
    "app\services\cloud-platforms\page.tsx",
    "app\services\devops-sre\page.tsx",
    "app\services\enterprise-systems\page.tsx",
    "app\services\digital-transformation\page.tsx",
    
    # Solution Pages (6)
    "app\solutions\fintech\page.tsx",
    "app\solutions\real-estate\page.tsx",
    "app\solutions\healthcare\page.tsx",
    "app\solutions\logistics\page.tsx",
    "app\solutions\ecommerce\page.tsx",
    "app\solutions\government\page.tsx"
)

function Update-CaseStudyLinks {
    param($pagePath)
    
    if (-not (Test-Path $pagePath)) {
        Write-Host "⚠️  Page not found: $pagePath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "📄 Processing: $pagePath" -ForegroundColor Cyan
    
    # Read the file content
    $content = Get-Content -Path $pagePath -Raw
    $originalContent = $content
    $changes = 0
    
    # Replace each old slug with new slug
    foreach ($oldSlug in $slugMapping.Keys) {
        $newSlug = $slugMapping[$oldSlug]
        
        # Look for patterns like: slug: 'old-slug' or slug: "old-slug"
        if ($content -match "slug: ['`"]$oldSlug['`"]") {
            $content = $content -replace "slug: ['`"]$oldSlug['`"]", "slug: '$newSlug'"
            $changes++
            Write-Host "  🔄 Replaced: $oldSlug -> $newSlug" -ForegroundColor Gray
        }
        
        # Also check for href links
        if ($content -match "href: ['`"]/case-studies/$oldSlug['`"]") {
            $content = $content -replace "href: ['`"]/case-studies/$oldSlug['`"]", "href: '/case-studies/$newSlug'"
            $changes++
            Write-Host "  🔄 Replaced link: $oldSlug -> $newSlug" -ForegroundColor Gray
        }
    }
    
    if ($changes -gt 0) {
        # Write back to file
        $content | Set-Content -Path $pagePath -Encoding UTF8
        Write-Host "  ✅ Updated $changes links in $pagePath" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  No changes needed in $pagePath" -ForegroundColor Yellow
    }
    
    return $changes
}

# Process each page
Write-Host "🚀 Starting to update case study links..." -ForegroundColor Magenta
Write-Host ""

$totalChanges = 0
foreach ($page in $pages) {
    $changes = Update-CaseStudyLinks -pagePath $page
    $totalChanges += $changes
    Write-Host ""
}

Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Total links updated: $totalChanges" -ForegroundColor Green
Write-Host "`n🎉 All case study links have been updated!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test these URLs:" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/smart-building-dubai-heights" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/multi-vendor-marketplace" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000/case-studies/digital-banking-gulf-financial" -ForegroundColor Yellow