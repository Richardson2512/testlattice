'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import Link from 'next/link'

export default function TestRunPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [artifacts, setArtifacts] = useState<TestArtifact[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isPausing, setIsPausing] = useState(false)
  const [isResuming, setIsResuming] = useState(false)
  const [isStopping, setIsStopping] = useState(false)
  const [currentScreenshot, setCurrentScreenshot] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    loadData()
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        if (testRun && (testRun.status === 'running' || testRun.status === 'queued')) {
          loadData()
          // Update current screenshot for live view
          if (testRun.steps && testRun.steps.length > 0) {
            const latestStep = testRun.steps[testRun.steps.length - 1]
            if (latestStep.screenshotUrl) {
              setCurrentScreenshot(latestStep.screenshotUrl)
            }
          }
        }
      }, 1000) // Refresh every second for live updates
      
      return () => clearInterval(interval)
    }
  }, [testId, autoRefresh, testRun?.status])

  async function loadData() {
    try {
      const response = await api.getTestRun(testId)
      setTestRun(response.testRun)
      setArtifacts(response.artifacts)
      
      const videoArtifact = response.artifacts.find((artifact) => artifact.type === 'video')
      setVideoUrl(videoArtifact?.url || response.testRun.artifactsUrl || null)
      
      // Stop auto-refresh if completed or failed
      if (response.testRun.status === 'completed' || response.testRun.status === 'failed') {
        setAutoRefresh(false)
      }
    } catch (error) {
      console.error('Failed to load test run:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const completedVideoUrl = videoUrl && (testRun.status === 'completed' || testRun.status === 'failed' || testRun.status === 'cancelled')

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!testRun) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Test run not found</div>
  }

  const steps = testRun.steps || []
  const errors = steps.filter(s => !s.success)
  const latestScreenshot = currentScreenshot || (steps.length > 0 ? steps[steps.length - 1]?.screenshotUrl || null : null)

  return (
    <div style={{ padding: '1rem', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link
            href="/dashboard"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
            Test Run: {testId.substring(0, 8)}...
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {testRun.status === 'running' && (
            <>
              {testRun.paused ? (
                <button
                  onClick={async () => {
                    setIsResuming(true)
                    try {
                      const result = await api.resumeTestRun(testId)
                      if (result.success) {
                        await loadData()
                      } else {
                        alert('Failed to resume test run. Please try again.')
                      }
                    } catch (error: any) {
                      console.error('Resume error:', error)
                      alert(`Failed to resume: ${error.message || 'Unknown error. Check console for details.'}`)
                    } finally {
                      setIsResuming(false)
                    }
                  }}
                  disabled={isResuming}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: isResuming ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                  }}
                >
                  {isResuming ? 'Resuming...' : '▶ Resume'}
                </button>
              ) : (
                <button
                  onClick={async () => {
                    setIsPausing(true)
                    try {
                      const result = await api.pauseTestRun(testId)
                      if (result.success) {
                        await loadData()
                      } else {
                        alert('Failed to pause test run. Please try again.')
                      }
                    } catch (error: any) {
                      console.error('Pause error:', error)
                      alert(`Failed to pause: ${error.message || 'Unknown error. Check console for details.'}`)
                    } finally {
                      setIsPausing(false)
                    }
                  }}
                  disabled={isPausing}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: isPausing ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                  }}
                >
                  {isPausing ? 'Pausing...' : '⏸ Pause'}
                </button>
              )}
              <button
                onClick={async () => {
                  if (!confirm('Stop this test? A partial report will be generated.')) return
                  setIsStopping(true)
                  try {
                    const result = await api.stopTestRun(testId)
                    alert(result.message)
                    await loadData()
                    // Redirect to report after stopping
                    setTimeout(() => {
                      router.push(`/test/report/${testId}`)
                    }, 1000)
                  } catch (error: any) {
                    alert(`Failed to stop: ${error.message}`)
                  } finally {
                    setIsStopping(false)
                  }
                }}
                disabled={isStopping}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: isStopping ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                }}
              >
                {isStopping ? 'Stopping...' : '⏹ Stop Test'}
              </button>
            </>
          )}
          {(testRun.status === 'completed' || testRun.status === 'failed') && (
            <button
              onClick={() => router.push(`/test/report/${testId}`)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              View Report →
            </button>
          )}
        </div>
      </div>

      {/* 3-Column Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr 350px', 
        gap: '1rem', 
        flex: 1,
        overflow: 'hidden',
      }}>
        {/* Left: Live Logs */}
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '0.5rem',
          padding: '1rem',
          overflowY: 'auto',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
            Live Logs
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {steps.length === 0 ? (
              <div style={{ color: '#9ca3af' }}>
                {testRun.status === 'queued' ? 'Waiting to start...' : 'Test is starting...'}
              </div>
            ) : (
              steps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: step.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '0.25rem',
                    borderLeft: `3px solid ${step.success ? '#10b981' : '#ef4444'}`,
                  }}
                >
                  <div style={{ color: step.success ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                    [{new Date(step.timestamp).toLocaleTimeString()}]
                  </div>
                  <div style={{ marginTop: '0.25rem' }}>
                    Step {step.stepNumber}: {step.action}
                    {step.target && ` → ${step.target}`}
                  </div>
                  {step.error && (
                    <div style={{ color: '#ef4444', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                      Error: {step.error}
                    </div>
                  )}
                </div>
              ))
            )}
            {testRun.status === 'running' && !testRun.paused && (
              <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                Running...
              </div>
            )}
            {testRun.paused && (
              <div style={{ color: '#f59e0b', fontWeight: '600' }}>
                ⏸ PAUSED
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Video Stream */}
        <div style={{
          backgroundColor: '#000',
          borderRadius: '0.5rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: '1rem', 
            fontSize: '1rem', 
            fontWeight: '600',
            color: '#fff',
          }}>
            Live Browser View
            {testRun.status === 'running' && (
              <span style={{ fontSize: '0.875rem', color: '#9ca3af', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                {testRun.paused ? '⏸ Paused' : '▶ Live'}
              </span>
            )}
          </h3>
          <div style={{
            flex: 1,
            backgroundColor: '#1a1a1a',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {completedVideoUrl ? (
              <video
                src={videoUrl || undefined}
                controls
                poster={latestScreenshot || undefined}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#000',
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : latestScreenshot ? (
              <img
                src={latestScreenshot}
                alt="Live browser view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div style={{ color: '#666', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                <div>Waiting for browser view...</div>
              </div>
            )}
            {testRun.paused && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(245, 158, 11, 0.9)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}>
                ⏸ PAUSED
              </div>
            )}
            {completedVideoUrl && (
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
              }}>
                ▶ Playback (recorded)
              </div>
            )}
          </div>
        </div>

        {/* Right: Steps + Errors Panel */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          padding: '1rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
            Steps & Errors
          </h3>
          
          {/* Progress */}
          <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
              Progress: {testRun.currentStep || steps.length} / {testRun.options?.maxSteps || 10}
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${((testRun.currentStep || steps.length) / (testRun.options?.maxSteps || 10)) * 100}%`,
                height: '100%',
                backgroundColor: testRun.status === 'completed' ? '#10b981' : '#3b82f6',
                transition: 'width 0.3s',
              }} />
            </div>
          </div>

          {/* Steps List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {steps.map((step) => (
              <div
                key={step.id}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  border: `1px solid ${step.success ? '#d1fae5' : '#fee2e2'}`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (step.screenshotUrl) {
                    setCurrentScreenshot(step.screenshotUrl)
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                    Step {step.stepNumber}: {step.action}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: step.success ? '#10b981' : '#ef4444',
                    fontWeight: '600',
                  }}>
                    {step.success ? '✓' : '✗'}
                  </span>
                </div>
                {step.target && (
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    → {step.target}
                  </div>
                )}
                {step.error && (
                  <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                    Error: {step.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Errors Summary */}
          {errors.length > 0 && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
              <div style={{ fontWeight: '600', color: '#991b1b', marginBottom: '0.5rem' }}>
                Errors ({errors.length})
              </div>
              {errors.map((error) => (
                <div key={error.id} style={{ fontSize: '0.75rem', color: '#991b1b', marginBottom: '0.25rem' }}>
                  Step {error.stepNumber}: {error.error}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

