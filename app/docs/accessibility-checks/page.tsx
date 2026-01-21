import type { Metadata } from 'next'
import AccessibilityChecksContent from '@/content/docs/accessibility-checks'

export const metadata: Metadata = {
  title: 'AI Accessibility Checks (What It Finds and What It Doesn\'t) | Rihario Docs',
  description: 'Learn what accessibility issues Rihario can detect automatically and what it cannot. Understand AI accessibility testing limitations and capabilities.',
}

export default function AccessibilityChecks() {
  return <AccessibilityChecksContent />
}
