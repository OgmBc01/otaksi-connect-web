import { Metadata } from 'next'
import Hero from '@/components/solutions/healthcare/Hero'
import OurApproach from '@/components/solutions/healthcare/OurApproach'
import Solutions from '@/components/solutions/healthcare/Solutions'
import Technologies from '@/components/solutions/healthcare/Technologies'
import Process from '@/components/solutions/healthcare/Process'
import CaseStudies from '@/components/solutions/healthcare/CaseStudies'
import WhyChooseUs from '@/components/solutions/healthcare/WhyChooseUs'
import FAQ from '@/components/solutions/healthcare/FAQ'
import CTASection from '@/components/solutions/healthcare/CTASection'

export const metadata: Metadata = {
  title: 'Healthcare Solutions Dubai | EHR, Telemedicine, Patient Portals, DHA Compliance',
  description: 'Innovative healthcare technology solutions for UAE medical providers. Electronic Health Records, telemedicine platforms, patient portals, and DHA-compliant systems.',
  keywords: 'healthcare solutions dubai, ehr uae, telemedicine platform, patient portal, dha compliance, hospital management system, medical software dubai',
  openGraph: {
    title: 'Healthcare Solutions Dubai | Otaksi Connect',
    description: 'Innovative healthcare technology solutions for UAE medical providers. EHR, telemedicine, patient portals, and DHA-compliant systems.',
    url: 'https://otaksi.ae/solutions/healthcare',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/healthcare/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Healthcare Solutions',
      },
    ],
  },
}

export default function HealthcarePage() {
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