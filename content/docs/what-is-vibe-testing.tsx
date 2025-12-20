import { TLDR, FitCard, Callout, Comparison, ComparisonRow, Insight, DocsHero, DefaultHeroVisual } from '@/components/docs'

export default function WhatIsVibeTestingContent() {
  return (
    <article>
      <DocsHero
        title="What Is Vibe Testing?"
        summary={
          <>
            <strong>Vibe testing is AI-powered exploratory testing that checks if your app feels broken before shipping.</strong> Instead of writing test scripts or maintaining test suites, you point an AI at your app, watch it explore, and get confidence that you're not shipping a mess. No code required. No test maintenance. Just quick confidence checks.
          </>
        }
        visual={<DefaultHeroVisual />}
      />

      <h2>How Vibe Testing Works</h2>
      
      <p>
        Traditional testing requires writing scripts, maintaining selectors, and dealing with flaky tests. Vibe testing is different:
      </p>

      <ol>
        <li><strong>You point the AI at your app</strong> - Give it a URL, optionally provide instructions like "check the checkout flow"</li>
        <li><strong>The AI explores live</strong> - Watch as it navigates your app, interacts with elements, and checks for issues in real-time</li>
        <li><strong>You see what it finds</strong> - Get a replay of what happened, issues detected, and evidence (screenshots, logs)</li>
        <li><strong>You decide what matters</strong> - Review findings and fix what's important, ignore false positives</li>
      </ol>

      <p>
        It's like having a curious, thorough user explore your app and report back - except the AI is consistent, doesn't get tired, and notices things humans might miss.
      </p>

      <h2>What Makes It "Vibe" Testing?</h2>

      <p>
        The "vibe" part comes from focusing on <strong>how the app feels</strong> rather than comprehensive test coverage. You're asking:
      </p>

      <ul>
        <li>"Does this feel broken?" not "Is every edge case covered?"</li>
        <li>"Are there obvious issues?" not "Do I have 100% test coverage?"</li>
        <li>"Can I ship with confidence?" not "Did all tests pass?"</li>
      </ul>

      <Insight>
        <p>
          <strong>It's optimized for pre-ship confidence, not exhaustive testing.</strong> Perfect for solo developers and indie builders who need quick checks, not enterprise QA processes.
        </p>
      </Insight>

      <h2>Who Should Use Vibe Testing?</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
        <FitCard type="good">
          <ul>
            <li>Build frontend-heavy apps solo or in small teams</li>
            <li>Want to quickly check if your app works before deploying</li>
            <li>Don't want to write or maintain test scripts</li>
            <li>Care more about "does it feel broken?" than "is every edge case covered?"</li>
            <li>Ship fast and iterate often</li>
          </ul>
        </FitCard>

        <FitCard type="bad">
          <ul>
            <li>Need guaranteed test coverage metrics</li>
            <li>Want to replace Playwright or Selenium</li>
            <li>Require CI/CD pipeline integration as a gate</li>
            <li>Need compliance or audit trails</li>
            <li>Want deterministic, scripted tests</li>
          </ul>
        </FitCard>
      </div>

      <h2>Vibe Testing vs Traditional Testing</h2>

      <Comparison columns={['Traditional Testing', 'Vibe Testing']}>
        <ComparisonRow cells={[
          'Setup',
          'Write scripts, define selectors',
          'Point at URL, optionally add instructions'
        ]} />
        <ComparisonRow cells={[
          'Maintenance',
          'Update scripts when app changes',
          'AI adapts automatically'
        ]} />
        <ComparisonRow cells={[
          'Results',
          'Pass/fail, deterministic',
          'Issues found, probabilistic'
        ]} />
        <ComparisonRow cells={[
          'Use Case',
          'CI/CD gates, coverage metrics',
          'Pre-ship confidence checks'
        ]} />
        <ComparisonRow cells={[
          'Target User',
          'QA engineers, automation teams',
          'Solo developers, indie builders'
        ]} />
      </Comparison>

      <h2>Real-World Example</h2>

      <p>
        Imagine you just updated your checkout flow. Instead of manually clicking through everything or writing a new test script, you:
      </p>

      <ol>
        <li>Start a vibe test on your staging URL</li>
        <li>Give it the instruction: "check the checkout flow"</li>
        <li>Watch the AI explore: add item to cart → go to checkout → fill form → complete purchase</li>
        <li>See it report: "Found 1 issue - payment form button is disabled after clicking submit"</li>
        <li>Review the screenshot and fix the issue</li>
        <li>Ship with confidence</li>
      </ol>

      <Callout type="success">
        <p>
          <strong>Total time: 5 minutes.</strong> No scripts written. No maintenance needed.
        </p>
      </Callout>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/who-is-this-for">Learn who this tool is for</a></li>
        <li><a href="/docs/run-first-test">Run your first test</a></li>
        <li><a href="/docs/different-from-traditional-testing">See how it differs from traditional testing</a></li>
      </ul>
    </article>
  )
}
