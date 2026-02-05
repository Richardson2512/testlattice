'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import Link from 'next/link'
import VideoPlayer from '../../../../components/VideoPlayer'
import VirtualDisplay from '../../../../components/VirtualDisplay'
import { IronManHUD } from '../../../../components/IronManHUD'
import { TraceViewer } from '../../../../components/TraceViewer'
import { FixPromptButton } from '../../../../components/FixPromptButton'
import { FixPromptDisplay } from '../../../../components/FixPromptDisplay'
import { SuccessRuleCard } from '../../../../components/SuccessRuleCard'
import { PerformanceVitals } from '../../../../components/PerformanceVitals'
import { GuestTestReport } from '../../../../components/GuestTestReport'
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
  const [replayMode, setReplayMode] = useState<'video' | 'steps'>('video')

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

  // Determine if this is a guest test (show different report format)
  const isGuestTest = testRun?.options?.isGuestRun || testRun?.options?.testMode === 'guest'
  const guestTestType = (testRun?.options?.guestTestType || 'visual') as 'visual' | 'navigation' | 'accessibility' | 'performance' | 'full'

  // Extract selected test types for paid users (used to conditionally show report sections)
  const selectedTestTypes: string[] = testRun?.options?.selectedTestTypes || ['visual', 'navigation', 'accessibility', 'rage_bait']

  // Comprehensive Data Extraction (Safe Access)
  const results = testRun?.diagnosis?.comprehensiveTests
  // Calculate Success Rules data (Mock data placeholders where backend data might be missing)
  const perfMetrics = results?.performance || { lcp: 0, cls: 0 }
  const accessScore = results?.wcagScore?.score || 100
  const securityIssues = results?.security || []
  const visualIssues = results?.visualIssues || []

  async function handleShare() {
    if (!testRun) return
    try {
      if (testRun.visibility !== 'public') {
        // Make public if not already
        const updated = await api.updateTestRun(testId, { visibility: 'public' })
        setTestRun(updated.testRun)
      }
      // Copy current URL to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Public link copied to clipboard! Anyone with this link can view this report.')
    } catch (error) {
      console.error('Failed to share:', error)
      alert('Failed to generate share link')
    }
  }

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

  // Calculate duration - try multiple sources
  let calculatedDuration: number | null = testRun.duration || null

  if (!calculatedDuration && testRun.steps && testRun.steps.length > 0) {
    // Try to calculate from step timestamps
    const stepTimestamps = testRun.steps
      .map(s => s.timestamp ? new Date(s.timestamp).getTime() : null)
      .filter((t): t is number => t !== null)

    if (stepTimestamps.length >= 2) {
      const minTime = Math.min(...stepTimestamps)
      const maxTime = Math.max(...stepTimestamps)
      calculatedDuration = maxTime - minTime
    }
  }

  if (!calculatedDuration && testRun.createdAt && testRun.updatedAt) {
    // Fallback to createdAt/updatedAt difference
    const startTime = new Date(testRun.createdAt).getTime()
    const endTime = new Date(testRun.updatedAt).getTime()
    if (endTime > startTime) {
      calculatedDuration = endTime - startTime
    }
  }

  const duration = calculatedDuration ? (calculatedDuration / 1000).toFixed(1) + 's' : 'N/A'

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
            {/* Visibility Toggle */}
            <button
              onClick={async () => {
                if (!testRun) return
                try {
                  const newVisibility = testRun.visibility === 'public' ? 'private' : 'public'
                  const updated = await api.updateTestRun(testId, { visibility: newVisibility })
                  setTestRun(updated.testRun)
                } catch (error) {
                  console.error('Failed to toggle visibility:', error)
                  alert('Failed to update visibility')
                }
              }}
              title={testRun?.visibility === 'public' ? 'Report is public (click to make private)' : 'Report is private (click to make public)'}
              style={{
                background: testRun?.visibility === 'public' ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-secondary)',
                border: `1px solid ${testRun?.visibility === 'public' ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-medium)'}`,
                color: testRun?.visibility === 'public' ? '#22c55e' : 'var(--text-secondary)',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              {testRun?.visibility === 'public' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Public
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  Private
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-outline"
              title="Save as PDF"
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
              Download PDF
            </button>
            <button
              onClick={handleShare}
              className="btn btn-outline"
              title="Share Report"
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
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
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

        {/* --- Test Report Section --- */}
        {isGuestTest ? (
          /* Guest Test: Show focused report based on test type */
          <GuestTestReport
            testType={guestTestType}
            steps={filteredSteps as any}
            targetUrl={testRun.build?.url || ''}
            testRun={testRun}
            testCompleted={testRun.status === 'completed'}
            maxSteps={testRun.options?.maxSteps || 10}
          />
        ) : (
          /* Registered Test: Show comprehensive Quality & Health Check - Dynamic based on test types */
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Quality & Health Check</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Showing results for: {selectedTestTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')).join(', ')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

              {/* Performance Card - Show for 'performance' test type */}
              {selectedTestTypes.includes('performance') && (
                <SuccessRuleCard
                  category="Performance"
                  status={(lcpValue || 0) > 2500 ? 'warning' : 'pass'}
                  metrics={[
                    { label: 'Loading Speed (LCP)', value: lcpValue ? `${(lcpValue / 1000).toFixed(2)}s` : 'N/A', status: (lcpValue || 0) > 2500 ? 'warning' : 'pass' },
                    { label: 'Visual Stability (CLS)', value: clsValue ? clsValue.toFixed(3) : '0.000', status: (clsValue || 0) > 0.1 ? 'warning' : 'pass' }
                  ]}
                />
              )}

              {/* Accessibility Card - Show for 'accessibility' test type */}
              {selectedTestTypes.includes('accessibility') && (
                <SuccessRuleCard
                  category="Accessibility"
                  status={accessScore < 90 ? 'warning' : 'pass'}
                  score={accessScore}
                  metrics={[
                    { label: 'Critical Issues', value: results?.accessibility?.filter(i => i.impact === 'high' || (i.impact as string) === 'critical').length || 0, status: (results?.accessibility?.filter(i => i.impact === 'high').length || 0) > 0 ? 'fail' : 'pass' },
                    { label: 'Minor Improvements', value: results?.accessibility?.filter(i => i.type === 'warning').length || 0, status: 'warning' }
                  ]}
                />
              )}

              {/* Security Card - Show for 'security' test type */}
              {selectedTestTypes.includes('security') && (
                <SuccessRuleCard
                  category="Security"
                  status={securityIssues.length > 0 ? 'fail' : 'pass'}
                  metrics={[
                    { label: 'Vulnerabilities', value: securityIssues.length, status: securityIssues.length > 0 ? 'fail' : 'pass' },
                    { label: 'HTTPS Connection', value: testRun?.build?.url?.startsWith('https') ? 'Secure' : 'Not Secure', status: testRun?.build?.url?.startsWith('https') ? 'pass' : 'warning' }
                  ]}
                />
              )}

              {/* Visual Card - Show for 'visual' test type */}
              {selectedTestTypes.includes('visual') && (
                <SuccessRuleCard
                  category="Visual"
                  status={visualIssues.length > 0 ? 'warning' : 'pass'}
                  metrics={[
                    { label: 'Visual Bugs', value: visualIssues.length, status: visualIssues.length > 0 ? 'warning' : 'pass' },
                    { label: 'Layout Shifts', value: (clsValue || 0) > 0 ? `${(clsValue || 0).toFixed(3)} CLS` : 'None Detected', status: (clsValue || 0) > 0.1 ? 'warning' : 'pass' }
                  ]}
                />
              )}

              {/* Navigation Card - Show for 'navigation' test type */}
              {selectedTestTypes.includes('navigation') && (
                <SuccessRuleCard
                  category="Navigation"
                  status={filteredSteps.filter(s => s.action?.includes('navigate') && !s.success).length > 0 ? 'warning' : 'pass'}
                  metrics={[
                    { label: 'Pages Visited', value: filteredSteps.filter(s => s.action?.includes('navigate')).length, status: 'pass' },
                    { label: 'Broken Links', value: filteredSteps.filter(s => s.action?.includes('navigate') && !s.success).length, status: filteredSteps.filter(s => s.action?.includes('navigate') && !s.success).length > 0 ? 'fail' : 'pass' }
                  ]}
                />
              )}

              {/* Rage Bait Card - Show for 'rage_bait' test type */}
              {selectedTestTypes.includes('rage_bait') && (
                <SuccessRuleCard
                  category="Frustration"
                  status={filteredSteps.filter(s => s.action === 'rage_click_detected').length > 0 ? 'fail' : 'pass'}
                  metrics={[
                    { label: 'Frustration Triggers', value: filteredSteps.filter(s => s.action === 'rage_click_detected').length, status: filteredSteps.filter(s => s.action === 'rage_click_detected').length > 0 ? 'fail' : 'pass' },
                    { label: 'Dead Click Areas', value: filteredSteps.filter(s => s.action === 'dead_click').length, status: filteredSteps.filter(s => s.action === 'dead_click').length > 0 ? 'warning' : 'pass' }
                  ]}
                />
              )}

            </div>
          </section>
        )}



        {/* Video & Timeline Section - Hidden for Guest Tests */}
        {!isGuestTest && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem', height: '600px' }}>
            {/* Video/Step Replay Player Box */}
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
              {/* Mode Toggle */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <button
                  onClick={() => setReplayMode('video')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: replayMode === 'video' ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: replayMode === 'video' ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🎬 Video
                </button>
                <button
                  onClick={() => setReplayMode('steps')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: replayMode === 'steps' ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: replayMode === 'steps' ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  📸 Step Replay
                </button>
              </div>

              {/* Content Area */}
              <div style={{ flex: 1, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {replayMode === 'video' ? (
                  videoUrl ? (
                    <VideoPlayer videoUrl={videoUrl} title={`Test Replay`} />
                  ) : (
                    <div style={{ color: 'var(--text-muted)' }}>No video recording available</div>
                  )
                ) : (
                  /* VirtualDisplay - Step by Step Replay with Screenshots */
                  filteredSteps.length > 0 ? (
                    <VirtualDisplay
                      steps={filteredSteps.map((step, idx) => ({
                        id: step.id || `step-${idx}`,
                        stepNumber: idx + 1,
                        action: step.action,
                        target: step.target || step.selector,
                        value: step.value,
                        timestamp: step.timestamp || new Date().toISOString(),
                        screenshotUrl: step.screenshotUrl,
                        success: step.success !== false
                      }))}
                    />
                  ) : (
                    <div style={{ color: 'var(--text-muted)' }}>No steps recorded</div>
                  )
                )}
              </div>
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
        )}


        {/* Bottom Details Tabs - Hidden for Guest Tests */}
        {!isGuestTest && (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
              <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>Play-by-play</TabButton>
              <TabButton active={activeTab === 'console'} onClick={() => setActiveTab('console')}>System Logs</TabButton>
              <TabButton active={activeTab === 'network'} onClick={() => setActiveTab('network')}>Network Activity</TabButton>
              <TabButton active={activeTab === 'diffs'} onClick={() => setActiveTab('diffs')}>Visual Changes</TabButton>
            </div>

            <div style={{ padding: '1.5rem', maxHeight: '500px', overflowY: 'auto' }}>
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  {results?.consoleErrors && results.consoleErrors.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {results.consoleErrors.map((err, i) => (
                        <div key={i} style={{
                          padding: '0.75rem',
                          background: err.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : err.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          borderLeft: `3px solid ${err.type === 'error' ? 'var(--error)' : err.type === 'warning' ? 'var(--warning)' : 'var(--info)'}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{
                              fontWeight: 600,
                              color: err.type === 'error' ? 'var(--error)' : err.type === 'warning' ? 'var(--warning)' : 'var(--info)',
                              textTransform: 'uppercase',
                              fontSize: '0.7rem'
                            }}>
                              {err.type}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {err.source ? `${err.source}:${err.line || '?'}` : err.timestamp}
                            </span>
                          </div>
                          <div style={{ color: 'var(--text-primary)', wordBreak: 'break-word' }}>
                            {err.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      ✓ No console errors captured during this test session.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'network' && (
                <div>
                  {results?.networkErrors && results.networkErrors.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {results.networkErrors.map((err, i) => (
                        <div key={i} style={{
                          padding: '0.75rem',
                          background: err.status >= 500 ? 'rgba(239, 68, 68, 0.1)' : err.status >= 400 ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-md)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: err.status >= 500 ? 'var(--error)' : err.status >= 400 ? 'var(--warning)' : 'var(--success)',
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: 600
                            }}>
                              {err.status}
                            </span>
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{err.method}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{err.resourceType || 'request'}</span>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                            {err.url}
                          </div>
                          {err.errorText && (
                            <div style={{ color: 'var(--error)', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                              {err.errorText}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      ✓ No network errors detected during this test session.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'diffs' && (
                <div>
                  {visualIssues && visualIssues.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {visualIssues.map((issue, i) => (
                        <div key={i} style={{
                          padding: '1rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-md)',
                          borderLeft: `3px solid ${issue.severity === 'high' ? 'var(--error)' : issue.severity === 'medium' ? 'var(--warning)' : 'var(--info)'}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{issue.type}</span>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: issue.severity === 'high' ? 'rgba(239, 68, 68, 0.1)' : issue.severity === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                              color: issue.severity === 'high' ? 'var(--error)' : issue.severity === 'medium' ? 'var(--warning)' : 'var(--info)',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'uppercase'
                            }}>
                              {issue.severity}
                            </span>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {issue.description}
                          </div>
                          {issue.screenshot && (
                            <img src={issue.screenshot} alt="Visual issue" style={{ marginTop: '0.75rem', maxWidth: '100%', borderRadius: 'var(--radius-sm)' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      ✓ No visual changes or issues detected.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
