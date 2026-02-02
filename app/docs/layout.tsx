import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import type { ReactNode } from 'react'
import { DocsNav } from './components/DocsNav'
import { OnThisPage } from '@/components/docs'
import { DocsBackground } from '@/components/docs'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <LandingHeader />
      <div style={{ display: 'flex', marginTop: '70px', position: 'relative' }}>
        {/* Left Sidebar - Navigation */}
        <aside
          style={{
            width: '220px',
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border-light)',
            position: 'fixed',
            top: '70px',
            left: 0,
            bottom: 0,
            overflowY: 'auto',
            padding: '1.5rem 0',
            zIndex: 10,
          }}
        >
          <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
            <Link
              href="/docs"
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Documentation
            </Link>
          </div>

          <DocsNav />
        </aside>

        {/* Main Content Area */}
        <div
          style={{
            marginLeft: '220px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 70px)',
            padding: '0 2rem',
          }}
        >
          {/* Content + TOC Container */}
          <div className="docs-content-toc-wrapper">
            {/* Content Wrapper with Background */}
            <div className="docs-content-wrapper">
              <DocsBackground />
              <div className="docs-container">
                {children}
              </div>
            </div>

            {/* Right Sidebar - On This Page */}
            <OnThisPage />
          </div>
        </div>
      </div>
    </div>
  )
}
