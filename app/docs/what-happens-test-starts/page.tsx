import type { Metadata } from 'next'
import WhatHappensTestStartsContent from '@/content/docs/what-happens-test-starts'

export const metadata: Metadata = {
  title: 'What Happens When a Test Starts? | Rihario Docs',
  description: 'Learn what happens when you start a Rihario exploration: browser initialization, page loading, AI analysis, and exploration phases.',
}

export default function WhatHappensTestStarts() {
  return <WhatHappensTestStartsContent />
}
