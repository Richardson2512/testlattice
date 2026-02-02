'use client'

import React, { useEffect, useState, useRef } from 'react'

// DiagnosisProgress type matching API
interface DiagnosisProgress {
    step: number
    totalSteps: number
    stepLabel: string
    subStep: number
    totalSubSteps: number
    subStepLabel?: string
    percent: number
}

interface LogEntry {
    id: number
    timestamp: Date
    message: string
    type: 'info' | 'success' | 'progress' | 'ai'
}

interface DiagnosisProgressBarProps {
    progress: DiagnosisProgress | null | undefined
}

// Human-friendly commentary mapping
function getCommentary(stepLabel: string, subStepLabel?: string, step?: number): string {
    // Make technical terms more user-friendly
    const labelLower = stepLabel.toLowerCase()

    if (labelLower.includes('initializing') || labelLower.includes('reserving')) {
        return '🚀 Spinning up a secure browser environment for your site...'
    }
    if (labelLower.includes('session ready')) {
        return '✅ Browser ready! Preparing to visit your website...'
    }
    if (labelLower.includes('loading') || labelLower.includes('navigating')) {
        const url = stepLabel.match(/https?:\/\/[^\s]+/)?.[0] || 'your site'
        return `🌐 Navigating to ${url}...`
    }
    if (labelLower.includes('page loaded')) {
        return '✅ Page loaded successfully! Now scanning for testable elements...'
    }
    if (labelLower.includes('capturing screenshot')) {
        const match = stepLabel.match(/(\d+)\/(\d+)/)
        if (match) {
            return `📸 Capturing full-page screenshot (${match[1]} of ${match[2]})...`
        }
        return '📸 Taking screenshots of your page...'
    }
    if (labelLower.includes('analyzing') || labelLower.includes('ai analysis')) {
        return '🤖 AI is analyzing your page structure and identifying testable elements...'
    }
    if (labelLower.includes('running per-test-type')) {
        return '🔬 Running specialized analysis for each test category...'
    }
    if (labelLower.includes('diagnosis completed') || labelLower.includes('complete')) {
        return '✅ Analysis complete! Preparing your testability report...'
    }
    if (labelLower.includes('awaiting')) {
        return '⏸️ Analysis finished - waiting for your approval to proceed...'
    }
    if (labelLower.includes('testability contract')) {
        return '📋 Generating testability contract with detailed findings...'
    }
    if (labelLower.includes('visual')) {
        return '👁️ Checking visual elements: images, layout, CSS, and SEO meta tags...'
    }
    if (labelLower.includes('navigation')) {
        return '🧭 Mapping navigation structure: menus, links, and page flow...'
    }
    if (labelLower.includes('accessibility')) {
        return '♿ Auditing accessibility: ARIA, labels, heading structure, contrast...'
    }
    if (labelLower.includes('form')) {
        return '📝 Detecting forms: inputs, validation, and submission flows...'
    }
    if (labelLower.includes('login')) {
        return '🔐 Looking for login forms and authentication flows...'
    }

    // Default: return the original label with emoji prefix
    return `🔍 ${stepLabel}`
}

export function DiagnosisProgressBar({ progress }: DiagnosisProgressBarProps) {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [lastStepLabel, setLastStepLabel] = useState<string>('')
    const logContainerRef = useRef<HTMLDivElement>(null)
    const logIdRef = useRef(0)

    // Add log entry when progress changes
    useEffect(() => {
        if (!progress) return

        const currentLabel = `${progress.stepLabel}|${progress.subStepLabel || ''}`

        if (currentLabel !== lastStepLabel) {
            setLastStepLabel(currentLabel)

            const commentary = getCommentary(progress.stepLabel, progress.subStepLabel, progress.step)

            // Determine log type
            let type: LogEntry['type'] = 'info'
            if (commentary.includes('✅')) type = 'success'
            else if (commentary.includes('🤖') || commentary.includes('AI')) type = 'ai'
            else if (commentary.includes('📸') || commentary.includes('🔬')) type = 'progress'

            const newLog: LogEntry = {
                id: ++logIdRef.current,
                timestamp: new Date(),
                message: commentary,
                type
            }

            setLogs(prev => [...prev.slice(-15), newLog]) // Keep last 15 entries
        }
    }, [progress, lastStepLabel])

    // Auto-scroll to bottom
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs])

    // Default state when no progress yet
    if (!progress) {
        return (
            <div style={{
                padding: '24px',
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                maxWidth: '600px',
                margin: '20px auto',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid rgba(0, 117, 255, 0.2)',
                        borderTopColor: 'var(--primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        Starting diagnosis...
                    </span>
                </div>
                <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
            </div>
        )
    }

    const { step, totalSteps, stepLabel, subStepLabel, percent } = progress

    const getLogColor = (type: LogEntry['type']) => {
        switch (type) {
            case 'success': return '#10b981'
            case 'ai': return '#8b5cf6'
            case 'progress': return '#f59e0b'
            default: return 'var(--text-secondary)'
        }
    }

    return (
        <div style={{
            padding: '24px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            maxWidth: '600px',
            margin: '20px auto',
        }}>
            {/* Header with step info */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid rgba(0, 117, 255, 0.2)',
                        borderTopColor: 'var(--primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <span style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                    }}>
                        Step {step} of {totalSteps}
                    </span>
                </div>
                <span style={{
                    color: 'var(--primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                }}>
                    {percent}%
                </span>
            </div>

            {/* Progress bar */}
            <div style={{
                height: '8px',
                background: 'var(--bg-secondary)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '16px',
            }}>
                <div style={{
                    height: '100%',
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg, var(--primary), var(--primary-light, #4da3ff))',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease-out',
                }} />
            </div>

            {/* Current step description */}
            <div style={{ marginBottom: '16px' }}>
                <p style={{
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    margin: 0,
                }}>
                    {stepLabel}
                </p>
                {subStepLabel && (
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        margin: '4px 0 0 0',
                    }}>
                        {subStepLabel}
                    </p>
                )}
            </div>

            {/* Live Commentary Log */}
            <div style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '16px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#10b981',
                        borderRadius: '50%',
                        animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Live Activity
                    </span>
                </div>

                <div
                    ref={logContainerRef}
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        background: 'var(--bg-secondary)',
                        borderRadius: '8px',
                        padding: '12px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.8rem',
                        lineHeight: '1.6',
                    }}
                >
                    {logs.length === 0 ? (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            Waiting for activity...
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div
                                key={log.id}
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: '6px',
                                    animation: 'fadeIn 0.3s ease-out',
                                }}
                            >
                                <span style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.7rem',
                                    opacity: 0.7,
                                    flexShrink: 0,
                                }}>
                                    {log.timestamp.toLocaleTimeString('en-US', {
                                        hour12: false,
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}
                                </span>
                                <span style={{ color: getLogColor(log.type) }}>
                                    {log.message}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    )
}

export default DiagnosisProgressBar
