'use client'

import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return

    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Check initial scroll position
    toggleVisibility()

    // Listen for scroll events
    window.addEventListener('scroll', toggleVisibility, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-to-top"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  )
}

