import type { Metadata } from 'next'
import ModelLimitsAndGuaranteesContent from '@/content/docs/model-limits-and-guarantees'

export const metadata: Metadata = {
  title: 'Model Limits & Guarantees | Rihario Docs',
  description: 'Explicit information about how AI models are used in Rihario, what guarantees exist, retry policies, token budgets, and what happens when things fail.',
}

export default function ModelLimitsAndGuarantees() {
  return <ModelLimitsAndGuaranteesContent />
}

