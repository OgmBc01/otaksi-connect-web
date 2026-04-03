import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Otaksi Connect',
  description: 'Learn how Otaksi Connect collects, uses, and protects your personal information in compliance with UAE data protection laws and international standards.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Policy</span>
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="legal-content">
          <p className="text-gray-700 text-lg leading-relaxed">
            At Otaksi Connect, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-gray-800 text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>
          <p className="text-gray-700">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Fill out a contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a consultation</li>
            <li>Apply for a job</li>
            <li>Interact with our services</li>
          </ul>
          <p className="text-gray-700">This information may include:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Name and contact information (email, phone number, company)</li>
            <li>Professional information (job title, industry)</li>
            <li>Communications preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-gray-800 text-xl font-semibold mt-6 mb-3">1.2 Automatically Collected Information</h3>
          <p className="text-gray-700">
            When you visit our website, we automatically collect certain information about your device and usage, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent</li>
            <li>Referral sources</li>
            <li>Device information (operating system, screen resolution)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our site</li>
            <li>Communicate with you, including for customer service and marketing</li>
            <li>Process transactions and send related information</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="text-gray-700">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
          <p className="text-gray-700">
            For more information about the cookies we use, please visit our <Link href="/legal/cookies" className="text-[#5B6CFF] hover:underline font-medium">Cookie Policy</Link>.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">4. Legal Basis for Processing (GDPR)</h2>
          <p className="text-gray-700">
            If you are from the European Economic Area (EEA), our legal basis for collecting and using your personal information depends on the data concerned and the context in which we collect it. We may process your personal information because:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>We need to perform a contract with you</li>
            <li>You have given us permission to do so</li>
            <li>The processing is in our legitimate interests and not overridden by your rights</li>
            <li>To comply with the law</li>
          </ul>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">5. Data Retention</h2>
          <p className="text-gray-700">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">6. Data Security</h2>
          <p className="text-gray-700">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">7. Your Data Protection Rights</h2>
          <p className="text-gray-700">Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong className="text-gray-800">Right to access:</strong> You have the right to request copies of your personal information.</li>
            <li><strong className="text-gray-800">Right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong className="text-gray-800">Right to erasure:</strong> You have the right to request that we erase your personal information, under certain conditions.</li>
            <li><strong className="text-gray-800">Right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal information.</li>
            <li><strong className="text-gray-800">Right to object to processing:</strong> You have the right to object to our processing of your personal information.</li>
            <li><strong className="text-gray-800">Right to data portability:</strong> You have the right to request that we transfer the data we have collected to another organization.</li>
          </ul>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">8. Third-Party Services</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are not directed to anyone under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">10. International Data Transfers</h2>
          <p className="text-gray-700">
            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
          </p>

          <h2 className="text-gray-900 text-2xl font-bold mt-8 mb-4">12. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong className="text-gray-800">Dubai Office:</strong> +971 58 255 1785</li>
            <li><strong className="text-gray-800">Lagos Office:</strong> +234 905 208 7781</li>
            <li><strong className="text-gray-800">Email:</strong> privacy@otaksiconnect.com</li>
            <li><strong className="text-gray-800">Address:</strong>Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates</li>
          </ul>
        </div>
      </div>
    </main>
  )
}