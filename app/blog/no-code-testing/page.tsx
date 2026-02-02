import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'No-Code Testing: How to Test Your App Without Writing Code',
    description: 'Learn how to test your web app without writing a single line of code. Complete guide to no-code testing tools, AI testing, and when code-free testing makes sense.',
    keywords: ['no-code testing', 'test without code', 'code-free testing', 'AI testing no code', 'testing for non-developers'],
}

export default function NoCodeTestingPost() {
    return (
        <>
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": "How to Test Your App Without Writing Code",
                    "description": "Step-by-step guide to no-code testing",
                    "datePublished": "2024-07-15",
                    "step": [
                        { "@type": "HowToStep", "name": "Sign up", "text": "Create a free account on Rihario" },
                        { "@type": "HowToStep", "name": "Add URL", "text": "Paste your website or app URL" },
                        { "@type": "HowToStep", "name": "Describe test", "text": "Write what to test in plain English" },
                        { "@type": "HowToStep", "name": "Run test", "text": "Click run and wait 2-3 minutes" },
                        { "@type": "HowToStep", "name": "Review results", "text": "See what passed and what failed" }
                    ]
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                <article style={{ paddingTop: '160px', paddingBottom: '5rem' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>

                        {/* Breadcrumb */}
                        <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <span style={{ color: 'var(--text-primary)' }}>No-Code Testing</span>
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
                                Tutorial
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                No-Code Testing: How to Test Your App Without Writing Code
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                You built your app with Bubble, Webflow, or AI tools. Now learn how to test it the same way—without touching code.
                            </p>
                            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                Updated July 2024 • 6 min read
                            </div>
                        </header>

                        {/* TL;DR */}
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
                                <li><strong>No-code testing</strong> lets you verify apps without writing test scripts.</li>
                                <li>Describe what to test in plain English—AI handles the execution.</li>
                                <li>Perfect for indie hackers, founders, and non-technical users.</li>
                                <li>Tools like Rihario run tests across all browsers automatically.</li>
                            </ul>
                        </div>

                        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>
                                What is No-Code Testing?
                            </h2>
                            <p>
                                <strong style={{ color: 'var(--text-primary)' }}>No-code testing means verifying your app works correctly without writing test scripts.</strong> You describe what to test, and AI or visual tools handle the technical execution.
                                {' '}<Link href="/docs/what-is-ai-testing" style={{ color: 'var(--primary)' }}>See the complete guide →</Link>
                            </p>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Step-by-Step: Testing Without Code
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                {[
                                    { step: 1, title: 'Sign Up for a No-Code Testing Tool', desc: 'Create a free account on Rihario (takes 30 seconds)' },
                                    { step: 2, title: 'Paste Your URL', desc: 'Enter your website or app URL (works with localhost too)' },
                                    { step: 3, title: 'Describe What to Test', desc: 'Write in plain English: "Test the signup flow with email test@example.com"' },
                                    { step: 4, title: 'Select Browsers', desc: 'Choose Chrome, Safari, Firefox, mobile—or test all of them' },
                                    { step: 5, title: 'Run and Wait', desc: 'Click run. Results appear in 2-3 minutes.' }
                                ].map(item => (
                                    <div key={item.step} style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'var(--bg-card)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-light)'
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'var(--primary)',
                                            color: '#fff',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            flexShrink: 0
                                        }}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <strong style={{ color: 'var(--text-primary)' }}>{item.title}</strong>
                                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Who Benefits Most from No-Code Testing?
                            </h2>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>No-code builders</strong> – Built with Bubble, Webflow, Softr, or Glide</li>
                                <li><strong>AI-assisted developers</strong> – Used Cursor, Lovable, or v0 to build</li>
                                <li><strong>Non-technical founders</strong> – Can describe tests but not code them</li>
                                <li><strong>Solo developers</strong> – Don't have time to write and maintain test suites</li>
                            </ul>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Ready to Start?
                            </h2>
                            <p>
                                <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Try Rihario free</Link> – no credit card required. Run your first test in 3 minutes.
                            </p>
                        </div>
                    </div>
                </article>

                <Footer />
            </main>
        </>
    )
}
