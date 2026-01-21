import type { Metadata } from 'next'
import FAQAIVsManualContent from '@/content/docs/faq-ai-vs-manual'

export const metadata: Metadata = {
  title: 'Is AI Testing Better Than Manual Testing? | Rihario Docs',
  description: 'AI testing and manual testing serve different purposes. AI testing is faster and finds obvious issues, while manual testing catches edge cases and requires human judgment. Use both.',
}

export default function FAQAIVsManual() {
  return <FAQAIVsManualContent />
}
