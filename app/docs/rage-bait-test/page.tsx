import type { Metadata } from 'next'
import RageBaitTestContent from '@/content/docs/rage-bait-test'

export const metadata: Metadata = {
    title: 'Rage Bait Test: Stress-Test Your Forms | Rihario Docs',
    description: 'Learn how Rage Bait testing deliberately breaks your forms in 5 ways to catch edge cases before users do. Covers back button, session timeout, Enter key, special characters, and input overflow.',
}

export default function RageBaitTest() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': 'What is Rage Bait Testing?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Rage Bait testing is a stress-testing method that deliberately triggers 8 specific edge cases—like double-clicks, session timeouts, and input overflow—to see if your forms break under pressure.'
                }
            },
            {
                '@type': 'Question',
                'name': 'What specific tests does Rage Bait run?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Rage Bait runs 8 tests: 1. Back Button Spam, 2. Session Timeout, 3. Enter Key Submit, 4. Special Characters, 5. Input Overflow, 6. Double Submit, 7. Refresh Persistence, and 8. Network Throttling.'
                }
            },
            {
                '@type': 'Question',
                'name': 'What is the difference between Rage Bait and Monkey Testing?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Rage Bait is targeted, checking 8 specific edge cases that break forms. Monkey Testing is random chaos, clicking widely to find crashes. Rage Bait is better for forms and checkout flows.'
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
            <RageBaitTestContent />
        </>
    )
}
