import React from 'react'

export function BehaviorAddOnCard() {
    return (
        <div
            className="glass-card"
            style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(92, 15, 15, 0.03) 100%)',
                border: '1px solid var(--maroon-700)', // Distinct border color
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Badge */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'var(--maroon-100)',
                color: 'var(--maroon-900)',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                Coming Soon
            </div>

            <div>
                <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    color: 'var(--maroon-900)' // Distinct color
                }}>
                    Behavior Analysis
                </h4>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                }}>
                    Deep heuristic testing for AI safety, compliance, and persona adherence.
                </p>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                }}>
                    $20
                    <span style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 400
                    }}>
                        /20 tests
                    </span>
                </div>
            </div>

            <button
                disabled
                style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    textAlign: 'center',
                    background: 'var(--text-muted)', // Disabled look
                    color: 'var(--text-inverse)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    cursor: 'not-allowed',
                    opacity: 0.8,
                    fontSize: '0.875rem'
                }}
            >
                Available for Indie & Pro
            </button>

            <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                margin: 0
            }}>
                Requires active Indie or Pro plan.
            </p>
        </div>
    )
}
