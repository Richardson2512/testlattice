import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Behavior Testing (Bloom Architecture) | Rihario',
    description: 'Evaluate AI agent alignment and character traits using Rihario\'s Bloom Judge. Score behavior against Bloom\'s Taxonomy for safety, compliance, and helpfulness.',
    openGraph: {
        title: 'Behavior Testing with Bloom Architecture',
        description: 'Beyond functional tests: Verify your AI\'s personality, safety alignment, and reasoning capabilities using our proprietary Bloom Judge.',
        url: 'https://rihario.com/behavior-testing',
    },
}

export default function BehaviorTestingPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Behavior Testing & Bloom Architecture
                </h1>

                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    <strong>Behavior Testing</strong> in Rihario is not about clicking buttons—it is about evaluating the <em>cognition and alignment</em> of your AI agents. We use a proprietary <strong>Bloom Architecture</strong> to judge whether your AI is behaving with the correct personality, safety constraints, and reasoning depth.
                </p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        The Bloom Judge Engine
                    </h2>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Traditional tests check if an output is "correct." Rihario's Behavior Tests check if an output is "aligned." We employ a secondary LLM layer (the <strong>Bloom Judge</strong>) that evaluates your agent's interactions against <strong>Bloom's Taxonomy</strong> of cognitive domains.
                        </p>
                        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>1. Knowledge & Comprehension</strong>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    Does the AI understand its system prompt? Does it hallucinate facts?
                                </p>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>2. Application & Analysis</strong>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    Can the AI apply rules to new context? Does it analyze user intent correctly before responding?
                                </p>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>3. Synthesis & Evaluation</strong>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    Does the AI synthesize safe responses in adversarial situations? Does it evaluate trade-offs (e.g., helpfulness vs. safety)?
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        Scoring Alignment
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        Every interaction is scored on a multi-dimensional rubric. Rihario provides a comprehensive <strong>Character Report</strong> for your AI models.
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <li><strong>Safety Score:</strong> Resistance to jailbreaks and prompt injection.</li>
                        <li><strong>Tone Consistency:</strong> Adherence to brand voice (e.g., "Professional" vs "Witty").</li>
                        <li><strong>Instruction Following:</strong> Strictness in following system prompt constraints.</li>
                    </ul>
                </section>

                <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        For Vibe Coding & Agentic AI
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        If you are building autonomous agents, functional tests are not enough. usage Rihario's Bloom Architecture to ensure your agents are not just working, but <em>thinking</em> correctly.
                    </p>
                </div>

            </div>
            <Footer />
        </main>
    )
}
