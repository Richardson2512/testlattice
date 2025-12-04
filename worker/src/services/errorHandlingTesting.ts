/**
 * Error Handling Testing Service
 * Tests user-facing errors, error recovery, and console error detection
 */

import { Page } from 'playwright'

export interface ErrorHandlingIssue {
  type: 
    | 'unhandled-promise-rejection'
    | 'javascript-error'
    | 'stack-trace-exposed'
    | 'no-404-page'
    | 'no-500-page'
    | 'generic-error-message'
    | 'no-retry-button'
    | 'form-data-lost'
    | 'stuck-loading-state'
    | 'cors-error'
    | 'timeout-error'
    | 'asset-404'
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  element?: string
  selector?: string
  url?: string
  recommendation: string
}

export interface FormValidationCheck {
  hasValidation: boolean
  isSpecific: boolean
  isFriendly: boolean
  errors: string[]
}

export interface ErrorRecoveryCheck {
  hasRetryButton: boolean
  formDataPersists: boolean
  navigationWorks: boolean
  noStuckLoading: boolean
}

export class ErrorHandlingTestingService {
  private unhandledErrors: Array<{ message: string; stack?: string }> = []
  private jsErrors: Array<{ message: string; stack?: string }> = []
  
  constructor() {}

  /**
   * Set up page error listeners
   * Captures unhandled promise rejections and JavaScript errors
   */
  async setupErrorListeners(page: Page): Promise<void> {
    // Capture JavaScript errors (uncaught exceptions)
    page.on('pageerror', (error) => {
      this.jsErrors.push({
        message: error.message,
        stack: error.stack
      })
    })
    
    // Inject listener for unhandled promise rejections
    await page.addInitScript(() => {
      window.addEventListener('unhandledrejection', (event) => {
        (window as any).__unhandledRejections = (window as any).__unhandledRejections || []
        ;(window as any).__unhandledRejections.push({
          reason: event.reason?.toString() || 'Unknown rejection',
          promise: event.promise
        })
      })
    })
  }

  /**
   * Check for unhandled promise rejections and JavaScript errors
   */
  async checkUnhandledPromiseRejections(page: Page): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    // Check JS errors captured by pageerror
    this.jsErrors.forEach(error => {
      issues.push({
        type: 'javascript-error',
        severity: 'high',
        description: `JavaScript error: ${error.message}`,
        recommendation: 'Add proper error handling with try-catch or error boundaries',
      })
    })
    
    // Check unhandled rejections from injected script
    const unhandledRejections = await page.evaluate(() => {
      return (window as any).__unhandledRejections || []
    })
    
    unhandledRejections.forEach((rejection: any) => {
      issues.push({
        type: 'unhandled-promise-rejection',
        severity: 'critical',
        description: `Unhandled promise rejection: ${rejection.reason}`,
        recommendation: 'Add .catch() handlers to all promises or use try-catch in async functions',
      })
    })
    
