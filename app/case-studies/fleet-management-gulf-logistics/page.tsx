import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Fleet Management System - Gulf Logistics | Otaksi Connect',
  description: 'Comprehensive fleet management system for 1,000+ vehicles, optimizing routes and reducing fuel costs.',
  openGraph: {
    title: 'Fleet Management System - Gulf Logistics',
    description: 'Comprehensive fleet management system for 1,000+ vehicles, optimizing routes and reducing fuel costs.',
    url: 'https://otaksi.ae/case-studies/fleet-management-gulf-logistics',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/fleet-management-gulf-logistics/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fleet Management System',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
