'use client'

import React from 'react'
import { theme } from '../lib/theme'
import {
    TestabilityContract,
    TestTypeCapability,
    GlobalBlocker,
    SystemAction,
    RiskAcceptanceItem,
} from '../lib/api'

interface TestabilityContractReportProps {
    contract: TestabilityContract
    testId: string
    onApprove: () => void
    isApproving: boolean
    perTypeDiagnosis?: any // Added for narratives
}

// Confidence badge colors
const confidenceColors = {
    high: { bg: '#10b98120', text: '#10b981', border: '#10b981' },
    medium: { bg: '#f59e0b20', text: '#f59e0b', border: '#f59e0b' },
    low: { bg: '#ef444420', text: '#ef4444', border: '#ef4444' },
}

// Blocker type icons
const blockerIcons: Record<GlobalBlocker['type'], string> = {
    captcha: '🤖',
    mfa: '🔐',
    cross_origin_iframe: '🖼️',
    native_dialog: '💬',
    email_verification: '📧',
    payment_gateway: '💳',
}

// Test type display names
const testTypeLabels: Record<string, string> = {
    login: 'Login',
    signup: 'Sign Up',
    checkout: 'Checkout',
    form_submission: 'Form Submission',
    form: 'Forms',
    navigation: 'Navigation',
    search: 'Search',
    data_entry: 'Data Entry',
    file_upload: 'File Upload',
    custom: 'Custom',
    visual: 'Visual Testing',
    accessibility: 'Accessibility',
    performance: 'Performance',
    payment: 'Payment',
    settings: 'Settings',
    logout: 'Logout',
    rage_bait: 'Edge Case Testing',
}

