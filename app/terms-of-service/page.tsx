'use client'

import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export default function TermsOfServicePage() {
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
                        Terms of Service
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
                                1. Acceptance of Terms
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                By accessing or using Rihario's AI-powered testing platform ("Service"), you agree to be bound
                                by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                2. Description of Service
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                Rihario provides an AI-powered autonomous testing platform that explores websites, identifies
                                potential issues, and generates test reports. The Service includes browser-based testing,
                                screenshot capture, video recording, and intelligent issue detection.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                3. User Accounts
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                To access certain features, you must create an account. You agree to:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>Provide accurate and complete registration information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Accept responsibility for all activities under your account</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                4. Acceptable Use
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                You agree NOT to use the Service to:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>Test websites you do not own or have explicit permission to test</li>
                                <li>Attempt to gain unauthorized access to any system or data</li>
                                <li>Conduct any form of attack, including DDoS or penetration testing without authorization</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Interfere with or disrupt the Service or servers</li>
                                <li>Use the Service for any illegal or unauthorized purpose</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                5. Guest Tests
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                Guest tests are provided free of charge with the following limitations:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Limited to 1 test per 24-hour period per IP address</li>
                                <li>Results expire and are deleted after 24 hours</li>
                                <li>Only public URLs may be tested</li>
                                <li>No pre-test diagnosis or advanced features</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                6. Paid Subscriptions
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                Paid plans are billed on a monthly or annual basis. By subscribing:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                                <li>You authorize us to charge your payment method for the subscription fee</li>
                                <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                                <li>Refunds are provided on a case-by-case basis at our discretion</li>
                                <li>We may modify pricing with 30 days' notice to existing subscribers</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                7. Intellectual Property
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                <strong>Our Property:</strong> The Service, including its original content, features, and functionality,
                                is owned by Rihario Inc. and is protected by intellectual property laws.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <strong>Your Content:</strong> You retain ownership of URLs and content you submit for testing.
                                You grant us a limited license to access and test such content for the purpose of providing the Service.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                8. Disclaimer of Warranties
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee that:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>The Service will detect all bugs or issues in your website</li>
                                <li>Test results will be error-free or complete</li>
                                <li>The Service will be uninterrupted or always available</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                9. Limitation of Liability
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, RIHARIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.
                                Our total liability shall not exceed the amount paid by you for the Service in the 12 months
                                preceding the claim.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                10. Termination
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                We may terminate or suspend your access to the Service immediately, without prior notice,
                                if you breach these Terms. Upon termination, your right to use the Service ceases immediately.
                                You may cancel your account at any time through your account settings.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                11. Governing Law
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
                                United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                12. Changes to Terms
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                We reserve the right to modify these Terms at any time. We will provide notice of material changes
                                by posting the updated Terms on this page. Your continued use of the Service after changes
                                constitutes acceptance of the modified Terms.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                13. Contact Information
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                For questions about these Terms, contact us at:
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                                <strong>Email:</strong> legal@rihario.com
                            </p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
