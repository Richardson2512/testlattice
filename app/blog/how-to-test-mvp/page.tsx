import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'How to Test Your MVP Before Launch: Complete Guide for Founders',
    description: 'Learn how to test your MVP before launch. Step-by-step guide covering functional testing, user testing, performance, and security. No coding required.',
    keywords: ['how to test MVP', 'MVP testing', 'test before launch', 'startup testing', 'validate MVP'],
}

export default function HowToTestMvpPage() {
    return (
        <>
            <Script id="howto-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": "How to Test Your MVP Before Launch",
                    "description": "Complete guide to testing your MVP",
                    "datePublished": "2024-10-05",
                    "step": [
                        { "@type": "HowToStep", "name": "Set up basic monitoring", "text": "Add error tracking and analytics before testing" },
                        { "@type": "HowToStep", "name": "Test core functionality", "text": "Verify all critical user flows work correctly" },
                        { "@type": "HowToStep", "name": "Check on different devices", "text": "Test on mobile, tablet, and desktop browsers" },
                        { "@type": "HowToStep", "name": "Run performance tests", "text": "Measure load times and Core Web Vitals" },
                        { "@type": "HowToStep", "name": "Security check", "text": "Scan for common vulnerabilities" },
                        { "@type": "HowToStep", "name": "Get real user feedback", "text": "Have 5-10 people try your MVP" }
                    ]
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
                            <span style={{ color: 'var(--text-primary)' }}>How to Test Your MVP</span>
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
                                Guide
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                How to Test Your MVP Before Launch: Complete Guide
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                You've built your MVP. Now make sure it actually works before real users try it.
                            </p>
                            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                Updated October 2024 • 10 min read
                            </div>
                        </header>

                        {/* TL;DR */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
                            border: '1px solid #fcd34d',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}>
                            <strong style={{ color: '#92400e' }}>TL;DR:</strong> Before launching your MVP, test these 6 things: core functionality, cross-browser compatibility, performance, security, accessibility, and real user feedback. You can automate most of this with AI testing tools like Rihario in under an hour.
                        </div>

                        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>
                                Why Test Your MVP?
                            </h2>
                            <p>
                                Your MVP is your first impression. If the signup form breaks, the checkout fails, or the site is painfully slow, users won't give you a second chance. Testing catches these issues <strong>before</strong> your real users do.
                            </p>
                            <p>
                                The good news: you don't need a QA team or weeks of manual testing. Modern AI tools can automate most of this.
                            </p>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                The 6-Step MVP Testing Checklist
                            </h2>

                            {/* Steps */}
                            {[
                                {
                                    step: 1,
                                    title: 'Set Up Basic Monitoring First',
                                    content: 'Before testing, add error tracking (Sentry, LogRocket) and analytics (Plausible, PostHog). This way, when real users arrive, you\'ll catch issues automatically.',
                                    time: '15 minutes'
                                },
                                {
                                    step: 2,
                                    title: 'Test Your Core User Flows',
                                    content: 'Identify the 3-5 most critical paths: signup, login, main feature usage, payment (if applicable). Test each one end-to-end. With Rihario, describe the flow in plain English and let AI run it.',
                                    time: '30 minutes'
                                },
                                {
                                    step: 3,
                                    title: 'Check Cross-Browser Compatibility',
                                    content: 'Your MVP needs to work on Chrome, Safari, Firefox, and mobile browsers. At minimum, test Chrome desktop and iOS Safari. AI testing tools can run all browsers simultaneously.',
                                    time: '15 minutes with automation'
                                },
                                {
                                    step: 4,
                                    title: 'Run Performance Tests',
                                    content: 'Use Lighthouse or Rihario\'s built-in performance testing. Check Core Web Vitals: LCP (loading), FID (interactivity), CLS (stability). Aim for LCP under 2.5 seconds.',
                                    time: '10 minutes'
                                },
                                {
                                    step: 5,
                                    title: 'Do a Basic Security Scan',
                                    content: 'Check for obvious vulnerabilities: XSS, SQL injection, exposed API keys. AI testing tools include basic security scanning. For sensitive MVPs, consider a proper security audit.',
                                    time: '15 minutes'
                                },
                                {
                                    step: 6,
                                    title: 'Get Real User Feedback',
                                    content: 'Have 5-10 real people (not friends who\'ll be nice) try your MVP. Watch them use it. Where do they get confused? What breaks? This catches issues automated tests miss.',
                                    time: '1-2 hours'
                                }
                            ].map(item => (
                                <div key={item.step} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1.5rem',
                                    background: 'var(--bg-card)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-light)',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'var(--primary)',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '1.25rem',
                                        flexShrink: 0
                                    }}>
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
                                        <p style={{ margin: '0 0 0.5rem' }}>{item.content}</p>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>⏱️ {item.time}</span>
                                    </div>
                                </div>
                            ))}

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                The Fastest Way: AI Testing
                            </h2>
                            <p>
                                You can do steps 2-5 automatically with <Link href="/" style={{ color: 'var(--primary)' }}>Rihario</Link>:
                            </p>
                            <ol style={{ paddingLeft: '1.5rem' }}>
                                <li>Paste your MVP URL</li>
                                <li>Describe what to test: "Test signup, login, and the main dashboard"</li>
                                <li>Select browsers (Chrome, Safari, mobile)</li>
                                <li>Click run—results in 3 minutes</li>
                            </ol>
                            <p>
                                You get functional testing, performance scores, security checks, and accessibility results in one report.
                            </p>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Common MVP Issues to Watch For
                            </h2>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>Broken forms</strong> – Validation errors, submit buttons not working</li>
                                <li><strong>Mobile layout issues</strong> – Buttons too small, text overflow, horizontal scroll</li>
                                <li><strong>Slow loading</strong> – Large images, too many JavaScript bundles</li>
                                <li><strong>Payment failures</strong> – Stripe/payment integration bugs</li>
                                <li><strong>Email not sending</strong> – Verification, password reset, notifications</li>
                                <li><strong>Auth bugs</strong> – Login sessions, OAuth flows, logout issues</li>
                            </ul>

                            <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>
                                Launch Confidently
                            </h2>
                            <p>
                                Testing your MVP doesn't have to take days. With AI tools, you can catch 90% of issues in under an hour. The remaining 10% comes from real user feedback after launch.
                            </p>
                            <p>
                                Ready to test? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Try Rihario free</Link> and test your MVP before you launch.
                            </p>
                        </div>
                    </div>
                </article>

                <Footer />
            </main>
        </>
    )
}
