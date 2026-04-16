import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import Footer from '@/components/sections/Footer'
import FooterClient from '@/components/layout/FooterClient'
// import { NeuralNetworkProvider } from '@/context/NeuralNetworkContext'
// import NeuralNetworkCanvas from '@/components/animations/NeuralNetworkCanvas'
import CookieConsent from '@/components/ui/CookieConsent'
// import { useEffect, useState } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Otaksi Connect - The Neural Observer | Software Engineering & Digital Transformation in Dubai',
  description: 'The Neural Observer: Premium software engineering consultancy in Dubai. We observe complex systems and engineer intelligent digital solutions for enterprises across UAE.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body style={{ 
        backgroundColor: '#0B0616', 
        color: '#FFFFFF',
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* <NeuralNetworkProvider>
          <NeuralNetworkCanvas /> */}
          <NavbarWrapper />
          <div id="hero-section">
            {children}
          </div>
          <CookieConsent />
          <FooterClient />
        {/* </NeuralNetworkProvider> */}
      </body>
    </html>
  )
}