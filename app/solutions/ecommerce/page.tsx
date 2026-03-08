import { Metadata } from 'next'
import Hero from '@/components/solutions/ecommerce/Hero'
import OurApproach from '@/components/solutions/ecommerce/OurApproach'
import Solutions from '@/components/solutions/ecommerce/Solutions'
import Technologies from '@/components/solutions/ecommerce/Technologies'
import Process from '@/components/solutions/ecommerce/Process'
import CaseStudies from '@/components/solutions/ecommerce/CaseStudies'
import WhyChooseUs from '@/components/solutions/ecommerce/WhyChooseUs'
import FAQ from '@/components/solutions/ecommerce/FAQ'
import CTASection from '@/components/solutions/ecommerce/CTASection'

export const metadata: Metadata = {
  title: 'E-commerce Solutions Dubai | Online Stores, Marketplaces, Payment Integration',
  description: 'End-to-end e-commerce technology solutions for UAE businesses. Custom online stores, marketplace platforms, payment gateway integration, and mobile commerce.',
  keywords: 'ecommerce solutions dubai, online store development uae, marketplace platform, payment gateway integration, mobile commerce, shopping cart, inventory management',
  openGraph: {
    title: 'E-commerce Solutions Dubai | Otaksi Connect',
    description: 'End-to-end e-commerce technology solutions for UAE businesses. Custom online stores, marketplace platforms, payment gateway integration, and mobile commerce.',
    url: 'https://otaksi.ae/solutions/ecommerce',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/solutions/ecommerce/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect E-commerce Solutions',
      },
    ],
  },
}

export default function EcommercePage() {
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