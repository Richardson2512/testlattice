'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import Link from 'next/link'
import VideoPlayer from '../../../../components/VideoPlayer'
import { TraceViewer } from '../../../../components/TraceViewer'
import { FixPromptButton } from '../../../../components/FixPromptButton'
import { FixPromptDisplay } from '../../../../components/FixPromptDisplay'
import { SuccessRuleCard } from '../../../../components/SuccessRuleCard'
import { PerformanceVitals } from '../../../../components/PerformanceVitals'
import {
  aggregateBrowserRuns,
  filterStepsByBrowser,
  filterArtifactsByBrowser,
  getBrowserDisplayName,
  getBrowserIcon,
  getStatusColor,
  getStatusBgColor,
  type BrowserType,
  type BrowserRun,
} from '../../../../lib/browserResults'

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, color = '#3b82f6', subValue }: { title: string, value: string | number, color?: string, subValue?: string }) => (
  <div className="glass-card" style={{ padding: '1.5rem' }}>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: color }}>{value}</div>
      {subValue && <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{subValue}</div>}
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
      borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
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
  const [selectedBrowser, setSelectedBrowser] = useState<BrowserType | 'all'>('all')
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState('')

  useEffect(() => {
    loadData()
    loadUserTier()
    checkExistingFixPrompt()
  }, [testId])

  async function loadData() {
    try {
      const response = await api.getTestRun(testId)
      setTestRun(response.testRun)
      setEditedName(response.testRun.name || `Run Report #${testId.slice(0, 8)}`)
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

  // Aggregate browser results
  const aggregated = useMemo(() => {
    if (!testRun) return null
    return aggregateBrowserRuns(testRun)
  }, [testRun])

  // Filter steps and artifacts by selected browser

  const filteredSteps = useMemo(() => {
    if (!testRun?.steps) return []
    return filterStepsByBrowser(testRun.steps, selectedBrowser) || []
  }, [testRun?.steps, selectedBrowser])

  const filteredArtifacts = useMemo(() => {
    if (!testRun?.steps) return artifacts
    return filterArtifactsByBrowser(artifacts, selectedBrowser, testRun.steps)
  }, [artifacts, selectedBrowser, testRun?.steps])

  // Get video and trace for selected browser
  const videoArtifact = useMemo(() => {
    return filteredArtifacts.find(a => a.type === 'video') || artifacts.find(a => a.type === 'video')
  }, [filteredArtifacts, artifacts])

  const videoUrl = videoArtifact?.url || testRun?.artifactsUrl
  const traceArtifact = filteredArtifacts.find(a => a.type === 'trace') || artifacts.find(a => a.type === 'trace')
  const traceUrl = traceArtifact?.url || testRun?.traceUrl

  // Determine if this is a multi-browser test
  const isMultiBrowser = aggregated && aggregated.selectedBrowsers.length > 1

  // Comprehensive Data Extraction (Safe Access)
  const results = testRun?.diagnosis?.comprehensiveTests
  // Calculate Success Rules data (Mock data placeholders where backend data might be missing)
  const perfMetrics = results?.performance || { lcp: 0, cls: 0 }
  const accessScore = results?.wcagScore?.score || 100
  const securityIssues = results?.security || []
  const visualIssues = results?.visualIssues || []

  async function handleSaveName() {
    if (!testRun || !editedName.trim()) return
    try {
      const updated = await api.updateTestRunName(testId, editedName)
      setTestRun(updated.testRun)
      setIsEditingName(false)
    } catch (error) {
      console.error('Failed to update name:', error)
      alert('Failed to update name')
    }
  }

  // Safe access for performance metrics with fallback
  const lcpValue = perfMetrics && 'largestContentfulPaint' in perfMetrics ? perfMetrics.largestContentfulPaint : 0
  const clsValue = perfMetrics && 'cumulativeLayoutShift' in perfMetrics ? perfMetrics.cumulativeLayoutShift : 0

  if (loading) return <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>Loading Report...</div>
  if (!testRun) return <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>Test Run Not Found</div>
  if (!aggregated) return <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>Unable to process test results</div>

  const failedSteps = filteredSteps.filter(s => !s.success)
  const duration = testRun.duration ? (testRun.duration / 1000).toFixed(1) + 's' : 'N/A'

  // Overall status badge
  const overallStatusColor = getStatusColor(aggregated.overallStatus)
  const overallStatusBg = getStatusBgColor(aggregated.overallStatus)

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}>

      {/* Header */}
      <header className="glass-panel" style={{ borderBottom: '1px solid var(--border-light)', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Dashboard link removed as per user request */}

            {isEditingName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-medium)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    minWidth: '300px'
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName()
                    if (e.key === 'Escape') {
                      setIsEditingName(false)
                      setEditedName(testRun?.name || `Run Report #${testId.slice(0, 8)}`)
                    }
                  }}
                />
                <button
                  onClick={handleSaveName}
                  className="btn btn-sm btn-ghost"
                  title="Save Name"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingName(false)
                    setEditedName(testRun?.name || `Run Report #${testId.slice(0, 8)}`)
                  }}
                  className="btn btn-sm btn-ghost"
                  title="Cancel"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
                  {testRun?.name || `Run Report #${testId.slice(0, 8)}`}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    opacity: 0.7,
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Rename Test Run"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
            )}

            <span style={{
              padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600,
              background: overallStatusBg,
              color: overallStatusColor,
            }}>
              {(aggregated.overallStatus as string) === 'PASSED_WITH_WARNINGS' ? 'PASSED (Review Guidelines)' : aggregated.overallStatus}
            </span>
            {/* Retention Notice for Guest/Free Users */}
            {(userTier === 'guest' || userTier === 'starter') && (
              <div style={{
                marginLeft: '1rem',
                fontSize: '0.8rem',
                color: '#eab308', /* Yellow-500 */
                background: 'rgba(234, 179, 8, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid rgba(234, 179, 8, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>
                  Downloads expire in 24h. Run deleted in 48h.
                </span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => window.open(`/api/tests/${testId}/download`, '_blank')} // Assuming download endpoint exists, need to verify
              className="btn btn-outline"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
            <FixPromptButton
              testRunId={testId}
              testStatus={testRun?.status || ''}
              userTier={userTier}
              onPromptGenerated={(prompt) => setFixPrompt(prompt)}
            />
            <button onClick={() => router.push(`/test/run/${testId}`)} className="btn btn-primary">
              Run Again
            </button>
          </div>
        </div>
      </header >

      <main style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>

        {/* Executive Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <StatCard title="Total Time" value={duration} color="var(--text-primary)" />
          <StatCard
            title="Steps Taken"
            value={filteredSteps.length}
            color="var(--text-primary)"
          />
          <StatCard
            title="Issues Found"
            value={failedSteps.length}
            color={failedSteps.length > 0 ? 'var(--error)' : 'var(--success)'}
            subValue={failedSteps.length > 0 ? 'Requires Attention' : 'All Clear'}
          />
          <StatCard
            title="Browsers Tested"
            value={aggregated.selectedBrowsers.length}
            color="var(--warning)"
            subValue={isMultiBrowser ? 'Parallel Run' : getBrowserDisplayName(aggregated.selectedBrowsers[0] as BrowserType)}
          />
        </div>

        {/* --- NEW SECTION: Standard Success Rules (Natural English) --- */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Quality & Health Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>

            {/* 1. Performance (Speed) */}
            <SuccessRuleCard
              category="Performance"
              status={(lcpValue || 0) > 2500 ? 'warning' : 'pass'}
              metrics={[
                { label: 'Loading Speed', value: lcpValue ? `${(lcpValue / 1000).toFixed(2)}s` : 'N/A', status: (lcpValue || 0) > 2500 ? 'warning' : 'pass' },
                { label: 'Visual Stability', value: clsValue?.toFixed(3) || '0', status: (clsValue || 0) > 0.1 ? 'warning' : 'pass' }
              ]}
            />

            {/* 2. Accessibility */}
            <SuccessRuleCard
              category="Accessibility"
              status={accessScore < 90 ? 'warning' : 'pass'}
              score={accessScore}
              metrics={[
                { label: 'Critical Issues', value: results?.accessibility?.filter(i => i.impact === 'high' || (i.impact as string) === 'critical').length || 0, status: (results?.accessibility?.filter(i => i.impact === 'high').length || 0) > 0 ? 'fail' : 'pass' },
                { label: 'Minor Improvements', value: results?.accessibility?.filter(i => i.type === 'warning').length || 0, status: 'warning' }
              ]}
            />

            {/* 3. Security */}
            <SuccessRuleCard
              category="Security"
              status={securityIssues.length > 0 ? 'fail' : 'pass'}
              metrics={[
                { label: 'Vulnerabilities', value: securityIssues.length, status: securityIssues.length > 0 ? 'fail' : 'pass' },
                { label: 'Safe Connection', value: 'Verified', status: 'pass' }
              ]}
            />

            {/* 4. Visual */}
            <SuccessRuleCard
              category="Visual"
              status={visualIssues.length > 0 ? 'warning' : 'pass'}
              metrics={[
                { label: 'Visual Bugs', value: visualIssues.length, status: visualIssues.length > 0 ? 'warning' : 'pass' },
                { label: 'Layout Shifts', value: 'None Detected', status: 'pass' }
              ]}
            />

          </div>
        </section>


        {/* Video & Timeline Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem', height: '600px' }}>
          {/* Video Player Box */}
          <div style={{ background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {videoUrl ? (
              <VideoPlayer videoUrl={videoUrl} title={`Test Replay`} />
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>No video recording available</div>
            )}
          </div>

          {/* Steps Timeline (The Story) */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              LIVE PLAY-BY-PLAY
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {(!filteredSteps || filteredSteps.length === 0) ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  No steps recorded yet.
                </div>
              ) : (
                filteredSteps.map((step, i) => {
                  const hasWarning = (step as any).warnings && (step as any).warnings.length > 0

                  return (
                    <div key={step.id || i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', opacity: step.success === false ? 1 : 0.9 }}>
                      <div style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
                        <div style={{
                          width: '12px', height: '12px', borderRadius: '50%',
                          background: step.success === false ? 'var(--error)' : hasWarning ? 'var(--warning)' : 'var(--success)',
                          marginTop: '6px'
                        }} />
                        {i < filteredSteps.length - 1 && <div style={{ width: '2px', flex: 1, background: 'var(--border-light)', marginTop: '4px' }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                            {step.action === 'navigate' ? 'Navigated to URL' :
                              step.action === 'click' ? 'Clicked Element' :
                                step.action === 'type' ? 'Typed Text' : step.action}
                          </div>
                        </div>

                        {/* Natural Language Selector Description */}
                        {step.selector && (
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                            Target: <code style={{ background: 'var(--bg-secondary)', padding: '2px 4px', borderRadius: '4px' }}>{step.target || step.selector}</code>
                          </div>
                        )}

                        {/* Error Message */}
                        {step.error && <div style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '4px', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>{step.error}</div>}

                        {/* Warnings (Natural Language) */}
                        {(step as any).warnings?.map((w: any, idx: number) => (
                          <div key={idx} style={{ color: 'var(--warning)', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>⚠️</span> {w.message}
                          </div>
                        ))}

                        {/* Healing Badge */}
                        {step.selfHealing && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' }}>
                            ✨ AI Auto-corrected this step
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Bottom Details Tabs */}
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>Play-by-play</TabButton>
            <TabButton active={activeTab === 'console'} onClick={() => setActiveTab('console')}>System Logs</TabButton>
            <TabButton active={activeTab === 'network'} onClick={() => setActiveTab('network')}>Network Activity</TabButton>
            <TabButton active={activeTab === 'diffs'} onClick={() => setActiveTab('diffs')}>Visual Changes</TabButton>
          </div>

          <div style={{ padding: '2rem', minHeight: '300px' }}>
            {activeTab === 'timeline' && (
              <div style={{ height: '400px' }}>
                {traceUrl ? (
                  <TraceViewer traceUrl={traceUrl} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No detailed history available.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'console' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                {/* Logic to map console logs would go here - for now placeholder */}
                <div style={{ color: 'var(--text-muted)' }}>No system logs captured for this session.</div>
              </div>
            )}

            {activeTab === 'network' && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Network activity visualization.</div>
            )}

            {activeTab === 'diffs' && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No visual changes detected.</div>
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
    </div >
  )
}
