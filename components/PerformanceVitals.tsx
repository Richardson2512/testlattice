'use client'

interface PerformanceVitalsProps {
    metrics: {
        lcp?: number
        cls?: number
        fid?: number
    }
}

export function PerformanceVitals({ metrics }: PerformanceVitalsProps) {
    // Helpers to color-code metrics
    const getLcpStatus = (val?: number) => {
        if (!val && val !== 0) return { color: '#94a3b8', label: 'N/A' }
        if (val <= 2500) return { color: '#10b981', label: 'Good' }
        if (val <= 4000) return { color: '#f59e0b', label: 'Needs Improvement' }
        return { color: '#ef4444', label: 'Poor' }
    }

    const getClsStatus = (val?: number) => {
        if (!val && val !== 0) return { color: '#94a3b8', label: 'N/A' }
        if (val <= 0.1) return { color: '#10b981', label: 'Good' }
        if (val <= 0.25) return { color: '#f59e0b', label: 'Needs Improvement' }
        return { color: '#ef4444', label: 'Poor' }
    }

    const lcp = getLcpStatus(metrics.lcp)
    const cls = getClsStatus(metrics.cls)

    return (
        <div className="glass-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                ⚡ Performance Vitals
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* LCP -> Loading Speed */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Loading Speed (LCP)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: lcp.color, marginBottom: '0.25rem' }}>
                        {metrics.lcp ? `${(metrics.lcp / 1000).toFixed(2)}s` : 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: lcp.color }}>{lcp.label}</div>
                </div>

                {/* CLS -> Visual Stability */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Visual Stability (CLS)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: cls.color, marginBottom: '0.25rem' }}>
                        {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: cls.color }}>{cls.label}</div>
                </div>
            </div>
        </div>
    )
}
