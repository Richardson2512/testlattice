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
    // This addresses the issue where password reset/update flows show the dashboard sidebar
    const isExcludedRoute =
        pathname?.startsWith('/update-password') ||
        pathname?.startsWith('/reset-password') ||
        pathname?.startsWith('/forgot-password') ||
        pathname?.startsWith('/login') ||
        pathname?.startsWith('/signup') ||
        pathname?.startsWith('/auth/callback')

    // Show sidebar only if authenticated AND not on an excluded route AND mounted
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
