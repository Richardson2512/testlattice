export default function CaptchaMFALimitsContent() {
  return (
    <article>
      <h1>CAPTCHA, MFA, and Verification Limits</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario cannot automatically solve CAPTCHAs, handle multi-factor authentication (MFA), or complete age verification.</strong> These are intentional security measures that require human input. When encountered, exploration is marked as BLOCKED, and you can take control to handle them manually.
      </p>

      <h2>CAPTCHA</h2>

      <h3>What Happens</h3>

      <p>
        When a CAPTCHA is encountered:
      </p>

      <ol>
        <li>AI detects CAPTCHA is present</li>
        <li>Exploration stops automatically</li>
        <li>Status marked as BLOCKED</li>
        <li>Reason: "CAPTCHA detected"</li>
        <li>You can take control to solve manually</li>
      </ol>

      <h3>Why CAPTCHAs Block Testing</h3>

      <p>
        CAPTCHAs are designed to prevent automation:
      </p>

      <ul>
        <li><strong>Security measure</strong> - Prevents bots and automated tools</li>
        <li><strong>Requires human input</strong> - Needs visual or cognitive recognition</li>
        <li><strong>Cannot be automated</strong> - By design, prevents automation</li>
      </ul>

      <h3>How to Handle CAPTCHAs</h3>

      <ul>
        <li><strong>Use test environment</strong> - Disable CAPTCHAs in staging/test environments</li>
        <li><strong>Take control manually</strong> - Pause exploration, solve CAPTCHA, resume</li>
        <li><strong>Whitelist IPs</strong> - If possible, whitelist Rihario servers</li>
        <li><strong>Use test accounts</strong> - Create accounts that bypass CAPTCHA</li>
      </ul>

      <h2>Multi-Factor Authentication (MFA)</h2>

      <h3>What Happens</h3>

      <p>
        When MFA is required:
      </p>

      <ol>
        <li>AI submits login form</li>
        <li>MFA prompt appears</li>
        <li>AI cannot provide MFA code</li>
        <li>Exploration marked as BLOCKED</li>
        <li>Reason: "MFA prompt detected"</li>
      </ol>

      <h3>Why MFA Blocks Testing</h3>

      <p>
        MFA requires human input:
      </p>

      <ul>
        <li><strong>Security requirement</strong> - Needs second factor (SMS, authenticator app, etc.)</li>
        <li><strong>Requires human action</strong> - Cannot be automated</li>
        <li><strong>Time-sensitive</strong> - Codes expire quickly</li>
      </ul>

      <h3>How to Handle MFA</h3>

      <ul>
        <li><strong>Use test accounts without MFA</strong> - Create accounts for testing</li>
        <li><strong>Disable MFA in test environment</strong> - Turn off MFA for staging</li>
        <li><strong>Take control manually</strong> - Pause, authenticate, resume</li>
        <li><strong>Pre-authenticate</strong> - Log in manually before starting exploration</li>
      </ul>

      <h2>Age Verification</h2>

      <h3>What Happens</h3>

      <p>
        When age verification is required:
      </p>

      <ol>
        <li>Age gate appears</li>
        <li>AI cannot confirm age</li>
        <li>Exploration may be BLOCKED</li>
        <li>May attempt to proceed (varies)</li>
      </ol>

      <h3>How to Handle Age Verification</h3>

      <ul>
        <li><strong>Disable in test environment</strong> - Remove age gates for testing</li>
        <li><strong>Take control manually</strong> - Handle verification manually</li>
        <li><strong>Use test environment</strong> - Test on staging without age gates</li>
      </ul>

      <h2>Other Verification Limits</h2>

      <h3>Email Verification</h3>

      <ul>
        <li><strong>Cannot access email</strong> - Rihario cannot check email inboxes</li>
        <li><strong>Manual verification</strong> - You must verify emails manually</li>
        <li><strong>Use test accounts</strong> - Pre-verified test accounts</li>
      </ul>

      <h3>SMS Verification</h3>

      <ul>
        <li><strong>Cannot receive SMS</strong> - Rihario cannot receive text messages</li>
        <li><strong>Manual verification</strong> - You must enter SMS codes</li>
        <li><strong>Use test accounts</strong> - Accounts without SMS verification</li>
      </ul>

      <h3>Payment Verification</h3>

      <ul>
        <li><strong>Cannot process payments</strong> - Rihario cannot enter payment info</li>
        <li><strong>Use test mode</strong> - Test payment systems in test mode</li>
        <li><strong>Skip payment flows</strong> - Focus on other parts of your app</li>
      </ul>

      <h2>Best Practices</h2>

      <h3>For Testing</h3>

      <ul>
        <li><strong>Use staging/test environments</strong> - Disable security measures for testing</li>
        <li><strong>Create test accounts</strong> - Accounts without MFA, CAPTCHA, etc.</li>
        <li><strong>Whitelist IPs</strong> - If possible, bypass CAPTCHA for Rihario IPs</li>
        <li><strong>Pre-authenticate</strong> - Log in manually before exploring</li>
      </ul>

      <h3>When You Must Test With Security</h3>

      <ul>
        <li><strong>Take control manually</strong> - Handle CAPTCHA/MFA yourself</li>
        <li><strong>Test specific flows</strong> - Focus on flows after authentication</li>
        <li><strong>Accept limitations</strong> - Some flows can't be fully automated</li>
      </ul>

      <h2>Understanding BLOCKED Status</h2>

      <p>
        When exploration is BLOCKED:
      </p>

      <ul>
        <li><strong>Not a bug</strong> - This is expected behavior</li>
        <li><strong>Security working</strong> - Your security measures are functioning</li>
        <li><strong>Manual intervention needed</strong> - Requires human action</li>
        <li><strong>Can continue</strong> - Take control and resume exploration</li>
      </ul>

      <h2>Limitations Summary</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Cannot automate:</strong></div>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>CAPTCHA solving</li>
            <li>MFA code entry</li>
            <li>Age verification</li>
            <li>Email verification</li>
            <li>SMS verification</li>
            <li>Payment processing</li>
          </ul>
          <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong>Workarounds:</strong></div>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Use test environments</li>
            <li>Create test accounts</li>
            <li>Disable security measures for testing</li>
            <li>Take control manually</li>
          </ul>
        </div>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/skipped-blocked-steps">Learn about BLOCKED status</a></li>
        <li><a href="/docs/human-in-the-loop">See how to take control manually</a></li>
        <li><a href="/docs/test-login-flows">Learn about testing login flows</a></li>
      </ul>
    </article>
  )
}

