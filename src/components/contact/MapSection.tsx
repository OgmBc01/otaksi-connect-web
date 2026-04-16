'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const locations = [
  {
    id: 'dubai',
    name: 'Dubai Office',
    flag: '🇦🇪',
    address: 'Dubai Internet City, Building 1, Office 205',
    coordinates: { lat: 25.092, lng: 55.156 },
    gradient: 'from-[#FF2E9F] to-[#5B6CFF]',
  },
  {
    id: 'lagos',
    name: 'Nigeria Office',
    flag: '🇳🇬',
    address: 'No: 2 Guru Close, Off Sunday Awoniyi Road, New GRA Bauchi, Nigeria.',
    coordinates: { lat: 6.428, lng: 3.422 },
    gradient: 'from-[#5B6CFF] to-[#FF2E9F]',
  },
]

export default function MapSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeLocation, setActiveLocation] = useState('dubai')

  return (
    <section className="relative py-24 bg-midnight border-t border-white/5">
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
            Find Us{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]">Here</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Visit our offices in Dubai and Lagos. We'd love to meet you in person.
          </p>
        </motion.div>

        {/* Location Toggle */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeLocation === location.id
                  ? `bg-gradient-to-r ${location.gradient} text-white`
                  : 'glass-card border border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
              }`}
            >
              <span>{location.flag}</span>
              {location.name}
            </button>
          ))}
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-3xl opacity-30 blur-2xl" />
          
          <div className="relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 overflow-hidden">
            {/* Google Maps Embed - Toggle between Dubai and Nigeria */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B0616] to-[#1A0F2E] flex items-center justify-center">
              {activeLocation === 'dubai' && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.1899206638504!2d55.783717874490186!3d25.664998277412746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef60bee567a253b%3A0x80fd444807765d7!2sRAKEZ%20Compass%20Coworking%20Centre!5e0!3m2!1sen!2sae!4v1776304743038!5m2!1sen!2sae"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RAKEZ Compass Coworking Centre Map"
                ></iframe>
              )}
              {activeLocation === 'lagos' && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3793191972622!2d9.790365074045372!3d10.311497189810376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae81c5f81a0657%3A0xd45a10a202f64ca2!2sOtaksi%20Connect!5e0!3m2!1sen!2sae!4v1776305782218!5m2!1sen!2sae"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Otaksi Connect Nigeria Map"
                ></iframe>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}