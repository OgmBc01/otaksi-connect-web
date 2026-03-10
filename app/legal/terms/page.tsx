import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Otaksi Connect',
  description: 'Read the terms and conditions governing your use of Otaksi Connect services and website.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Service</span>
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="legal-content">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to Otaksi Connect. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
           <p className="text-gray-700">
            By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <h2>2. Description of Services</h2>
           <p className="text-gray-700">
            Otaksi Connect provides software engineering, AI development, cloud solutions, and digital transformation consulting services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
          </p>

          <h2>3. User Accounts</h2>
           <p className="text-gray-700">
            To access certain features of our services, you may be required to create an account. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <h3>4.1 Our Content</h3>
          <p>
            All content on our website, including text, graphics, logos, images, software, and the "Neural Observer" brand identity, is the property of Otaksi Connect and is protected by UAE and international copyright laws.
          </p>

          <h3>4.2 User Content</h3>
           <p className="text-gray-700">
            By submitting content to our services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display that content for the purpose of providing our services.
          </p>

          <h2>5. Client Projects</h2>
          <h3>5.1 Project Agreements</h3>
          <p className="text-gray-700">
            For specific client projects, separate project agreements will govern the terms of engagement. These Terms of Service work in conjunction with those agreements.
          </p>

          <h3>5.2 Intellectual Property of Deliverables</h3>
           <p className="text-gray-700">
            Upon full payment, all intellectual property rights to deliverables created specifically for a client project will be transferred to the client, unless otherwise specified in the project agreement.
          </p>

          <h2>6. Payment Terms</h2>
           <p className="text-gray-700">
            Payment terms for services will be specified in individual project agreements. We accept various payment methods as outlined in invoices.
          </p>

          <h2>7. Confidentiality</h2>
           <p className="text-gray-700">
            Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our engagement. This obligation survives the termination of any agreement.
          </p>

          <h2>8. Limitation of Liability</h2>
           <p className="text-gray-700">
            To the maximum extent permitted by law, Otaksi Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2>9. Indemnification</h2>
           <p className="text-gray-700">
            You agree to indemnify and hold harmless Otaksi Connect, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses arising out of your use of our services or violation of these Terms.
          </p>

          <h2>10. Third-Party Links</h2>
           <p className="text-gray-700">
            Our services may contain links to third-party websites or services that are not owned or controlled by Otaksi Connect. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
          </p>

          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
          </p>

          <h2>12. Governing Law</h2>
           <p className="text-gray-700">
            These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.
          </p>

          <h2>13. Dispute Resolution</h2>
           <p className="text-gray-700">
            Any dispute arising out of or relating to these Terms or our services shall be resolved through binding arbitration in Dubai, UAE, in accordance with the rules of the Dubai International Arbitration Centre (DIAC).
          </p>

          <h2>14. Changes to Terms</h2>
           <p className="text-gray-700">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last Updated" date.
          </p>

          <h2>15. Contact Information</h2>
           <p className="text-gray-700">
            For any questions about these Terms, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> legal@otaksi.ae</li>
            <li><strong>Dubai Office:</strong> +971 4 123 4567</li>
            <li><strong>Address:</strong> Dubai Internet City, Building 1, Office 205, Dubai, UAE</li>
          </ul>
        </div>
      </div>
    </main>
  )
}