import type { Metadata } from 'next'
import UsingFixPromptsContent from '@/content/docs/using-fix-prompts'

export const metadata: Metadata = {
  title: 'Using Fix Prompts with Cursor, ChatGPT, or Copilot | Rihario Docs',
  description: 'Learn how to effectively use Rihario fix prompts with Cursor, ChatGPT, GitHub Copilot, and other AI coding assistants.',
}

export default function UsingFixPrompts() {
  return <UsingFixPromptsContent />
}
