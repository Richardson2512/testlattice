'use client'

import { useEffect, useState } from 'react'
import { api, TestRun, Project, DeviceProfile } from '../../lib/api'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { validateTestUrl } from '@/lib/urlValidator'
import { DeviceProfileSelector } from '@/components/DeviceProfileSelector'
import { BrowserMatrixSelector } from '@/components/BrowserMatrixSelector'
import { LandingHeader } from '@/components/LandingHeader' // Re-using header style if needed or create specific DashboardHeader

type TestMode = 'single' | 'multi'

// --- COMPONENTS ---

const DashboardHeader = ({ userEmail, onLogout }: { userEmail: string, onLogout: () => void }) => (
  <header style={{
    height: '64px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '0 2rem', background: '#0f172a'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Link href="/dashboard" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
        TestLattice
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
        <Link href="/dashboard" style={{ color: '#fff', fontWeight: 500 }}>Overview</Link>
        <Link href="#" style={{ color: 'inherit' }}>Integrations</Link>
        <Link href="#" style={{ color: 'inherit' }}>Settings</Link>
      </nav>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button style={{ padding: '6px 12px', background: '#334155', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}>
        Docs
      </button>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
        {userEmail[0]?.toUpperCase()}
      </div>
    </div>
  </header>
)

const StatCard = ({ title, value, subtext, color = '#3b82f6' }: { title: string, value: string | number, subtext: string, color?: string }) => (
  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>{title}</div>
    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{value}</div>
    <div style={{ color: color, fontSize: '0.85rem', fontWeight: 500 }}>{subtext}</div>
  </div>
)

const ProjectCard = ({ name, id, runCount }: { name: string, id: string, runCount: number }) => (
  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          📦
        </div>
        <div style={{ fontSize: '1.2rem', color: '#64748b' }}>⋮</div>
      </div>
      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{name}</h3>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <span style={{ fontSize: '0.8rem', background: '#0f172a', padding: '4px 8px', borderRadius: '4px', color: '#94a3b8' }}>
        {runCount} runs
      </span>
      <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px', color: '#10b981' }}>
        Active
      </span>
    </div>
  </div>
)

// --- MAIN PAGE ---

export default function DashboardPage() {
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<string>('none')
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [showCreateTestModal, setShowCreateTestModal] = useState(false)

  // Create Project State
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')

  // User State
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [teamId, setTeamId] = useState<string>('default-team')

  // Create Test State
  const [testMode, setTestMode] = useState<TestMode>('single')
  const [singlePageUrl, setSinglePageUrl] = useState('')
  const [multiPageUrls, setMultiPageUrls] = useState<string[]>([''])
  const [extraInstructions, setExtraInstructions] = useState('')
  const [device, setDevice] = useState('chrome-latest')
  const [browserMatrix, setBrowserMatrix] = useState<Array<'chromium' | 'firefox' | 'webkit'>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        setUserEmail(user.email || 'User')
        setTeamId(user.id)
      }
    }
    getUserInfo()
  }, [])

  useEffect(() => {
    if (teamId) {
      loadData()
    }
  }, [selectedProject, teamId])

  async function loadData() {
    setLoading(true)
    try {
      const [runsResponse, projectsResponse] = await Promise.all([
        api.listTestRuns(selectedProject && selectedProject !== 'none' ? selectedProject : undefined),
        api.listProjects(),
      ])
      setTestRuns(runsResponse.testRuns)
      setProjects(projectsResponse.projects)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  // .. Handlers (Identical logic) ..

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

      if (urls.length === 0 || !mainUrl) return setIsSubmitting(false)

      for (const url of urls) {
        const validation = validateTestUrl(url)
        if (!validation.valid) {
          alert(`Invalid URL: ${validation.error}`)
          setIsSubmitting(false)
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
      alert(`Failed to create test: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper functions for multi Urls
  function addMultiPageUrl() { if (multiPageUrls.length < 3) setMultiPageUrls([...multiPageUrls, '']) }
  function removeMultiPageUrl(index: number) { setMultiPageUrls(multiPageUrls.filter((_, i) => i !== index)) }
  function updateMultiPageUrl(index: number, value: string) {
    const updated = [...multiPageUrls]
    updated[index] = value
    setMultiPageUrls(updated)
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981' // emerald-500
      case 'failed': return '#ef4444' // red-500
      case 'running': return '#3b82f6' // blue-500
      default: return '#94a3b8' // slate-400
    }
  }

  // --- RENDER ---

  if (loading && testRuns.length === 0 && projects.length === 0) {
    return <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Dashboard...</div>
  }

  // Derived Stats
  const totalRuns = testRuns.length
  const passRate = totalRuns > 0 ? Math.round((testRuns.filter(r => r.status === 'completed').length / totalRuns) * 100) : 0
  const activeNow = testRuns.filter(r => r.status === 'running' || r.status === 'queued').length

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: 'var(--font-inter)', color: '#f8fafc' }}>
      <DashboardHeader userEmail={userEmail} onLogout={() => { }} />

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0 }}>Dashboard</h1>
              <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Welcome back, here is your testing overview.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                style={{ padding: '0.6rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
              >
                <option value="none">All Projects</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button onClick={() => setShowCreateProjectModal(true)} style={{ padding: '0.6rem 1rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>+ New Project</button>
              <button onClick={() => setShowCreateTestModal(true)} style={{ padding: '0.6rem 1.25rem', background: '#b91c1c', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(185, 28, 28, 0.4)' }}>
                New Run
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <StatCard title="Health Score" value={`${passRate}%`} subtext="Last 30 days" color={passRate > 80 ? '#10b981' : '#ef4444'} />
            <StatCard title="Total Runs" value={totalRuns} subtext="Lifetime" />
            <StatCard title="Active Jobs" value={activeNow} subtext="Running now" color="#fbbf24" />
            <StatCard title="Flake Rate" value="0.4%" subtext="Very Low" color="#10b981" />
          </div>

          {/* Split Content: Recent Runs (2/3) & Projects (1/3) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

            {/* Recent Runs Table */}
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Recent Test Runs</h2>
                <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.9rem' }}>View All</button>
              </div>
              {testRuns.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No runs found</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead style={{ background: '#0f172a', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Project</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>URL / Build</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testRuns.slice(0, 10).map(run => (
                      <tr key={run.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            display: 'inline-block', padding: '2px 8px', borderRadius: '12px',
                            fontSize: '0.75rem', fontWeight: 600,
                            background: `${getStatusColor(run.status)}20`, color: getStatusColor(run.status)
                          }}>
                            {run.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>{projects.find(p => p.id === run.projectId)?.name || 'Unknown'}</td>
                        <td style={{ padding: '1rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#cbd5e1' }}>
                          {run.build?.url}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#94a3b8' }}>{new Date(run.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Projects List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Active Projects</h2>
              </div>
              {projects.slice(0, 3).map(p => (
                <ProjectCard key={p.id} name={p.name} id={p.id} runCount={testRuns.filter(r => r.projectId === p.id).length} />
              ))}
              {projects.length === 0 && <div style={{ color: '#64748b', fontStyle: 'italic' }}>No projects yet.</div>}
            </div>

          </div>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ width: '100%', maxWidth: '500px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Create New Project</h2>
            <form onSubmit={handleCreateProject} style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Project Name</label>
                <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} placeholder="e.g. Core App" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Description</label>
                <textarea value={newProjectDescription} onChange={e => setNewProjectDescription(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} placeholder="Optional description" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreateProjectModal(false)} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Test Modal */}
      {showCreateTestModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ width: '100%', maxWidth: '800px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Create New Run</h2>
              <button onClick={() => setShowCreateTestModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleCreateTest} style={{ display: 'grid', gap: '2rem' }}>

              {/* Project & Mode */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Select Project</label>
                  <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}>
                    <option value="none">Choose Project...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Test Mode</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ flex: 1, padding: '0.75rem', background: testMode === 'single' ? '#b91c1c20' : '#0f172a', border: `1px solid ${testMode === 'single' ? '#b91c1c' : '#334155'}`, borderRadius: '8px', cursor: 'pointer' }}>
                      <input type="radio" value="single" checked={testMode === 'single'} onChange={() => changeMode('single')} style={{ display: 'none' }} />
                      <div style={{ fontWeight: 600, color: testMode === 'single' ? '#fca5a5' : '#fff' }}>Single Page</div>
                    </label>
                    <label style={{ flex: 1, padding: '0.75rem', background: testMode === 'multi' ? '#b91c1c20' : '#0f172a', border: `1px solid ${testMode === 'multi' ? '#b91c1c' : '#334155'}`, borderRadius: '8px', cursor: 'pointer' }}>
                      <input type="radio" value="multi" checked={testMode === 'multi'} onChange={() => changeMode('multi')} style={{ display: 'none' }} />
                      <div style={{ fontWeight: 600, color: testMode === 'multi' ? '#fca5a5' : '#fff' }}>Multi Page</div>
                    </label>
                  </div>
                </div>
              </div>

              {/* URL Input */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Target URL(s)</label>
                {testMode === 'single' ? (
                  <input value={singlePageUrl} onChange={e => setSinglePageUrl(e.target.value)} required type="url" placeholder="https://example.com" style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
                ) : (
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {multiPageUrls.map((url, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input value={url} onChange={e => updateMultiPageUrl(i, e.target.value)} placeholder={`Step ${i + 1} URL`} style={{ flex: 1, padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
                        {i > 0 && <button type="button" onClick={() => removeMultiPageUrl(i)} style={{ padding: '0 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>×</button>}
                      </div>
                    ))}
                    {multiPageUrls.length < 3 && <button type="button" onClick={addMultiPageUrl} style={{ padding: '0.5rem', background: '#334155', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>+ Add Step</button>}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Configuration</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                  <DeviceProfileSelector value={device as DeviceProfile} onChange={setDevice} />
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Instructions (AI)</label>
                    <textarea value={extraInstructions} onChange={e => setExtraInstructions(e.target.value)} placeholder="e.g. 'Click the signup button'" style={{ width: '100%', height: '100px', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
                  </div>
                </div>
                <BrowserMatrixSelector selected={browserMatrix} onChange={setBrowserMatrix} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowCreateTestModal(false)} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 2rem', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Starting...' : 'Start Test Run'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
