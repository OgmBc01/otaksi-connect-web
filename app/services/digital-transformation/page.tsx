import { Metadata } from 'next'
import Hero from '@/components/services/digital-transformation/Hero'
import OurApproach from '@/components/services/digital-transformation/OurApproach'
import Services from '@/components/services/digital-transformation/Services'
import Technologies from '@/components/services/digital-transformation/Technologies'
import Process from '@/components/services/digital-transformation/Process'
import CaseStudies from '@/components/services/digital-transformation/CaseStudies'
import WhyChooseUs from '@/components/services/digital-transformation/WhyChooseUs'
import FAQ from '@/components/services/digital-transformation/FAQ'
import CTASection from '@/components/services/digital-transformation/CTASection'

export const metadata: Metadata = {
  title: 'Digital Transformation Services Dubai | Business Innovation & Strategy',
  description: 'End-to-end digital transformation consulting for UAE businesses. Strategy development, process automation, cultural change, and technology implementation.',
  keywords: 'digital transformation dubai, business innovation uae, digital strategy, process automation, change management, digital maturity assessment',
  openGraph: {
    title: 'Digital Transformation Services Dubai | Otaksi Connect',
    description: 'End-to-end digital transformation consulting for UAE businesses. Strategy, automation, cultural change, and technology implementation.',
    url: 'https://otaksi.ae/services/digital-transformation',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/digital-transformation/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Digital Transformation Services',
      },
    ],
  },
}

export default function DigitalTransformationPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <OurApproach />
      <Services />
      <Technologies />
      <Process />
      <CaseStudies />
      <WhyChooseUs />
      <FAQ />
      <CTASection />
    </main>
  )
}