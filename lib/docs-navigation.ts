/**
 * Shared docs navigation data for sitemap and DocsNav component
 * Single source of truth for all documentation page links
 */

export interface DocsNavItem {
    href: string
    label: string
}

export interface DocsNavSection {
    title: string
    items: DocsNavItem[]
}

export const docsNavSections: DocsNavSection[] = [
    {
        title: 'Getting Started',
        items: [
            { href: '/docs/what-is-vibe-testing', label: 'What Is Vibe Testing?' },
            { href: '/docs/who-is-this-for', label: 'Who Is This Tool For?' },
            { href: '/docs/different-from-traditional-testing', label: 'How This Is Different From Traditional Testing Tools' },
            { href: '/docs/run-first-test', label: 'Run Your First Test (No Signup)' },
            { href: '/docs/understanding-first-result', label: 'Understanding Your First Test Result' },
        ]
    },
    {
        title: 'Core Concepts',
        items: [
            { href: '/docs/what-is-a-test', label: 'What Is a Test in This Platform?' },
            { href: '/docs/what-is-ai-testing', label: 'What Is AI Testing?' },
            { href: '/docs/what-is-self-healing', label: 'What Is Self-Healing Testing?' },
            { href: '/docs/what-is-exploratory-testing', label: 'What Is Exploratory Testing?' },
            { href: '/docs/what-is-vibe-coding', label: 'What Is Vibe Coding?' },
            { href: '/docs/how-ai-explores', label: 'How AI Explores Your App (Explained Simply)' },
            { href: '/docs/pre-ship-confidence', label: 'What "Pre-Ship Confidence" Actually Means' },
            { href: '/docs/human-in-the-loop', label: 'Human-in-the-Loop Testing Explained' },
            { href: '/docs/quality-standards', label: 'Quality & Health Standards' },
            { href: '/docs/not-replacement-playwright', label: 'Why This Tool Is Not a Replacement for Playwright or Selenium' },
        ]
    },
    {
        title: 'Exploration Modes',
        items: [
            { href: '/docs/visual-testing', label: 'How to Do Visual Testing with AI' },
            { href: '/docs/test-login-flows', label: 'How to Test Login Flows Automatically' },
            { href: '/docs/test-signup-forms', label: 'How to Test Sign-Up Forms Without Writing Tests' },
            { href: '/docs/test-navigation', label: 'How to Test Navigation and Broken Links' },
            { href: '/docs/test-forms', label: 'How to Test Forms and User Inputs' },
            { href: '/docs/accessibility-checks', label: 'AI Accessibility Checks (What It Finds and What It Doesn\'t)' },
        ]
    },
    {
        title: 'How Tests Actually Work',
        items: [
            { href: '/docs/what-happens-test-starts', label: 'What Happens When a Test Starts?' },
            { href: '/docs/pre-test-diagnosis', label: 'Pre-Test Diagnosis: What Can and Can\'t Be Tested' },
            { href: '/docs/cookie-banners', label: 'How Cookie Banners Are Handled' },
            { href: '/docs/skipped-blocked-steps', label: 'Why Some Steps Are Skipped or Blocked' },
            { href: '/docs/infinite-loops', label: 'How Infinite Loops Are Prevented' },
        ]
    },
    {
        title: 'Understanding Results',
        items: [
            { href: '/docs/reading-test-logs', label: 'How to Read Test Logs Step by Step' },
            { href: '/docs/failed-vs-blocked', label: 'What FAILED vs BLOCKED vs SKIPPED Means' },
            { href: '/docs/error-types', label: 'Console Errors vs Network Errors vs UI Issues' },
            { href: '/docs/evidence-collection', label: 'How Evidence Is Collected (Screenshots, Logs, DOM)' },
            { href: '/docs/ai-accuracy', label: 'How Accurate Are AI Test Results?' },
        ]
    },
    {
        title: 'Fixing Issues',
        items: [
            { href: '/docs/generate-fix-prompts', label: 'How to Generate Fix Prompts from Test Results' },
            { href: '/docs/using-fix-prompts', label: 'Using Fix Prompts with Cursor, ChatGPT, or Copilot' },
            { href: '/docs/fix-prompts-assistive', label: 'Why Fix Prompts Are Assistive, Not Auto-Fixes' },
            { href: '/docs/choosing-ai-model', label: 'Choosing an AI Model for Fix Prompts (Advanced)' },
        ]
    },
    {
        title: 'Security, Privacy & Limits',
        items: [
            { href: '/docs/credentials-handling', label: 'How Credentials Are Handled Safely' },
            { href: '/docs/data-storage', label: 'What Data Is Stored and What Is Not' },
            { href: '/docs/browser-limitations', label: 'Browser & Device Limitations' },
            { href: '/docs/captcha-mfa-limits', label: 'CAPTCHA, MFA, and Verification Limits' },
            { href: '/docs/cannot-guarantee-coverage', label: 'Why This Tool Cannot Guarantee 100% Coverage' },
            { href: '/docs/model-limits-and-guarantees', label: 'Model Limits & Guarantees' },
        ]
    },
    {
        title: 'Pricing & Usage',
        items: [
            { href: '/docs/pricing-plans', label: 'Plans and Usage Limits Explained Simply' },
            { href: '/docs/hitting-limits', label: 'What Happens When You Hit a Limit' },
            { href: '/docs/upgrading-downgrading', label: 'Upgrading, Downgrading, and Add-Ons' },
        ]
    },
    {
        title: 'Resources',
        items: [
            { href: '/docs/rage-bait-test', label: 'Rage Bait Test: Stress-Test Your Forms' },
            { href: '/docs/behavior-analysis', label: 'Behavior Analysis Testing' },
        ]
    },
    {
        title: 'FAQ',
        items: [
            { href: '/docs/faq-ai-vs-manual', label: 'Is AI Testing Better Than Manual Testing?' },
            { href: '/docs/faq-replace-qa', label: 'Can AI Replace QA Engineers?' },
            { href: '/docs/faq-cicd', label: 'Can I Use This Tool in CI/CD Pipelines?' },
            { href: '/docs/faq-test-stopped', label: 'Why Did My Test Stop Early?' },
            { href: '/docs/faq-missed-issue', label: 'Why Did the AI Miss an Issue?' },
            { href: '/docs/faq-worth-it', label: 'Is This Tool Worth It for Solo Developers?' },
        ]
    },
]

/**
 * Get all docs URLs for sitemap generation
 */
export function getAllDocsUrls(): string[] {
    return docsNavSections.flatMap(section => section.items.map(item => item.href))
}
