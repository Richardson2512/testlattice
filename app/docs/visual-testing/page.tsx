import type { Metadata } from 'next'
import VisualTestingContent from '@/content/docs/visual-testing'

export const metadata: Metadata = {
  title: 'How to Do Visual Testing with AI | Rihario Docs',
  description: 'Use AI-powered visual testing to detect broken layouts, visual regressions, and UI issues automatically. No need to write visual test scripts.',
}

export default function VisualTesting() {
  return <VisualTestingContent />
}
