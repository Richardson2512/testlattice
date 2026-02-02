'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, TestRun, TestArtifact, FrontendTestType } from '../../../../lib/api'
import { generateReportPDF } from '../../../../lib/pdfGenerator'
import LiveStreamPlayer from '../../../../components/LiveStreamPlayer'
import { DiagnosisProgressBar } from '@/components/DiagnosisProgressBar'
import { filterStepsByBrowser, getBrowserDisplayName, aggregateBrowserRuns, type BrowserType } from '../../../../lib/browserResults'
import { LiveTestControl } from '../../../../components/LiveTestControl'
import { CancelTestModal } from '@/components/CancelTestModal'

// --- ICONS ---
const Icons = {
  Play: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Pause: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Stop: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>,
  Terminal: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Eye: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Code: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  Globe: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
}

// --- COMPONENTS ---

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
                {step.description && <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginLeft: '0.5rem', fontStyle: 'italic' }}>- {step.description}</div>}
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
              {step.screenshotUrl && (
                <a href={step.screenshotUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--primary)', marginTop: '4px', textDecoration: 'none' }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Screenshot
                </a>
              )}
              {step.value && <div style={{ color: 'var(--info)', fontSize: '0.7rem' }}>"{step.value}"</div>}
            </div>
            <div style={{ color: step.success ? 'var(--success)' : (step.success === false ? 'var(--error)' : 'var(--text-muted)') }}>
              {step.success ? '✓' : (step.success === false ? '✗' : '•')}
            </div>
          </div>
        )
      })}
      {steps.length === 0 && <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem' }}>Waiting for test to start...</div>}
    </div>
  )
}

