import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Telemedicine Platform - Gulf Health System | Otaksi Connect',
  description: 'Secure telemedicine platform enabling 100K+ virtual consultations annually.',
  openGraph: {
    title: 'Telemedicine Platform - Gulf Health System',
    description: 'Secure telemedicine platform enabling 100K+ virtual consultations annually.',
    url: 'https://otaksi.ae/case-studies/telemedicine-gulf-health',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/telemedicine-gulf-health/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Telemedicine Platform',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
