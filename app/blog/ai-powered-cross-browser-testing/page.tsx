
import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { InteractiveBrowserStack } from '@/components/InteractiveBrowserStack'

export const metadata: Metadata = {
    title: 'AI-Powered Cross-Browser Testing | Rihario',
    description: 'How Rihario tests Chrome, Firefox, and Safari in parallel using AI agents. Eliminate browser-specific bugs without manual QA.',
}

export default function CrossBrowserTestingPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>AI-Powered Cross-Browser Testing: How Rihario Tests Chrome, Firefox, Safari in Parallel</h1>

                <p className="lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Most developers test on Chrome and cross their fingers for Safari. Rihario changes that by running your tests on all major engines simultaneously.
                </p>

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
                        <li><strong>The "One Engine" trap:</strong> Chrome works ≠ Safari works. CSS and JS behave differently.</li>
                        <li>Rihario runs Chromium, WebKit, and Firefox tests in parallel.</li>
                        <li>AI detects browser-specific regressions automatically.</li>
                        <li>100% coverage in the time it takes to run one test.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <InteractiveBrowserStack />
                </div>

                <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>The "One Engine" Trap</h2>
                <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Building on Chrome doesn't mean it works on WebKit (Safari). CSS grid inconsistencies, flexbox behavior, and date parsing often break on iOS devices. Manual testing is too slow.
                </p>

                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Parallel AI Execution</h2>
                <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    When you paste your URL into Rihario, we spin up isolated containers for:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                    <li><strong>Chromium</strong> (Chrome, Edge, Brave)</li>
                    <li><strong>WebKit</strong> (Safari, iOS)</li>
                    <li><strong>Firefox Gecko</strong></li>
                </ul>
                <p style={{ lineHeight: 1.7, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Our AI agent navigates your site in all three environments at the exact same time. If a button is unclickable in Safari but works in Chrome, the AI detects the discrepancy and flags it as a "Cross-Browser Regression."
                </p>

                <div style={{ padding: '2rem', background: '#f0fdf4', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
                    <strong>Result:</strong> You get 100% coverage in the time it takes to run one test.
                </div>
            </div>
            <Footer />
        </main>
    )
}
