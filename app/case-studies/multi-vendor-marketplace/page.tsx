import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Multi-vendor Marketplace - Gulf Mart | Otaksi Connect',
  description: 'Scalable marketplace platform serving 1M+ customers with 5,000+ sellers.',
  openGraph: {
    title: 'Multi-vendor Marketplace - Gulf Mart',
    description: 'Scalable marketplace platform serving 1M+ customers with 5,000+ sellers.',
    url: 'https://otaksi.ae/case-studies/multi-vendor-marketplace',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/multi-vendor-marketplace/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Multi-vendor Marketplace',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
