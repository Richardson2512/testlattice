// API client for frontend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Device profiles for browser/device selection
export enum DeviceProfile {
  CHROME_LATEST = 'chrome-latest',
  FIREFOX_LATEST = 'firefox-latest',
  SAFARI_LATEST = 'safari-latest',
  MOBILE_CHROME = 'mobile-chrome',
  MOBILE_SAFARI = 'mobile-safari',
  MOBILE_CHROME_ANDROID = 'mobile-chrome-android',
  ANDROID_EMULATOR = 'android-emulator',
  IOS_SIMULATOR = 'ios-simulator',
}

// Action types for test steps
export type ActionType =
  | 'click'
  | 'type'
  | 'scroll'
  | 'navigate'
  | 'wait'
  | 'assert'
  | 'complete'
  | 'check'      // Check checkbox/radio
  | 'uncheck'    // Uncheck checkbox
  | 'select'     // Select dropdown option
  | 'submit'     // Submit form
  | 'goBack'     // Browser back
  | 'goForward'  // Browser forward

export interface DiagnosisComponentInsight {
  name: string
  selector: string
  description: string
  testability: 'high' | 'medium' | 'low'
}

export interface DiagnosisIssueInsight {
  name: string
  reason: string
}

export interface DiagnosisPageSummary {
  id: string
  label?: string
  url?: string
  action?: string
  title?: string
  screenshotUrl?: string
  screenshotUrls?: string[] // All screenshots captured during scrolling
  summary: string
  testableComponents: DiagnosisComponentInsight[]
  nonTestableComponents: DiagnosisIssueInsight[]
  recommendedTests: string[]
  errors?: string[]
  blockedSelectors?: string[]
}

// Comprehensive test results interfaces (matching worker types)
export interface ConsoleError {
  type: 'error' | 'warning' | 'info'
  message: string
  source?: string
  line?: number
  column?: number
  timestamp: string
}

export interface NetworkError {
  url: string
  method: string
  status: number
  statusText: string
  failed: boolean
  errorText?: string
  timestamp: string
  resourceType?: string
}

export interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint?: number
  domContentLoaded?: number
  totalPageSize?: number
  jsBundleSize?: number
  cssSize?: number
  imageSize?: number
  lighthouseScore?: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  // Core Web Vitals
  largestContentfulPaint?: number
  firstInputDelay?: number
  cumulativeLayoutShift?: number
  timeToInteractive?: number
  totalBlockingTime?: number
  // Resource analysis
  slowResources?: Array<{
    url: string
    loadTime: number
    size: number
    type: string
  }>
  duplicateScripts?: string[]
}

export interface AccessibilityIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  selector?: string
  impact: 'high' | 'medium' | 'low'
  fix?: string
}

export interface VisualIssue {
  type: string
  description: string
  severity: 'high' | 'medium' | 'low'
  screenshot?: string
}

export interface DOMHealth {
  missingAltText: Array<{ selector: string; element: string }>
  missingLabels: Array<{ selector: string; element: string }>
  orphanedElements: Array<{ selector: string; element: string }>
  hiddenElements: Array<{ selector: string; element: string; reason: string }>
  jsErrors: ConsoleError[]
}

export interface SecurityIssue {
  type: 'xss' | 'csp' | 'insecure-resource' | 'missing-https' | 'mixed-content' | 'csrf' | 'cookies'
  severity: 'high' | 'medium' | 'low'
  message: string
  element?: string
  selector?: string
  url?: string
  fix?: string
}

export interface SEOIssue {
  type: 'missing-meta' | 'invalid-meta' | 'missing-structured-data' | 'duplicate-title' | 'missing-canonical'
  severity: 'high' | 'medium' | 'low'
  message: string
  element?: string
  fix?: string
}

export interface ThirdPartyDependency {
  domain: string
  type: 'analytics' | 'advertising' | 'cdn' | 'widget' | 'social' | 'payment' | 'unknown'
  scripts: string[]
  cookies?: string[]
  privacyRisk: 'high' | 'medium' | 'low'
  description: string
}

