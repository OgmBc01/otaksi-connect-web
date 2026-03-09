import { Metadata } from 'next'
import Hero from '@/components/contact/Hero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'
import MapSection from '@/components/contact/MapSection'
import CTASection from '@/components/contact/CTASection'

export const metadata: Metadata = {
  title: 'Contact Us | Otaksi Connect - Dubai & Nigeria',
  description: 'Get in touch with our team in Dubai and Nigeria. Discuss your project, request a consultation, or learn more about our software engineering services.',
  keywords: 'contact dubai, software company contact, nigeria office, dubai office, project inquiry',
  openGraph: {
    title: 'Contact Us | Otaksi Connect',
    description: 'Get in touch with our team in Dubai and Nigeria.',
    url: 'https://otaksi.ae/contact',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/contact/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Otaksi Connect',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <CTASection />
    </main>
  )
}