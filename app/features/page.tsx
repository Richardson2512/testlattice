import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { InteractiveBrowserStack } from '@/components/InteractiveBrowserStack'
import { Footer } from '@/components/Footer'

// SEO Metadata
export const metadata = {
    title: 'AI Testing Features | No-Code Functional, Visual & Security Testing',
    description: 'Discover 9 types of automated testing: functional, visual regression, performance, security, accessibility, SEO, console errors, API monitoring, and cross-browser. Works on 50+ browser/device combos. No code required.',
    keywords: ['AI testing features', 'no-code testing', 'visual regression testing', 'security testing', 'accessibility testing', 'cross-browser testing'],
}


// Reusable Components - Using semantic h2 as section intro label
const SectionLabel = ({ text, color = 'var(--primary)' }: { text: string, color?: string }) => (
    <span style={{ color, fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.85rem', display: 'block' }} aria-hidden="true">
        {text}
    </span>
)

// TL;DR block for GEO embedding chunking
const TldrBlock = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
        border: '1px solid #fcd34d',
        borderRadius: '8px',
        marginBottom: '2rem',
        fontSize: '1rem',
        lineHeight: 1.6
    }}>
        <strong style={{ color: '#92400e' }}>TL;DR:</strong> {children}
    </div>
)

const CheckItem = ({ text }: { text: string }) => (
    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1rem', lineHeight: 1.6 }}>
        <span style={{ color: 'var(--success)', fontSize: '1.25rem', flexShrink: 0 }}>✓</span>
        <span>{text}</span>
    </li>
)

// Testing type card component
const TestingTypeCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{description}</p>
    </div>
)

