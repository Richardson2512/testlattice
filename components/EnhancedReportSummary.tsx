'use client'

import React, { useState } from 'react'

// Types matching backend TestReportSummary
interface TestIssue {
    id: number
    category: 'Security' | 'Usability' | 'Performance' | 'Accessibility' | 'Functionality'
    title: string
    severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
    evidence: string[]
    affects: string
    impact: string
    screenshotUrl?: string
    timestamp: string
}

interface TestReportSummaryData {
    target: string
    issuesFound: number
    started: string
    duration: string
    narrative: string
    criticalIssues: TestIssue[]
    highIssues: TestIssue[]
    mediumIssues: TestIssue[]
    lowIssues: TestIssue[]
    infoIssues: TestIssue[]
    methodology: string[]
    stepsCompleted: number
    errorsFound: number
    warningsFound: number
}

interface EnhancedReportSummaryProps {
    summary: TestReportSummaryData | null
    onExportMarkdown?: () => void
}

// Severity badge colors
const severityColors: Record<string, { bg: string; text: string; border: string }> = {
    Critical: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: '#ef4444' },
    High: { bg: 'rgba(249, 115, 22, 0.15)', text: '#f97316', border: '#f97316' },
    Medium: { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308', border: '#eab308' },
    Low: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: '#22c55e' },
    Info: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: '#3b82f6' },
}

// Category badge colors
const categoryColors: Record<string, { bg: string; text: string }> = {
    Security: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
    Usability: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },
    Performance: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },
    Accessibility: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
    Functionality: { bg: 'rgba(20, 184, 166, 0.1)', text: '#14b8a6' },
}

function IssueCard({ issue }: { issue: TestIssue }) {
    const [expanded, setExpanded] = useState(false)
    const severity = severityColors[issue.severity] || severityColors.Info
    const category = categoryColors[issue.category] || categoryColors.Functionality

    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '1rem',
            marginBottom: '0.75rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                {/* Issue number */}
                <div style={{
                    minWidth: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: severity.bg,
                    color: severity.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                }}>
                    {issue.id}
                </div>

                <div style={{ flex: 1 }}>
                    {/* Title with badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: category.bg,
                            color: category.text,
                            textTransform: 'uppercase'
                        }}>
                            {issue.category}
                        </span>
                        <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: severity.bg,
                            color: severity.text,
                            border: `1px solid ${severity.border}`,
                            textTransform: 'uppercase'
                        }}>
                            {issue.severity}
                        </span>
                    </div>

                    {/* Title */}
                    <h4 style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: '0 0 0.5rem 0'
                    }}>
                        {issue.title}
                    </h4>

                    {/* Evidence */}
                    <ul style={{
                        margin: 0,
                        padding: '0 0 0 1.25rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)'
                    }}>
                        {issue.evidence.slice(0, expanded ? undefined : 2).map((ev, i) => (
                            <li key={i} style={{ marginBottom: '0.25rem' }}>{ev}</li>
                        ))}
                    </ul>

                    {issue.evidence.length > 2 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                padding: '0.25rem 0',
                                marginTop: '0.25rem'
                            }}
                        >
                            {expanded ? 'Show less' : `Show ${issue.evidence.length - 2} more...`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

function IssueSectionHeader({ title, count, severity }: { title: string; count: number; severity: string }) {
    const colors = severityColors[severity] || severityColors.Info
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
            marginBottom: '1rem'
        }}>
            <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0
            }}>
                {title}
            </h3>
            <span style={{
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: colors.bg,
                color: colors.text
            }}>
                {count}
            </span>
        </div>
    )
}

export function EnhancedReportSummary({ summary, onExportMarkdown }: EnhancedReportSummaryProps) {
    if (!summary) return null

    const totalIssues = summary.criticalIssues.length + summary.highIssues.length +
        summary.mediumIssues.length + summary.lowIssues.length + summary.infoIssues.length

    return (
        <div style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderBottom: '1px solid var(--border-light)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            margin: '0 0 0.5rem 0'
                        }}>
                            Execution Report for {summary.target}
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <span>• Target: <a href={summary.target} target="_blank" rel="noopener" style={{ color: 'var(--primary)' }}>{summary.target}</a></span>
                            <span>• Issues found: <strong style={{ color: totalIssues > 0 ? 'var(--error)' : 'var(--success)' }}>{totalIssues}</strong></span>
                            <span>• Started: {new Date(summary.started).toLocaleString()}</span>
                            <span>• Duration: {summary.duration}</span>
                        </div>
                    </div>

                    {onExportMarkdown && (
                        <button
                            onClick={onExportMarkdown}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-medium)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            📥 Markdown
                        </button>
                    )}
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                {/* AI Narrative Summary */}
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '1.5rem',
                    borderLeft: '4px solid var(--primary)'
                }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: '0 0 0.75rem 0'
                    }}>
                        🤖 Assistant Summary
                    </h3>
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        margin: 0
                    }}>
                        {summary.narrative}
                    </p>
                </div>

                {/* Issues by Severity */}
                {summary.criticalIssues.length > 0 && (
                    <>
                        <IssueSectionHeader title="Critical Issues (Block Core Functionality)" count={summary.criticalIssues.length} severity="Critical" />
                        {summary.criticalIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                    </>
                )}

                {summary.highIssues.length > 0 && (
                    <>
                        <IssueSectionHeader title="High Severity Issues" count={summary.highIssues.length} severity="High" />
                        {summary.highIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                    </>
                )}

                {summary.mediumIssues.length > 0 && (
                    <>
                        <IssueSectionHeader title="Medium Severity Issues" count={summary.mediumIssues.length} severity="Medium" />
                        {summary.mediumIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                    </>
                )}

                {summary.lowIssues.length > 0 && (
                    <>
                        <IssueSectionHeader title="Low Severity Issues" count={summary.lowIssues.length} severity="Low" />
                        {summary.lowIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                    </>
                )}

                {summary.infoIssues.length > 0 && (
                    <>
                        <IssueSectionHeader title="Informational" count={summary.infoIssues.length} severity="Info" />
                        {summary.infoIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                    </>
                )}

                {/* Testing Methodology */}
                {summary.methodology && summary.methodology.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '1rem'
                        }}>
                            Testing Methodology
                        </h3>
                        <ul style={{
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)'
                        }}>
                            {summary.methodology.map((item, i) => (
                                <li key={i} style={{
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-tertiary)',
                            marginTop: '1rem',
                            fontStyle: 'italic'
                        }}>
                            All issues have been documented with evidence from console logs, network traces, and verified user actions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
