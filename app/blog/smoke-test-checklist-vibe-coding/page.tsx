import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Rihario\'s Smoke Test Checklist for Vibe Coded Apps | Rihario',
    description: 'A 5-point automated smoke test checklist for apps built with Cursor, Replit, or Windsurf. Learn how to verify your vibe coded app in 3 minutes.',
    keywords: ['smoke test checklist', 'vibe coding testing', 'cursor app testing', 'automated smoke tests', 'rihario smoke test'],
    openGraph: {
        title: 'Rihario\'s Smoke Test Checklist for Vibe Coded Apps',
        description: 'Verify your vibe coded app in 3 minutes with this automated checklist.',
        type: 'article',
        publishedTime: '2026-01-08',
        authors: ['Rihario Team'],
    }
}

export default function SmokeTestChecklistPost() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Article Schema */}
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Rihario's Smoke Test Checklist for Vibe Coded Apps",
                    "datePublished": "2026-01-08",
                    "dateModified": "2026-01-08",
                    "author": [{ "@type": "Organization", "name": "Rihario" }],
                    "description": "A 5-point automated smoke test checklist for apps built with Cursor, Replit, or Windsurf.",
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
                        Checklists • January 2026
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
                        Rihario's Smoke Test Checklist for Vibe Coded Apps
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        You generated the code in 5 minutes. Now verifying it shouldn't take an hour.
                    </p>
                </header>

                {/* Content */}
                <div className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                    <p>
                        Vibe coding with tools like Cursor and Replit is fast, but it's also chaotic. Small prompts can break big features. A "smoke test" is your first line of defense—a quick set of checks to ensure the app isn't on fire.
                    </p>

                    <p>
                        Manual smoke testing kills your flow. <strong>Rihario recommends automating this entire 5-point checklist</strong> so you can run it with one click after every major prompt.
                    </p>

                    <div className="glass-panel" style={{ padding: '2.5rem', marginTop: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                            The Vibe Coder's Smoke Checklist
                        </h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>1. The "Happy Path" Login</h3>
                            <p><strong>Goal:</strong> Can a user get into the app?</p>
                            <p>
                                Rihario creates a test that visits your login page, enters test credentials, and asserts that the dashboard loads. If this fails, stop coding and fix it immediately.
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>2. The Core Value Action</h3>
                            <p><strong>Goal:</strong> Can the user do the *one thing* your app is for?</p>
                            <p>
                                If you're building a todo app, can Rihario add a todo? If it's a generator, can Rihario generate an image? This verifies your business logic didn't break during a UI refactor.
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>3. The "404" Check</h3>
                            <p><strong>Goal:</strong> Did a routing change break navigation?</p>
                            <p>
                                Rihario's spider can quickly crawl your navbar links to ensure none of them return a 404 error or a blank white screen (the "White Screen of Death").
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>4. The Mobile Viewport</h3>
                            <p><strong>Goal:</strong> Did the new sidebar crush the mobile layout?</p>
                            <p>
                                Rihario runs your tests in a mobile viewport (375x812) automatically. We check for horizontal scrollbars and overlapping elements that make the app unusable on phones.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>5. Third-Party Integrations</h3>
                            <p><strong>Goal:</strong> Is Stripe/Supabase/OpenAI actually connecting?</p>
                            <p>
                                Rihario monitors network requests during the test. We assert that calls to your API or third-party services return 200 OK statuses, not 500 errors.
                            </p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Why Rihario?</h3>
                    <p>
                        You could write Playwright scripts for all of these. But you're a vibe coder. You don't want to maintain test scripts.
                    </p>
                    <p>
                        With **Rihario**, you just describe these 5 steps in plain English once. Our AI agents execute them forever. When your UI changes, Rihario self-heals the test instead of failing.
                    </p>

                </div>

                {/* CTA */}
                <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Automate This Checklist Now</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Don't check manually. Let Rihario smoke test your production build.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Start Smoke Testing
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
