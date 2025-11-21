// API client for frontend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface TestRun {
  id: string
  projectId: string
  status: 'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  build: {
    type: 'web' | 'android' | 'ios'
    url?: string
    artifactId?: string
    version?: string
  }
  profile: {
    device: string
    region?: string
    maxMinutes?: number
  }
  options?: {
    visualDiff?: boolean
    stressTest?: boolean
    coverage?: string[]
    maxSteps?: number
  }
  createdAt: string
  updatedAt: string
  startedAt?: string
  completedAt?: string
  duration?: number
  error?: string
  reportUrl?: string
  artifactsUrl?: string
  paused?: boolean
  currentStep?: number
  steps?: Array<{
    id: string
    stepNumber: number
    action: string
    target?: string
    value?: string
    timestamp: string
    screenshotUrl?: string
    domSnapshot?: string
    success: boolean
    error?: string
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
    type: 'web' | 'android' | 'ios'
    url?: string
    artifactId?: string
    version?: string
  }
  profile: {
    device: string
    region?: string
    maxMinutes?: number
  }
  options?: {
    visualDiff?: boolean
    stressTest?: boolean
    coverage?: string[]
    maxSteps?: number
    testMode?: 'single' | 'multi' | 'all'
    allPages?: boolean
  }
}

export interface TestArtifact {
  id: string
  runId: string
  type: 'screenshot' | 'video' | 'log' | 'dom'
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
  try {
    const token = await getAuthToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers,
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  } catch (error: any) {
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

      // Download report as ZIP
      async downloadReport(runId: string): Promise<void> {
        try {
          const token = await getAuthToken()
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
          
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
          if (error.message === 'Failed to fetch' || error.message.includes('fetch') || error.name === 'TypeError' || error.message.includes('NetworkError')) {
            throw new Error(`Cannot connect to API server at ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}. Make sure the API server is running on port 3001 and CORS is properly configured.`)
          }
          throw error
        }
      },
    }

