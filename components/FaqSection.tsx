'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const faqs = [
    {
        q: "How does Rihario's AI navigate my site safely?",
        a: "We use read-only guest profiles by default and execute in isolated, sandboxed containers. You can whitelist our IPs or run via our secure tunnel. Your data never leaves the sandbox."
    },
    {
        q: "Do I need to install anything to use Rihario?",
        a: "No. Rihario is entirely cloud-based. You just provide the URL and we handle everything. For local testing, we offer a CLI tunnel that takes 30 seconds to set up."
    },
    {
        q: "Can Rihario test behind login screens and authentication?",
        a: "Yes. You can securely store credentials in your project settings. Our AI agents handle authentication flows, 2FA (TOTP), magic links, and OAuth sign-ins automatically."
    },
    {
        q: "How much does Rihario cost compared to manual QA?",
        a: "Typical teams save 70% on QA costs. Our agents work 24/7 for $19-99/month—a fraction of even one hour of a manual tester's time. The Indie plan at $39/month includes God Mode and 300 tests."
    },
    {
        q: "How do I smoke test my vibe coded app?",
        a: "Rihario runs a 'Critical Path' smoke test automatically. We recommend checking 5 key things: Login, Core Value Action, Navigation routing, Mobile layout (375px), and API connectivity. Rihario can automate this entire checklist for you."
    },
    {
        q: "Should I write unit tests for Cursor/AI-generated code?",
        a: "Rihario suggests replacing brittle unit tests with high-level behavior tests. AI code changes too frequently for unit tests to be sustainable. Rihario verifies the functionality from the user's perspective, which is what actually matters."
    },
    {
        q: "I use Cursor/Replit to 'Vibe Code'. Does Rihario work with AI-generated code?",
        a: "Absolutely. In fact, Rihario was built for Vibe Coding. Since you don't write the code yourself, you shouldn't write the tests yourself either. Just tell Rihario 'Verify that the new signup flow works' and we test it instantly."
    },
    {
        q: "What is God Mode and how does it work?",
        a: "God Mode is our patent-pending feature that lets you intervene when AI gets stuck. Instead of the test failing, you see a live browser, click the right element, and AI learns and continues. It achieves 95% test success vs 60% with other tools."
    }
]

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [hasHydrated, setHasHydrated] = useState(false)

    // After hydration, enable collapse behavior
    useEffect(() => {
        setHasHydrated(true)
    }, [])

    return (
        <>
            {/* FAQ Schema for AEO */}
            <Script id="home-faq-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(faq => ({
                        "@type": "Question",
                        "name": faq.q,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.a
                        }
                    }))
                })}
            </Script>

            <section style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                        Frequently Asked Questions
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, i) => {
                            // Before hydration: all expanded (for crawlers)
                            // After hydration: only openIndex is expanded
                            const isExpanded = !hasHydrated || openIndex === i

                            return (
                                <div key={i} className="glass-card" style={{
                                    padding: '0',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    background: isExpanded ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                                    transition: 'all 0.3s'
                                }}
                                    onClick={() => setOpenIndex(active => active === i ? null : i)}
                                >
                                    <div style={{
                                        padding: '1.5rem 2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <h3 style={{
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            margin: 0
                                        }}>
                                            {faq.q}
                                        </h3>
                                        <span style={{
                                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s',
                                            color: 'var(--text-muted)',
                                            flexShrink: 0,
                                            marginLeft: '1rem'
                                        }}>▼</span>
                                    </div>

                                    {/* Answer content - always in DOM, visibility controlled by CSS */}
                                    <div
                                        style={{
                                            maxHeight: isExpanded ? '500px' : '0',
                                            overflow: 'hidden',
                                            transition: hasHydrated ? 'max-height 0.3s ease-in-out' : 'none'
                                        }}
                                        // Ensure content is accessible even when collapsed
                                        aria-hidden={!isExpanded}
                                    >
                                        <div style={{
                                            padding: '0 2rem 2rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.6',
                                            borderTop: '1px solid var(--border-subtle)'
                                        }}>
                                            <div style={{ paddingTop: '1rem' }}>{faq.a}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
