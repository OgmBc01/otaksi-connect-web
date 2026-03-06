import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

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
  return (
    <html lang="en">
      <body style={{ 
        backgroundColor: '#0B0616', 
        color: '#FFFFFF',
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <Navbar />
        <div id="hero-section">
          {children}
        </div>
      </body>
    </html>
  )
}