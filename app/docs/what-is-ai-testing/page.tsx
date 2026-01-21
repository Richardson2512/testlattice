import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What Is AI Testing? | Rihario Docs',
    description: 'AI testing is automated software testing that uses artificial intelligence to generate, execute, and maintain tests without requiring manual test script creation.',
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-ai-testing',
    },
}

export default function WhatIsAITesting() {
    return (
        <article style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                What Is AI Testing?
            </h1>

            <p style={{ marginBottom: '1rem' }}>
                AI testing is automated software testing that uses artificial intelligence to generate, execute, and maintain tests without requiring manual test script creation. Instead of writing code-based assertions, testers describe intended behavior in natural language, and AI interprets and validates those intentions.
            </p>

            <p style={{ marginBottom: '2rem' }}>
                AI testing shifts the testing paradigm from scripted validation to intent-based verification.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Why AI Testing Exists
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional automated testing requires developers to write explicit test scripts using frameworks like Playwright, Cypress, or Selenium. These scripts:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Require programming knowledge</li>
                <li>Break when UI elements change</li>
                <li>Demand ongoing maintenance as applications evolve</li>
                <li>Create bottlenecks for solo developers and small teams</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                AI testing exists to make quality assurance accessible to developers who lack the time, resources, or expertise to maintain traditional test suites.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How AI Testing Works
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                AI testing systems operate through several key mechanisms:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Natural language processing interprets test intentions from plain English descriptions</li>
                <li>Computer vision identifies UI elements by appearance and context, not just selectors</li>
                <li>Machine learning adapts to UI changes and learns from corrections</li>
                <li>Real browser execution validates actual user experience, not simulated behavior</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                The tester provides a URL and describes what to test. The AI handles element identification, interaction sequencing, and result evaluation.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How AI Testing Differs from Traditional Automation
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional automated testing:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Requires explicit selectors (IDs, classes, XPath)</li>
                <li>Fails when selectors change, even if functionality works</li>
                <li>Needs constant maintenance as UI evolves</li>
                <li>Validates code behavior against expectations</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                AI testing:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Identifies elements by purpose and visual context</li>
                <li>Adapts automatically when UI changes</li>
                <li>Requires minimal maintenance</li>
                <li>Validates user experience outcomes</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                The fundamental difference: traditional testing asks "did the code behave as scripted?" while AI testing asks "can a user accomplish their goal?"
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Rihario Uses AI Testing
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Rihario implements AI testing through:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Large language models (Llama, Qwen) that interpret natural language test descriptions</li>
                <li>Real browser sessions that execute tests in actual Chrome environments</li>
                <li>Self-healing element detection that adapts when UI changes</li>
                <li>God Mode intervention that allows human correction when AI gets stuck</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Rihario applies AI testing to functional flows, visual regression, accessibility checks, performance monitoring, and security validation—all from a single URL input.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Next Steps
            </h2>

            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li><Link href="/docs/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>What Is Vibe Testing?</Link></li>
                <li><Link href="/docs/what-is-self-healing" style={{ color: 'var(--primary)' }}>What Is Self-Healing Testing?</Link></li>
                <li><Link href="/docs/how-ai-explores" style={{ color: 'var(--primary)' }}>How AI Explores Your App</Link></li>
                <li><Link href="/docs/ai-accuracy" style={{ color: 'var(--primary)' }}>How Accurate Are AI Test Results?</Link></li>
            </ul>
        </article>
    )
}
