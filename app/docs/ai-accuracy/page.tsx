import type { Metadata } from 'next'
import AIAccuracyContent from '@/content/docs/ai-accuracy'

export const metadata: Metadata = {
  title: 'How Accurate Are AI Test Results? | Rihario Docs',
  description: 'AI test results are probabilistic, not deterministic. Learn about accuracy, false positives, limitations, and how to interpret AI test results correctly.',
}

export default function AIAccuracy() {
  return <AIAccuracyContent />
}
