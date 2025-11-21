'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Navigation() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      borderBottom: scrolled ? '1px solid var(--border-light)' : 'none',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem',
      transition: 'all var(--transition-base)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link 
          href="/" 
          style={{ 
            fontSize: '1.375rem', 
            fontWeight: '700', 
            textDecoration: 'none',
            background: 'linear-gradient(135deg, var(--maroon-800) 0%, var(--maroon-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          TestLattice
        </Link>
        {user && (
          <Link 
            href="/dashboard" 
            style={{ 
              textDecoration: 'none', 
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              fontWeight: '500',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-link)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Dashboard
          </Link>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {loading ? (
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Loading...</span>
        ) : user ? (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              background: 'var(--beige-50)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--maroon-700) 0%, var(--maroon-800) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '600',
              }}>
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontSize: '0.875rem',
                fontWeight: '500',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {user.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-ghost"
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/login" 
              className="btn btn-ghost"
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
              }}
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="btn btn-primary"
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
