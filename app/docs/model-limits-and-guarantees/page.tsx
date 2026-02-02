import type { Metadata } from 'next'
import ModelLimitsAndGuaranteesContent from '@/content/docs/model-limits-and-guarantees'

export const metadata: Metadata = {
  title: 'Model Limits & Guarantees | Rihario Docs',
  description: 'Explicit information about how AI models are used in Rihario, what guarantees exist, retry policies, token budgets, and what happens when things fail.',
}

export default function ModelLimitsAndGuarantees() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is the One-Model-Per-Test Guarantee?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Every test run uses exactly ONE reasoning model (GPT-5 Mini) from start to finish. There is no model switching or fallback, ensuring consistent behavior and predictable costs.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the AI usage limits for each tier?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Limits per test run: Guest (25 steps), Starter (35 steps), Indie (55 steps), Pro (75 steps), Agency (100 steps). Vision checks usually range from 1 to 10 depending on tier.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does Rihario retry failed AI calls?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Rihario uses a Same-Model Retry Envelope: if a transient error (like 429 or network timeout) occurs, it retries once with the exact same model and prompt after a 200-400ms delay.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelLimitsAndGuaranteesContent />
    </>
  )
}

