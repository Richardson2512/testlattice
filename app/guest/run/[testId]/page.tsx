'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import LiveStreamPlayer from '../../../../components/LiveStreamPlayer'
import { VerificationInputModal } from '../../../../components/VerificationInputModal'
import { SignupPromptModal } from '../../../../components/SignupPromptModal'
import { StepLog } from '../../../../components/StepLog'
import { EnhancedReportSummary } from '../../../../components/EnhancedReportSummary'
import { useGuestTestRun } from '../../../../lib/hooks/useGuestTestRun'
import { GuestProgressIndicator } from '../../../../components/GuestProgressIndicator'

// --- ICONS ---
const Icons = {
    Terminal: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Globe: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
}

// Step counts per guest test type (matches backend executors)
const GUEST_TEST_STEP_COUNTS: Record<string, number> = {
    visual: 16,        // 16-Step Visual Test Contract
    navigation: 12,    // Navigation links + validations
    form: 15,          // Form detection + validation + submission
    accessibility: 10, // WCAG checks + keyboard navigation
    rage_bait: 12,     // Chaos testing steps
    login: 12,         // Auth flow steps
    signup: 14         // Auth flow with verification
}

export default function GuestTestRunPage() {
    const params = useParams()
    const testId = params.testId as string

    const {
        testRun,
        loading,
        lastFrame,
        verificationRequired,
        verificationType,
        verificationTimeoutMs,
        submitVerification
    } = useGuestTestRun(testId)

    const [modalDismissed, setModalDismissed] = React.useState(false)

    // Loading State
    if (loading) return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            fontFamily: 'var(--font-sans)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    Starting Visual Test...
                </div>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--beige-200)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                }} />
            </div>
        </div>
    )

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: 'var(--bg-primary)',
            fontFamily: 'var(--font-sans)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <header style={{
                height: '64px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/" style={{
                        fontWeight: 700,
                        fontSize: '20px',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        letterSpacing: '-0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <img src="/image/logo.png" alt="Rihario" style={{ height: '24px', width: 'auto' }} />
                        Rihario
                    </Link>
                    <div style={{ width: '1px', height: '24px', background: 'var(--beige-300)' }} />
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {(testRun as any)?.testType || (testRun?.options as any)?.testType || (testRun?.options as any)?.guestTestType || 'Visual Check'}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: testRun?.status === 'running'
                            ? 'rgba(5, 150, 105, 0.1)'
                            : testRun?.status === 'completed'
                                ? 'rgba(5, 150, 105, 0.15)'
                                : 'var(--beige-200)',
                        color: testRun?.status === 'running' || testRun?.status === 'completed'
                            ? 'var(--success)'
                            : 'var(--text-muted)'
                    }}>
                        {testRun?.status === 'running' && '● '}{testRun?.status || 'UNKNOWN'}
                    </div>
                    {testRun?.status === 'completed' && (
                        <Link href="/signup" className="btn btn-primary" style={{
                            textDecoration: 'none',
                            fontSize: '13px',
                            padding: '8px 16px'
                        }}>
                            View Full Report →
                        </Link>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '24px', gap: '24px' }}>

                {/* Left: Virtual Browser */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-card)'
                }}>
                    {/* Browser Chrome - Title Bar */}
                    <div style={{
                        height: '40px',
                        background: 'linear-gradient(to bottom, var(--maroon-800), var(--maroon-900))',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        gap: '8px'
                    }}>
                        {/* Traffic Lights */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
                        </div>

                        {/* Address Bar */}
                        <div style={{
                            flex: 1,
                            marginLeft: '12px',
                            background: 'rgba(255,255,255,0.15)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Icons.Globe />
                            <span style={{
                                fontSize: '12px',
                                color: 'rgba(255,255,255,0.9)',
                                fontFamily: 'var(--font-sans)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {testRun?.build?.url || 'Loading...'}
                            </span>
                        </div>
                    </div>

                    {/* Browser Content */}
                    <div style={{
                        flex: 1,
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {(testRun?.status === 'running' || testRun?.status === 'diagnosing' || testRun?.status === 'completed') ? (
                            <LiveStreamPlayer
                                runId={testId}
                                frameData={lastFrame}
                                currentStep={testRun?.steps?.length || 0}
                                totalSteps={testRun?.steps?.length || 0}
                                style={{ width: '100%', height: '100%' }}
                                minimal={true}
                            />
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                color: 'var(--beige-500)',
                                padding: '32px',
                                textAlign: 'center'
                            }}>
                                {(['pending', 'queued', 'waiting_approval', undefined].includes(testRun?.status)) && (
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        border: '3px solid var(--beige-400)',
                                        borderTopColor: 'var(--beige-200)',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                )}

                                {testRun?.status === 'failed' ? (
                                    <div style={{ color: '#ef4444' }}>
                                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Test Failed</div>
                                        <div style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto', opacity: 0.8 }}>
                                            {testRun.error || 'An unexpected error occurred during the test run.'}
                                        </div>
                                        {/* Show last step error if available and main error is generic */}
                                        {testRun?.steps && testRun.steps.length > 0 && testRun.steps[testRun.steps.length - 1].error && (
                                            <div style={{
                                                marginTop: '16px',
                                                fontSize: '12px',
                                                fontFamily: 'monospace',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                padding: '12px',
                                                borderRadius: '6px',
                                                textAlign: 'left'
                                            }}>
                                                <strong>Step {testRun.steps.length} Error:</strong><br />
                                                {testRun.steps[testRun.steps.length - 1].error}
                                            </div>
                                        )}
                                    </div>
                                ) : testRun?.status === 'cancelled' ? (
                                    <div style={{ color: 'var(--text-secondary)' }}>
                                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛑</div>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Test Cancelled</div>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '14px' }}>
                                        {testRun?.status === 'queued' && 'Test queued... waiting for worker'}
                                        {testRun?.status === 'pending' && 'Initializing test environment...'}
                                        {testRun?.status === 'waiting_approval' && 'Waiting for approval...'}
                                        {!testRun?.status && 'Waiting for browser...'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Live Logs */}
                <div style={{
                    width: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-card)'
                }}>
                    {/* Logs Header */}
                    <div style={{
                        padding: '16px',
                        borderBottom: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'var(--beige-100)',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em'
                    }}>
                        <Icons.Terminal />
                        <span>EXECUTION LOG</span>

                        {/* Real-time Progress Bar */}
                        {testRun?.steps?.length ? (() => {
                            const guestTestType = (testRun as any)?.testType || (testRun?.options as any)?.testType || (testRun?.options as any)?.guestTestType || 'visual'
                            const maxSteps = GUEST_TEST_STEP_COUNTS[guestTestType] || 16
                            const progress = testRun.steps.length
                            const percent = Math.min((progress / maxSteps) * 100, 100)
                            const testTypeName = guestTestType.charAt(0).toUpperCase() + guestTestType.slice(1).replace('_', ' ')

                            return (
                                <div style={{ flex: 1, marginLeft: '16px', marginRight: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                                        <span>{testTypeName} Inspection</span>
                                        <span>{progress}/{maxSteps} Checks</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: 'var(--beige-200)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percent}%`, height: '100%', background: 'var(--success)', transition: 'width 0.5s ease-out' }} />
                                    </div>
                                </div>
                            )
                        })() : (
                            <span style={{
                                marginLeft: 'auto',
                                background: 'var(--beige-200)',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: 'var(--text-muted)'
                            }}>
                                {testRun?.steps?.length || 0} steps
                            </span>
                        )}
                    </div>

                    {/* Logs Content */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '16px',
                        background: 'var(--bg-card)'
                    }}>
                        {/* Guest Progress Indicator - Shows step limit approaching */}
                        {testRun && (testRun.status === 'running' || testRun.status === 'diagnosing') && (
                            <GuestProgressIndicator
                                testRun={testRun}
                                currentStep={testRun?.steps?.length || 0}
                            />
                        )}
                        <StepLog steps={testRun?.steps || []} status={testRun?.status} />
                    </div>
                </div>
            </div>

            {/* Report is gated behind signup - EnhancedReportSummary only visible to registered users */}

            {/* CSS for spin animation */}
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {/* Verification Input Modal */}
            <VerificationInputModal
                isOpen={verificationRequired}
                verificationType={verificationType}
                timeoutMs={verificationTimeoutMs}
                onSubmit={submitVerification}
            />

            {/* Signup Prompt Modal - Shows when test completes */}
            <SignupPromptModal
                isOpen={!modalDismissed && (testRun?.status === 'completed' || testRun?.status === 'failed')}
                onClose={() => setModalDismissed(true)}
                title={testRun?.status === 'failed' ? 'Test Failed' : 'Test Complete!'}
                issuesFound={testRun?.steps?.filter(s => !s.success).length || 0}
                testId={testId}
            />
        </div>
    )
}
