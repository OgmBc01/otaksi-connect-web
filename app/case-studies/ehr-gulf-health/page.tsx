import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Electronic Health Records System - Gulf Health System | Otaksi Connect',
  description: 'Enterprise-wide EHR system implementation across 15 hospitals, serving 2M+ patients.',
  openGraph: {
    title: 'Electronic Health Records System - Gulf Health System',
    description: 'Enterprise-wide EHR system implementation across 15 hospitals, serving 2M+ patients.',
    url: 'https://otaksi.ae/case-studies/ehr-gulf-health',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/ehr-gulf-health/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Electronic Health Records System',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
