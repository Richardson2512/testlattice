'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { theme } from '../lib/theme'

// Types
export interface DiagnosisIssue {
    id: number
    risk: 'Critical' | 'Major' | 'Minor' | 'Info'
    title: string
    description: string
    element: string
    type: string
    category: 'Security' | 'SEO' | 'Accessibility' | 'Performance' | 'Visual' | 'DOM' | 'Console' | 'Network' | 'Component' | 'Risk' | 'Other'
    page: string
    selector: string
    fix: string
    fixCode?: string
    isExpanded: boolean
    metadata?: Record<string, any>
}

// Helper Components
const getRiskIcon = (risk: string) => {
    const size = 16
    switch (risk) {
        case 'Critical':
            return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
        case 'Major':
            return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
        case 'Minor':
        case 'Info':
            return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
        default:
            return null
    }
}

// DiagnosisProgress type
interface DiagnosisProgress {
    step: number
    totalSteps: number
    stepLabel: string
    subStepLabel?: string
    percent: number
}

export function DiagnosisReport({ diagnosis, testId, onApprove, isApproving, isDiagnosisComplete = false, diagnosisProgress, perTypeDiagnosis, hideApproveButton = false }: {
    diagnosis: any,
    testId: string,
    onApprove: () => void,
    isApproving: boolean,
    isDiagnosisComplete?: boolean // Only show Approve button when diagnosis is complete
    diagnosisProgress?: DiagnosisProgress | null // Real-time progress updates
    perTypeDiagnosis?: any // Per-test-type diagnosis data
    hideApproveButton?: boolean // Hide the approve button (if another component handles it)
}) {
    const [filteredData, setFilteredData] = useState<DiagnosisIssue[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [riskFilter, setRiskFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const convertDiagnosisToIssues = useMemo((): DiagnosisIssue[] => {
        const issues: DiagnosisIssue[] = []
        let idCounter = 1

        // Handle null/undefined diagnosis
        if (diagnosis?.highRiskAreas) {
            diagnosis.highRiskAreas.forEach((area: any) => {
                const riskMap: Record<string, 'Critical' | 'Major' | 'Minor' | 'Info'> = {
                    'critical': 'Critical', 'high': 'Major', 'medium': 'Minor', 'low': 'Info'
                }
                issues.push({
                    id: idCounter++,
                    risk: riskMap[area.riskLevel] || 'Info',
                    title: area.name,
                    description: area.description,
                    element: area.name,
                    type: area.type?.replace(/_/g, ' ') || 'Unknown',
                    category: 'Risk',
                    page: diagnosis.pages?.[0]?.label || 'Unknown Page',
                    selector: area.selector || 'N/A',
                    fix: area.requiresManualIntervention ? `Manual intervention required: ${area.reason}` : 'Review and address the risk area',
                    fixCode: area.selector ? `/* Selector: ${area.selector} */` : undefined,
                    isExpanded: false
                })
            })
        }

        // Convert comprehensive test results - Security issues
        if (diagnosis?.comprehensiveTests?.security) {
            diagnosis.comprehensiveTests.security.forEach((security: any) => {
                const riskMap: Record<string, 'Critical' | 'Major' | 'Minor' | 'Info'> = {
                    'high': 'Critical', 'medium': 'Major', 'low': 'Minor'
                }
                issues.push({
                    id: idCounter++,
                    risk: riskMap[security.severity] || 'Major',
                    title: `Security: ${security.type?.toUpperCase()} - ${security.message}`,
                    description: security.message,
                    element: security.element || 'Security',
                    type: 'Security',
                    category: 'Security',
                    page: 'All Pages',
                    selector: security.selector || security.url || 'N/A',
                    fix: security.fix || 'Review security configuration',
                    fixCode: security.url ? `/* URL: ${security.url} */` : undefined,
                    isExpanded: false,
                    metadata: { url: security.url, securityType: security.type }
                })
            })
        }

        if (diagnosis?.comprehensiveTests?.consoleErrors) {
            diagnosis.comprehensiveTests.consoleErrors
                .filter((err: any) => err.type === 'error' || err.type === 'warning')
                .forEach((err: any) => {
                    const riskMap: Record<string, 'Critical' | 'Major' | 'Minor' | 'Info'> = {
                        'error': 'Major', 'warning': 'Minor', 'info': 'Info'
                    }
                    issues.push({
                        id: idCounter++,
                        risk: riskMap[err.type] || 'Info',
                        title: `Console ${err.type}: ${err.message.substring(0, 60)}${err.message.length > 60 ? '...' : ''}`,
                        description: err.message,
                        element: 'Console',
                        type: 'Console Error',
                        category: 'Console',
                        page: err.source ? new URL(err.source).pathname : 'All Pages',
                        selector: err.source || 'N/A',
                        fix: `Fix JavaScript ${err.type}`,
                        isExpanded: false
                    })
                })
        }

        // Fallback
        if (issues.length === 0) {
            issues.push({
                id: idCounter++,
                risk: 'Info',
                title: 'No issues detected',
                description: 'The diagnosis found no critical issues. You can proceed with testing.',
                element: 'System',
                type: 'Info',
                category: 'Other',
                page: 'All Pages',
                selector: 'N/A',
                fix: 'No action required',
                isExpanded: false
            })
        }
        return issues
    }, [diagnosis])

    useEffect(() => {
        let filtered = [...convertDiagnosisToIssues]
        if (riskFilter) filtered = filtered.filter(issue => issue.risk === riskFilter)
        if (categoryFilter) filtered = filtered.filter(issue => issue.category === categoryFilter)
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(issue =>
                issue.title.toLowerCase().includes(term) ||
                issue.description.toLowerCase().includes(term)
            )
        }
        filtered.forEach(item => item.isExpanded = false)
        setFilteredData(filtered)
    }, [searchTerm, riskFilter, categoryFilter, convertDiagnosisToIssues])

    const toggleDetails = (id: number) => {
        setFilteredData(prev => prev.map(issue =>
            issue.id === id ? { ...issue, isExpanded: !issue.isExpanded } : issue
        ))
    }

    const getRiskClass = (risk: string) => {
        switch (risk) {
            case 'Critical': return { bg: theme.status.error.bg, color: theme.status.error.text, border: theme.status.error.border }
            case 'Major': return { bg: theme.status.warning.bg, color: theme.status.warning.text, border: theme.status.warning.border }
            case 'Minor': return { bg: theme.status.info.bg, color: theme.status.info.text, border: theme.status.info.border }
            default: return { bg: theme.bg.tertiary, color: theme.text.secondary, border: theme.border.default }
        }
    }

    // Summary Data Calculation
    const summaryData = useMemo(() => {
        const issues = convertDiagnosisToIssues
        const critical = issues.filter(i => i.risk === 'Critical').length
        const major = issues.filter(i => i.risk === 'Major').length
        const total = issues.length
        // Fake health score
        const healthScore = Math.max(0, 100 - (critical * 10) - (major * 5))
        return { healthScore, critical, major, total }
    }, [convertDiagnosisToIssues])

    return (
        <div style={{ marginBottom: theme.spacing.lg, padding: theme.spacing.lg, backgroundColor: theme.bg.primary, maxWidth: '1280px', margin: '0 auto', color: theme.text.primary }}>

            {/* Header */}
            <header style={{ marginBottom: theme.spacing.xl, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0 }}>Automated UI Diagnosis Report</h1>
                    <p style={{ color: theme.text.secondary, marginTop: '0.5rem' }}>Summary of high-risk and actionable findings.</p>
                </div>
                {!hideApproveButton && (
                    <button onClick={onApprove} disabled={isApproving || !isDiagnosisComplete} style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: isDiagnosisComplete ? theme.accent.blue : theme.bg.tertiary,
                        color: isDiagnosisComplete ? '#fff' : theme.text.secondary,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isDiagnosisComplete ? 'pointer' : 'not-allowed',
                        fontWeight: 600,
                        opacity: isDiagnosisComplete ? 1 : 0.6
                    }}>
                        {!isDiagnosisComplete ? 'Diagnosis in progress...' : isApproving ? 'Starting...' : 'Approve & Start Test'}
                    </button>
                )}
            </header>

            {/* Progress Bar - Embedded below title when diagnosis is in progress */}
            {
                !isDiagnosisComplete && diagnosisProgress && (
                    <div style={{
                        padding: theme.spacing.lg,
                        background: theme.bg.secondary,
                        borderRadius: '12px',
                        marginBottom: theme.spacing.xl,
                        border: `1px solid ${theme.border.default}`,
                    }}>
                        {/* Header with step info */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: theme.spacing.md,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: `3px solid ${theme.accent.blue}30`,
                                    borderTopColor: theme.accent.blue,
                                    borderRadius: '50%',
                                    animation: 'diagSpin 1s linear infinite',
                                }} />
                                <span style={{
                                    color: theme.text.secondary,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                }}>
                                    Step {diagnosisProgress.step} of {diagnosisProgress.totalSteps}
                                </span>
                            </div>
                            <span style={{
                                color: theme.accent.blue,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            }}>
                                {diagnosisProgress.percent}%
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div style={{
                            height: '8px',
                            background: theme.bg.tertiary,
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: theme.spacing.md,
                        }}>
                            <div style={{
                                height: '100%',
                                width: `${diagnosisProgress.percent}%`,
                                background: `linear-gradient(90deg, ${theme.accent.blue}, ${theme.accent.purple || '#8B5CF6'})`,
                                borderRadius: '4px',
                                transition: 'width 0.3s ease-out',
                            }} />
                        </div>

                        {/* Current step description */}
                        <p style={{
                            color: theme.text.primary,
                            fontWeight: 500,
                            fontSize: '1rem',
                            margin: 0,
                        }}>
                            {diagnosisProgress.stepLabel}
                        </p>
                        {diagnosisProgress.subStepLabel && (
                            <p style={{
                                color: theme.text.secondary,
                                fontSize: '0.875rem',
                                margin: '4px 0 0',
                            }}>
                                {diagnosisProgress.subStepLabel}
                            </p>
                        )}
                        <style>{`
                        @keyframes diagSpin { to { transform: rotate(360deg); } }
                    `}</style>
                    </div>
                )
            }

            {/* Summary Cards - Show loading placeholders when diagnosis in progress */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing.md, marginBottom: theme.spacing.xl }}>
                <div style={{ background: theme.bg.secondary, padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ color: theme.text.secondary, fontSize: '0.9rem' }}>Health Score</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: !isDiagnosisComplete ? theme.text.secondary : (summaryData.healthScore > 80 ? theme.accent.green : theme.accent.red) }}>
                        {!isDiagnosisComplete ? '--' : `${summaryData.healthScore}%`}
                    </div>
                </div>
                <div style={{ background: theme.bg.secondary, padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ color: theme.text.secondary, fontSize: '0.9rem' }}>Critical Issues</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: !isDiagnosisComplete ? theme.text.secondary : theme.accent.red }}>
                        {!isDiagnosisComplete ? '--' : summaryData.critical}
                    </div>
                </div>
                <div style={{ background: theme.bg.secondary, padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ color: theme.text.secondary, fontSize: '0.9rem' }}>Major Issues</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: !isDiagnosisComplete ? theme.text.secondary : theme.accent.orange }}>
                        {!isDiagnosisComplete ? '--' : summaryData.major}
                    </div>
                </div>
                <div style={{ background: theme.bg.secondary, padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ color: theme.text.secondary, fontSize: '0.9rem' }}>Total Findings</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: !isDiagnosisComplete ? theme.text.secondary : theme.accent.blue }}>
                        {!isDiagnosisComplete ? '--' : summaryData.total}
                    </div>
                </div>
            </div>

            {/* Per-Test-Type Diagnosis Narratives */}
            {
                diagnosis?.perTypeDiagnosis?.perType && diagnosis.perTypeDiagnosis.perType.length > 0 && (
                    <div style={{ marginBottom: theme.spacing.xl }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: theme.spacing.md }}>
                            Diagnosis by Test Type
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                            {(perTypeDiagnosis?.perType || diagnosis?.perTypeDiagnosis?.perType || []).map((typeDiag: any, idx: number) => {
                                const narrative = typeDiag.narrative
                                const testTypeLabel = typeDiag.testType?.replace(/_/g, ' ').toUpperCase() || 'UNKNOWN'
                                const passed = narrative?.passed ?? (typeDiag.canTest?.length > typeDiag.cannotTest?.length)
                                const testTypeIcons: Record<string, string> = {
                                    visual: '🎨', navigation: '🧭', login: '🔐', signup: '📝',
                                    form: '📋', accessibility: '♿', rage_bait: '💢'
                                }
                                const icon = testTypeIcons[typeDiag.testType] || '🔍'

                                return (
                                    <div key={idx} style={{
                                        background: theme.bg.secondary,
                                        borderRadius: '12px',
                                        padding: theme.spacing.lg,
                                        borderLeft: `4px solid ${passed ? theme.accent.green : theme.accent.red}`
                                    }}>
                                        {/* Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span>{icon}</span> {testTypeLabel} TEST DIAGNOSIS
                                            </h3>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                backgroundColor: passed ? `${theme.accent.green}20` : `${theme.accent.red}20`,
                                                color: passed ? theme.accent.green : theme.accent.red
                                            }}>
                                                {passed ? 'PASSED' : 'FAILED'}
                                            </span>
                                        </div>

                                        {/* Narrative Sections */}
                                        {narrative ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                                                <div>
                                                    <div style={{ color: theme.accent.blue, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                                        What is being diagnosed?
                                                    </div>
                                                    <p style={{ margin: 0, color: theme.text.primary, fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                        {narrative.what}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div style={{ color: theme.accent.blue, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                                        How is it being diagnosed?
                                                    </div>
                                                    <p style={{ margin: 0, color: theme.text.primary, fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                        {narrative.how}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div style={{ color: theme.accent.blue, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                                        Why is it being diagnosed?
                                                    </div>
                                                    <p style={{ margin: 0, color: theme.text.primary, fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                        {narrative.why}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div style={{ color: passed ? theme.accent.green : theme.accent.red, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                                        Result
                                                    </div>
                                                    <p style={{ margin: 0, color: theme.text.primary, fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
                                                        {narrative.result}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Fallback: show canTest/cannotTest if no narrative */
                                            <div style={{ color: theme.text.secondary, fontSize: '0.9rem' }}>
                                                <p style={{ margin: '0 0 0.5rem 0' }}>
                                                    <strong>Can test:</strong> {typeDiag.canTest?.length || 0} elements
                                                </p>
                                                <p style={{ margin: 0 }}>
                                                    <strong>Cannot test:</strong> {typeDiag.cannotTest?.map((c: any) => c.name).join(', ') || 'None'}
                                                </p>
                                            </div>
                                        )}

                                        {/* Detailed Technical Breakdown (Always Visible on Expand) */}
                                        <div style={{ marginTop: theme.spacing.lg, paddingTop: theme.spacing.lg, borderTop: `1px solid ${theme.border.subtle}` }}>
                                            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: theme.text.tertiary, marginBottom: theme.spacing.md, letterSpacing: '0.05em' }}>
                                                Technical Analysis
                                            </h4>

                                            {/* Can Test Elements */}
                                            {typeDiag.canTest?.length > 0 && (
                                                <div style={{ marginBottom: theme.spacing.md }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                        <span style={{ color: theme.accent.green }}>✅</span>
                                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.text.primary }}>
                                                            Testable Elements ({typeDiag.canTest.length})
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '24px' }}>
                                                        {typeDiag.canTest.slice(0, 50).map((el: any, i: number) => (
                                                            <span key={i} title={el.selector} style={{
                                                                padding: '4px 10px',
                                                                borderRadius: '6px',
                                                                background: `${theme.accent.green}15`,
                                                                color: theme.accent.green,
                                                                fontSize: '0.8rem',
                                                                fontFamily: 'monospace',
                                                                border: `1px solid ${theme.accent.green}30`,
                                                                cursor: 'help'
                                                            }}>
                                                                {el.name || el.selector || 'Element'}
                                                            </span>
                                                        ))}
                                                        {typeDiag.canTest.length > 50 && (
                                                            <span style={{ fontSize: '0.8rem', color: theme.text.tertiary, display: 'flex', alignItems: 'center' }}>
                                                                +{typeDiag.canTest.length - 50} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Cannot Test Elements */}
                                            {typeDiag.cannotTest?.length > 0 && (
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                        <span style={{ color: theme.accent.red }}>❌</span>
                                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.text.primary }}>
                                                            Not Testable ({typeDiag.cannotTest.length})
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '24px' }}>
                                                        {typeDiag.cannotTest.map((el: any, i: number) => (
                                                            <div key={i} style={{
                                                                padding: '8px 12px',
                                                                borderRadius: '8px',
                                                                background: `${theme.accent.red}10`,
                                                                border: `1px solid ${theme.accent.red}20`,
                                                                fontSize: '0.85rem'
                                                            }}>
                                                                <div style={{ fontWeight: 600, color: theme.text.primary, marginBottom: '2px' }}>
                                                                    {el.name || el.selector || 'Unknown Element'}
                                                                </div>
                                                                {el.reason && (
                                                                    <div style={{ color: theme.accent.red }}>
                                                                        {el.reason}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.border.default}`, background: theme.bg.secondary, color: theme.text.primary }}
                />
                <select
                    value={riskFilter}
                    onChange={e => setRiskFilter(e.target.value)}
                    style={{ padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.border.default}`, background: theme.bg.secondary, color: theme.text.primary }}
                >
                    <option value="">All Risks</option>
                    <option value="Critical">Critical</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                </select>
            </div>

            {/* Table */}
            <div style={{ background: theme.bg.secondary, borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: theme.bg.tertiary, color: theme.text.secondary, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Risk</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Issue Title</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Fix</th>
                            <th style={{ padding: '1rem' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(issue => {
                            const style = getRiskClass(issue.risk)
                            return (
                                <React.Fragment key={issue.id}>
                                    <tr onClick={() => toggleDetails(issue.id)} style={{ cursor: 'pointer', borderBottom: `1px solid ${theme.border.subtle}` }}>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '4px 8px', borderRadius: '12px', background: style.bg, color: style.color, fontSize: '0.75rem', fontWeight: 600 }}>
                                                {issue.risk}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{issue.title}</td>
                                        <td style={{ padding: '1rem', color: theme.text.secondary }}>{issue.category}</td>
                                        <td style={{ padding: '1rem', color: theme.text.secondary, fontSize: '0.9rem' }}>{issue.fix}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>{issue.isExpanded ? '▲' : '▼'}</td>
                                    </tr>
                                    {issue.isExpanded && (
                                        <tr style={{ background: theme.bg.tertiary }}>
                                            <td colSpan={5} style={{ padding: '1rem' }}>
                                                <div style={{ fontSize: '0.9rem', color: theme.text.secondary }}>
                                                    <strong>Description:</strong> {issue.description}<br /><br />
                                                    {issue.fixCode && (
                                                        <pre style={{ background: '#000', padding: '1rem', borderRadius: '8px', color: '#10b981', overflowX: 'auto' }}>
                                                            {issue.fixCode}
                                                        </pre>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div >
    )
}
