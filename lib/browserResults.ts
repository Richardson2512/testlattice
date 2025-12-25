/**
 * Browser Results Aggregation Utilities
 * Handles aggregation logic for parallel cross-browser test results
 */

import { TestRun } from './api'

export type BrowserType = 'chromium' | 'firefox' | 'webkit'
export type BrowserRunStatus = 'PASSED' | 'FAILED' | 'BLOCKED' | 'PARTIAL'

export interface BrowserRun {
  browser: BrowserType
  status: BrowserRunStatus
  duration?: number
  criticalErrors: string[]
  visualIssuesCount: number
  accessibilityIssuesCount: number
  stepsCount: number
  failedStepsCount: number
}

export interface AggregatedResults {
  overallStatus: 'PASSED' | 'PARTIAL' | 'FAILED' | 'BLOCKED'
  browserRuns: BrowserRun[]
  selectedBrowsers: BrowserType[]
  hasBrowserSpecificIssues: boolean
  browserSpecificIssues: Array<{
    browser: BrowserType
    issue: string
  }>
}

/**
 * Get browser from step (from browser field or environment.browser)
 */
export function getStepBrowser(step: NonNullable<TestRun['steps']>[0]): BrowserType | null {
  return step.browser || step.environment?.browser || null
}

/**
 * Aggregate browser runs from test run data
 */
export function aggregateBrowserRuns(testRun: TestRun): AggregatedResults {
  const steps = testRun.steps || []
  const selectedBrowsers = testRun.selectedBrowsers ||
    (testRun.options?.browserMatrix as BrowserType[]) ||
    ['chromium'] as BrowserType[]

  // Group steps by browser
  const stepsByBrowser = new Map<BrowserType, TestRun['steps']>()

  steps.forEach(step => {
    const browser = getStepBrowser(step)
    if (browser) {
      if (!stepsByBrowser.has(browser)) {
        stepsByBrowser.set(browser, [])
      }
      stepsByBrowser.get(browser)!.push(step)
    }
  })

  // Create browser runs
  const browserRuns: BrowserRun[] = selectedBrowsers.map(browser => {
    const browserSteps = stepsByBrowser.get(browser) || []
    const failedSteps = browserSteps.filter(s => s.success === false)
    const criticalErrors = failedSteps
      .map(s => s.error)
      .filter((e): e is string => !!e)

    // Count visual and accessibility issues from steps
    const visualIssuesCount = browserSteps.filter(s =>
      s.visualDiff?.hasDifference ||
      s.error?.toLowerCase().includes('visual')
    ).length

    const accessibilityIssuesCount = browserSteps.filter(s =>
      s.error?.toLowerCase().includes('accessibility') ||
      s.error?.toLowerCase().includes('aria') ||
      s.error?.toLowerCase().includes('a11y')
    ).length

    // Determine status
    let status: BrowserRunStatus = 'PASSED'
    if (failedSteps.length > 0) {
      // Check if blocked (cookie consent, popup, etc.)
      const isBlocked = criticalErrors.some(e =>
        e.toLowerCase().includes('blocked') ||
        e.toLowerCase().includes('cookie') ||
        e.toLowerCase().includes('popup') ||
        e.toLowerCase().includes('consent')
      )
      status = isBlocked ? 'BLOCKED' : 'FAILED'
    } else if (browserSteps.length === 0) {
      status = 'BLOCKED' // No steps = likely blocked
    }

    return {
      browser,
      status,
      duration: testRun.duration, // Could be calculated per browser if available
      criticalErrors,
      visualIssuesCount,
      accessibilityIssuesCount,
      stepsCount: browserSteps.length,
      failedStepsCount: failedSteps.length,
    }
  })

  // Determine overall status
  const allPassed = browserRuns.every(r => r.status === 'PASSED')
  const anyFailed = browserRuns.some(r => r.status === 'FAILED')
  const anyBlocked = browserRuns.some(r => r.status === 'BLOCKED')

  let overallStatus: 'PASSED' | 'PARTIAL' | 'FAILED' | 'BLOCKED'
  if (allPassed) {
    overallStatus = 'PASSED'
  } else if (anyBlocked) {
    overallStatus = 'BLOCKED'
  } else if (anyFailed) {
    // Check if failures are browser-specific
    const failedBrowsers = browserRuns.filter(r => r.status === 'FAILED')
    const passedBrowsers = browserRuns.filter(r => r.status === 'PASSED')
    overallStatus = (failedBrowsers.length > 0 && passedBrowsers.length > 0) ? 'PARTIAL' : 'FAILED'
  } else {
    overallStatus = 'PARTIAL'
  }

  // Detect browser-specific issues
  const browserSpecificIssues: Array<{ browser: BrowserType; issue: string }> = []
  browserRuns.forEach(run => {
    if (run.status === 'FAILED' && run.criticalErrors.length > 0) {
      // Check if this error is unique to this browser
      const otherBrowsers = browserRuns.filter(r => r.browser !== run.browser)
      const isUnique = otherBrowsers.every(other =>
        !other.criticalErrors.some(err =>
          run.criticalErrors.some(e => e.toLowerCase().includes(err.toLowerCase().substring(0, 20)))
        )
      )

      if (isUnique) {
        browserSpecificIssues.push({
          browser: run.browser,
          issue: run.criticalErrors[0] || 'Unknown error',
        })
      }
    }
  })

  return {
    overallStatus,
    browserRuns,
    selectedBrowsers,
    hasBrowserSpecificIssues: browserSpecificIssues.length > 0,
    browserSpecificIssues,
  }
}

