'use client'

import React from 'react'

// Step data from the test run
interface TestStep {
    step: number
    action: string
    success: boolean
    note?: string
    description?: string
    severity?: 'GREEN' | 'YELLOW' | 'RED'
    samples?: string[]
    observed_state?: Record<string, any>
    error?: string
    duration?: number
}

interface GuestTestReportProps {
    testType: 'visual' | 'navigation' | 'accessibility' | 'performance' | 'full'
    steps: TestStep[]
    targetUrl: string
}

// Map test types to relevant step actions
const TEST_TYPE_STEP_MAP: Record<string, string[]> = {
    visual: [
        'viewport_desktop', 'viewport_laptop', 'viewport_tablet', 'viewport_mobile',
        'detect_overflow', 'detect_placeholder', 'check_media', 'scroll_test',
        'render_sanity', 'final_snapshot'
    ],
    navigation: [
        'navigate_check', 'validate_links', 'check_network', 'network_idle'
    ],
    accessibility: [
        'check_a11y', 'aria_audit', 'contrast_check', 'keyboard_navigation'
    ],
    performance: [
        'check_network', 'network_idle', 'render_sanity', 'scroll_test'
    ],
    full: [] // Show all
}

// Human-readable names for actions
const ACTION_LABELS: Record<string, { name: string; what: string; why: string }> = {
    viewport_desktop: {
        name: 'Desktop View Check',
        what: 'Captured screenshot at 1920x1080 (desktop) resolution',
        why: 'Ensures your site looks correct on large screens'
    },
    viewport_laptop: {
        name: 'Laptop View Check',
        what: 'Captured screenshot at 1366x768 (laptop) resolution',
        why: 'Validates layout on common laptop displays'
    },
    viewport_tablet: {
        name: 'Tablet View Check',
        what: 'Captured screenshot at 768x1024 (tablet) resolution',
        why: 'Tests responsive breakpoints for tablets'
    },
    viewport_mobile: {
        name: 'Mobile View Check',
        what: 'Captured screenshot at 375x667 (mobile) resolution',
        why: 'Ensures mobile usability and touch-friendliness'
    },
    detect_overflow: {
        name: 'Text Overflow Detection',
        what: 'Scanned all text elements for horizontal or vertical overflow',
        why: 'Overflow text is cut off and unreadable, damaging UX'
    },
    detect_placeholder: {
        name: 'Placeholder Text Detection',
        what: 'Searched for common placeholder patterns (Lorem ipsum, TODO, etc.)',
        why: 'Placeholder text in production indicates unfinished content'
    },
    check_media: {
        name: 'Media Asset Verification',
        what: 'Checked all images and videos for successful loading',
        why: 'Broken images make your site look unprofessional'
    },
    scroll_test: {
        name: 'Scroll Behavior Test',
        what: 'Tested page scrolling from top to bottom',
        why: 'Ensures no scroll-jacking or stuck elements'
    },
    render_sanity: {
        name: 'Render Sanity Check',
        what: 'Verified the page renders without blank/white screens',
        why: 'Catches critical rendering failures'
    },
    validate_links: {
        name: 'Link Validation',
        what: 'Extracted and validated all internal links on the page',
        why: 'Broken links frustrate users and hurt SEO'
    },
    navigate_check: {
        name: 'Page Load Check',
        what: 'Navigated to the URL and verified it loads successfully',
        why: 'The most basic test - can users reach your page?'
    },
    check_network: {
        name: 'Network Health Check',
        what: 'Monitored network requests for failures (4xx, 5xx)',
        why: 'Failed requests indicate broken features or APIs'
    },
    network_idle: {
        name: 'Network Stability Wait',
        what: 'Waited for network activity to stabilize',
        why: 'Ensures page is fully loaded before testing'
    },
    final_snapshot: {
        name: 'Final Snapshot',
        what: 'Captured final state of the page after all tests',
        why: 'Provides a baseline for future comparison'
    }
}

// Severity colors
const SEVERITY_STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    GREEN: { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', text: '#10b981', icon: '✓' },
    YELLOW: { bg: 'rgba(234, 179, 8, 0.1)', border: '#eab308', text: '#eab308', icon: '⚠' },
    RED: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444', icon: '✗' }
}

// Test type descriptions
const TEST_TYPE_INFO: Record<string, { title: string; description: string; icon: string }> = {
    visual: {
        title: 'Visual Test Report',
        description: 'This test checked your page for visual issues including layout problems, text overflow, broken images, and responsive design across different screen sizes.',
        icon: '🎨'
    },
    navigation: {
        title: 'Navigation Test Report',
        description: 'This test validated your page\'s links, navigation structure, and network health.',
        icon: '🔗'
    },
    accessibility: {
        title: 'Accessibility Test Report',
        description: 'This test evaluated your page for WCAG compliance, keyboard navigation, and screen reader compatibility.',
        icon: '♿'
    },
    performance: {
        title: 'Performance Test Report',
        description: 'This test measured loading speed, network efficiency, and rendering performance.',
        icon: '⚡'
    },
    full: {
        title: 'Comprehensive Test Report',
        description: 'This test ran a full suite of visual, navigation, accessibility, and performance checks.',
        icon: '🔬'
    }
}

