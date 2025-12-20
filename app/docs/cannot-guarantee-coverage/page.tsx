import type { Metadata } from 'next'
import CannotGuaranteeCoverageContent from '@/content/docs/cannot-guarantee-coverage'

export const metadata: Metadata = {
  title: 'Why This Tool Cannot Guarantee 100% Coverage | Rihario Docs',
  description: 'Rihario cannot guarantee 100% test coverage because AI exploration is probabilistic, not exhaustive. Learn why coverage guarantees aren\'t possible and what to expect instead.',
}

export default function CannotGuaranteeCoverage() {
  return <CannotGuaranteeCoverageContent />
}
