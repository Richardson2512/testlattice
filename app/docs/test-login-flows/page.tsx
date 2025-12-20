import type { Metadata } from 'next'
import TestLoginFlowsContent from '@/content/docs/test-login-flows'

export const metadata: Metadata = {
  title: 'How to Test Login Flows Automatically | Rihario Docs',
  description: 'Test login flows automatically with AI. Learn how to handle authentication, test login forms, and verify authentication states.',
}

export default function TestLoginFlows() {
  return <TestLoginFlowsContent />
}
