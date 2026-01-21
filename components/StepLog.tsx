import React from 'react'

// --- ICONS ---
const StepIcons = {
    Thought: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.6"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4h.01" /></svg>,
    Browser: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} /><path strokeWidth={2} d="M3 9h18" /></svg>,
    Click: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
    Type: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    Wait: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>,
    Check: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    Error: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    Warning: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f59e0b"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    Chevron: () => <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    Verification: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f59e0b"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    Skipped: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7280"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>,
}

// Severity color mapping
const getSeverityColor = (severity?: string) => {
    switch (severity) {
        case 'RED': return '#ef4444'
        case 'YELLOW': return '#f59e0b'
        case 'GREEN': return '#22c55e'
        default: return undefined
    }
}

const getSeverityBg = (severity?: string) => {
    switch (severity) {
        case 'RED': return 'rgba(239, 68, 68, 0.1)'
        case 'YELLOW': return 'rgba(245, 158, 11, 0.1)'
        default: return 'transparent'
    }
}

export const StepLog = ({ steps, status }: { steps: any[], status?: string }) => {
    const isRunning = status === 'RUNNING' || status === 'PENDING' || status === 'running' || status === 'pending' || status === 'queued'

    const getStepIcon = (step: any) => {
        // Use severity field if available (new structured output)
        if (step.severity) {
            if (step.execution_status === 'SKIPPED') return <StepIcons.Skipped />
            if (step.severity === 'RED') return <StepIcons.Error />
            if (step.severity === 'YELLOW') return <StepIcons.Warning />
            if (step.severity === 'GREEN') return <StepIcons.Check />
        }
        // Fallback to legacy logic
        if (step.action === 'navigate') return <StepIcons.Browser />
        if (step.action === 'click') return <StepIcons.Click />
        if (step.action === 'type') return <StepIcons.Type />
        if (step.action === 'wait') return <StepIcons.Wait />
        if (step.action === 'wait_verification') return <StepIcons.Verification />
        if (step.action === 'preflight') return <StepIcons.Check />
        if (step.action === 'error') return <StepIcons.Error />
        if (step.action === 'rage_bait_test') return step.success ? <StepIcons.Check /> : <StepIcons.Warning />
        if (step.action === 'summary') return <StepIcons.Thought />
        // Use success field for legacy steps
        if (step.success === false) return <StepIcons.Error />
        return <StepIcons.Thought />
    }

    const getStepDescription = (step: any) => {
        // NEW: Use note field from structured output if available
        if (step.note) {
            // Add appropriate emoji based on severity
            const emoji = step.severity === 'RED' ? '❌' : step.severity === 'YELLOW' ? '⚠️' : step.execution_status === 'SKIPPED' ? '⏭️' : '✅'
            return `${emoji} ${step.note}`
        }

        // If step failed (legacy), show the failure reason prominently
        if (step.success === false) {
            const reason = step.error || step.metadata?.message || step.metadata?.error || 'Check failed'
            const action = step.action?.replace(/_/g, ' ') || 'Step'
            return `❌ ${action}: ${reason}`
        }

        if (step.description) return step.description

        if (step.action === 'navigate') {
            return `Opened URL in Browser`
        }
        if (step.action === 'click') {
            return `Clicking ${step.target || step.selector || 'element'}`
        }
        if (step.action === 'type') {
            return `Typed '${step.value || '...'}' in Browser`
        }
        if (step.action === 'preflight') {
            return 'Running preflight checks (cookies, popups)'
        }
        if (step.action === 'wait') {
            return `Wait for ${step.value || '1'}s`
        }
        if (step.action === 'wait_verification') {
            return step.target || 'Waiting for verification...'
        }
        if (step.action === 'rage_bait_test') {
            return `🔥 ${step.target}`
        }
        if (step.action === 'summary') {
            return `📊 ${step.target}`
        }
        return step.description || step.action?.replace(/_/g, ' ') || 'Step'
    }

    const getSubtitle = (step: any) => {
        if (step.action === 'navigate' && step.value) {
            return step.value
        }
        if (step.selector) {
            return step.selector
        }
        return null
    }

    const getDuration = (step: any, index: number, allSteps: any[]) => {
        if (index === 0) return null
        const prevStep = allSteps[index - 1]
        if (prevStep?.timestamp && step?.timestamp) {
            const diff = new Date(step.timestamp).getTime() - new Date(prevStep.timestamp).getTime()
            const seconds = Math.round(diff / 1000)
            return seconds < 1 ? '<1s' : `${seconds}s`
        }
        return '<1s'
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    {/* Thought indicator (timing between steps) */}
                    {i > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                            <StepIcons.Chevron />
                            <StepIcons.Thought />
                            <span>Thought for {getDuration(step, i, steps)}</span>
                        </div>
                    )}

                    {/* Main Step Entry */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        borderRadius: '6px',
                        // Use severity-based styling for new format, fallback to legacy for old
                        background: step.severity
                            ? getSeverityBg(step.severity)
                            : (step.success === false || step.error) ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                        color: step.severity
                            ? (getSeverityColor(step.severity) || 'var(--text-primary)')
                            : (step.success === false || step.error) ? '#ef4444' : 'var(--text-primary)',
                    }}>
                        <StepIcons.Chevron />
                        {getStepIcon(step)}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 500 }}>{getStepDescription(step)}</span>
                            {getSubtitle(step) && (
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', opacity: 0.7 }}>
                                    {getSubtitle(step)}
                                </span>
                            )}
                        </div>
                        {/* View button for clickable steps */}
                        {(step.action === 'click' || step.action === 'navigate' || step.action === 'type') && step.screenshotUrl && (
                            <button style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>View</button>
                        )}
                    </div>
                </React.Fragment>
            ))}

            {/* Initializing State */}
            {steps.length === 0 && isRunning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <StepIcons.Chevron />
                    <StepIcons.Thought />
                    <span>Thought for &lt;1s</span>
                </div>
            )}

            {/* Processing State */}
            {isRunning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <StepIcons.Chevron />
                    <div className="spinner" style={{ width: '14px', height: '14px', border: '2px solid var(--text-muted)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ fontStyle: 'italic' }}>Processing...</span>
                </div>
            )}
        </div>
    )
}
