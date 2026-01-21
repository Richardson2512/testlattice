export default function TestLoginFlowsContent() {
  return (
    <article>
      <h1>How to Test Login Flows Automatically</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario can explore login flows automatically, but authentication requires special handling.</strong> The AI can fill login forms and test form validation, but you may need to manually authenticate for protected pages. Here's how it works.
      </p>

      <h2>How Login Flow Testing Works</h2>

      <h3>1. Automatic Form Testing</h3>

      <p>
        The AI can automatically:
      </p>

      <ul>
        <li><strong>Find login forms</strong> - Identifies email/password fields</li>
        <li><strong>Fill form fields</strong> - Types test credentials</li>
        <li><strong>Submit forms</strong> - Clicks submit buttons</li>
        <li><strong>Check validation</strong> - Tests form error handling</li>
        <li><strong>Detect issues</strong> - Flags errors, broken validation, etc.</li>
      </ul>

      <h3>2. Authentication Handling</h3>

      <p>
        After form submission, the AI will:
      </p>

      <ul>
        <li><strong>Observe the result</strong> - See if login succeeded or failed</li>
        <li><strong>Follow redirects</strong> - Navigate to post-login pages if successful</li>
        <li><strong>Continue exploring</strong> - Explore authenticated areas if logged in</li>
        <li><strong>Report blockers</strong> - Flag CAPTCHAs, MFA, or other blockers</li>
      </ul>

      <h2>Step-by-Step Guide</h2>

      <h3>Step 1: Start Exploration on Login Page</h3>

      <p>
        Start your exploration with the login page URL:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example:</div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
          URL: https://app.com/login<br />
          Instructions: "test the login flow"
        </div>
      </div>

      <h3>Step 2: AI Explores Login Form</h3>

      <p>
        The AI will:
      </p>

      <ol>
        <li>Load the login page</li>
        <li>Identify email and password fields</li>
        <li>Fill in test credentials</li>
        <li>Check for validation errors</li>
        <li>Submit the form</li>
      </ol>

      <h3>Step 3: Handle Authentication</h3>

      <p>
        After form submission, you have a few options:
      </p>

      <h4>Option A: Use Test Credentials</h4>

      <p>
        If you have test credentials that don't require CAPTCHA or MFA:
      </p>

      <ol>
        <li>Provide test credentials in the instructions</li>
        <li>AI uses them to log in</li>
        <li>Exploration continues in authenticated state</li>
      </ol>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example Instructions:</div>
        <div style={{ fontSize: '0.9rem' }}>
          "Test login with test@example.com / password123, then check the dashboard"
        </div>
      </div>

      <h4>Option B: Manual Authentication (Recommended)</h4>

      <p>
        For real credentials or complex auth flows:
      </p>

      <ol>
        <li>Start exploration on login page</li>
        <li>When AI reaches login form, pause exploration</li>
        <li>Take control and log in manually</li>
        <li>Resume exploration</li>
        <li>AI continues exploring authenticated areas</li>
      </ol>

      <p>
        See <a href="/docs/human-in-the-loop">Human-in-the-Loop Testing</a> for details on taking control.
      </p>

      <h4>Option C: Start from Authenticated State</h4>

      <p>
        If you're already logged in:
      </p>

      <ol>
        <li>Log into your app manually in a browser</li>
        <li>Copy the authenticated session (if possible)</li>
        <li>Start exploration from a protected page</li>
        <li>Use "Take Control" if authentication expires</li>
      </ol>

      <p>
        Note: Session handling varies by app. Some apps require cookies, some use tokens. See <a href="/docs/credentials-handling">Credentials Handling</a> for details.
      </p>

      <h2>What Gets Tested</h2>

      <h3>Form Validation</h3>

      <ul>
        <li>Required field validation</li>
        <li>Email format validation</li>
        <li>Password requirements</li>
        <li>Error message display</li>
        <li>Form submission behavior</li>
      </ul>

      <h3>Login Functionality</h3>

      <ul>
        <li>Form submission works</li>
        <li>Invalid credentials are rejected</li>
        <li>Valid credentials log in successfully</li>
        <li>Redirect after login works</li>
        <li>Session is created correctly</li>
      </ul>

      <h3>Post-Login Experience</h3>

      <ul>
        <li>Protected pages are accessible</li>
        <li>Navigation works in authenticated state</li>
        <li>User-specific content loads</li>
        <li>No authentication errors</li>
      </ul>

      <h2>Common Scenarios</h2>

      <h3>Simple Email/Password Login</h3>

      <p>
        <strong>Works automatically:</strong> AI can handle standard email/password forms without intervention.
      </p>

      <h3>Social Login (OAuth)</h3>

      <p>
        <strong>Requires manual help:</strong> OAuth flows usually require manual authentication. AI will detect the OAuth button and you can click it manually.
      </p>

      <h3>CAPTCHA or MFA</h3>

      <p>
        <strong>Blocks automatic testing:</strong> Exploration will be marked as BLOCKED if it hits CAPTCHA or MFA. You'll need to handle these manually.
      </p>

      <p>
        See <a href="/docs/captcha-mfa-limits">CAPTCHA, MFA, and Verification Limits</a> for details.
      </p>

      <h3>Multi-Step Authentication</h3>

      <p>
        <strong>May require guidance:</strong> Complex multi-step flows might need human intervention. Use "Take Control" to handle intermediate steps.
      </p>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Use test accounts</strong> - Don't use real user credentials</li>
        <li><strong>Handle auth manually if needed</strong> - Complex flows are easier to handle manually</li>
        <li><strong>Test validation separately</strong> - Focus on form validation, then test login separately</li>
        <li><strong>Check post-login state</strong> - Verify protected pages work after login</li>
        <li><strong>Test error cases</strong> - Check what happens with invalid credentials</li>
      </ul>

      <h2>Limitations</h2>

      <ul>
        <li><strong>CAPTCHA blocks automation</strong> - Cannot automatically solve CAPTCHAs</li>
        <li><strong>MFA requires manual input</strong> - Multi-factor authentication needs human help</li>
        <li><strong>Session handling varies</strong> - Some apps require special session handling</li>
        <li><strong>OAuth flows are complex</strong> - Social login usually requires manual steps</li>
        <li><strong>Not exhaustive</strong> - Tests common flows, not every edge case</li>
      </ul>

      <h2>Example: Testing a Login Flow</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Step-by-Step Process:</div>
        <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Start exploration on <code>https://app.com/login</code></li>
          <li>AI finds email and password fields</li>
          <li>AI types test credentials</li>
          <li>AI checks for validation errors</li>
          <li>AI submits form</li>
          <li>If login succeeds: AI continues exploring authenticated pages</li>
          <li>If login fails: AI reports the error</li>
          <li>If CAPTCHA appears: Exploration marked as BLOCKED</li>
        </ol>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-signup-forms">Learn how to test sign-up forms</a></li>
        <li><a href="/docs/credentials-handling">Understand credential handling safely</a></li>
        <li><a href="/docs/captcha-mfa-limits">See CAPTCHA and MFA limitations</a></li>
      </ul>
    </article>
  )
}

