import type { Metadata } from 'next'
import TestFormsContent from '@/content/docs/test-forms'

export const metadata: Metadata = {
  title: 'How to Test Forms and User Inputs | Rihario Docs',
  description: 'Test forms automatically with AI - validation, submission, error handling. No scripts needed - the AI explores and tests all forms it finds.',
}

export default function TestForms() {
  return <TestFormsContent />
}
