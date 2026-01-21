import type { Metadata } from 'next'
import HittingLimitsContent from '@/content/docs/hitting-limits'

export const metadata: Metadata = {
  title: 'What Happens When You Hit a Limit | Rihario Docs',
  description: 'Learn what happens when you hit your test or visual test limits in Rihario. Upgrade prompts, limit warnings, and how to continue testing.',
}

export default function HittingLimits() {
  return <HittingLimitsContent />
}
