import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Technology Stack | Otaksi Connect',
  description: 'Explore our modern technology stack including React, Next.js, Python, AWS, and more for building enterprise-grade solutions.',
  keywords: 'technology stack, react, next.js, python, aws, docker, kubernetes, software development tools',
}

export default function TechnologyStackPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Stack</span>
          </h1>
          <p className="text-xl text-gray-600">
            We leverage cutting-edge technologies to deliver robust, scalable, and innovative solutions.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="lead">
            At Otaksi Connect, we believe in using the right tools for the right job. Our technology stack is carefully curated to ensure optimal performance, scalability, and maintainability for every project we undertake.
          </p>

          <h2>Frontend Technologies</h2>
          <p>
            We build responsive, performant, and user-friendly interfaces using modern frontend frameworks and libraries.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">React & Next.js</h3>
              <p className="text-gray-600">Building fast, SEO-friendly web applications with server-side rendering and static site generation.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TypeScript</h3>
              <p className="text-gray-600">Ensuring type safety and better developer experience across all projects.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
              <p className="text-gray-600">Rapid UI development with utility-first CSS framework for consistent designs.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Framer Motion</h3>
              <p className="text-gray-600">Creating smooth, engaging animations and transitions for better user experience.</p>
            </div>
          </div>

          <h2>Backend Technologies</h2>
          <p>
            Our backend solutions are built for reliability, security, and high performance.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Node.js & Python</h3>
              <p className="text-gray-600">Building scalable APIs and microservices with event-driven architecture.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PostgreSQL</h3>
              <p className="text-gray-600">Robust relational database management for complex data relationships.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redis & Kafka</h3>
              <p className="text-gray-600">Real-time data processing and caching for high-performance applications.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Supabase</h3>
              <p className="text-gray-600">Open-source Firebase alternative with real-time subscriptions and authentication.</p>
            </div>
          </div>

          <h2>Cloud & DevOps</h2>
          <p>
            We leverage cloud-native technologies for scalable, resilient infrastructure.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AWS & Azure</h3>
              <p className="text-gray-600">Cloud infrastructure with auto-scaling, load balancing, and global availability.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Docker & Kubernetes</h3>
              <p className="text-gray-600">Containerization and orchestration for consistent deployment across environments.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">GitHub Actions & CI/CD</h3>
              <p className="text-gray-600">Automated testing, building, and deployment pipelines for rapid iteration.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Terraform</h3>
              <p className="text-gray-600">Infrastructure as Code for reproducible and manageable cloud resources.</p>
            </div>
          </div>

          <h2>AI & Data Science</h2>
          <p>
            We integrate artificial intelligence to create intelligent, data-driven solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TensorFlow & PyTorch</h3>
              <p className="text-gray-600">Machine learning models for predictions, recommendations, and pattern recognition.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">OpenAI & LLMs</h3>
              <p className="text-gray-600">Natural language processing and generative AI for intelligent automation.</p>
            </div>
          </div>

          <h2>Our Technology Philosophy</h2>
          <p>
            We stay current with emerging technologies while maintaining stability and reliability. Our technology decisions are guided by:
          </p>
          <ul>
            <li><strong>Performance:</strong> Choosing tools that deliver optimal speed and efficiency</li>
            <li><strong>Scalability:</strong> Ensuring solutions can grow with your business needs</li>
            <li><strong>Security:</strong> Implementing best practices for data protection</li>
            <li><strong>Developer Experience:</strong> Using modern tools that enable rapid, quality development</li>
            <li><strong>Community Support:</strong> Leveraging well-maintained, popular technologies</li>
          </ul>

          <h2>Need a Technology Consultation?</h2>
          <p>
            Not sure which technologies are right for your project? Our experts can help you make the right decisions.
          </p>
          <div className="mt-8 p-6 bg-gradient-to-r from-[#FF2E9F]/10 to-[#5B6CFF]/10 rounded-2xl text-center">
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Schedule a Technology Consultation →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}