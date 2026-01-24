import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'
import { glossaryTerms } from '@/lib/glossary-data'

export function generateStaticParams() {
    return glossaryTerms.map((term) => ({
        slug: term.slug,
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const term = glossaryTerms.find(t => t.slug === params.slug)

    if (!term) {
        return {
            title: 'Term Not Found | Rihario Glossary',
        }
    }

    return {
        title: `What is ${term.term}? | Rihario Testing Glossary`,
        description: `Definition of ${term.term}: ${term.definition}`,
        alternates: {
            canonical: `https://rihario.com/glossary/${term.slug}`
        }
    }
}

export default function GlossaryTermPage({ params }: { params: { slug: string } }) {
    const term = glossaryTerms.find(t => t.slug === params.slug)

    if (!term) {
        notFound()
    }

    return (
        <>
            <Script id="term-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "DefinedTerm",
                    "name": term.term,
                    "description": term.definition,
                    "inDefinedTermSet": {
                        "@type": "DefinedTermSet",
                        "name": "Rihario Testing Glossary",
                        "url": "https://rihario.com/glossary"
                    }
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                <section style={{ paddingTop: '160px', paddingBottom: '80px' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>

                        <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <Link href="/glossary" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Glossary</Link>
                        </nav>

                        <div className="glass-panel" style={{ padding: '3rem' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                marginBottom: '1.5rem'
                            }}>
                                {term.category}
                            </span>

                            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                                What is <span className="text-gradient">{term.term}</span>?
                            </h1>

                            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                                {term.definition}
                            </p>

                            {term.canonicalUrl && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <Link href={term.canonicalUrl} className="btn btn-primary">
                                        Read Full Guide →
                                    </Link>
                                </div>
                            )}

                            {term.relatedTerms.length > 0 && (
                                <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Related Terms</h3>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {term.relatedTerms.map(related => {
                                            const relatedSlug = related.toLowerCase().replace(/\s+/g, '-')
                                            // Check if related term exists in glossary to link correctly, otherwise just text
                                            const exists = glossaryTerms.some(t => t.slug === relatedSlug)

                                            if (exists) {
                                                return (
                                                    <Link key={related} href={`/glossary/${relatedSlug}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                                                        {related}
                                                    </Link>
                                                )
                                            }
                                            return <span key={related} style={{ color: 'var(--text-muted)' }}>{related}</span>
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
