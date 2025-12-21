import type { Metadata } from 'next'
import PreTestDiagnosisContent from '@/content/docs/pre-test-diagnosis'

export const metadata: Metadata = {
  title: 'Pre-Test Diagnosis: What Can and Can\'t Be Tested | Rihario Docs',
  description: 'Before exploration starts, Rihario performs diagnosis to understand what can be tested and what might block testing. Learn what gets diagnosed and why.',
}

export default function PreTestDiagnosis() {
  return <PreTestDiagnosisContent />
}
