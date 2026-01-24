import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Rihario vs Cypress: The AI Alternative for 2026 | Rihario',
    description: 'Compare Rihario AI Agents vs Cypress scripts. Stop maintaining brittle selectors. Switch to autonomous vibe testing.',
    keywords: ['cypress alternative', 'rihario vs cypress', 'ai testing vs cypress', 'autonomous testing'],
}

export default function CompareCypressPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Rihario vs <span style={{ color: '#22c55e' }}>Cypress</span>
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                        Stop writing scripts. Start testing.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', marginBottom: '4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>
                        <div>Feature</div>
                        <div style={{ color: '#22c55e' }}>Cypress</div>
                        <div style={{ color: 'var(--primary)' }}>Rihario</div>
                    </div>
                    {[
                        { feature: 'Test Creation', cypress: 'Write Code (JS/TS)', rihario: 'Plain English / Zero Config' },
                        { feature: 'Maintenance', cypress: 'High (Brittle Selectors)', rihario: 'Zero (Self-Healing AI)' },
                        { feature: 'Setup Time', cypress: 'Hours (Config files)', rihario: 'Seconds (URL only)' },
                        { feature: 'Execution', cypress: 'Local or CI Pipeline', rihario: 'Cloud Autonomous' },
                        { feature: 'Visual Testing', cypress: 'Plugin Required', rihario: 'Native (Pixel-Perfect)' },
                        { feature: 'Logic', cypress: ' deterministic', rihario: 'Adaptive / Heuristic' },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                            <div style={{ fontWeight: 500 }}>{row.feature}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>{row.cypress}</div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{row.rihario}</div>
                        </div>
                    ))}
                </div>

                {/* Deep Dive */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Where Cypress Wins</h2>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Unit/Integration Tests:</strong> Precise checks of internal component logic.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Local Dev:</strong> Running tests alongside code changes instantly.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Exact Control:</strong> When you need to assert specifically <code>data-testid="submit"</code>.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Where Rihario Wins</h2>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Vibe Coding:</strong> Keeping up with AI-generated code changes.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>End-to-End:</strong> Simulating real user behavior and frustration.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Maintenance:</strong> AI heals itself when you rename a button. Cypress breaks.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Don't replace your unit tests. Replace your headache.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Try Autonomous Testing
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    )
}
