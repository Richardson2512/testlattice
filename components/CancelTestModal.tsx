'use client'

import { useState } from 'react'

interface CancelTestModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => Promise<void>
    testUrl?: string
    testStatus?: string
}

export function CancelTestModal({
    isOpen,
    onClose,
    onConfirm,
    testUrl,
    testStatus
}: CancelTestModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm()
            onClose()
        } catch (error) {
            console.error('Failed to cancel test:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(61, 54, 48, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                    }}>
                        ⚠️
                    </div>
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            Cancel Test Run?
                        </h2>
                        <p style={{
                            margin: 0,
                            marginTop: '0.25rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)'
                        }}>
                            This action cannot be undone
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                    <p style={{
                        margin: 0,
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                    }}>
                        Are you sure you want to cancel this test run? The test will be stopped immediately and marked as cancelled.
                    </p>

                    {/* Test Details */}
                    {(testUrl || testStatus) && (
                        <div style={{
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.75rem 1rem',
                            marginBottom: '1rem',
                        }}>
                            {testUrl && (
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    marginBottom: testStatus ? '0.5rem' : 0,
                                    wordBreak: 'break-all',
                                }}>
                                    <span style={{ color: 'var(--text-muted)' }}>URL: </span>
                                    {testUrl}
                                </div>
                            )}
                            {testStatus && (
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span>Status: </span>
                                    <span style={{
                                        textTransform: 'capitalize',
                                        color: testStatus === 'running' ? 'var(--info)' : 'var(--text-secondary)'
                                    }}>
                                        {testStatus}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <p style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: 'var(--success)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span>✓</span>
                        Cancelled tests won't count toward your monthly quota
                    </p>
                </div>

                {/* Actions */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                }}>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        style={{
                            padding: '0.6rem 1.25rem',
                            background: 'transparent',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.5 : 1,
                        }}
                    >
                        Keep Running
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        style={{
                            padding: '0.6rem 1.25rem',
                            background: isLoading ? 'var(--text-muted)' : 'var(--error)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid white',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                }} />
                                Cancelling...
                            </>
                        ) : (
                            'Cancel Test'
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
