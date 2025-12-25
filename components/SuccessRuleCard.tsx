'use client'

interface SuccessRuleCardProps {
    category: 'Performance' | 'Accessibility' | 'Security' | 'Visual'
    status: 'pass' | 'warning' | 'fail' | 'soft-fail'
    score?: number
    metrics: Array<{
        label: string
        value: string | number
        status: 'pass' | 'warning' | 'fail'
    }>
}

export function SuccessRuleCard({ category, status, score, metrics }: SuccessRuleCardProps) {
    // Map category to natural language titles and icons
    const config = {
        Performance: { title: 'Speed & Experience', icon: '⚡' },
        Accessibility: { title: 'Accessibility', icon: '♿' },
        Security: { title: 'Security Check', icon: '🛡️' },
        Visual: { title: 'Visual Polish', icon: '🎨' }
    }[category]

    // Map status to friendly badges
    const getStatusBadge = (s: string) => {
        switch (s) {
            case 'pass': return { text: 'Great', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
            case 'warning': return { text: 'Needs Review', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
            case 'soft-fail': return { text: 'Needs Review', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
            case 'fail': return { text: 'Issue Found', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
            default: return { text: 'Unknown', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)' }
        }
    }

    const badge = getStatusBadge(status)

    return (
        <div className="glass-card" style={{ padding: '1.25rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{config.icon}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{config.title}</span>
                </div>
                <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: badge.bg,
                    color: badge.color
                }}>
                    {badge.text}
                </div>
            </div>

            {score !== undefined && (
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{score}</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ 100</span>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {metrics.map((metric, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{metric.label}</span>
                        <span style={{
                            fontWeight: 500,
                            color: metric.status === 'pass' ? 'var(--success)' :
                                metric.status === 'warning' ? 'var(--warning)' : 'var(--error)'
                        }}>
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
