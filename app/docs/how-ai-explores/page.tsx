import type { Metadata } from 'next'
import HowAIExploresContent from '@/content/docs/how-ai-explores'

export const metadata: Metadata = {
  title: 'How AI Explores Your App (Explained Simply) | Rihario Docs',
  description: 'Learn how AI-powered exploration works: understanding pages, making decisions, detecting issues, and adapting to changes - all without scripts.',
}

export default function HowAIExplores() {
  return <HowAIExploresContent />
}
