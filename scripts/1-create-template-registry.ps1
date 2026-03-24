# 1-create-template-registry.ps1
# Creates a JSON registry of all 15 case study templates

$templateRegistry = @{
    templates = @(
        # FinTech & Banking (3)
        @{
            id = "digital-banking-gulf-financial"
            title = "Digital Banking Platform"
            client = "Gulf Financial"
            industry = "FinTech"
            category = "FinTech"
            description = "Complete digital banking transformation serving 2M+ customers with real-time payments and AI-powered insights."
            technologies = @("React Native", "Node.js", "AWS", "Kubernetes", "MongoDB", "Redis")
            metrics = @("2M+ users", "Real-time payments", "AI insights", "99.99% uptime")
            results = "45% digital adoption, 40% operational efficiency"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "💰"
        },
        @{
            id = "fraud-detection-securebank"
            title = "AI-Powered Fraud Detection"
            client = "SecureBank"
            industry = "FinTech"
            category = "FinTech"
            description = "Real-time ML model detecting fraudulent transactions with 99.9% accuracy, saving millions in potential losses."
            technologies = @("Python", "TensorFlow", "Apache Kafka", "Redis", "PostgreSQL")
            metrics = @("99.9% accuracy", "Real-time detection", "50% false positive reduction", "2M+ transactions/day")
            results = "Saved AED 50M+ in potential fraud losses"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "🔒"
        },
        @{
            id = "payment-gateway-gulf-pay"
            title = "Payment Gateway Integration"
            client = "Gulf Pay"
            industry = "FinTech"
            category = "FinTech"
            description = "Enterprise payment gateway processing 1M+ daily transactions with multi-currency support."
            technologies = @("Stripe", "Node.js", "AWS", "Redis", "PostgreSQL")
            metrics = @("1M+ daily txns", "100+ currencies", "PCI DSS Level 1", "3D Secure")
            results = "99.99% uptime, 98% success rate"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "💳"
        },
        
        # Healthcare (2)
        @{
            id = "ehr-gulf-health"
            title = "Electronic Health Records System"
            client = "Gulf Health System"
            industry = "Healthcare"
            category = "Healthcare"
            description = "Enterprise-wide EHR system implementation across 15 hospitals, serving 2M+ patients."
            technologies = @("React", "FastAPI", "FHIR", "PostgreSQL", "Redis", "Docker")
            metrics = @("2M+ patients", "15 hospitals", "Unified records", "Real-time data")
            results = "40% faster diagnosis, 500K+ records"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "🏥"
        },
        @{
            id = "telemedicine-gulf-health"
            title = "Telemedicine Platform"
            client = "Gulf Health System"
            industry = "Healthcare"
            category = "Healthcare"
            description = "Secure telemedicine platform enabling 100K+ virtual consultations annually."
            technologies = @("React", "WebRTC", "Node.js", "MongoDB", "Redis")
            metrics = @("100K+ consultations", "95% satisfaction", "Video visits", "E-prescriptions")
            results = "50% no-show reduction, expanded reach"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "📹"
        },
        
        # Real Estate (2)
        @{
            id = "property-management-dubai-heights"
            title = "Property Management System"
            client = "Dubai Heights Real Estate"
            industry = "Real Estate"
            category = "PropTech"
            description = "Comprehensive property management platform for 20,000+ residential units."
            technologies = @("React", "Node.js", "PostgreSQL", "Redis", "AWS")
            metrics = @("20K+ units", "Tenant portal", "Automated payments", "Maintenance tracking")
            results = "40% efficiency gain, 90% faster Ejari registration"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "🏢"
        },
        @{
            id = "smart-building-dubai-heights"
            title = "Smart Building IoT Platform"
            client = "Dubai Heights Real Estate"
            industry = "Real Estate"
            category = "PropTech"
            description = "IoT-enabled building management system for 50+ luxury residential towers."
            technologies = @("IoT", "Node.js", "InfluxDB", "Grafana", "MQTT")
            metrics = @("50+ buildings", "IoT sensors", "Tenant app", "Energy monitoring")
            results = "35% energy savings, 24/7 security"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "🏙️"
        },
        
        # Logistics (2)
        @{
            id = "fleet-management-gulf-logistics"
            title = "Fleet Management System"
            client = "Gulf Logistics"
            industry = "Logistics"
            category = "Logistics"
            description = "Comprehensive fleet management system for 1,000+ vehicles, optimizing routes and reducing fuel costs."
            technologies = @("React", "Node.js", "PostgreSQL", "Redis", "GPS Integration")
            metrics = @("1,000+ vehicles", "Real-time tracking", "Route optimization", "Driver behavior")
            results = "30% fuel savings, 25% efficiency gain"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "🚛"
        },
        @{
            id = "warehouse-automation-gulf-logistics"
            title = "Warehouse Automation"
            client = "Gulf Logistics"
            industry = "Logistics"
            category = "Logistics"
            description = "Automated warehouse operations with WMS and robotics, increasing throughput by 40%."
            technologies = @("React", "Python", "PostgreSQL", "IoT", "Robotics")
            metrics = @("40% throughput increase", "99.9% accuracy", "Automated picking", "Space optimization")
            results = "50% faster order processing"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "🏭"
        },
        
        # E-commerce (2)
        @{
            id = "multi-vendor-marketplace"
            title = "Multi-vendor Marketplace"
            client = "Gulf Mart"
            industry = "E-commerce"
            category = "E-commerce"
            description = "Scalable marketplace platform serving 1M+ customers with 5,000+ sellers."
            technologies = @("Next.js", "Node.js", "PostgreSQL", "Redis", "Elasticsearch")
            metrics = @("1M+ customers", "5K+ sellers", "Multi-vendor", "Commission tracking")
            results = "200% growth in 2 years"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "🛍️"
        },
        @{
            id = "omnichannel-gulf-retail"
            title = "Omnichannel Retail Platform"
            client = "Gulf Retail Group"
            industry = "E-commerce"
            category = "E-commerce"
            description = "Integrated e-commerce platform connecting online stores with 50+ physical retail locations."
            technologies = @("React", "Node.js", "PostgreSQL", "Redis", "Elasticsearch")
            metrics = @("50+ stores", "Click & collect", "Real-time inventory", "Unified commerce")
            results = "150% online growth, 40% omnichannel sales"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "🏪"
        },
        
        # Government (2)
        @{
            id = "citizen-service-portal"
            title = "Citizen Service Portal"
            client = "Dubai Digital Government"
            industry = "Government"
            category = "Government"
            description = "Unified digital portal for government services serving 1.5M+ citizens."
            technologies = @("React", "Node.js", "PostgreSQL", "Redis", "Identity Management")
            metrics = @("1.5M+ users", "80% satisfaction", "Document center", "Payment gateway")
            results = "90% digital adoption, 50% faster processing"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "👥"
        },
        @{
            id = "smart-city-platform"
            title = "Smart City Platform"
            client = "Dubai Digital Government"
            industry = "Government"
            category = "Government"
            description = "Integrated smart city platform connecting 50+ government services and IoT infrastructure."
            technologies = @("React", "Node.js", "InfluxDB", "Grafana", "MQTT")
            metrics = @("50+ services", "IoT sensors", "Real-time monitoring", "Smart lighting")
            results = "25% energy savings, 30% traffic reduction"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "🏙️"
        },
        
        # Cross-Industry (2)
        @{
            id = "cloud-migration-gulf-financial"
            title = "Cloud Migration Journey"
            client = "Gulf Financial"
            industry = "Financial Services"
            category = "Cloud"
            description = "Migrated 50+ critical applications to AWS with zero downtime, achieving 40% cost reduction."
            technologies = @("AWS", "Terraform", "Kubernetes", "Docker", "Jenkins")
            metrics = @("50+ apps migrated", "Zero downtime", "40% cost reduction", "99.99% uptime")
            results = "Cloud-native transformation complete in 6 months"
            gradient = "linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)"
            icon = "☁️"
        },
        @{
            id = "devops-transformation-gulf-tech"
            title = "DevOps Transformation"
            client = "Gulf Tech"
            industry = "Technology"
            category = "DevOps"
            description = "Implemented automated CI/CD pipelines reducing deployment time from days to minutes."
            technologies = @("Jenkins", "GitHub Actions", "Docker", "Kubernetes", "Terraform")
            metrics = @("10x faster deployments", "Daily deployments", "Zero-downtime", "50+ microservices")
            results = "From monthly to daily releases"
            gradient = "linear-gradient(135deg, #5B6CFF 0%, #FF2E9F 100%)"
            icon = "⚙️"
        }
    )
}

# Save to JSON file
$templateRegistry | ConvertTo-Json -Depth 10 | Out-File -FilePath "case-study-templates.json" -Encoding UTF8

Write-Host "✅ Template registry created at case-study-templates.json" -ForegroundColor Green
Write-Host "📊 Total templates: $($templateRegistry.templates.Count)" -ForegroundColor Cyan