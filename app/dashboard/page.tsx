'use client'

import { useEffect, useState } from 'react'
import { api, TestRun, Project, DeviceProfile } from '../../lib/api'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { validateTestUrl } from '@/lib/urlValidator'
import { DeviceProfileSelector } from '@/components/DeviceProfileSelector'
import { BrowserMatrixSelector } from '@/components/BrowserMatrixSelector'
import { useDashboardData, invalidateTestRuns, invalidateProjects, useTierInfo } from '@/lib/hooks'
import { DashboardSkeleton, FetchingIndicator } from '@/components/Skeleton'
import { UpgradeModal } from '@/components/UpgradeModal'
import { UpgradeBanner } from '@/components/UpgradeBanner'
import { canCreateTest, isFeatureAvailable } from '@/lib/usageCheck'
import { useUsage } from '@/lib/hooks/useUsage'
import type { PricingTier } from '@/lib/pricing'

type TestMode = 'single' | 'multi'

// --- THEMED COMPONENTS ---

const StatCard = ({ title, value, subtext, icon, color = 'var(--primary)' }: { title: string; value: string | number; subtext: string; icon: string; color?: string }) => (
  <div className="glass-card" style={{
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </span>
      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
    </div>
    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.8rem', fontWeight: 500, color }}>{subtext}</div>
  </div>
)

const ProjectCard = ({ name, id, runCount, onClick }: { name: string; id: string; runCount: number; onClick?: () => void }) => (
  <div
    className="glass-card"
    style={{
      padding: '1.25rem',
      cursor: onClick ? 'pointer' : 'default',
    }}
    onClick={onClick}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, var(--beige-200) 0%, var(--beige-100) 100%)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
      }}>
        📦
      </div>
      <button style={{
        background: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        cursor: 'pointer',
      }}>⋮</button>
    </div>
    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{name}</h3>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <span style={{
        fontSize: '0.75rem',
        background: 'var(--beige-100)',
        padding: '4px 8px',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-secondary)',
      }}>
        {runCount} runs
      </span>
      <span style={{
        fontSize: '0.75rem',
        background: 'rgba(5, 150, 105, 0.1)',
        padding: '4px 8px',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--success)',
      }}>
        Active
      </span>
    </div>
  </div>
)

