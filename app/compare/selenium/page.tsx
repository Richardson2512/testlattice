import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Rihario vs Selenium: Modern AI Testing vs Legacy Scripts | Rihario',
    description: 'Selenium was built for 2004. Rihario was built for 2026. See why modern teams are switching from Selenium WebDriver to Autonomous AI Agents.',
    keywords: ['selenium alternative', 'rihario vs selenium', 'ai testing vs selenium', 'selenium webdriver replace'],
}

export default function CompareSeleniumPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Rihario vs <span style={{ color: '#00a100' }}>Selenium</span>
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                        WebDriver is dead. Long live the Agent.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', marginBottom: '4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>
                        <div>Feature</div>
                        <div style={{ color: '#00a100' }}>Selenium</div>
                        <div style={{ color: 'var(--primary)' }}>Rihario</div>
                    </div>
                    {[
                        { feature: 'Infrastructure', cypress: 'Manage Grid / Drivers', rihario: 'Serverless Cloud' },
                        { feature: 'Language', cypress: 'Java, Python, C#', rihario: 'Natural Language' },
                        { feature: 'Stability', cypress: 'Flaky (Timeouts/Staleness)', rihario: 'Robust (AI Retries)' },
                        { feature: 'Speed', cypress: 'Slow (Serial Execution)', rihario: 'Parallel (Infinite Scaling)' },
                        { feature: 'Learning Curve', cypress: 'Steep (Coding Required)', rihario: 'Zero (Vibe Checks)' },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                            <div style={{ fontWeight: 500 }}>{row.feature}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>{row.cypress}</div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{row.rihario}</div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Stop managing drivers. Start shipping.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Migrate to AI
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    )
}
