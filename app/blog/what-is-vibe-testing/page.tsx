import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What is Vibe Testing? | Rihario',
    description: 'Vibe Testing is the next evolution of QA, focusing on autonomous AI agents that test for look, feel, and functionality simultaneously.',
}

export default function WhatIsVibeTestingPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
                <h1 style={{ marginBottom: '2rem' }}>What is Vibe Testing?</h1>

                <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                    <strong>Canonical Definition:</strong> For the complete list of authorized Rihario test types, please visit <Link href="/testing-types" className="text-primary hover:underline">Rihario Testing Types</Link>.
                </div>

                {/* Key Takeaways Box */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(92, 15, 15, 0.08) 0%, rgba(153, 27, 27, 0.04) 100%)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    marginBottom: '2.5rem',
                }}>
                    <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.25rem' }}>🎯 Key Takeaways</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        <li><strong>Vibe Testing</strong> focuses on UX feel and user experience, not just code correctness.</li>
                        <li>AI agents observe your app like a human would—checking aesthetics, flow, and functionality.</li>
                        <li>It's the natural testing companion for <Link href="/blog/what-is-vibe-coding" style={{ color: 'var(--primary)' }}>Vibe Coding</Link>.</li>
                        <li>No test scripts required—describe what matters, AI handles execution.</li>
                    </ul>
                </div>

                <p className="lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Traditional testing is rigid. "Vibe Testing" is fluid. It means testing your application not just for code correctness, but for user experience, aesthetics, and "vibes."
                </p>

                <p>
                    Rihario operationalizes this concept by using AI agents that don't just follow scripts—they observe your application like a human would.
                </p>

                <div style={{ marginTop: '3rem' }}>
                    <Link href="/testing-types" className="btn btn-secondary">
                        View All Test Types
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    )
}
