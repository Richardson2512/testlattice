import type { Metadata } from 'next'
import ChoosingAIModelContent from '@/content/docs/choosing-ai-model'

export const metadata: Metadata = {
  title: 'Choosing an AI Model for Fix Prompts (Advanced) | Rihario Docs',
  description: 'Learn how to choose the right AI model (GPT-4, Claude, etc.) for fix prompts based on code complexity, model capabilities, and your needs.',
}

export default function ChoosingAIModel() {
  return <ChoosingAIModelContent />
}
