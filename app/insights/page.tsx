import { Metadata } from 'next'
import BlogClient from '@/components/insights/BlogClient'

export const metadata: Metadata = {
  title: 'Insights & Blog | Otaksi Connect',
  description: 'Explore the latest insights, tutorials, and industry perspectives from our team of experts.',
  keywords: 'tech blog, software engineering insights, ai tutorials, digital transformation articles',
  openGraph: {
    title: 'Insights & Blog | Otaksi Connect',
    description: 'Explore the latest insights, tutorials, and industry perspectives from our team.',
    url: 'https://otaksi.ae/insights',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/insights/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Insights',
      },
    ],
  },
}

export default function InsightsPage() {
  return <BlogClient />
}