import type { Metadata } from 'next'
import DifferentFromTraditionalTestingContent from '@/content/docs/different-from-traditional-testing'

export const metadata: Metadata = {
  title: 'How This Is Different From Traditional Testing Tools | Rihario Docs',
  description: 'Rihario uses AI-powered exploratory testing instead of scripted test cases. Learn how it differs from Playwright, Selenium, and Cypress.',
}

export default function DifferentFromTraditionalTesting() {
  return <DifferentFromTraditionalTestingContent />
}
