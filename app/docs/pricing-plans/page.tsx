import type { Metadata } from 'next'
import PricingPlansContent from '@/content/docs/pricing-plans'

export const metadata: Metadata = {
  title: 'Plans and Usage Limits Explained Simply | Rihario Docs',
  description: 'Learn about Rihario pricing plans: Free, Starter, Indie, and Pro. Understand usage limits, features, and what each tier includes.',
}

export default function PricingPlans() {
  return <PricingPlansContent />
}
