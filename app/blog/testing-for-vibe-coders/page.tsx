import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'How to Test While Vibe Coding: Keep Flow High, Bugs Low',
    description: 'Practical guide for Cursor, Replit, and AI-native developers on how to automate testing without breaking your flow state.',
    keywords: ['vibe coding testing', 'cursor ai testing', 'replit agent testing', 'automated testing for indie hackers', 'ai quality assurance'],
    openGraph: {
        title: 'How to Test While Vibe Coding: Keep Flow High, Bugs Low',
        description: 'Practical guide for Cursor, Replit, and AI-native developers to automate testing.',
        type: 'article',
        publishedTime: '2026-01-08',
        authors: ['Rihario Team'],
    }
}

export default function TestingForVibeCodersPost() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Article Schema */}
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "How to Test While Vibe Coding: Keep Flow High, Bugs Low",
                    "datePublished": "2026-01-08",
                    "dateModified": "2026-01-08",
                    "author": [{ "@type": "Organization", "name": "Rihario" }],
                    "description": "Practical guide for Cursor, Replit, and AI-native developers on how to automate testing without breaking your flow state.",
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
                        Guide • January 2026
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
                        How to Test While Vibe Coding
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Don't let manual QA become your bottleneck. Here's the workflow.
                    </p>
                </header>

                {/* Content */}
                <div className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                    <p>
                        So you’re <em>vibe coding</em>. You’re prompting Cursor to build a new dashboard. You’re asking Replit to refactor your auth flow. You’re moving 10x faster than you used to.
                    </p>

                    <p>
                        But then… <strong>dread.</strong>
                    </p>

                    <p>
                        You realized you just changed 40 files in one prompt. Did the login break? Is the mobile menu responsive? Does the checkout still calculate tax?
                    </p>

                    <p>
                        The old way (writing Jest/Playwright tests by hand) is too slow. It breaks your flow. It kills the vibe.
                    </p>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>The <Link href="/docs/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>Vibe Testing</Link> Workflow</h2>

                    <p>
                        To match the speed of Vibe Coding, you need a testing layer that works on **intent**, not script. Here is the 3-step workflow to keep your projects bug-free without leaving your editor.
                    </p>

                    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                        <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--primary)' }}>Step 1: The "Sanity" Prompt (<Link href="/docs/run-first-test" style={{ color: 'var(--primary)' }}>Get started</Link>)</h3>
                        <p>
                            Whenever you ask your AI coder to build a feature, immediately pop over to Rihario (or use our theoretical CLI 😉) and prompt a test for it.
                        </p>
                        <p style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                            <strong>Prompt:</strong> "Go to /dashboard and verify that the new 'Export CSV' button actually downloads a file."
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                        <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--primary)' }}>Step 2: The "Regression" Suite</h3>
                        <p>
                            Before you merge or deploy, run your core flows. In Vibe Coding, you break things often because you move fast.
                        </p>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                            <li>Login / Signup</li>
                            <li>Core value prop (e.g. creating a project)</li>
                            <li>Settings / Billing</li>
                        </ul>
                        <p>
                            Keep these as saved tests in Rihario. One click runs them all.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                        <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--primary)' }}>Step 3: Visual Vibes</h3>
                        <p>
                            AI code generators are notorious for messing up CSS. Using Rihario's **Visual Regression**, you can instantly see if your header alignment shifted by 2 pixels or if your dark mode is suddenly white.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Why Manual Testing is Dead for Vibe Coders</h2>
                    <p>
                        When you write code by hand, you have a mental model of what you touched. When you vibe code, you don't. You are the architect, not the bricklayer.
                    </p>
                    <p>
                        Because you don't know exactly what changed, manual testing requires checking <em>everything</em>. That’s impossible.
                    </p>
                    <p>
                        Automated AI testing is the only way to scale your confidence along with your code volume.
                    </p>

                </div>

                {/* CTA */}
                <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Keep Your Flow State & Your Users</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Set up your safety net today. It takes 3 minutes.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Start Automated Testing
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
