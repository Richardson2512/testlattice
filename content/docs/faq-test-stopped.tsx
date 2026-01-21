export default function FAQTestStoppedContent() {
  return (
    <article>
      <h1>Why Did My Test Stop Early?</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario explorations can stop early for several reasons:</strong> hit a blocker (CAPTCHA, MFA), detected an infinite loop, reached time limit, or was manually cancelled. The test results will show why it stopped. Most common reasons are blockers or time limits.
      </p>

      <h2>Common Reasons Tests Stop Early</h2>

      <h3>1. Blocker Encountered</h3>

      <p>
        Most common reason: Hit something that blocks automation:
      </p>

      <ul>
        <li><strong>CAPTCHA</strong> - Cannot solve CAPTCHAs automatically</li>
        <li><strong>MFA prompt</strong> - Multi-factor authentication required</li>
        <li><strong>Login required</strong> - Authentication needed</li>
        <li><strong>Cookie banner</strong> - Complex cookie banner couldn't be dismissed</li>
      </ul>

      <p>
        <strong>Status:</strong> BLOCKED<br />
        <strong>Solution:</strong> Take control manually, handle blocker, then resume
      </p>

      <h3>2. Time Limit Reached</h3>

      <p>
        Exploration took too long:
      </p>

      <ul>
        <li><strong>Maximum duration</strong> - Exploration exceeded time limit</li>
        <li><strong>Complex site</strong> - Site has many pages or complex flows</li>
        <li><strong>Slow performance</strong> - Site is slow to load or respond</li>
      </ul>

      <p>
        <strong>Status:</strong> TIMEOUT<br />
        <strong>Solution:</strong> Results up to timeout are saved; try focusing exploration with instructions
      </p>

      <h3>3. Infinite Loop Detected</h3>

      <p>
        Safety guard triggered:
      </p>

      <ul>
        <li><strong>Redirect loop</strong> - Pages redirecting in circles</li>
        <li><strong>Repeated actions</strong> - Same action performed multiple times</li>
        <li><strong>Stuck state</strong> - Exploration stuck on same page</li>
      </ul>

      <p>
        <strong>Status:</strong> STOPPED (loop detected)<br />
        <strong>Solution:</strong> This may indicate a bug in your app - check redirect logic
      </p>

      <h3>4. Manual Cancellation</h3>

      <p>
        You cancelled the test:
      </p>

      <ul>
        <li><strong>Clicked cancel</strong> - Manually stopped exploration</li>
        <li><strong>Closed browser</strong> - Navigation away stopped test</li>
      </ul>

      <p>
        <strong>Status:</strong> CANCELLED<br />
        <strong>Solution:</strong> Start new exploration if needed
      </p>

      <h3>5. Error Occurred</h3>

      <p>
        Fatal error during exploration:
      </p>

      <ul>
        <li><strong>Browser crash</strong> - Browser encountered fatal error</li>
        <li><strong>Network failure</strong> - Connection issues</li>
        <li><strong>System error</strong> - Unexpected technical problem</li>
      </ul>

      <p>
        <strong>Status:</strong> ERROR<br />
        <strong>Solution:</strong> Try running again; contact support if persists
      </p>

      <h2>How to Check Why It Stopped</h2>

      <h3>Check Test Results</h3>

      <p>
        In the test results, look for:
      </p>

      <ul>
        <li><strong>Status</strong> - BLOCKED, TIMEOUT, STOPPED, CANCELLED, ERROR</li>
        <li><strong>Last step</strong> - What was happening when it stopped</li>
        <li><strong>Reason</strong> - Explanation of why it stopped</li>
        <li><strong>Evidence</strong> - Screenshot or logs showing the issue</li>
      </ul>

      <h3>Review Test Logs</h3>

      <p>
        Check the step-by-step log:
      </p>

      <ul>
        <li>See last action taken</li>
        <li>Check for errors or warnings</li>
        <li>Review screenshot of final state</li>
      </ul>

      <h2>What to Do</h2>

      <h3>If BLOCKED</h3>

      <ul>
        <li>Take control manually</li>
        <li>Handle the blocker (solve CAPTCHA, authenticate, etc.)</li>
        <li>Resume exploration</li>
        <li>Or use test environment without blockers</li>
      </ul>

      <h3>If TIMEOUT</h3>

      <ul>
        <li>Review results up to timeout (they're saved)</li>
        <li>Try focusing exploration with specific instructions</li>
        <li>Test smaller sections of your site</li>
        <li>Check if site performance is slow</li>
      </ul>

      <h3>If LOOP DETECTED</h3>

      <ul>
        <li>This may indicate a bug in your app</li>
        <li>Check redirect logic</li>
        <li>Fix the loop in your app</li>
        <li>Re-run exploration</li>
      </ul>

      <h3>If ERROR</h3>

      <ul>
        <li>Try running again</li>
        <li>Check if issue persists</li>
        <li>Contact support if problem continues</li>
      </ul>

      <h2>Preventing Early Stops</h2>

      <ul>
        <li><strong>Use test environments</strong> - Disable CAPTCHAs, MFA in staging</li>
        <li><strong>Pre-authenticate</strong> - Log in manually before starting</li>
        <li><strong>Focus instructions</strong> - Provide specific guidance for AI</li>
        <li><strong>Test smaller sections</strong> - Break large sites into smaller explorations</li>
        <li><strong>Monitor performance</strong> - Ensure site is fast and responsive</li>
      </ul>

      <h2>Getting Complete Results</h2>

      <p>
        Even if test stops early:
      </p>

      <ul>
        <li><strong>Results are saved</strong> - Everything up to stop point is recorded</li>
        <li><strong>Issues found</strong> - Problems detected before stop are reported</li>
        <li><strong>Evidence captured</strong> - Screenshots and logs up to stop are available</li>
      </ul>

      <h2>Answer: Check Status and Reason</h2>

      <p>
        <strong>Check the test status and reason in the results.</strong> Most common reasons are blockers (CAPTCHA, MFA) or time limits. Review the last step and evidence to understand why it stopped, then take appropriate action.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/skipped-blocked-steps">Learn about BLOCKED status</a></li>
        <li><a href="/docs/captcha-mfa-limits">Understand CAPTCHA and MFA limitations</a></li>
        <li><a href="/docs/reading-test-logs">Learn how to read test logs</a></li>
      </ul>
    </article>
  )
}

