import type { Metadata } from 'next'
import FAQMissedIssueContent from '@/content/docs/faq-missed-issue'

export const metadata: Metadata = {
  title: 'Why Did the AI Miss an Issue? | Rihario Docs',
  description: 'AI testing can miss issues because it\'s probabilistic, focuses on obvious problems, may not explore certain paths, or the issue requires human judgment. This is normal and expected.',
}

export default function FAQMissedIssue() {
  return <FAQMissedIssueContent />
}
