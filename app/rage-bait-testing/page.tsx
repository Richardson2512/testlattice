import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What is Rage Bait Testing? | Rihario',
    description: 'Rage Bait Testing is an autonomous QA method that simulates frustrated user behavior to detect bad UX, unresponsive elements, and dark patterns.',
    openGraph: {
        title: 'Rage Bait Testing: A New Standard for UX QA',
        description: 'Stop shipping annoying UI. Rihario agents actively try to break your interface with rapid clicks and stress testing.',
        url: 'https://rihario.com/rage-bait-testing',
    },
}

export default function RageBaitTestingPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        'name': 'Rage Bait Testing',
        'description': 'A QA methodology that simulates frustrated user behavior (rage clicks, thrashing) to identify UX flaws.',
        'inDefinedTermSet': {
            '@type': 'DefinedTermSet',
            'name': 'Rihario Testing Methodology'
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LandingHeader />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Rage Bait Testing
                </h1>

                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        <strong>Rage Bait Testing</strong> is a testing methodology implemented in Rihario to simulate impatient, frustrated, or confused user behavior, identifying User Experience (UX) flaws that functional tests miss.
                    </p>
                </div>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Why Traditional Testing Misses This
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        Traditional "Happy Path" testing assumes the user knows exactly what to do and patiently waits for every loader. Real users do not. Real users rage-click when buttons don't react instantly. Real users try to click background overlays. Real users spot "fake" close buttons.
                    </p>
                    <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--error)' }}>
                        <em>Traditional tests verify "Does it work?". Rage Bait Testing verifies "Does it annoy?"</em>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        The 5 Rage Patterns
                    </h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { title: 'The Dead Click', desc: 'Elements that look clickable (cursor: pointer) but do nothing when clicked.' },
                            { title: 'The Rage Click', desc: 'Rapidly clicking a button multiple times because the first click provided no feedback.' },
                            { title: 'The Layover Trap', desc: 'Modals or banners that are impossible to close or overlap critical navigation.' },
                            { title: 'The Layout Shift', desc: 'Content that jumps (CLS) right as the user is about to click, causing a mis-click.' },
                            { title: 'The Dark Pattern', desc: 'Intentionally confusing unsubscribe flows or hidden costs.' }
                        ].map((pattern, i) => (
                            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>{i + 1}. {pattern.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{pattern.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        How Rihario Implements This
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Rage Bait Testing is implemented in Rihario using <strong>Behavioral AI Agents</strong>. Unlike standard scripts, these agents are programmed with a "frustration threshold." If an interaction takes too long, they will attempt to click again, check for console errors, or try to bypass the blocker, logging a "Frustration Signal" event for every occurrence.
                    </p>
                </section>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <Link href="/signup" className="btn btn-primary btn-large">
                        Run a Rage Bait Test
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    )
}
