import type { Metadata } from 'next'
import FailedVsBlockedContent from '@/content/docs/failed-vs-blocked'

export const metadata: Metadata = {
  title: 'What FAILED vs BLOCKED vs SKIPPED Means | Rihario Docs',
  description: 'Learn the difference between FAILED, BLOCKED, and SKIPPED statuses in Rihario. Understand what each means and how to interpret results.',
}

export default function FailedVsBlocked() {
  return <FailedVsBlockedContent />
}
