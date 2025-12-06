'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function LandingHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setMounted(true)

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        // Ignore errors during SSR
        setUser(null)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Handle scroll for header styling
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrolled(window.scrollY > 20)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      // Set initial scroll state
      handleScroll()
    }

    return () => {
      subscription.unsubscribe()
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [supabase])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid transparent',
          height: '70px', // Fixed height to prevent layout shift
        }}
      />
    )
  }

  // If user is logged in, redirect to dashboard (handled by page.tsx, but hide header)
  if (user) {
    return null
  }

  // Use consistent styles during SSR to avoid hydration mismatch
  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  }

  // Only apply scroll-based styles after mount to avoid hydration mismatch
  if (mounted && scrolled) {
    headerStyle.background = 'rgba(255, 255, 255, 0.95)'
    headerStyle.borderBottom = '1px solid rgba(153, 27, 27, 0.1)'
    headerStyle.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
  } else {
    headerStyle.background = 'rgba(255, 255, 255, 0.8)'
    headerStyle.borderBottom = '1px solid transparent'
    headerStyle.boxShadow = 'none'
  }

  return (
    <header style={headerStyle}>
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            textDecoration: 'none',
            background: 'linear-gradient(135deg, var(--maroon-800) 0%, var(--maroon-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🧪</span>
          <span>TestLattice</span>
        </Link>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Link
            href="#features"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--maroon-800)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--maroon-800)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Pricing
          </Link>
          <Link
            href="mailto:support@testlattice.dev"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--maroon-800)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Support
          </Link>
        </div>

        {/* Auth Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <Link
            href="/login"
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              background: 'transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--beige-50)'
              e.currentTarget.style.borderColor = 'var(--maroon-200)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'var(--border-light)'
            }}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            style={{
              padding: '0.625rem 1.5rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--maroon-600)',
              border: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(153, 27, 27, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--maroon-700)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(153, 27, 27, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--maroon-600)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(153, 27, 27, 0.2)'
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  )
}

