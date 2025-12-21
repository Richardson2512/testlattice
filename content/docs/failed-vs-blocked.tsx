export default function FailedVsBlockedContent() {
  return (
    <article>
      <h1>What FAILED vs BLOCKED vs SKIPPED Means</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario uses three statuses: FAILED means something broke, BLOCKED means hit an intentional blocker, and SKIPPED means intentionally skipped for safety or efficiency.</strong> Understanding these statuses helps you interpret results correctly and know when issues are actual bugs vs expected limitations.
      </p>

      <h2>FAILED Status</h2>

      <h3>What It Means</h3>

      <p>
        FAILED means something broke during exploration:
      </p>

      <ul>
        <li><strong>Action failed</strong> - Click didn't work, form didn't submit, etc.</li>
        <li><strong>Error occurred</strong> - JavaScript error, network error, etc.</li>
        <li><strong>Unexpected behavior</strong> - Something didn't work as expected</li>
        <li><strong>Technical problem</strong> - Usually indicates a bug in your app</li>
      </ul>

      <h3>Common FAILED Scenarios</h3>

      <ul>
        <li><strong>JavaScript error</strong> - Console error breaks functionality</li>
        <li><strong>Network failure</strong> - API request fails, page doesn't load</li>
        <li><strong>Element not found</strong> - Button or form field missing (but AI expected it)</li>
        <li><strong>Form submission fails</strong> - Form doesn't submit, error shown</li>
        <li><strong>Page crash</strong> - Page becomes unresponsive</li>
      </ul>

      <h3>Example: FAILED</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--error)' }}>Step 8: FAILED</div>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Action:</strong> Click "Submit" button</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Error:</strong> Console error detected</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Message:</strong> "Cannot read property 'value' of null"</div>
          <div style={{ color: 'var(--text-secondary)' }}><strong>Meaning:</strong> Something broke in your app - this is a real bug</div>
        </div>
      </div>

      <h2>BLOCKED Status</h2>

      <h3>What It Means</h3>

      <p>
        BLOCKED means exploration hit an intentional blocker:
      </p>

      <ul>
        <li><strong>Security measure</strong> - CAPTCHA, MFA, or other protection</li>
        <li><strong>Access control</strong> - Authentication required, paywall, age gate</li>
        <li><strong>Cannot automate</strong> - Requires human intervention</li>
        <li><strong>Not a bug</strong> - This is expected behavior, not a problem</li>
      </ul>

      <h3>Common BLOCKED Scenarios</h3>

      <ul>
        <li><strong>CAPTCHA</strong> - Cannot solve CAPTCHAs automatically</li>
        <li><strong>MFA prompt</strong> - Multi-factor authentication requires human input</li>
        <li><strong>Cookie banner</strong> - Cannot dismiss complex cookie banners</li>
        <li><strong>Login required</strong> - Protected page needs authentication</li>
        <li><strong>Paywall</strong> - Content requires payment</li>
      </ul>

      <h3>Example: BLOCKED</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--warning)' }}>Step 5: BLOCKED</div>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Action:</strong> Submit contact form</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Reason:</strong> CAPTCHA detected</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Message:</strong> Cannot proceed automatically</div>
          <div style={{ color: 'var(--text-secondary)' }}><strong>Meaning:</strong> Intentional security measure - not a bug in your app</div>
        </div>
      </div>

      <h2>SKIPPED Status</h2>

      <h3>What It Means</h3>

      <p>
        SKIPPED means the step was intentionally skipped:
      </p>

      <ul>
        <li><strong>Safety guard</strong> - Prevented infinite loop or stuck state</li>
        <li><strong>Efficiency optimization</strong> - Skipped duplicate or low-value actions</li>
        <li><strong>Not a problem</strong> - Skipping was the right decision</li>
        <li><strong>Optimization</strong> - Saves time without affecting results</li>
      </ul>

      <h3>Common SKIPPED Scenarios</h3>

      <ul>
        <li><strong>Infinite loop prevention</strong> - Same action repeating, skipped to stop loop</li>
        <li><strong>Duplicate action</strong> - Already performed similar action</li>
        <li><strong>Low-value exploration</strong> - Element doesn't add value</li>
        <li><strong>Already explored</strong> - Page or flow already checked</li>
        <li><strong>Timeout prevention</strong> - Action taking too long, skipped to prevent hanging</li>
      </ul>

      <h3>Example: SKIPPED</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Step 12: SKIPPED</div>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Action:</strong> Click "Terms of Service" link</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Reason:</strong> Similar legal page already explored</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Message:</strong> Skipped to optimize exploration time</div>
          <div style={{ color: 'var(--text-secondary)' }}><strong>Meaning:</strong> Skipped for efficiency - not a problem</div>
        </div>
      </div>

      <h2>Comparison Table</h2>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '2rem',
        marginBottom: '2rem',
        overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Aspect</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>FAILED</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>BLOCKED</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>SKIPPED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Meaning</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Something broke</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Hit intentional blocker</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Intentionally skipped</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Indicates Bug?</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Usually yes</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>No</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>No</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Action Needed?</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fix the bug</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Manual intervention</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>None</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Common Causes</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>JS errors, network failures</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>CAPTCHA, MFA, auth</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Loops, duplicates</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Color</td>
              <td style={{ padding: '0.75rem', color: 'var(--error)' }}>🔴 Red</td>
              <td style={{ padding: '0.75rem', color: 'var(--warning)' }}>🟡 Yellow</td>
              <td style={{ padding: '0.75rem' }}>⚪ Gray</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to Interpret Results</h2>

      <h3>If You See FAILED</h3>

      <ol>
        <li><strong>Review the error</strong> - Check console logs, network errors</li>
        <li><strong>Verify it's real</strong> - Manually reproduce the issue</li>
        <li><strong>Fix the bug</strong> - This indicates a real problem in your app</li>
        <li><strong>Re-test</strong> - Run exploration again to verify fix</li>
      </ol>

      <h3>If You See BLOCKED</h3>

      <ol>
        <li><strong>Check the reason</strong> - See what blocked exploration (CAPTCHA, MFA, etc.)</li>
        <li><strong>Decide if action needed</strong> - If blocker is intentional, that's fine</li>
        <li><strong>Take control if needed</strong> - Manually handle blocker, then resume</li>
        <li><strong>Use test environment</strong> - Disable blockers in staging/test environments</li>
      </ol>

      <h3>If You See SKIPPED</h3>

      <ol>
        <li><strong>Review the reason</strong> - Understand why it was skipped</li>
        <li><strong>Verify it's fine</strong> - Usually skipping is correct</li>
        <li><strong>No action needed</strong> - Skipping is typically intentional and correct</li>
      </ol>

      <h2>Status Combinations</h2>

      <h3>All Steps Successful</h3>

      <p>
        ✓ All steps show SUCCESS - Exploration completed without issues. This is the ideal outcome.
      </p>

      <h3>Some Steps FAILED</h3>

      <p>
        Some steps FAILED, others successful - Your app has bugs, but exploration continued. Review failed steps to fix issues.
      </p>

      <h3>Exploration BLOCKED</h3>

      <p>
        Hit a blocker and stopped - Intentional security measure prevented automation. Take control manually or use test environment.
      </p>

      <h3>Mix of Statuses</h3>

      <p>
        Combination of SUCCESS, FAILED, BLOCKED, SKIPPED - Normal. Review each status appropriately:
      </p>

      <ul>
        <li>Fix FAILED steps (bugs)</li>
        <li>Handle BLOCKED steps (manual intervention or test environment)</li>
        <li>Ignore SKIPPED steps (intentional optimization)</li>
      </ul>

      <h2>Real-World Examples</h2>

      <h3>Example 1: Successful Exploration</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → ✓ Success</div>
          <div>Step 2: Click button → ✓ Success</div>
          <div>Step 3: Fill form → ✓ Success</div>
          <div>Step 4: Submit → ✓ Success</div>
          <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>Result: All successful, no issues found</div>
        </div>
      </div>

      <h3>Example 2: Mixed Results</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → ✓ Success</div>
          <div>Step 2: Click button → ✓ Success</div>
          <div style={{ color: 'var(--error)' }}>Step 3: Fill form → ❌ FAILED (Console error)</div>
          <div>Step 4: Submit → ⏭ SKIPPED (Step 3 failed)</div>
          <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>Result: Found 1 issue - console error in form</div>
        </div>
      </div>

      <h3>Example 3: Blocked Exploration</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div>Step 1: Navigate → ✓ Success</div>
          <div>Step 2: Click button → ✓ Success</div>
          <div>Step 3: Fill form → ✓ Success</div>
          <div style={{ color: 'var(--warning)' }}>Step 4: Submit → ⏸ BLOCKED (CAPTCHA)</div>
          <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>Result: Blocked by CAPTCHA - requires manual intervention</div>
        </div>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/reading-test-logs">Learn how to read test logs</a></li>
        <li><a href="/docs/error-types">Understand different error types</a></li>
        <li><a href="/docs/captcha-mfa-limits">See CAPTCHA and MFA limitations</a></li>
      </ul>
    </article>
  )
}

