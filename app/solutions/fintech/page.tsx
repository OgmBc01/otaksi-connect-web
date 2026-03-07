import { Metadata } from 'next'
import Hero from '@/components/solutions/fintech/Hero'
import OurApproach from '@/components/solutions/fintech/OurApproach'
import Solutions from '@/components/solutions/fintech/Solutions'
import Technologies from '@/components/solutions/fintech/Technologies'
import Process from '@/components/solutions/fintech/Process'
import CaseStudies from '@/components/solutions/fintech/CaseStudies'
import WhyChooseUs from '@/components/solutions/fintech/WhyChooseUs'
import FAQ from '@/components/solutions/fintech/FAQ'
import CTASection from '@/components/solutions/fintech/CTASection'

export const metadata: Metadata = {
  title: 'FinTech Solutions Dubai | Banking, Payments, Compliance & Islamic Finance',
  description: 'Comprehensive FinTech solutions for UAE financial institutions. Digital banking, payment gateways, regulatory compliance, and Islamic finance software.',
  keywords: 'fintech dubai, digital banking uae, payment gateway dubai, islamic finance software, regulatory compliance, core banking system, psd2 compliance',
  openGraph: {
    title: 'FinTech Solutions Dubai | Otaksi Connect',
    description: 'Comprehensive FinTech solutions for UAE financial institutions. Digital banking, payment gateways, regulatory compliance, and Islamic finance software.',
    url: 'https://otaksi.ae/solutions/fintech',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/fintech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect FinTech Solutions',
      },
    ],
  },
}

export default function FinTechPage() {
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