export function GuestTestReport({ testType, steps, targetUrl }: GuestTestReportProps) {
    const info = TEST_TYPE_INFO[testType] || TEST_TYPE_INFO.full
    const relevantActions = TEST_TYPE_STEP_MAP[testType] || []

    // Filter steps based on test type (or show all for 'full')
    const relevantSteps = testType === 'full'
        ? steps
        : steps.filter(s => relevantActions.includes(s.action))

    // Group steps by status
    const issues = relevantSteps.filter(s => !s.success || s.severity === 'RED')
    const warnings = relevantSteps.filter(s => s.success && s.severity === 'YELLOW')
    const passed = relevantSteps.filter(s => s.success && (!s.severity || s.severity === 'GREEN'))

    return (
        <div style={{ marginBottom: '2rem' }}>
            {/* Header */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{info.icon}</span>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{info.title}</h2>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            Tested: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>{targetUrl}</code>
                        </div>
                    </div>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {info.description}
                </p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <SummaryCard
                    title="Issues Found"
                    count={issues.length}
                    color="#ef4444"
                    icon="✗"
                    description={issues.length > 0 ? 'Requires immediate attention' : 'No issues detected'}
                />
                <SummaryCard
                    title="Warnings"
                    count={warnings.length}
                    color="#eab308"
                    icon="⚠"
                    description={warnings.length > 0 ? 'Review recommended' : 'All clear'}
                />
                <SummaryCard
                    title="Passed"
                    count={passed.length}
                    color="#10b981"
                    icon="✓"
                    description="Tests completed successfully"
                />
            </div>

            {/* Detailed Results */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
                    Test Results
                </h3>

                {/* Issues First */}
                {issues.length > 0 && (
                    <ResultSection title="🔴 Issues" steps={issues} />
                )}

                {/* Then Warnings */}
                {warnings.length > 0 && (
                    <ResultSection title="🟡 Warnings" steps={warnings} />
                )}

                {/* Then Passed */}
                {passed.length > 0 && (
                    <ResultSection title="🟢 Passed" steps={passed} defaultCollapsed={issues.length > 0 || warnings.length > 0} />
                )}
            </div>
        </div>
    )
}

function SummaryCard({ title, count, color, icon, description }: {
    title: string; count: number; color: string; icon: string; description: string
}) {
    return (
        <div style={{
            background: `${color}10`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            border: `1px solid ${color}30`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color, fontSize: '1.25rem' }}>{icon}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{title}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{count}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{description}</div>
        </div>
    )
}

function ResultSection({ title, steps, defaultCollapsed = false }: {
    title: string; steps: TestStep[]; defaultCollapsed?: boolean
}) {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <button
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    width: '100%',
                    textAlign: 'left'
                }}
            >
                <span style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
                {title} ({steps.length})
            </button>

            {!collapsed && (
                <div style={{ marginTop: '0.5rem' }}>
                    {steps.map((step, i) => (
                        <StepCard key={`${step.action}-${i}`} step={step} />
                    ))}
                </div>
            )}
        </div>
    )
}

function StepCard({ step }: { step: TestStep }) {
    const label = ACTION_LABELS[step.action] || {
        name: step.action,
        what: step.description || 'Executed test step',
        why: 'Part of the test suite'
    }
    const severity = step.severity || (step.success ? 'GREEN' : 'RED')
    const styles = SEVERITY_STYLES[severity]

    return (
        <div style={{
            background: styles.bg,
            border: `1px solid ${styles.border}30`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '0.75rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{
                    color: styles.text,
                    fontSize: '1.25rem',
                    flexShrink: 0
                }}>{styles.icon}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{label.name}</div>

                    {/* What was tested */}
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {label.what}
                    </div>

                    {/* Result/Note */}
                    {step.note && (
                        <div style={{
                            fontWeight: 500,
                            color: styles.text,
                            marginBottom: '0.5rem'
                        }}>
                            Result: {step.note}
                        </div>
                    )}

                    {/* Error message */}
                    {step.error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            marginBottom: '0.5rem'
                        }}>
                            Error: {step.error}
                        </div>
                    )}

                    {/* Samples/Details */}
                    {step.samples && step.samples.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                Found elements:
                            </div>
                            <div style={{
                                background: 'var(--bg-tertiary)',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)'
                            }}>
                                {step.samples.slice(0, 5).map((s, i) => (
                                    <div key={i} style={{ marginBottom: i < step.samples!.length - 1 ? '0.25rem' : 0 }}>
                                        • {s}
                                    </div>
                                ))}
                                {step.samples.length > 5 && (
                                    <div style={{ color: 'var(--text-muted)' }}>...and {step.samples.length - 5} more</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Why it matters */}
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.5rem',
                        fontStyle: 'italic'
                    }}>
                        Why: {label.why}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestTestReport
