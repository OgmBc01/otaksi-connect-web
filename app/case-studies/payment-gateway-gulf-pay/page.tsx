import { Metadata } from 'next'
import CaseStudyContent from './CaseStudyContent'

export const metadata: Metadata = {
  title: 'Payment Gateway Integration - Gulf Pay | Otaksi Connect',
  description: 'Enterprise payment gateway processing 1M+ daily transactions with multi-currency support.',
  openGraph: {
    title: 'Payment Gateway Integration - Gulf Pay',
    description: 'Enterprise payment gateway processing 1M+ daily transactions with multi-currency support.',
    url: 'https://otaksi.ae/case-studies/payment-gateway-gulf-pay',
    siteName: 'Otaksi Connect',
    locale: 'en_AE',
    type: 'article',
    images: [
      {
        url: '/images/case-studies/payment-gateway-gulf-pay/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Payment Gateway Integration',
      },
    ],
  },
}

export default function CaseStudyPage() {
  return <CaseStudyContent />
}
