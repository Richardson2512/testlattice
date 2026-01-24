import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Top 10 Best Software Testing Tools for Indie Hackers [2025]',
    description: 'The best software testing tools for solo developers and indie hackers. Compare Rihario, Playwright, Cypress, and more. Features, pricing, and which to choose.',
    keywords: ['software testing tools', 'testing tools for indie hackers', 'best testing tools 2024', 'automated testing tools', 'QA tools for startups'],
}

const tools = [
    {
        rank: 1,
        name: 'Rihario',
        type: 'AI-Powered',
        description: 'No-code AI testing built for indie hackers. Describe tests in plain English, get results in minutes.',
        bestFor: 'Solo devs who don\'t want to write test code',
        pricing: '$19-99/month',
        codeRequired: false
    },
    {
        rank: 2,
        name: 'Playwright',
        type: 'Open Source',
        description: 'Microsoft\'s modern E2E testing framework. Fast, reliable, great dev experience.',
        bestFor: 'Developers comfortable with JavaScript/TypeScript',
        pricing: 'Free (self-hosted)',
        codeRequired: true
    },
    {
        rank: 3,
        name: 'Cypress',
        type: 'Open Source + Paid',
        description: 'Popular JavaScript testing framework with great debugging and time-travel.',
        bestFor: 'Frontend-focused teams, React/Vue projects',
        pricing: 'Free + paid cloud ($75+/mo)',
        codeRequired: true
    },
    {
        rank: 4,
        name: 'BrowserStack',
        type: 'Cloud Testing',
        description: 'Real device and browser cloud. Run your tests on thousands of device combinations.',
        bestFor: 'Cross-browser testing at scale',
        pricing: 'From $29/month',
        codeRequired: true
    },
    {
        rank: 5,
        name: 'Selenium',
        type: 'Open Source',
        description: 'The original browser automation tool. Huge ecosystem but requires more setup.',
        bestFor: 'Teams with existing Selenium expertise',
        pricing: 'Free',
        codeRequired: true
    },
    {
        rank: 6,
        name: 'Postman',
        type: 'API Testing',
        description: 'Industry standard for API testing and documentation.',
        bestFor: 'API-first development, backend testing',
        pricing: 'Free + paid teams ($14+/mo)',
        codeRequired: false
    },
    {
        rank: 7,
        name: 'Jest',
        type: 'Unit Testing',
        description: 'Facebook\'s JavaScript testing framework. Fast, great for unit tests.',
        bestFor: 'Unit testing JavaScript/TypeScript code',
        pricing: 'Free',
        codeRequired: true
    },
    {
        rank: 8,
        name: 'Lighthouse',
        type: 'Performance',
        description: 'Google\'s tool for performance, accessibility, and SEO audits.',
        bestFor: 'Performance optimization, Core Web Vitals',
        pricing: 'Free',
        codeRequired: false
    },
    {
        rank: 9,
        name: 'Sentry',
        type: 'Error Monitoring',
        description: 'Real-time error tracking and performance monitoring.',
        bestFor: 'Catching errors in production',
        pricing: 'Free + paid ($26+/mo)',
        codeRequired: false
    },
    {
        rank: 10,
        name: 'Chromatic',
        type: 'Visual Testing',
        description: 'Visual regression testing for Storybook components.',
        bestFor: 'Component libraries, design systems',
        pricing: 'Free + paid ($149+/mo)',
        codeRequired: true
    }
]

export default function TopSoftwareTestingToolsPage() {
    return (
        <>
            <Script id="article-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Top 10 Best Software Testing Tools for Indie Hackers",
                    "author": { "@type": "Organization", "name": "Rihario" },
                    "datePublished": "2026-02-14"
                })}
            </Script>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <LandingHeader />

                <article style={{ paddingTop: '160px', paddingBottom: '5rem' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>

                        <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                            <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                            <span style={{ color: 'var(--text-primary)' }}>Top 10 Software Testing Tools</span>
                        </nav>

                        <header style={{ marginBottom: '3rem' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                marginBottom: '1rem'
                            }}>
                                Comparison
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                Top 10 Best Software Testing Tools for Indie Hackers (2026)
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                From AI-powered no-code tools to open-source frameworks—find the right testing stack for your solo project.
                            </p>
                        </header>

                        {/* TL;DR */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
                            border: '1px solid #fcd34d',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}>
                            <strong style={{ color: '#92400e' }}>TL;DR:</strong> For indie hackers, start with <strong>Rihario</strong> for E2E testing (no code), <strong>Postman</strong> for APIs, and <strong>Sentry</strong> for error monitoring. Add <strong>Playwright</strong> later if you need custom test scripts.
                        </div>

                        {/* Quick Comparison */}
                        <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>#</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tool</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Pricing</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>No-Code?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tools.map((tool) => (
                                        <tr key={tool.rank} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{tool.rank}</td>
                                            <td style={{ padding: '0.75rem', fontWeight: 600 }}>{tool.name}</td>
                                            <td style={{ padding: '0.75rem' }}>{tool.type}</td>
                                            <td style={{ padding: '0.75rem' }}>{tool.pricing}</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>{tool.codeRequired ? '❌' : '✅'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tool Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {tools.map((tool) => (
                                <div key={tool.rank} className="glass-panel" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{
                                                    background: tool.rank === 1 ? 'var(--primary)' : 'var(--bg-tertiary)',
                                                    color: tool.rank === 1 ? '#fff' : 'var(--text-muted)',
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    #{tool.rank}
                                                </span>
                                                <span style={{
                                                    background: 'var(--bg-tertiary)',
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--text-muted)'
                                                }}>
                                                    {tool.type}
                                                </span>
                                            </div>
                                            <h3 style={{ margin: '0 0 0.5rem' }}>{tool.name}</h3>
                                            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>{tool.description}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span><strong>Best for:</strong> {tool.bestFor}</span>
                                        <span><strong>Pricing:</strong> {tool.pricing}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recommendation */}
                        <section style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <h2 style={{ marginBottom: '1rem' }}>The Indie Hacker Testing Stack</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                If you're building solo, here's my recommended stack:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li><strong>E2E Testing:</strong> <Link href="/" style={{ color: 'var(--primary)' }}>Rihario</Link> – No code, just describe what to test</li>
                                <li><strong>API Testing:</strong> Postman – Free tier is enough for most projects</li>
                                <li><strong>Error Monitoring:</strong> Sentry – Catch bugs in production</li>
                                <li><strong>Performance:</strong> Lighthouse – Built into Chrome, free</li>
                            </ul>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                                This stack gives you comprehensive coverage without writing test code or managing infrastructure.
                            </p>
                        </section>
                    </div>
                </article>

                <Footer />
            </main>
        </>
    )
}
