export default function WhatIsATestContent() {
  return (
    <article>
      <h1>What Is a Test in This Platform?</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>In Rihario, a "test" is actually an AI-powered exploration, not a scripted test case.</strong> The AI explores your app, interacts with elements, and reports what it finds. There's no pass/fail - just findings, evidence, and your judgment.
      </p>

      <h2>Traditional Test vs Rihario Exploration</h2>

      <h3>Traditional Test (Playwright, Cypress, etc.)</h3>

      <div style={{
        background: '#1e1e1e',
        color: '#fff',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        marginBottom: '2rem',
      }}>
        <div style={{ color: '#4ec9b0' }}>// Traditional test script</div>
        <div style={{ marginTop: '0.5rem' }}>
          <div>test(<span style={{ color: '#ce9178' }}>'login works'</span>, async () =&gt; {'{'}</div>
          <div style={{ paddingLeft: '1rem' }}>await page.goto(<span style={{ color: '#ce9178' }}>'/login'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await page.fill(<span style={{ color: '#ce9178' }}>'#email'</span>, <span style={{ color: '#ce9178' }}>'user@example.com'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await page.fill(<span style={{ color: '#ce9178' }}>'#password'</span>, <span style={{ color: '#ce9178' }}>'password123'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await page.click(<span style={{ color: '#ce9178' }}>'#submit'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await expect(page.locator(<span style={{ color: '#ce9178' }}>'#dashboard'</span>)).toBeVisible()</div>
          <div style={{ paddingLeft: '1rem', color: '#4ec9b0' }}>// Result: PASS or FAIL</div>
          <div>{'}'})</div>
        </div>
      </div>

      <p>
        <strong>Result:</strong> PASS or FAIL. Deterministic. Same input always produces same output.
      </p>

      <h3>Rihario Exploration</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Rihario exploration:</div>
        <div style={{ color: 'var(--text-secondary)' }}>
          <div><strong>URL:</strong> https://app.com/login</div>
          <div><strong>Instructions:</strong> "check if login works"</div>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            → AI explores the page
            → Finds email field (automatically)
            → Types test email
            → Finds password field
            → Types test password
            → Clicks submit button
            → Observes what happens
            → Reports findings
          </div>
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)' }}>
            <strong>Result:</strong> "Explored login page. Form submitted successfully. Redirected to dashboard. No issues found."
          </div>
        </div>
      </div>

      <p>
        <strong>Result:</strong> Findings report. Probabilistic. Same input produces similar results, but not identical.
      </p>

      <h2>Key Differences</h2>

      <h3>1. No Pass/Fail Status</h3>

      <p>
        Rihario doesn't say "PASS" or "FAIL". Instead, it says:
      </p>

      <ul>
        <li>"I explored 5 pages and found 2 issues"</li>
        <li>"Everything looks good - no problems detected"</li>
        <li>"Hit a blocker - couldn't proceed past CAPTCHA"</li>
      </ul>

      <p>
        <strong>You decide</strong> what matters. The AI reports findings, you interpret them.
      </p>

      <h3>2. No Scripts or Assertions</h3>

      <p>
        Traditional tests require you to write:
      </p>

      <ul>
        <li>Scripts defining exact steps</li>
        <li>Assertions checking specific conditions</li>
        <li>Selectors targeting exact elements</li>
      </ul>

      <p>
        Rihario doesn't use scripts. You provide:
      </p>

      <ul>
        <li>A URL to explore</li>
        <li>Optional instructions in plain English</li>
        <li>That's it</li>
      </ul>

      <h3>3. AI Decides What to Do</h3>

      <p>
        The AI analyzes the page and decides:
      </p>

      <ul>
        <li>What elements are interactive</li>
        <li>What looks important vs decorative</li>
        <li>What to click, type, or check</li>
        <li>When something looks wrong</li>
      </ul>

      <p>
        You're not dictating actions - you're setting a goal and letting the AI figure out how to achieve it.
      </p>

      <h3>4. Adapts to Changes</h3>

      <p>
        If your app changes (new button text, different layout, updated selectors), the AI adapts automatically. Traditional tests break and need updates. Rihario explorations continue working.
      </p>

      <h3>5. Probabilistic, Not Deterministic</h3>

      <p>
        Run the same exploration twice:
      </p>

      <ul>
        <li><strong>Traditional test:</strong> Exact same steps, exact same result every time</li>
        <li><strong>Rihario:</strong> Similar steps, similar findings, but not identical</li>
      </ul>

      <p>
        The AI might explore in slightly different orders, take different paths, or notice different things. This is by design - it's exploring, not executing a script.
      </p>

      <h2>What Actually Happens During a "Test"</h2>

      <ol>
        <li><strong>You start an exploration</strong> - Provide URL and optional instructions</li>
        <li><strong>AI analyzes the page</strong> - Understands structure, finds interactive elements</li>
        <li><strong>AI explores</strong> - Clicks, types, navigates based on what it finds</li>
        <li><strong>AI detects issues</strong> - Notices errors, broken layouts, problems</li>
        <li><strong>AI collects evidence</strong> - Screenshots, logs, DOM snapshots</li>
        <li><strong>You see results</strong> - Findings report with evidence</li>
        <li><strong>You decide</strong> - Fix issues, ignore false positives, or explore more</li>
      </ol>

      <h2>Terminology We Use</h2>

      <p>
        Even though we call them "tests" for simplicity, here's what we really mean:
      </p>

      <ul>
        <li><strong>"Test"</strong> = Exploration session</li>
        <li><strong>"Test Run"</strong> = Single exploration execution</li>
        <li><strong>"Step"</strong> = Individual action the AI took</li>
        <li><strong>"Issue"</strong> = Problem the AI detected</li>
        <li><strong>"Finding"</strong> = Something the AI noticed (might be an issue, might not)</li>
        <li><strong>"Evidence"</strong> = Screenshots, logs, DOM snapshots supporting a finding</li>
      </ul>

      <h2>Why This Matters</h2>

      <p>
        Understanding that Rihario uses explorations, not scripted tests, helps set proper expectations:
      </p>

      <ul>
        <li><strong>You won't get guaranteed coverage</strong> - The AI explores what it finds, not every possible scenario</li>
        <li><strong>Results require human judgment</strong> - Not everything the AI flags is a real problem</li>
        <li><strong>It's probabilistic</strong> - Same exploration might produce slightly different results</li>
        <li><strong>It's exploratory</strong> - Focused on finding issues, not verifying specific behaviors</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/how-ai-explores">Learn how AI explores your app</a></li>
        <li><a href="/docs/what-happens-test-starts">See what happens when a test starts</a></li>
        <li><a href="/docs/understanding-first-result">Understand test results</a></li>
      </ul>
    </article>
  )
}

