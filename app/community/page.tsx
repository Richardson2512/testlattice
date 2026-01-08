'use client'

import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export default function CommunityPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
            <LandingHeader />

            <section style={{
                paddingTop: '140px',
                paddingBottom: '80px',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>👥</div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Community
                    </h1>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        lineHeight: 1.6
                    }}>
                        Coming soon. Join our community of developers who ship with confidence
                        using AI-powered testing.
                    </p>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-muted)'
                    }}>
                        Discord and forum launching soon.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}
