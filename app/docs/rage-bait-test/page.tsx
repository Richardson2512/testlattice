import type { Metadata } from 'next'
import RageBaitTestContent from '@/content/docs/rage-bait-test'

export const metadata: Metadata = {
    title: 'Rage Bait Test: Stress-Test Your Forms | Rihario Docs',
    description: 'Learn how Rage Bait testing deliberately breaks your forms in 5 ways to catch edge cases before users do. Covers back button, session timeout, Enter key, special characters, and input overflow.',
}

export default function RageBaitTest() {
    return <RageBaitTestContent />
}
