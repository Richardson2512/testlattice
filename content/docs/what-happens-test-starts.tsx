export default function WhatHappensTestStartsContent() {
  return (
    <article>
      <h1>What Happens When a Test Starts?</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>When you start an exploration, Rihario launches a browser, loads your page, analyzes it with AI, then begins exploring.</strong> The process includes diagnosis, understanding page structure, planning exploration, and executing actions. Here's what happens step by step.
      </p>

      <h2>Phase 1: Initialization (0-5 seconds)</h2>

      <h3>1. Browser Launch</h3>

      <p>
        Rihario launches a fresh browser instance:
      </p>

      <ul>
        <li>Chrome, Firefox, or Safari (depending on your selection)</li>
        <li>Clean profile (no cookies, cache, or extensions)</li>
        <li>Desktop or mobile viewport (as specified)</li>
        <li>Network conditions configured</li>
      </ul>

      <h3>2. Page Load</h3>

      <p>
        The browser loads your URL:
      </p>

      <ul>
        <li>Navigates to the specified URL</li>
        <li>Waits for page to load (DOMContentLoaded)</li>
        <li>Waits for network idle (no pending requests)</li>
        <li>Captures initial screenshot</li>
      </ul>

      <h3>3. Pre-Test Diagnosis</h3>

      <p>
        Before exploring, the AI performs a quick diagnosis:
      </p>

      <ul>
        <li><strong>Analyzes page structure</strong> - Understands what's on the page</li>
        <li><strong>Identifies testable elements</strong> - Finds buttons, forms, links</li>
        <li><strong>Detects blockers</strong> - Checks for CAPTCHAs, cookie banners, auth prompts</li>
        <li><strong>Assesses complexity</strong> - Estimates how much exploration is needed</li>
      </ul>

      <p>
        See <a href="/docs/pre-test-diagnosis">Pre-Test Diagnosis</a> for details on this phase.
      </p>

      <h2>Phase 2: Understanding (5-15 seconds)</h2>

      <h3>1. Page Analysis</h3>

      <p>
        The AI deeply analyzes the page:
      </p>

      <ul>
        <li><strong>Computer vision</strong> - "Sees" what the page looks like</li>
        <li><strong>DOM analysis</strong> - Reads HTML structure</li>
        <li><strong>Element identification</strong> - Finds interactive elements</li>
        <li><strong>Context understanding</strong> - Determines page purpose and key elements</li>
      </ul>

      <h3>2. Exploration Planning</h3>

      <p>
        Based on analysis, the AI plans what to explore:
      </p>

      <ul>
        <li><strong>Prioritizes actions</strong> - Decides what's most important</li>
        <li><strong>Follows your instructions</strong> - If you provided guidance, focuses on that</li>
        <li><strong>Identifies flows</strong> - Recognizes common user flows (login, checkout, etc.)</li>
        <li><strong>Plans sequence</strong> - Determines order of actions</li>
      </ul>

      <h3>3. Safety Checks</h3>

      <p>
        Before proceeding, safety checks run:
      </p>

      <ul>
        <li><strong>Cookie banner detection</strong> - Checks if cookie consent is needed</li>
        <li><strong>CAPTCHA detection</strong> - Identifies CAPTCHAs that would block exploration</li>
        <li><strong>Auth prompt detection</strong> - Recognizes login prompts</li>
        <li><strong>Redirect loop detection</strong> - Checks for infinite redirects</li>
      </ul>

      <h2>Phase 3: Exploration (Ongoing)</h2>

      <h3>1. Action Execution</h3>

      <p>
        The AI begins executing actions:
      </p>

      <ul>
        <li><strong>Clicks buttons</strong> - Interacts with elements</li>
        <li><strong>Fills forms</strong> - Types in input fields</li>
        <li><strong>Navigates</strong> - Follows links to new pages</li>
        <li><strong>Waits</strong> - Waits for pages to load, animations to finish</li>
        <li><strong>Scrolls</strong> - Scrolls to see content below fold</li>
      </ul>

      <h3>2. Issue Detection</h3>

      <p>
        While exploring, the AI constantly watches for problems:
      </p>

      <ul>
        <li><strong>Visual issues</strong> - Broken layouts, overlapping elements</li>
        <li><strong>Console errors</strong> - JavaScript errors logged</li>
        <li><strong>Network errors</strong> - Failed requests, timeouts</li>
        <li><strong>Accessibility issues</strong> - Missing labels, contrast problems</li>
      </ul>

      <h3>3. Evidence Collection</h3>

      <p>
        When issues are found, evidence is captured:
      </p>

      <ul>
        <li><strong>Screenshots</strong> - Visual proof of problems</li>
        <li><strong>Console logs</strong> - JavaScript error logs</li>
        <li><strong>Network logs</strong> - Failed request details</li>
        <li><strong>DOM snapshots</strong> - HTML structure at time of issue</li>
      </ul>

      <h3>4. Adaptive Exploration</h3>

      <p>
        The AI adapts based on what it finds:
      </p>

      <ul>
        <li><strong>Adjusts strategy</strong> - Changes approach if initial plan doesn't work</li>
        <li><strong>Handles errors</strong> - Retries failed actions with different methods</li>
        <li><strong>Explores new paths</strong> - Discovers and follows new navigation options</li>
        <li><strong>Stops when stuck</strong> - Marks exploration as BLOCKED if it can't proceed</li>
      </ul>

      <h2>Phase 4: Completion</h2>

      <h3>1. Exploration Finishes</h3>

      <p>
        Exploration ends when:
      </p>

      <ul>
        <li><strong>Natural completion</strong> - AI finishes planned exploration</li>
        <li><strong>Time limit reached</strong> - Maximum exploration time exceeded</li>
        <li><strong>Blocked</strong> - Hit a CAPTCHA, MFA, or other blocker</li>
        <li><strong>Error</strong> - Fatal error occurred</li>
        <li><strong>Manual stop</strong> - You manually cancelled</li>
      </ul>

      <h3>2. Result Compilation</h3>

      <p>
        Final results are compiled:
      </p>

      <ul>
        <li><strong>Issues aggregated</strong> - All findings grouped by type</li>
        <li><strong>Steps logged</strong> - Full sequence of actions recorded</li>
        <li><strong>Evidence organized</strong> - Screenshots and logs attached to issues</li>
        <li><strong>Summary generated</strong> - Overview of what was explored and found</li>
      </ul>

      <h3>3. Results Displayed</h3>

      <p>
        You see the results:
      </p>

      <ul>
        <li><strong>Summary</strong> - Pages explored, issues found, duration</li>
        <li><strong>Step log</strong> - Every action taken</li>
        <li><strong>Issues list</strong> - Problems detected with evidence</li>
        <li><strong>Video replay</strong> - Watch the entire exploration</li>
      </ul>

      <h2>Timeline Example</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:00</strong> - Browser launched</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:02</strong> - Page loading</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:05</strong> - Page loaded, diagnosis starting</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:08</strong> - Diagnosis complete, analysis starting</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:12</strong> - Analysis complete, exploration starting</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:15</strong> - Clicked "Sign Up" button</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:18</strong> - Filled email field</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:20</strong> - Issue detected: Console error</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:25</strong> - Submitted form</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>0:30</strong> - Navigated to dashboard</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>1:15</strong> - Exploration complete</div>
          <div><strong>1:16</strong> - Results compiled and displayed</div>
        </div>
      </div>

      <h2>What You See During Execution</h2>

      <h3>Live View</h3>

      <p>
        While the exploration runs, you see:
      </p>

      <ul>
        <li><strong>Current action</strong> - What the AI is doing right now</li>
        <li><strong>Step counter</strong> - How many steps completed</li>
        <li><strong>Browser view</strong> - Screenshot of current page state</li>
        <li><strong>Issues detected</strong> - Problems found so far</li>
        <li><strong>Progress indicator</strong> - Estimated completion</li>
      </ul>

      <h3>You Can Intervene</h3>

      <p>
        At any time, you can:
      </p>

      <ul>
        <li><strong>Pause</strong> - Stop the exploration</li>
        <li><strong>Take Control</strong> - Manually interact, then resume</li>
        <li><strong>Provide Guidance</strong> - Give the AI new instructions</li>
        <li><strong>Cancel</strong> - Stop completely</li>
      </ul>

      <h2>Common Scenarios</h2>

      <h3>Scenario 1: Smooth Exploration</h3>

      <p>
        Everything works as expected:
      </p>

      <ol>
        <li>Page loads quickly</li>
        <li>AI finds interactive elements easily</li>
        <li>Exploration proceeds smoothly</li>
        <li>No blockers encountered</li>
        <li>Completes successfully</li>
      </ol>

      <h3>Scenario 2: Cookie Banner</h3>

      <p>
        Cookie banner appears:
      </p>

      <ol>
        <li>Page loads</li>
        <li>Cookie banner detected</li>
        <li>AI attempts to dismiss it</li>
        <li>If successful: continues exploring</li>
        <li>If fails: exploration marked as BLOCKED</li>
      </ol>

      <p>
        See <a href="/docs/cookie-banners">How Cookie Banners Are Handled</a> for details.
      </p>

      <h3>Scenario 3: CAPTCHA Block</h3>

      <p>
        CAPTCHA appears:
      </p>

      <ol>
        <li>Page loads</li>
        <li>CAPTCHA detected</li>
        <li>AI cannot proceed</li>
        <li>Exploration marked as BLOCKED</li>
        <li>You can take control to solve it manually</li>
      </ol>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/pre-test-diagnosis">Learn about pre-test diagnosis</a></li>
        <li><a href="/docs/cookie-banners">See how cookie banners are handled</a></li>
        <li><a href="/docs/skipped-blocked-steps">Understand skipped and blocked steps</a></li>
      </ul>
    </article>
  )
}

