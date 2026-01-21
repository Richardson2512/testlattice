export default function InfiniteLoopsContent() {
  return (
    <article>
      <h1>How Infinite Loops Are Prevented</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario detects infinite loops and prevents exploration from getting stuck.</strong> Safety guards monitor for redirect loops, repeated actions, and stuck states. When detected, exploration stops and reports the loop so you know what happened.
      </p>

      <h2>What Is an Infinite Loop?</h2>

      <p>
        An infinite loop in web testing means:
      </p>

      <ul>
        <li><strong>Redirect loop</strong> - Page A redirects to Page B, which redirects back to Page A</li>
        <li><strong>Repeated actions</strong> - Same action performed multiple times without progress</li>
        <li><strong>Stuck state</strong> - Exploration stuck on same page, clicking same elements repeatedly</li>
        <li><strong>Circular navigation</strong> - Navigating in circles without making progress</li>
      </ul>

      <h2>How Detection Works</h2>

      <h3>1. Page Visit Tracking</h3>

      <p>
        Rihario tracks which pages have been visited:
      </p>

      <ul>
        <li>Maintains a list of visited URLs</li>
        <li>Counts how many times each URL is visited</li>
        <li>Flags when same URL visited multiple times in short period</li>
      </ul>

      <h3>2. Action Pattern Detection</h3>

      <p>
        Monitors action patterns:
      </p>

      <ul>
        <li>Tracks sequence of actions</li>
        <li>Detects when same sequence repeats</li>
        <li>Flags repeated patterns as potential loops</li>
      </ul>

      <h3>3. Progress Monitoring</h3>

      <p>
        Checks if exploration is making progress:
      </p>

      <ul>
        <li>Monitors if new pages are being discovered</li>
        <li>Checks if new elements are being found</li>
        <li>Detects if exploration is stuck in same state</li>
      </ul>

      <h3>4. Redirect Loop Detection</h3>

      <p>
        Specifically monitors redirects:
      </p>

      <ul>
        <li>Tracks redirect chains</li>
        <li>Detects when redirects form a cycle</li>
        <li>Stops immediately when loop detected</li>
      </ul>

      <h2>Types of Loops Detected</h2>

      <h3>Redirect Loops</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Example:</strong></div>
          <div style={{ marginBottom: '0.5rem' }}>1. Visit /home → redirects to /login</div>
          <div style={{ marginBottom: '0.5rem' }}>2. Visit /login → redirects to /home</div>
          <div style={{ marginBottom: '0.5rem' }}>3. Visit /home → redirects to /login</div>
          <div style={{ marginBottom: '0.5rem' }}>4. <strong>LOOP DETECTED</strong> - Stops exploration</div>
        </div>
      </div>

      <h3>Action Loops</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Example:</strong></div>
          <div style={{ marginBottom: '0.5rem' }}>1. Click "Next" button</div>
          <div style={{ marginBottom: '0.5rem' }}>2. Page reloads, back to same state</div>
          <div style={{ marginBottom: '0.5rem' }}>3. Click "Next" button again</div>
          <div style={{ marginBottom: '0.5rem' }}>4. Repeats 5+ times</div>
          <div style={{ marginBottom: '0.5rem' }}>5. <strong>LOOP DETECTED</strong> - Action skipped</div>
        </div>
      </div>

      <h3>Navigation Loops</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Example:</strong></div>
          <div style={{ marginBottom: '0.5rem' }}>1. Homepage → Products → Cart → Checkout</div>
          <div style={{ marginBottom: '0.5rem' }}>2. Checkout redirects to Cart</div>
          <div style={{ marginBottom: '0.5rem' }}>3. Cart → Checkout → Cart → Checkout</div>
          <div style={{ marginBottom: '0.5rem' }}>4. <strong>LOOP DETECTED</strong> - Stops exploration</div>
        </div>
      </div>

      <h2>What Happens When a Loop Is Detected</h2>

      <h3>Immediate Stop</h3>

      <p>
        When a loop is detected:
      </p>

      <ol>
        <li>Exploration stops immediately</li>
        <li>Loop is reported in results</li>
        <li>Status shows what type of loop was detected</li>
        <li>You can see where the loop occurred</li>
      </ol>

      <h3>Loop Reporting</h3>

      <p>
        Results show:
      </p>

      <ul>
        <li><strong>Loop type</strong> - Redirect loop, action loop, navigation loop</li>
        <li><strong>Where it occurred</strong> - Which step or page</li>
        <li><strong>Pattern</strong> - What was repeating</li>
        <li><strong>Evidence</strong> - Screenshots and logs showing the loop</li>
      </ul>

      <h3>Example Loop Report</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--error)' }}>⚠️ Infinite Loop Detected</div>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Type:</strong> Redirect Loop</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Detected at:</strong> Step 12</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Pattern:</strong></div>
          <div style={{ paddingLeft: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            /home → /login → /home → /login (repeated 5 times)
          </div>
          <div style={{ marginTop: '0.5rem' }}><strong>Action:</strong> Exploration stopped to prevent infinite loop.</div>
        </div>
      </div>

      <h2>Thresholds</h2>

      <p>
        Loops are detected based on thresholds:
      </p>

      <ul>
        <li><strong>Same URL visited 5+ times</strong> - Potential redirect loop</li>
        <li><strong>Same action repeated 5+ times</strong> - Potential action loop</li>
        <li><strong>No new pages in 10 steps</strong> - Potential navigation loop</li>
        <li><strong>Redirect chain &gt; 10 redirects</strong> - Potential redirect loop</li>
      </ul>

      <p>
        These thresholds balance catching loops while allowing legitimate repetition (like pagination).
      </p>

      <h2>False Positives</h2>

      <p>
        Sometimes legitimate behaviors can look like loops:
      </p>

      <ul>
        <li><strong>Pagination</strong> - Clicking through pages might look like a loop</li>
        <li><strong>Refresh scenarios</strong> - Pages that refresh after actions</li>
        <li><strong>Multi-step flows</strong> - Going back and forth in wizards</li>
      </ul>

      <p>
        Rihario tries to distinguish loops from legitimate repetition, but may occasionally false positive. Review loop reports to verify they're actual problems.
      </p>

      <h2>Common Causes of Loops</h2>

      <h3>1. Broken Redirects</h3>

      <p>
        Your app has a redirect bug:
      </p>

      <ul>
        <li>Page A redirects to Page B incorrectly</li>
        <li>Page B redirects back to Page A</li>
        <li>Creates infinite redirect loop</li>
      </ul>

      <p>
        <strong>This is actually a bug in your app</strong> - Rihario found a real problem.
      </p>

      <h3>2. Authentication Issues</h3>

      <p>
        Auth logic causes redirects:
      </p>

      <ul>
        <li>Protected page redirects to login</li>
        <li>Login redirects back to protected page</li>
        <li>Creates loop if session invalid</li>
      </ul>

      <h3>3. Form Submission Issues</h3>

      <p>
        Forms that don't handle submission correctly:
      </p>

      <ul>
        <li>Form submits but doesn't progress</li>
        <li>Page reloads to same form</li>
        <li>Repeated submission creates loop</li>
      </ul>

      <h2>How to Fix Loops</h2>

      <h3>If Loop Is a Bug</h3>

      <p>
        If Rihario detected a real loop in your app:
      </p>

      <ol>
        <li>Review the loop report to understand the pattern</li>
        <li>Fix the redirect logic or form handling</li>
        <li>Test manually to verify fix</li>
        <li>Re-run Rihario exploration</li>
      </ol>

      <h3>If Loop Is False Positive</h3>

      <p>
        If the "loop" is actually legitimate behavior:
      </p>

      <ul>
        <li>Ignore the loop detection</li>
        <li>Exploration stopped early, but that's okay</li>
        <li>Consider if the legitimate behavior could be improved</li>
      </ul>

      <h2>Preventing Loops in Your App</h2>

      <p>
        To avoid loops:
      </p>

      <ul>
        <li><strong>Fix redirect logic</strong> - Ensure redirects don't create cycles</li>
        <li><strong>Handle form errors</strong> - Don't reload forms on successful submission</li>
        <li><strong>Session management</strong> - Ensure auth redirects don't loop</li>
        <li><strong>Error handling</strong> - Prevent errors from causing redirect loops</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/failed-vs-blocked">Understand FAILED vs BLOCKED status</a></li>
        <li><a href="/docs/reading-test-logs">Learn how to read test logs</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts for loop issues</a></li>
      </ul>
    </article>
  )
}