export interface ComprehensiveTestResults {
  consoleErrors: ConsoleError[]
  networkErrors: NetworkError[]
  performance: PerformanceMetrics
  accessibility: AccessibilityIssue[]
  visualIssues: VisualIssue[]
  domHealth: DOMHealth
  security?: SecurityIssue[]
  seo?: SEOIssue[]
  thirdPartyDependencies?: ThirdPartyDependency[]
  wcagScore?: {
    level: 'A' | 'AA' | 'AAA' | 'none'
    score: number // 0-100
    passed: number
    failed: number
    warnings: number
  }
}

export interface HighRiskArea {
  name: string
  type: 'third_party_integration' | 'complex_state' | 'flaky_component' | 'security_sensitive' | 'manual_judgment'
  selector?: string
  description: string
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  requiresManualIntervention: boolean
  reason: string
}

export interface DiagnosisResult {
  screenshotUrl?: string
  summary: string
  testableComponents: DiagnosisComponentInsight[]
  nonTestableComponents: DiagnosisIssueInsight[]
  recommendedTests: string[]
  pages?: DiagnosisPageSummary[]
  blockedSelectors?: string[]
  comprehensiveTests?: ComprehensiveTestResults
  highRiskAreas?: HighRiskArea[]
}

// Real-time diagnosis progress tracking
export interface DiagnosisProgress {
  step: number              // Current main step (1-5 for single, 1-6 for multi)
  totalSteps: number        // Total main steps
  stepLabel: string         // Human-readable step description
  subStep: number           // Current sub-step within main step
  totalSubSteps: number     // Total sub-steps in current main step
  subStepLabel?: string     // Human-readable sub-step description
  percent: number           // Overall progress 0-100
}

// ScoutQA-style report summary types
export type IssueSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
export type IssueCategory = 'Security' | 'Usability' | 'Performance' | 'Accessibility' | 'Functionality'

export interface TestIssue {
  id: number
  category: IssueCategory
  title: string
  severity: IssueSeverity
  evidence: string[]
  affects: string
  impact: string
  screenshotUrl?: string
  timestamp: string
}

export interface TestReportSummary {
  target: string
  issuesFound: number
  started: string
  duration: string
  narrative: string
  criticalIssues: TestIssue[]
  highIssues: TestIssue[]
  mediumIssues: TestIssue[]
  lowIssues: TestIssue[]
  infoIssues: TestIssue[]
  methodology: string[]
  stepsCompleted: number
  errorsFound: number
  warningsFound: number
}

export type TestEnvironment = 'development' | 'staging' | 'production'

export interface ApprovalPolicy {
  mode?: 'manual' | 'auto' | 'auto_on_clean'
  maxBlockers?: number
  channels?: Array<'dashboard' | 'slack'>
}

export interface TestOptions {
  visualDiff?: boolean
  visualDiffThreshold?: number  // Acceptable difference percentage (default 1.0%)
  baselineRunId?: string  // Run ID to use as baseline for visual regression
  stressTest?: boolean
  coverage?: string[]
  maxSteps?: number
  testMode?: 'single' | 'multi' | 'all' | 'monkey' | 'guest'
  browserMatrix?: Array<'chromium' | 'firefox' | 'webkit'>  // Cross-browser testing
  allPages?: boolean
  monkeyMode?: boolean
  monkeyConfig?: {
    randomness?: number
    maxExplorations?: number
    allowNavigation?: boolean
  }
  environment?: TestEnvironment
  approvalPolicy?: ApprovalPolicy
  // Registered user test options (multi-select test types)
  selectedTestTypes?: string[]  // Array of selected test types: visual, login, signup, navigation, form, accessibility, rage_bait
  // Guest test options (single test type - SEPARATE FLOW)
  isGuestRun?: boolean
  guestSessionId?: string
  guestTestType?: string
  guestCredentials?: { email?: string; username?: string; password?: string }
  userTier?: string
}

// Browser matrix result for cross-browser testing
export interface BrowserMatrixResult {
  browser: 'chromium' | 'firefox' | 'webkit'
  success: boolean
  steps: TestRun['steps']
  artifacts: string[]
  error?: string
  executionTime: number
}

