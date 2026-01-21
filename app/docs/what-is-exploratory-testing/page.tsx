import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What Is Exploratory Testing? | Rihario Docs',
    description: 'Exploratory testing is a testing approach where testers actively explore an application without predefined test scripts, discovering issues through investigation rather than validation.',
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-exploratory-testing',
    },
}

export default function WhatIsExploratoryTesting() {
    return (
        <article style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                What Is Exploratory Testing?
            </h1>

            <p style={{ marginBottom: '1rem' }}>
                Exploratory testing is a testing approach where testers actively explore an application without predefined test scripts, discovering issues through investigation rather than validation. Testers learn about the system while simultaneously designing and executing tests.
            </p>

            <p style={{ marginBottom: '2rem' }}>
                Exploratory testing prioritizes discovery over confirmation.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Why Exploratory Testing Exists
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Scripted testing validates known requirements but struggles to find unexpected issues. Exploratory testing fills this gap by:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Finding edge cases that formal requirements missed</li>
                <li>Discovering usability issues that functional tests ignore</li>
                <li>Uncovering integration problems between features</li>
                <li>Identifying real-world user confusion and friction</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Exploratory testing exists because scripts can only verify what developers anticipated. Real users encounter situations nobody predicted.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Exploratory Testing Works
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Exploratory testing operates through guided discovery:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>The tester starts with a general goal or area of focus</li>
                <li>Interactions reveal system behavior and suggest new paths to explore</li>
                <li>The tester adapts their approach based on what they observe</li>
                <li>Issues are documented as they are discovered</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Unlike scripted testing, the exact path through the application is not predetermined. The tester follows curiosity and intuition guided by their understanding of common failure patterns.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Exploratory Testing Differs from Scripted Testing
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Scripted testing:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Follows predetermined steps</li>
                <li>Validates specific expected outcomes</li>
                <li>Passes or fails against explicit criteria</li>
                <li>Repeatable and deterministic</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                Exploratory testing:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Follows emerging discoveries</li>
                <li>Seeks unexpected behavior</li>
                <li>Evaluates overall quality and experience</li>
                <li>Adaptive and investigative</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Both approaches are valuable. Scripted testing ensures known functionality works. Exploratory testing finds what scripted testing missed.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Rihario Uses Exploratory Testing
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Rihario automates exploratory testing through AI:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>AI autonomously navigates applications, discovering interactive elements</li>
                <li>The system tries multiple paths through the application</li>
                <li>Issues are identified through behavioral observation, not predefined assertions</li>
                <li>Human oversight through God Mode guides exploration when needed</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Rihario combines the discovery benefits of exploratory testing with the scalability of automation. The AI explores like a curious tester while running continuously across builds.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Next Steps
            </h2>

            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li><Link href="/docs/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>What Is Vibe Testing?</Link></li>
                <li><Link href="/docs/how-ai-explores" style={{ color: 'var(--primary)' }}>How AI Explores Your App</Link></li>
                <li><Link href="/docs/what-is-ai-testing" style={{ color: 'var(--primary)' }}>What Is AI Testing?</Link></li>
                <li><Link href="/docs/pre-ship-confidence" style={{ color: 'var(--primary)' }}>What "Pre-Ship Confidence" Actually Means</Link></li>
            </ul>
        </article>
    )
}
