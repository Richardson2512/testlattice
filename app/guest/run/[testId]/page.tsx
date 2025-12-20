'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api, TestRun } from '../../../../lib/api'
import LiveStreamPlayer from '../../../../components/LiveStreamPlayer'

// --- ICONS ---
const Icons = {
    Terminal: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Globe: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
}

// --- STEP LOG COMPONENT ---
const StepLog = ({ steps }: { steps: any[] }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step, i) => (
            <div key={i} style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: step.success === false
                    ? 'var(--maroon-50)'
                    : step.success
                        ? 'var(--beige-100)'
                        : 'var(--bg-card)',
                border: '1px solid',
                borderColor: step.success === false
                    ? 'var(--maroon-100)'
                    : 'var(--border-light)',
                borderLeftWidth: '4px',
                borderLeftColor: step.success === false
                    ? 'var(--maroon-500)'
                    : step.success
                        ? 'var(--success)'
                        : 'var(--beige-400)',
            }}>
                <div style={{
                    color: 'var(--beige-500)',
                    minWidth: '24px',
                    textAlign: 'right',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px'
                }}>
                    {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontWeight: 600,
                        marginBottom: '4px',
                        color: 'var(--text-primary)',
                        fontSize: '13px'
                    }}>
                        {step.action}
                    </div>
                    {step.selector && (
                        <span style={{
                            fontSize: '11px',
                            background: 'var(--beige-200)',
                            color: 'var(--text-secondary)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            display: 'inline-block'
                        }}>
                            {step.selector}
                        </span>
                    )}
                    {step.description && (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {step.description}
                        </div>
                    )}
                </div>
            </div>
        ))}
        {steps.length === 0 && (
            <div style={{
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                padding: '24px',
                textAlign: 'center',
                fontSize: '14px'
            }}>
                Initializing visual agent...
            </div>
        )}
    </div>
)

export default function GuestTestRunPage() {
    const params = useParams()
    const testId = params.testId as string
    const [testRun, setTestRun] = useState<TestRun | null>(null)
    const [loading, setLoading] = useState(true)
    const wsRef = useRef<WebSocket | null>(null)
    const [lastFrame, setLastFrame] = useState<string | undefined>(undefined)

    // Polling & Data Load
    useEffect(() => {
        loadData()
        const interval = setInterval(() => {
            // Retry if test run doesn't exist yet (404) or if it's in an active state
            if (!testRun || (testRun?.status && ['running', 'queued', 'diagnosing', 'pending'].includes(testRun.status))) {
                loadData()
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [testId, testRun?.status])

    async function loadData() {
        try {
            const { testRun } = await api.getTestRun(testId)
            setTestRun(testRun)
            setLoading(false)
        } catch (e: any) {
            console.error('Load failed', e)
            // If 404, test run might not exist yet - keep loading and retry
            if (e.message?.includes('404') || e.message?.includes('not found')) {
                // Don't set loading to false yet - will retry on next interval
                console.log(`[Guest Test] Test run ${testId} not found yet, will retry...`)
            } else {
                setLoading(false)
            }
        }
    }

    // WebSocket
    useEffect(() => {
        if (!testRun || testRun.status !== 'running') return
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
        const ws = new WebSocket(`${wsUrl}/ws/test-control?runId=${testId}`)

        ws.onopen = () => console.log('Guest Stream Connected')

        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data)
                if (msg.type === 'page_state' && msg.state?.screenshot) {
                    setLastFrame(msg.state.screenshot)
                }
                if (msg.type === 'test_step' && msg.step) {
                    setTestRun(prev => prev ? ({ ...prev, steps: [...(prev.steps || []), msg.step] }) : null)
                }
            } catch (e) {
                console.error('WS Parse Error', e)
            }
        }

        wsRef.current = ws
        return () => { ws.close(); wsRef.current = null; }
    }, [testId, testRun?.status])

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
                        letterSpacing: '-0.02em'
                    }}>
                        🧪 TestLattice
                    </Link>
                    <div style={{ width: '1px', height: '24px', background: 'var(--beige-300)' }} />
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Visual Check
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
                                style={{ width: '100%', height: '100%' }}
                                minimal={true}
                            />
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                color: 'var(--beige-500)'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    border: '3px solid var(--beige-400)',
                                    borderTopColor: 'var(--beige-200)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                <div style={{ fontSize: '14px' }}>Waiting for browser...</div>
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
                    </div>

                    {/* Logs Content */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '16px',
                        background: 'var(--bg-card)'
                    }}>
                        <StepLog steps={testRun?.steps || []} />
                    </div>
                </div>
            </div>

            {/* CSS for spin animation */}
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

