import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation | Otaksi Connect',
  description: 'Access comprehensive documentation for our products, APIs, and development guides.',
  keywords: 'documentation, api docs, developer guides, integration guides, technical documentation',
}

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about integrating and working with our products.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all text-gray-900 placeholder-gray-400 shadow-sm"
            />
            <svg className="absolute right-4 top-4 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Getting Started */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Getting Started</h2>
            <p className="text-gray-600 mb-4">Learn the basics and set up your first project.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Quick Start Guide →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Installation & Setup →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">First Project Tutorial →</Link>
              </li>
            </ul>
          </div>

          {/* API Reference */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">API Reference</h2>
            <p className="text-gray-600 mb-4">Complete API documentation for developers.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Authentication →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Endpoints & Methods →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Error Codes →</Link>
              </li>
            </ul>
          </div>

          {/* Integration Guides */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Integration Guides</h2>
            <p className="text-gray-600 mb-4">Step-by-step guides for integrating with our platform.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Payment Gateway Integration →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Webhook Setup →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">SDK Installation →</Link>
              </li>
            </ul>
          </div>

          {/* Tutorials */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tutorials</h2>
            <p className="text-gray-600 mb-4">Learn with our comprehensive tutorials and examples.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Building Your First App →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Real-time Features →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Data Visualization →</Link>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Best Practices</h2>
            <p className="text-gray-600 mb-4">Guidelines for optimal implementation and security.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Security Guidelines →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Performance Optimization →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Error Handling →</Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">FAQ</h2>
            <p className="text-gray-600 mb-4">Frequently asked questions and answers.</p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">General Questions →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Technical Support →</Link>
              </li>
              <li>
                <Link href="#" className="text-[#5B6CFF] hover:underline text-sm">Billing & Account →</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#FF2E9F]/5 to-[#5B6CFF]/5 rounded-2xl text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Our support team is here to help you succeed.</p>
          <Link 
            href="/support" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </main>
  )
}