export interface TestRun {
  id: string
  projectId: string
  name?: string // Custom name
  status: 'pending' | 'queued' | 'diagnosing' | 'waiting_approval' | 'running' | 'completed' | 'failed' | 'cancelled'
  build: {
    type: 'web'
    url?: string
    artifactId?: string
    version?: string
  }
  profile: {
    device: string
    region?: string
    maxMinutes?: number
  }
  options?: TestOptions
  createdAt: string
  updatedAt: string
  startedAt?: string
  completedAt?: string
  duration?: number
  error?: string
  reportUrl?: string
  artifactsUrl?: string
  traceUrl?: string
  paused?: boolean
  currentStep?: number
  diagnosis?: DiagnosisResult
  diagnosisProgress?: DiagnosisProgress
  browserResults?: BrowserMatrixResult[]  // Cross-browser test results
  summary?: {  // Browser matrix summary
    totalBrowsers: number
    passedBrowsers: number
    failedBrowsers: number
    browsers: Array<{ browser: string; success: boolean; steps: number }>
  }
  // Parallel browser testing support
  selectedBrowsers?: Array<'chromium' | 'firefox' | 'webkit'>  // Browsers selected for this test run
  browserRuns?: Array<{  // Per-browser run data
    browser: 'chromium' | 'firefox' | 'webkit'
    status: 'PASSED' | 'FAILED' | 'BLOCKED' | 'PARTIAL'
    duration?: number
    criticalErrors?: string[]
    visualIssuesCount?: number
    accessibilityIssuesCount?: number
    stepsCount?: number
  }>
  // Guest test properties
  guestSessionId?: string
  expiresAt?: string
  // Report sharing settings
  visibility?: 'private' | 'public'
  // ScoutQA-style comprehensive report summary
  reportSummary?: TestReportSummary
  steps?: Array<{
    id: string
    stepNumber: number
    action: string
    target?: string
    selector?: string  // CSS selector for the element
    value?: string
    timestamp: string
    screenshotUrl?: string
    domSnapshot?: string
    success: boolean
    error?: string
    mode?: 'llm' | 'speculative' | 'monkey'
    browser?: 'chromium' | 'firefox' | 'webkit'  // Browser for this step (mandatory for parallel browser tests)
    environment?: {
      browser?: 'chromium' | 'firefox' | 'webkit'
      viewport?: string
      orientation?: 'portrait' | 'landscape'
    }
    selfHealing?: {
      strategy: 'text' | 'attribute' | 'position' | 'fallback'
      originalSelector?: string
      healedSelector: string
      note: string
    }
    // Iron Man HUD visual annotations
    elementBounds?: Array<{
      selector: string
      bounds: { x: number; y: number; width: number; height: number }
      type: string
      text?: string
      interactionType?: 'clicked' | 'typed' | 'analyzed' | 'failed' | 'healed'
    }>
    targetElementBounds?: {
      selector: string
      bounds: { x: number; y: number; width: number; height: number }
      interactionType: 'clicked' | 'typed' | 'analyzed' | 'failed' | 'healed'
    }
    // Visual regression testing results
    visualDiff?: {
      hasDifference: boolean
      diffPercentage: number
      diffImageUrl?: string
      baselineRunId?: string
      threshold?: number
    }
  }>
}

export interface Project {
  id: string
  name: string
  description?: string
  teamId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTestRunRequest {
  projectId: string
  build: {
    type: 'web'
    url?: string
    artifactId?: string
    version?: string
  }
  profile: {
    device: string
    region?: string
    maxMinutes?: number
  }
  options?: TestOptions
}

export interface TestArtifact {
  id: string
  runId: string
  type: 'screenshot' | 'video' | 'log' | 'dom' | 'trace'
  url: string
  path: string
  size: number
  createdAt: string
}

async function getAuthToken(): Promise<string | null> {
  // Get token from Supabase client
  if (typeof window !== 'undefined') {
    const { createClient } = await import('./supabase/client')
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || null
  }
  return null
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = await getAuthToken()

  // Use the Headers API so we can add/remove headers safely
  const headers = new Headers(options?.headers)

  const hasJsonBody = options?.body !== undefined && !(options.body instanceof FormData)
  if (hasJsonBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Add timeout to prevent hanging requests
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  } catch (error: any) {
    clearTimeout(timeoutId)

    // Handle timeout errors
    if (error.name === 'AbortError' || error.message?.includes('aborted')) {
      throw new Error(`Request timeout: API server at ${API_URL} did not respond within 30 seconds. The server may be overloaded or unresponsive.`)
    }

    // Handle network errors (API server not running, CORS, etc.)
    if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
      throw new Error(`Cannot connect to API server at ${API_URL}. Make sure the API server is running on port 3001.`)
    }
    throw error
  }
}

