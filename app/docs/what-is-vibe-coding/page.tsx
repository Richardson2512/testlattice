import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'What Is Vibe Coding? | Rihario Docs',
    description: 'Vibe coding is a software development approach where developers describe intent in natural language and AI tools generate the implementation code, prioritizing flow state over syntax.',
    alternates: {
        canonical: 'https://rihario.com/docs/what-is-vibe-coding',
    },
}

export default function WhatIsVibeCoding() {
    return (
        <article style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                What Is Vibe Coding?
            </h1>

            <p style={{ marginBottom: '1rem' }}>
                Vibe coding is a software development approach where developers describe intent in natural language and AI tools generate the implementation code. The developer focuses on what they want to build, while AI handles the syntactic details.
            </p>

            <p style={{ marginBottom: '2rem' }}>
                Vibe coding prioritizes flow state and rapid iteration over manual code writing.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Why Vibe Coding Exists
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional software development requires developers to:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Memorize syntax across multiple languages and frameworks</li>
                <li>Write boilerplate code repeatedly</li>
                <li>Context-switch between thinking about what to build and how to build it</li>
                <li>Debug syntactic errors that have nothing to do with the actual problem</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Vibe coding exists because AI code generation has reached a level where describing intent is often faster and more reliable than writing code manually. Developers can stay in a creative flow while AI handles implementation details.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Vibe Coding Works
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Vibe coding operates through natural language interaction with AI tools:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Developer describes a feature, component, or behavior in plain English</li>
                <li>AI generates the corresponding code</li>
                <li>Developer reviews, accepts, or refines the output</li>
                <li>Iteration continues through conversation rather than manual editing</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Tools like Cursor, Claude, and GitHub Copilot enable this workflow, allowing developers to build applications primarily through prompting.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Vibe Coding Differs from Traditional Development
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Traditional development:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Developer writes code character by character</li>
                <li>Syntax errors require manual debugging</li>
                <li>Implementation speed limited by typing and syntax recall</li>
                <li>Context switching between design and implementation</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                Vibe coding:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Developer describes intent in natural language</li>
                <li>AI generates syntactically correct code</li>
                <li>Implementation speed limited by clarity of description</li>
                <li>Continuous flow from idea to working code</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Vibe coding changes the developer's role from code author to code director.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Rihario Relates to Vibe Coding
            </h2>

            <p style={{ marginBottom: '1rem' }}>
                Vibe coding produces code rapidly, but speed creates risk. Applications built quickly may have:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Edge cases the AI didn't anticipate</li>
                <li>Integration issues between generated components</li>
                <li>User experience problems that emerge in real interactions</li>
            </ul>

            <p style={{ marginBottom: '1rem' }}>
                Rihario provides the safety net for vibe coders:
            </p>

            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li>Vibe testing catches issues that rapid development introduces</li>
                <li>No test code required—testing matches the vibe coding workflow</li>
                <li>Pre-ship confidence without breaking flow state</li>
            </ul>

            <p style={{ marginBottom: '2rem' }}>
                Vibe coding and vibe testing form a complete workflow: AI generates the code, AI validates the experience.
            </p>

            <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                Next Steps
            </h2>

            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li><Link href="/docs/what-is-vibe-testing" style={{ color: 'var(--primary)' }}>What Is Vibe Testing?</Link></li>
                <li><Link href="/docs/pre-ship-confidence" style={{ color: 'var(--primary)' }}>What "Pre-Ship Confidence" Actually Means</Link></li>
                <li><Link href="/docs/who-is-this-for" style={{ color: 'var(--primary)' }}>Who Is This Tool For?</Link></li>
                <li><Link href="/blog/what-is-vibe-coding" style={{ color: 'var(--primary)' }}>Vibe Coding: The Complete Guide (Blog)</Link></li>
            </ul>
        </article>
    )
}
