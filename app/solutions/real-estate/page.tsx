import { Metadata } from 'next'
import Hero from '@/components/solutions/real-estate/Hero'
import OurApproach from '@/components/solutions/real-estate/OurApproach'
import Solutions from '@/components/solutions/real-estate/Solutions'
import Technologies from '@/components/solutions/real-estate/Technologies'
import Process from '@/components/solutions/real-estate/Process'
import CaseStudies from '@/components/solutions/real-estate/CaseStudies'
import WhyChooseUs from '@/components/solutions/real-estate/WhyChooseUs'
import FAQ from '@/components/solutions/real-estate/FAQ'
import CTASection from '@/components/solutions/real-estate/CTASection'

export const metadata: Metadata = {
  title: 'Real Estate Tech Solutions Dubai | PropTech, Property Management, Smart Buildings',
  description: 'Innovative real estate technology solutions for Dubai\'s property market. Property management portals, smart building systems, real estate CRM, and PropTech platforms.',
  keywords: 'real estate tech dubai, proptech uae, property management software dubai, smart buildings, real estate crm, property portal, ejari integration',
  openGraph: {
    title: 'Real Estate Tech Solutions Dubai | Otaksi Connect',
    description: 'Innovative real estate technology solutions for Dubai\'s property market. Property management portals, smart building systems, and PropTech platforms.',
    url: 'https://otaksi.ae/solutions/real-estate',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/real-estate/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Real Estate Tech Solutions',
      },
    ],
  },
}

export default function RealEstatePage() {
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