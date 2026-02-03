'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TestCompletionPopupProps {
    isOpen: boolean
    testRunId: string
    testStatus: 'completed' | 'failed'
    testName?: string
    onClose: () => void
}

export function TestCompletionPopup({
    isOpen,
    testRunId,
    testStatus,
    testName,
    onClose,
}: TestCompletionPopupProps) {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // Small delay for animation
            setTimeout(() => setIsVisible(true), 50)
        } else {
            setIsVisible(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    const isSuccess = testStatus === 'completed'

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.5rem',
                    maxWidth: '420px',
                    width: '90%',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
                    transition: 'transform 0.3s ease',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: isSuccess
                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
                            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        border: `2px solid ${isSuccess ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    }}
                >
                    {isSuccess ? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ) : (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    )}
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}>
                    {isSuccess ? 'Test Completed!' : 'Test Finished with Issues'}
                </h2>

                {/* Subtitle */}
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    lineHeight: 1.5,
                }}>
                    {testName && <span style={{ fontWeight: 500 }}>"{testName}"</span>}
                    {testName ? ' has finished. ' : ''}
                    {isSuccess
                        ? 'Your test ran successfully. View the detailed report to see all results, screenshots, and recordings.'
                        : 'Some issues were found during testing. Check the report for details and AI-generated fix suggestions.'}
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={() => router.push(`/test/report/${testRunId}`)}
                        style={{
                            padding: '0.75rem 2rem',
                            background: 'var(--primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        View Report
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
