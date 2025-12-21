import type { Metadata } from 'next'
import UnderstandingFirstResultContent from '@/content/docs/understanding-first-result'

export const metadata: Metadata = {
  title: 'Understanding Your First Test Result | Rihario Docs',
  description: 'Learn how to read Rihario test results: status, step log, issues, evidence, and what everything means.',
}

export default function UnderstandingFirstResult() {
  return <UnderstandingFirstResultContent />
}
