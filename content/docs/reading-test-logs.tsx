export default function ReadingTestLogsContent() {
  return (
    <article>
      <h1>How to Read Test Logs Step by Step</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Test logs show every action the AI took during exploration, in chronological order.</strong> Each step shows what happened, when it happened, what the page looked like, and what evidence was collected. Reading logs helps you understand what the AI did and verify findings.
      </p>

      <h2>Log Structure</h2>

      <p>
        Each step in the log contains:
      </p>

      <ul>
        <li><strong>Step number</strong> - Sequential action number</li>
        <li><strong>Action type</strong> - What the AI did (click, type, navigate, etc.)</li>
        <li><strong>Target</strong> - What element was interacted with</li>
        <li><strong>Timestamp</strong> - When the action occurred</li>
        <li><strong>Screenshot</strong> - What the page looked like</li>
        <li><strong>Evidence</strong> - Console logs, network errors, etc.</li>
        <li><strong>Status</strong> - Success, failed, skipped, or blocked</li>
      </ul>

      <h2>Step Types</h2>

      <h3>Navigate</h3>

      <p>
        The AI loaded a new page:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}><strong>Step 1:</strong> Navigate</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Target: https://app.com</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Status: ✓ Success</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Duration: 2.3s</div>
      </div>

      <h3>Click</h3>

      <p>
        The AI clicked an element:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}><strong>Step 3:</strong> Click</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Target: "Sign Up" button</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Selector: button[data-testid="signup-btn"]</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Status: ✓ Success</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Duration: 0.5s</div>
      </div>

      <h3>Type</h3>

      <p>
        The AI filled in a form field:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}><strong>Step 5:</strong> Type</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Target: Email input field</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Value: test@example.com</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Status: ✓ Success</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Duration: 1.2s</div>
      </div>

      <h3>Wait</h3>

      <p>
        The AI waited for something:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}><strong>Step 7:</strong> Wait</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Reason: Waiting for page to load</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Duration: 1.8s</div>
      </div>

      <h3>Screenshot</h3>

      <p>
        The AI captured the current state:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}><strong>Step 9:</strong> Screenshot</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Reason: After form submission</div>
        <div style={{ color: 'var(--text-secondary)' }}>  Captured: Current page state</div>
      </div>

      <h2>Understanding Step Details</h2>

      <h3>Screenshots</h3>

      <p>
        Each step includes a screenshot showing:
      </p>

      <ul>
        <li>What the page looked like at that moment</li>
        <li>What element was interacted with (highlighted)</li>
        <li>Visual state before and after actions</li>
      </ul>

      <p>
        Screenshots help you:
      </p>

      <ul>
        <li>See what the AI saw</li>
        <li>Understand context around actions</li>
        <li>Verify issues are real</li>
        <li>Debug problems</li>
      </ul>

      <h3>Evidence</h3>

      <p>
        Steps may include evidence:
      </p>

      <ul>
        <li><strong>Console logs</strong> - JavaScript errors or warnings</li>
        <li><strong>Network logs</strong> - Failed requests, response codes</li>
        <li><strong>DOM snapshots</strong> - HTML structure at that moment</li>
        <li><strong>Error messages</strong> - Any errors that occurred</li>
      </ul>

      <h3>Timestamps</h3>

      <p>
        Timestamps show:
      </p>

      <ul>
        <li>When each action occurred</li>
        <li>How long each action took</li>
        <li>Total exploration duration</li>
        <li>Time between actions</li>
      </ul>

      <h2>Reading Logs Effectively</h2>

      <h3>Start with Summary</h3>

      <p>
        Before diving into logs:
      </p>

      <ul>
        <li>Check the summary - pages explored, issues found</li>
        <li>Look at the issues list - what problems were detected</li>
        <li>Then read logs to understand context</li>
      </ul>

      <h3>Focus on Issue Steps</h3>

      <p>
        When reviewing issues:
      </p>

      <ul>
        <li>Jump to the step where issue was detected</li>
        <li>Look at steps before and after</li>
        <li>Review screenshot and evidence</li>
        <li>Understand the sequence that led to the issue</li>
      </ul>

      <h3>Use Search/Filter</h3>

      <p>
        Most log viewers allow:
      </p>

      <ul>
        <li>Searching for specific actions</li>
        <li>Filtering by status (failed, blocked, etc.)</li>
        <li>Jumping to specific step numbers</li>
        <li>Expanding/collapsing sections</li>
      </ul>

      <h2>Common Log Patterns</h2>

      <h3>Successful Flow</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → Homepage</div>
          <div>Step 2: Click → "Sign Up" button</div>
          <div>Step 3: Type → Email field</div>
          <div>Step 4: Type → Password field</div>
          <div>Step 5: Click → "Submit" button</div>
          <div>Step 6: Navigate → Dashboard (redirected)</div>
          <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>✓ All steps successful</div>
        </div>
      </div>

      <h3>Failed Flow</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → Homepage</div>
          <div>Step 2: Click → "Sign Up" button</div>
          <div>Step 3: Type → Email field</div>
          <div>Step 4: Type → Password field</div>
          <div style={{ color: 'var(--error)' }}>Step 5: Click → "Submit" button ❌ FAILED</div>
          <div style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>  Error: Console error detected</div>
          <div style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>  Evidence: "Cannot read property 'value' of null"</div>
        </div>
      </div>

      <h3>Blocked Flow</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → Homepage</div>
          <div>Step 2: Click → "Sign Up" button</div>
          <div>Step 3: Type → Email field</div>
          <div>Step 4: Type → Password field</div>
          <div style={{ color: 'var(--warning)' }}>Step 5: Click → "Submit" button ⏸ BLOCKED</div>
          <div style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>  Reason: CAPTCHA detected</div>
          <div style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>  Action: Cannot proceed automatically</div>
        </div>
      </div>

      <h2>What to Look For</h2>

      <h3>Issues</h3>

      <p>
        When reviewing logs for issues:
      </p>

      <ul>
        <li><strong>Failed steps</strong> - Actions that didn't complete</li>
        <li><strong>Console errors</strong> - JavaScript errors logged</li>
        <li><strong>Network errors</strong> - Failed requests</li>
        <li><strong>Unexpected behavior</strong> - Steps that didn't do what was expected</li>
      </ul>

      <h3>Flow Understanding</h3>

      <p>
        To understand what the AI did:
      </p>

      <ul>
        <li>Follow the sequence of actions</li>
        <li>See how it navigated through your app</li>
        <li>Understand what paths it explored</li>
        <li>Identify what it might have missed</li>
      </ul>

      <h3>Performance</h3>

      <p>
        To check performance:
      </p>

      <ul>
        <li>Look at step durations</li>
        <li>Identify slow actions</li>
        <li>Find long wait times</li>
        <li>See overall exploration time</li>
      </ul>

      <h2>Tips for Reading Logs</h2>

      <ul>
        <li><strong>Start from issues</strong> - Jump to steps where issues were found, then read context</li>
        <li><strong>Use screenshots</strong> - Visual context helps understand what happened</li>
        <li><strong>Check timestamps</strong> - Long pauses might indicate problems</li>
        <li><strong>Look for patterns</strong> - Repeated failures suggest systematic issues</li>
        <li><strong>Compare steps</strong> - See before/after states to understand changes</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/failed-vs-blocked">Understand FAILED vs BLOCKED vs SKIPPED</a></li>
        <li><a href="/docs/error-types">Learn about different error types</a></li>
        <li><a href="/docs/evidence-collection">See how evidence is collected</a></li>
      </ul>
    </article>
  )
}

