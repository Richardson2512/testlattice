
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Quality & Health Standards | Rihario Docs',
    description: 'Understand how Rihario evaluates the quality, speed, and health of your application.',
}

export default function QualityStandards() {
    return (
        <>
            <div className="docs-hero">
                <div className="docs-hero-content">
                    <h1 className="docs-hero-title">Quality & Health Standards</h1>
                    <p className="docs-hero-summary">
                        Beyond just clicking buttons, Rihario continuously monitors the vital signs of your application to ensure a premium user experience.
                    </p>
                </div>
                <div className="docs-hero-visual">
                    <span style={{ fontSize: '4rem' }}>🏥</span>
                </div>
            </div>

            <div className="docs-tldr">
                <div className="docs-tldr-header">
                    <span className="docs-tldr-icon">💡</span>
                    TL;DR
                </div>
                <div className="docs-tldr-content">
                    Every test run automatically checks <strong>Loading Speed</strong>, <strong>Accessibility</strong>, <strong>Security</strong>, and <strong>Visual Stability</strong>. We grade these on a simple Pass / Review / Issue scale.
                </div>
            </div>

            <h2>Why Functional Tests Aren't Enough</h2>
            <p>
                A test might "pass" because the button was clicked, but if that button took 5 seconds to appear or was invisible to screen readers, your user experience is still broken.
            </p>
            <p>
                Rihario runs a <strong>Quality & Health Check</strong> in the background of every step to catch these hidden issues.
            </p>

            <hr />

            <h2>1. Performance (Speed & Stability)</h2>
            <p>
                We measure how it <em>feels</em> to use your app, not just server response times.
            </p>

            <div className="docs-fit-card">
                <div className="docs-fit-card-header">
                    <span className="docs-fit-card-icon">⚡</span>
                    Loading Speed (LCP)
                </div>
                <div className="docs-fit-card-content">
                    <p><strong>Largest Contentful Paint</strong>. How long until the main content is visible?</p>
                    <ul>
                        <li><span style={{ color: 'var(--success)', fontWeight: 600 }}>Great</span>: Under 2.5 seconds</li>
                        <li><span style={{ color: 'var(--warning)', fontWeight: 600 }}>Needs Review</span>: 2.5s - 4.0s</li>
                        <li><span style={{ color: 'var(--error)', fontWeight: 600 }}>Slow</span>: Over 4.0s</li>
                    </ul>
                </div>
            </div>

            <div className="docs-fit-card">
                <div className="docs-fit-card-header">
                    <span className="docs-fit-card-icon">📏</span>
                    Visual Stability (CLS)
                </div>
                <div className="docs-fit-card-content">
                    <p><strong>Cumulative Layout Shift</strong>. Does the page jump around while loading?</p>
                    <ul>
                        <li><span style={{ color: 'var(--success)', fontWeight: 600 }}>Stable</span>: Score &lt; 0.1</li>
                        <li><span style={{ color: 'var(--warning)', fontWeight: 600 }}>Needs Review</span>: 0.1 - 0.25</li>
                        <li><span style={{ color: 'var(--error)', fontWeight: 600 }}>Unstable</span>: Score &gt; 0.25</li>
                    </ul>
                </div>
            </div>

            <h2>2. Accessibility</h2>
            <p>
                Can everyone use your app? We check against <strong>WCAG 2.1 AA</strong> standards automatically.
            </p>
            <div className="docs-callout docs-callout-info">
                <div className="docs-callout-header">
                    <span className="docs-callout-icon">♿</span>
                    What we check
                </div>
                <div className="docs-callout-content">
                    We look for missing labels, poor color contrast, and broken ARIA tags. A score below <strong>90/100</strong> triggers a warning.
                </div>
            </div>

            <h2>3. Security Check</h2>
            <p>
                Basic hygiene checks for your application's security headers and vulnerabilities.
            </p>
            <ul>
                <li><strong>Zero Tolerance</strong>: Any critical vulnerability (like XSS risks) is marked as a fail.</li>
                <li><strong>HTTPS</strong>: We ensure all resources are loaded securely.</li>
            </ul>

            <h2>4. Visual Polish</h2>
            <p>
                We compare the current look of your app against previous successful runs to catch unintended visual changes.
            </p>
            <ul>
                <li><strong>Pixel Perfect</strong>: Changes &lt; 1% are usually ignored (rendering noise).</li>
                <li><strong>Warning</strong>: Changes between 1% - 5% are flagged for review.</li>
                <li><strong>Issue</strong>: Large changes (&gt; 5%) likely indicate a broken layout.</li>
            </ul>
        </>
    )
}
