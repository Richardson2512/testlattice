
export function ProductFactSheet() {
    return (
        <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        At a Glance
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Quick facts for fast decision making.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>

                    {/* What is it */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>What is Rihario?</h3>
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            <li>Autonomous AI Testing Agent</li>
                            <li>No-code alternative to Playwright</li>
                            <li>Self-healing test engine</li>
                        </ul>
                    </div>

                    {/* Who is it for */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Who is it for?</h3>
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            <li>Solo Developers & Indie Hackers</li>
                            <li>"Vibe Coders" (Cursor/Replit users)</li>
                            <li>Lean Startups (MVP Phase)</li>
                        </ul>
                    </div>

                    {/* Pricing Model */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Pricing Model</h3>
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            <li><strong>Free Tier:</strong> 300 tests/mo</li>
                            <li><strong>Starter:</strong> $19/mo (1k tests)</li>
                            <li><strong>Indie:</strong> $39/mo (Unlimited)</li>
                        </ul>
                    </div>

                    {/* Core Capabilities */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Key Capabilities</h3>
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            <li>Visual Regression Testing</li>
                            <li>Functional Flow Verification</li>
                            <li>Rage Bait (UX) Testing</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    )
}
