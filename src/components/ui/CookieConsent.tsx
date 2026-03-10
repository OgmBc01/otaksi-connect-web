'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true and disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      try {
        const savedPrefs = JSON.parse(consent)
        setPreferences(savedPrefs)
      } catch (e) {
        console.error('Error parsing cookie consent')
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    setShowPreferences(false)
    
    // Initialize analytics/marketing scripts here if needed
    console.log('All cookies accepted')
  }

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setPreferences(essentialOnly)
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly))
    setShowBanner(false)
    setShowPreferences(false)
    
    console.log('Only essential cookies accepted')
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowPreferences(false)
    
    console.log('Preferences saved:', preferences)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't change necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!showBanner && !showPreferences) return null

  return (
    <AnimatePresence>
      {/* Main Banner */}
      {showBanner && !showPreferences && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative backdrop-blur-xl bg-white/90 rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-white rounded-2xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] flex items-center justify-center">
                    <span className="text-2xl">🍪</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
                    By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                    <Link href="/legal/privacy" className="text-[#5B6CFF] hover:underline font-medium">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/terms" className="text-[#5B6CFF] hover:underline font-medium">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-black bg-white/50 hover:bg-white rounded-lg border border-gray-200 transition-all duration-300"
                  >
                    Customize
                  </button>
                  <button
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-black bg-white/50 hover:bg-white rounded-lg border border-gray-200 transition-all duration-300"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPreferences(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative backdrop-blur-xl bg-white rounded-2xl border border-white/20 shadow-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                You can customize which cookies you allow below. Essential cookies are always enabled as they're necessary for the website to function properly.
              </p>

              {/* Options */}
              <div className="space-y-4 mb-6">
                {/* Essential */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Essential Cookies</h4>
                    <p className="text-xs text-gray-500">Required for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-[#5B6CFF] rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Analytics Cookies</h4>
                    <p className="text-xs text-gray-500">Help us understand how visitors interact with our site.</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-[#5B6CFF]' : 'bg-gray-300'
                    } flex items-center ${
                      preferences.analytics ? 'justify-end' : 'justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Marketing Cookies</h4>
                    <p className="text-xs text-gray-500">Used to deliver relevant ads and track campaign performance.</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`ml-4 w-12 h-6 rounded-full transition-colors ${
                      preferences.marketing ? 'bg-[#5B6CFF]' : 'bg-gray-300'
                    } flex items-center ${
                      preferences.marketing ? 'justify-end' : 'justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Accept All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}