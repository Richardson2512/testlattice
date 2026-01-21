'use client'

import { useEffect, useState, useCallback } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

// Generate a stable slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Ensure headings have IDs - run first
  useEffect(() => {
    const ensureHeadingIds = () => {
      const headingElements = document.querySelectorAll<HTMLElement>(
        '.docs-container h2, .docs-container h3'
      )

      headingElements.forEach((el, index) => {
        // Only generate ID if it doesn't exist or is empty
        if (!el.id || el.id.trim() === '') {
          const text = el.textContent || ''
          const slug = generateSlug(text)
          // Fallback to index-based ID if slug is empty
          el.id = slug || `heading-${index}`
        }
      })
    }

    // Run immediately and after delays to handle async content
    ensureHeadingIds()
    const timeoutId = setTimeout(ensureHeadingIds, 100)
    const timeoutId2 = setTimeout(ensureHeadingIds, 300)
    const timeoutId3 = setTimeout(ensureHeadingIds, 500)
    const timeoutId4 = setTimeout(ensureHeadingIds, 1000)

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      ensureHeadingIds()
    })

    const container = document.querySelector('.docs-container')
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
      clearTimeout(timeoutId4)
      observer.disconnect()
    }
  }, [])

  const scrollToElement = useCallback((element: HTMLElement) => {
    const headerOffset = 90 // Account for sticky header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    })

    // Update URL hash without triggering scroll
    const newHash = `#${element.id}`
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash)
    }
  }, [])

  // Extract headings and set up observer - run after IDs are ensured
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let timeoutId: NodeJS.Timeout | null = null
    let containerObserver: MutationObserver | null = null
    let retryCount = 0
    const maxRetries = 10

    const initialize = () => {
      const headingElements = document.querySelectorAll<HTMLElement>(
        '.docs-container h2, .docs-container h3'
      )

      if (headingElements.length === 0) {
        // Retry if no headings found yet (with exponential backoff, max retries)
        if (retryCount < maxRetries) {
          retryCount++
          timeoutId = setTimeout(initialize, 200 * retryCount)
        }
        return
      }

      // Extract heading data
      const extractedHeadings: Heading[] = Array.from(headingElements)
        .filter((el) => el.id && el.id.trim() !== '')
        .map((el) => {
          return {
            id: el.id,
            text: el.textContent || '',
            level: parseInt(el.tagName.charAt(1)),
          }
        })

      if (extractedHeadings.length === 0) {
        // Retry if headings found but no IDs (wait for ID assignment)
        if (retryCount < maxRetries) {
          retryCount++
          timeoutId = setTimeout(initialize, 200 * retryCount)
        }
        return
      }

      // Reset retry count on success
      retryCount = 0

      setHeadings(extractedHeadings)

      // Set up intersection observer
      const observerOptions = {
        rootMargin: '-120px 0% -60% 0%',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      }

      let visibleHeadings: { id: string; ratio: number }[] = []

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          const existingIndex = visibleHeadings.findIndex((h) => h.id === id)

          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            if (existingIndex >= 0) {
              visibleHeadings[existingIndex].ratio = entry.intersectionRatio
            } else {
              visibleHeadings.push({ id, ratio: entry.intersectionRatio })
            }
          } else {
            visibleHeadings = visibleHeadings.filter((h) => h.id !== id)
          }

          // Find the heading with the highest intersection ratio
          if (visibleHeadings.length > 0) {
            const mostVisible = visibleHeadings.reduce((prev, current) =>
              prev.ratio > current.ratio ? prev : current
            )
            setActiveId(mostVisible.id)
          }
        })
      }, observerOptions)

      headingElements.forEach((el) => observer?.observe(el))
    }

    // Start initialization with multiple attempts
    const initTimeout = setTimeout(initialize, 50)
    
    // Also use MutationObserver to detect when content is added
    const container = document.querySelector('.docs-container')
    if (container) {
      containerObserver = new MutationObserver(() => {
        retryCount = 0 // Reset retry count when content changes
        initialize()
      })
      containerObserver.observe(container, {
        childList: true,
        subtree: true,
      })
    }

    // Handle hash changes on page load
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            scrollToElement(element)
          }
        }, 100)
      }
    }

    // Check for hash on mount
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      clearTimeout(initTimeout)
      if (timeoutId) clearTimeout(timeoutId)
      if (observer) {
        // Clean up observer
        const elements = document.querySelectorAll('.docs-container h2, .docs-container h3')
        elements.forEach((el) => observer?.unobserve(el))
      }
      if (containerObserver) {
        containerObserver.disconnect()
      }
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [scrollToElement])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        scrollToElement(element)
      }
    },
    [scrollToElement]
  )

  if (headings.length === 0) {
    return null
  }

  return (
    <aside
      className="docs-on-this-page"
      aria-label="On this page"
      role="complementary"
    >
      <div className="docs-on-this-page-header">
        <span>On this page</span>
      </div>
      <nav className="docs-on-this-page-nav">
        <ul>
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            return (
              <li
                key={heading.id}
                style={{
                  paddingLeft: heading.level === 3 ? '1rem' : '0',
                  fontSize: heading.level === 3 ? '0.875rem' : '0.9375rem',
                }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={isActive ? 'active' : ''}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
