import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Omnichannel Retail Platform - Gulf Retail Group | Otaksi Connect',
  description: 'Integrated e-commerce platform connecting online stores with 50+ physical retail locations.',
  openGraph: {
    title: 'Omnichannel Retail Platform - Gulf Retail Group',
    description: 'Integrated e-commerce platform connecting online stores with 50+ physical retail locations.',
    url: 'https://otaksi.ae/case-studies/omnichannel-gulf-retail',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/omnichannel-gulf-retail/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Omnichannel Retail Platform',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
