import type { Metadata } from 'next'
import FAQTestStoppedContent from '@/content/docs/faq-test-stopped'

export const metadata: Metadata = {
  title: 'Why Did My Test Stop Early? | Rihario Docs',
  description: 'Rihario explorations can stop early for several reasons: hit a blocker (CAPTCHA, MFA), detected infinite loop, time limit reached, or manual cancellation. Learn what each means.',
}

export default function FAQTestStopped() {
  return <FAQTestStoppedContent />
}
