import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Smart City Platform - Dubai Digital Government | Otaksi Connect',
  description: 'Integrated smart city platform connecting 50+ government services and IoT infrastructure.',
  openGraph: {
    title: 'Smart City Platform - Dubai Digital Government',
    description: 'Integrated smart city platform connecting 50+ government services and IoT infrastructure.',
    url: 'https://otaksi.ae/case-studies/smart-city-platform',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/smart-city-platform/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart City Platform',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
