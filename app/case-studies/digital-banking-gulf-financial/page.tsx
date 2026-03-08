import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Digital Banking Platform - Gulf Financial | Otaksi Connect',
  description: 'Complete digital banking transformation serving 2M+ customers with real-time payments and AI-powered insights.',
  openGraph: {
    title: 'Digital Banking Platform - Gulf Financial',
    description: 'Complete digital banking transformation serving 2M+ customers with real-time payments and AI-powered insights.',
    url: 'https://otaksi.ae/case-studies/digital-banking-gulf-financial',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/digital-banking-gulf-financial/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Banking Platform',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
