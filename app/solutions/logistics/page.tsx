import { Metadata } from 'next'
import Hero from '@/components/solutions/logistics/Hero'
import OurApproach from '@/components/solutions/logistics/OurApproach'
import Solutions from '@/components/solutions/logistics/Solutions'
import Technologies from '@/components/solutions/logistics/Technologies'
import Process from '@/components/solutions/logistics/Process'
import CaseStudies from '@/components/solutions/logistics/CaseStudies'
import WhyChooseUs from '@/components/solutions/logistics/WhyChooseUs'
import FAQ from '@/components/solutions/logistics/FAQ'
import CTASection from '@/components/solutions/logistics/CTASection'

export const metadata: Metadata = {
  title: 'Logistics & Supply Chain Solutions Dubai | Fleet Management, Warehouse Automation, Tracking',
  description: 'End-to-end logistics and supply chain technology solutions for UAE businesses. Fleet management, warehouse automation, real-time tracking, and inventory optimization.',
  keywords: 'logistics solutions dubai, supply chain management uae, fleet management software, warehouse automation, real-time tracking, inventory optimization, last mile delivery',
  openGraph: {
    title: 'Logistics & Supply Chain Solutions Dubai | Otaksi Connect',
    description: 'End-to-end logistics and supply chain technology solutions for UAE businesses. Fleet management, warehouse automation, real-time tracking, and inventory optimization.',
    url: 'https://otaksi.ae/solutions/logistics',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/logistics/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Logistics & Supply Chain Solutions',
      },
    ],
  },
}

export default function LogisticsPage() {
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