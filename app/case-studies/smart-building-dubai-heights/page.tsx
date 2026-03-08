import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Smart Building IoT Platform - Dubai Heights Real Estate | Otaksi Connect',
  description: 'IoT-enabled building management system for 50+ luxury residential towers.',
  openGraph: {
    title: 'Smart Building IoT Platform - Dubai Heights Real Estate',
    description: 'IoT-enabled building management system for 50+ luxury residential towers.',
    url: 'https://otaksi.ae/case-studies/smart-building-dubai-heights',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/smart-building-dubai-heights/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Building IoT Platform',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}