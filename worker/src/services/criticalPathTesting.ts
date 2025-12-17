/**
 * Critical Path Testing Service
 * End-to-end flow execution with state persistence validation
 */

import { Page } from 'playwright'

export type FlowType = 'ecommerce' | 'saas' | 'social' | 'custom'

export interface CriticalPathFlow {
  name: string
  type: FlowType
  steps: FlowStep[]
  description: string
}

export interface FlowStep {
  name: string
  description: string
  actions: Array<{
    type: 'navigate' | 'click' | 'type' | 'wait' | 'assert' | 'select' | 'submit'
    selector?: string
    value?: string
    target?: string
    waitForNavigation?: boolean
    timeout?: number
  }>
  validation?: {
    urlContains?: string
    elementVisible?: string
    textPresent?: string
    stateCheck?: 'login' | 'cart' | 'form'
  }
  captureState?: boolean  // Capture state for later validation
}

export interface FlowExecutionResult {
  flowName: string
  success: boolean
  completedSteps: number
  totalSteps: number
  duration: number
  steps: Array<{
    stepNumber: number
    name: string
    success: boolean
    duration: number
    screenshot?: string
    error?: string
    stateValidation?: StateValidationResult
  }>
  statePersistence: StatePersistenceCheck
}

export interface StateValidationResult {
  type: 'login' | 'cart' | 'form' | 'custom'
  persisted: boolean
  details: string
}

export interface StatePersistenceCheck {
  loginSessionPersists: boolean
  formDataPersists: boolean
  cartItemsPersist: boolean
  cookiesPersist: boolean
  localStoragePersists: boolean
}

export class CriticalPathTestingService {
  private flows: Map<string, CriticalPathFlow> = new Map()
  private capturedState: Map<string, any> = new Map()
  
  constructor() {
    this.initializeCommonFlows()
  }

