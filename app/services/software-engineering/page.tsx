import { Metadata } from 'next'
import SoftwareEngineeringHero from '@/components/services/software-engineering/Hero'
import OurApproach from '@/components/services/software-engineering/OurApproach'
import Technologies from '@/components/services/software-engineering/Technologies'
import DevelopmentProcess from '@/components/services/software-engineering/DevelopmentProcess'
import CaseStudies from '@/components/services/software-engineering/CaseStudies'
import WhyChooseUs from '@/components/services/software-engineering/WhyChooseUs'
import FAQ from '@/components/services/software-engineering/FAQ'
import CTASection from '@/components/services/software-engineering/CTASection'

export const metadata: Metadata = {
  title: 'Software Engineering Services Dubai | Custom Web & Mobile Development',
  description: 'Enterprise-grade software engineering in Dubai. We build custom web applications, mobile apps, and microservices for UAE businesses. React, Node.js, Python experts.',
  keywords: 'software engineering dubai, custom software development uae, web application development, mobile app development dubai, enterprise software solutions, microservices dubai',
  openGraph: {
    title: 'Software Engineering Services Dubai | Otaksi Connect',
    description: 'Enterprise-grade software engineering in Dubai. We build custom web applications, mobile apps, and microservices for UAE businesses.',
    url: 'https://otaksi.ae/services/software-engineering',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
  },
}

export default function SoftwareEngineeringPage() {
  return (
    <main className="bg-midnight">
      <SoftwareEngineeringHero />
      <OurApproach />
      <Technologies />
      <DevelopmentProcess />
      <CaseStudies />
      <WhyChooseUs />
      <FAQ />
      <CTASection />
    </main>
  )
}