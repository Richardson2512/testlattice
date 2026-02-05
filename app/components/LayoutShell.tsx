'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function LayoutShell({
    children,
    userAuthenticated,
}: {
    children: React.ReactNode
    userAuthenticated: boolean
}) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    // Wait for client-side hydration to complete before showing sidebar
    useEffect(() => {
        setMounted(true)
    }, [])

    // Routes where sidebar should ALWAYS be hidden, even if authenticated
    // This allows logged-in users to view public pages with the normal header
    const isExcludedRoute =
        // Auth routes
        pathname?.startsWith('/update-password') ||
        pathname?.startsWith('/reset-password') ||
        pathname?.startsWith('/forgot-password') ||
        pathname?.startsWith('/login') ||
        pathname?.startsWith('/signup') ||
        pathname?.startsWith('/auth/callback') ||
        // Public pages - logged-in users should see these with normal header (not dashboard sidebar)
        pathname === '/' ||
        pathname?.startsWith('/blog') ||
        pathname?.startsWith('/about') ||
        pathname?.startsWith('/pricing') ||
        pathname?.startsWith('/features') ||
        pathname?.startsWith('/contact') ||
        pathname?.startsWith('/docs') ||
        pathname?.startsWith('/faq') ||
        pathname?.startsWith('/whitepaper') ||
        pathname?.startsWith('/privacy-policy') ||
        pathname?.startsWith('/terms-of-service') ||
        pathname?.startsWith('/community') ||
        pathname?.startsWith('/how-rihario-works') ||
        pathname?.startsWith('/why-rihario') ||
        pathname?.startsWith('/glossary') ||
        pathname?.startsWith('/compare') ||
        pathname?.startsWith('/vibe-coding') ||
        pathname?.startsWith('/testing-types') ||
        pathname?.startsWith('/what-is-') ||
        pathname?.startsWith('/rage-bait-testing') ||
        pathname?.startsWith('/behavior-test')

    // Show sidebar only on dashboard/app routes when authenticated
    const showSidebar = mounted && userAuthenticated && !isExcludedRoute

    return (
        <>
            {showSidebar && <Navigation />}
            <main
                style={{
                    minHeight: '100vh',
                    background: 'var(--bg-primary)',
                    padding: 0,
                    marginLeft: showSidebar ? 'var(--sidebar-width)' : '0',
                    width: showSidebar ? 'calc(100% - var(--sidebar-width))' : '100%',
                    transition:
                        'margin-left var(--transition-base), width var(--transition-base)',
                }}
            >
                {children}
            </main>
        </>
    )
}
