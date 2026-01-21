import type { Metadata } from 'next'
import FAQCICDContent from '@/content/docs/faq-cicd'

export const metadata: Metadata = {
  title: 'Can I Use This Tool in CI/CD Pipelines? | Rihario Docs',
  description: 'Rihario is not designed for CI/CD pipelines. It\'s optimized for manual pre-deployment checks, not automated gate conditions. Use Playwright or Selenium for CI/CD.',
}

export default function FAQCICD() {
  return <FAQCICDContent />
}
