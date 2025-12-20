import type { Metadata } from 'next'
import PreShipConfidenceContent from '@/content/docs/pre-ship-confidence'

export const metadata: Metadata = {
  title: 'What "Pre-Ship Confidence" Actually Means | Rihario Docs',
  description: 'Pre-ship confidence means knowing your app doesn\'t have obvious problems before deploying. It\'s about catching embarrassing bugs, not achieving perfect coverage.',
}

export default function PreShipConfidence() {
  return <PreShipConfidenceContent />
}
