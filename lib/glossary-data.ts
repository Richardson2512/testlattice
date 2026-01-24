export interface GlossaryTerm {
    term: string;
    slug: string;
    definition: string;
    category: string;
    relatedTerms: string[];
    canonicalUrl?: string; // Optional override if the canonical is external or specific docs page
}

export const glossaryTerms: GlossaryTerm[] = [
    {
        term: 'God Mode',
        slug: 'god-mode',
        definition: 'A real-time browser takeover feature that lets you manually intervene when AI gets stuck during testing.',
        category: 'Features',
        relatedTerms: ['Self-Healing Tests', 'AI Testing'],
        canonicalUrl: '/features/god-mode'
    },
    {
        term: 'Vibe Coding',
        slug: 'vibe-coding',
        definition: 'The practice of writing software primarily through natural language prompting and AI generation (Cursor, Replit), focusing on high-level intent and flow state rather than syntax.',
        category: 'Methodology',
        relatedTerms: ['Vibe Testing', 'AI-Native']
    },
    {
        term: 'Vibe Testing',
        slug: 'vibe-testing',
        definition: 'A testing methodology where you describe tests in plain English, and AI executes them.',
        category: 'Methodology',
        relatedTerms: ['Vibe Coding', 'No-Code Testing'],
        canonicalUrl: '/docs/what-is-vibe-testing'
    },
    {
        term: 'Vibe Coder',
        slug: 'vibe-coder',
        definition: 'A developer who prioritizes speed and flow ("the vibe") by using AI tools to handle implementation details. They focus on architecture and product, not boilerplate.',
        category: 'Persona',
        relatedTerms: ['Vibe Coding', 'Indie Hacker']
    },
    {
        term: 'Flow State Testing',
        slug: 'flow-state-testing',
        definition: 'Automated testing that happens in the background without requiring context switching. It ensures that "staying in the vibe" doesn’t lead to broken production code.',
        category: 'Methodology',
        relatedTerms: ['Vibe Testing', 'CI/CD']
    },
    {
        term: 'Self-Healing Tests',
        slug: 'self-healing-tests',
        definition: 'Tests that automatically adapt when your UI changes.',
        category: 'Features',
        relatedTerms: ['God Mode', 'AI Testing'],
        canonicalUrl: '/docs/what-is-self-healing'
    },
    {
        term: 'AI Testing',
        slug: 'ai-testing',
        definition: 'Automated software testing that uses artificial intelligence to generate, execute, and maintain tests without manual coding. Rihario uses LLMs like Llama and Qwen.',
        category: 'Concepts',
        relatedTerms: ['Vibe Testing', 'Self-Healing Tests'],
        canonicalUrl: '/docs/what-is-ai-testing'
    },
    {
        term: 'Visual Regression Testing',
        slug: 'visual-regression',
        definition: 'Comparing screenshots of your app across different browsers and devices to catch visual bugs like broken layouts, missing images, and text overflow.',
        category: 'Testing Types',
        relatedTerms: ['Cross-Browser Testing', 'Functional Testing']
    },
    {
        term: 'Functional Testing',
        slug: 'functional-testing',
        definition: 'Testing that verifies your application works correctly by interacting with buttons, forms, and navigation—ensuring users can complete their tasks.',
        category: 'Testing Types',
        relatedTerms: ['Visual Regression Testing', 'E2E Testing']
    },
    {
        term: 'E2E Testing',
        slug: 'e2e-testing',
        definition: 'End-to-End testing that simulates real user journeys through your entire application, from login to checkout, across multiple pages and interactions.',
        category: 'Testing Types',
        relatedTerms: ['Functional Testing', 'AI Testing']
    },
    {
        term: 'Core Web Vitals',
        slug: 'core-web-vitals',
        definition: 'Google\'s metrics for measuring user experience: LCP (loading), FID (interactivity), and CLS (visual stability). Rihario measures all three automatically.',
        category: 'Performance',
        relatedTerms: ['Performance Testing', 'SEO Testing']
    }
];
