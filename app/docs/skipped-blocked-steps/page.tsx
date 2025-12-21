import type { Metadata } from 'next'
import SkippedBlockedStepsContent from '@/content/docs/skipped-blocked-steps'

export const metadata: Metadata = {
  title: 'Why Some Steps Are Skipped or Blocked | Rihario Docs',
  description: 'Learn why Rihario marks steps as SKIPPED or BLOCKED. Understand when exploration stops early and how to handle blockers.',
}

export default function SkippedBlockedSteps() {
  return <SkippedBlockedStepsContent />
}
