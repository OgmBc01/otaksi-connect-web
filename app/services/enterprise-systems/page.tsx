import { Metadata } from 'next'
import Hero from '../../../src/components/services/enterprise-systems/Hero'
import OurApproach from '../../../src/components/services/enterprise-systems/OurApproach'
import Solutions from '../../../src/components/services/enterprise-systems/Solutions'
import Technologies from '../../../src/components/services/enterprise-systems/Technologies'
import Process from '../../../src/components/services/enterprise-systems/Process'
import CaseStudies from '../../../src/components/services/enterprise-systems/CaseStudies'
import WhyChooseUs from '../../../src/components/services/enterprise-systems/WhyChooseUs'
import FAQ from '../../../src/components/services/enterprise-systems/FAQ'
import CTASection from '../../../src/components/services/enterprise-systems/CTASection'

export const metadata: Metadata = {
  title: 'Enterprise Systems & Solutions Dubai | ERP, CRM, Custom Business Software',
  description: 'Comprehensive enterprise systems for UAE businesses. ERP, CRM, HRMS, and custom business software solutions tailored to your industry.',
  keywords: 'enterprise systems dubai, erp solutions uae, crm software dubai, hrms, business software, enterprise architecture, digital transformation',
  openGraph: {
    title: 'Enterprise Systems & Solutions Dubai | Otaksi Connect',
    description: 'Comprehensive enterprise systems for UAE businesses. ERP, CRM, HRMS, and custom business software solutions.',
    url: 'https://otaksi.ae/services/enterprise-systems',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/enterprise-systems/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Enterprise Systems & Solutions',
      },
    ],
  },
}

export default function EnterpriseSystemsPage() {
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