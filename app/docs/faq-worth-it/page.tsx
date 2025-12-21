import type { Metadata } from 'next'
import FAQWorthItContent from '@/content/docs/faq-worth-it'

export const metadata: Metadata = {
  title: 'Is This Tool Worth It for Solo Developers? | Rihario Docs',
  description: 'Rihario is worth it for solo developers who ship fast and want quick confidence checks before deploying. It saves time finding obvious issues, but doesn\'t replace manual testing for critical flows.',
}

export default function FAQWorthIt() {
  return <FAQWorthItContent />
}
