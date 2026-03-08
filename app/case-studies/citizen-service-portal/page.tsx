import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Citizen Service Portal - Dubai Digital Government | Otaksi Connect',
  description: 'Unified digital portal for government services serving 1.5M+ citizens.',
  openGraph: {
    title: 'Citizen Service Portal - Dubai Digital Government',
    description: 'Unified digital portal for government services serving 1.5M+ citizens.',
    url: 'https://otaksi.ae/case-studies/citizen-service-portal',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/citizen-service-portal/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Citizen Service Portal',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
