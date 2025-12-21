import type { Metadata } from 'next'
import WhatIsVibeTestingContent from '@/content/docs/what-is-vibe-testing'

export const metadata: Metadata = {
  title: 'What Is Vibe Testing? | Rihario Docs',
  description: 'Vibe testing is AI-powered exploratory testing that checks if your app feels broken before shipping. No scripts needed - just confidence.',
}

export default function WhatIsVibeTesting() {
  return <WhatIsVibeTestingContent />
}
