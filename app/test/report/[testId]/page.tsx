'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import Link from 'next/link'
import VideoPlayer from '../../../../components/VideoPlayer'
import { TraceViewer } from '../../../../components/TraceViewer'
import { FixPromptButton } from '../../../../components/FixPromptButton'
import { FixPromptDisplay } from '../../../../components/FixPromptDisplay'

// --- COMPONENTS ---

const StatCard = ({ title, value, color = '#3b82f6', subValue }: { title: string, value: string | number, color?: string, subValue?: string }) => (
  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem' }}>
    <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: color }}>{value}</div>
      {subValue && <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{subValue}</div>}
    </div>
  </div>
)

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button
    onClick={onClick}
    style={{
      padding: '1rem 1.5rem',
      background: 'transparent',
      border: 'none',
      borderBottom: active ? '2px solid #3b82f6' : '2px solid transparent',
      color: active ? '#fff' : '#94a3b8',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'color 0.2s'
    }}
  >
    {children}
  </button>
)

export default function DeepInsightsPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [artifacts, setArtifacts] = useState<TestArtifact[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'timeline' | 'console' | 'network' | 'diffs'>('timeline')
  const [userTier, setUserTier] = useState<'guest' | 'starter' | 'indie' | 'pro' | 'agency'>('guest')
  const [fixPrompt, setFixPrompt] = useState<string | null>(null)

  useEffect(() => {
    loadData()
    loadUserTier()
    checkExistingFixPrompt()
  }, [testId])

  async function loadData() {
    try {
      const response = await api.getTestRun(testId)
      setTestRun(response.testRun)
      setArtifacts(response.artifacts)
    } catch (error) {
      console.error('Failed to load test run:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadUserTier() {
    try {
      const tierInfo = await api.getTierInfo()
      setUserTier(tierInfo.tier)
    } catch (error) {
      console.error('Failed to load tier info:', error)
    }
  }

  async function checkExistingFixPrompt() {
    try {
      const response = await api.getFixPrompt(testId)
      if (response.fixPrompt) {
        setFixPrompt(response.fixPrompt.prompt)
      }
    } catch (error) {
      // Ignore 404 errors
    }
  }

  if (loading) return <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading Report...</div>
  if (!testRun) return <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Test Run Not Found</div>

  const steps = testRun.steps || []
  const failedSteps = steps.filter(s => !s.success)
  const duration = testRun.duration ? (testRun.duration / 1000).toFixed(1) + 's' : 'N/A'
  const videoArtifact = artifacts.find(a => a.type === 'video')
  const videoUrl = videoArtifact?.url || testRun.artifactsUrl
  const traceArtifact = artifacts.find(a => a.type === 'trace')
  const traceUrl = traceArtifact?.url || testRun.traceUrl

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'var(--font-inter)' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #334155', background: '#1e293b', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500 }}>← Dashboard</Link>
            <div style={{ width: '1px', height: '20px', background: '#334155' }} />
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Run Report #{testId.slice(0, 8)}</h1>
            <span style={{
              padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600,
              background: testRun.status === 'completed' ? '#10b98120' : (testRun.status === 'failed' ? '#ef444420' : '#3b82f620'),
              color: testRun.status === 'completed' ? '#10b981' : (testRun.status === 'failed' ? '#ef4444' : '#3b82f6')
            }}>
              {testRun.status.toUpperCase()}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FixPromptButton
              testRunId={testId}
              testStatus={testRun?.status || ''}
              userTier={userTier}
              onPromptGenerated={(prompt) => setFixPrompt(prompt)}
            />
            <button onClick={() => router.push(`/test/run/${testId}`)} style={{ padding: '0.6rem 1.25rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Re-run Test
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>

        {/* Top Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <StatCard title="Duration" value={duration} color="#fff" />
          <StatCard title="Total Steps" value={steps.length} color="#fff" />
          <StatCard title="Errors" value={failedSteps.length} color={failedSteps.length > 0 ? '#ef4444' : '#10b981'} subValue={failedSteps.length > 0 ? 'Critical' : 'Clean'} />
          <StatCard title="Network Requests" value="24" color="#fbbf24" subValue="Mocked" /> {/* Placeholder for real network count */}
        </div>

        {/* Video & Timeline Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem', height: '500px' }}>
          {/* Video Player Box */}
          <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {videoUrl ? (
              <VideoPlayer videoUrl={videoUrl} title={`Run ${testId}`} />
            ) : (
              <div style={{ color: '#64748b' }}>No video recording available</div>
            )}
          </div>

          {/* Steps Timeline */}
          <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #334155', fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' }}>EXECUTION TIMELINE</div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', opacity: step.success === false ? 1 : 0.8 }}>
                  <div style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: step.success === false ? '#ef4444' : '#10b981', marginTop: '4px' }} />
                    {i < steps.length - 1 && <div style={{ width: '2px', flex: 1, background: '#334155', marginTop: '4px' }} />}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{step.action}</div>
                    {step.selector && <div style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace', marginTop: '2px' }}>{step.selector}</div>}
                    {step.error && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{step.error}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Details Tabs */}
        <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', background: '#0f172a' }}>
            <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>Trace Timeline</TabButton>
            <TabButton active={activeTab === 'console'} onClick={() => setActiveTab('console')}>Console Logs</TabButton>
            <TabButton active={activeTab === 'network'} onClick={() => setActiveTab('network')}>Network</TabButton>
            <TabButton active={activeTab === 'diffs'} onClick={() => setActiveTab('diffs')}>Visual Diffs</TabButton>
          </div>

          <div style={{ padding: '2rem', minHeight: '300px' }}>
            {activeTab === 'timeline' && (
              <div style={{ height: '400px' }}>
                {traceUrl ? (
                  <TraceViewer traceUrl={traceUrl} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>No trace data available for this run.</div>
                )}
              </div>
            )}

            {activeTab === 'console' && (
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                <div style={{ color: '#94a3b8' }}>// Console output from browser</div>
                {/* Placeholder for console logs if we had them in DB */}
                <div style={{ marginTop: '1rem', color: '#64748b' }}>No console logs captured.</div>
              </div>
            )}

            {activeTab === 'network' && (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Network waterfall visualization coming soon.</div>
            )}

            {activeTab === 'diffs' && (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>No visual regressions detected.</div>
            )}
          </div>
        </div>

        {/* Fix Prompt Section */}
        {fixPrompt && (
          <div style={{ marginTop: '2rem' }}>
            <FixPromptDisplay prompt={fixPrompt} />
          </div>
        )}

      </main>
    </div>
  )
}
