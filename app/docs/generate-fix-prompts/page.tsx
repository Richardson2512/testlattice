import type { Metadata } from 'next'
import GenerateFixPromptsContent from '@/content/docs/generate-fix-prompts'

export const metadata: Metadata = {
  title: 'How to Generate Fix Prompts from Test Results | Rihario Docs',
  description: 'Generate fix prompts from Rihario results to use with Cursor, ChatGPT, or Copilot. Learn how to create effective prompts that help AI assistants fix issues.',
}

export default function GenerateFixPrompts() {
  return <GenerateFixPromptsContent />
}
