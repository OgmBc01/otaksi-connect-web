'use client'
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Software Engineering', href: '/services/software-engineering', description: 'Custom web & mobile applications' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Intelligent automation solutions' },
      { name: 'Cloud Platforms', href: '/services/cloud-platforms', description: 'Scalable cloud infrastructure' },
      { name: 'Enterprise Systems', href: '/services/enterprise-systems', description: 'ERP, CRM & business solutions' },
      { name: 'Digital Transformation', href: '/services/digital-transformation', description: 'End-to-end digital strategy' },
      { name: 'DevOps & SRE', href: '/services/devops-sre', description: 'CI/CD, monitoring & reliability' },
    ]
  },
  { 
    name: 'Solutions', 
    href: '/solutions',
    dropdown: [
      { name: 'FinTech Solutions', href: '/solutions/fintech', description: 'Banking, payments & compliance' },
      { name: 'Real Estate Tech', href: '/solutions/real-estate', description: 'PropTech & property management' },
      { name: 'Healthcare Platforms', href: '/solutions/healthcare', description: 'EHR, telemedicine & patient portals' },
      { name: 'Logistics & Supply Chain', href: '/solutions/logistics', description: 'Tracking, optimization & automation' },
      { name: 'E-commerce Solutions', href: '/solutions/ecommerce', description: 'Online stores & marketplaces' },
      { name: 'Smart Government', href: '/solutions/government', description: 'Digital citizen services' },
    ]
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Track scroll position and hero section visibility
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      setIsScrolled(window.scrollY > 20)

      // Check if hero section is in view
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setIsHeroVisible(rect.bottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    setMobileDropdown(null)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navbarHeight = isHeroVisible ? 'h-14' : 'h-10'
  const logoSize = isHeroVisible ? 'text-lg' : 'text-base'
  const logoIconSize = isHeroVisible ? 'w-8 h-8' : 'w-6 h-6'

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarHeight} bg-transparent mt-4 mx-4`}
        style={{}}
      >
        {/* Glassy blurred background for desktop */}
        <div
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 mx-auto px-0"
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              borderRadius: '50px/50px', // semi-circle top/bottom at ends
            }}
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 flex items-center justify-between">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className={`relative ${logoIconSize} rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center transition-all duration-300`}>
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
              </div>
              <span className={`font-bold gradient-text transition-all duration-300 ${logoSize}`}>Otaksi Connect</span>
            </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <>
                    <button
                      className={`px-2 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                        pathname.startsWith(link.href)
                          ? 'gradient-text'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <svg
                        className="inline-block w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 glass-card rounded-xl overflow-hidden"
                        >
                          <div className="p-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
                            {link.dropdown.map((item, idx) => (
                              <React.Fragment key={item.name + '-' + idx}>
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block p-3 rounded-none hover:bg-white/20 transition-colors duration-300 group/item"
                                >
                                  <div className="font-medium text-white group-hover/item:gradient-text">
                                    {item.name}
                                  </div>
                                </Link>
                                {idx < link.dropdown.length - 1 && (
                                  <div key={item.name + '-divider'} className="h-0.5 w-full bg-gradient-to-r from-[#FF2E9F] via-[#5B6CFF] to-[#FF2E9F] my-1 rounded-full" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                    <Link
                      href={link.href}
                      className={`px-2 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                        pathname === link.href
                          ? 'gradient-text'
                          : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-3 py-1 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              Start a Project
            </Link>
          </div>
          {/* Mobile Logo, Brand, Toggle on shared glassy background */}
          <div className="lg:hidden fixed left-4 right-4 top-4 z-50 flex items-center justify-between bg-transparent backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 mb-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className={`relative ${logoIconSize} rounded-full bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center transition-all duration-300`}>
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
              </div>
              <span className={`font-bold gradient-text transition-all duration-300 ${logoSize}`}>Otaksi Connect</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 rounded-full bg-transparent flex items-center justify-center z-50"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                  }`}
                />
                <span
                  className={`absolute left-0 block w-6 h-0.5 bg-white top-3 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-midnight/80 backdrop-blur-xl" />

            {/* Menu Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              <div className="w-full max-w-md glass-card rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden max-h-[80vh] overflow-y-auto mobile-menu-scroll-hide mt-1">
                <div className="p-6 space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.name} className="space-y-2">
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() => setMobileDropdown(
                              mobileDropdown === link.name ? null : link.name
                            )}
                            className="w-full flex items-center justify-between text-left p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <span className="text-lg font-medium text-white">
                              {link.name}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                mobileDropdown === link.name ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Mobile Dropdown */}
                          <AnimatePresence>
                            {mobileDropdown === link.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 space-y-2">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <div className="font-medium text-gray-300">
                                        {item.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {item.description}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className="block p-3 text-lg font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile CTA */}
                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="block w-full py-4 bg-linear-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg text-center font-medium text-white hover:opacity-90 transition-opacity"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Start a Project
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}