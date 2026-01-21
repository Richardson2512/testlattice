import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: 'God Mode - When AI Gets Stuck, You Take Over | Rihario',
    description: 'God Mode lets you intervene when AI testing gets stuck. Jump in, click the right element, and the test continues. AI learns and remembers for next time.',
    alternates: {
        canonical: 'https://rihario.com/features/god-mode',
    },
}
export default function GodModePage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
            <LandingHeader />

            {/* Hero */}
            <section style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.35rem 1rem',
                        background: 'rgba(153, 27, 27, 0.08)',
                        border: '1px solid rgba(153, 27, 27, 0.2)',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--maroon-800)' }}>
                            🎮 Exclusive to Rihario
                        </span>
                    </div>
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
                        When AI Gets Stuck, <span className="text-gradient">You Take Over</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                        Other AI testing tools just fail when they can't find what they're looking for. With <strong>God Mode</strong>, you jump in, show the AI what to click, and your test keeps running. The AI remembers for next time.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Try God Mode Free
                        </Link>
                        <Link href="/pricing" className="btn btn-secondary btn-large">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Problem */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>The Problem with AI Testing</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            AI isn't perfect. Here's what happens with other tools:
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Other Tools */}
                        <div style={{ padding: '2rem', background: '#fef2f2', borderRadius: '16px', border: '2px solid #fecaca' }}>
                            <h3 style={{ color: '#991b1b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                ❌ Other AI Testing Tools
                            </h3>
                            <ol style={{ paddingLeft: '1.25rem', color: '#7f1d1d', lineHeight: 1.8 }}>
                                <li>AI tries to find the "Submit" button</li>
                                <li>Your button is called "Complete Order"</li>
                                <li>AI can't find it → <strong>Test fails</strong></li>
                                <li>You get an error message</li>
                                <li>You have to rewrite the test</li>
                                <li>Run again from the beginning</li>
                            </ol>
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px', fontSize: '0.9rem', color: '#991b1b' }}>
                                <strong>Result:</strong> Wasted time. Frustrated developer. Brittle tests.
                            </div>
                        </div>

                        {/* Rihario */}
                        <div style={{ padding: '2rem', background: '#f0fdf4', borderRadius: '16px', border: '2px solid #86efac' }}>
                            <h3 style={{ color: '#166534', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                ✓ Rihario with God Mode
                            </h3>
                            <ol style={{ paddingLeft: '1.25rem', color: '#14532d', lineHeight: 1.8 }}>
                                <li>AI tries to find the "Submit" button</li>
                                <li>AI can't find it → <strong>Pauses and alerts you</strong></li>
                                <li>You open the live browser in your dashboard</li>
                                <li>You click "Complete Order"</li>
                                <li>AI learns and continues the test</li>
                                <li><strong>Test passes!</strong> AI remembers for next time</li>
                            </ol>
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#dcfce7', borderRadius: '8px', fontSize: '0.9rem', color: '#166534' }}>
                                <strong>Result:</strong> Test completed. AI learned. Future tests won't fail.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>How God Mode Works</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            It's like having a remote control for your tests
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {[
                            { step: '1', icon: '⏸️', title: 'AI Pauses', desc: 'When the AI can\'t find an element, it pauses instead of failing' },
                            { step: '2', icon: '🔔', title: 'You Get Alerted', desc: 'Instant notification via Slack, email, or dashboard' },
                            { step: '3', icon: '🎮', title: 'You Take Over', desc: 'Open the live browser and click the right element' },
                            { step: '4', icon: '🧠', title: 'AI Learns', desc: 'AI records what you did and continues automatically' }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <div style={{
                                    width: '32px', height: '32px', background: 'var(--primary)', color: '#fff',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem', fontWeight: 700
                                }}>
                                    {item.step}
                                </div>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Demo Visual */}
            <section style={{ padding: '5rem 0', background: '#0f172a' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem', color: '#fff' }}>See It In Action</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                            What God Mode looks like in your dashboard
                        </p>
                    </div>

                    {/* Browser Mockup */}
                    <div style={{
                        background: '#1e293b',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid #334155',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        {/* Browser toolbar */}
                        <div style={{
                            height: '48px', background: '#0f172a', borderBottom: '1px solid #334155',
                            display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px'
                        }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                            </div>
                            <div style={{
                                flex: 1, height: '28px', background: '#334155', borderRadius: '6px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#64748b', fontSize: '13px'
                            }}>
                                🔒 rihario.com/dashboard/test/live-session
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: '400px' }}>
                            {/* Live Browser */}
                            <div style={{ padding: '24px', borderRight: '1px solid #334155' }}>
                                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#fff', fontWeight: 600 }}>Live Browser</span>
                                    <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                                        ⏸️ Paused - Waiting for you
                                    </span>
                                </div>
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    height: '300px'
                                }}>
                                    {/* Fake webpage */}
                                    <div style={{ height: '40px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                                        <div style={{ width: '80px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }} />
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={{ height: '16px', width: '60%', background: '#f1f5f9', marginBottom: '12px' }} />
                                        <div style={{ height: '12px', width: '80%', background: '#f8fafc', marginBottom: '8px' }} />
                                        <div style={{ height: '12px', width: '70%', background: '#f8fafc', marginBottom: '24px' }} />

                                        {/* The button AI is looking for */}
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '14px 28px',
                                            background: 'var(--primary)',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            boxShadow: '0 0 0 4px rgba(185, 28, 28, 0.3), 0 0 20px rgba(185, 28, 28, 0.2)',
                                            cursor: 'pointer'
                                        }}>
                                            Complete Order →
                                        </div>
                                        <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
                                            ↑ Click this button to help AI continue
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Side Panel */}
                            <div style={{ padding: '24px', background: '#1e293b' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '12px' }}>Test Status</div>
                                    <div style={{
                                        padding: '12px',
                                        background: 'rgba(245, 158, 11, 0.1)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(245, 158, 11, 0.3)'
                                    }}>
                                        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>⏸️ Paused</div>
                                        <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                                            AI couldn't find: "Submit" button
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '12px' }}>AI Suggestion</div>
                                    <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                                        I found a button that says <strong style={{ color: '#fff' }}>"Complete Order"</strong>.
                                        Click it if this is the right element.
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '12px' }}>Progress</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '13px' }}>
                                            <span>✓</span> Navigate to checkout
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '13px' }}>
                                            <span>✓</span> Fill in shipping info
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '13px' }}>
                                            <span>→</span> Click submit button
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                                            <span>○</span> Verify confirmation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Why God Mode Changes Everything</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {[
                            {
                                icon: '🎯',
                                title: '95% Test Success Rate',
                                desc: 'Other tools average 60% because they fail on edge cases. God Mode helps you push through.'
                            },
                            {
                                icon: '🧠',
                                title: 'AI Gets Smarter',
                                desc: 'Every time you help, the AI learns. Same problem won\'t happen twice.'
                            },
                            {
                                icon: '⏱️',
                                title: 'No Restart Required',
                                desc: 'Test continues from exactly where it paused. No wasted time re-running steps.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Take Control?</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        God Mode is available on Indie and Pro plans. Start with our free trial.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Start Free Trial
                        </Link>
                        <Link href="/pricing" className="btn btn-secondary btn-large">
                            Compare Plans
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