export const api = {
  // Test Runs
  async createTestRun(data: CreateTestRunRequest): Promise<{ runId: string; testRun: TestRun }> {
    return request('/api/tests/run', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async createGuestTestRun(data: { url: string; email?: string; profile?: any; options?: any }): Promise<{
    runId: string;
    testRun: TestRun;
    isGuest: boolean;
    expiresAt?: string;
    message?: string;
    tier?: 'tier1' | 'tier2';
    testsRemaining?: number;
  }> {
    return request('/api/tests/run/guest', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Associate guest test with user after signup
  async associateGuestTest(testId: string, userId: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${testId}/associate`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    })
  },

  async updateTestRun(runId: string, updates: Partial<TestRun>): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },

  // Credentials
  async getCredentials(): Promise<{ credentials: any[] }> {
    return request('/api/credentials')
  },

  async createCredential(data: any): Promise<{ credential: any }> {
    return request('/api/credentials', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async deleteCredential(id: string): Promise<{ success: boolean }> {
    return request(`/api/credentials/${id}`, {
      method: 'DELETE',
    })
  },

  async getTestRun(runId: string): Promise<{ testRun: TestRun; artifacts: TestArtifact[] }> {
    return request(`/api/tests/${runId}`)
  },

  async getTestRunStatus(runId: string): Promise<{ testRun: TestRun }> {
    return request(`/api/tests/${runId}/status`)
  },

  async listTestRuns(projectId?: string, limit = 50): Promise<{ testRuns: TestRun[] }> {
    const params = new URLSearchParams()
    if (projectId) params.set('projectId', projectId)
    params.set('limit', limit.toString())
    return request(`/api/tests?${params.toString()}`)
  },

  async cancelTestRun(runId: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}/cancel`, {
      method: 'POST',
    })
  },

  async deleteTestRun(runId: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/tests/${runId}`, {
      method: 'DELETE',
    })
  },

  // Tier Information
  async getTierInfo(): Promise<{
    tier: 'guest' | 'starter' | 'indie' | 'pro' | 'agency'
    limits: {
      maxSteps: number
      maxPages: number
      maxScreenshots: number
      maxDuration: number
      browsers: Array<'chromium' | 'firefox' | 'webkit'>
      mobileBrowsers: boolean
      diagnosis: { enabled: boolean; maxSteps?: number }
      godMode: boolean
      videoRecording: boolean
      traceRecording: boolean
      selfHealingRetries: number
      testSuggestions: number
      comprehensiveTesting: {
        performance: boolean
        accessibility: boolean
        security: boolean
        seo: boolean
        visualRegression: boolean
      }
      retentionDays: number
    }
    features: {
      diagnosis: boolean
      godMode: boolean
      videoRecording: boolean
      traceRecording: boolean
      selfHealing: boolean
      testSuggestions: number
      comprehensiveTesting: any
    }
  }> {
    return request('/api/tier/info')
  },

  // Projects
  async listProjects(teamId?: string): Promise<{ projects: Project[] }> {
    const params = teamId ? `?teamId=${teamId}` : ''
    return request(`/api/projects${params}`)
  },

  async getProject(projectId: string): Promise<{ project: Project }> {
    return request(`/api/projects/${projectId}`)
  },

  async createProject(data: { name: string; description?: string; teamId: string }): Promise<{ project: Project }> {
    return request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateProject(id: string, data: { name?: string; description?: string }): Promise<{ project: Project }> {
    return request(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/projects/${id}`, {
      method: 'DELETE',
    })
  },

  // Pause/Resume
  async pauseTestRun(runId: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}/pause`, {
      method: 'POST',
    })
  },

  async resumeTestRun(runId: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}/resume`, {
      method: 'POST',
    })
  },

  async approveTestRun(runId: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}/approve`, {
      method: 'POST',
    })
  },

  // Report generation
  async generateReport(runId: string): Promise<{ success: boolean; testRun: TestRun; reportUrl: string; message: string }> {
    return request(`/api/tests/${runId}/report`, {
      method: 'POST',
    })
  },

  // Stop test
  async stopTestRun(runId: string): Promise<{ success: boolean; testRun: TestRun; message: string }> {
    return request(`/api/tests/${runId}/stop`, {
      method: 'POST',
    })
  },

  async updateTestRunName(runId: string, name: string): Promise<{ success: boolean; testRun: TestRun }> {
    return request(`/api/tests/${runId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    })
  },

  // Download report as ZIP
  async downloadReport(runId: string): Promise<void> {
    try {
      const token = await getAuthToken()
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

      // Quick health check before attempting download
      try {
        const healthController = new AbortController()
        const healthTimeout = setTimeout(() => healthController.abort(), 3000) // 3 second timeout

        const healthResponse = await fetch(`${API_URL}/health`, {
          method: 'GET',
          signal: healthController.signal,
        })
        clearTimeout(healthTimeout)

        if (!healthResponse.ok) {
          throw new Error(`API server health check failed (${healthResponse.status})`)
        }
      } catch (healthError: any) {
        // If health check fails, provide helpful error message
        if (healthError.name === 'AbortError' || healthError.message.includes('timeout')) {
          throw new Error(`API server at ${API_URL} is not responding. Please make sure the API server is running:\n\n→ Run: cd api && npm run dev`)
        }
        if (healthError.message === 'Failed to fetch' || healthError.name === 'TypeError') {
          throw new Error(`Cannot reach API server at ${API_URL}. Please make sure the API server is running:\n\n→ Run: cd api && npm run dev`)
        }
        // If it's a different error, continue with download attempt (might be a temporary issue)
        console.warn('Health check failed, but continuing with download attempt:', healthError.message)
      }

      console.log(`Attempting to download report for run ${runId} from ${API_URL}/api/tests/${runId}/download`)

      const response = await fetch(`${API_URL}/api/tests/${runId}/download`, {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        // Don't set Content-Type for binary downloads
      })

      // Handle network errors
      if (!response) {
        throw new Error(`Cannot connect to API server at ${API_URL}. Make sure the API server is running on port 3001.`)
      }

      console.log(`Download response status: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Failed to download report'
        try {
          // Try to read as text first to see if it's JSON
          const text = await response.text()
          try {
            const errorData = JSON.parse(text)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use the text or status
            errorMessage = text || response.statusText || `HTTP ${response.status}: Failed to download report`
          }
        } catch {
          // If response is not readable, use status text
          errorMessage = response.statusText || `HTTP ${response.status}: Failed to download report`
        }
        throw new Error(errorMessage)
      }

      // Check if response is actually a blob/zip
      const contentType = response.headers.get('content-type')
      console.log(`Download content-type: ${contentType}`)

      if (contentType && !contentType.includes('zip') && !contentType.includes('octet-stream') && !contentType.includes('application/x-zip')) {
        // Might be an error response
        const text = await response.text()
        try {
          const errorData = JSON.parse(text)
          throw new Error(errorData.error || 'Failed to download report')
        } catch {
          throw new Error(`Server returned ${contentType} instead of a ZIP file. Response: ${text.substring(0, 200)}`)
        }
      }

      // Get the blob and trigger download
      const blob = await response.blob()
      console.log(`Downloaded blob size: ${blob.size} bytes`)

      // Verify blob is not empty
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty. The report may not be ready yet or there was an error generating it.')
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `test-report-${runId.substring(0, 8)}.zip`
      document.body.appendChild(a)
      a.click()

      // Clean up after a short delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        if (document.body.contains(a)) {
          document.body.removeChild(a)
        }
      }, 100)

      console.log('Report download initiated successfully')
    } catch (error: any) {
      console.error('Download error:', error)

      // Handle network errors (API server not running, CORS, etc.)
      if (error.message === 'Failed to fetch' ||
        error.message.includes('fetch') ||
        error.name === 'TypeError' ||
        error.message.includes('NetworkError') ||
        error.message.includes('ERR_CONNECTION_REFUSED') ||
        error.message.includes('ERR_NETWORK') ||
        error.message.includes('Network request failed')) {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const errorMessage = `Cannot connect to API server at ${apiUrl}.\n\n` +
          `Please check:\n` +
          `1. API server is running on port 3001\n` +
          `   → Run: cd api && npm run dev\n` +
          `2. You have an active internet connection\n` +
          `3. The test run has completed\n` +
          `4. CORS is properly configured (should be automatic in development)`

        throw new Error(errorMessage)
      }

      // Re-throw with original message if it's already descriptive
      throw error
    }
  },

  // Live streaming and control
  async getStreamInfo(runId: string): Promise<{ streamUrl?: string; livekitUrl?: string; token?: string }> {
    return request(`/api/tests/${runId}/stream`)
  },

  async overrideStep(runId: string, action: { type: string; selector?: string; value?: string }): Promise<{ success: boolean; message: string; action: any }> {
    return request(`/api/tests/${runId}/override-step`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    })
  },

  async updateInstructions(runId: string, instructions: string): Promise<{ success: boolean; message: string; instructions: string }> {
    return request(`/api/tests/${runId}/update-instructions`, {
      method: 'POST',
      body: JSON.stringify({ instructions }),
    })
  },

  async getStep(runId: string, stepNumber: number): Promise<{ step: any }> {
    return request(`/api/tests/${runId}/steps/${stepNumber}`)
  },

  async injectManualAction(
    runId: string,
    action: {
      action: string
      selector?: string
      target?: string
      value?: string
      description?: string
      godMode?: {
        clickX: number
        clickY: number
        extractSelector: boolean
        originalAction?: any
      }
    }
  ): Promise<{ success: boolean; message: string; action: any }> {
    return request(`/api/tests/${runId}/inject-action`, {
      method: 'POST',
      body: JSON.stringify(action),
    })
  },

  // Baseline management for visual regression
  async approveBaseline(runId: string, stepNumber: number): Promise<{ success: boolean; message: string }> {
    return request(`/api/tests/${runId}/baseline/${stepNumber}`, {
      method: 'POST',
    })
  },

  async getBaselineScreenshot(runId: string, stepNumber: number): Promise<{ screenshotUrl: string }> {
    return request(`/api/tests/${runId}/baseline/${stepNumber}/screenshot`)
  },

  // Fix Prompts
  async generateFixPrompt(runId: string, model?: string): Promise<{
    success: boolean
    fixPrompt: {
      id: string
      testRunId: string
      model: string
      prompt: string
      tokenUsage?: {
        inputTokens: number
        outputTokens: number
        totalTokens: number
      }
      createdAt: string
    }
    message?: string
  }> {
    return request(`/api/tests/${runId}/fix-prompt`, {
      method: 'POST',
      body: JSON.stringify({ model }),
    })
  },

  async getFixPrompt(runId: string): Promise<{
    success: boolean
    fixPrompt?: {
      id: string
      testRunId: string
      model: string
      prompt: string
      tokenUsage?: {
        inputTokens: number
        outputTokens: number
        totalTokens: number
      }
      createdAt: string
    }
    canGenerate?: boolean
  }> {
    return request(`/api/tests/${runId}/fix-prompt`)
  },

  async getFixPromptModels(): Promise<{
    success: boolean
    models: Array<{
      id: string
      name: string
      provider: string
      recommended?: boolean
    }>
    recommended: string
  }> {
    return request('/api/fix-prompts/models')
  },

  // Billing & Usage
  async reconcileSubscription(): Promise<{
    synced: boolean
    updated?: boolean
    previousTier?: string
    tier: string
    message?: string
  }> {
    return request('/api/billing/reconcile', { method: 'POST' })
  },

  async checkUsage(): Promise<{
    canRun: boolean
    testsUsed: number
    testsLimit: number
    testsRemaining: number
    tier: string
  }> {
    return request('/api/billing/usage')
  },

  async incrementUsage(type: 'test' | 'visual' = 'test'): Promise<{
    success: boolean
    newCount: number
    tier: string
  }> {
    return request('/api/billing/usage/increment', {
      method: 'POST',
      body: JSON.stringify({ type }),
    })
  },
}

