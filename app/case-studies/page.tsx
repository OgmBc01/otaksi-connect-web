import { Metadata } from 'next'
import CaseStudiesGrid from '@/components/case-studies/overview/CaseStudiesGrid'
import Hero from '@/components/case-studies/overview/Hero'
import FeaturedCaseStudies from '@/components/case-studies/overview/FeaturedCaseStudies'
import CTASection from '@/components/case-studies/overview/CTASection'

export const metadata: Metadata = {
  title: 'Case Studies | Otaksi Connect - Client Success Stories',
  description: 'Explore our portfolio of successful digital transformation projects across FinTech, Healthcare, Real Estate, Logistics, E-commerce, and Government sectors in the UAE.',
  keywords: 'case studies dubai, software projects uae, digital transformation examples, fintech case studies, healthcare technology projects',
  openGraph: {
    title: 'Case Studies | Otaksi Connect',
    description: 'Explore our portfolio of successful digital transformation projects across UAE industries.',
    url: 'https://otaksi.ae/case-studies',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/case-studies/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Case Studies',
      },
    ],
  },
}

export default function CaseStudiesOverviewPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <FeaturedCaseStudies />
      <CaseStudiesGrid />
      <CTASection />
    </main>
  )
}