export default function TestRunPage() {
  const params = useParams()
  const testId = params.testId as string
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'inspector' | 'console' | 'network'>('inspector')
  const [selectedBrowser, setSelectedBrowser] = useState<BrowserType | 'all'>('all')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showGodMode, setShowGodMode] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [frameData, setFrameData] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const lastFrameTime = useRef(0)

  // Cancel modal state
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean
    testUrl?: string
    testStatus?: string
  }>({ isOpen: false })

  // Ref for selectedBrowser to access in WS callback without reconnecting
  const selectedBrowserRef = useRef(selectedBrowser)
  useEffect(() => { selectedBrowserRef.current = selectedBrowser }, [selectedBrowser])

  const handleVisibilityChange = async (visibility: 'public' | 'private') => {
    if (!testRun) return
    try {
      const { testRun: updatedRun } = await api.updateTestRun(testId, { visibility })
      setTestRun(updatedRun)
    } catch (error) {
      console.error('Failed to update visibility', error)
      alert('Failed to update visibility')
    }
  }

  // Aggregate browser results for multi-browser tests
  const aggregated = useMemo(() => {
    if (!testRun) return null
    return aggregateBrowserRuns(testRun)
  }, [testRun])

  const handleDownloadPDF = async () => {
    if (!testRun) return
    // Simple alert for now -> proper toast later
    const btn = document.getElementById('download-pdf-btn')
    if (btn) btn.innerText = 'Generating...'

    await generateReportPDF('test-run-report-content', testRun)

    if (btn) btn.innerText = 'Download PDF'
  }

  const isMultiBrowser = aggregated && aggregated.selectedBrowsers.length > 1

  // Polling & Data Load
  useEffect(() => {
    loadData()
    const interval = setInterval(() => {
      if (testRun?.status === 'running' || testRun?.status === 'queued' || testRun?.status === 'diagnosing') {
        loadData()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [testId, testRun?.status])

  async function loadData() {
    try {
      const { testRun } = await api.getTestRun(testId)
      setTestRun(testRun)
    } catch (e) { console.error('Load failed', e); }
    finally { setLoading(false) }
  }

  // WebSocket
  useEffect(() => {
    // Connect WebSocket for any active test status
    const activeStatuses = ['running', 'queued', 'pending', 'diagnosing']
    const isActive = testRun && activeStatuses.includes(testRun.status)

    if (!isActive) {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      return
    }

    // Check if we already have an active connection
    if (wsRef.current?.readyState === WebSocket.OPEN) return
    if (wsRef.current?.readyState === WebSocket.CONNECTING) return

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
    const ws = new WebSocket(`${wsUrl}/ws/test-control?runId=${testId}`)
    ws.onopen = () => {
      console.log('Test Run Connected')
      setIsConnected(true)
    }
    ws.onclose = () => setIsConnected(false)
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)


        // Handle page state (video frames)
        if (data.payload?.type === 'page_state' && data.payload.state?.screenshot) {
          // OPTIMIZATION: Skip frame updates if:
          // 1. We are in diagnosing/waiting_approval mode (video hidden)
          // 2. We are currently navigating/loading (unless blocked)
          if (testRun.status === 'diagnosing' || testRun.status === 'waiting_approval') {
            return
          }

          // OPTIMIZATION: Throttle to ~20fps to prevent main thread blocking properties
          // The human eye is fine with 20-24fps for monitoring
          const now = Date.now()
          if (now - lastFrameTime.current < 50) return // 50ms = 20fps
          lastFrameTime.current = now

          const stateBrowser = data.payload.state.browser
          const currentSelection = selectedBrowserRef.current

          // Filter frames based on selected browser
          if (currentSelection === 'all' || !stateBrowser || stateBrowser === currentSelection) {
            setFrameData(data.payload.state.screenshot)
          }
        }

        // Handle logs (if backend broadcasts them here - usually separate, but good to have)
      } catch (e) {
        console.error('WS Error:', e);
      }
    }
    wsRef.current = ws
    return () => { ws.close(); wsRef.current = null; setIsConnected(false); }
  }, [testId, testRun?.status])

  // Handlers
  const handleStop = async () => { if (confirm('Stop this test run?')) { await api.stopTestRun(testId); loadData(); } }

  const handleCancelClick = () => {
    setCancelModal({
      isOpen: true,
      testUrl: testRun?.build?.url,
      testStatus: testRun?.status,
    })
  }

  const handleConfirmCancel = async () => {
    try {
      await api.cancelTestRun(testId)
      loadData()
    } catch (error: any) {
      alert(`Failed to cancel: ${error.message}`)
      throw error
    }
  }

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

  // Loading
  if (loading) return (
    <div style={{ background: 'var(--bg-primary)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>◈</div>
        Loading Test Run...
      </div>
    </div>
  )

  // Show Testability Contract Report during diagnosis/waiting approval
  if (testRun?.status === 'diagnosing' || testRun?.status === 'waiting_approval') {
    const { TestabilityContractReport } = require('@/components/TestabilityContractReport')

    // If contract not ready yet, show loading with progress
    if (!testRun.testabilityContract) {
      return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          {/* Enhanced Progress Bar with Live Commentary */}
          <DiagnosisProgressBar
            progress={testRun.diagnosisProgress}
          />
        </div>
      )
    }

    return (
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <TestabilityContractReport
          contract={testRun.testabilityContract}
          testId={testId}
          onApprove={async () => { await api.approveTestRun(testId); loadData(); }}
          isApproving={false}
          perTypeDiagnosis={testRun.perTypeDiagnosis}
        />
      </div>
    )
  }

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
          <Link href="/dashboard" style={{
            color: 'var(--primary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
            ← Back
          </Link>
          <div style={{ width: '1px', height: '20px', background: 'var(--border-medium)' }} />
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Test Run #{testId.slice(0, 8)}</div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {testRun?.status === 'running' && (
            <button
              onClick={() => setShowGodMode(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)'
              }}
            >
              <span>🎮</span> God Mode
            </button>
          )}

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

          <button
            onClick={() => setShowShareModal(true)}
            style={{
              background: 'var(--bg-tertiary)',
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
            <span>🔗</span> Share
          </button>
          {testRun?.status === 'running' && (
            <button
              onClick={handleStop}
              style={{
                background: 'var(--error)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Icons.Stop /> Stop Test
            </button>
          )}

          {/* Only show Cancel for queued/pending/diagnosing states, explicitly excluding completed/failed */}
          {['queued', 'pending', 'diagnosing'].includes(testRun?.status || '') &&
            !['completed', 'failed', 'cancelled', 'timed_out'].includes(testRun?.status || '') && (
              <button
                onClick={handleCancelClick}
                style={{
                  background: 'var(--warning)',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Icons.Stop /> Cancel Test
              </button>
            )}
        </div>
      </header>

      {/* Main Body */}
      <div id="test-run-report-content" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left Panel: Step Logs */}
        <aside style={{
          width: '280px',
          borderRight: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)',
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

        {/* Center Panel: Live Stream */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          margin: '0.5rem 1rem 1rem 1rem'
        }}>
          {/* Browser Selection Tabs (Only for Multi-Browser Runs) */}
          {isMultiBrowser && (
            <div style={{
              display: 'flex',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-light)',
            }}>
              {['all', ...aggregated!.selectedBrowsers].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrowser(b as any)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: 'none',
                    background: selectedBrowser === b ? 'var(--bg-card)' : 'transparent',
                    color: selectedBrowser === b ? 'var(--primary)' : 'var(--text-muted)',
                    borderTop: selectedBrowser === b ? '2px solid var(--primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {b === 'all' ? 'All Browsers' : getBrowserDisplayName(b as any)}
                </button>
              ))}
            </div>
          )}

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
                {testRun?.build?.url || 'about:blank'}
              </span>
            </div>
          </div>

          {/* Browser Content */}
          <div style={{
            flex: 1,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {['running', 'queued', 'pending', 'diagnosing'].includes(testRun?.status || '') ? (
              <LiveStreamPlayer
                runId={testId}
                streamUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/tests/${testId}/stream`}
                onPause={() => api.pauseTestRun(testId)}
                onResume={() => api.resumeTestRun(testId)}
                isPaused={testRun?.paused}
                currentStep={testRun?.steps?.length || 0}
                style={{ width: '100%', height: '100%' }}
                minimal={true}
                className="no-print"
                selectedBrowser={selectedBrowser} // Pass selected browser for filtering
                frameData={frameData || undefined} // Pass filtered frame data
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {testRun?.status === 'completed' ? '✅' : testRun?.status === 'failed' ? '❌' : '🏁'}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Test {testRun?.status === 'completed' ? 'Completed' : testRun?.status === 'failed' ? 'Failed' : 'Finished'}
                </div>
                {testRun?.steps && testRun.steps.length > 0 && testRun.steps[testRun.steps.length - 1].screenshotUrl && (
                  <img
                    src={testRun.steps[testRun.steps.length - 1].screenshotUrl!}
                    alt="Last state"
                    crossOrigin="anonymous"
                    style={{ maxWidth: '50%', marginTop: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                )}
              </div>
            )}

            {/* Status Overlay for non-running active states */}
            {['queued', 'pending', 'diagnosing'].includes(testRun?.status || '') && testRun?.status !== 'running' && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.7)',
                padding: '1rem 2rem',
                borderRadius: '8px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                pointerEvents: 'none'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span style={{ fontWeight: 500 }}>
                  {testRun?.status === 'queued' ? 'Waiting in queue...' :
                    (testRun?.status as string) === 'diagnosing' ? 'Analyzing your application...' :
                      'Initializing environment...'}
                </span>
                <style jsx>{`
                        @keyframes spin { to { transform: rotate(360deg); } }
                    `}</style>
              </div>
            )}
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
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Device</div>
                  <div style={{ fontSize: '0.85rem' }}>{testRun?.profile?.device || 'Desktop Chrome'}</div>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Steps Executed</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{testRun?.steps?.length || 0}</div>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'var(--beige-100)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--border-medium)',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                }}>
                  Element inspection coming soon
                </div>
              </div>
            )}
            {activeTab === 'console' && (
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: 'var(--text-muted)' }}>// Console logs will appear here</div>
              </div>
            )}
          </div>
        </aside>

      </div>

      {/* Share Modal */}
      {showShareModal && testRun && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowShareModal(false)}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '480px',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-medium)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>Share Test Report</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Control who can view this test run report. Public reports can be viewed by anyone with the link.
            </p>

            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              overflow: 'hidden',
              marginBottom: '1.5rem',
            }}>
              <div
                onClick={() => handleVisibilityChange('private')}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  background: testRun.visibility === 'private' ? 'rgba(5, 150, 105, 0.05)' : 'transparent',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  border: `2px solid ${testRun.visibility === 'private' ? 'var(--success)' : 'var(--text-muted)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {testRun.visibility === 'private' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Private</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Only you and your team can view this report</div>
                </div>
              </div>

              <div
                onClick={() => handleVisibilityChange('public')}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  background: testRun.visibility === 'public' ? 'rgba(5, 150, 105, 0.05)' : 'transparent',
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  border: `2px solid ${testRun.visibility === 'public' ? 'var(--success)' : 'var(--text-muted)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {testRun.visibility === 'public' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Public</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Anyone with the link can view this report</div>
                </div>
              </div>
            </div>

            {testRun.visibility === 'public' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Public Link
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    readOnly
                    value={`${window.location.origin}/r/${testId}`}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/r/${testId}`)
                      alert('Link copied to clipboard!')
                    }}
                    style={{
                      padding: '0.6rem 1rem',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowShareModal(false)}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: 'var(--primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <footer style={{
        height: '28px',
        background: 'var(--primary)',
        color: 'var(--text-inverse)',
        fontSize: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        justifyContent: 'space-between',
        fontWeight: 500,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>◈ Rihario</span>
          <span style={{ opacity: 0.7 }}>|</span>
          <span>Run ID: {testId.slice(0, 12)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>WS: {isConnected ? '● Connected' : '○ Disconnected'}</span>
        </div>
      </footer>

      {/* God Mode Overlay */}
      {showGodMode && (
        <LiveTestControl
          testRunId={testId}
          onClose={() => setShowGodMode(false)}
        />
      )}

      {/* Cancel Test Modal */}
      <CancelTestModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ ...cancelModal, isOpen: false })}
        onConfirm={handleConfirmCancel}
        testUrl={cancelModal.testUrl}
        testStatus={cancelModal.testStatus}
      />

    </div>
  )
}
