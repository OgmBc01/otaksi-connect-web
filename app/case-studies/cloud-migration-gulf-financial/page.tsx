import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Cloud Migration Journey - Gulf Financial | Otaksi Connect',
  description: 'Migrated 50+ critical applications to AWS with zero downtime, achieving 40% cost reduction.',
  openGraph: {
    title: 'Cloud Migration Journey - Gulf Financial',
    description: 'Migrated 50+ critical applications to AWS with zero downtime, achieving 40% cost reduction.',
    url: 'https://otaksi.ae/case-studies/cloud-migration-gulf-financial',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/cloud-migration-gulf-financial/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cloud Migration Journey',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
