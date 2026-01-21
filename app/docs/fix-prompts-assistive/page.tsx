import type { Metadata } from 'next'
import FixPromptsAssistiveContent from '@/content/docs/fix-prompts-assistive'

export const metadata: Metadata = {
  title: 'Why Fix Prompts Are Assistive, Not Auto-Fixes | Rihario Docs',
  description: 'Fix prompts from Rihario help you use AI coding assistants, but they don\'t automatically fix issues. Learn why manual review and testing are essential.',
}

export default function FixPromptsAssistive() {
  return <FixPromptsAssistiveContent />
}
