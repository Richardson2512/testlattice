'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api, TestRun, TestArtifact } from '../../../../lib/api'
import Link from 'next/link'

export default function TestReportPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [artifacts, setArtifacts] = useState<TestArtifact[]>([])
  const [loading, setLoading] = useState(true)
  const [aiInsights, setAiInsights] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [testId])

  async function loadData() {
    try {
      const response = await api.getTestRun(testId)
      setTestRun(response.testRun)
      setArtifacts(response.artifacts)
      
      // Generate AI insights from steps
      if (response.testRun.steps) {
        generateAIInsights(response.testRun.steps)
      }
    } catch (error) {
      console.error('Failed to load test run:', error)
    } finally {
      setLoading(false)
    }
  }

  function generateAIInsights(steps: any[]) {
    // Analyze steps to generate insights
    const errors = steps.filter(s => !s.success)
    const issues: string[] = []
    const warnings: string[] = []

    // Check for errors
    if (errors.length > 0) {
      issues.push(`${errors.length} step(s) failed during execution`)
      errors.forEach(error => {
        if (error.error) {
          issues.push(`Step ${error.stepNumber}: ${error.error}`)
        }
      })
    }

    // Check for navigation issues
    const navigationSteps = steps.filter(s => s.action === 'navigate')
    if (navigationSteps.length === 0 && steps.length > 0) {
      warnings.push('No navigation steps detected - test may not have started properly')
    }

    // Check for interaction issues
    const interactionSteps = steps.filter(s => ['click', 'type'].includes(s.action))
    if (interactionSteps.length === 0 && steps.length > 3) {
      warnings.push('Limited user interactions detected - test may be incomplete')
    }

    // Check for visual issues (placeholder - would use AI in production)
    if (steps.length < (testRun?.options?.maxSteps || 10)) {
      warnings.push('Test completed with fewer steps than expected - may indicate early termination')
    }

    setAiInsights({
      issues,
      warnings,
      recommendations: [
        ...(errors.length > 0 ? ['Review failed steps and fix underlying issues'] : []),
        ...(steps.length < 5 ? ['Consider adding more test steps for better coverage'] : []),
        'Review screenshots to verify visual correctness',
        'Check console logs for JavaScript errors',
      ],
    })
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!testRun) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Test run not found</div>
  }

  const steps = testRun.steps || []
  const videoArtifact = artifacts.find(a => a.type === 'video')
  const videoUrl = videoArtifact?.url || testRun.artifactsUrl || ''
  const screenshots = steps.filter(s => s.screenshotUrl).map(s => s.screenshotUrl!)

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/dashboard"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            marginBottom: '1rem',
            display: 'inline-block',
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Test Report: {testId.substring(0, 8)}...
      </h1>

      {/* Test Summary */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Test Summary</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Status</div>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: testRun.status === 'completed' ? '#dcfce7' : testRun.status === 'failed' ? '#fee2e2' : '#dbeafe',
              color: testRun.status === 'completed' ? '#166534' : testRun.status === 'failed' ? '#991b1b' : '#1e40af',
            }}>
              {testRun.status.toUpperCase()}
              {testRun.paused && ' (PARTIAL)'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Steps</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{steps.length}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Successful Steps</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10b981' }}>
              {steps.filter(s => s.success).length}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Failed Steps</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ef4444' }}>
              {steps.filter(s => !s.success).length}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Pages Tested</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
              {new Set(steps.filter(s => s.action === 'navigate').map(s => s.value)).size || 1}
            </div>
          </div>
          {testRun.duration && (
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Duration</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {(testRun.duration / 1000).toFixed(1)}s
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      {aiInsights && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>AI Insights</h2>
          
          {aiInsights.issues.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#ef4444', marginBottom: '0.5rem' }}>
                Issues Detected
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {aiInsights.issues.map((issue: string, idx: number) => (
                  <li key={idx} style={{
                    padding: '0.5rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '0.25rem',
                    marginBottom: '0.25rem',
                    color: '#991b1b',
                  }}>
                    ⚠️ {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.warnings.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#f59e0b', marginBottom: '0.5rem' }}>
                Warnings
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {aiInsights.warnings.map((warning: string, idx: number) => (
                  <li key={idx} style={{
                    padding: '0.5rem',
                    backgroundColor: '#fef3c7',
                    borderRadius: '0.25rem',
                    marginBottom: '0.25rem',
                    color: '#92400e',
                  }}>
                    ⚠️ {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.recommendations.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#3b82f6', marginBottom: '0.5rem' }}>
                Recommendations
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {aiInsights.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} style={{
                    padding: '0.5rem',
                    backgroundColor: '#dbeafe',
                    borderRadius: '0.25rem',
                    marginBottom: '0.25rem',
                    color: '#1e40af',
                  }}>
                    💡 {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Full Video Recording */}
      {videoUrl && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Full Video Recording</h2>
          <div style={{
            backgroundColor: '#000',
            borderRadius: '0.375rem',
            overflow: 'hidden',
          }}>
            <video
              controls
              src={videoUrl}
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              Your browser does not support the video tag.
            </video>
            {!videoArtifact && testRun.artifactsUrl && (
              <div style={{ padding: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Video is coming directly from the latest artifacts URL.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Screenshots */}
      {screenshots.length > 0 && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Screenshots ({screenshots.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {screenshots.map((url, idx) => (
              <div key={idx} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                overflow: 'hidden',
              }}>
                <img
                  src={url}
                  alt={`Screenshot ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <div style={{
                  padding: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  textAlign: 'center',
                }}>
                  Step {steps.find(s => s.screenshotUrl === url)?.stepNumber || idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid #e5e7eb',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Test Logs</h2>
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '0.375rem',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: '#fff',
          maxHeight: '400px',
          overflowY: 'auto',
        }}>
          {steps.length === 0 ? (
            <div style={{ color: '#9ca3af' }}>No logs available</div>
          ) : (
            steps.map((step) => (
              <div
                key={step.id}
                style={{
                  marginBottom: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: step.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '0.25rem',
                  borderLeft: `3px solid ${step.success ? '#10b981' : '#ef4444'}`,
                }}
              >
                <div style={{ color: step.success ? '#10b981' : '#ef4444' }}>
                  [{new Date(step.timestamp).toLocaleString()}]
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  Step {step.stepNumber}: {step.action}
                  {step.target && ` → ${step.target}`}
                  {step.value && ` (${step.value})`}
                </div>
                {step.error && (
                  <div style={{ color: '#ef4444', marginTop: '0.25rem' }}>
                    ERROR: {step.error}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Developer Actions */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
      }}>
        <button
          onClick={() => router.push(`/test/run/${testId}`)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Re-run Test
        </button>
        <button
          onClick={async (event) => {
            const button = event.currentTarget as HTMLButtonElement
            const originalText = button.textContent
            button.disabled = true
            if (button.textContent) button.textContent = 'Downloading...'
            button.style.opacity = '0.6'
            button.style.cursor = 'not-allowed'
            
            try {
              await api.downloadReport(testId)
              // Success - button will be re-enabled
            } catch (error: any) {
              alert(`Failed to download report: ${error.message}\n\nPlease check:\n1. API server is running on port 3001\n2. You have an active internet connection\n3. The test run has completed`)
            } finally {
              button.disabled = false
              if (button.textContent) button.textContent = originalText || 'Download Report (ZIP)'
              button.style.opacity = '1'
              button.style.cursor = 'pointer'
            }
          }}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'opacity 0.2s',
          }}
        >
          Download Report (ZIP)
        </button>
      </div>
    </div>
  )
}

