import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '7 Types of AI Frontend Testing | Rihario',
    description: 'A complete catalog of Rihario\'s autonomous testing capabilities: Visual, Login, Signup, Navigation, Form, Accessibility, and Rage Bait Testing.',
    openGraph: {
        title: '7 Types of AI Frontend Testing | Rihario',
        description: 'Autonomous agents performing Visual, Functional, and Behavioral testing.',
        url: 'https://rihario.com/test-types',
    },
}

export default function TestTypesPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Rihario Test Types
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem', lineHeight: 1.6 }}>
                    Rihario uses autonomous AI agents to perform 7 distinct types of frontend testing. Unlike traditional scripts, these tests are behavior-driven and self-healing.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    {/* Visual Test */}
                    <section id="visual-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            1. Visual Regression Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Ensure the UI looks identical across deployments and detects unintended layout shifts.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Captures full-page snapshots of the target URL.</li>
                                    <li>Compares pixel-by-pixel against the verified baseline.</li>
                                    <li>Intelligently ignores dynamic content (ads, dates) if configured.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Side-by-side diff images, slider view, list of changed elements.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Most tools require manual baseline management. Rihario automatically updates baselines on "green" deployments.</p>
                            </div>
                        </div>
                    </section>

                    {/* Login Flow Test */}
                    <section id="login-flow-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            2. Login Flow Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Verify that users can authenticate successfully using email, OAuth, or magic links.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Locates the login entry point (button/link).</li>
                                    <li>Inputs secure credentials from the project vault.</li>
                                    <li>Handles MFA/TOTP if required.</li>
                                    <li>Verifies successful redirect to the dashboard.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Video replay, network logs of auth requests, success screenshot.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Self-heals if input IDs change (e.g., #email vs #user_email). No hardcoded selectors.</p>
                            </div>
                        </div>
                    </section>

                    {/* Signup Flow Test */}
                    <section id="signup-flow-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            3. Signup Flow Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Verify new user registration and onboarding friction.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Generates a unique, disposal email alias.</li>
                                    <li>Completes the registration form with realistic persona data.</li>
                                    <li>Verifies welcome email delivery (optional).</li>
                                    <li>Checks for successful database entry creation.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>New user credentials, onboarding flow video, error logs if blocked.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Uses unique, realistic personas each time to prevent database clutter and simulate real users.</p>
                            </div>
                        </div>
                    </section>

                    {/* Navigation Test */}
                    <section id="navigation-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            4. Navigation Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Validate that all major routes are accessible and free of 404s.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Spiders the sitemap and visible links.</li>
                                    <li>Clicks through navigation menus (header, footer, sidebar).</li>
                                    <li>Checks for broken links and slow-loading pages.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Link health report, response time heatmap, list of broken URLs.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Actually clicks elements rather than just pinging URLs, properly triggering client-side routing.</p>
                            </div>
                        </div>
                    </section>

                    {/* Form Test */}
                    <section id="form-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            5. Form Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Verify validation logic and successful submission of inputs.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Identifies required and optional fields.</li>
                                    <li>Tests edge cases (invalid emails, empty strings, max length).</li>
                                    <li>Submits valid data and verifies success message.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Form validation report, success state screenshot.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Understands context labels ("Business Email" vs "Personal Email") to provide semantic input.</p>
                            </div>
                        </div>
                    </section>

                    {/* Accessibility Test */}
                    <section id="accessibility-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            6. Accessibility Test
                        </h2>
                        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Goal</strong>
                                <p>Audit the site for WCAG 2.1 compliance and screen reader compatibility.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Checks contrast ratios, alt text, and ARIA labels.</li>
                                    <li>Navigates the site using only keyboard inputs.</li>
                                    <li>Simulates screen reader traversal.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Lighthouse a11y score, list of WCAG violations with DOM pointers.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Tests interaction, not just static code analysis (e.g., can a keyboard user actually open the modal?).</p>
                            </div>
                        </div>
                    </section>

                    {/* Rage Bait Test */}
                    <section id="rage-bait-test">
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            7. Rage Bait Test
                        </h2>
                        <div className="glass-card" style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(239, 68, 68, 0.05) 100%)'
                        }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--error)' }}>Goal</strong>
                                <p>Detect user frustration signals and "rage clicks" caused by bad UX.</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>What the AI Agent Does</strong>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    <li>Rapidly clicks buttons that appear actionable but are unresponsive.</li>
                                    <li>Attempts to close un-dismissible popups.</li>
                                    <li>Monitors layout shifts that cause mis-clicks (CLS).</li>
                                    <li>Scans for dark patterns like hidden unsubscribe links.</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Artifacts Produced</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Frustration Score, video of "rage" moments, dark pattern report.</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Difference from Traditional</strong>
                                <p style={{ color: 'var(--text-secondary)' }}>Only Rihario actively simulates frustration to find what annoys users, rather than just what breaks code.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    )
}
