import type { Metadata } from 'next'
import TestSignupFormsContent from '@/content/docs/test-signup-forms'

export const metadata: Metadata = {
  title: 'How to Test Sign-Up Forms Without Writing Tests | Rihario Docs',
  description: 'Test sign-up forms automatically with AI. No scripts needed - the AI explores your signup flow and reports issues automatically.',
}

export default function TestSignupForms() {
  return <TestSignupFormsContent />
}
