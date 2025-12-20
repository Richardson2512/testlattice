import type { Metadata } from 'next'
import DataStorageContent from '@/content/docs/data-storage'

export const metadata: Metadata = {
  title: 'What Data Is Stored and What Is Not | Rihario Docs',
  description: 'Learn what data Rihario stores from your explorations: screenshots, logs, test results. Understand what is NOT stored: credentials, sensitive form data, personal information.',
}

export default function DataStorage() {
  return <DataStorageContent />
}
