import { Metadata } from 'next'
import Hero from '@/components/solutions/government/Hero'
import OurApproach from '@/components/solutions/government/OurApproach'
import Solutions from '@/components/solutions/government/Solutions'
import Technologies from '@/components/solutions/government/Technologies'
import Process from '@/components/solutions/government/Process'
import CaseStudies from '@/components/solutions/government/CaseStudies'
import WhyChooseUs from '@/components/solutions/government/WhyChooseUs'
import FAQ from '@/components/solutions/government/FAQ'
import CTASection from '@/components/solutions/government/CTASection'

export const metadata: Metadata = {
  title: 'Government Solutions Dubai | Smart City, Citizen Services, Digital Transformation',
  description: 'Innovative technology solutions for UAE government entities. Smart city platforms, citizen service portals, digital transformation, and e-government systems.',
  keywords: 'government solutions dubai, smart city uae, citizen services, e-government, digital transformation government, smart dubai, federal services',
  openGraph: {
    title: 'Government Solutions Dubai | Otaksi Connect',
    description: 'Innovative technology solutions for UAE government entities. Smart city platforms, citizen service portals, and e-government systems.',
    url: 'https://otaksi.ae/solutions/government',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/government/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Government Solutions',
      },
    ],
  },
}

export default function GovernmentPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <OurApproach />
      <Solutions />
      <Technologies />
      <Process />
      <CaseStudies />
      <WhyChooseUs />
      <FAQ />
      <CTASection />
    </main>
  )
}