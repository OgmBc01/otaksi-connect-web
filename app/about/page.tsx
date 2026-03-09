import { Metadata } from 'next'
import Hero from '@/components/about/Hero'
import OurStory from '@/components/about/OurStory'
import NameMeaning from '@/components/about/NameMeaning'
import Team from '@/components/about/Team'
import Values from '@/components/about/Values'
import Stats from '@/components/about/Stats'
import CTASection from '@/components/about/CTASection'

export const metadata: Metadata = {
  title: 'About Us | Otaksi Connect - The Neural Observer',
  description: 'Discover the story behind Otaksi Connect. We observe complex systems and engineer intelligent digital solutions through artificial neural networks and data-driven innovation.',
  keywords: 'about otaksi, neural observer, ai company dubai, machine learning experts, data science team',
  openGraph: {
    title: 'About Us | Otaksi Connect - The Neural Observer',
    description: 'Discover the story behind Otaksi Connect. We observe complex systems and engineer intelligent digital solutions.',
    url: 'https://otaksi.ae/about',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/images/about/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Otaksi Connect',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <main className="bg-midnight">
      <Hero />
      <OurStory />
      <NameMeaning />
      <Team />
      <Values />
      <Stats />
      <CTASection />
    </main>
  )
}