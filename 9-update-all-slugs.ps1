# 9-update-all-slugs.ps1
# Replace all old case study slugs with new ones

$slugMapping = @{
    # FinTech
    "emirates-nbd-crm" = "digital-banking-gulf-financial"
    "emirates-nbd-digital-banking" = "digital-banking-gulf-financial"
    "dubai-islamic-banking" = "digital-banking-gulf-financial"
    "network-international-payment" = "payment-gateway-gulf-pay"
    "adcb-regtech" = "fraud-detection-securebank"
    
    # Healthcare
    "dha-ehr-implementation" = "ehr-gulf-health"
    "mediclinic-telemedicine" = "telemedicine-gulf-health"
    "nmc-patient-portal" = "ehr-gulf-health"
    "aster-lis" = "ehr-gulf-health"
    
    # Real Estate
    "emaar-smart-building" = "smart-building-dubai-heights"
    "dubai-properties-pms" = "property-management-dubai-heights"
    "property-finder-marketplace" = "multi-vendor-marketplace"
    "wasl-ejari-integration" = "property-management-dubai-heights"
    
    # Logistics
    "dp-world-fleet" = "fleet-management-gulf-logistics"
    "aramex-warehouse" = "warehouse-automation-gulf-logistics"
    "fetchr-lastmile" = "fleet-management-gulf-logistics"
    "alfuttaim-controltower" = "fleet-management-gulf-logistics"
    
    # E-commerce
    "noon-marketplace" = "multi-vendor-marketplace"
    "majid-al-futtaim-omnichannel" = "omnichannel-gulf-retail"
    "namshi-mobile-app" = "multi-vendor-marketplace"
    "alfuttaim-b2b" = "omnichannel-gulf-retail"
    
    # Government
    "smart-dubai-platform" = "smart-city-platform"
    "ad-digital-portal" = "citizen-service-portal"
    "dubai-police-traffic" = "smart-city-platform"
    "moi-document-system" = "citizen-service-portal"
    
    # Additional mappings
    "healthcare-portal" = "ehr-gulf-health"
    "logistics-tracking-system" = "fleet-management-gulf-logistics"
    "digital-banking-platform" = "digital-banking-gulf-financial"
    "ecommerce-marketplace" = "multi-vendor-marketplace"
    "dha-ai-diagnosis" = "ehr-gulf-health"
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
    "dha-hcm" = "ehr-gulf-health"
    "dp-world-scm" = "fleet-management-gulf-logistics"
    "majid-al-futtaim-transformation" = "omnichannel-gulf-retail"
    "emirates-nbd-automation" = "fraud-detection-securebank"
    "dha-digital-maturity" = "ehr-gulf-health"
    "dp-world-digital-strategy" = "fleet-management-gulf-logistics"
}

$searchPaths = @(
    "app\services",
    "app\solutions",
    "app\case-studies",
    "src\components"
)

Write-Host "🚀 Updating all old case study slugs..." -ForegroundColor Magenta
Write-Host ""

$totalReplacements = 0
$updatedFiles = @()

foreach ($path in $searchPaths) {
    if (Test-Path $path) {
        $files = Get-ChildItem -Path $path -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js"
        
        foreach ($file in $files) {
            $content = Get-Content -Path $file.FullName -Raw
            $fileChanged = $false
            
            foreach ($oldSlug in $slugMapping.Keys) {
                $newSlug = $slugMapping[$oldSlug]
                
                # Replace in URLs
                if ($content -match "/case-studies/$oldSlug") {
                    $content = $content -replace "/case-studies/$oldSlug", "/case-studies/$newSlug"
                    $fileChanged = $true
                    $totalReplacements++
                    Write-Host "  🔄 URL: $oldSlug -> $newSlug in $($file.Name)" -ForegroundColor Gray
                }
                
                # Replace in slug properties
                if ($content -match "slug: ['`"]$oldSlug['`"]") {
                    $content = $content -replace "slug: ['`"]$oldSlug['`"]", "slug: '$newSlug'"
                    $fileChanged = $true
                    $totalReplacements++
                    Write-Host "  🔄 Slug: $oldSlug -> $newSlug in $($file.Name)" -ForegroundColor Gray
                }
            }
            
            if ($fileChanged) {
                $content | Set-Content -Path $file.FullName -Encoding UTF8
                $updatedFiles += $file.FullName
                Write-Host "  ✅ Updated: $($file.Name)" -ForegroundColor Green
            }
        }
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Files updated: $($updatedFiles.Count)" -ForegroundColor Green
Write-Host "  ✅ Total replacements: $totalReplacements" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Updated files:" -ForegroundColor Yellow
foreach ($file in $updatedFiles | Sort-Object | Get-Unique) {
    Write-Host "  - $file" -ForegroundColor Gray
}
Write-Host ""
Write-Host "🔧 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Test the previously broken link:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000/case-studies/emirates-nbd-crm" -ForegroundColor Yellow
Write-Host "   (It should now show the new case study)" -ForegroundColor Yellow