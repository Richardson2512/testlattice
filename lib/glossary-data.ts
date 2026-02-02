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
    },
    {
        term: 'Rage Bait',
        slug: 'rage-bait',
        definition: 'A stress-testing method that deliberately triggers 8 specific edge cases (like double-clicks, session timeouts, and input overflow) to see if your forms break under pressure.',
        category: 'Features',
        relatedTerms: ['Monkey Testing', 'Functional Testing'],
        canonicalUrl: '/docs/rage-bait-test'
    },
    {
        term: 'Monkey Testing',
        slug: 'monkey-testing',
        definition: 'A chaos testing technique where random inputs (clicks, scrolls, keypresses) are thrown at your application to find crashes and stability issues.',
        category: 'Testing Types',
        relatedTerms: ['Rage Bait', 'Stress Testing']
    },
    {
        term: 'Trace',
        slug: 'trace',
        definition: 'A complete recording of every step in a test run, including console logs, network requests, screenshots, and DOM snapshots. Essential for debugging why a test failed.',
        category: 'Concepts',
        relatedTerms: ['DOM Snapshot', 'Evidence']
    },
    {
        term: 'DOM Snapshot',
        slug: 'dom-snapshot',
        definition: 'A capture of the entire HTML structure of your page at a specific moment in time. This allows AI to "see" your page code exactly as it was during the test.',
        category: 'Concepts',
        relatedTerms: ['Trace', 'AI Testing']
    },
    {
        term: 'Network Throttling',
        slug: 'network-throttling',
        definition: 'Simulating slow internet conditions (like 3G or offline mode) to test how your application handles loading states and network failures.',
        category: 'Features',
        relatedTerms: ['Rage Bait', 'Performance Testing']
    },
    {
        term: 'Testability Score',
        slug: 'testability-score',
        definition: 'A metric that rates how easy it is for AI (and humans) to test your app. Low scores usually mean you have missing accessibility labels, unstable selectors, or hidden elements.',
        category: 'Concepts',
        relatedTerms: ['Accessibility Checks', 'AI Testing']
    },
    {
        term: 'Smart Selector Learning',
        slug: 'smart-selector-learning',
        definition: 'A God Mode feature where the AI learns the best way to identify an element (e.g., ID vs. text vs. data-testid) based on your manual corrections, improving future test stability.',
        category: 'Features',
        relatedTerms: ['God Mode', 'Self-Healing Tests']
    }
];
