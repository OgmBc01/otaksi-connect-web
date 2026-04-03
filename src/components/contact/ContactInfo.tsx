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
    email: 'dubai@otaksiconnect.com',
    hours: 'Mon - Fri, 9:00 AM - 5:00 PM',
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    city: 'Bauchi',
    country: 'Nigeria',
    flag: '/images/flags/nigeria.svg',
    address: ['No: 2 Guru Close, Off Sunday Awoniyi Road, New GRA Bauchi, Nigeria.'],
    phone: '+234 905 208 7781',
    email: 'lagos@otaksi.ng',
    hours: 'Mon - Fri, 8:00 AM - 5:00 PM',
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
]

const socialLinks = [
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com/OtaksiConnect', color: 'from-[#1877F3] to-[#0056b3]' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/otaksi-connect', color: 'from-[#0077B5] to-[#00A0DC]' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/otaksiconnect', color: 'from-[#1DA1F2] to-[#1A91DA]' },
  { name: 'GitHub', icon: '🐙', url: 'https://github.com/otaksi-connect', color: 'from-[#333] to-[#6e5494]' },
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com/otaksiconnect', color: 'from-[#E4405F] to-[#D52B5C]' },
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
            We have teams in Dubai and Lagos ready to help you with your next project.
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
          className="text-center"
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