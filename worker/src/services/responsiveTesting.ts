/**
 * Responsive & Mobile Testing Service
 * Comprehensive responsive design and mobile usability checks
 */

import { Page } from 'playwright'
import type { VisualIssue } from './comprehensiveTesting'

export interface TouchTargetIssue {
  selector: string
  element: string
  width: number
  height: number
  minSize: number
  issue: 'too_small_width' | 'too_small_height' | 'too_small_both'
}

export interface SpacingIssue {
  element1: string
  element2: string
  spacing: number
  minSpacing: number
}

export interface ResponsiveIssues {
  touchTargets: TouchTargetIssue[]
  textSize: Array<{ selector: string; fontSize: number; minSize: number }>
  horizontalScroll: boolean
  layoutBreakpoints: Array<{ breakpoint: number; broken: boolean; reason: string }>
  spacingIssues: SpacingIssue[]
  hamburgerMenu: { exists: boolean; functional: boolean; issue?: string }
  keyboardObscures: boolean
  autoZoomPrevented: boolean
}

export class ResponsiveTestingService {
  private MIN_TOUCH_TARGET = 44 // 44x44px minimum for iOS/Android
  private MIN_SPACING = 8 // 8px minimum between tappable elements
  private MIN_TEXT_SIZE = 16 // 16px to prevent iOS auto-zoom
  
  constructor() {}

