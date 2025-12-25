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
  const [singlePageUrl, setSinglePageUrl] = useState('')
  const [multiPageUrls, setMultiPageUrls] = useState<string[]>([''])
  const [extraInstructions, setExtraInstructions] = useState('')
  const [device, setDevice] = useState('chrome-latest')
  const [browserMatrix, setBrowserMatrix] = useState<Array<'chromium' | 'firefox' | 'webkit'>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      }
    }
    getUserInfo()
  }, [])

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
                  </tr>
                </thead>
                <tbody>
                  {testRuns.slice(0, 8).map((run, i) => (
                    <tr
                      key={run.id}
                      style={{
                        borderBottom: i < testRuns.slice(0, 8).length - 1 ? '1px solid var(--border-light)' : 'none',
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Projects */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                Projects
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.slice(0, 4).map(p => (
                <ProjectCard
                  key={p.id}
                  name={p.name}
                  id={p.id}
                  runCount={testRuns.filter(r => r.projectId === p.id).length}
                />
              ))}
              {projects.length === 0 && (
                <div className="glass-card" style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📁</div>
                  No projects yet
                </div>
              )}
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
            maxWidth: '720px',
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
                </div>
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

              {/* Configuration */}
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