  /**
   * Initialize common flow patterns
   */
  private initializeCommonFlows(): void {
    // E-commerce flow
    this.flows.set('ecommerce', {
      name: 'E-commerce Checkout Flow',
      type: 'ecommerce',
      description: 'Browse → Add to Cart → Checkout → Payment → Confirmation',
      steps: [
        {
          name: 'Browse Products',
          description: 'Navigate to product listing',
          actions: [
            { type: 'navigate', value: '/products' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            urlContains: '/products',
            elementVisible: '.product-list, .products, [data-testid="product-grid"], .product-grid'
          }
        },
        {
          name: 'Add to Cart',
          description: 'Select product and add to cart',
          actions: [
            { type: 'click', selector: '.product-card:first-child, .product:first-child, [data-testid="product-item"]:first-child, .product-item:first-child' },
            { type: 'wait', timeout: 1000 },
            { type: 'click', selector: 'button:has-text("Add to Cart"), button:has-text("Add to Basket"), [data-testid="add-to-cart"], .add-to-cart' },
            { type: 'wait', timeout: 2000 }
          ],
          captureState: true,
          validation: {
            stateCheck: 'cart'
          }
        },
        {
          name: 'View Cart',
          description: 'Navigate to cart and verify item',
          actions: [
            { type: 'click', selector: '[href="/cart"], a:has-text("Cart"), [data-testid="cart-link"], .cart-link' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            urlContains: '/cart',
            elementVisible: '.cart-item, .cart-items, [data-testid="cart-items"]',
            stateCheck: 'cart'
          }
        },
        {
          name: 'Checkout',
          description: 'Proceed to checkout',
          actions: [
            { type: 'click', selector: 'button:has-text("Checkout"), button:has-text("Proceed"), [data-testid="checkout-button"], .checkout-button' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            urlContains: '/checkout',
            stateCheck: 'cart'
          }
        },
        {
          name: 'Confirmation',
          description: 'Verify checkout flow completion',
          actions: [
            { type: 'wait', timeout: 1000 }
          ],
          validation: {
            textPresent: 'order',
            stateCheck: 'cart'
          }
        }
      ]
    })

    // SaaS onboarding flow
    this.flows.set('saas', {
      name: 'SaaS Onboarding Flow',
      type: 'saas',
      description: 'Sign Up → Email Verify → Onboarding → Create Item → Dashboard',
      steps: [
        {
          name: 'Sign Up',
          description: 'Navigate to signup and fill form',
          actions: [
            { type: 'navigate', value: '/signup' },
            { type: 'wait', timeout: 1000 },
            { type: 'type', selector: 'input[type="email"], input[name="email"]', value: 'test@example.com' },
            { type: 'type', selector: 'input[type="password"], input[name="password"]', value: 'TestPass123!' },
            { type: 'submit', selector: 'form, button[type="submit"]' },
            { type: 'wait', timeout: 3000 }
          ],
          captureState: true,
          validation: {
            stateCheck: 'login'
          }
        },
        {
          name: 'Onboarding',
          description: 'Complete onboarding wizard',
          actions: [
            { type: 'wait', timeout: 2000 },
            { type: 'click', selector: 'button:has-text("Next"), button:has-text("Continue"), button:has-text("Get Started"), [data-testid="next-button"]' },
            { type: 'wait', timeout: 1000 }
          ],
          validation: {
            urlContains: '/onboarding',
            stateCheck: 'login'
          }
        },
        {
          name: 'Create First Item',
          description: 'Create first project/item',
          actions: [
            { type: 'click', selector: 'button:has-text("Create"), button:has-text("New"), button:has-text("Add"), [data-testid="create-button"]' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            stateCheck: 'login'
          }
        },
        {
          name: 'Dashboard',
          description: 'Navigate to dashboard',
          actions: [
            { type: 'navigate', value: '/dashboard' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            urlContains: '/dashboard',
            stateCheck: 'login'
          }
        }
      ]
    })

    // Social media flow
    this.flows.set('social', {
      name: 'Social Media Flow',
      type: 'social',
      description: 'Sign Up → Profile Setup → Create Post → Like/Comment → View Feed',
      steps: [
        {
          name: 'Sign Up',
          description: 'Create new account',
          actions: [
            { type: 'navigate', value: '/signup' },
            { type: 'wait', timeout: 1000 },
            { type: 'type', selector: 'input[name="username"], input[name="email"]', value: 'testuser' },
            { type: 'type', selector: 'input[type="password"]', value: 'TestPass123!' },
            { type: 'submit', selector: 'form' },
            { type: 'wait', timeout: 3000 }
          ],
          captureState: true,
          validation: {
            stateCheck: 'login'
          }
        },
        {
          name: 'Profile Setup',
          description: 'Set up user profile',
          actions: [
            { type: 'wait', timeout: 2000 },
            { type: 'type', selector: 'input[name="bio"], textarea[placeholder*="bio"], textarea[placeholder*="Bio"]', value: 'Test bio' },
            { type: 'click', selector: 'button:has-text("Save"), button:has-text("Continue")' },
            { type: 'wait', timeout: 1000 }
          ],
          validation: {
            stateCheck: 'login'
          }
        },
        {
          name: 'Create Post',
          description: 'Create first post',
          actions: [
            { type: 'click', selector: 'button:has-text("Post"), button:has-text("Create"), button:has-text("New Post"), [data-testid="create-post"]' },
            { type: 'wait', timeout: 1000 },
            { type: 'type', selector: 'textarea, [contenteditable="true"], input[placeholder*="post"]', value: 'Test post content' },
            { type: 'click', selector: 'button:has-text("Post"), button:has-text("Publish"), button:has-text("Share")' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            stateCheck: 'login'
          }
        },
        {
          name: 'View Feed',
          description: 'Navigate to feed',
          actions: [
            { type: 'navigate', value: '/feed' },
            { type: 'wait', timeout: 2000 }
          ],
          validation: {
            urlContains: '/feed',
            stateCheck: 'login'
          }
        }
      ]
    })
  }

  /**
   * Execute a critical path flow
   */
  async executeFlow(
    page: Page,
    flowName: string,
    baseUrl: string
  ): Promise<FlowExecutionResult> {
    const flow = this.flows.get(flowName)
    if (!flow) {
      throw new Error(`Flow '${flowName}' not found`)
    }

    const startTime = Date.now()
    const stepResults: FlowExecutionResult['steps'] = []
    let completedSteps = 0

    console.log(`Executing critical path flow: ${flow.name}`)

    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i]
      const stepStartTime = Date.now()
      
      console.log(`Step ${i + 1}/${flow.steps.length}: ${step.name}`)
      
      try {
        // Execute step actions
        for (const action of step.actions) {
          await this.executeAction(page, action, baseUrl)
        }

        // Capture state if requested
        if (step.captureState) {
          await this.captureState(page, `step_${i}`)
        }

        // Validate step
        const stateValidation = step.validation?.stateCheck 
          ? await this.validateState(page, step.validation.stateCheck)
          : undefined

        if (step.validation) {
          await this.validateStep(page, step.validation)
        }

        // Capture screenshot
        const screenshot = await page.screenshot({ 
          encoding: 'base64',
          fullPage: false 
        })

        stepResults.push({
          stepNumber: i + 1,
          name: step.name,
          success: true,
          duration: Date.now() - stepStartTime,
          screenshot: `data:image/png;base64,${screenshot}`,
          stateValidation
        })

        completedSteps++
        
      } catch (error: any) {
        console.error(`Step ${i + 1} failed:`, error.message)
        
        stepResults.push({
          stepNumber: i + 1,
          name: step.name,
          success: false,
          duration: Date.now() - stepStartTime,
          error: error.message
        })

        break // Stop on first failure
      }
    }

    // Check state persistence
    const statePersistence = await this.checkStatePersistence(page)

    return {
      flowName: flow.name,
      success: completedSteps === flow.steps.length,
      completedSteps,
      totalSteps: flow.steps.length,
      duration: Date.now() - startTime,
      steps: stepResults,
      statePersistence
    }
  }

  /**
   * Execute a single action
   */
  private async executeAction(
    page: Page,
    action: FlowStep['actions'][0],
    baseUrl: string
  ): Promise<void> {
    console.log(`  → ${action.type} ${action.selector || action.value || ''}`)
    
    switch (action.type) {
      case 'navigate':
        const url = action.value?.startsWith('http') 
          ? action.value 
          : `${baseUrl}${action.value}`
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
        break

      case 'click':
        if (!action.selector) throw new Error('Selector required for click')
        await page.locator(action.selector).first().click({ timeout: 10000 })
        if (action.waitForNavigation) {
          await page.waitForLoadState('networkidle', { timeout: 10000 })
        }
        break

      case 'type':
        if (!action.selector || !action.value) {
          throw new Error('Selector and value required for type')
        }
        await page.locator(action.selector).first().fill(action.value, { timeout: 10000 })
        break

      case 'select':
        if (!action.selector || !action.value) {
          throw new Error('Selector and value required for select')
        }
        await page.locator(action.selector).first().selectOption(action.value)
        break

      case 'submit':
        if (!action.selector) throw new Error('Selector required for submit')
        try {
          await page.locator(action.selector).first().press('Enter', { timeout: 5000 })
        } catch (e) {
          // If Enter doesn't work, try clicking
          await page.locator(action.selector).first().click({ timeout: 5000 })
        }
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
        break

      case 'wait':
        await page.waitForTimeout(action.timeout || 1000)
        break

      case 'assert':
        if (!action.selector) throw new Error('Selector required for assert')
        await page.locator(action.selector).first().waitFor({ state: 'visible', timeout: 10000 })
        break
    }
  }

  /**
   * Validate step completion
   */
  private async validateStep(
    page: Page,
    validation: FlowStep['validation']
  ): Promise<void> {
    if (!validation) return

    if (validation.urlContains) {
      const url = page.url()
      if (!url.includes(validation.urlContains)) {
        throw new Error(`URL validation failed: expected to contain '${validation.urlContains}', got '${url}'`)
      }
    }

    if (validation.elementVisible) {
      const element = page.locator(validation.elementVisible).first()
      await element.waitFor({ state: 'visible', timeout: 10000 })
    }

    if (validation.textPresent) {
      const bodyText = await page.textContent('body')
      if (!bodyText?.toLowerCase().includes(validation.textPresent.toLowerCase())) {
        throw new Error(`Text validation failed: expected to find '${validation.textPresent}'`)
      }
    }
  }

  /**
   * Capture page state for later validation
   */
  private async captureState(page: Page, key: string): Promise<void> {
    const state = await page.evaluate(() => {
      return {
        localStorage: { ...localStorage },
        sessionStorage: { ...sessionStorage },
        cookies: document.cookie,
        url: window.location.href
      }
    })
    this.capturedState.set(key, state)
  }

  /**
   * Validate state persistence
   */
  private async validateState(
    page: Page,
    type: 'login' | 'cart' | 'form'
  ): Promise<StateValidationResult> {
    let persisted = false
    let details = ''

    switch (type) {
      case 'login':
        persisted = await page.evaluate(() => {
          // Check for common login indicators
          const hasAuthToken = !!localStorage.getItem('token') || 
                              !!localStorage.getItem('authToken') ||
                              !!localStorage.getItem('accessToken') ||
                              !!sessionStorage.getItem('token') ||
                              !!sessionStorage.getItem('authToken')
          const hasAuthCookie = document.cookie.includes('auth') ||
                               document.cookie.includes('session') ||
                               document.cookie.includes('token')
          return hasAuthToken || hasAuthCookie
        })
        details = persisted ? 'Login session found in localStorage/cookies' : 'No login session detected'
        break

      case 'cart':
        persisted = await page.evaluate(() => {
          const cartData = localStorage.getItem('cart') ||
                          localStorage.getItem('cartItems') ||
                          localStorage.getItem('shopping_cart') ||
                          sessionStorage.getItem('cart') ||
                          sessionStorage.getItem('cartItems')
          return !!cartData
        })
        details = persisted ? 'Cart data persists in storage' : 'Cart data not found in storage'
        break

      case 'form':
        persisted = await page.evaluate(() => {
          const inputs = document.querySelectorAll('input, textarea')
          let hasData = false
          inputs.forEach(input => {
            if ((input as HTMLInputElement).value) hasData = true
          })
          return hasData
        })
        details = persisted ? 'Form data persists in fields' : 'Form data lost'
        break
    }

    return { type, persisted, details }
  }

  /**
   * Check state persistence across navigation
   */
  private async checkStatePersistence(page: Page): Promise<StatePersistenceCheck> {
    const result = await page.evaluate(() => {
      // Check login session
      const loginPersists = !!localStorage.getItem('token') ||
                           !!localStorage.getItem('authToken') ||
                           !!sessionStorage.getItem('token') ||
                           document.cookie.includes('auth') ||
                           document.cookie.includes('session')

      // Check form data
      const inputs = document.querySelectorAll('input, textarea')
      let formDataPersists = false
      inputs.forEach(input => {
        if ((input as HTMLInputElement).value) formDataPersists = true
      })

      // Check cart
      const cartPersists = !!localStorage.getItem('cart') ||
                          !!localStorage.getItem('cartItems') ||
                          !!sessionStorage.getItem('cart')

      // Check cookies
      const cookiesPersist = document.cookie.length > 0

      // Check localStorage
      const localStoragePersists = localStorage.length > 0

      return {
        loginSessionPersists: loginPersists,
        formDataPersists,
        cartItemsPersist: cartPersists,
        cookiesPersist,
        localStoragePersists
      }
    })

    return result
  }

  /**
   * Get available flows
   */
  getAvailableFlows(): Array<{ name: string; type: FlowType; description: string }> {
    return Array.from(this.flows.values()).map(flow => ({
      name: flow.name,
      type: flow.type,
      description: flow.description
    }))
  }

  /**
   * Register a custom flow
   */
  registerFlow(flowName: string, flow: CriticalPathFlow): void {
    this.flows.set(flowName, flow)
  }

  /**
   * Reset captured state
   */
  reset(): void {
    this.capturedState.clear()
  }
}

