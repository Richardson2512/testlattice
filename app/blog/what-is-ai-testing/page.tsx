import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'What is AI Testing? Complete Guide for Indie Hackers [2024]',
    description: 'Learn what AI testing is, how it works, and why it\'s replacing manual testing for indie hackers. Covers self-healing tests, no-code testing, and when to use AI vs traditional tools.',
    keywords: ['AI testing', 'what is AI testing', 'automated testing AI', 'AI testing tools', 'no-code testing'],
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-ai-testing'
    }
}

export default function WhatIsAiTestingPost() {
    return (
        <>
            {/* Article Schema */}
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "What is AI Testing? Complete Guide for Indie Hackers",
                    "description": "Comprehensive guide to AI testing for solo developers and indie hackers",
                    "author": { "@type": "Organization", "name": "Rihario" },
                    "publisher": { "@type": "Organization", "name": "Rihario" },
                    "datePublished": "2024-08-22",
                    "dateModified": "2024-01-08"
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                {/* Article Content */}
                <article style={{ paddingTop: '160px', paddingBottom: '5rem' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>

                        {/* Breadcrumb */}
                        <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <span style={{ color: 'var(--text-primary)' }}>What is AI Testing?</span>
                        </nav>

                        {/* Header */}
                        <header style={{ marginBottom: '3rem' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                marginBottom: '1rem'
                            }}>
                                Guide
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                What is AI Testing? The Complete Guide for Indie Hackers
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                A plain-English explanation of AI testing, how it works, and why it's perfect for solo developers who don't want to write test code.
                            </p>
                            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                Updated August 2024 • 8 min read
                            </div>
                        </header>

                        {/* TL;DR */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
                            border: '1px solid #fcd34d',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}>
                            <strong style={{ color: '#92400e' }}>TL;DR:</strong> AI testing uses artificial intelligence to generate, run, and maintain tests automatically.
                            {' '}<Link href="/docs/what-is-ai-testing" style={{ color: '#92400e', textDecoration: 'underline' }}>See the complete guide →</Link>
                        </div>

                        {/* Content */}
                        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>
                                What is AI Testing? (Simple Definition)
                            </h2>
                            <p>
                                <strong style={{ color: 'var(--text-primary)' }}>AI testing</strong> is changing how we verify software.
                                {' '}<Link href="/docs/what-is-ai-testing" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Read the official definition →</Link>
                            </p>
                            <p>
                                For example, instead of writing:
                            </p>
                            <pre style={{
                                background: '#1e293b',
                                color: '#e2e8f0',
                                padding: '1rem',
                                borderRadius: '8px',
                                overflow: 'auto',
                                fontSize: '0.85rem'
                            }}>
                                {`await page.click('#login-button');
await page.fill('#email', 'test@example.com');
await expect(page).toHaveURL('/dashboard');`}
                            </pre>
                            <p>
                                You simply write:
                            </p>
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                padding: '1rem',
                                borderRadius: '8px',
                                fontStyle: 'italic',
                                color: '#166534'
                            }}>
                                "Log in with email test@example.com and verify the user reaches the dashboard."
                            </div>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                How Does AI Testing Work?
                            </h2>
                            <ol style={{ paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '1rem' }}><strong>You provide a URL</strong> – The AI opens your web app in a real browser</li>
                                <li style={{ marginBottom: '1rem' }}><strong>AI scans the page</strong> – It identifies buttons, forms, links, and interactive elements</li>
                                <li style={{ marginBottom: '1rem' }}><strong>You describe the test</strong> – In plain English, like "test the signup flow"</li>
                                <li style={{ marginBottom: '1rem' }}><strong>AI executes the test</strong> – It clicks, types, and navigates like a real user</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Results are analyzed</strong> – You see what passed, failed, and why</li>
                            </ol>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                What Makes AI Testing Different?
                            </h2>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginBottom: '2rem'
                            }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>Feature</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>AI Testing</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Traditional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Coding Required</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>❌ No</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>✅ Yes</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Maintenance</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Self-healing</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Manual</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Setup Time</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Minutes</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Hours/Days</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem' }}>Skill Level</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>Anyone</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>Developers</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Why Indie Hackers Love AI Testing
                            </h2>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>No coding knowledge required</strong> – Perfect if you built with no-code tools</li>
                                <li><strong>Tests don't break when UI changes</strong> – Self-healing AI adapts automatically</li>
                                <li><strong>Faster to get started</strong> – First test in 3 minutes, not 3 days</li>
                                <li><strong>Cheaper than QA engineers</strong> – AI works 24/7 for $19-99/month</li>
                                <li><strong>Comprehensive coverage</strong> – Security, accessibility, performance included</li>
                            </ul>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                When Should You NOT Use AI Testing?
                            </h2>
                            <p>AI testing isn't perfect for every situation:</p>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>Extremely custom interactions</strong> – Complex drag-and-drop or canvas operations</li>
                                <li><strong>You need 100% deterministic tests</strong> – AI has slight variability</li>
                                <li><strong>You're already invested in Playwright/Cypress</strong> – Migration has costs</li>
                            </ul>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Getting Started with AI Testing
                            </h2>
                            <p>
                                Ready to try it? <Link href="/signup" style={{ color: 'var(--primary)' }}>Get started with Rihario for free</Link>. Paste your URL, describe what to test, and see results in 3 minutes.
                            </p>

                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <h3 style={{ marginBottom: '2rem' }}>Related Articles</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                            <Link href="/compare/playwright" className="glass-panel" style={{ padding: '1.5rem', textDecoration: 'none' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>Rihario vs Playwright</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Detailed comparison of AI testing vs code-based testing
                                </p>
                            </Link>
                            <Link href="/glossary" className="glass-panel" style={{ padding: '1.5rem', textDecoration: 'none' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>Testing Glossary</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Learn key terms: God Mode, Self-Healing, Vibe Testing
                                </p>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
