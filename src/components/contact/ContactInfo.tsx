'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const offices = [
  {
    city: 'Dubai',
    country: 'UAE',
    flag: '/images/flags/uae.svg',
    address: ['Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates.'],
    phone: '+971 58 255 1785',
    email: 'info@otaksiconnect.com',
    hours: 'Mon - Fri, 9:00 AM - 5:00 PM',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
]

const socialLinks = [
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
    url: 'https://www.facebook.com/share/1B1iDS6adq/?mibextid=wwXIfr',
    color: 'from-[#1877F3] to-[#0056b3]'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
      </svg>
    ),
    url: 'https://www.linkedin.com/company/otaksiconnect/',
    color: 'from-[#0077B5] to-[#00A0DC]'
  },
  {
    name: 'X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M17.53 2.477h3.924l-8.564 9.877 10.09 13.169h-7.944l-6.22-8.181-7.13 8.181H0l9.162-10.567L-.637 2.477h8.09l5.44 7.166zm-1.09 17.145h2.17L7.1 4.6H4.8z" />
      </svg>
    ),
    url: 'https://x.com/otaksiconnect?s=21&t=ibFSOu827HL8-PFr_30XMg',
    color: 'from-[#1DA1F2] to-[#1A91DA]'
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
      </svg>
    ),
    url: 'https://github.com/otaksi-connect',
    color: 'from-[#333] to-[#6e5494]'
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.38 1.13a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
      </svg>
    ),
    url: 'https://www.instagram.com/otaksi_connect?igsh=MTh1Ymo1N3U2dTU3MA%3D%3D&utm_source=qr',
    color: 'from-[#E4405F] to-[#D52B5C]'
  },
]

export default function ContactInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative py-24 bg-midnight">
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Offices</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We have a team in Dubai ready to help you with your next project.
          </p>
        </motion.div>

        {/* Office Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {offices.map((office, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}
                  style={{ background: `linear-gradient(135deg, ${office.gradient.includes('FF2E9F') ? '#FF2E9F' : '#5B6CFF'}, ${office.gradient.includes('5B6CFF') ? '#5B6CFF' : '#FF2E9F'})` }}
                />
                
                {/* Card */}
                <div className="relative h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 p-8 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:gradient-text transition-all duration-300">
                        {office.city}
                      </h3>
                      {/* Country name or any other info can go here if needed */}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Address</h4>
                    {office.address.map((line, i) => (
                      <p key={i} className="text-sm text-gray-400">{line}</p>
                    ))}
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📞</span>
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">✉️</span>
                      <a href={`mailto:${office.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">⏰</span>
                      <p className="text-sm text-gray-400">{office.hours}</p>
                    </div>
                  </div>

                  {/* Direction Button */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium gradient-text hover:opacity-80 transition-opacity"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-clash)' }}>
            Connect With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                     style={{ background: `linear-gradient(135deg, ${social.color.includes('0077B5') ? '#0077B5' : social.color.includes('1DA1F2') ? '#1DA1F2' : social.color.includes('333') ? '#333' : '#E4405F'}, ${social.color.includes('00A0DC') ? '#00A0DC' : social.color.includes('1A91DA') ? '#1A91DA' : social.color.includes('6e5494') ? '#6e5494' : '#D52B5C'})` }} />
                <div className="relative w-12 h-12 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 group-hover:border-white/20 flex items-center justify-center transition-all duration-300">
                  <span className="text-xl">{social.icon}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}