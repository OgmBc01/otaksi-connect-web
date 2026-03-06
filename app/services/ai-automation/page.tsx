import { Metadata } from 'next'
import Hero from '@/components/services/ai-automation/Hero'
import OurApproach from '@/components/services/ai-automation/OurApproach'
import Technologies from '@/components/services/ai-automation/Technologies'
import Solutions from '@/components/services/ai-automation/Solutions'
import DevelopmentProcess from '@/components/services/ai-automation/DevelopmentProcess'
import CaseStudies from '@/components/services/ai-automation/CaseStudies'
import WhyChooseUs from '@/components/services/ai-automation/WhyChooseUs'
import FAQ from '@/components/services/ai-automation/FAQ'
import CTASection from '@/components/services/ai-automation/CTASection'

export const metadata: Metadata = {
  title: 'AI & Automation Services Dubai | Machine Learning, Computer Vision, NLP',
  description: 'Transform your business with AI-powered automation in Dubai. Specializing in machine learning, computer vision, NLP, and intelligent process automation for UAE enterprises.',
  keywords: 'AI services dubai, machine learning company uae, computer vision dubai, natural language processing, intelligent automation, robotic process automation, predictive analytics',
  openGraph: {
    title: 'AI & Automation Services Dubai | Otaksi Connect',
    description: 'Transform your business with AI-powered automation. Specializing in machine learning, computer vision, NLP, and intelligent process automation.',
    url: 'https://otaksi.ae/services/ai-automation',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/ai-automation/og-image.jpg', // Add this image
        width: 1200,
        height: 630,
        alt: 'Otaksi Connect AI & Automation Services',
      },
    ],
  },
}

export default function AIAutomationPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <OurApproach />
      <Technologies />
      <Solutions />
      <DevelopmentProcess />
      <CaseStudies />
      <WhyChooseUs />
      <FAQ />
      <CTASection />
    </main>
  )
}