import type { Metadata } from 'next'
import ErrorTypesContent from '@/content/docs/error-types'

export const metadata: Metadata = {
  title: 'Console Errors vs Network Errors vs UI Issues | Rihario Docs',
  description: 'Learn the difference between console errors, network errors, and UI issues in Rihario. Understand what each type means and how to fix them.',
}

export default function ErrorTypes() {
  return <ErrorTypesContent />
}
