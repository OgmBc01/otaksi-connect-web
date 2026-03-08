# 8-find-old-slugs.ps1
# Find all instances of old case study slugs

$oldSlugs = @(
    "emirates-nbd-crm",
    "emirates-nbd-digital-banking",
    "dubai-islamic-banking",
    "network-international-payment",
    "adcb-regtech",
    "dha-ehr-implementation",
    "mediclinic-telemedicine",
    "nmc-patient-portal",
    "aster-lis",
    "emaar-smart-building",
    "dubai-properties-pms",
    "property-finder-marketplace",
    "wasl-ejari-integration",
    "dp-world-fleet",
    "aramex-warehouse",
    "fetchr-lastmile",
    "alfuttaim-controltower",
    "noon-marketplace",
    "majid-al-futtaim-omnichannel",
    "namshi-mobile-app",
    "alfuttaim-b2b",
    "smart-dubai-platform",
    "ad-digital-portal",
    "dubai-police-traffic",
    "moi-document-system"
)

$searchPaths = @(
    "app\services",
    "app\solutions",
    "app\case-studies",
    "src\components"
)

Write-Host "🔍 Searching for old case study slugs..." -ForegroundColor Magenta
Write-Host ""

foreach ($slug in $oldSlugs) {
    Write-Host "Checking: $slug" -ForegroundColor Cyan
    
    foreach ($path in $searchPaths) {
        if (Test-Path $path) {
            $files = Get-ChildItem -Path $path -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js" | Select-String -Pattern $slug -List
            foreach ($file in $files) {
                Write-Host "  Found in: $($file.Path)" -ForegroundColor Yellow
            }
        }
    }
    Write-Host ""
}

Write-Host "✅ Search complete!" -ForegroundColor Green