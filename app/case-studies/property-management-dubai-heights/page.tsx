import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Property Management System - Dubai Heights Real Estate | Otaksi Connect',
  description: 'Comprehensive property management platform for 20,000+ residential units.',
  openGraph: {
    title: 'Property Management System - Dubai Heights Real Estate',
    description: 'Comprehensive property management platform for 20,000+ residential units.',
    url: 'https://otaksi.ae/case-studies/property-management-dubai-heights',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/property-management-dubai-heights/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Property Management System',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
