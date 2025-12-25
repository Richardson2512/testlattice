'use client'

import { BrowserMatrixResult } from '@/lib/api'
import { useState } from 'react'

import { getBrowserIcon, getBrowserDisplayName } from '@/lib/browserResults'

interface BrowserMatrixResultsProps {
  results: BrowserMatrixResult[]
  summary?: {
    totalBrowsers: number
    passedBrowsers: number
    failedBrowsers: number
    browsers: Array<{ browser: string; success: boolean; steps: number }>
  }
}

export function BrowserMatrixResults({ results, summary }: BrowserMatrixResultsProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null)

  if (!results || results.length === 0) {
    return null
  }

  return (
    <div className="browser-matrix-results">
      <h3 className="section-title">Cross-Browser Test Results</h3>

      {/* Summary Card */}
      {summary && (
        <div className={`summary-card ${summary.failedBrowsers > 0 ? 'has-failures' : 'all-passed'}`}>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-value">{summary.passedBrowsers}</span>
              <span className="stat-label">Passed</span>
            </div>
            <div className="summary-divider">/</div>
            <div className="summary-stat">
              <span className="stat-value">{summary.totalBrowsers}</span>
              <span className="stat-label">Total</span>
            </div>
            {summary.failedBrowsers > 0 && (
              <>
                <div className="summary-divider">•</div>
                <div className="summary-stat failed">
                  <span className="stat-value">{summary.failedBrowsers}</span>
                  <span className="stat-label">Failed</span>
                </div>
              </>
            )}
          </div>
          {summary.failedBrowsers > 0 && (
            <p className="summary-warning">
              ⚠️ Some browsers failed - review compatibility issues below
            </p>
          )}
        </div>
      )}

      {/* Individual Browser Results */}
      <div className="browser-results-grid">
        {results.map((result) => (
          <div
            key={result.browser}
            className={`browser-result-card ${result.success ? 'success' : 'failed'}`}
          >
            <div className="browser-header">
              <span className="browser-icon-large">
                <img
                  src={getBrowserIcon(result.browser as any)}
                  alt={result.browser}
                  style={{ width: '2rem', height: '2rem' }}
                />
              </span>
              <div className="browser-title">
                <h4>{getBrowserDisplayName(result.browser as any)}</h4>
                <span className={`status-badge ${result.success ? 'success' : 'failed'}`}>
                  {result.success ? '✅ Passed' : '❌ Failed'}
                </span>
              </div>
            </div>

            <div className="browser-stats">
              <div className="stat">
                <span className="stat-label">Steps</span>
                <span className="stat-value">{result.steps?.length || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time</span>
                <span className="stat-value">
                  {(result.executionTime / 1000).toFixed(1)}s
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Artifacts</span>
                <span className="stat-value">{result.artifacts.length}</span>
              </div>
            </div>

            {result.error && (
              <div className="browser-error">
                <p className="error-label">❌ Error:</p>
                <p className="error-message">{result.error}</p>
              </div>
            )}

            <div className="browser-actions">
              <button
                className="btn-secondary btn-sm"
                onClick={() => setSelectedBrowser(
                  selectedBrowser === result.browser ? null : result.browser
                )}
              >
                {selectedBrowser === result.browser ? 'Hide' : 'View'} Details
              </button>
            </div>

            {/* Expanded Details */}
            {selectedBrowser === result.browser && result.steps && (
              <div className="browser-steps-preview">
                <h5>Steps ({result.steps.length})</h5>
                <div className="steps-list">
                  {result.steps.slice(0, 5).map((step: any) => (
                    <div key={step.id} className="step-preview">
                      <span className="step-number">#{step.stepNumber}</span>
                      <span className="step-action">{step.action}</span>
                      <span className={`step-status ${step.success ? 'success' : 'failed'}`}>
                        {step.success ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                  {result.steps.length > 5 && (
                    <p className="more-steps">
                      +{result.steps.length - 5} more steps...
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compatibility Issues Summary */}
      {results.some(r => !r.success) && (
        <div className="compatibility-issues">
          <h4 className="issues-title">⚠️ Compatibility Issues Detected</h4>
          <ul className="issues-list">
            {results
              .filter(r => !r.success)
              .map(r => (
                <li key={r.browser} className="issue-item">
                  <strong>
                    <img
                      src={getBrowserIcon(r.browser as any)}
                      alt={r.browser}
                      style={{ width: '1rem', height: '1rem', verticalAlign: 'middle', marginRight: '0.5rem' }}
                    />
                    {getBrowserDisplayName(r.browser as any)}:
                  </strong>{' '}
                  {r.error || 'Test failed'}
                </li>
              ))}
          </ul>
          <p className="recommendation">
            💡 Review browser-specific steps to identify CSS or JavaScript compatibility issues.
            Compare screenshots across browsers to spot visual differences.
          </p>
        </div>
      )}

      {/* Success Message */}
      {results.every(r => r.success) && results.length > 1 && (
        <div className="compatibility-success">
          <p className="success-message">
            ✅ All {results.length} browsers passed! Your application is cross-browser compatible.
          </p>
        </div>
      )}
    </div>
  )
}

