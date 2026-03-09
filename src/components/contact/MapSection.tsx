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
    name: 'Lagos Office',
    flag: '🇳🇬',
    address: 'Victoria Island, Plot 1234, Ahmadu Bello Way',
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
            {/* Map Visualization */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B0616] to-[#1A0F2E]">
              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(91, 108, 255, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 46, 159, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }} />

              {/* Location Marker */}
              <motion.div
                key={activeLocation}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  {/* Pulse Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"
                    style={{ width: '80px', height: '80px', left: '-20px', top: '-20px' }}
                  />
                  
                  {/* Marker */}
                  <div className={`relative w-10 h-10 rounded-full bg-gradient-to-r ${locations.find(l => l.id === activeLocation)?.gradient} flex items-center justify-center`}>
                    <span className="text-white text-xl">📍</span>
                  </div>
                </div>
              </motion.div>

              {/* Location Info Overlay */}
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 gradient-text">
                      {locations.find(l => l.id === activeLocation)?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {locations.find(l => l.id === activeLocation)?.address}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Map Attribution */}
            <p className="text-xs text-center text-gray-600 mt-4">
              Interactive map integration coming soon. For now, please use the address above.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}