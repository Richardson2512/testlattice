export default function RunFirstTestContent() {
  return (
    <article>
      <h1>Run Your First Test (No Signup)</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>You can try Rihario immediately without creating an account.</strong> Run a guest test on any public website to see how AI-powered exploration works. No setup, no signup, no credit card - just point us at a URL and watch the AI explore.
      </p>

      <h2>Step 1: Find the "Try Now" Button</h2>

      <p>
        On the homepage, look for the "Try Now" or "Start Instant Test" button. It's prominently displayed in the hero section. Click it to open the guest test modal.
      </p>

      <h2>Step 2: Enter a URL</h2>

      <p>
        Enter any public website URL. Examples:
      </p>

      <ul>
        <li>Your own app (if it's publicly accessible)</li>
        <li>A demo site like <code>https://example.com</code></li>
        <li>Any website you want to check</li>
      </ul>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Important Notes:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>URL must be publicly accessible (no localhost)</li>
          <li>HTTPS required (no HTTP)</li>
          <li>Some sites may block automated browsing</li>
        </ul>
      </div>

      <h2>Step 3: Watch the AI Explore</h2>

      <p>
        Once you click "Start Exploration", you'll see:
      </p>

      <ol>
        <li><strong>Loading screen</strong> - AI is starting the browser session</li>
        <li><strong>Live exploration view</strong> - Watch as the AI navigates your app in real-time</li>
        <li><strong>Step-by-step log</strong> - See each action the AI takes</li>
        <li><strong>Issues detected</strong> - Problems found are highlighted as they're discovered</li>
      </ol>

      <p>
        The exploration typically takes 1-5 minutes for a single page, depending on complexity.
      </p>

      <h2>Step 4: Review the Results</h2>

      <p>
        When the exploration completes, you'll see:
      </p>

      <ul>
        <li><strong>Summary</strong> - Pages explored, issues found, duration</li>
        <li><strong>Step log</strong> - Every action the AI took, with screenshots</li>
        <li><strong>Issues list</strong> - Problems detected, grouped by type</li>
        <li><strong>Video replay</strong> - Watch the entire exploration</li>
      </ul>

      <p>
        Each issue shows:
      </p>

      <ul>
        <li>What the problem is</li>
        <li>Where it was found (which page/step)</li>
        <li>Evidence (screenshots, console logs)</li>
        <li>Severity (High, Medium, Low)</li>
      </ul>

      <h2>Guest Test Limitations</h2>

      <p>
        Guest tests have limitations to prevent abuse:
      </p>

      <ul>
        <li><strong>3 tests per month</strong> - IP-based limit</li>
        <li><strong>Chrome only</strong> - Can't test other browsers</li>
        <li><strong>Desktop only</strong> - No mobile viewport testing</li>
        <li><strong>No history</strong> - Results aren't saved after 7 days</li>
        <li><strong>No exports</strong> - Can't download reports or videos</li>
        <li><strong>No projects</strong> - Can't organize tests</li>
      </ul>

      <p>
        To remove these limits, <a href="/signup">sign up for a free account</a>.
      </p>

      <h2>What Happens Next?</h2>

      <h3>If You Like What You See</h3>

      <p>
        Sign up to get:
      </p>

      <ul>
        <li>More tests per month (even on free tier)</li>
        <li>Saved test history</li>
        <li>Project organization</li>
        <li>Multiple browser testing</li>
        <li>Export options</li>
      </ul>

      <p>
        <a href="/signup">Sign up now →</a>
      </p>

      <h3>If It's Not for You</h3>

      <p>
        That's fine. Different tools for different needs. Rihario is designed for quick confidence checks, not comprehensive test coverage. If you need deterministic, scripted tests, use Playwright or Cypress.
      </p>

      <h2>Common First-Time Questions</h2>

      <h3>"Why did my test stop early?"</h3>
      <p>
        Common reasons:
      </p>
      <ul>
        <li>Hit a CAPTCHA or MFA prompt (marked as BLOCKED)</li>
        <li>Infinite redirect loop detected</li>
        <li>Page took too long to load (timeout)</li>
        <li>Cookie banner that couldn't be dismissed</li>
      </ul>
      <p>
        See <a href="/docs/skipped-blocked-steps">Why Some Steps Are Skipped or Blocked</a> for details.
      </p>

      <h3>"I don't see any issues, but I know there are problems"</h3>
      <p>
        Rihario finds issues it notices during exploration. It's not exhaustive. If you know about specific problems, mention them in the instructions when you sign up and run more detailed tests.
      </p>

      <h3>"How long do tests take?"</h3>
      <p>
        Usually 1-5 minutes for a single page, 5-15 minutes for multi-page flows. Depends on page complexity, loading times, and how many pages the AI explores.
      </p>

      <h3>"Can I test my localhost app?"</h3>
      <p>
        No, guest tests require publicly accessible URLs. Once you sign up, you can test staging environments or use the <a href="/docs/credentials-handling">Take Control feature</a> to test authenticated pages.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/understanding-first-result">Learn how to read your test results</a></li>
        <li><a href="/signup">Sign up to remove limits</a></li>
        <li><a href="/docs/what-is-vibe-testing">Read more about vibe testing</a></li>
      </ul>
    </article>
  )
}

