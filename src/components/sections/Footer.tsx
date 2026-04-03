'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/insights' },
  { name: 'Contact', href: '/contact' },
]

const servicesLinks = [
  { name: 'Software Engineering', href: '/services/software-engineering' },
  { name: 'AI & Automation', href: '/services/ai-automation' },
  { name: 'Cloud Platforms', href: '/services/cloud-platforms' },
  { name: 'Enterprise Systems', href: '/services/enterprise-systems' },
]

const industriesLinks = [
  { name: 'Real Estate', href: '/solutions/real-estate' },
  { name: 'FinTech', href: '/solutions/fintech' },
  { name: 'Healthcare', href: '/solutions/healthcare' },
  { name: 'Logistics', href: '/solutions/logistics' },
  { name: 'Government', href: '/solutions/government' },
  { name: 'Retail', href: '/solutions/ecommerce' },
]

const resourcesLinks = [
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Technology Stack', href: '/technology' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Links Hub', href: '/links' },
  { name: 'Support', href: '/support' },
]

const socialLinks = [
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
    href: 'https://facebook.com/OtaksiConnect',
    color: 'from-[#1877F3] to-[#0056b3]',
    handle: '@OtaksiConnect',
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
      </svg>
    ),
    href: 'https://linkedin.com/company/otaksi-connect',
    color: 'from-[#0077B5] to-[#00A0DC]'
  },
  {
    name: 'Twitter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M22.46 5.92c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.72 12.72 0 0 1 3.11 4.6a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.39c-.34.09-.7.14-1.07.14-.26 0-.51-.02-.76-.07a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.39-.01-.59a9.1 9.1 0 0 0 2.24-2.32z" />
      </svg>
    ),
    href: 'https://twitter.com/otaksiconnect',
    color: 'from-[#1DA1F2] to-[#1A91DA]'
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
      </svg>
    ),
    href: 'https://github.com/otaksi-connect',
    color: 'from-[#333] to-[#6e5494]'
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.38 1.13a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
      </svg>
    ),
    href: 'https://instagram.com/otaksiconnect',
    color: 'from-[#E4405F] to-[#D52B5C]'
  },
  {
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94C2 9.661 2 12.001 2 12.001s0 2.34.2 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94C22 14.341 22 12.001 22 12.001s0-2.34-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    ),
    href: 'https://youtube.com/@otaksiconnect',
    color: 'from-[#FF0000] to-[#CC0000]'
  },
]

const contactInfo = [
  { icon: '📍', text: 'Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates.' },
  { icon: '📞', text: '+971 58 255 1785' },
  { icon: '✉️', text: 'info@otaksiconnect.com' },
]

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <footer className="relative bg-midnight overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Neural Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(91, 108, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 46, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="space-y-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg blur-md opacity-50" />
                  <div className="relative w-10 h-10 rounded-lg bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                    <span className="text-white font-bold text-xl">OC</span>
                  </div>
                </div>
                <span className="text-xl font-bold gradient-text">Otaksi Connect</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                Premium software engineering consultancy in Dubai, delivering intelligent 
                digital systems for enterprises across the UAE and Middle East.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-lg">{item.icon}</span>
                    <span className="hover:text-white transition-colors cursor-default">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 gradient-text">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 gradient-text">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 gradient-text">Industries</h3>
            <ul className="space-y-3">
              {industriesLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Social */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 gradient-text">Resources</h3>
            <ul className="space-y-3 mb-6">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    {/* Hover background */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-lg`}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-lg blur-md`}
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">{social.icon}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} Otaksi Connect. All rights reserved.
            </p>

            {/* Legal Links - Replace the existing legal links section */}
            <div className="flex gap-6">
              <Link
                href="/legal/privacy"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/cookies"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>

            {/* UAE Flag Indicator */}
            {/* <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Serving</span>
              <span className="text-lg">🇦🇪</span>
              <span className="text-sm text-gray-400">UAE</span>
            </div> */}
          </div>

          {/* Data Stream Animation */}
          <div className="relative h-1 mt-8 overflow-hidden">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-[#5B6CFF] to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}