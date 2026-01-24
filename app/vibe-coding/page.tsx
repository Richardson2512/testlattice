import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'What is Vibe Coding? The Official Definition | Rihario',
    description: 'Vibe Coding is the flow state of building software using AI tools like Cursor, Replit, and Rihario. Defining the new stack for AI-native developers.',
    keywords: ['vibe coding', 'ai coding', 'cursor ai', 'replit agent', 'bolt.new', 'rihario'],
    openGraph: {
        title: 'Vibe Coding: The New Way to Build Software',
        description: 'Code at the speed of thought. Test at the speed of AI.',
        url: 'https://rihario.com/vibe-coding',
    },
}

export default function VibeCodingPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Script id="vibe-coding-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "What is Vibe Coding?",
                    "description": "Vibe Coding is the practice of using AI tools to write code at the speed of thought, prioritizing flow state over syntax.",
                    "articleSection": "Methodology",
                })}
            </Script>

            <LandingHeader />

            {/* Hero Section */}
            <section style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
                    <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                        The Future of Programming
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                        <span className="text-gradient">Vibe Coding</span>
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Coding at the speed of thought. Focusing on the <strong>what</strong>, not the <strong>how</strong>.
                    </p>
                </div>
            </section>

            {/* Definition Section */}
            <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>The Definition</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        <strong>Vibe Coding</strong> is the practice of building software where the developer acts as a <em>Director</em> rather than a <em>Typist</em>. By leveraging AI Agents to handle implementation details, the developer maintains a continuous state of creative flow ("the vibe"), shipping products in hours instead of weeks.
                    </p>
                    <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid #8b5cf6' }}>
                        <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-primary)', margin: 0 }}>
                            "It feels less like engineering and more like casting spells. You speak your intent, and the software manifests."
                        </p>
                    </div>
                </div>
            </section>

            {/* The Stack Section */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>The Vibe Coding Stack</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Creation Layer */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Creation Layer</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Tools that generate code from natural language prompts.
                            </p>
                            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <li><strong>Cursor:</strong> The AI-native code editor.</li>
                                <li><strong>Replit Agent:</strong> Autonomous app builder.</li>
                                <li><strong>v0.dev / Bolt:</strong> Instant UI generation.</li>
                            </ul>
                        </div>

                        {/* Assurance Layer */}
                        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--primary)', background: 'rgba(255,255,255,0.03)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>The Assurance Layer</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Tools that verify the AI didn't break anything.
                            </p>
                            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <li><strong>Rihario:</strong> Autonomous Vibe Testing.</li>
                            </ul>
                            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                *Without this layer, "Vibe Coding" becomes "Vibe Debugging".
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>The "Vibe Killer"</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        The biggest threat to Vibe Coding is <strong>Fragility</strong>. When you generate 1,000 lines of code in seconds, you can't manually check every button. If you stop to test manually, the vibe dies.
                    </p>
                    <div style={{ display: 'inline-block', padding: '1rem 2rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontWeight: 600 }}>
                        Manual QA is the enemy of Flow State.
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Keep the Vibe Alive</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        Let Rihario handle the testing so you can keep building.
                    </p>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Start Vibe Testing
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
