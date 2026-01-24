import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What is Behavior Testing? | AI Personas | Rihario',
    description: 'Rihario behavior testing uses AI personas to simulate real user interactions, frustration, and goal-completion strategies, going beyond simple functional scripts.',
    openGraph: {
        title: 'Behavior Testing with AI Personas',
        description: 'Simulate real users, not just scripts. Rihario agents have personalities, frustration thresholds, and innovative problem-solving capabilities.',
        url: 'https://rihario.com/behavior-testing',
    },
}

export default function BehaviorTestingPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Behavior Testing with AI Personas
                </h1>

                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    <strong>Behavior Testing</strong> focuses on <em>how</em> a user interacts with your application, not just <em>if</em> a feature works. Rihario uses <strong>AI Personas</strong> to simulate diverse user behaviors, from power users to confused first-timers.
                </p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        The AI Persona Model
                    </h2>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Rihario agents are not rigid scripts. They are autonomous entities initialized with a specific "Persona" that dictates their navigation style, patience, and error recovery strategies.
                        </p>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--primary)' }}>The "Power User"</strong>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Uses shortcuts, navigates fast, expects low latency. Low frustration threshold for performance issues.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--primary)' }}>The "Newbie"</strong>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Reads labels carefully, hovers before clicking, relies on clear onboarding cues. High frustration threshold for navigation clarity.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--primary)' }}>The "Chaos Monkey"</strong>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Intentionally clicks non-interactive elements, resizes windows, and inputs invalid data to test robustness.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        Measuring "Frustration"
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        Unlike functional tests that pass/fail, Behavior Tests output a <strong>Frustration Score</strong>. This metric is derived from:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <li><strong>Rage Clicks:</strong> Repeated clicks on unresponsive elements.</li>
                        <li><strong>Dead Ends:</strong> Navigation paths that lead nowhere (404s or empty states).</li>
                        <li><strong>Confusion Pauses:</strong> Long periods of inactivity where the AI is analyzing the DOM but finding no clear path forward.</li>
                    </ul>
                </section>

                <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        Why This Matters
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Your app might "work" technically (no 500 errors), but still be unusable. Behavior Testing catches the UX flaws that cause users to churn.
                    </p>
                </div>

            </div>
            <Footer />
        </main>
    )
}
