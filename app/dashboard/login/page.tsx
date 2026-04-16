'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#5B6CFF] to-[#FF2E9F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-2xl blur-xl opacity-50" />
              <div className="relative w-full h-full rounded-2xl flex items-center justify-center">
                {/* Brand logo image replacing 'OC' */}
                <img
                  src="/logo.svg"
                  alt="Otaksi Connect Logo"
                  style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: 'white' }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-clash)' }}>
              <span style={{ color: '#1A1333', fontFamily: 'var(--font-clash)' }}>Admin Login</span>
            </h1>
            <p className="text-sm text-gray-500">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                placeholder="admin@otaksi.ae"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#5B6CFF] transition-colors text-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-600 mt-6">
            Secure admin access only. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  )
}