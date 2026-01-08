'use client'

import { LandingHeader } from '@/components/LandingHeader'

const COLORS = {
    primary: '#b91c1c', // maroon-700
    bg: '#0f172a',      // slate-900
    text: '#f8fafc',    // slate-50
    textMuted: '#94a3b8', // slate-400
}

export default function CommunityPage() {
    return (
        <main style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text, fontFamily: 'var(--font-inter)' }}>
            <LandingHeader />

            <div className="container" style={{ padding: '120px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{ color: COLORS.primary, fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        RESOURCES
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        <span className="text-gradient">Community</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: COLORS.textMuted, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
                        Coming soon. Join our community of testers and developers building the future of QA.
                    </p>
                </div>
            </div>
        </main>
    )
}
