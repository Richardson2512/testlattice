import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Rihario vs Playwright: Which AI Testing Tool is Better for Indie Hackers?',
    description: 'Detailed comparison of Rihario vs Playwright. Rihario requires zero coding while Playwright needs JavaScript. See features, pricing, and use cases compared side-by-side.',
    keywords: ['Rihario vs Playwright', 'Playwright alternative', 'no-code testing vs Playwright', 'AI testing comparison', 'Playwright for indie hackers'],
}

export default function PlaywrightComparisonPage() {
    return (
        <>
            {/* Comparison Schema for AEO */}
            <Script id="comparison-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Rihario vs Playwright: Complete Comparison for 2024",
                    "description": "Detailed comparison of Rihario and Playwright testing tools",
                    "author": {
                        "@type": "Organization",
                        "name": "Rihario"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Rihario"
                    }
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                {/* Hero */}
                <section style={{ paddingTop: '160px', paddingBottom: '40px', textAlign: 'center' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.35rem 1rem',
                            background: 'rgba(153, 27, 27, 0.08)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--maroon-800)' }}>
                                Comparison
                            </span>
                        </div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Rihario vs Playwright: <span className="text-gradient">Which Should You Choose?</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <strong>Quick answer:</strong> Use Playwright if you have developers who can write and maintain test scripts. Use Rihario if you want AI to handle everything without code.
                        </p>
                    </div>
                </section>

                {/* Quick Comparison Table */}
                <section style={{ padding: '3rem 0' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Quick Comparison</h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                background: 'var(--bg-card)',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden'
                            }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Feature</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--primary)' }}>Rihario</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Playwright</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Coding Required', rihario: '❌ No code', playwright: '✅ JavaScript/TypeScript' },
                                        { feature: 'Setup Time', rihario: '3 minutes', playwright: '30+ minutes' },
                                        { feature: 'Test Maintenance', rihario: 'AI handles it', playwright: 'Manual updates' },
                                        { feature: 'Self-Healing', rihario: '✅ Yes', playwright: '❌ No' },
                                        { feature: 'God Mode Intervention', rihario: '✅ Yes', playwright: '❌ No' },
                                        { feature: 'Cross-Browser Testing', rihario: '✅ 50+ combinations', playwright: '✅ 3 browsers' },
                                        { feature: 'Visual Testing', rihario: '✅ Built-in', playwright: '⚠️ Plugin required' },
                                        { feature: 'Security Testing', rihario: '✅ Built-in', playwright: '❌ No' },
                                        { feature: 'Accessibility Testing', rihario: '✅ Built-in', playwright: '⚠️ Plugin required' },
                                        { feature: 'Price', rihario: '$19-99/month', playwright: 'Free (self-hosted)' },
                                        { feature: 'Best For', rihario: 'Indie Hackers, Solo Devs', playwright: 'Dev Teams, Engineers' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 500 }}>{row.feature}</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', background: 'rgba(153, 27, 27, 0.03)' }}>{row.rihario}</td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>{row.playwright}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* When to Use Each */}
                <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>When Should You Use Each?</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Rihario */}
                            <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #fff 100%)', border: '2px solid #86efac' }}>
                                <h3 style={{ color: '#166534', marginBottom: '1rem' }}>✅ Choose Rihario If:</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        "You're a solo developer or indie hacker",
                                        "You don't want to write or maintain test code",
                                        "You built your app with no-code tools or AI",
                                        "You need testing results in minutes, not hours",
                                        "You want security and accessibility testing included",
                                        "You need God Mode for when AI gets stuck"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.5rem', color: '#14532d' }}>
                                            <span>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Playwright */}
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Choose Playwright If:</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    {[
                                        "You have developers who can write JavaScript",
                                        "You need complete control over every test step",
                                        "You're integrating with existing CI/CD pipelines",
                                        "Budget is the primary concern (it's free)",
                                        "You need to test complex, custom interactions",
                                        "Your team can maintain test code long-term"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                                            <span>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Code Comparison */}
                <section style={{ padding: '4rem 0' }}>
                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>The Difference in Practice</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                            Here's how testing the same login flow looks in each tool:
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Playwright Code */}
                            <div>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Playwright (Code Required)</h4>
                                <div style={{
                                    background: '#1e293b',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    overflow: 'auto'
                                }}>
                                    <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                        {`test('user can login', async ({ page }) => {
  await page.goto('/login');
  
  // Find email input
  await page.fill('#email', 'test@example.com');
  
  // Find password input  
  await page.fill('#password', 'password123');
  
  // Click login button
  await page.click('#submit-btn');
  
  // Assert redirect
  await expect(page).toHaveURL('/dashboard');
});`}
                                    </pre>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    ⚠️ If any selector changes, the test breaks and requires manual fixing.
                                </p>
                            </div>

                            {/* Rihario */}
                            <div>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Rihario (No Code)</h4>
                                <div style={{
                                    background: '#f0fdf4',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    border: '1px solid #86efac'
                                }}>
                                    <p style={{ margin: 0, color: '#166534', fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8 }}>
                                        "Test the login flow: enter email test@example.com and password password123, then verify the user lands on the dashboard."
                                    </p>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#166534' }}>
                                    ✅ AI finds elements by purpose. If selectors change, tests self-heal automatically.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                {
                                    q: "Can Rihario replace Playwright completely?",
                                    a: "For most indie hackers and solo developers, yes. Rihario covers functional, visual, performance, security, and accessibility testing without code. However, if you need extremely custom test logic or are already invested in Playwright, it may complement rather than replace."
                                },
                                {
                                    q: "Is Playwright really free?",
                                    a: "The library is free, but you pay in developer time. Writing and maintaining tests takes significant effort. You also need infrastructure to run tests (CI minutes, servers). Rihario's pricing includes all infrastructure."
                                },
                                {
                                    q: "Can I migrate from Playwright to Rihario?",
                                    a: "Yes. Since Rihario uses plain English test descriptions, you can start fresh without migrating code. Most users run both in parallel during transition, then phase out Playwright as Rihario covers more."
                                },
                                {
                                    q: "Which is faster for getting started?",
                                    a: "Rihario: 3 minutes to first test. Playwright: 30+ minutes for setup, then hours writing your first complete test suite."
                                }
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h3>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '5rem 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Try the No-Code Alternative?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            See how Rihario compares in your own project. Free trial, no credit card required.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link href="/signup" className="btn btn-primary btn-large">
                                Try Rihario Free
                            </Link>
                            <Link href="/pricing" className="btn btn-secondary btn-large">
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
