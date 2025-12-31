'use client'

import React from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export default function BlogPage() {
    return (
        <main style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)'
        }}>
            <LandingHeader />

            {/* Hero Section */}
            <section style={{
                paddingTop: '140px',
                paddingBottom: '4rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, var(--beige-200) 0%, var(--bg-primary) 70%)'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        lineHeight: 1.1,
                        color: 'var(--text-primary)'
                    }}>
                        Rihario <span className="text-gradient">Blog</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6
                    }}>
                        Insights on AI testing, chatbot safety, and building better products.
                    </p>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section style={{ padding: '4rem 0 8rem' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        padding: '4rem 2rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: 'var(--text-primary)'
                        }}>
                            Coming Soon
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem',
                            maxWidth: '500px',
                            margin: '0 auto 2rem'
                        }}>
                            We're working on in-depth articles about AI testing best practices, chatbot alignment, and shipping with confidence.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Link href="/" style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--primary)',
                                color: 'white',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}>
                                Back to Home
                            </Link>
                            <Link href="/docs" style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                border: '1px solid var(--border-medium)'
                            }}>
                                Read Docs Instead
                            </Link>
                        </div>
                    </div>

                    {/* Placeholder Topics */}
                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            color: 'var(--text-muted)',
                            textAlign: 'center'
                        }}>
                            Topics We'll Cover
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem'
                        }}>
                            {[
                                { icon: '🛡️', title: 'AI Safety Testing' },
                                { icon: '🧠', title: 'Chatbot Alignment' },
                                { icon: '🔥', title: 'Edge Case Stress Tests' },
                                { icon: '🚀', title: 'Shipping with Confidence' },
                                { icon: '🤖', title: 'LLM Behavior Patterns' },
                                { icon: '📊', title: 'Testing Metrics' }
                            ].map(topic => (
                                <div key={topic.title} style={{
                                    padding: '1.25rem',
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{topic.icon}</div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{topic.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
