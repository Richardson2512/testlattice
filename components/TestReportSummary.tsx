'use client'

interface TestReportSummaryProps {
  testRun: {
    id: string
    status: string
    startedAt?: string
    completedAt?: string
    duration?: number
    build: { url?: string }
    profile: { device: string }
  }
  steps: Array<{ success?: boolean; severity?: string; execution_status?: string }>
  diagnosis?: {
    comprehensiveTests?: {
      consoleErrors: any[]
      networkErrors: any[]
      accessibility: any[]
      visualIssues: any[]
      security?: any[]
    }
  }
}

export function TestReportSummary({ testRun, steps, diagnosis }: TestReportSummaryProps) {
  // Calculate summary statistics with new severity classification
  const totalTests = steps.length

  // Count by severity (new format) with fallback to success field (legacy)
  const passed = steps.filter(s => s.severity === 'GREEN' || (s.severity === undefined && s.success === true)).length
  const warnings = steps.filter(s => s.severity === 'YELLOW').length
  const failed = steps.filter(s => s.severity === 'RED' || (s.severity === undefined && s.success === false)).length
  const skipped = steps.filter(s => s.execution_status === 'SKIPPED').length

  // Success rate excludes skipped and treats warnings as partial success
  const effectiveTotal = totalTests - skipped
  const successRate = effectiveTotal > 0 ? (((passed + (warnings * 0.5)) / effectiveTotal) * 100).toFixed(1) : '0.0'

  // Count bugs found (high severity issues) - only RED severity now counts as bugs
  const bugsFound = failed + (
    (diagnosis?.comprehensiveTests?.consoleErrors?.filter((e: any) => e.type === 'error').length || 0) +
    (diagnosis?.comprehensiveTests?.networkErrors?.filter((e: any) => e.status >= 400).length || 0) +
    (diagnosis?.comprehensiveTests?.accessibility?.filter((i: any) => i.impact === 'high').length || 0) +
    (diagnosis?.comprehensiveTests?.visualIssues?.filter((i: any) => i.severity === 'high').length || 0) +
    (diagnosis?.comprehensiveTests?.security?.filter((s: any) => s.severity === 'high').length || 0)
  )

  const durationSeconds = testRun.duration ? (testRun.duration / 1000).toFixed(1) : '0.0'

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
      borderRadius: 'var(--radius-xl)',
      border: '2px solid var(--border-medium)',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>📊</span> Executive Summary
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Total Tests */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Total Tests Run
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)'
          }}>
            {totalTests}
          </div>
        </div>

        {/* Passed / Warnings / Failed */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Test Results
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <div>
              <span style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'var(--success)'
              }}>{passed}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}> passed</span>
            </div>
            {warnings > 0 && (
              <div>
                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#f59e0b'
                }}>{warnings}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}> warnings</span>
              </div>
            )}
            <div>
              <span style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'var(--error)'
              }}>{failed}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}> failed</span>
            </div>
            {skipped > 0 && (
              <div>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-muted)'
                }}>{skipped}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}> skipped</span>
              </div>
            )}
          </div>
        </div>

        {/* Success Rate */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Success Rate
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: parseFloat(successRate) >= 80 ? 'var(--success)' :
              parseFloat(successRate) >= 60 ? 'var(--warning)' :
                'var(--error)'
          }}>
            {successRate}%
          </div>
          <div style={{
            marginTop: '0.5rem',
            height: '6px',
            background: 'var(--bg-tertiary)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${successRate}%`,
              height: '100%',
              background: parseFloat(successRate) >= 80 ? 'var(--success)' :
                parseFloat(successRate) >= 60 ? 'var(--warning)' :
                  'var(--error)',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Total Duration */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Total Duration
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)'
          }}>
            {durationSeconds}s
          </div>
        </div>

        {/* Bugs Found */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Bugs Found
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: bugsFound > 0 ? 'var(--error)' : 'var(--success)'
          }}>
            {bugsFound}
          </div>
          {bugsFound > 0 && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginTop: '0.5rem'
            }}>
              High severity issues
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

