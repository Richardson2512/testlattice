import type { Metadata } from 'next'
import EvidenceCollectionContent from '@/content/docs/evidence-collection'

export const metadata: Metadata = {
  title: 'How Evidence Is Collected (Screenshots, Logs, DOM) | Rihario Docs',
  description: 'Learn how Rihario collects evidence: screenshots, console logs, network logs, and DOM snapshots. Understand what evidence is captured and when.',
}

export default function EvidenceCollection() {
  return <EvidenceCollectionContent />
}