    return issues
  }

  /**
   * Check for CORS errors in console/network
   */
  async checkCORSErrors(page: Page, consoleErrors: any[], networkErrors: any[]): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    // Check console errors for CORS messages
    const corsConsoleErrors = consoleErrors.filter(err => 
      err.message.toLowerCase().includes('cors') ||
      err.message.toLowerCase().includes('cross-origin') ||
      err.message.toLowerCase().includes('access-control-allow-origin')
    )
    
    corsConsoleErrors.forEach(err => {
      issues.push({
        type: 'cors-error',
        severity: 'high',
        description: `CORS error: ${err.message}`,
        url: err.source,
        recommendation: 'Configure CORS headers on server or use a proxy',
      })
    })
    
    // Check network errors for CORS failures
    const corsNetworkErrors = networkErrors.filter((err: any) => 
      err.errorText?.toLowerCase().includes('cors') ||
      err.errorText?.toLowerCase().includes('cross-origin')
    )
    
    corsNetworkErrors.forEach((err: any) => {
      issues.push({
        type: 'cors-error',
        severity: 'high',
        description: `CORS network error for ${err.url}`,
        url: err.url,
        recommendation: 'Add Access-Control-Allow-Origin header on server',
      })
    })
    
    return issues
  }

  /**
   * Check for 404 asset errors (images, scripts, styles)
   */
  async checkAsset404s(networkErrors: any[]): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    const asset404s = networkErrors.filter((err: any) => 
      err.status === 404 && 
      (err.resourceType === 'image' || 
       err.resourceType === 'script' || 
       err.resourceType === 'stylesheet' ||
       err.resourceType === 'font')
    )
    
    asset404s.forEach((err: any) => {
      issues.push({
        type: 'asset-404',
        severity: 'medium',
        description: `404 for ${err.resourceType}: ${err.url}`,
        url: err.url,
        recommendation: `Fix the path to this ${err.resourceType} or remove the reference`,
      })
    })
    
    return issues
  }

  /**
   * Check for stack trace exposure in error messages
   * Security issue: stack traces should not be visible to users
   */
  async checkStackTraceExposure(page: Page): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    const hasStackTrace = await page.evaluate(() => {
      const bodyText = document.body.innerText.toLowerCase()
      
      // Look for common stack trace patterns
      const stackTracePatterns = [
        /at\s+\w+\s+\([^)]+:\d+:\d+\)/i,  // "at functionName (file.js:10:5)"
        /error:\s*\w+error:/i,              // "Error: TypeError:"
        /\s+at\s+Object\.</i,               // "at Object."
        /\.js:\d+:\d+/,                     // "file.js:10:5"
        /stack\s*trace/i,                   // "Stack Trace"
      ]
      
      const foundPatterns: string[] = []
      
      for (const pattern of stackTracePatterns) {
        if (pattern.test(bodyText)) {
          foundPatterns.push(pattern.toString())
        }
      }
      
      return {
        hasTrace: foundPatterns.length > 0,
        patterns: foundPatterns
      }
    })
    
    if (hasStackTrace.hasTrace) {
      issues.push({
        type: 'stack-trace-exposed',
        severity: 'critical',
        description: 'Stack trace visible to users (security risk)',
        recommendation: 'Use custom error pages in production - never expose stack traces to end users',
      })
    }
    
    return issues
  }

  /**
   * Test 404 error page
   * Navigate to non-existent page and check for helpful error page
   */
  async test404Page(page: Page, baseUrl: string): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    if (!baseUrl) {
      return issues
    }
    
    try {
      // Save current URL to restore later
      const originalUrl = page.url()
      
      // Navigate to a non-existent page
      const randomPath = `/non-existent-page-${Date.now()}`
      const response = await page.goto(`${baseUrl}${randomPath}`, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      })
      
      if (!response) {
        issues.push({
          type: 'no-404-page',
          severity: 'medium',
          description: 'No response for 404 page',
          recommendation: 'Implement a custom 404 error page',
        })
        // Try to navigate back
        await page.goto(originalUrl, { waitUntil: 'networkidle', timeout: 10000 }).catch(() => {})
        return issues
      }
      
      const status = response.status()
      
      if (status !== 404) {
        issues.push({
          type: 'no-404-page',
          severity: 'high',
          description: `Non-existent page returns ${status} instead of 404`,
          recommendation: 'Configure server to return 404 for missing pages',
        })
      }
      
      // Check if 404 page is helpful
      const pageContent = await page.evaluate(() => {
        const bodyText = document.body.innerText.toLowerCase()
        const hasHomeLink = !!document.querySelector('a[href="/"], a[href="' + window.location.origin + '"]')
        const hasSearchBox = !!document.querySelector('input[type="search"], input[name*="search"]')
        const hasHelpfulMessage = bodyText.includes('not found') || 
                                  bodyText.includes('404') ||
                                  bodyText.includes("doesn't exist") ||
                                  bodyText.includes('lost')
        
        return {
          hasHomeLink,
          hasSearchBox,
          hasHelpfulMessage,
          isBlank: bodyText.trim().length < 50
        }
      })
      
      if (pageContent.isBlank) {
        issues.push({
          type: 'no-404-page',
          severity: 'high',
          description: '404 page is blank or has minimal content',
          recommendation: 'Design a helpful 404 page with navigation options',
        })
      }
      
      if (!pageContent.hasHelpfulMessage) {
        issues.push({
          type: 'no-404-page',
          severity: 'medium',
          description: '404 page lacks user-friendly explanation',
          recommendation: 'Add clear message explaining the page was not found',
        })
      }
      
      if (!pageContent.hasHomeLink) {
        issues.push({
          type: 'no-404-page',
          severity: 'low',
          description: '404 page has no link back to homepage',
          recommendation: 'Add a "Go Home" or "Back to Homepage" link',
        })
      }
      
      // Navigate back to original page
      await page.goto(originalUrl, { waitUntil: 'networkidle', timeout: 10000 }).catch(() => {})
      
    } catch (error) {
      console.error('Error testing 404 page:', error)
    }
    
    return issues
  }

  /**
   * Check form validation error messages
   * Tests if validation errors are specific and user-friendly
   */
  async checkFormValidation(page: Page): Promise<FormValidationCheck> {
    const result = await page.evaluate(() => {
      const forms = document.querySelectorAll('form')
      const errors: string[] = []
      let hasValidation = false
      let isSpecific = true
      let isFriendly = true
      
      forms.forEach(form => {
        // Look for error messages
        const errorElements = form.querySelectorAll(
          '.error, .error-message, [role="alert"], .invalid-feedback, .field-error, [aria-invalid="true"] + *'
        )
        
        errorElements.forEach(el => {
          const text = el.textContent?.toLowerCase() || ''
          hasValidation = true
          
          // Check if error is generic
          const genericErrors = [
            'error',
            'invalid',
            'required',
            'field is required',
            'please fill out this field'
          ]
          
          if (genericErrors.some(generic => text === generic.trim())) {
            isSpecific = false
            errors.push(`Generic error message: "${el.textContent}"`)
          }
          
          // Check if error is user-friendly (not technical)
          const technicalTerms = [
            'null',
            'undefined',
            'exception',
            'stack',
            'error code',
            'errno',
          ]
          
          if (technicalTerms.some(term => text.includes(term))) {
            isFriendly = false
            errors.push(`Technical error message: "${el.textContent}"`)
          }
        })
      })
      
      return {
        hasValidation,
        isSpecific,
        isFriendly,
        errors
      }
    })
    
    return result
  }

  /**
   * Test error recovery mechanisms
   * Checks for retry buttons, form data persistence, etc.
   */
  async checkErrorRecovery(page: Page): Promise<ErrorRecoveryCheck> {
    const result = await page.evaluate(() => {
      // Look for retry/try again buttons
      let hasRetryButton = false
      const elements = document.querySelectorAll('button, a')
      elements.forEach(el => {
        const text = el.textContent?.toLowerCase() || ''
        if (text.includes('retry') || text.includes('try again')) {
          hasRetryButton = true
        }
      })
      
      // Check if any forms have values (indicating data persistence)
      const forms = document.querySelectorAll('form')
      let formHasValues = false
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select')
        inputs.forEach(input => {
          if ((input as HTMLInputElement).value) {
            formHasValues = true
          }
        })
      })
      
      // Check for stuck loading states
      const loadingElements = document.querySelectorAll(
        '.loading, .spinner, [aria-busy="true"], .is-loading'
      )
      const hasVisibleLoading = Array.from(loadingElements).some(el => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })
      
      return {
        hasRetryButton,
        formDataPersists: formHasValues,
        navigationWorks: true, // Would need actual navigation test
        noStuckLoading: !hasVisibleLoading
      }
    })
    
    return result
  }

  /**
   * Check for stuck loading states
   * Detects spinners/loading indicators that never disappear
   */
  async checkStuckLoadingStates(page: Page, timeoutMs: number = 30000): Promise<ErrorHandlingIssue[]> {
    const issues: ErrorHandlingIssue[] = []
    
    const hasStuckLoading = await page.evaluate((timeout) => {
      return new Promise((resolve) => {
        // Check after timeout
        setTimeout(() => {
          const loadingElements = document.querySelectorAll(
            '.loading, .spinner, [aria-busy="true"], .is-loading, .loader'
          )
          
          const stuckElements: Array<{ selector: string; visible: boolean }> = []
          
          loadingElements.forEach(el => {
            const style = window.getComputedStyle(el)
            const isVisible = style.display !== 'none' && 
                            style.visibility !== 'hidden' && 
                            style.opacity !== '0'
            
            if (isVisible) {
              let selector = el.className ? `.${el.className.split(' ')[0]}` : el.tagName.toLowerCase()
              stuckElements.push({ selector, visible: isVisible })
            }
          })
          
          resolve(stuckElements)
        }, timeout)
      })
    }, timeoutMs)
    
    if (Array.isArray(hasStuckLoading) && hasStuckLoading.length > 0) {
      hasStuckLoading.forEach((stuck: any) => {
        issues.push({
          type: 'stuck-loading-state',
          severity: 'high',
          description: `Loading indicator stuck visible: ${stuck.selector}`,
          selector: stuck.selector,
          recommendation: 'Add timeout and error handling to hide loading state after request fails',
        })
      })
    }
    
    return issues
  }

  /**
   * Run all error handling checks
   */
  async runAllChecks(
    page: Page, 
    baseUrl: string,
    consoleErrors: any[],
    networkErrors: any[]
  ): Promise<ErrorHandlingIssue[]> {
    console.log('Running error handling tests...')
    
    const [
      unhandledErrors,
      corsErrors,
      asset404s,
      stackTraceIssues,
      errorPage404Issues,
      stuckLoadingIssues,
    ] = await Promise.all([
      this.checkUnhandledPromiseRejections(page),
      this.checkCORSErrors(page, consoleErrors, networkErrors),
      this.checkAsset404s(networkErrors),
      this.checkStackTraceExposure(page),
      this.test404Page(page, baseUrl),
      this.checkStuckLoadingStates(page, 5000), // 5 second timeout
    ])
    
    const allIssues = [
      ...unhandledErrors,
      ...corsErrors,
      ...asset404s,
      ...stackTraceIssues,
      ...errorPage404Issues,
      ...stuckLoadingIssues,
    ]
    
    console.log(`Found ${allIssues.length} error handling issues`)
    return allIssues
  }

  /**
   * Reset collected errors
   */
  reset(): void {
    this.unhandledErrors = []
    this.jsErrors = []
  }
}

