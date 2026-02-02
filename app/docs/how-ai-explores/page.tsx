import type { Metadata } from 'next'
import HowAIExploresContent from '@/content/docs/how-ai-explores'

export const metadata: Metadata = {
  title: 'How AI Explores Your App (Explained Simply) | Rihario Docs',
  description: 'Learn how AI-powered exploration works: understanding pages, making decisions, detecting issues, and adapting to changes - all without scripts.',
}

export default function HowAIExplores() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How does Rihario find elements without CSS selectors?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Rihario uses computer vision and DOM semantics to "see" the page like a human. It identifies buttons by their appearance and label (e.g., a blue "Submit" button) rather than relying on brittle code selectors like #btn-submit.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is Smart Selector Learning?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Smart Selector Learning is a self-healing feature. If a test fails because a selector changed, Rihario analyzes the page to find the correct element (using text, ID, or attributes) and updates its memory for future runs.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does the AI act like a real user?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. The AI moves the mouse, clicks elements, types character-by-character, scrolls to find content, and waits for page loads, simulating natural human interaction patterns.'
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
      <HowAIExploresContent />
    </>
  )
}
