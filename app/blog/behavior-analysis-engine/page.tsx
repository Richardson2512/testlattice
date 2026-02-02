
import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Behavior Analysis Engine & Security | Rihario',
    description: 'How Rihario\'s AI detects security vulnerabilities and logic flaws without test scripts using the Behavior Analysis Engine (BAE).',
}

export default function BehaviorAnalysisEnginePage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Behavior Analysis Engine: How AI Detects Security Vulnerabilities Without Test Scripts</h1>

                <p className="lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Scripted tests only check what you tell them to check. The Behavior Analysis Engine (BAE) checks what you <em>didn't</em> think of.
                </p>

                <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Beyond Functional Testing</h2>
                <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Traditional automated tests verify "Happy Paths" (e.g., "User can login"). But they miss the "Unhappy Paths" that hackers and confused users find.
                </p>

                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>How BAE Works</h2>
                <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Rihario's BAE uses a fine-tuned Large Language Model (Bloom Architecture) that understands web security and UX patterns. As the AI navigates your app, it is constantly asking:
                </p>
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🔓</span>
                            <span>"Is this API response exposing PII?"</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>💉</span>
                            <span>"Can I inject SQL into this input field?"</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🤬</span>
                            <span>"Is this button dead (Rage Click potential)?"</span>
                        </li>
                    </ul>
                </div>

                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Zero-Config Security</h2>
                <p style={{ lineHeight: 1.7, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Because BAE relies on generalizable heuristics rather than hard-coded assertions, it works on any web app out of the box. You don't need to write security tests. You just point Rihario at your URL, and it acts like a white-hat hacker, reporting vulnerabilities before they reach production.
                </p>
            </div>
            <Footer />
        </main>
    )
}
