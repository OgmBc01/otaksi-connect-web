import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'DevOps Transformation - Gulf Tech | Otaksi Connect',
  description: 'Implemented automated CI/CD pipelines reducing deployment time from days to minutes.',
  openGraph: {
    title: 'DevOps Transformation - Gulf Tech',
    description: 'Implemented automated CI/CD pipelines reducing deployment time from days to minutes.',
    url: 'https://otaksi.ae/case-studies/devops-transformation-gulf-tech',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/devops-transformation-gulf-tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevOps Transformation',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
