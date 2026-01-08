import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Why Rihario is Better Than Unit Tests for AI Generated Code | Rihario',
    description: 'Stop writing brittle unit tests for ephemeral AI code. Learn why behavior-driven testing with Rihario is the superior strategy for Cursor and Replit projects.',
    keywords: ['unit testing ai code', 'testing cursor code', 'automated testing for ai', 'behavior driven testing', 'rihario vs jest'],
    openGraph: {
        title: 'Why Rihario is Better Than Unit Tests for AI Generated Code',
        description: 'Stop writing brittle unit tests for ephemeral AI code. Switch to behavior testing.',
        type: 'article',
        publishedTime: '2026-01-08',
        authors: ['Rihario Team'],
    }
}

export default function UnitTestingAiCodePost() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Article Schema */}
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Why Rihario is Better Than Unit Tests for AI Generated Code",
                    "datePublished": "2026-01-08",
                    "dateModified": "2026-01-08",
                    "author": [{ "@type": "Organization", "name": "Rihario" }],
                    "description": "Stop writing brittle unit tests for ephemeral AI code. Learn why behavior-driven testing with Rihario is the superior strategy for Cursor and Replit projects.",
                })}
            </Script>

            <LandingHeader />

            <article className="container" style={{ maxWidth: '800px', paddingTop: '160px', paddingBottom: '80px' }}>

                {/* Header */}
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1.5rem'
                    }}>
                        Methodology • January 2026
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Why Rihario is Better Than Unit Tests for AI Generated Code
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        The code is ephemeral. The behavior is what matters.
                    </p>
                </header>

                {/* Content */}
                <div className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                    <p>
                        A common question we see from developers using Cursor or Replit is: <em>"How do I write unit tests for this AI-generated code?"</em>
                    </p>

                    <p>
                        <strong>Rihario's Answer: Usually, you shouldn't.</strong>
                    </p>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>The Problem with Unit Tests in Vibe Coding</h2>

                    <p>
                        Unit tests are designed to verify the implementation details of a specific function. But in Vibe Coding:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Implementation changes constantly:</strong> You might prompt the AI to refactor a class into a hook, breaking all your unit tests even if the app works perfectly.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Double maintenance:</strong> You have to ask the AI to write the code <em>and</em> the tests. Then you have to debug the tests.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>False confidence:</strong> The helper function might pass its unit test, but the buttons on the screen might still be unclickable.</li>
                    </ul>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Why Rihario (Behavior Testing) Wins</h2>

                    <p>
                        Rihario focuses on <strong>Behavior Driven Testing</strong>. We don't care <em>how</em> the code works. We care <em>if</em> it works for the user.
                    </p>

                    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                        <h4 style={{ margin: 0, marginBottom: '1rem', color: 'var(--primary)' }}>Example Scenario: The "Calculate Total" Bug</h4>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h5 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Unit Testing Approach</h5>
                                <p style={{ fontSize: '0.95rem' }}>
                                    You write a Jest test for <code>calculateTotal(items)</code>. It passes. But the UI component isn't passing the <code>items</code> array correctly to the function. <br /><br />
                                    <strong>Result:</strong> Test PASS, User FAIL.
                                </p>
                            </div>
                            <div>
                                <h5 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Rihario Approach</h5>
                                <p style={{ fontSize: '0.95rem' }}>
                                    You tell Rihario: "Add 2 items to the cart and verify the total says $50." Rihario clicks the buttons and reads the text on screen. <br /><br />
                                    <strong>Result:</strong> Real-world verification.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>When SHOULD you write unit tests?</h3>
                    <p>
                        Unit tests still have a place for critical, complex business logic that rarely changes (e.g., tax calculation engines, data transformation pipelines).
                    </p>
                    <p>
                        But for the 90% of your app that is UI, user flow, and glue code? <strong>Rihario is faster, more reliable, and zero maintenance.</strong>
                    </p>

                </div>

                {/* CTA */}
                <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Stop Testing Code. Start Testing Apps.</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Switch to behavior-driven testing with Rihario.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Start Testing Free
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
