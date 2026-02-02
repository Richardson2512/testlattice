import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'What is Vibe Coding? The Rise of the AI-Native Developer | Rihario',
    description: 'Vibe Coding is the new flow state of building software with AI tools like Cursor and Replit. Learn what it is, why it matters, and how to stay in the vibe without breaking prod.',
    keywords: ['vibe coding', 'ai coding', 'cursor ai', 'replit agent', 'ai-native developer', 'flow state coding'],
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-vibe-coding'
    },
    openGraph: {
        title: 'What is Vibe Coding? The Rise of the AI-Native Developer',
        description: 'Vibe Coding is the new flow state of building software with AI tools like Cursor and Replit.',
        type: 'article',
        publishedTime: '2026-01-08',
        authors: ['Rihario Team'],
    }
}

export default function VibeCodingPost() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Article Schema */}
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "What is Vibe Coding? The Rise of the AI-Native Developer",
                    "datePublished": "2026-01-08",
                    "dateModified": "2026-01-08",
                    "author": [{ "@type": "Organization", "name": "Rihario" }],
                    "description": "Vibe Coding is the new flow state of building software with AI tools like Cursor and Replit.",
                })}
            </Script>

            <LandingHeader />

            <article className="container" style={{ maxWidth: '900px', paddingTop: '160px', paddingBottom: '80px' }}>

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
                        Trends • January 2026
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
                        What is Vibe Coding?
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        The rise of the AI-native developer who codes at the speed of thought.
                    </p>
                </header>

                {/* Content */}
                <div className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                    <p>
                        There's a shift happening in how we build software. It’s not just about "autocomplete" anymore. It’s about <strong>Vibe Coding</strong>.
                    </p>

                    <p>
                        If you’ve used tools like <strong>Cursor</strong>, <strong>Replit Agent</strong>, or <strong>Windsurf</strong> lately, you know the feeling. You aren't typing character-by-character. You're directing. You're sculpting. You're vibing.
                    </p>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>The Definition of Vibe Coding</h2>
                    <p>
                        <strong>Vibe Coding</strong> is a new way of building software that focuses on flow state.
                        {' '}<Link href="/docs/what-is-vibe-coding" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Read the official definition →</Link>
                    </p>

                    <div className="glass-panel" style={{ padding: '2rem', margin: '2rem 0', borderLeft: '4px solid var(--primary)' }}>
                        <p style={{ fontStyle: 'italic', margin: 0, fontSize: '1.25rem' }}>
                            "I didn't write a single line of CSS for this landing page. I just told the AI to 'make it look like Apple designed a cyberpunk cafe,' and we vibed from there."
                        </p>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>The Vibe Coder's Tech Stack</h3>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Cursor / Windsurf:</strong> The IDEs that understand your entire codebase context.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Replit Agent:</strong> For spinning up full-stack apps from a single prompt.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>v0.dev / Bolt:</strong> for instant UI generation.</li>
                    </ul>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>The "Vibe Killers"</h2>
                    <p>
                        Vibe coding is magical—until you hit a wall. The speed of generation has a downside: <strong>The fragility of the unknown.</strong>
                    </p>
                    <p>
                        When you generate 500 lines of code in 30 seconds, you don't *really* know what's in there. Did the AI introduce a subtle regression? Did it break the checkout flow while fixing the navbar?
                    </p>
                    <p>
                        Nothing kills the vibe faster than stopping your creative flow to manually click through your app 50 times to check if it's broken.
                    </p>

                    <h2 style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>How to Vibe Code Safely</h2>
                    <p>
                        To keep the vibe high, you need a safety net that operates at the same speed as your AI coding tool. You need <strong>Vibe Testing</strong>.
                    </p>
                    <p>
                        Rihario was built for this exact moment. It allows you to describe a test in plain English, just like you describe your code.
                    </p>

                    <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
                        <h4 style={{ margin: 0, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>The Infinite Vibe Loop:</h4>
                        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Prompt Code</strong> (in Cursor/Replit)</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Code Generates</strong> (Instant result)</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Rihario Tests</strong> (AI checks functionality automatically)</li>
                            <li><strong>Repeat</strong></li>
                        </ol>
                    </div>

                    <p style={{ marginTop: '2rem' }}>
                        By offloading the QA to AI, just like you offloaded the coding, you can stay in pure creative flow.
                    </p>

                </div>

                {/* Related Reading */}
                <div className="glass-panel" style={{ marginTop: '4rem', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Related Reading</h3>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)' }}>
                        <li><Link href="/blog/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>What is Vibe Testing?</Link></li>
                        <li><Link href="/docs/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>Full definition: Vibe Testing</Link></li>
                        <li><Link href="/glossary" style={{ color: 'var(--primary)' }}>Testing Glossary</Link></li>
                    </ul>
                </div>

            </article>

            <Footer />
        </main>
    )
}