  /**
   * Check touch target sizes (buttons, links, inputs)
   * Apple HIG & Material Design require 44x44px minimum
   */
  async checkTouchTargets(page: Page): Promise<TouchTargetIssue[]> {
    const issues = await page.evaluate((minSize) => {
      const touchableSelectors = [
        'button',
        'a',
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="checkbox"]',
        'input[type="radio"]',
        '[role="button"]',
        '[onclick]',
        '[tabindex]:not([tabindex="-1"])',
      ]
      
      const issues: any[] = []
      const elements = document.querySelectorAll(touchableSelectors.join(', '))
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const style = window.getComputedStyle(el)
        
        // Skip hidden elements
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          return
        }
        
        // Get selector
        let selector = ''
        if (el.id) selector = `#${el.id}`
        else if (el.className && typeof el.className === 'string') {
          selector = `.${el.className.split(' ')[0]}`
        } else {
          selector = el.tagName.toLowerCase()
        }
        
        // Check size
        const width = rect.width
        const height = rect.height
        
        if (width < minSize || height < minSize) {
          let issue = 'too_small_both'
          if (width >= minSize && height < minSize) issue = 'too_small_height'
          if (width < minSize && height >= minSize) issue = 'too_small_width'
          
          issues.push({
            selector,
            element: el.tagName.toLowerCase(),
            width: Math.round(width),
            height: Math.round(height),
            minSize,
            issue
          })
        }
      })
      
      return issues
    }, this.MIN_TOUCH_TARGET)
    
    return issues
  }

  /**
   * Check spacing between tappable elements
   * Minimum 8px to prevent accidental taps
   */
  async checkTouchTargetSpacing(page: Page): Promise<SpacingIssue[]> {
    const issues = await page.evaluate((minSpacing) => {
      const touchableSelectors = [
        'button',
        'a',
        'input[type="button"]',
        'input[type="submit"]',
        '[role="button"]',
      ]
      
      const issues: any[] = []
      const elements = Array.from(document.querySelectorAll(touchableSelectors.join(', ')))
      
      // Get visible elements with their positions
      const visibleElements = elements
        .filter(el => {
          const style = window.getComputedStyle(el)
          return style.display !== 'none' && style.visibility !== 'hidden'
        })
        .map(el => ({
          el,
          rect: el.getBoundingClientRect()
        }))
      
      // Check spacing between adjacent elements
      for (let i = 0; i < visibleElements.length; i++) {
        for (let j = i + 1; j < visibleElements.length; j++) {
          const elem1 = visibleElements[i]
          const elem2 = visibleElements[j]
          
          // Calculate distance between elements
          const horizontalDistance = Math.min(
            Math.abs(elem1.rect.right - elem2.rect.left),
            Math.abs(elem2.rect.right - elem1.rect.left)
          )
          
          const verticalDistance = Math.min(
            Math.abs(elem1.rect.bottom - elem2.rect.top),
            Math.abs(elem2.rect.bottom - elem1.rect.top)
          )
          
          const minDistance = Math.min(horizontalDistance, verticalDistance)
          
          // Check if elements are close and spacing is too small
          if (minDistance > 0 && minDistance < minSpacing) {
            const getSelector = (el: Element) => {
              if (el.id) return `#${el.id}`
              if (el.className && typeof el.className === 'string') {
                return `.${el.className.split(' ')[0]}`
              }
              return el.tagName.toLowerCase()
            }
            
            issues.push({
              element1: getSelector(elem1.el),
              element2: getSelector(elem2.el),
              spacing: Math.round(minDistance),
              minSpacing
            })
          }
        }
      }
      
      return issues.slice(0, 10) // Limit to first 10 issues
    }, this.MIN_SPACING)
    
    return issues
  }

  /**
   * Check text size to prevent iOS auto-zoom
   * Body text should be at least 16px
   */
  async checkTextSize(page: Page): Promise<Array<{ selector: string; fontSize: number; minSize: number }>> {
    const issues = await page.evaluate((minSize) => {
      const issues: any[] = []
      
      // Check body font size
      const bodyFontSize = parseFloat(window.getComputedStyle(document.body).fontSize)
      if (bodyFontSize < minSize) {
        issues.push({
          selector: 'body',
          fontSize: Math.round(bodyFontSize),
          minSize
        })
      }
      
      // Check input font sizes
      const inputs = document.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        const style = window.getComputedStyle(input)
        const fontSize = parseFloat(style.fontSize)
        
        if (fontSize < minSize && style.display !== 'none') {
          let selector = ''
          if (input.id) selector = `#${input.id}`
          else if (input.className && typeof input.className === 'string') {
            selector = `.${input.className.split(' ')[0]}`
          } else {
            selector = input.tagName.toLowerCase()
          }
          
          issues.push({
            selector,
            fontSize: Math.round(fontSize),
            minSize
          })
        }
      })
      
      return issues
    }, this.MIN_TEXT_SIZE)
    
    return issues
  }

  /**
   * Check for horizontal scrolling on mobile
   * Mobile viewports should never have horizontal scroll
   */
  async checkMobileHorizontalScroll(page: Page): Promise<boolean> {
    const viewport = page.viewportSize()
    if (!viewport || viewport.width >= 768) {
      return false // Only check on mobile viewports
    }
    
    const hasScroll = await page.evaluate(() => {
      const bodyWidth = document.body.scrollWidth
      const windowWidth = window.innerWidth
      return bodyWidth > windowWidth
    })
    
    return hasScroll
  }

  /**
   * Check hamburger menu functionality
   * Common on mobile sites
   */
  async checkHamburgerMenu(page: Page): Promise<{ exists: boolean; functional: boolean; issue?: string }> {
    const result = await page.evaluate(() => {
      // Look for common hamburger menu patterns
      const hamburgerSelectors = [
        '.hamburger',
        '.menu-toggle',
        '.mobile-menu-toggle',
        '[aria-label*="menu" i]',
        '[aria-label*="navigation" i]',
        'button.nav-toggle',
        '.nav-icon',
      ]
      
      let menuButton: Element | null = null
      for (const selector of hamburgerSelectors) {
        menuButton = document.querySelector(selector)
        if (menuButton) break
      }
      
      if (!menuButton) {
        return { exists: false, functional: false, issue: 'No hamburger menu found' }
      }
      
      // Check if it's visible
      const style = window.getComputedStyle(menuButton)
      if (style.display === 'none' || style.visibility === 'hidden') {
        return { exists: true, functional: false, issue: 'Hamburger menu is hidden' }
      }
      
      // Check if it has click handler
      const hasClickHandler = !!(menuButton as any).onclick || 
                             menuButton.getAttribute('onclick') !== null ||
                             menuButton.hasAttribute('data-toggle') ||
                             menuButton.hasAttribute('aria-controls')
      
      if (!hasClickHandler) {
        return { exists: true, functional: false, issue: 'Hamburger menu has no click handler' }
      }
      
      return { exists: true, functional: true }
    })
    
    return result
  }

  /**
   * Check layout at different breakpoints
   * Common breakpoints: 768px (tablet), 1024px (desktop)
   */
  async checkLayoutBreakpoints(page: Page): Promise<Array<{ breakpoint: number; broken: boolean; reason: string }>> {
    const breakpoints = [
      { size: 375, name: 'Mobile Small' },
      { size: 768, name: 'Tablet' },
      { size: 1024, name: 'Desktop' },
    ]
    
    const results = []
    const originalViewport = page.viewportSize()
    
    for (const bp of breakpoints) {
      // Set viewport to breakpoint
      await page.setViewportSize({ width: bp.size, height: 800 })
      await page.waitForTimeout(500) // Wait for layout to settle
      
      // Check for issues
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth
      })
      
      const hasOverlap = await page.evaluate(() => {
        // Check if major elements overlap
        const header = document.querySelector('header, [role="banner"]')
        const main = document.querySelector('main, [role="main"]')
        
        if (header && main) {
          const headerRect = header.getBoundingClientRect()
          const mainRect = main.getBoundingClientRect()
          
          // Check if they overlap vertically
          return headerRect.bottom > mainRect.top && headerRect.top < mainRect.bottom
        }
        
        return false
      })
      
      let broken = false
      let reason = ''
      
      if (hasHorizontalScroll) {
        broken = true
        reason = 'Horizontal scroll detected'
      } else if (hasOverlap) {
        broken = true
        reason = 'Elements overlap'
      }
      
      results.push({
        breakpoint: bp.size,
        broken,
        reason: broken ? reason : 'Layout OK'
      })
    }
    
    // Restore original viewport
    if (originalViewport) {
      await page.setViewportSize(originalViewport)
    }
    
    return results
  }

  /**
   * Run all responsive/mobile checks
   */
  async runAllChecks(page: Page): Promise<ResponsiveIssues> {
    console.log('Running responsive/mobile testing...')
    
    const [
      touchTargets,
      spacingIssues,
      textSize,
      horizontalScroll,
      layoutBreakpoints,
      hamburgerMenu,
    ] = await Promise.all([
      this.checkTouchTargets(page),
      this.checkTouchTargetSpacing(page),
      this.checkTextSize(page),
      this.checkMobileHorizontalScroll(page),
      this.checkLayoutBreakpoints(page),
      this.checkHamburgerMenu(page),
    ])
    
    return {
      touchTargets,
      textSize,
      horizontalScroll,
      layoutBreakpoints,
      spacingIssues,
      hamburgerMenu,
      keyboardObscures: false, // Would need actual device testing
      autoZoomPrevented: textSize.length === 0, // If text is 16px+, zoom is prevented
    }
  }

  /**
   * Convert responsive issues to VisualIssue format for reporting
   */
  convertToVisualIssues(responsiveIssues: ResponsiveIssues, viewport: string): VisualIssue[] {
    const issues: VisualIssue[] = []
    
    // Touch target issues
    responsiveIssues.touchTargets.forEach(target => {
      issues.push({
        type: 'misaligned',
        selector: target.selector,
        element: target.element,
        description: `Touch target too small: ${target.width}x${target.height}px (minimum ${target.minSize}x${target.minSize}px)`,
        severity: 'high',
        expectedValue: `${target.minSize}x${target.minSize}px`,
        actualValue: `${target.width}x${target.height}px`,
        recommendation: `Increase size to at least ${target.minSize}px in both dimensions`,
        viewport,
      })
    })
    
    // Text size issues
    responsiveIssues.textSize.forEach(text => {
      issues.push({
        type: 'typography-inconsistent',
        selector: text.selector,
        description: `Text too small: ${text.fontSize}px (minimum ${text.minSize}px to prevent iOS auto-zoom)`,
        severity: 'medium',
        expectedValue: `${text.minSize}px`,
        actualValue: `${text.fontSize}px`,
        recommendation: `Set font-size to at least ${text.minSize}px`,
        viewport,
      })
    })
    
    // Horizontal scroll
    if (responsiveIssues.horizontalScroll) {
      issues.push({
        type: 'layout-shift',
        description: 'Horizontal scrolling detected on mobile viewport',
        severity: 'high',
        recommendation: 'Fix responsive layout - check for fixed widths, large images, or overflow',
        viewport,
      })
    }
    
    // Layout breakpoint issues
    responsiveIssues.layoutBreakpoints.forEach(bp => {
      if (bp.broken) {
        issues.push({
          type: 'layout-shift',
          description: `Layout broken at ${bp.breakpoint}px breakpoint: ${bp.reason}`,
          severity: 'high',
          recommendation: 'Add responsive styles for this breakpoint',
          viewport: `${bp.breakpoint}px`,
        })
      }
    })
    
    // Spacing issues
    responsiveIssues.spacingIssues.forEach(spacing => {
      issues.push({
        type: 'spacing-inconsistent',
        description: `Touch targets too close: ${spacing.spacing}px spacing between ${spacing.element1} and ${spacing.element2} (minimum ${spacing.minSpacing}px)`,
        severity: 'medium',
        recommendation: `Add margin or padding to increase spacing to at least ${spacing.minSpacing}px`,
        viewport,
      })
    })
    
    // Hamburger menu
    if (!responsiveIssues.hamburgerMenu.functional && responsiveIssues.hamburgerMenu.exists) {
      issues.push({
        type: 'missing-element',
        description: `Hamburger menu issue: ${responsiveIssues.hamburgerMenu.issue}`,
        severity: 'high',
        recommendation: 'Ensure hamburger menu is visible and has click handler',
        viewport,
      })
    }
    
    return issues
  }
}

