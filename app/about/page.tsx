
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
    title: 'About Rihario | The Vibe Testing Company',
    description: 'We are a team of indie hackers building the future of autonomous testing. No enterprise bloat. Just pure engineering.',
}

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <section style={{ paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                        Built by Independent <span className="text-gradient">Builders</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        We didn't raise $10M from VC. We didn't hire a sales team. We built Rihario because we hated writing Playwright tests for our own side projects.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 0 60px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Our Mission</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Software development is shifting. "Vibe Coding" — writing code through natural language prompts — is becoming the norm.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            But testing tools are stuck in 2015. They still require brittle selectors, manual scripts, and constant maintenance.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '0' }}>
                            <strong>Rihario exists to make testing as fluid as coding.</strong> We believe you should be able to say "Test the signup flow" and have it just work.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Key Facts</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>August 2025</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Founded</div>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Indie</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Bootstrapped & Profitable</div>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Remote</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Distributed Team</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
