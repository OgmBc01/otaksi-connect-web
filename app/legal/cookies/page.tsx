import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Otaksi Connect',
  description: 'Learn about how Otaksi Connect uses cookies and similar tracking technologies.',
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Cookie <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF]">Policy</span>
          </h1>
        </div>
        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 legal-content">
          <p className="lead">
            This Cookie Policy explains how Otaksi Connect uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Otaksi Connect) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>

          <h2>2. Types of Cookies We Use</h2>
          <h3>2.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
          </p>

          <h3>2.2 Analytics Cookies</h3>
          <p>
            These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
          </p>

          <h3>2.3 Marketing Cookies</h3>
          <p>
            These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.
          </p>

          <h2>3. Specific Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Provider</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">localConsent</td>
                  <td className="border border-gray-300 px-4 py-2">Otaksi Connect</td>
                  <td className="border border-gray-300 px-4 py-2">Stores cookie consent preferences</td>
                  <td className="border border-gray-300 px-4 py-2">Essential</td>
                  <td className="border border-gray-300 px-4 py-2">180 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_ga</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">Used to distinguish users</td>
                  <td className="border border-gray-300 px-4 py-2">Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">2 years</td>
                </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_gid</td>
                    <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">Used to distinguish users</td>
                    <td className="border border-gray-300 px-4 py-2">Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_fbp</td>
                    <td className="border border-gray-300 px-4 py-2">Meta</td>
                    <td className="border border-gray-300 px-4 py-2">Used to deliver and track ad campaigns</td>
                    <td className="border border-gray-300 px-4 py-2">Marketing</td>
                    <td className="border border-gray-300 px-4 py-2">90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. How Can You Control Cookies?</h2>
            <p className="text-gray-700">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking the appropriate opt-out links provided in our cookie consent banner.
            </p>

            <h3>4.1 Browser Controls</h3>
            <p className="text-gray-700">
              You can set or amend your web browser controls to accept or refuse cookies. Since the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
            </p>

            <h3>4.2 Managing Analytics Cookies</h3>
            <p className="text-gray-700">
              You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on available at: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#5B6CFF] hover:underline">https://tools.google.com/dlpage/gaoptout</a>
            </p>

            <h2>5. Changes to This Cookie Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies.
            </p>

            <h2>6. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@otaksiconnect.com</li>
              <li><strong>Dubai Office:</strong> +971 58 255 1785</li>
              <li><strong>Lagos Office:</strong> +234 905 208 7781 </li>
            </ul>
          </div>
        </div>
    </main>
  );
}