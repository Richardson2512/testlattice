import type { Metadata } from 'next'
import WhatIsATestContent from '@/content/docs/what-is-a-test'

export const metadata: Metadata = {
  title: 'What Is a Test in This Platform? | Rihario Docs',
  description: 'In Rihario, a "test" is actually an AI-powered exploration. Learn how tests work differently from traditional scripted tests.',
}

export default function WhatIsATest() {
  return <WhatIsATestContent />
}
