
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import BodyBackground from '@/components/layout/BodyBackground'
import { NeuralNetworkProvider } from '@/context/NeuralNetworkContext'
import NeuralNetworkCanvas from '@/components/animations/NeuralNetworkCanvas'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Otaksi Connect - Software Engineering & Digital Transformation in Dubai',
  description: 'Premium software engineering consultancy in Dubai. We build intelligent digital systems for modern enterprises across UAE.',
}

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode
}) {
  // Only show Navbar if not on /dashboard or subpages
  return (
    <html lang="en">
      <BodyBackground>
        {/* Global neural network canvas effect */}
        <NavbarWrapper />
        <div id="hero-section">
          {children}
        </div>
      </BodyBackground>
    </html>
  )
}