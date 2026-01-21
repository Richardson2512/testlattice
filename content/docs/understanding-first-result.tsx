export default function UnderstandingFirstResultContent() {
  return (
    <article>
      <h1>Understanding Your First Test Result</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario results show what the AI found during exploration, not pass/fail status.</strong> You'll see pages explored, issues detected, step-by-step actions, and evidence. Here's how to make sense of it all.
      </p>

      <h2>Result Overview</h2>

      <p>
        At the top of your result page, you'll see a summary:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Status</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Pages Explored</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>3</div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Issues Found</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--error)' }}>2</div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Duration</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>2m 34s</div>
          </div>
        </div>
      </div>

      <h3>Status Values</h3>

      <ul>
        <li><strong>COMPLETED</strong> - Exploration finished successfully</li>
        <li><strong>FAILED</strong> - Exploration stopped due to an error</li>
        <li><strong>BLOCKED</strong> - Hit a blocker (CAPTCHA, MFA, cookie banner)</li>
        <li><strong>SKIPPED</strong> - Step was skipped (usually due to safety guards)</li>
      </ul>

      <p>
        See <a href="/docs/failed-vs-blocked">What FAILED vs BLOCKED vs SKIPPED Means</a> for detailed explanations.
      </p>

      <h2>Step-by-Step Log</h2>

      <p>
        The step log shows every action the AI took, in order. Each step includes:
      </p>

      <ul>
        <li><strong>Action</strong> - What the AI did (clicked button, filled form, navigated)</li>
        <li><strong>Target</strong> - What element it interacted with</li>
        <li><strong>Timestamp</strong> - When it happened</li>
        <li><strong>Screenshot</strong> - What the page looked like</li>
        <li><strong>Evidence</strong> - Console logs, network errors, or other data</li>
      </ul>

      <div style={{
        background: '#1e1e1e',
        color: '#fff',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ color: '#4ec9b0' }}>Step 1: Load page</div>
        <div style={{ color: '#9cdcfe', marginTop: '0.5rem' }}>  → Navigated to https://app.com</div>
        <div style={{ color: '#4ec9b0', marginTop: '1rem' }}>Step 2: Click button</div>
        <div style={{ color: '#9cdcfe', marginTop: '0.5rem' }}>  → Clicked "Sign Up" button</div>
        <div style={{ color: '#4ec9b0', marginTop: '1rem' }}>Step 3: Fill form</div>
        <div style={{ color: '#9cdcfe', marginTop: '0.5rem' }}>  → Typed "test@example.com" in email field</div>
        <div style={{ color: '#ce9178', marginTop: '1rem' }}>  ⚠ Console error detected</div>
        <div style={{ color: '#d4a373', marginTop: '0.5rem' }}>    Error: Cannot read property 'value' of null</div>
      </div>

      <h3>Understanding Step Actions</h3>

      <ul>
        <li><strong>Navigate</strong> - AI loaded a new page</li>
        <li><strong>Click</strong> - AI clicked an element</li>
        <li><strong>Type</strong> - AI filled in a form field</li>
        <li><strong>Wait</strong> - AI waited for something (page load, element to appear)</li>
        <li><strong>Screenshot</strong> - AI captured the current state</li>
        <li><strong>Check</strong> - AI verified something exists or looks correct</li>
      </ul>

      <h2>Issues List</h2>

      <p>
        Issues are problems the AI detected during exploration. They're grouped by type:
      </p>

      <h3>Visual Issues</h3>
      <p>
        Layout problems, overlapping elements, broken CSS, visual regressions.
      </p>

      <h3>Console Errors</h3>
      <p>
        JavaScript errors logged to the browser console. These might break functionality.
      </p>

      <h3>Network Errors</h3>
      <p>
        Failed API requests, 404s, CORS errors, timeouts.
      </p>

      <h3>Accessibility Issues</h3>
      <p>
        Missing alt text, missing labels, contrast problems, keyboard navigation issues.
      </p>

      <h3>Performance Issues</h3>
      <p>
        Slow page loads, large bundle sizes, render-blocking resources.
      </p>

      <p>
        See <a href="/docs/error-types">Console Errors vs Network Errors vs UI Issues</a> for more details.
      </p>

      <h2>Reading Individual Issues</h2>

      <p>
        Each issue shows:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Console Error: Cannot read property 'value' of null
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Found on: Step 3 - Fill form
            </div>
          </div>
          <div style={{
            padding: '0.25rem 0.75rem',
            background: 'var(--error)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}>
            HIGH
          </div>
        </div>
        <div style={{
          background: '#1e1e1e',
          color: '#fff',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          marginBottom: '1rem',
        }}>
          <div>Error: Cannot read property 'value' of null</div>
          <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>  at form.js:45</div>
          <div style={{ color: '#94a3b8' }}>  at handleSubmit (form.js:23)</div>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <strong>Evidence:</strong> Console log captured during form submission. The form is trying to read a property from a null element, likely a missing form field.
        </div>
      </div>

      <h3>Severity Levels</h3>

      <ul>
        <li><strong>HIGH</strong> - Likely breaks functionality or user experience</li>
        <li><strong>MEDIUM</strong> - Might cause problems, worth checking</li>
        <li><strong>LOW</strong> - Minor issue, probably fine to ignore</li>
      </ul>

      <p>
        Severity is AI-determined based on context. Always verify yourself - false positives happen.
      </p>

      <h2>Evidence Collection</h2>

      <p>
        Each issue includes evidence to help you understand what happened:
      </p>

      <ul>
        <li><strong>Screenshots</strong> - What the page looked like when the issue occurred</li>
        <li><strong>Console logs</strong> - JavaScript errors or warnings</li>
        <li><strong>Network logs</strong> - Failed requests, response codes</li>
        <li><strong>DOM snapshots</strong> - HTML structure at the time</li>
      </ul>

      <p>
        See <a href="/docs/evidence-collection">How Evidence Is Collected</a> for technical details.
      </p>

      <h2>Video Replay</h2>

      <p>
        At the bottom of the result page, you can watch a video replay of the entire exploration. This shows exactly what the AI saw and did, frame by frame.
      </p>

      <p>
        Useful for:
      </p>

      <ul>
        <li>Understanding context around issues</li>
        <li>Seeing what the AI tried to do when something failed</li>
        <li>Verifying findings are real problems</li>
      </ul>

      <h2>Common Questions</h2>

      <h3>"Why are there so many steps?"</h3>
      <p>
        The AI explores thoroughly. It might click multiple buttons, try different interactions, scroll through pages. More steps usually means more thorough exploration.
      </p>

      <h3>"Why didn't it find issue X?"</h3>
      <p>
        AI exploration is not exhaustive. It finds issues it notices, but it doesn't test every possible scenario. If you know about a specific issue, mention it in the test instructions.
      </p>

      <h3>"Is this a real bug?"</h3>
      <p>
        Always verify findings yourself. Look at the evidence (screenshot, logs), try to reproduce it manually, check if it's a false positive. AI makes mistakes.
      </p>

      <h3>"Why is this marked HIGH severity?"</h3>
      <p>
        Severity is AI-determined based on context. A console error during form submission is probably HIGH because it might break functionality. But it could be a false positive. Always verify.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/reading-test-logs">Learn more about reading test logs</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts from results</a></li>
        <li><a href="/docs/ai-accuracy">Understand AI accuracy and limitations</a></li>
      </ul>
    </article>
  )
}