// --- MAIN PAGE ---

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<string>('none')
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [showCreateTestModal, setShowCreateTestModal] = useState(false)

  // Create Project State
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')

  // User State
  const [userId, setUserId] = useState<string | null>(null)
  const [teamId, setTeamId] = useState<string>('default-team')

  // Create Test State
  const [testMode, setTestMode] = useState<TestMode>('single')
  const [selectedTestTypes, setSelectedTestTypes] = useState<Set<string>>(new Set()) // Multi-select: visual, login, signup, navigation, form, accessibility, rage_bait
  const [singlePageUrl, setSinglePageUrl] = useState('')
  const [multiPageUrls, setMultiPageUrls] = useState<string[]>([''])
  const [extraInstructions, setExtraInstructions] = useState('')
  const [device, setDevice] = useState('chrome-latest')
  const [browserMatrix, setBrowserMatrix] = useState<Array<'chromium' | 'firefox' | 'webkit'>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Use optimized data fetching hook with caching and auto-refresh
  const {
    testRuns,
    projects,
    isLoading: loading,
    isFetching,
    refetch: loadData,
    invalidate
  } = useDashboardData({ selectedProject, enabled: !!teamId })

  // Get tier info and usage
  const { data: tierInfo } = useTierInfo()
  const { usage } = useUsage()

  // Map backend tier to pricing tier
  const tierMap: Record<string, PricingTier> = {
    'guest': 'free',
    'starter': 'starter',
    'indie': 'indie',
    'pro': 'pro',
    'agency': 'pro',
  }
  const currentTier = tierInfo ? (tierMap[tierInfo.tier] || 'free') : 'free'

  // Upgrade modal state
  const [upgradeModal, setUpgradeModal] = useState<{
    isOpen: boolean
    type: 'test-limit' | 'visual-test-limit' | 'locked-feature'
    feature?: string
  }>({ isOpen: false, type: 'test-limit' })


  // -- LOGIC --

  const changeMode = (mode: TestMode) => {
    setTestMode(mode)
    if (mode === 'single') {
      setMultiPageUrls([''])
    } else {
      setSinglePageUrl('')
    }
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        setTeamId(user.id)

        // Reconcile subscription with Polar (self-healing for webhook failures)
        api.reconcileSubscription().catch((err) => {
          console.warn('Subscription reconciliation failed:', err.message)
        })
      }
    }
    getUserInfo()
  }, [])

  // Handle pending guest test association after signup/login
  useEffect(() => {
    const handlePendingGuestTest = async () => {
      if (!userId) return

      const pendingTestId = sessionStorage.getItem('pending_guest_test')
      if (!pendingTestId) return

      try {
        // Associate guest test with user (API will handle this)
        await api.associateGuestTest(pendingTestId, userId)
        sessionStorage.removeItem('pending_guest_test')

        // Redirect to the test report page
        window.location.href = `/test/run/${pendingTestId}`
      } catch (err: any) {
        console.warn('Failed to associate guest test:', err.message)
        sessionStorage.removeItem('pending_guest_test')
      }
    }
    handlePendingGuestTest()
  }, [userId])

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await api.createProject({
        name: newProjectName,
        description: newProjectDescription || undefined,
        teamId: teamId || userId || 'default-team',
      })
      setShowCreateProjectModal(false)
      setNewProjectName('')
      setNewProjectDescription('')
      invalidateProjects() // Invalidate cache to trigger refetch
      loadData()
    } catch (error: any) {
      alert(`Failed to create project: ${error.message}`)
    }
  }

  async function handleCreateTest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (!selectedProject || selectedProject === 'none') {
        alert('Please select or create a project')
        setIsSubmitting(false)
        return
      }

      let urls: string[] = []
      let mainUrl = ''

      if (testMode === 'single') {
        urls = [singlePageUrl].filter(Boolean)
        mainUrl = singlePageUrl
      } else if (testMode === 'multi') {
        urls = multiPageUrls.filter(Boolean)
        mainUrl = urls[0]
      }

      if (urls.length === 0 || !mainUrl) {
        setIsSubmitting(false)
        return
      }

      for (const url of urls) {
        const validation = validateTestUrl(url)
        if (!validation.valid) {
          alert(`Invalid URL: ${validation.error}`)
          setIsSubmitting(false)
          return
        }
      }

      // Check usage limits before creating test
      if (usage) {
        const isVisualTest = false // TODO: Check if visual test is enabled
        const checkResult = canCreateTest(currentTier, {
          totalTests: usage.totalTests,
          visualTests: usage.visualTests,
        }, {
          isVisualTest,
          device: device as DeviceProfile,
        })

        if (!checkResult.canProceed) {
          setIsSubmitting(false)
          setUpgradeModal({
            isOpen: true,
            type: (checkResult.reason === 'mobile-locked' ? 'locked-feature' : checkResult.reason) as 'test-limit' | 'visual-test-limit' | 'locked-feature' || 'test-limit',
            feature: checkResult.reason === 'mobile-locked' ? 'mobile' : undefined,
          })
          return
        }
      }

      const response = await api.createTestRun({
        projectId: selectedProject,
        build: { type: 'web', url: mainUrl },
        profile: { device: device as any, maxMinutes: 10 },
        options: {
          coverage: extraInstructions ? [extraInstructions] : undefined,
          testMode: testMode,
          browserMatrix: browserMatrix.length > 0 ? browserMatrix : undefined,
          approvalPolicy: { mode: 'manual' },
          // Selected test types for registered users (multi-select)
          selectedTestTypes: selectedTestTypes.size > 0 ? Array.from(selectedTestTypes) : undefined,
          // Credentials for login/signup tests
          guestCredentials: (selectedTestTypes.has('login') || selectedTestTypes.has('signup')) && loginUsername
            ? { email: loginUsername, password: loginPassword }
            : undefined,
        },
      })

      setShowCreateTestModal(false)
      setSinglePageUrl('')
      setMultiPageUrls([''])
      window.location.href = `/test/run/${response.runId}`
    } catch (error: any) {
      // Check if error is about tier limits
      if (error.message?.includes('Tier limit') || error.message?.includes('limit exceeded')) {
        setUpgradeModal({
          isOpen: true,
          type: 'test-limit',
        })
      } else {
        alert(`Failed to create test: ${error.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function addMultiPageUrl() { if (multiPageUrls.length < 3) setMultiPageUrls([...multiPageUrls, '']) }
  function removeMultiPageUrl(index: number) { setMultiPageUrls(multiPageUrls.filter((_, i) => i !== index)) }
  function updateMultiPageUrl(index: number, value: string) {
    const updated = [...multiPageUrls]
    updated[index] = value
    setMultiPageUrls(updated)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--success)'
      case 'failed': return 'var(--error)'
      case 'running': return 'var(--info)'
      default: return 'var(--text-muted)'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'rgba(5, 150, 105, 0.1)'
      case 'failed': return 'rgba(220, 38, 38, 0.1)'
      case 'running': return 'rgba(37, 99, 235, 0.1)'
      default: return 'var(--beige-100)'
    }
  }

  // --- RENDER ---

  // Show skeleton on initial load
  if (loading && testRuns.length === 0 && projects.length === 0) {
    return <DashboardSkeleton />
  }

  // Derived Stats
  const totalRuns = testRuns.length
  const passRate = totalRuns > 0 ? Math.round((testRuns.filter(r => r.status === 'completed').length / totalRuns) * 100) : 0
  const activeNow = testRuns.filter(r => r.status === 'running' || r.status === 'queued').length
  const avgDuration = testRuns.filter(r => r.duration).length > 0
    ? Math.round(testRuns.filter(r => r.duration).reduce((acc, r) => acc + (r.duration || 0), 0) / testRuns.filter(r => r.duration).length / 1000)
    : 0

  async function handleCancelRun(e: React.MouseEvent, runId: string) {
    e.stopPropagation()
    if (!confirm('Are you sure you want to cancel this test run?')) return

    try {
      // Optimistic update could go here, but refetch is safer for consistency
      await api.cancelTestRun(runId)
      loadData() // Trigger refetch to update UI
    } catch (error: any) {
      alert(`Failed to cancel run: ${error.message}`)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      padding: '2rem',
    }}>
      <div style={{ width: '100%' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              marginBottom: '0.25rem',
            }}>Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                Welcome back! Here's your testing overview.
              </p>
              <FetchingIndicator show={isFetching && !loading} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <option value="none">All Projects</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <button
              onClick={() => setShowCreateProjectModal(true)}
              style={{
                padding: '0.6rem 1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              + Project
            </button>
            <button
              onClick={() => setShowCreateTestModal(true)}
              style={{
                padding: '0.6rem 1.25rem',
                background: 'var(--primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(92, 15, 15, 0.2)',
              }}
            >
              New Test Run
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <StatCard
            title="Health Score"
            value={`${passRate}%`}
            subtext="Last 30 days"
            icon="💚"
            color={passRate > 80 ? 'var(--success)' : 'var(--error)'}
          />
          <StatCard
            title="Total Runs"
            value={totalRuns}
            subtext="Lifetime"
            icon="🧪"
            color="var(--text-secondary)"
          />
          <StatCard
            title="Active Tests"
            value={activeNow}
            subtext="Running now"
            icon="⚡"
            color="var(--warning)"
          />
          <StatCard
            title="Avg Duration"
            value={avgDuration > 0 ? `${avgDuration}s` : '-'}
            subtext="Per test"
            icon="⏱️"
            color="var(--info)"
          />
        </div>

        {/* Split Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem',
        }}>
          {/* Recent Runs */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                Recent Test Runs
              </h2>
              <Link href="/runs" style={{
                color: 'var(--primary)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                View All →
              </Link>
            </div>

            {testRuns.length === 0 ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧪</div>
                No test runs yet. Create your first test!
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--beige-50)' }}>
                    <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Project</th>
                    <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>URL</th>
                    <th style={{ padding: '0.75rem 1.25rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '0.75rem 1.25rem', width: '80px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {testRuns.slice(0, 5).map((run, i) => (
                    <tr
                      key={run.id}
                      style={{
                        borderBottom: i < testRuns.slice(0, 5).length - 1 ? '1px solid var(--border-light)' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => window.location.href = `/test/run/${run.id}`}
                    >
                      <td style={{ padding: '0.75rem 1.25rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          background: getStatusBg(run.status),
                          color: getStatusColor(run.status),
                        }}>
                          {run.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {projects.find(p => p.id === run.projectId)?.name || 'Unknown'}
                      </td>
                      <td style={{
                        padding: '0.75rem 1.25rem',
                        color: 'var(--text-muted)',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {run.build?.url}
                      </td>
                      <td style={{ padding: '0.75rem 1.25rem', textAlign: 'right', color: 'var(--text-muted)' }}>
                        {new Date(run.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.75rem 1.25rem', textAlign: 'right' }}>
                        {['running', 'queued', 'pending', 'diagnosing'].includes(run.status) &&
                          !['completed', 'failed', 'cancelled', 'timed_out'].includes(run.status) && (
                            <button
                              onClick={(e) => handleCancelRun(e, run.id)}
                              style={{
                                padding: '4px 8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: 'var(--error)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--error)';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                e.currentTarget.style.color = 'var(--error)';
                              }}
                            >
                              Cancel
                            </button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Subscription Status */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                Subscription Status
              </h2>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    💎
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>CURRENT PLAN</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                      {currentTier}
                    </div>
                  </div>
                </div>
                {currentTier === 'free' && (
                  <Link href="/pricing" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                    Upgrade
                  </Link>
                )}
              </div>

              {/* Usage Stats */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Monthly Usage</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {usage?.totalTests || 0} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {usage?.totalTestsLimit || 3} runs</span>
                  </span>
                </div>
                <div style={{ height: '8px', background: 'var(--beige-200)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, ((usage?.totalTests || 0) / (usage?.totalTestsLimit || 1)) * 100)}%`,
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--maroon-600) 100%)',
                    borderRadius: '4px',
                  }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Resets on {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
                </p>
              </div>

              {/* Quick Link */}
              <Link href="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}>
                <span>⚙️</span> Manage Subscription
              </Link>

              <Link href="/dashboard/credentials" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}>
                <span>🔐</span> Manage Credentials
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(61, 54, 48, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Create New Project
            </h2>
            <form onSubmit={handleCreateProject} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Project Name
                </label>
                <input
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  required
                  placeholder="e.g. Core App"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Description (optional)
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={e => setNewProjectDescription(e.target.value)}
                  placeholder="Brief description..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    minHeight: '80px',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateProjectModal(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Test Modal */}
      {showCreateTestModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(61, 54, 48, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
        }}>
          <div style={{
            width: '100%',
            maxWidth: '850px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                Create New Test Run
              </h2>
              <button
                onClick={() => setShowCreateTestModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >×</button>
            </div>

            {/* Free Tier Limit Banner */}
            {currentTier === 'free' && (
              <div style={{
                padding: '0.75rem',
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>⚠️</span>
                <span><strong>Free Plan:</strong> Limited to 3 runs/month • Chrome Only • Single Page. <Link href="/pricing" style={{ color: 'var(--warning)', textDecoration: 'underline' }}>Upgrade for more</Link></span>
              </div>
            )}

            <form onSubmit={handleCreateTest} style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Project & Mode */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    Select Project
                  </label>
                  <select
                    value={selectedProject}
                    onChange={e => setSelectedProject(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="none">Choose Project...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                {/* Test Mode Selector - Hidden for Free Tier */}
                {currentTier !== 'free' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                      Test Mode
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => changeMode('single')}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: testMode === 'single' ? 'rgba(92, 15, 15, 0.08)' : 'var(--bg-primary)',
                          border: `1px solid ${testMode === 'single' ? 'var(--primary)' : 'var(--border-medium)'}`,
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: testMode === 'single' ? 'var(--primary)' : 'var(--text-secondary)',
                        }}
                      >
                        Single Page
                      </button>
                      <button
                        type="button"
                        onClick={() => changeMode('multi')}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: testMode === 'multi' ? 'rgba(92, 15, 15, 0.08)' : 'var(--bg-primary)',
                          border: `1px solid ${testMode === 'multi' ? 'var(--primary)' : 'var(--border-medium)'}`,
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: testMode === 'multi' ? 'var(--primary)' : 'var(--text-secondary)',
                        }}
                      >
                        Multi Page
                      </button>
                    </div>
                    {testMode === 'multi' && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--warning)' }}>
                        ⓘ Each page counts as a separate test against your monthly quota.
                      </div>
                    )}
                  </div>
                )}

                {/* Free Tier: Show Read-Only Mode Badge instead of selector */}
                {currentTier === 'free' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                      Test Mode
                    </label>
                    <div style={{
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>Single Page</span>
                      <Link href="/pricing" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Upgrade to Multi →</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* URL Input */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Target URL(s)
                </label>
                {testMode === 'single' ? (
                  <input
                    value={singlePageUrl}
                    onChange={e => setSinglePageUrl(e.target.value)}
                    required
                    type="url"
                    placeholder="https://example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                ) : (
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {multiPageUrls.map((url, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          value={url}
                          onChange={e => updateMultiPageUrl(i, e.target.value)}
                          placeholder={`Step ${i + 1} URL`}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                          }}
                        />
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() => removeMultiPageUrl(i)}
                            style={{
                              padding: '0 1rem',
                              background: 'var(--error)',
                              border: 'none',
                              borderRadius: 'var(--radius-md)',
                              color: 'white',
                              cursor: 'pointer',
                            }}
                          >×</button>
                        )}
                      </div>
                    ))}
                    {multiPageUrls.length < 3 && (
                      <button
                        type="button"
                        onClick={addMultiPageUrl}
                        style={{
                          padding: '0.5rem',
                          background: 'var(--beige-100)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                        }}
                      >+ Add Step</button>
                    )}
                  </div>
                )}
              </div>

              {/* Test Type Selector */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Test Types <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(select one or more)</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'visual', label: 'Visual', icon: '👁️', desc: 'UI & screenshots', tooltip: 'Detects layout shifts, broken images, and visual regressions across browsers.' },
                    { id: 'login', label: 'Login', icon: '🔐', desc: 'Auth testing', tooltip: 'Verifies login flows, invalid credentials handling, and session management.' },
                    { id: 'signup', label: 'Sign Up', icon: '📝', desc: 'Registration', tooltip: 'Tests signup forms, validation rules, and successful account creation.' },
                    { id: 'form', label: 'Form', icon: '📋', desc: 'Input validation', tooltip: 'Validates form inputs, error states, and submission handling.' },
                    { id: 'navigation', label: 'Navigation', icon: '🔗', desc: 'Link testing', tooltip: 'Crawls internal links to ensure no broken paths and proper routing.' },
                    { id: 'accessibility', label: 'Accessibility', icon: '♿', desc: 'WCAG audit', tooltip: 'Checks for WCAG compliance, ARIA attributes, and screen reader compatibility.' },
                    { id: 'rage_bait', label: 'Rage Bait', icon: '🔥', desc: 'Edge cases', tooltip: 'Tests 5 MVP-breaking scenarios: back button, session timeout, Enter key, special chars, input overflow.' },
                  ].map((type) => {
                    const isSelected = selectedTestTypes.has(type.id)
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          const newSet = new Set(selectedTestTypes)
                          if (newSet.has(type.id)) {
                            newSet.delete(type.id)
                          } else {
                            newSet.add(type.id)
                          }
                          setSelectedTestTypes(newSet)
                        }}
                        style={{
                          padding: '0.5rem',
                          background: isSelected ? 'rgba(92, 15, 15, 0.08)' : 'var(--bg-primary)',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-medium)'}`,
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                          position: 'relative',
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            width: '16px',
                            height: '16px',
                            background: 'var(--primary)',
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>✓</div>
                        )}
                        {/* Info icon with tooltip */}
                        <div
                          title={type.tooltip}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            width: '14px',
                            height: '14px',
                            background: 'var(--beige-200)',
                            borderRadius: '50%',
                            color: 'var(--text-muted)',
                            fontSize: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'help',
                          }}
                        >ⓘ</div>
                        <div style={{ fontSize: '1.25rem' }}>{type.icon}</div>
                        <div style={{ fontWeight: 600 }}>{type.label}</div>
                      </button>
                    )
                  })}
                </div>
                {selectedTestTypes.size > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Selected: {Array.from(selectedTestTypes).join(', ')}
                  </div>
                )}
              </div>

              {/* Login/Signup Credentials (when login or signup selected) */}
              {(selectedTestTypes.has('login') || selectedTestTypes.has('signup')) && (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(217, 119, 6, 0.05)',
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--warning)', fontSize: '0.8rem' }}>
                    <span>⚠️</span> <strong>Demo credentials only!</strong> Do not enter real passwords.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.375rem', color: 'var(--text-secondary)' }}>
                        Email / Username
                      </label>
                      <input
                        type="text"
                        placeholder="demo@example.com"
                        value={loginUsername}
                        onChange={e => setLoginUsername(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem',
                          fontSize: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-medium)',
                          background: 'var(--bg-primary)',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.375rem', color: 'var(--text-secondary)' }}>
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem',
                          fontSize: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-medium)',
                          background: 'var(--bg-primary)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Configuration */}
              {currentTier !== 'free' && (
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Configuration
                  </h3>
                  {/* Mobile Device Upgrade Banner */}
                  {device && !isFeatureAvailable(currentTier, 'mobile') && [
                    DeviceProfile.MOBILE_CHROME,
                    DeviceProfile.MOBILE_SAFARI,
                    DeviceProfile.MOBILE_CHROME_ANDROID,
                    DeviceProfile.ANDROID_EMULATOR,
                    DeviceProfile.IOS_SIMULATOR,
                  ].includes(device as DeviceProfile) && (
                      <UpgradeBanner
                        feature="mobile"
                        currentTier={currentTier}
                        onDismiss={() => setDevice('chrome-latest')}
                      />
                    )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
                    <DeviceProfileSelector value={device as DeviceProfile} onChange={setDevice} />
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                        AI Instructions
                      </label>
                      <textarea
                        value={extraInstructions}
                        onChange={e => setExtraInstructions(e.target.value)}
                        placeholder="e.g. 'Click the signup button'"
                        style={{
                          width: '100%',
                          height: '80px',
                          padding: '0.75rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                        }}
                      />
                    </div>
                  </div>
                  <BrowserMatrixSelector value={browserMatrix} onChange={setBrowserMatrix} />
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateTestModal(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '0.6rem 1.5rem',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? 'Starting...' : 'Start Test Run'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModal.isOpen}
        onClose={() => setUpgradeModal({ ...upgradeModal, isOpen: false })}
        type={upgradeModal.type}
        feature={upgradeModal.feature}
        currentTier={currentTier}
      />
    </div>
  )
}
