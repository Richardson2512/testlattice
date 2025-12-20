import type { Metadata } from 'next'
import NotReplacementPlaywrightContent from '@/content/docs/not-replacement-playwright'

export const metadata: Metadata = {
  title: 'Why This Tool Is Not a Replacement for Playwright or Selenium | Rihario Docs',
  description: 'Rihario uses AI-powered exploration, not scripted automation. Learn when to use Rihario vs Playwright, Selenium, or Cypress.',
}

export default function NotReplacementPlaywright() {
  return <NotReplacementPlaywrightContent />
}
