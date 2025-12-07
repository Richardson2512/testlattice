'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import LiveStreamPlayer from '../../../../components/LiveStreamPlayer'
import { DiagnosisReport } from '@/components/DiagnosisReport'

// --- ICONS ---
const Icons = {
  Play: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Pause: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Stop: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>,
  Terminal: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Eye: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Code: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
}

// --- COMPONENTS ---

const StepLog = ({ steps }: { steps: any[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
    {steps.map((step, i) => (
      <div key={i} style={{
        display: 'flex', gap: '0.5rem', padding: '0.5rem', borderRadius: '4px',
        background: step.success === false ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
        borderLeft: step.success === false ? '2px solid #ef4444' : '2px solid transparent'
      }}>
        <div style={{ color: '#64748b', minWidth: '20px' }}>{i + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: step.success === false ? '#ef4444' : '#fff' }}>{step.action}</div>
          {step.selector && <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{step.selector}</div>}
          {step.value && <div style={{ color: '#bae6fd', fontSize: '0.75rem' }}>"{step.value}"</div>}
        </div>
        <div style={{ color: step.success ? '#10b981' : (step.success === false ? '#ef4444' : '#64748b') }}>
          {step.success ? '✓' : (step.success === false ? '✗' : '•')}
        </div>
      </div>
    ))}
    {steps.length === 0 && <div style={{ color: '#64748b', fontStyle: 'italic', padding: '1rem' }}>Ready to start...</div>}
  </div>
)

export default function GodModePage() {
  const params = useParams()
  const testId = params.testId as string
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'inspector' | 'console' | 'network'>('inspector')
  const wsRef = useRef<WebSocket | null>(null)

  // Polling & Data Load
  useEffect(() => {
    loadData()
    const interval = setInterval(() => {
      if (testRun?.status === 'running' || testRun?.status === 'queued' || testRun?.status === 'diagnosing') {
        loadData()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [testId, testRun?.status])

  async function loadData() {
    try {
      const { testRun } = await api.getTestRun(testId)
      setTestRun(testRun)
    } catch (e) { console.error('Load failed', e); }
    finally { setLoading(false) }
  }

  // WebSocket (Simplified for God Mode)
  useEffect(() => {
    if (!testRun || testRun.status !== 'running') return
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
    const ws = new WebSocket(`${wsUrl}/ws/test-control?runId=${testId}`)
    ws.onopen = () => console.log('God Mode Connected')
    wsRef.current = ws
    return () => { ws.close(); wsRef.current = null; }
  }, [testId, testRun?.status])

  // Handlers
  const handleStop = async () => { if (confirm('Stop run?')) { await api.stopTestRun(testId); loadData(); } }

  // Rendering
  if (loading) return <div style={{ background: '#0f172a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading God Mode...</div>

  // Show Diagnosis Report if in diagnosing state
  if (testRun?.status === 'diagnosing' || testRun?.status === 'waiting_approval') {
    return (
      <div style={{ background: '#0f172a', minHeight: '100vh' }}>
        <DiagnosisReport
          diagnosis={testRun.diagnosis}
          testId={testId}
          onApprove={async () => { await api.approveTestRun(testId); loadData(); }}
          isApproving={false}
        />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'var(--font-inter)', overflow: 'hidden' }}>

      {/* 1. Header (Minimal IDE style) */}
      <header style={{ height: '48px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', background: '#1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>← Exit</Link>
          <div style={{ width: '1px', height: '16px', background: '#334155' }} />
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Test Run #{testId.slice(0, 8)}</div>
          <div style={{
            padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
            background: testRun?.status === 'running' ? '#3b82f620' : '#334155',
            color: testRun?.status === 'running' ? '#3b82f6' : '#94a3b8'
          }}>
            {testRun?.status?.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {testRun?.status === 'running' && (
            <>
              <button onClick={() => { }} style={{ background: '#334155', border: 'none', padding: '6px', borderRadius: '4px', color: '#fff', cursor: 'pointer' }} title="Pause"><Icons.Pause /></button>
              <button onClick={handleStop} style={{ background: '#7f1d1d', border: 'none', padding: '6px', borderRadius: '4px', color: '#fff', cursor: 'pointer' }} title="Stop"><Icons.Stop /></button>
            </>
          )}
        </div>
      </header>

      {/* 2. Main IDE Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left Panel: Step Logs (20%) */}
        <aside style={{ width: '250px', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #334155', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icons.Terminal /> EXECUTION LOG
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            <StepLog steps={testRun?.steps || []} />
          </div>
        </aside>

        {/* Center Panel: Live Stream (60%) */}
        <main style={{ flex: 1, background: '#000', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {testRun?.status === 'running' && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', zIndex: 10 }}>
              LIVE
            </div>
          )}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Live Stream Player Wrapper */}
            {testRun?.status === 'running' ? (
              <LiveStreamPlayer
                url={testRun.build?.url || ''}
                isInteractable={true}
                wsEndpoint={`${process.env.NEXT_PUBLIC_WS_URL}/live`}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏁</div>
                <div>Test Run {testRun?.status}</div>
                {testRun?.steps && testRun.steps.length > 0 && testRun.steps[testRun.steps.length - 1].screenshotUrl && (
                  <img
                    src={testRun.steps[testRun.steps.length - 1].screenshotUrl!}
                    alt="Last state"
                    style={{ maxWidth: '60%', marginTop: '2rem', borderRadius: '8px', border: '1px solid #333' }}
                  />
                )}
              </div>
            )}
          </div>
        </main>

        {/* Right Panel: Inspector (20%) */}
        <aside style={{ width: '300px', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
            <button
              onClick={() => setActiveTab('inspector')}
              style={{ flex: 1, padding: '0.75rem', background: activeTab === 'inspector' ? '#1e293b' : 'transparent', border: 'none', color: activeTab === 'inspector' ? '#fff' : '#64748b', fontSize: '0.8rem', cursor: 'pointer', borderRight: '1px solid #334155' }}
            >
              Inspector
            </button>
            <button
              onClick={() => setActiveTab('console')}
              style={{ flex: 1, padding: '0.75rem', background: activeTab === 'console' ? '#1e293b' : 'transparent', border: 'none', color: activeTab === 'console' ? '#fff' : '#64748b', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Console
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {activeTab === 'inspector' && (
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#64748b', marginBottom: '0.25rem' }}>Current URL</div>
                  <div style={{ wordBreak: 'break-all' }}>{testRun?.build?.url}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#64748b', marginBottom: '0.25rem' }}>Device</div>
                  <div>{testRun?.profile?.device || 'Desktop Chrome'}</div>
                </div>
                <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', border: '1px dashed #334155', textAlign: 'center' }}>
                  Select an element in the stream to inspect.
                </div>
              </div>
            )}
            {activeTab === 'console' && (
              <div style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                {/* Placeholder for console logs */}
                <div style={{ color: '#94a3b8' }}>// No console output captured yet</div>
              </div>
            )}
          </div>
        </aside>

      </div>

      {/* 3. Footer Status Bar */}
      <footer style={{ height: '24px', background: '#3b82f6', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', padding: '0 1rem', justifyContent: 'space-between' }}>
        <div>READY</div>
        <div>WS: {wsRef.current ? 'Connected' : 'Disconnected'}</div>
      </footer>

    </div>
  )
}
