import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Automated AI Testing vs Manual QA | Rihario',
    description: 'Why hire a manual tester when Rihario AI Agents work 24/7 for a fraction of the cost? Compare ROI, speed, and coverage.',
    keywords: ['manual testing vs automated testing', 'ai testing vs manual qa', 'qa cost comparison'],
}

export default function CompareManualQaPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        AI Agents vs <span style={{ color: '#f59e0b' }}>Manual QA</span>
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                        Humans sleep. Agents don't.
                    </p>
                </div>

                {/* ROI Cards */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '300px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#f59e0b' }}>Manual Tester</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>$40<span style={{ fontSize: '1rem', fontWeight: 400 }}>/hr</span></div>
                        <p style={{ color: 'var(--text-secondary)' }}>Slow, inconsistent, expensive.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '300px', textAlign: 'center', border: '1px solid var(--primary)', background: 'rgba(139, 92, 246, 0.05)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Rihario Agent</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>$0.05<span style={{ fontSize: '1rem', fontWeight: 400 }}>/run</span></div>
                        <p style={{ color: 'var(--text-secondary)' }}>Instant, infinite scale, 24/7.</p>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', marginBottom: '4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>
                        <div>Feature</div>
                        <div style={{ color: '#f59e0b' }}>Manual QA</div>
                        <div style={{ color: 'var(--primary)' }}>Rihario</div>
                    </div>
                    {[
                        { feature: 'Availability', cypress: '9-5 Business Hours', rihario: '24/7/365' },
                        { feature: 'Speed', cypress: '1 test / 5 mins', rihario: '100 tests / 1 min' },
                        { feature: 'Consistency', cypress: 'Misses bugs (fatigue)', rihario: 'Pixel-perfect recall' },
                        { feature: 'Documentation', cypress: 'Manual screenshots', rihario: 'Auto-generated video/logs' },
                        { feature: 'Cost for 100 Runs', cypress: '$300+', rihario: '< $5' },
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
                        Scale your testing, not your payroll.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Hire an AI Tester
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    )
}
