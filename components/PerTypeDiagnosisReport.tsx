'use client'

import React from 'react'
import { PerTypeDiagnosis, TestTypeDiagnosis, FrontendTestType } from '../lib/api'

interface PerTypeDiagnosisReportProps {
    perTypeDiagnosis: PerTypeDiagnosis
    selectedTestTypes: FrontendTestType[]
}

// Test type display names and icons
const TEST_TYPE_INFO: Record<FrontendTestType, { label: string; icon: string; color: string }> = {
    visual: { label: 'Visual Testing', icon: '🎨', color: '#8b5cf6' },
    login: { label: 'Login/Logout', icon: '🔐', color: '#3b82f6' },
    signup: { label: 'Sign Up', icon: '📝', color: '#10b981' },
    form: { label: 'Forms & Data Entry', icon: '📋', color: '#f59e0b' },
    navigation: { label: 'Navigation & Search', icon: '🧭', color: '#06b6d4' },
    accessibility: { label: 'Accessibility', icon: '♿', color: '#ec4899' },
    rage_bait: { label: 'Edge Cases', icon: '🎯', color: '#ef4444' },
}

// Colors for dark mode
const colors = {
    bg: { primary: '#0a0a0a', secondary: '#141414', tertiary: '#1f1f1f' },
    text: { primary: '#ffffff', secondary: '#a0a0a0', tertiary: '#6b7280' },
    border: { default: '#2d2d2d' }
}

export function PerTypeDiagnosisReport({ perTypeDiagnosis, selectedTestTypes }: PerTypeDiagnosisReportProps) {
    const { perType, combined, totalSteps, totalDuration } = perTypeDiagnosis

    return (
        <div style={{
            background: colors.bg.secondary,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
            }}>
                <h3 style={{ margin: 0, color: colors.text.primary, fontSize: '18px' }}>
                    Per-Type Diagnosis Results
                </h3>
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '14px',
                    color: colors.text.secondary
                }}>
                    <span>📊 {totalSteps} steps</span>
                    <span>⏱️ {Math.round(totalDuration)}ms</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <SummaryCard
                    label="Can Test"
                    value={combined.allCanTest.length}
                    color="#10b981"
                />
                <SummaryCard
                    label="Cannot Test"
                    value={combined.allCannotTest.length}
                    color="#ef4444"
                />
                <SummaryCard
                    label="Test Types"
                    value={perType.length}
                    color="#8b5cf6"
                />
            </div>

            {/* Per-Type Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {perType.map((typeDiagnosis) => (
                    <TestTypeCard key={typeDiagnosis.testType} diagnosis={typeDiagnosis} />
                ))}
            </div>
        </div>
    )
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
            <div style={{ fontSize: '12px', color: colors.text.secondary }}>{label}</div>
        </div>
    )
}

function TestTypeCard({ diagnosis }: { diagnosis: TestTypeDiagnosis }) {
    const info = TEST_TYPE_INFO[diagnosis.testType] || {
        label: diagnosis.testType,
        icon: '📋',
        color: '#6b7280'
    }

    const [isExpanded, setIsExpanded] = React.useState(false)

    return (
        <div style={{
            background: colors.bg.tertiary,
            border: `1px solid ${info.color}30`,
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            {/* Card Header */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: isExpanded ? `1px solid ${colors.border.default}` : 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{info.icon}</span>
                    <span style={{ fontWeight: 500, color: colors.text.primary }}>{info.label}</span>
                    <span style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        background: `${info.color}20`,
                        color: info.color,
                        borderRadius: '12px'
                    }}>
                        {diagnosis.steps.length} steps
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                        <span style={{ color: '#10b981' }}>✓ {diagnosis.canTest.length}</span>
                        <span style={{ color: '#ef4444' }}>✗ {diagnosis.cannotTest.length}</span>
                    </div>
                    <span style={{ color: colors.text.secondary, fontSize: '12px' }}>
                        {isExpanded ? '▼' : '▶'}
                    </span>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div style={{ padding: '16px' }}>
                    {/* Can Test */}
                    {diagnosis.canTest.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{
                                margin: '0 0 8px 0',
                                fontSize: '13px',
                                color: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                ✓ Can Test ({diagnosis.canTest.length})
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {diagnosis.canTest.map((item, idx) => (
                                    <div key={idx} style={{
                                        background: '#10b98110',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        fontSize: '13px'
                                    }}>
                                        <strong style={{ color: colors.text.primary }}>{item.name}</strong>
                                        {item.description && (
                                            <div style={{ color: colors.text.secondary, marginTop: '2px' }}>
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cannot Test */}
                    {diagnosis.cannotTest.length > 0 && (
                        <div>
                            <h4 style={{
                                margin: '0 0 8px 0',
                                fontSize: '13px',
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                ✗ Cannot Test ({diagnosis.cannotTest.length})
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {diagnosis.cannotTest.map((item, idx) => (
                                    <div key={idx} style={{
                                        background: '#ef444410',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        fontSize: '13px'
                                    }}>
                                        <strong style={{ color: colors.text.primary }}>{item.name}</strong>
                                        {item.reason && (
                                            <div style={{ color: colors.text.secondary, marginTop: '2px' }}>
                                                {item.reason}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Steps Performed */}
                    {diagnosis.steps.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                            <h4 style={{
                                margin: '0 0 8px 0',
                                fontSize: '13px',
                                color: colors.text.secondary
                            }}>
                                Steps Performed
                            </h4>
                            <div style={{ fontSize: '12px', color: colors.text.tertiary }}>
                                {diagnosis.steps.join(' → ')}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
