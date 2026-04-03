import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support | Otaksi Connect',
  description: 'Get help with our products, submit support tickets, access knowledge base, and contact our technical support team.',
  keywords: 'technical support, customer support, help desk, support tickets, contact support',
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            How Can We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Help</span> You?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our dedicated support team is ready to assist you with any questions or issues.
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Knowledge Base */}
          <div className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
            <p className="text-gray-600 mb-4">Find answers to common questions in our comprehensive documentation.</p>
            <Link href="/docs" className="text-[#5B6CFF] hover:underline font-medium">
              Browse Articles →
            </Link>
          </div>

          {/* Submit Ticket */}
          <div className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Submit a Ticket</h2>
            <p className="text-gray-600 mb-4">Get personalized support from our technical team.</p>
            <Link href="#contact-form" className="text-[#5B6CFF] hover:underline font-medium">
              Create Ticket →
            </Link>
          </div>

          {/* Live Chat */}
          <div className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h2>
            <p className="text-gray-600 mb-4">Chat with our support team in real-time.</p>
            <button className="text-[#5B6CFF] hover:underline font-medium">
              Start Chat →
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Submit a Support Request</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type *</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all"
                >
                  <option value="">Select issue type</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="account">Account Management</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all resize-none"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
                <input
                  type="file"
                  multiple
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Max file size: 10MB. Supported formats: PDF, PNG, JPG, ZIP</p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="text-center p-6 border border-gray-200 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600">Dubai Office: +971 58 255 1785</p>
            <p className="text-gray-600">Lagos Office: +234 905 208 7781</p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9AM-6PM GST</p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#5B6CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">Technical Support: support@otaksi.ae</p>
            <p className="text-gray-600">Sales Inquiries: sales@otaksi.ae</p>
            <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
          </div>
        </div>

        {/* SLA Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#FF2E9F]/5 to-[#5B6CFF]/5 rounded-2xl text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Support Commitment</h3>
          <p className="text-gray-600">
            We pride ourselves on providing exceptional support. Our team aims to respond to all inquiries within 24 hours.
            For urgent issues, please call our support hotline.
          </p>
        </div>
      </div>
    </main>
  )
}