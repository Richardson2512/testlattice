import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'What is Vibe Testing? The New Way to Test Apps in 2024',
    description: 'Vibe Testing explained: describe tests in plain English, AI executes them. Learn how vibe testing differs from traditional testing and when to use it.',
    keywords: ['vibe testing', 'what is vibe testing', 'vibe testing tools', 'AI vibe testing', 'vibe code testing'],
}

export default function WhatIsVibeTestingPage() {
    return (
        <>
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "What is Vibe Testing? The New Way to Test Apps in 2024",
                    "author": { "@type": "Organization", "name": "Rihario" },
                    "datePublished": "2024-09-12"
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                <article style={{ paddingTop: '160px', paddingBottom: '5rem' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>

                        <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <span style={{ color: 'var(--text-primary)' }}>What is Vibe Testing</span>
                        </nav>

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
                                Concept
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                What is Vibe Testing? The New Way to Test Apps
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                If you've heard of "vibe coding," get ready for its testing counterpart.
                            </p>
                        </header>

                        {/* TL;DR */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
                            border: '1px solid #fcd34d',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}>
                            <strong style={{ color: '#92400e' }}>TL;DR:</strong> Vibe Testing is testing your app by describing what to test in plain English, and letting AI handle the technical details. It's the testing equivalent of "vibe coding" with Cursor or Claude—you focus on intent, AI handles execution.
                        </div>

                        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>
                                What is Vibe Testing?
                            </h2>
                            <p>
                                <strong style={{ color: 'var(--text-primary)' }}>Vibe Testing is a testing methodology where you describe what to test in natural language, and AI executes the test.</strong>
                            </p>
                            <p>
                                Instead of writing test scripts like this:
                            </p>
                            <pre style={{
                                background: '#1e293b',
                                color: '#e2e8f0',
                                padding: '1rem',
                                borderRadius: '8px',
                                overflow: 'auto',
                                fontSize: '0.85rem'
                            }}>
                                {`await page.goto('/login');
await page.fill('#email', 'test@example.com');
await page.fill('#password', 'secret123');
await page.click('button[type="submit"]');
await expect(page).toHaveURL('/dashboard');`}
                            </pre>
                            <p>
                                You write this:
                            </p>
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                padding: '1rem',
                                borderRadius: '8px',
                                fontStyle: 'italic',
                                color: '#166534',
                                marginBottom: '1rem'
                            }}>
                                "Test the login flow: enter email test@example.com and password secret123, submit the form, and verify the user reaches the dashboard."
                            </div>
                            <p>
                                The AI interprets your intent, finds the right elements, handles timing, and executes the test.
                            </p>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Why is It Called "Vibe Testing"?
                            </h2>
                            <p>
                                The term comes from "vibe coding"—a style of development popularized by AI coding assistants like Cursor, Claude, and ChatGPT. In vibe coding, you describe what you want in natural language and let AI write the code.
                            </p>
                            <p>
                                <strong>Vibe Testing</strong> applies the same principle to QA: describe the test, let AI execute it.
                            </p>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Vibe Testing vs Traditional Testing
                            </h2>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginBottom: '2rem'
                            }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>Aspect</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Vibe Testing</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Traditional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Test Format</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Plain English</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Code (JS/Python)</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Who Can Write</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Anyone</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Developers</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Maintenance</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>AI adapts (self-healing)</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Manual updates</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Setup Time</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Minutes</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>Hours/Days</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem' }}>Best For</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>Indie hackers, solo devs</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>Large teams, complex apps</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Who Should Use Vibe Testing?
                            </h2>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>Indie hackers</strong> building MVPs solo</li>
                                <li><strong>Non-technical founders</strong> who can't write test code</li>
                                <li><strong>Vibe coders</strong> who built with Cursor, v0, or Lovable</li>
                                <li><strong>No-code builders</strong> using Bubble, Webflow, Softr</li>
                                <li><strong>Solo developers</strong> who don't have time for test maintenance</li>
                            </ul>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Try Vibe Testing Now
                            </h2>
                            <p>
                                <Link href="/" style={{ color: 'var(--primary)' }}>Rihario</Link> is the first platform built specifically for Vibe Testing:
                            </p>
                            <ol style={{ paddingLeft: '1.5rem' }}>
                                <li>Paste your URL</li>
                                <li>Describe what to test in plain English</li>
                                <li>Get results in 3 minutes</li>
                            </ol>
                            <p style={{ marginTop: '1.5rem' }}>
                                <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Try Vibe Testing free →</Link>
                            </p>
                        </div>
                    </div>
                </article>

                <Footer />
            </main>
        </>
    )
}