export default function FeaturesPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
            <LandingHeader />

            {/* Hero - Clear Value Prop */}
            <section style={{ paddingTop: '160px', paddingBottom: '20px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
                        Find Out If Your App <span className="text-gradient">Actually Works</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                        Paste your URL. Our AI explores your app like a real user. You see what's broken in minutes—not days. No test scripts. No setup headaches.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Try It Free
                        </Link>
                        <Link href="/pricing" className="btn btn-secondary btn-large">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            {/* TL;DR Summary for GEO */}
            <section style={{ padding: '2rem 0 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <TldrBlock>
                        Rihario is an AI testing platform that checks 9 things automatically: functional testing, visual bugs, performance, security, accessibility, SEO, console errors, API issues, and cross-browser compatibility. No coding required—just paste your URL.
                    </TldrBlock>
                </div>
            </section>

            {/* What We Check For You */}
            <section id="testing-types" style={{ padding: '3rem 0 5rem', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel text="COMPREHENSIVE TESTING" />
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>What is Rihario Testing? Everything We Check For You</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            One test run. Nine different checks. You get a complete picture of your app's health.
                        </p>
                    </div>

                    {/* Definition List for GEO/AEO - screen reader accessible */}
                    <dl className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
                        <dt>Functional Testing</dt>
                        <dd>Tests buttons, forms, and navigation to ensure everything works correctly in your web application.</dd>
                        <dt>Visual Regression Testing</dt>
                        <dd>Catches broken layouts, overlapping text, missing images and UI glitches across all browsers.</dd>
                        <dt>Performance Testing</dt>
                        <dd>Measures Core Web Vitals including LCP, FID, CLS and total page load time.</dd>
                        <dt>Security Testing</dt>
                        <dd>Tests for XSS, SQL injection, CSRF and other common web vulnerabilities before hackers find them.</dd>
                        <dt>Accessibility Testing</dt>
                        <dd>WCAG compliance checks ensure your app works for people using screen readers and assistive technology.</dd>
                        <dt>SEO Testing</dt>
                        <dd>Validates meta tags, heading structure, schema markup and other factors that affect Google rankings.</dd>
                        <dt>Console Error Detection</dt>
                        <dd>Finds JavaScript errors, 404 resources, and unhandled promise rejections you never noticed.</dd>
                        <dt>API Monitoring</dt>
                        <dd>Identifies slow or failing API calls that degrade user experience.</dd>
                        <dt>Cross-Browser Testing</dt>
                        <dd>Tests across Chrome, Safari, Firefox, and Edge on desktop.</dd>
                    </dl>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <TestingTypeCard
                            icon="🔘"
                            title="Does It Work?"
                            description="Buttons, forms, navigation—we click through your app to make sure everything functions."
                        />
                        <TestingTypeCard
                            icon="👁️"
                            title="Does It Look Right?"
                            description="Broken layouts, overlapping text, missing images—we catch visual bugs instantly."
                        />
                        <TestingTypeCard
                            icon="⚡"
                            title="Is It Fast Enough?"
                            description="We measure Core Web Vitals and load times. Slow sites lose users."
                        />
                        <TestingTypeCard
                            icon="🔒"
                            title="Is It Secure?"
                            description="We check for Security Best Practices, CSP headers, mixed content, and exposed secrets."
                        />
                        <TestingTypeCard
                            icon="♿"
                            title="Can Everyone Use It?"
                            description="Accessibility checks ensure your app works for people with disabilities."
                        />
                        <TestingTypeCard
                            icon="🔍"
                            title="Will Google Find It?"
                            description="SEO checks for meta tags, headings, and schema—so you rank higher."
                        />
                        <TestingTypeCard
                            icon="🚨"
                            title="Any Console Errors?"
                            description="JavaScript errors and 404s that you never noticed? We find them."
                        />
                        <TestingTypeCard
                            icon="📡"
                            title="API Issues?"
                            description="Slow or failing API calls tank your UX. We surface them immediately."
                        />
                        <TestingTypeCard
                            icon="🌐"
                            title="Works Everywhere?"
                            description="Chrome, Safari, Firefox, Edge—we test across all major desktop browsers."
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/features/testing-types" style={{
                            color: 'var(--primary)',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>
                            Learn more about each test type →
                        </Link>
                        <span style={{ margin: '0 1rem', color: 'var(--text-muted)' }}>|</span>
                        <Link href="/whitepaper" style={{
                            color: 'var(--primary)',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>
                            Read the technical architecture →
                        </Link>
                    </div>
                </div>
            </section>

            {/* God Mode - The Differentiator */}
            <section id="god-mode" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--primary)', boxShadow: '0 0 40px rgba(185, 28, 28, 0.1)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                            <div style={{ padding: '4rem' }}>
                                <SectionLabel text="EXCLUSIVE FEATURE" color="var(--primary)" />
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>When AI Gets Stuck, You Take Over</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem' }}>
                                    Other AI tools fail when they can't find a button. With <strong>God Mode</strong>, you see the live browser, click the right element, and the AI learns from you. Your test keeps running.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                    <CheckItem text="See the browser in real-time when AI pauses" />
                                    <CheckItem text="Click the right element yourself—AI watches and learns" />
                                    <CheckItem text="Your test continues automatically—no restart needed" />
                                    <CheckItem text="AI remembers for next time—same issue won't happen again" />
                                </ul>
                                <Link href="/features/god-mode" className="btn btn-primary">
                                    See God Mode in Action →
                                </Link>
                            </div>
                            <div style={{
                                height: '100%', minHeight: '500px', background: '#0f172a',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {/* God Mode Visual */}
                                <div style={{ width: '90%', maxWidth: '400px' }}>
                                    <div style={{
                                        background: '#1e293b',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: '1px solid #334155'
                                    }}>
                                        {/* Browser toolbar */}
                                        <div style={{
                                            height: '36px', background: '#0f172a', borderBottom: '1px solid #334155',
                                            display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px'
                                        }}>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                                            </div>
                                            <div style={{
                                                flex: 1, height: '22px', background: '#334155', borderRadius: '4px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#64748b', fontSize: '11px'
                                            }}>
                                                your-app.com/checkout
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div style={{ padding: '20px', background: '#fff' }}>
                                            <div style={{ height: '16px', width: '60%', background: '#e2e8f0', marginBottom: '12px' }} />
                                            <div style={{ height: '12px', width: '80%', background: '#f1f5f9', marginBottom: '8px' }} />
                                            <div style={{ height: '12px', width: '70%', background: '#f1f5f9', marginBottom: '20px' }} />
                                            <div style={{
                                                padding: '12px 24px',
                                                background: 'var(--primary)',
                                                color: '#fff',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                display: 'inline-block',
                                                boxShadow: '0 0 0 3px rgba(185, 28, 28, 0.3)'
                                            }}>
                                                Complete Order →
                                            </div>
                                        </div>
                                    </div>
                                    {/* Status badge */}
                                    <div style={{
                                        marginTop: '16px',
                                        padding: '12px 16px',
                                        background: '#fef3c7',
                                        border: '1px solid #f59e0b',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <span style={{ fontSize: '20px' }}>🎮</span>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '13px' }}>God Mode Active</div>
                                            <div style={{ fontSize: '12px', color: '#b45309' }}>Click the button to help AI continue</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Self-Healing - Explained Simply */}
            <section id="functional" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                            <div style={{ padding: '4rem' }}>
                                <SectionLabel text="AI THAT ADAPTS" />
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tests That Don't Break When You Update</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem' }}>
                                    Traditional tests break every time you change your UI. Our AI understands what a button <em>does</em>, not just its CSS class. Rename a button? Change its position? <strong>Your tests still work.</strong>
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <CheckItem text="AI finds elements by their purpose, not their code" />
                                    <CheckItem text="UI changes don't break your tests" />
                                    <CheckItem text="No more fixing flaky selectors every sprint" />
                                </ul>
                            </div>
                            <div style={{
                                height: '100%', minHeight: '400px', background: '#0f172a',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
                            }}>
                                <div style={{
                                    fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)',
                                    padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                                    width: '100%', maxWidth: '400px'
                                }}>
                                    <div style={{ color: '#ef4444', marginBottom: '12px' }}>
                                        ❌ Button #submit-btn not found
                                    </div>
                                    <div style={{ color: '#fbbf24', marginBottom: '12px' }}>
                                        🔍 AI analyzing page structure...
                                    </div>
                                    <div style={{ color: '#60a5fa', marginBottom: '12px' }}>
                                        💡 Found: "Place Order" button (99% match)
                                    </div>
                                    <div style={{ color: '#22c55e' }}>
                                        ✓ Test continues automatically
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reports - Plain English */}
            <section id="visual" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                            <div style={{
                                height: '100%', minHeight: '400px', background: '#f8fafc',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
                            }}>
                                {/* Report Mockup */}
                                <div style={{ width: '90%', maxWidth: '350px', background: '#fff', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Test Report</div>
                                        <div style={{ color: '#ef4444', background: '#fee2e2', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>3 Issues</div>
                                    </div>
                                    <div style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '10px', background: '#fef2f2', borderRadius: '6px' }}>
                                            <span>🚨</span>
                                            <span style={{ fontSize: '13px', color: '#991b1b' }}>Signup form fails on Safari</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '10px', background: '#fffbeb', borderRadius: '6px' }}>
                                            <span>⚠️</span>
                                            <span style={{ fontSize: '13px', color: '#92400e' }}>Page loads in 4.2s (too slow)</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f0fdf4', borderRadius: '6px' }}>
                                            <span>✓</span>
                                            <span style={{ fontSize: '13px', color: '#166534' }}>Login flow works on all browsers</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>📹 Video replay available</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '4rem' }}>
                                <SectionLabel text="CLEAR REPORTS" />
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>See Exactly Why Something Failed</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem' }}>
                                    No cryptic error messages. We show you exactly what went wrong, in plain English, with a video replay of the failure. Fix bugs faster.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <CheckItem text="Video replay of every test—see what the AI saw" />
                                    <CheckItem text="Issues explained in plain English, not error codes" />
                                    <CheckItem text="Screenshots at the exact moment of failure" />
                                    <CheckItem text="Track which tests are flaky over time" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-Platform */}
            <section id="browsers" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel text="CROSS-BROWSER" />
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Works on Every Browser and Device</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            You only test on Chrome. Your users are on Safari, Firefox, and mobile. We test everywhere so you don't have to.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        {/* Desktop Browsers */}
                        <div className="glass-panel" style={{ padding: '3rem' }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>Desktop Browsers</h3>
                            <InteractiveBrowserStack />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Ship With Confidence?</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem' }}>
                        Stop guessing. Start knowing. Get your first test results in 3 minutes.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Start Testing Free
                        </Link>
                        <Link href="/pricing" className="btn btn-secondary btn-large">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
