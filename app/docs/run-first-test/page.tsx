import type { Metadata } from 'next'
import RunFirstTestContent from '@/content/docs/run-first-test'

export const metadata: Metadata = {
  title: 'Run Your First Test (No Signup) | Rihario Docs',
  description: 'Run your first vibe test in 5 minutes without signing up. See how AI-powered testing works with a simple example.',
}

export default function RunFirstTest() {
  return <RunFirstTestContent />
}
