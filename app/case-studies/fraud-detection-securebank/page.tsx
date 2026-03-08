import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'AI-Powered Fraud Detection - SecureBank | Otaksi Connect',
  description: 'Real-time ML model detecting fraudulent transactions with 99.9% accuracy, saving millions in potential losses.',
  openGraph: {
    title: 'AI-Powered Fraud Detection - SecureBank',
    description: 'Real-time ML model detecting fraudulent transactions with 99.9% accuracy, saving millions in potential losses.',
    url: 'https://otaksi.ae/case-studies/fraud-detection-securebank',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/fraud-detection-securebank/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Fraud Detection',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