export function TestabilityContractReport({
    contract,
    testId,
    onApprove,
    isApproving,
    perTypeDiagnosis,
}: TestabilityContractReportProps) {
    const confidenceStyle = confidenceColors[contract.overallConfidence]
    const blockingCount = contract.globalBlockers.filter(b => b.severity === 'blocking').length
    const warningCount = contract.globalBlockers.filter(b => b.severity === 'warning').length

    // Use AI analysis totals when available, otherwise fallback to contract data
    const totalTestable = perTypeDiagnosis?.perType
        ? perTypeDiagnosis.perType.reduce((sum: number, p: any) => sum + (p.canTest?.length || 0), 0)
        : contract.testTypeAnalysis.reduce((sum, t) => sum + t.testable.elements.length, 0)
    const totalConditional = contract.testTypeAnalysis.reduce(
        (sum, t) => sum + t.conditionallyTestable.elements.length, 0
    )
    const totalNotTestable = perTypeDiagnosis?.perType
        ? perTypeDiagnosis.perType.reduce((sum: number, p: any) => sum + (p.cannotTest?.length || 0), 0)
        : contract.testTypeAnalysis.reduce((sum, t) => sum + t.notTestable.elements.length, 0)

    return (
        <div style={{
            marginBottom: theme.spacing.lg,
            padding: theme.spacing.lg,
            backgroundColor: theme.bg.primary,
            maxWidth: '1280px',
            margin: '0 auto',
            color: theme.text.primary,
        }}>
            {/* Header */}
            <header style={{
                marginBottom: theme.spacing.xl,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        Testability Contract
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backgroundColor: confidenceStyle.bg,
                            color: confidenceStyle.text,
                            border: `1px solid ${confidenceStyle.border}`,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                        }}>
                            {contract.overallConfidence} confidence
                        </span>
                    </h1>
                    <p style={{ color: theme.text.secondary, marginTop: '0.5rem' }}>
                        {contract.pageTitle} — {contract.url}
                    </p>
                    <p style={{ color: theme.text.tertiary, fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        {contract.confidenceReason}
                    </p>
                </div>
                <button
                    onClick={onApprove}
                    disabled={isApproving || !contract.canProceed}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: contract.canProceed ? theme.accent.blue : theme.bg.tertiary,
                        color: contract.canProceed ? '#fff' : theme.text.secondary,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: contract.canProceed ? 'pointer' : 'not-allowed',
                        fontWeight: 600,
                        fontSize: '1rem',
                    }}
                >
                    {isApproving ? 'Starting...' : contract.canProceed ? 'Accept & Start Test' : 'Cannot Proceed'}
                </button>
            </header>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: theme.spacing.md,
                marginBottom: theme.spacing.xl,
            }}>
                <SummaryCard
                    label="✅ Testable"
                    value={totalTestable}
                    color={theme.accent.green}
                />
                <SummaryCard
                    label="⚠️ Conditional"
                    value={totalConditional}
                    color={theme.accent.orange}
                />
                <SummaryCard
                    label="❌ Not Testable"
                    value={totalNotTestable}
                    color={theme.accent.red}
                />
                <SummaryCard
                    label="🚫 Blockers"
                    value={blockingCount}
                    color={blockingCount > 0 ? theme.accent.red : theme.text.secondary}
                />
                <SummaryCard
                    label="⚡ System Actions"
                    value={contract.systemActions.length}
                    color={theme.accent.blue}
                />
            </div>

            {/* Global Blockers */}
            {contract.globalBlockers.length > 0 && (
                <section style={{ marginBottom: theme.spacing.xl }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                        Global Blockers
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {contract.globalBlockers.map((blocker, idx) => (
                            <BlockerCard key={idx} blocker={blocker} />
                        ))}
                    </div>
                </section>
            )}

            {/* ========== NEW: Diagnosis Summary Section ========== */}
            {perTypeDiagnosis?.perType && perTypeDiagnosis.perType.length > 0 && (
                <section style={{ marginBottom: theme.spacing.xl }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                        📋 Diagnosis Summary
                    </h2>
                    <p style={{ color: theme.text.secondary, marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Here's what our AI analysis found for each test type in plain English:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {perTypeDiagnosis.perType.map((diag: any, idx: number) => (
                            <div key={idx} style={{
                                background: theme.bg.secondary,
                                borderRadius: '12px',
                                padding: '1.25rem',
                                borderLeft: `4px solid ${diag.narrative?.passed ? theme.accent.green : theme.accent.orange}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                                        {testTypeLabels[diag.testType] || diag.testType}
                                    </h3>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: diag.narrative?.passed ? `${theme.accent.green}20` : `${theme.accent.orange}20`,
                                        color: diag.narrative?.passed ? theme.accent.green : theme.accent.orange,
                                    }}>
                                        {diag.narrative?.passed ? '✓ Can Test' : '⚠ Limited'}
                                    </span>
                                </div>

                                {/* Narrative: What/How/Why/Result */}
                                {diag.narrative && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div>
                                            <strong style={{ color: theme.accent.blue, fontSize: '0.85rem' }}>What:</strong>
                                            <p style={{ margin: '0.25rem 0 0 0', color: theme.text.primary, lineHeight: 1.5 }}>
                                                {diag.narrative.what}
                                            </p>
                                        </div>
                                        <div>
                                            <strong style={{ color: theme.text.secondary, fontSize: '0.85rem' }}>How:</strong>
                                            <p style={{ margin: '0.25rem 0 0 0', color: theme.text.secondary, lineHeight: 1.5 }}>
                                                {diag.narrative.how}
                                            </p>
                                        </div>
                                        <div>
                                            <strong style={{ color: theme.text.secondary, fontSize: '0.85rem' }}>Why:</strong>
                                            <p style={{ margin: '0.25rem 0 0 0', color: theme.text.secondary, lineHeight: 1.5 }}>
                                                {diag.narrative.why}
                                            </p>
                                        </div>
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.75rem',
                                            background: diag.narrative.passed ? `${theme.accent.green}10` : `${theme.accent.orange}10`,
                                            borderRadius: '8px',
                                        }}>
                                            <strong style={{ color: diag.narrative.passed ? theme.accent.green : theme.accent.orange, fontSize: '0.85rem' }}>
                                                Result:
                                            </strong>
                                            <p style={{ margin: '0.25rem 0 0 0', color: theme.text.primary, fontWeight: 500, lineHeight: 1.5 }}>
                                                {diag.narrative.result}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Steps Performed */}
                                {diag.steps && diag.steps.length > 0 && (
                                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${theme.border.subtle}` }}>
                                        <strong style={{ color: theme.text.tertiary, fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
                                            Steps Performed:
                                        </strong>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {diag.steps.map((step: string, stepIdx: number) => (
                                                <span key={stepIdx} style={{
                                                    padding: '4px 10px',
                                                    background: theme.bg.tertiary,
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    color: theme.text.secondary,
                                                }}>
                                                    {stepIdx + 1}. {step}
                                                </span>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: theme.text.tertiary }}>
                                            Completed in {diag.duration}ms
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Test Type Capabilities - Now ONLY shows Can/Cannot Test lists */}
            <section style={{ marginBottom: theme.spacing.xl }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                    🔍 Testability Details
                </h2>
                <p style={{ color: theme.text.secondary, marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Expand each test type to see exactly what can and cannot be tested:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {contract.testTypeAnalysis.map((capability, idx) => {
                        const perTypeDiag = perTypeDiagnosis?.perType?.find((p: any) => p.testType === capability.testType)
                        return (
                            <TestTypeCard key={idx} capability={capability} perTypeDiag={perTypeDiag} />
                        )
                    })}
                </div>
            </section>

            {/* System Actions */}
            {contract.systemActions.length > 0 && (
                <section style={{ marginBottom: theme.spacing.xl }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                        System Adaptations
                    </h2>
                    <div style={{
                        background: theme.bg.secondary,
                        borderRadius: '12px',
                        padding: '1rem',
                    }}>
                        {contract.systemActions.map((action, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 0',
                                borderBottom: idx < contract.systemActions.length - 1 ? `1px solid ${theme.border.subtle}` : 'none',
                            }}>
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    backgroundColor: theme.accent.blue + '20',
                                    color: theme.accent.blue,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    fontFamily: 'monospace',
                                }}>
                                    {action.action.replace(/_/g, ' ')}
                                </span>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{action.target}</div>
                                    <div style={{ fontSize: '0.85rem', color: theme.text.secondary }}>{action.reason}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Risk Acceptance */}
            {contract.riskAcceptance.filter(r => r.userMustAccept).length > 0 && (
                <section style={{ marginBottom: theme.spacing.xl }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                        Risks to Accept
                    </h2>
                    <div style={{
                        background: '#f59e0b10',
                        border: '1px solid #f59e0b40',
                        borderRadius: '12px',
                        padding: '1rem',
                    }}>
                        {contract.riskAcceptance.filter(r => r.userMustAccept).map((risk, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.5rem 0',
                            }}>
                                <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{risk.risk}</div>
                                    <div style={{ fontSize: '0.85rem', color: theme.text.secondary }}>{risk.impact}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: theme.spacing.md,
                borderTop: `1px solid ${theme.border.subtle}`,
                color: theme.text.tertiary,
                fontSize: '0.85rem',
            }}>
                <span>Analyzed in {contract.duration}ms</span>
                <span>{new Date(contract.analyzedAt).toLocaleString()}</span>
            </footer>
        </div>
    )
}

// Sub-components
function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div style={{
            background: theme.bg.secondary,
            padding: '1.25rem',
            borderRadius: '12px',
            textAlign: 'center',
        }}>
            <div style={{ color: theme.text.secondary, fontSize: '0.85rem', marginBottom: '0.5rem' }}>{label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{value}</div>
        </div>
    )
}

function BlockerCard({ blocker }: { blocker: GlobalBlocker }) {
    const isBlocking = blocker.severity === 'blocking'
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: isBlocking ? '#ef444420' : '#f59e0b15',
            border: `1px solid ${isBlocking ? '#ef444450' : '#f59e0b40'}`,
            borderRadius: '10px',
        }}>
            <span style={{ fontSize: '1.5rem' }}>{blockerIcons[blocker.type] || '⚠️'}</span>
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem',
                }}>
                    <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                        {blocker.type.replace(/_/g, ' ')}
                    </span>
                    <span style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: isBlocking ? theme.accent.red : theme.accent.orange,
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                    }}>
                        {blocker.severity}
                    </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: theme.text.secondary }}>{blocker.impact}</div>
                {blocker.location && (
                    <div style={{ fontSize: '0.8rem', color: theme.text.tertiary, marginTop: '0.25rem' }}>
                        📍 {blocker.location}
                    </div>
                )}
            </div>
        </div>
    )
}

function TestTypeCard({ capability, perTypeDiag }: { capability: TestTypeCapability, perTypeDiag?: any }) {
    const [expanded, setExpanded] = React.useState(false)

    // Use AI analysis counts when available, fallback to capability counts
    const canTestCount = perTypeDiag?.canTest?.length ?? capability.testable.elements.length
    const cannotTestCount = perTypeDiag?.cannotTest?.length ?? capability.notTestable.elements.length
    const conditionalCount = capability.conditionallyTestable.elements.length
    const total = canTestCount + conditionalCount + cannotTestCount

    const testablePercent = total > 0 ? (canTestCount / total) * 100 : 0

    return (
        <div style={{
            background: theme.bg.secondary,
            borderRadius: '12px',
            overflow: 'hidden',
        }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {testTypeLabels[capability.testType] || capability.testType}
                    </span>
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '15px',
                        backgroundColor: confidenceColors[capability.testable.confidence].bg,
                        color: confidenceColors[capability.testable.confidence].text,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                    }}>
                        {capability.testable.confidence} confidence
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <span style={{ color: theme.accent.green }}>✅ {canTestCount}</span>
                        <span style={{ color: theme.accent.orange }}>⚠️ {conditionalCount}</span>
                        <span style={{ color: theme.accent.red }}>❌ {cannotTestCount}</span>
                    </div>
                    <span style={{ color: theme.text.secondary }}>{expanded ? '▲' : '▼'}</span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                height: '4px',
                background: theme.bg.tertiary,
                display: 'flex',
            }}>
                <div style={{ width: `${testablePercent}%`, background: theme.accent.green }} />
                <div style={{ width: `${(conditionalCount / total) * 100}%`, background: theme.accent.orange }} />
                <div style={{ width: `${(cannotTestCount / total) * 100}%`, background: theme.accent.red }} />
            </div>

            {expanded && (
                <div style={{ padding: '1rem 1.25rem', borderTop: `1px solid ${theme.border.subtle}` }}>

                    {/* Note: Narrative (What/How/Why/Result) is now shown in the Diagnosis Summary section above */}

                    {/* AI Cannot Test Analysis */}
                    {perTypeDiag?.cannotTest?.length > 0 && (
                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${theme.border.subtle}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '1.1rem' }}>🚫</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.accent.red }}>
                                    Cannot Be Tested ({perTypeDiag.cannotTest.length} elements)
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {perTypeDiag.cannotTest.map((item: any, i: number) => (
                                    <div key={i} style={{
                                        padding: '10px 14px',
                                        background: `${theme.accent.red}10`,
                                        borderRadius: '8px',
                                        borderLeft: `3px solid ${theme.accent.red}`,
                                    }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: theme.text.primary, marginBottom: '4px' }}>
                                            {item.name || item.element || 'Unknown Element'}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: theme.text.secondary }}>
                                            <strong>Reason:</strong> {item.reason || 'No reason provided'}
                                        </div>
                                        {item.selector && (
                                            <div style={{ fontSize: '0.75rem', color: theme.text.tertiary, marginTop: '4px', fontFamily: 'monospace' }}>
                                                Selector: {item.selector}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* AI Can Test Analysis */}
                    {perTypeDiag?.canTest?.length > 0 && (
                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${theme.border.subtle}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '1.1rem' }}>✅</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.accent.green }}>
                                    Can Be Tested ({perTypeDiag.canTest.length} elements)
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {perTypeDiag.canTest.slice(0, 15).map((item: any, i: number) => (
                                    <span key={i} style={{
                                        padding: '6px 12px',
                                        background: `${theme.accent.green}15`,
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: theme.accent.green,
                                    }}>
                                        {item.name || item.element || item}
                                    </span>
                                ))}
                                {perTypeDiag.canTest.length > 15 && (
                                    <span style={{ fontSize: '0.8rem', color: theme.text.secondary }}>
                                        +{perTypeDiag.canTest.length - 15} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Testable */}
                    {canTestCount > 0 && (
                        <ElementList
                            title="✅ Testable Elements"
                            elements={capability.testable.elements}
                            color={theme.accent.green}
                        />
                    )}

                    {/* Conditionally Testable */}
                    {conditionalCount > 0 && (
                        <>
                            <ElementList
                                title="⚠️ Conditionally Testable"
                                elements={capability.conditionallyTestable.elements}
                                color={theme.accent.orange}
                            />
                            {capability.conditionallyTestable.conditions.length > 0 && (
                                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                                    <div style={{ fontSize: '0.85rem', color: theme.text.secondary, marginBottom: '0.25rem' }}>
                                        Conditions:
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', color: theme.text.secondary, fontSize: '0.85rem' }}>
                                        {capability.conditionallyTestable.conditions.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}

                    {/* Not Testable */}
                    {cannotTestCount > 0 && (
                        <>
                            <ElementList
                                title="❌ Not Testable"
                                elements={capability.notTestable.elements}
                                color={theme.accent.red}
                            />
                            {capability.notTestable.reasons.length > 0 && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <div style={{ fontSize: '0.85rem', color: theme.text.secondary, marginBottom: '0.25rem' }}>
                                        Reasons:
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', color: theme.accent.red, fontSize: '0.85rem' }}>
                                        {capability.notTestable.reasons.map((r, i) => (
                                            <li key={i}>{r}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

function ElementList({ title, elements, color }: {
    title: string
    elements: { name: string; selector?: string; reason: string; elementType?: string }[]
    color: string
}) {
    if (elements.length === 0) return null
    return (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color }}>{title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {elements.slice(0, 10).map((el, i) => (
                    <span
                        key={i}
                        title={`${el.reason}${el.selector ? `\nSelector: ${el.selector}` : ''}`}
                        style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: color + '20',
                            color: color,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'help',
                        }}
                    >
                        {el.elementType && <span style={{ opacity: 0.7 }}>{el.elementType}: </span>}
                        {el.name}
                    </span>
                ))}
                {elements.length > 10 && (
                    <span style={{ fontSize: '0.8rem', color: theme.text.secondary }}>
                        +{elements.length - 10} more
                    </span>
                )}
            </div>
        </div>
    )
}
