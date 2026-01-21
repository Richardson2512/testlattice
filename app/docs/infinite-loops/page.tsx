import type { Metadata } from 'next'
import InfiniteLoopsContent from '@/content/docs/infinite-loops'

export const metadata: Metadata = {
  title: 'How Infinite Loops Are Prevented | Rihario Docs',
  description: 'Rihario has safety guards to detect and prevent infinite loops during exploration. Learn how redirect loops, repeated actions, and stuck states are detected.',
}

export default function InfiniteLoops() {
  return <InfiniteLoopsContent />
}