/**
 * Filter steps by browser
 */
export function filterStepsByBrowser(
  steps: TestRun['steps'],
  browser: BrowserType | 'all'
): NonNullable<TestRun['steps']> {
  if (browser === 'all') return steps || []
  return (steps || []).filter(step => {
    const stepBrowser = getStepBrowser(step)
    return stepBrowser === browser
  })
}

/**
 * Filter artifacts by browser
 */
export function filterArtifactsByBrowser(
  artifacts: Array<{ type: string; url: string;[key: string]: any }>,
  browser: BrowserType | 'all',
  steps: TestRun['steps']
): Array<{ type: string; url: string;[key: string]: any }> {
  if (browser === 'all') return artifacts

  // Get step IDs for this browser
  const browserStepIds = new Set(
    (filterStepsByBrowser(steps || [], browser) || []).map(s => s.id)
  )

  // Filter artifacts that belong to browser steps
  // This is a simplified approach - in production, artifacts should have browser metadata
  return artifacts.filter(artifact => {
    // If artifact has browser metadata, use it
    if ((artifact as any).browser) {
      return (artifact as any).browser === browser
    }
    // Otherwise, try to match by step ID in URL or path
    const artifactUrl = artifact.url || (artifact as any).path || ''
    return browserStepIds.has(artifactUrl.split('/').pop()?.split('-')[0] || '')
  })
}

/**
 * Get browser display name
 */
/**
 * Get browser icon
 */
export function getBrowserIcon(browser: BrowserType): string {
  switch (browser) {
    case 'chromium': return '/browsers/chrome.svg'
    case 'firefox': return '/browsers/firefox.svg'
    case 'webkit': return '/browsers/safari.svg'
    default: return '/browsers/chrome.svg'
  }
}

/**
 * Get browser display name
 */
export function getBrowserDisplayName(browser: BrowserType): string {
  switch (browser) {
    case 'chromium': return 'Chrome'
    case 'firefox': return 'Firefox'
    case 'webkit': return 'Safari (WebKit)'
  }
}

/**
 * Get status color
 */
export function getStatusColor(status: BrowserRunStatus | 'PASSED' | 'PARTIAL' | 'FAILED' | 'BLOCKED'): string {
  switch (status) {
    case 'PASSED': return '#10b981'
    case 'FAILED': return '#ef4444'
    case 'BLOCKED': return '#f59e0b'
    case 'PARTIAL': return '#3b82f6'
    default: return '#64748b'
  }
}

/**
 * Get status background color
 */
export function getStatusBgColor(status: BrowserRunStatus | 'PASSED' | 'PARTIAL' | 'FAILED' | 'BLOCKED'): string {
  switch (status) {
    case 'PASSED': return '#10b98120'
    case 'FAILED': return '#ef444420'
    case 'BLOCKED': return '#f59e0b20'
    case 'PARTIAL': return '#3b82f620'
    default: return '#64748b20'
  }
}

