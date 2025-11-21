'use client'

import { useEffect, useState } from 'react'
import { api, TestRun, Project } from '../../lib/api'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [showCreateTestModal, setShowCreateTestModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [teamId, setTeamId] = useState<string>('default-team')
  
  // Test creation form state
  const [testMode, setTestMode] = useState<'single' | 'multi' | 'all'>('single')
  const [singlePageUrl, setSinglePageUrl] = useState('')
  const [multiPageUrls, setMultiPageUrls] = useState<string[]>([''])
  const [allPagesBaseUrl, setAllPagesBaseUrl] = useState('')
  const [extraInstructions, setExtraInstructions] = useState('')
  const [device, setDevice] = useState('chrome-latest')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get user ID and team ID from Supabase
    const getUserInfo = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        // Use user ID as team ID (or you can create a teams table later)
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
        api.listTestRuns(selectedProject || undefined),
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

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    try {
      // Create project with user's team ID
      const response = await api.createProject({
        name: newProjectName,
        description: newProjectDescription || undefined,
        teamId: teamId || userId || 'default-team',
      })
      
      setShowCreateProjectModal(false)
      setNewProjectName('')
      setNewProjectDescription('')
      loadData() // Reload projects
    } catch (error: any) {
      console.error('Failed to create project:', error)
      alert(`Failed to create project: ${error.message || 'Unknown error'}`)
    }
  }

  async function handleCreateTest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!selectedProject) {
        alert('Please select or create a project')
        setIsSubmitting(false)
        return
      }

      // Get URLs based on test mode
      let urls: string[] = []
      let mainUrl = ''
      
      if (testMode === 'single') {
        urls = [singlePageUrl].filter(Boolean)
        mainUrl = singlePageUrl
      } else if (testMode === 'multi') {
        urls = multiPageUrls.filter(Boolean)
        mainUrl = urls[0]
      } else if (testMode === 'all') {
        // For "all pages", use the base URL and let the worker discover pages
        if (!allPagesBaseUrl) {
          alert('Please enter a base URL for all pages test')
          setIsSubmitting(false)
          return
        }
        urls = [allPagesBaseUrl]
        mainUrl = allPagesBaseUrl
      }

      if (urls.length === 0 || !mainUrl) {
        alert('Please add at least one URL')
        setIsSubmitting(false)
        return
      }

      // Validate multi-page URLs (max 3)
      if (testMode === 'multi' && urls.length > 3) {
        alert('Multi-page test supports maximum 3 pages')
        setIsSubmitting(false)
        return
      }

      // Calculate max steps based on mode
      const maxSteps = testMode === 'all' 
        ? 50 // More steps for all pages discovery
        : testMode === 'multi' 
          ? Math.min(urls.length * 5, 15) 
          : 10

      // Create test run
      const response = await api.createTestRun({
        projectId: selectedProject,
        build: {
          type: 'web',
          url: mainUrl,
        },
        profile: {
          device: device as any,
          maxMinutes: 10,
        },
        options: {
          maxSteps,
          coverage: extraInstructions ? [extraInstructions] : undefined,
          testMode: testMode, // Pass test mode to backend
          allPages: testMode === 'all', // Flag for all pages discovery
        },
      })

      // Close modal and reset form
      setShowCreateTestModal(false)
      setSinglePageUrl('')
      setMultiPageUrls([''])
      setAllPagesBaseUrl('')
      setExtraInstructions('')
      setTestMode('single')
      
      // Redirect to test runner
      window.location.href = `/test/run/${response.runId}`
    } catch (error: any) {
      alert(`Failed to create test: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  function addMultiPageUrl() {
    if (multiPageUrls.length < 3) {
      setMultiPageUrls([...multiPageUrls, ''])
    }
  }

  function removeMultiPageUrl(index: number) {
    setMultiPageUrls(multiPageUrls.filter((_, i) => i !== index))
  }

  function updateMultiPageUrl(index: number, value: string) {
    const updated = [...multiPageUrls]
    updated[index] = value
    setMultiPageUrls(updated)
  }

  function getStatusColor(status: TestRun['status']): React.CSSProperties {
    switch (status) {
      case 'completed':
        return { backgroundColor: 'var(--success-light)', color: 'var(--success)' }
      case 'failed':
        return { backgroundColor: 'var(--error-light)', color: 'var(--error)' }
      case 'running':
        return { backgroundColor: 'var(--info-light)', color: 'var(--info)' }
      case 'queued':
        return { backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }
      default:
        return { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }
    }
  }

  if (loading) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--border-light)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Loading...</p>
        </div>
      </div>
    )
  }

  const pausedTests = testRuns.filter(r => r.status === 'running' && r.paused)
  const completedTests = testRuns.filter(r => r.status === 'completed' || r.status === 'failed')

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: 'calc(100vh - 80px)',
    }}>
      {/* Test Credits Display */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--beige-50) 0%, var(--beige-100) 100%)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}>
            Remaining Test Credits
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            background: 'linear-gradient(135deg, var(--maroon-800) 0%, var(--maroon-600) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Unlimited (MVP)
          </div>
        </div>
        <div style={{ 
          fontSize: '0.9375rem', 
          color: 'var(--text-secondary)',
          padding: '0.75rem 1.25rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
        }}>
          <strong style={{ color: 'var(--text-primary)' }}>{testRuns.length}</strong> total test runs
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
          fontWeight: '700',
          color: 'var(--text-primary)',
        }}>
          Test Runs
        </h1>
        <button
          onClick={() => setShowCreateTestModal(true)}
          className="btn btn-primary"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '0.9375rem',
          }}
        >
          + Create New Test
        </button>
      </div>

          {/* Quick Actions */}
          {pausedTests.length > 0 && (
            <div className="card" style={{
              background: 'var(--warning-light)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ 
                fontWeight: '600', 
                marginBottom: '0.75rem', 
                color: 'var(--warning)',
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span>⏸</span>
                <span>{pausedTests.length} Paused Test{pausedTests.length > 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {pausedTests.slice(0, 3).map((test) => (
                  <Link
                    key={test.id}
                    href={`/test/run/${test.id}`}
                    className="btn"
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'var(--warning)',
                      color: 'white',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Resume Test {test.id.substring(0, 8)}...
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Project Filter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
            }}>
              Filter by Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="input"
              style={{
                maxWidth: '300px',
              }}
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

      {/* Test Runs Table */}
      <div className="card" style={{ overflowX: 'auto', padding: '0' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{ 
              borderBottom: '2px solid var(--border-light)',
              background: 'var(--bg-tertiary)',
            }}>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>ID</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Project</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Build Type</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Device</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Status</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Created</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testRuns.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ 
                  padding: '3rem', 
                  textAlign: 'center', 
                  color: 'var(--text-tertiary)',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: '2rem' }}>📋</span>
                    <p style={{ fontSize: '0.9375rem' }}>No test runs found</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                      Create your first test to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              testRuns.map((run, index) => (
                <tr 
                  key={run.id} 
                  style={{ 
                    borderBottom: index < testRuns.length - 1 ? '1px solid var(--border-light)' : 'none',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <td style={{ 
                    padding: '1rem', 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}>
                    {run.id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
                    {projects.find((p) => p.id === run.projectId)?.name || run.projectId}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {run.build.type}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {run.profile.device}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      style={{
                        padding: '0.375rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8125rem',
                        fontWeight: '500',
                        display: 'inline-block',
                        ...getStatusColor(run.status),
                      }}
                    >
                      {run.status}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    color: 'var(--text-tertiary)',
                  }}>
                    {new Date(run.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <Link
                        href={`/test/run/${run.id}`}
                        style={{
                          color: 'var(--text-link)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                        }}
                      >
                        View →
                      </Link>
                      {(run.status === 'completed' || run.status === 'failed') && (
                        <Link
                          href={`/test/report/${run.id}`}
                          style={{
                            color: 'var(--success)',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                          }}
                        >
                          Report →
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Test Modal */}
      {showCreateTestModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-overlay)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setShowCreateTestModal(false)}
        >
          <div
            className="card"
            style={{
              padding: '2.5rem',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-2xl)',
              animation: 'fadeIn 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700',
                color: 'var(--text-primary)',
              }}>
                Create Frontend Test
              </h2>
              <button
                onClick={() => setShowCreateTestModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  padding: '0.25rem',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTest}>
              {/* Project Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Project <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    required
                    className="input"
                    style={{
                      flex: 1,
                    }}
                  >
                    {projects.length === 0 ? (
                      <option value="">No projects - Create one first</option>
                    ) : (
                      projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))
                    )}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateProjectModal(true)
                    }}
                    className="btn"
                    style={{
                      padding: '0.625rem 1rem',
                      background: 'var(--success)',
                      color: 'white',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    + New
                  </button>
                </div>
              </div>

              {/* Test Mode */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontWeight: '600', 
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Test Mode <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="testMode"
                      value="single"
                      checked={testMode === 'single'}
                      onChange={(e) => {
                        setTestMode(e.target.value as 'single' | 'multi' | 'all')
                        setMultiPageUrls([''])
                        setAllPagesBaseUrl('')
                      }}
                    />
                    <span style={{ fontSize: '0.9375rem' }}>Single-page test</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="testMode"
                      value="multi"
                      checked={testMode === 'multi'}
                      onChange={(e) => {
                        setTestMode(e.target.value as 'single' | 'multi' | 'all')
                        setSinglePageUrl('')
                        setAllPagesBaseUrl('')
                      }}
                    />
                    <span style={{ fontSize: '0.9375rem' }}>Multi-page test</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="testMode"
                      value="all"
                      checked={testMode === 'all'}
                      onChange={(e) => {
                        setTestMode(e.target.value as 'single' | 'multi' | 'all')
                        setSinglePageUrl('')
                        setMultiPageUrls([''])
                      }}
                    />
                    <span style={{ fontSize: '0.9375rem' }}>All pages in website</span>
                  </label>
                </div>
              </div>

              {/* URL Inputs */}
              {testMode === 'single' ? (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                  }}>
                    Website URL <span style={{ color: 'var(--error)' }}>*</span>
                  </label>
                  <input
                    type="url"
                    value={singlePageUrl}
                    onChange={(e) => setSinglePageUrl(e.target.value)}
                    placeholder="https://example.com or http://localhost:3000"
                    required
                    className="input"
                  />
                  <p style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.8125rem', 
                    color: 'var(--text-tertiary)',
                  }}>
                    Supports both live sites and localhost URLs
                  </p>
                </div>
              ) : testMode === 'all' ? (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                  }}>
                    Base Website URL <span style={{ color: 'var(--error)' }}>*</span>
                  </label>
                  <input
                    type="url"
                    value={allPagesBaseUrl}
                    onChange={(e) => setAllPagesBaseUrl(e.target.value)}
                    placeholder="https://example.com or http://localhost:3000"
                    required
                    className="input"
                  />
                  <p style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.8125rem', 
                    color: 'var(--text-tertiary)',
                  }}>
                    The system will automatically discover and test all pages on your website starting from this base URL
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem',
                  }}>
                    <label style={{ 
                      fontWeight: '600', 
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                    }}>
                      Website URLs <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <button
                      type="button"
                      onClick={addMultiPageUrl}
                      disabled={multiPageUrls.length >= 3}
                      className="btn"
                      style={{
                        padding: '0.5rem 1rem',
                        background: multiPageUrls.length >= 3 ? 'var(--beige-400)' : 'var(--primary)',
                        color: 'white',
                        fontSize: '0.8125rem',
                        cursor: multiPageUrls.length >= 3 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      + Add URL
                    </button>
                  </div>
                  {multiPageUrls.map((url, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      marginBottom: '0.75rem', 
                      alignItems: 'center',
                    }}>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => updateMultiPageUrl(index, e.target.value)}
                        placeholder={`Page ${index + 1} URL (https://example.com or http://localhost:3000)`}
                        required={index === 0}
                        className="input"
                        style={{
                          flex: 1,
                        }}
                      />
                      {multiPageUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMultiPageUrl(index)}
                          className="btn"
                          style={{
                            padding: '0.625rem',
                            background: 'var(--error)',
                            color: 'white',
                            fontSize: '0.875rem',
                            minWidth: '40px',
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <p style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.8125rem', 
                    color: 'var(--text-tertiary)',
                  }}>
                    Add multiple URLs to test across different pages (max 3 pages in MVP). {multiPageUrls.length >= 3 && <span style={{ color: 'var(--error)' }}>Maximum 3 pages reached.</span>}
                  </p>
                </div>
              )}

              {/* Extra Instructions */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Specify instruction if any
                </label>
                <textarea
                  value={extraInstructions}
                  onChange={(e) => setExtraInstructions(e.target.value)}
                  placeholder="e.g., 'Check navbar', 'Click login button', 'Verify footer links'"
                  rows={4}
                  className="input"
                  style={{
                    resize: 'vertical',
                  }}
                />
                <p style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '0.8125rem', 
                  color: 'var(--text-tertiary)',
                }}>
                  Provide specific guidance for the AI tester
                </p>
              </div>

              {/* Device Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Device/Browser
                </label>
                <select
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="input"
                >
                  <option value="chrome-latest">Chrome (Latest)</option>
                  <option value="firefox-latest">Firefox (Latest)</option>
                  <option value="safari-latest">Safari (Latest)</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                justifyContent: 'flex-end', 
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-light)',
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateTestModal(false)
                    setSinglePageUrl('')
                    setMultiPageUrls([''])
                    setExtraInstructions('')
                    setTestMode('single')
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Starting Test...' : 'Start Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-overlay)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => {
            setShowCreateProjectModal(false)
            setNewProjectName('')
            setNewProjectDescription('')
          }}
        >
          <div
            className="card"
            style={{
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: 'var(--shadow-2xl)',
              animation: 'fadeIn 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700',
                color: 'var(--text-primary)',
              }}>
                Create Project
              </h2>
              <button
                onClick={() => {
                  setShowCreateProjectModal(false)
                  setNewProjectName('')
                  setNewProjectDescription('')
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  padding: '0.25rem',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Project Name <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                  placeholder="My Test Project"
                  className="input"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                }}>
                  Description (Optional)
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                  className="input"
                  style={{
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                justifyContent: 'flex-end', 
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-light)',
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateProjectModal(false)
                    setNewProjectName('')
                    setNewProjectDescription('')
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: 'var(--success)',
                    color: 'white',
                  }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

