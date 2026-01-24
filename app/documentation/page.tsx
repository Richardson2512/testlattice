
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
    title: 'Technical Documentation | Rihario',
    description: 'Deep dive into Rihario\'s Behavior Analysis Engine, Semantic Selectors, and API Reference.',
}

export default function DocumentationPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Technical Documentation</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <h3 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Contents</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#behavior-analysis" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Behavior Analysis Engine</a></li>
                            <li><a href="#semantic-selectors" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Semantic Understanding</a></li>
                            <li><a href="#api-reference" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>API Reference</a></li>
                            <li><a href="#comparison" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Comparison</a></li>
                        </ul>
                    </div>

                    <div>
                        <section id="behavior-analysis" style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Behavior Analysis Engine</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Rihario's Behavior Analysis Engine (BAE) is not script-based. Instead, it uses a Large Language Model (LLM) fine-tuned on QA methodologies to "reason" about the state of the application.
                            </p>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Safety & Compliance Identification</h3>
                            <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                The engine continuously monitors network traffic and DOM mutations. It flags "Safety Issues" (e.g., exposing API keys in the client) and "Compliance Violations" (e.g., non-encrypted PII transmission) by comparing observations against a real-time rule set.
                            </p>
                        </section>

                        <section id="semantic-selectors" style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Semantic Understanding vs. CSS Selectors</h2>
                            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-light)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                            <th style={{ textAlign: 'left', padding: '1rem', width: '40%' }}>CSS Selectors (Traditional)</th>
                                            <th style={{ textAlign: 'left', padding: '1rem' }}>Semantic Understanding (Rihario)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'monospace', color: 'var(--error)' }}>
                                                button.btn-primary.submit-v2
                                            </td>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', color: 'var(--success)' }}>
                                                "The primary button labeled 'Submit' or 'Sign Up'"
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                Breaks when class names change (e.g., Tailwind updates).
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
                                                Resilient to markup changes. Hooks into the Accessibility Tree and visual context.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section id="api-reference" style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>API Reference</h2>
                            <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                                Rihario provides a REST API for triggering tests from your CI/CD pipeline.
                            </p>
                            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', color: '#fff', marginTop: '1rem' }}>
                                <code style={{ fontFamily: 'monospace' }}>
                                    POST https://api.rihario.com/v1/runs/trigger<br />
                                    Authorization: Bearer &lt;YOUR_API_KEY&gt;<br /><br />
                                    &#123;<br />
                                    &nbsp;&nbsp;"url": "https://staging.yourapp.com",<br />
                                    &nbsp;&nbsp;"depth": 3<br />
                                    &#125;
                                </code>
                            </div>
                        </section>

                        <section id="comparison">
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Feature Comparison</h2>
                            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: 'var(--bg-tertiary)' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Feature</th>
                                            <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--primary)' }}>Rihario</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Cypress</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Playwright</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Selenium</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ['No-Code Authoring', '✅', '❌', '❌', '❌'],
                                            ['Self-Healing Selectors', '✅', '⚠️ (Plugin)', '⚠️ (Plugin)', '❌'],
                                            ['Visual Regression', '✅', '⚠️ (Plugin)', '✅', '⚠️ (Plugin)'],
                                            ['Rage Bait Detection', '✅', '❌', '❌', '❌'],
                                            ['Test Maintenance', 'Zero', 'High', 'Medium', 'High']
                                        ].map((row, i) => (
                                            <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>{row[0]}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', fontWeight: 700 }}>{row[1]}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>{row[2]}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>{row[3]}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>{row[4]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
