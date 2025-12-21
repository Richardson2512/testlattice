import type { Metadata } from 'next'
import FAQReplaceQAContent from '@/content/docs/faq-replace-qa'

export const metadata: Metadata = {
  title: 'Can AI Replace QA Engineers? | Rihario Docs',
  description: 'AI testing tools cannot replace QA engineers. They solve different problems: AI finds obvious issues fast, QA engineers catch edge cases and require human judgment. Use AI to augment QA, not replace it.',
}

export default function FAQReplaceQA() {
  return <FAQReplaceQAContent />
}
