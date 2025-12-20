'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DocsNav() {
  const pathname = usePathname()

  const sections = [
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
        { href: '/docs/how-ai-explores', label: 'How AI Explores Your App (Explained Simply)' },
        { href: '/docs/pre-ship-confidence', label: 'What "Pre-Ship Confidence" Actually Means' },
        { href: '/docs/human-in-the-loop', label: 'Human-in-the-Loop Testing Explained' },
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

  const isActive = (href: string) => pathname === href

  return (
    <nav>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            padding: '0 1.5rem',
            marginBottom: '0.75rem',
          }}>
            {section.title}
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {section.items.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '0.625rem 1.5rem',
                      color: active ? 'var(--primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease',
                      background: active ? 'rgba(92, 15, 15, 0.08)' : 'transparent',
                      borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                      fontWeight: active ? 500 : 400,
                    }}
                    className="docs-nav-link"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

