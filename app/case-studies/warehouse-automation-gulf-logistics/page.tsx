import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Warehouse Automation - Gulf Logistics | Otaksi Connect',
  description: 'Automated warehouse operations with WMS and robotics, increasing throughput by 40%.',
  openGraph: {
    title: 'Warehouse Automation - Gulf Logistics',
    description: 'Automated warehouse operations with WMS and robotics, increasing throughput by 40%.',
    url: 'https://otaksi.ae/case-studies/warehouse-automation-gulf-logistics',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/warehouse-automation-gulf-logistics/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Warehouse Automation',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
