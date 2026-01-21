import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What Is Self-Healing Testing? | Rihario Docs',
    description: 'Self-healing testing is an automated testing approach where tests automatically adapt to UI changes instead of breaking when element selectors or page structures change.',
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-self-healing',
    },
}

export default function WhatIsSelfHealing() {
    return (
        <article style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                What Is Self-Healing Testing?
            </h1>

            <p style={{ marginBottom: '1rem' }}>
                Self-healing testing is an automated testing approach where tests automatically adapt to UI changes instead of breaking when element selectors or page structures change. When a button ID changes or a form field moves, self-healing tests find the element by its purpose and continue executing.
            </p>

            <p style={{ marginBottom: '2rem' }}>
                Self-healing eliminates the primary maintenance burden of traditional test automation.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Why Self-Healing Testing Exists
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional automated tests rely on explicit element selectors:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>CSS selectors like <code>#login-button</code> or <code>.submit-form</code></li>
                <li>XPath expressions that reference specific DOM paths</li>
                <li>Test IDs that developers must manually add and maintain</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                When any of these change—which happens constantly in modern development—tests fail. Not because functionality is broken, but because the selector is outdated.
            </p>

            <p style={{ marginBottom: '2rem' }}>
                Self-healing testing exists to keep tests working through normal UI evolution without requiring constant human intervention.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Self-Healing Testing Works
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Self-healing systems use multiple identification strategies:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Visual recognition identifies elements by appearance, not just code attributes</li>
                <li>Semantic understanding recognizes elements by their purpose ("login button," "email field")</li>
                <li>Fallback hierarchies try multiple selectors before failing</li>
                <li>Learning from corrections remembers successful element resolutions</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                When a primary selector fails, the system automatically attempts alternative identification methods before reporting a failure.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Self-Healing Differs from Traditional Test Maintenance
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional test maintenance:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Test fails when selector changes</li>
                <li>Developer investigates the failure</li>
                <li>Developer updates the selector manually</li>
                <li>Test passes until the next UI change</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                Self-healing test maintenance:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Primary selector fails</li>
                <li>System automatically tries alternative identification</li>
                <li>Test continues if element is found</li>
                <li>No human intervention required for routine changes</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Self-healing reduces test maintenance from a constant burden to an occasional review.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Rihario Uses Self-Healing
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Rihario implements self-healing through:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>AI-powered element recognition that understands element purpose from context</li>
                <li>Visual analysis that identifies elements even when attributes change</li>
                <li>God Mode intervention that allows human correction when automatic healing fails</li>
                <li>Learning from corrections to improve future element identification</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                When Rihario encounters a changed UI, it attempts to locate elements by their semantic meaning. If automatic resolution fails, God Mode allows real-time human intervention, and the AI learns from the correction.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Next Steps
            </h2>

            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li><Link href="/docs/what-is-ai-testing" style={{ color: 'var(--primary)' }}>What Is AI Testing?</Link></li>
                <li><Link href="/docs/human-in-the-loop" style={{ color: 'var(--primary)' }}>Human-in-the-Loop Testing Explained</Link></li>
                <li><Link href="/features/god-mode" style={{ color: 'var(--primary)' }}>God Mode Feature</Link></li>
                <li><Link href="/docs/ai-accuracy" style={{ color: 'var(--primary)' }}>How Accurate Are AI Test Results?</Link></li>
            </ul>
        </article>
    )
}
