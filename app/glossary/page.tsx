import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Testing Glossary | AI Testing Terms Explained | Rihario',
    description: 'Learn key AI testing terminology: God Mode, Vibe Testing, Self-Healing Tests, Visual Regression, and more. Plain English definitions for indie hackers and solo developers.',
    keywords: ['testing glossary', 'AI testing terms', 'God Mode definition', 'Vibe Testing meaning', 'self-healing tests explained'],
}

import { glossaryTerms } from '@/lib/glossary-data'

export default function GlossaryPage() {
    return (
        <>
            {/* DefinedTermSet Schema for GEO */}
            <Script id="glossary-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "DefinedTermSet",
                    "name": "Rihario Testing Glossary",
                    "description": "Definitions of AI testing and automated testing terminology",
                    "hasDefinedTerm": glossaryTerms.map(term => ({
                        "@type": "DefinedTerm",
                        "name": term.term,
                        "description": term.definition,
                        "url": `https://rihario.com/glossary/${term.slug}`
                    }))
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                {/* Hero */}
                <section style={{ paddingTop: '160px', paddingBottom: '40px', textAlign: 'center' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            Testing <span className="text-gradient">Glossary</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Plain English definitions of AI testing terms. No jargon. No confusion.
                        </p>
                    </div>
                </section>

                {/* Terms Grid */}
                <section style={{ padding: '3rem 0 5rem' }}>
                    <div className="container" style={{ maxWidth: '1000px' }}>
                        {/* Category Navigation */}
                        <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['All', 'Features', 'Methodology', 'Testing Types', 'Concepts', 'Performance'].map(cat => (
                                <span key={cat} style={{
                                    padding: '0.5rem 1rem',
                                    background: cat === 'All' ? 'var(--primary)' : 'var(--bg-card)',
                                    color: cat === 'All' ? '#fff' : 'var(--text-primary)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}>
                                    {cat}
                                </span>
                            ))}
                        </div>

                        {/* Definition List */}
                        <dl style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {glossaryTerms.map((item) => (
                                <div key={item.slug} id={item.slug} className="glass-panel" style={{ padding: '2rem' }}>
                                    <dt>
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                            What is {item.term}?
                                        </h2>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.8rem',
                                            color: 'var(--text-muted)',
                                            marginBottom: '1rem'
                                        }}>
                                            {item.category}
                                        </span>
                                    </dt>
                                    <dd style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>{item.term}</strong> is {item.definition.charAt(0).toLowerCase() + item.definition.slice(1)}
                                        {' '}<Link href={`/glossary/${item.slug}`} style={{ color: 'var(--primary)' }}>Full definition →</Link>
                                    </dd>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Related:</span>
                                        {item.relatedTerms.map(related => (
                                            <Link
                                                key={related}
                                                href={`#${related.toLowerCase().replace(/\s+/g, '-')}`}
                                                style={{
                                                    fontSize: '0.8rem',
                                                    color: 'var(--primary)',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                {related}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Try AI Testing?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            See these concepts in action. Test your app in 3 minutes.
                        </p>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Start Free Trial
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
