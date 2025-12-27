'use client'

import Link from 'next/link'

export function Footer() {
    return (
        <footer style={{ background: 'var(--beige-100)', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                    <div style={{ gridColumn: 'span 1' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>🧪</span> Rihario
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Vibe testing for solo & indie developers. Feel confident before shipping.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Product</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/features" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Features</Link></li>
                            <li><Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Integrations</Link></li>
                            <li><Link href="/pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/why-rihario" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Why Rihario?</Link></li>
                            <li><Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link></li>
                            <li><Link href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                            <li><Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    © {new Date().getFullYear()} Rihario Inc. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
