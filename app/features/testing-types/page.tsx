import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: '9 Tests in One Click | Rihario Testing Types',
    description: 'Rihario runs 9 different test types automatically: Functional, Visual, Performance, Security, Accessibility, SEO, Console Errors, Network, and Cross-Browser testing.',
    alternates: {
        canonical: 'https://rihario.com/features/testing-types',
    },
}

// Test type section component
const TestTypeSection = ({
    id,
    icon,
    title,
    subtitle,
    description,
    checks,
    example,
    isReversed = false
}: {
    id: string
    icon: string
    title: string
    subtitle: string
    description: string
    checks: string[]
    example: { question: string, answer: string }
    isReversed?: boolean
}) => (
    <section id={id} style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                direction: isReversed ? 'rtl' : 'ltr'
            }}>
                <div style={{ direction: 'ltr' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
                    <div style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.5rem'
                    }}>
                        {subtitle}
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem'
                    }}>
                        {description}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {checks.map((check, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                gap: '0.75rem',
                                alignItems: 'flex-start',
                                fontSize: '1rem',
                                color: 'var(--text-primary)'
                            }}>
                                <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
                                <span>{check}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ direction: 'ltr' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Example Check
                        </div>
                        <div style={{
                            padding: '1rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                ❓ {example.question}
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            background: '#f0fdf4',
                            borderRadius: '8px',
                            border: '1px solid #86efac'
                        }}>
                            <div style={{ fontWeight: 600, color: '#166534', marginBottom: '0.5rem' }}>
                                ✓ Rihario checks:
                            </div>
                            <div style={{ color: '#14532d', fontSize: '0.95rem' }}>
                                {example.answer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default function TestingTypesPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
            <LandingHeader />

            {/* Hero */}
            <section style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
                        9 Tests. <span className="text-gradient">One Click.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                        Every time you run a test, we automatically check 9 different things. No setup required. Here's exactly what we look for.
                    </p>
                </div>
            </section>

            {/* Quick Nav */}
            <section style={{ padding: '0 0 3rem', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        justifyContent: 'center'
                    }}>
                        {[
                            { id: 'functional', label: '🔘 Functional' },
                            { id: 'visual', label: '👁️ Visual' },
                            { id: 'performance', label: '⚡ Performance' },
                            { id: 'security', label: '🔒 Security' },
                            { id: 'accessibility', label: '♿ Accessibility' },
                            { id: 'seo', label: '🔍 SEO' },
                            { id: 'console', label: '🚨 Console Errors' },
                            { id: 'network', label: '📡 Network' },
                            { id: 'cross-browser', label: '🌐 Cross-Browser' }
                        ].map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Test Types */}
            <TestTypeSection
                id="functional"
                icon="🔘"
                title="Does Everything Actually Work?"
                subtitle="Functional Testing"
                description="We click every button, fill every form, and navigate every link—just like a real user would. If something doesn't work, we catch it before your users do."
                checks={[
                    "Form submissions and validation",
                    "Button clicks and navigation",
                    "Login and signup flows",
                    "Shopping cart and checkout",
                    "Search functionality"
                ]}
                example={{
                    question: "Does the signup form actually create an account?",
                    answer: "We fill out the form, submit it, verify the success message appears, and confirm the user can log in."
                }}
            />

            <TestTypeSection
                id="visual"
                icon="👁️"
                title="Does It Look Right Everywhere?"
                subtitle="Visual Regression"
                description="A button that looks fine on Chrome might be invisible on Safari. We take screenshots across browsers and catch layout bugs, broken images, and UI glitches."
                checks={[
                    "Layout shifts and broken grids",
                    "Missing or broken images",
                    "Text overflow and truncation",
                    "Z-index issues (elements hiding each other)",
                    "Responsive design breakpoints"
                ]}
                example={{
                    question: "Is my hero section cut off on mobile?",
                    answer: "We render your page at 375px width and compare it to desktop. Any layout breaks get flagged."
                }}
                isReversed
            />

            <TestTypeSection
                id="performance"
                icon="⚡"
                title="Is Your Site Fast Enough?"
                subtitle="Performance Testing"
                description="Slow sites lose users. We measure Core Web Vitals (the metrics Google uses for ranking) and tell you exactly what's slowing you down."
                checks={[
                    "Largest Contentful Paint (LCP)",
                    "First Input Delay (FID)",
                    "Cumulative Layout Shift (CLS)",
                    "Time to First Byte (TTFB)",
                    "Total page load time"
                ]}
                example={{
                    question: "Why is my site taking 5 seconds to load?",
                    answer: "We trace the waterfall and identify that your hero image is 4MB. Compress it, and you'll drop to 1.5s."
                }}
            />

            <TestTypeSection
                id="security"
                icon="🔒"
                title="Can Hackers Break In?"
                subtitle="Security Testing"
                description="We test for common vulnerabilities that hackers exploit. XSS, SQL injection, CSRF—if there's a hole, we find it before someone malicious does."
                checks={[
                    "Cross-Site Scripting (XSS) vulnerabilities",
                    "SQL Injection attempts",
                    "CSRF token validation",
                    "Insecure form handling",
                    "Exposed sensitive data"
                ]}
                example={{
                    question: "What if someone types <script>alert('hack')</script> in my form?",
                    answer: "We inject test payloads and verify they're sanitized. If your site executes the script, we flag it as critical."
                }}
                isReversed
            />

            <TestTypeSection
                id="accessibility"
                icon="♿"
                title="Can Everyone Use Your Site?"
                subtitle="Accessibility Testing"
                description="15% of people have some form of disability. We check if your site works with screen readers, keyboard navigation, and meets WCAG guidelines."
                checks={[
                    "Alt text on all images",
                    "Keyboard navigation works",
                    "Color contrast ratios",
                    "Form labels and ARIA attributes",
                    "Focus indicators visible"
                ]}
                example={{
                    question: "Can a blind user navigate my checkout?",
                    answer: "We simulate screen reader usage and verify all form fields are properly labeled and the flow is logical."
                }}
            />

            <TestTypeSection
                id="seo"
                icon="🔍"
                title="Will Google Find You?"
                subtitle="SEO Testing"
                description="If Google can't understand your pages, you won't rank. We check meta tags, heading structure, schema markup, and all the technical SEO basics."
                checks={[
                    "Title tags and meta descriptions",
                    "Proper heading hierarchy (H1, H2, H3)",
                    "Schema.org structured data",
                    "Canonical URLs",
                    "Mobile-friendliness"
                ]}
                example={{
                    question: "Why isn't my blog post ranking?",
                    answer: "We found your page has no H1, a duplicate title tag, and is missing meta description. Fix these for better rankings."
                }}
                isReversed
            />

            <TestTypeSection
                id="console"
                icon="🚨"
                title="Any Hidden Errors?"
                subtitle="Console Error Detection"
                description="JavaScript errors happen silently. Your users see a broken experience, but you never know. We capture every console error so you can fix them."
                checks={[
                    "JavaScript runtime errors",
                    "Failed resource loads (404s)",
                    "Deprecation warnings",
                    "CORS errors",
                    "Unhandled promise rejections"
                ]}
                example={{
                    question: "Why does my dropdown menu sometimes not work?",
                    answer: "We caught 'TypeError: Cannot read property click of undefined'. Your event listener is attached before the DOM loads."
                }}
            />

            <TestTypeSection
                id="network"
                icon="📡"
                title="Are Your APIs Healthy?"
                subtitle="Network Testing"
                description="Slow or failing API calls destroy user experience. We monitor every network request, measure response times, and flag anything that looks wrong."
                checks={[
                    "API response times",
                    "Failed requests (4xx/5xx errors)",
                    "Slow endpoints (> 1s)",
                    "Payload size optimization",
                    "Request/response validation"
                ]}
                example={{
                    question: "Why does my product page load so slowly?",
                    answer: "Your /api/products endpoint takes 3.2 seconds and returns 8MB of data. Consider pagination and caching."
                }}
                isReversed
            />

            <TestTypeSection
                id="cross-browser"
                icon="🌐"
                title="Works on Every Browser?"
                subtitle="Cross-Browser Testing"
                description="You test on Chrome. Your users are on Safari, Firefox, Edge, and mobile. We run your tests across 50+ browser/device combinations."
                checks={[
                    "Chrome, Firefox, Safari, Edge",
                    "Headless and GUI modes",
                    "Desktop viewports",
                    "Different screen resolutions",
                    "OS compatibility"
                ]}
                example={{
                    question: "Does my site work on Safari?",
                    answer: "We test on Safari (macOS). Your flexbox gap property is fully supported."
                }}
            />

            {/* CTA */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>All 9 Tests. Every Single Run.</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        No extra setup. No separate tools. Just paste your URL and get comprehensive results.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Start Testing Free
                        </Link>
                        <Link href="/features" className="btn btn-secondary btn-large">
                            Back to Features
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
