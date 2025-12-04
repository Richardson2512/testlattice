'use client'

import { BrowserMatrixResult } from '@/lib/api'
import { getBrowserName, getBrowserIcon, formatDuration } from '@/lib/formatters'

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
  if (!results || results.length === 0) return null
  
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.5rem',
      backgroundColor: '#F7FAFC',
      borderRadius: '0.75rem',
      border: '1px solid #E2E8F0',
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: '1rem',
      }}>
        🌐 Cross-Browser Test Results
      </h3>
      
      {/* Summary Card */}
      {summary && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: summary.failedBrowsers > 0 ? '#FEF2F2' : '#ECFDF5',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          border: `2px solid ${summary.failedBrowsers > 0 ? '#FCA5A5' : '#86EFAC'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
              {summary.passedBrowsers}
            </span>
            <span style={{ fontSize: '1rem', color: '#6B7280' }}>/</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
              {summary.totalBrowsers}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#6B7280', marginLeft: '0.5rem' }}>
              browsers passed
            </span>
          </div>
          {summary.failedBrowsers > 0 && (
            <div style={{
              marginLeft: 'auto',
              padding: '0.5rem 1rem',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}>
              ⚠️ {summary.failedBrowsers} browser{summary.failedBrowsers > 1 ? 's' : ''} failed
            </div>
          )}
        </div>
      )}
      
      {/* Individual Browser Results */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {results.map((result) => (
          <div 
            key={result.browser}
            style={{
              backgroundColor: 'white',
              border: `2px solid ${result.success ? '#10B981' : '#EF4444'}`,
              borderRadius: '0.75rem',
              padding: '1.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Browser Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '2rem' }}>
                {getBrowserIcon(result.browser)}
              </span>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#1A202C',
                margin: 0,
                flex: 1,
              }}>
                {getBrowserName(result.browser)}
              </h4>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                backgroundColor: result.success ? '#DCFCE7' : '#FEE2E2',
                color: result.success ? '#065F46' : '#991B1B',
              }}>
                {result.success ? '✅ Passed' : '❌ Failed'}
              </span>
            </div>
            
            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '1rem',
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Steps
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1A202C' }}>
                  {result.steps.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Time
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1A202C' }}>
                  {formatDuration(result.executionTime)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Artifacts
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1A202C' }}>
                  {result.artifacts.length}
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {result.error && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1rem',
              }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#991B1B', marginBottom: '0.25rem' }}>
                  Error:
                </p>
                <p style={{ fontSize: '0.875rem', color: '#991B1B', margin: 0 }}>
                  {result.error}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Compatibility Issues */}
      {results.some(r => !r.success) && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FCD34D',
          borderRadius: '0.5rem',
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#92400E',
            marginBottom: '0.75rem',
          }}>
            ⚠️ Compatibility Issues Detected
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#92400E',
          }}>
            {results
              .filter(r => !r.success)
              .map(r => (
                <li key={r.browser} style={{ marginBottom: '0.5rem' }}>
                  <strong>{getBrowserName(r.browser)}:</strong> {r.error}
                </li>
              ))}
          </ul>
          <p style={{
            marginTop: '0.75rem',
            fontSize: '0.875rem',
            color: '#92400E',
            fontStyle: 'italic',
          }}>
            Review browser-specific steps to identify CSS or JavaScript compatibility issues
          </p>
        </div>
      )}
    </div>
  )
}

