import { Metadata } from 'next'
import Hero from '../../../src/components/services/cloud-platforms/Hero'
import OurApproach from '../../../src/components/services/cloud-platforms/OurApproach'
import Services from '../../../src/components/services/cloud-platforms/Services'
import Technologies from '../../../src/components/services/cloud-platforms/Technologies'
import Process from '../../../src/components/services/cloud-platforms/Process'
import CaseStudies from '../../../src/components/services/cloud-platforms/CaseStudies'
import WhyChooseUs from '../../../src/components/services/cloud-platforms/WhyChooseUs'
import FAQ from '../../../src/components/services/cloud-platforms/FAQ'
import CTASection from '../../../src/components/services/cloud-platforms/CTASection'

export const metadata: Metadata = {
  title: 'Cloud Platforms & Infrastructure Services Dubai | AWS, Azure, GCP',
  description: 'Enterprise cloud solutions in Dubai. AWS, Azure, and Google Cloud consulting, migration, and management. Scalable infrastructure, DevOps, and cloud-native development for UAE businesses.',
  keywords: 'cloud services dubai, aws consulting uae, azure cloud dubai, google cloud platform, cloud migration, devops services, kubernetes dubai, infrastructure as code',
  openGraph: {
    title: 'Cloud Platforms & Infrastructure Services Dubai | Otaksi Connect',
    description: 'Enterprise cloud solutions in Dubai. AWS, Azure, and Google Cloud consulting, migration, and management for UAE businesses.',
    url: 'https://otaksi.ae/services/cloud-platforms',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/cloud-platforms/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect Cloud Platforms & Infrastructure Services',
      },
    ],
  },
}

export default function CloudPlatformsPage() {
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