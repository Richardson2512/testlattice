import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Technology Whitepaper | Rihario',
    description: 'A deep dive into how Rihario uses AI to replace brittle test scripts with semantic understanding and auto-healing selectors.',
    alternates: {
        canonical: 'https://rihario.com/whitepaper',
    },
}

export default function WhitepaperPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>
            <LandingHeader />

            {/* Hero Section */}
            <section style={{
                paddingTop: '140px',
                paddingBottom: '40px',
                background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            lineHeight: 1.1
                        }}>
                            How Rihario Uses AI to <br />
                            <span className="text-gradient">Replace Brittle Test Scripts</span>
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: 1.6
                        }}>
                            A deep dive into our semantic understanding approach, auto-healing selectors,
                            and how we achieve 99.9% reliability without hardcoded paths.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ padding: '2rem 0 4rem' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

                    {/* Section 1: The Problem */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            The Problem with Traditional E2E Testing
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem'
                        }}>
                            Traditional end-to-end testing frameworks like Selenium, Cypress, and Playwright
                            require developers to write explicit test scripts with hardcoded selectors.
                            Every time a class name changes, a button moves, or a form field is renamed,
                            tests break and require manual updates.
                        </p>

                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1.5rem'
                        }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                marginBottom: '1rem',
                                color: 'var(--maroon-800)'
                            }}>
                                Common Pain Points:
                            </h4>
                            <ul style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                paddingLeft: '1.5rem'
                            }}>
                                <li>CSS selectors break when UI is refactored</li>
                                <li>XPath selectors are fragile and hard to maintain</li>
                                <li>Test suites become technical debt over time</li>
                                <li>Hours spent debugging flaky tests instead of shipping features</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2: Semantic Understanding */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            Semantic Visual Understanding
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem'
                        }}>
                            Rihario takes a fundamentally different approach. Instead of relying on
                            brittle CSS selectors, our AI agent understands your application the way
                            a human would—visually and semantically.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>👁️</div>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Visual Recognition</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                    Our AI sees your app as a rendered page, identifying buttons, forms,
                                    and interactive elements by their appearance.
                                </p>
                            </div>

                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🧠</div>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Semantic Context</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                    Natural language understanding lets the AI know that "Submit",
                                    "Send", and "Continue" buttons serve similar purposes.
                                </p>
                            </div>

                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🔄</div>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Auto-Healing</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                    When elements move or change, the AI adapts automatically—no
                                    selector updates needed.
                                </p>
                            </div>

                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⚡</div>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Zero Authoring</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                    Just provide a URL. No test scripts to write, no selectors to
                                    maintain, no learning curve.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Architecture */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            Technical Architecture
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem'
                        }}>
                            Rihario combines multiple AI models with real browser automation to
                            deliver reliable, intelligent testing.
                        </p>

                        <div className="glass-panel" style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--bg-card)'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span style={{
                                        background: 'var(--maroon-600)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        flexShrink: 0
                                    }}>1</span>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Browser Layer</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                            Playwright-powered real browser instances (Chrome, Firefox, Safari)
                                            capture screenshots and execute actions.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span style={{
                                        background: 'var(--maroon-600)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        flexShrink: 0
                                    }}>2</span>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Vision Model</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                            Multi-modal AI analyzes screenshots to understand page structure,
                                            identify interactive elements, and detect visual anomalies.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span style={{
                                        background: 'var(--maroon-600)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        flexShrink: 0
                                    }}>3</span>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Planning Engine</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                            LLM-powered decision making determines optimal exploration paths
                                            and simulates real user behavior patterns.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span style={{
                                        background: 'var(--maroon-600)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        flexShrink: 0
                                    }}>4</span>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Issue Detection</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                            Automated detection of broken links, console errors, visual bugs,
                                            accessibility issues, and behavioral anomalies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Results */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            Results & Reliability
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    color: 'var(--maroon-600)',
                                    marginBottom: '0.5rem'
                                }}>99.9%</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Execution Reliability</div>
                            </div>

                            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    color: 'var(--maroon-600)',
                                    marginBottom: '0.5rem'
                                }}>0</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Test Scripts to Maintain</div>
                            </div>

                            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    color: 'var(--maroon-600)',
                                    marginBottom: '0.5rem'
                                }}>~2min</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Time to First Result</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-xl)'
                    }}>
                        <h3 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            marginBottom: '1rem'
                        }}>
                            Ready to Try Intelligent Testing?
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem',
                            maxWidth: '400px',
                            margin: '0 auto 2rem'
                        }}>
                            Run your first test in under 2 minutes. No signup required.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/" className="btn btn-primary btn-large">
                                Try Free Test →
                            </Link>
                            <Link href="/pricing" className="btn btn-secondary btn-large">
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
