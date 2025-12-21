import type { Metadata } from 'next'
import ReadingTestLogsContent from '@/content/docs/reading-test-logs'

export const metadata: Metadata = {
  title: 'How to Read Test Logs Step by Step | Rihario Docs',
  description: 'Learn how to read Rihario test logs: step-by-step actions, timestamps, screenshots, evidence, and understanding what the AI did.',
}

export default function ReadingTestLogs() {
  return <ReadingTestLogsContent />
}
