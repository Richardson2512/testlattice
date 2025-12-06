import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'TestLattice - AI-Powered Test Automation',
  description: 'Autonomous AI-driven test automation platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  let isAuthenticated = false
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    isAuthenticated = !!user
  } catch (error) {
    // If Supabase is not configured, assume not authenticated
    isAuthenticated = false
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body style={{ background: 'var(--bg-primary)' }}>
        <ErrorBoundary>
          {isAuthenticated && <Navigation />}
          <main
            style={{
              minHeight: '100vh',
              background: 'var(--bg-primary)',
              padding: 0,
              marginLeft: isAuthenticated ? 'var(--sidebar-width)' : '0',
              width: isAuthenticated ? 'calc(100% - var(--sidebar-width))' : '100%',
              transition: 'margin-left var(--transition-base), width var(--transition-base)',
            }}
          >
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  )
}

