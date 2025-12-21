import type { Metadata } from 'next'
import TestNavigationContent from '@/content/docs/test-navigation'

export const metadata: Metadata = {
  title: 'How to Test Navigation and Broken Links | Rihario Docs',
  description: 'Test navigation menus and detect broken links automatically with AI. No need to manually check every link - the AI explores navigation and flags broken links.',
}

export default function TestNavigation() {
  return <TestNavigationContent />
}
