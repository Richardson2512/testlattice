'use client'

import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export default function PrivacyPolicyPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>
            <LandingHeader />

            <section style={{
                paddingTop: '140px',
                paddingBottom: '80px'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Privacy Policy
                    </h1>

                    <p style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        fontSize: '0.95rem'
                    }}>
                        Last updated: January 8, 2026
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                1. Introduction
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                Rihario Inc. ("Rihario", "we", "us", or "our") respects your privacy and is committed to protecting
                                your personal data. This privacy policy explains how we collect, use, store, and protect your
                                information when you use our AI-powered testing platform.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                2. Information We Collect
                            </h2>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                                2.1 Information You Provide
                            </h3>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                <li>Account information (email address, name)</li>
                                <li>URLs of websites you submit for testing</li>
                                <li>Payment information (processed securely via our payment provider)</li>
                                <li>Communications with our support team</li>
                            </ul>

                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                                2.2 Information Collected Automatically
                            </h3>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>Test results, screenshots, and recordings generated during testing</li>
                                <li>Usage data and analytics</li>
                                <li>Device and browser information</li>
                                <li>IP address and approximate location</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                3. How We Use Your Information
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                We use your information to:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>Provide and improve our testing services</li>
                                <li>Generate test reports and analytics</li>
                                <li>Process payments and manage subscriptions</li>
                                <li>Communicate with you about your account and service updates</li>
                                <li>Prevent fraud and ensure platform security</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                4. Data Retention
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <strong>Guest Tests:</strong> Test results, screenshots, and videos from guest tests are automatically
                                deleted after 24 hours.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                                <strong>Registered Users:</strong> Your test data is retained for the duration of your subscription.
                                Upon account deletion, all associated data is permanently deleted within 30 days.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                5. Data Security
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                We implement industry-standard security measures to protect your data, including:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Encryption of data in transit (TLS 1.3) and at rest</li>
                                <li>Secure authentication and access controls</li>
                                <li>Regular security audits and monitoring</li>
                                <li>Isolated test environments</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                6. Your Rights
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                Depending on your location, you may have the right to:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Export your data in a portable format</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                7. Third-Party Services
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                We use trusted third-party services to operate our platform:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li><strong>Supabase:</strong> Authentication and database services</li>
                                <li><strong>Polar:</strong> Payment processing</li>
                                <li><strong>Vercel:</strong> Hosting and analytics</li>
                                <li><strong>AI Providers:</strong> Vision and language model APIs for test analysis</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                8. Contact Us
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                If you have questions about this privacy policy or your data, contact us at:
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                                <strong>Email:</strong> privacy@rihario.com
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                9. Changes to This Policy
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                We may update this privacy policy from time to time. We will notify you of any material changes
                                by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
