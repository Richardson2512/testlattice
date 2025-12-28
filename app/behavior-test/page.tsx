'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer' // Assuming Footer exists here or similar path
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function BehaviorTestPage() {
    const [userTier, setUserTier] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (session?.access_token) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
                    const res = await fetch(`${apiUrl}/api/billing/subscription`, {
                        headers: { Authorization: `Bearer ${session.access_token}` },
                    })
                    if (res.ok) {
                        const data = await res.json()
                        setUserTier(data.subscription?.tier || 'free')
                    }
                } catch (e) {
                    console.warn("Failed to fetch tier", e)
                }
            }
            setLoading(false)
        }
        checkUser()
    }, [])

    const isEligible = userTier === 'indie' || userTier === 'pro'

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
                paddingBottom: '6rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, var(--beige-200) 0%, var(--bg-primary) 70%)'
            }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--maroon-100)',
                        color: 'var(--maroon-900)',
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1.5rem',
                        border: '1px solid var(--maroon-200)'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>🧠</span> AI Agentic Add-on
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        color: 'var(--text-primary)'
                    }}>
                        User Behavior <span className="text-gradient">Analysis</span>
                    </h1>

                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '3rem'
                    }}>
                        Simulate real users with advanced AI personas. Detect alignment issues, safety risks, and user frustration before you ship.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {/* CTA Logic */}
                        {loading ? (
                            <button className="btn-primary" disabled>Loading...</button>
                        ) : isEligible ? (
                            <Link href="/pricing" className="btn-primary" style={{
                                background: 'var(--maroon-600)',
                                color: 'white',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}>
                                Buy Credits ($20/20 tests)
                            </Link>
                        ) : (
                            <Link href="/pricing" className="btn-primary" style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}>
                                Upgrade to Access
                            </Link>
                        )}
                        <Link href="#how-it-works" style={{
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-medium)'
                        }}>
                            Learn More
                        </Link>
                    </div>

                    <div style={{
                        marginTop: '1.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)'
                    }}>
                        ⚠️ <strong>Note:</strong> This is a high-compute feature exclusive to <strong>Indie</strong> and <strong>Pro</strong> plans.
                    </div>

                </div>
            </section>

            {/* Feature Showcase */}
            <section id="how-it-works" style={{ padding: '6rem 0', background: 'var(--bg-card)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                                Why is this an Add-on?
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Behavior Analysis isn't just a simple script. It spins up a dedicated AI Actor (using models like Gemini Flash/Pro) that interacts with your site for up to <strong>20 turns</strong> per session.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                This process consumes significant GPU and API resources to ensure the AI "sees" and "thinks" like a human. Because of these high costs, we offer it as a usage-based credit system ($20 per 20 tests) rather than unlimited access.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'Full conversational capability (20 turns)',
                                    'Visual recognition of UI elements',
                                    'Self-healing retry mechanisms',
                                    'Detailed behavior reports'
                                ].map(item => (
                                    <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                        <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{
                            background: 'var(--bg-primary)', // Placeholder for image
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-light)',
                            height: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {/* Placeholder for an image */}
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '4rem' }}>🤖</span>
                                <p> AI Simulation in Progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
