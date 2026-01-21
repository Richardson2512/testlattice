'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { SocialAuth } from '@/components/SocialAuth'
import { DeviceAuthFrame } from '@/components/DeviceAuthFrame'
import { theme } from '@/lib/theme'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: {
            full_name: name,
            display_name: name,
          }
        },
      })

      if (error) throw error

      // Check if user already exists (Supabase returns user with empty identities array)
      if (data?.user?.identities?.length === 0) {
        setError('An account with this email already exists. Please log in instead.')
        return
      }

      setMessage('Check your email to confirm your account!')
    } catch (error: any) {
      setError(error.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DeviceAuthFrame
      title="Join the Revolution"
      subtitle="Start automating your tests in seconds."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && (
          <div style={{
            padding: '0.75rem',
            borderRadius: theme.radius.md,
            background: theme.status.error.bg,
            border: `1px solid ${theme.status.error.border}`,
            color: theme.status.error.text,
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            padding: '0.75rem',
            borderRadius: theme.radius.md,
            background: theme.status.success.bg,
            border: `1px solid ${theme.status.success.border}`,
            color: theme.status.success.text,
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.border.default}`,
                background: theme.bg.tertiary,
                color: theme.text.primary,
                fontSize: '1rem',
                outline: 'none',
                transition: `border-color ${theme.transitions.fast}`
              }}
              onFocus={(e) => e.target.style.borderColor = theme.accent.primary}
              onBlur={(e) => e.target.style.borderColor = theme.border.default}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Write your email address"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.border.default}`,
                background: theme.bg.tertiary,
                color: theme.text.primary,
                fontSize: '1rem',
                outline: 'none',
                transition: `border-color ${theme.transitions.fast}`
              }}
              onFocus={(e) => e.target.style.borderColor = theme.accent.primary}
              onBlur={(e) => e.target.style.borderColor = theme.border.default}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem', // Added right padding for icon
                  borderRadius: theme.radius.md,
                  border: `1px solid ${theme.border.default}`,
                  background: theme.bg.tertiary,
                  color: theme.text.primary,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: `border-color ${theme.transitions.fast}`
                }}
                onFocus={(e) => e.target.style.borderColor = theme.accent.primary}
                onBlur={(e) => e.target.style.borderColor = theme.border.default}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: theme.text.secondary,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: theme.text.tertiary, marginTop: '0.4rem' }}>Must be at least 6 characters</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.875rem',
              borderRadius: theme.radius.md,
              background: loading ? theme.bg.tertiary : `linear-gradient(135deg, ${theme.accent.primary} 0%, ${theme.accent.primaryDark} 100%)`,
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.1s',
              boxShadow: theme.shadows.md
            }}
            onMouseDown={e => !loading && (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => !loading && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <SocialAuth />

        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: theme.text.secondary }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: theme.accent.primary, textDecoration: 'none', fontWeight: 500 }}>
            Log in
          </Link>
        </div>
      </div>
    </DeviceAuthFrame>
  )
}
