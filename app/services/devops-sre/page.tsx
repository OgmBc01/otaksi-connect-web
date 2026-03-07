import { Metadata } from 'next'
import Hero from '@/components/services/devops-sre/Hero'
import OurApproach from '@/components/services/devops-sre/OurApproach'
import Services from '@/components/services/devops-sre/Services'
import Technologies from '@/components/services/devops-sre/Technologies'
import Process from '@/components/services/devops-sre/Process'
import CaseStudies from '@/components/services/devops-sre/CaseStudies'
import WhyChooseUs from '@/components/services/devops-sre/WhyChooseUs'
import FAQ from '@/components/services/devops-sre/FAQ'
import CTASection from '@/components/services/devops-sre/CTASection'

export const metadata: Metadata = {
  title: 'DevOps & SRE Services Dubai | CI/CD, Automation, Site Reliability',
  description: 'Enterprise DevOps and Site Reliability Engineering services in Dubai. CI/CD pipelines, infrastructure automation, monitoring, and 24/7 reliability.',
  keywords: 'devops dubai, site reliability engineering, ci/cd pipelines, infrastructure automation, kubernetes devops, cloud monitoring, sre services uae',
  openGraph: {
    title: 'DevOps & SRE Services Dubai | Otaksi Connect',
    description: 'Enterprise DevOps and Site Reliability Engineering services in Dubai. CI/CD, automation, monitoring, and 24/7 reliability.',
    url: 'https://otaksi.ae/services/devops-sre',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/devops-sre/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect DevOps & SRE Services',
      },
    ],
  },
}

export default function DevOpsSREPage() {
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