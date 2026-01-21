'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api, TestRun } from '../../../lib/api'
import { generateReportPDF } from '../../../lib/pdfGenerator'
import LiveStreamPlayer from '../../../components/LiveStreamPlayer'
import { filterStepsByBrowser, getBrowserDisplayName, aggregateBrowserRuns, type BrowserType } from '../../../lib/browserResults'

// --- ICONS ---
const Icons = {
    Terminal: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Eye: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
}

// Reuse TestStepLog logic (inline here for simplicity as it was inline in TestRunPage)
const TestStepLog = ({ steps, showBrowserBadges = false }: { steps: any[], showBrowserBadges?: boolean }) => {
    const getStepBrowser = (step: any) => step.browser || step.environment?.browser

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            {steps.map((step, i) => {
                const stepBrowser = getStepBrowser(step)
                const browserLabel = showBrowserBadges && stepBrowser ? `[${getBrowserDisplayName(stepBrowser)}]` : ''

                return (
                    <div key={step.id || i} style={{
                        display: 'flex', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)',
                        background: step.success === false ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                        borderLeft: `3px solid ${step.success === false ? 'var(--error)' : step.success === true ? 'var(--success)' : 'var(--beige-300)'}`
                    }}>
                        <div style={{ color: 'var(--text-muted)', minWidth: '20px', fontWeight: 600 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <div style={{ color: step.success === false ? 'var(--error)' : 'var(--text-primary)', fontWeight: 500 }}>{step.action}</div>
                                {browserLabel && (
                                    <span style={{
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        fontWeight: 600,
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        color: '#3b82f6',
                                    }}>
                                        {browserLabel}
                                    </span>
                                )}
                            </div>
                            {step.selector && <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>{step.selector}</div>}
                            {step.value && <div style={{ color: 'var(--info)', fontSize: '0.7rem' }}>"{step.value}"</div>}
                        </div>
                        <div style={{ color: step.success ? 'var(--success)' : (step.success === false ? 'var(--error)' : 'var(--text-muted)') }}>
                            {step.success ? '✓' : (step.success === false ? '✗' : '•')}
                        </div>
                    </div>
                )
            })}
            {steps.length === 0 && <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem' }}>No steps recorded.</div>}
        </div>
    )
}

export default function PublicReportPage() {
    const params = useParams()
    const reportId = params.reportId as string
    const [testRun, setTestRun] = useState<TestRun | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'inspector' | 'console'>('inspector')
    const [selectedBrowser, setSelectedBrowser] = useState<BrowserType | 'all'>('all')

    // Aggregate browser results for multi-browser tests
    const aggregated = useMemo(() => {
        if (!testRun) return null
        return aggregateBrowserRuns(testRun)
    }, [testRun])

    const isMultiBrowser = aggregated && aggregated.selectedBrowsers.length > 1

    const handleDownloadPDF = async () => {
        if (!testRun) return
        const btn = document.getElementById('download-pdf-btn')
        if (btn) btn.innerText = 'Generating...'

        await generateReportPDF('public-report-content', testRun)

        if (btn) btn.innerText = 'Download PDF'
    }

    useEffect(() => {
        async function loadData() {
            try {
                const { testRun } = await api.getTestRun(reportId)
                setTestRun(testRun)
            } catch (e: any) {
                console.error('Load failed', e)
                setError(e.message || 'Failed to load report')
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [reportId])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'var(--success)'
            case 'failed': return 'var(--error)'
            case 'running': return 'var(--info)'
            case 'queued': return 'var(--warning)'
            default: return 'var(--text-muted)'
        }
    }

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'completed': return 'rgba(5, 150, 105, 0.1)'
            case 'failed': return 'rgba(220, 38, 38, 0.1)'
            case 'running': return 'rgba(37, 99, 235, 0.1)'
            case 'queued': return 'rgba(217, 119, 6, 0.1)'
            default: return 'var(--beige-100)'
        }
    }

    if (loading) return (
        <div style={{ background: 'var(--bg-primary)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>◈</div>
                Loading Report...
            </div>
        </div>
    )

    if (error) return (
        <div style={{ background: 'var(--bg-primary)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
                <h2 style={{ marginBottom: '1rem' }}>Access Denied</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    {error.includes('403') || error.includes('Access denied')
                        ? 'This report is private. Please ask the owner to share it strictly via public link setting.'
                        : 'Test run not found or you do not have permission to view it.'}
                </p>
                <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                    Go to Home
                </Link>
            </div>
        </div>
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>

            {/* Header */}
            <header style={{
                height: '56px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.25rem',
                background: 'var(--bg-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
                        <span style={{ color: 'var(--primary)' }}>◈</span> Rihario Report
                    </div>
                    <div style={{ width: '1px', height: '20px', background: 'var(--border-medium)' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{testRun?.build?.url || 'Test Run'}</div>
                    <span style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: getStatusBg(testRun?.status || ''),
                        color: getStatusColor(testRun?.status || ''),
                    }}>
                        {testRun?.status}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        id="download-pdf-btn"
                        onClick={handleDownloadPDF}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-medium)',
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span>⬇️</span> PDF
                    </button>

                    <Link href="/signup" style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'white',
                        background: 'var(--primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none'
                    }}>
                        Start Testing
                    </Link>
                </div>
            </header>

            {/* Main Body */}
            <div id="public-report-content" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* Left Panel: Step Logs */}
                <aside style={{
                    width: '280px',
                    borderRight: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        padding: '0.875rem 1rem',
                        borderBottom: '1px solid var(--border-light)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        <Icons.Terminal /> Execution Log
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
                        <TestStepLog
                            steps={
                                (selectedBrowser === 'all'
                                    ? (testRun?.steps || [])
                                    : filterStepsByBrowser(testRun?.steps || [], selectedBrowser)) || []
                            }
                            showBrowserBadges={!!(isMultiBrowser && selectedBrowser === 'all')}
                        />
                    </div>
                </aside>

                {/* Center Panel: Preview */}
                <main style={{
                    flex: 1,
                    background: 'var(--beige-900)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* Virtual Browser Frame */}
                    <div style={{
                        background: 'linear-gradient(180deg, var(--beige-800) 0%, var(--beige-900) 100%)',
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }} />
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.7)',
                            fontFamily: 'var(--font-mono)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {testRun?.build?.url || 'about:blank'}
                        </div>
                    </div>

                    {/* Screenshot / Content */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {testRun?.steps && testRun.steps.length > 0 && testRun.steps[testRun.steps.length - 1].screenshotUrl ? (
                                <img
                                    src={testRun.steps[testRun.steps.length - 1].screenshotUrl!}
                                    alt="Last state"
                                    style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.2)' }}
                                />
                            ) : (
                                <div style={{ fontSize: '1.5rem' }}>No visual steps recorded</div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Panel: Inspector */}
                <aside style={{
                    width: '280px',
                    borderLeft: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--bg-card)',
                }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)' }}>
                        <button
                            onClick={() => setActiveTab('inspector')}
                            style={{
                                flex: 1,
                                padding: '0.875rem',
                                background: activeTab === 'inspector' ? 'var(--bg-primary)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'inspector' ? 'var(--text-primary)' : 'var(--text-muted)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                borderBottom: activeTab === 'inspector' ? '2px solid var(--primary)' : '2px solid transparent',
                            }}
                        >
                            Inspector
                        </button>
                        <button
                            onClick={() => setActiveTab('console')}
                            style={{
                                flex: 1,
                                padding: '0.875rem',
                                background: activeTab === 'console' ? 'var(--bg-primary)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'console' ? 'var(--text-primary)' : 'var(--text-muted)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                borderBottom: activeTab === 'console' ? '2px solid var(--primary)' : '2px solid transparent',
                            }}
                        >
                            Console
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        {activeTab === 'inspector' && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Target URL</div>
                                    <div style={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>{testRun?.build?.url}</div>
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Steps Executed</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{testRun?.steps?.length || 0}</div>
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Duration</div>
                                    <div style={{ fontSize: '0.85rem' }}>{testRun?.duration ? (testRun.duration / 1000).toFixed(1) + 's' : 'N/A'}</div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'console' && (
                            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                                <div style={{ color: 'var(--text-muted)' }}>// Console logs hidden in public view</div>
                            </div>
                        )}
                    </div>
                </aside>

            </div>
        </div>
    )
}
