import type { Metadata } from 'next'
import HumanInTheLoopContent from '@/content/docs/human-in-the-loop'

export const metadata: Metadata = {
  title: 'Human-in-the-Loop Testing Explained | Rihario Docs',
  description: 'Human-in-the-loop testing means you can pause AI exploration, take control, guide the AI, or override decisions. It\'s like pair programming with an AI.',
}

export default function HumanInTheLoop() {
  return <HumanInTheLoopContent />
}
