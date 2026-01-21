import type { Metadata } from 'next'
import CredentialsHandlingContent from '@/content/docs/credentials-handling'

export const metadata: Metadata = {
  title: 'How Credentials Are Handled Safely | Rihario Docs',
  description: 'Learn how Rihario handles credentials safely. Credentials are never stored, transmitted securely, and only used for testing. Your credentials are safe.',
}

export default function CredentialsHandling() {
  return <CredentialsHandlingContent />
}
