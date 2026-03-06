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
  { name: 'Software Engineering', href: '/solutions/software-engineering' },
  { name: 'AI & Automation', href: '/solutions/ai-automation' },
  { name: 'Cloud Platforms', href: '/solutions/cloud-platforms' },
  { name: 'Enterprise Systems', href: '/solutions/enterprise-systems' },
]

const industriesLinks = [
  { name: 'Real Estate', href: '/industries/real-estate' },
  { name: 'FinTech', href: '/industries/fintech' },
  { name: 'Healthcare', href: '/industries/healthcare' },
  { name: 'Logistics', href: '/industries/logistics' },
  { name: 'Government', href: '/industries/government' },
  { name: 'Retail', href: '/industries/retail' },
]

const resourcesLinks = [
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Technology Stack', href: '/technology' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Support', href: '/support' },
]

const socialLinks = [
  { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/otaksi-connect', color: 'from-[#0077B5] to-[#00A0DC]' },
  { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/otaksiconnect', color: 'from-[#1DA1F2] to-[#1A91DA]' },
  { name: 'GitHub', icon: '🐙', href: 'https://github.com/otaksi-connect', color: 'from-[#333] to-[#6e5494]' },
  { name: 'Instagram', icon: '📷', href: 'https://instagram.com/otaksiconnect', color: 'from-[#E4405F] to-[#D52B5C]' },
  { name: 'YouTube', icon: '▶️', href: 'https://youtube.com/@otaksiconnect', color: 'from-[#FF0000] to-[#CC0000]' },
]

const contactInfo = [
  { icon: '📍', text: 'Dubai Internet City, Building 1, Office 205, Dubai, UAE' },
  { icon: '📞', text: '+971 4 123 4567' },
  { icon: '✉️', text: 'hello@otaksi.ae' },
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

            {/* Legal Links */}
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* UAE Flag Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Serving</span>
              <span className="text-lg">🇦🇪</span>
              <span className="text-sm text-gray-400">UAE</span>
            </div>
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