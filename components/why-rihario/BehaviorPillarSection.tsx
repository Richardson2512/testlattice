import React from 'react'

export function BehaviorPillarSection() {
    return (
        <section style={{ padding: '6rem 0' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{ display: 'flex', gap: '3rem', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                    <div>
                        <div style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--maroon-800)',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            letterSpacing: '0.05em'
                        }}>The 4th Pillar of Testing</div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '1.5rem'
                        }}>Behavioral Integrity</h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Traditional testing checks if code crashes. <strong>Behavioral testing checks if your AI lies.</strong>
                            Rihario introduces the industry's first autonomous red-teaming engine that continuously stress-tests
                            your agents against hallucination, bias, and security jailbreaks.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        width: '100%',
                        marginTop: '2rem'
                    }}>
                        {[
                            { title: 'Semantic Drift', desc: 'Detect when your agent slowly starts deviating from its core instructions over long conversations.' },
                            { title: 'Adversarial Robustness', desc: 'Simulate bad-actors trying to extract PII or prompt-inject your system.' },
                            { title: 'Tone & Persona', desc: 'Ensure your brand voice (friendly, professional, terse) remains consistent regardless of user input.' }
                        ].map((card, i) => (
                            <div key={i} style={{
                                padding: '2rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'left'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                    {card.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
