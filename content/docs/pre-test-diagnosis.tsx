export default function PreTestDiagnosisContent() {
  return (
    <article>
      <h1>Pre-Test Diagnosis: What Can and Can't Be Tested</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Before exploration begins, Rihario analyzes your page to understand what can be tested and what might block testing.</strong> This diagnosis phase identifies testable elements, detects blockers, and assesses page complexity. It helps the AI plan exploration and avoid wasting time on untestable pages.
      </p>

      <h2>What Happens During Diagnosis</h2>

      <p>
        The diagnosis phase (typically 5-10 seconds) analyzes:
      </p>

      <ol>
        <li><strong>Page structure</strong> - What's on the page</li>
        <li><strong>Interactive elements</strong> - What can be clicked, typed, or interacted with</li>
        <li><strong>Potential blockers</strong> - What might prevent testing</li>
        <li><strong>Page complexity</strong> - How much exploration is needed</li>
        <li><strong>Testability assessment</strong> - Can this page be effectively tested?</li>
      </ol>

      <h2>What Gets Diagnosed</h2>

      <h3>1. Page Structure Analysis</h3>

      <p>
        The AI analyzes the page structure:
      </p>

      <ul>
        <li><strong>Layout</strong> - Header, content, footer, navigation</li>
        <li><strong>Content types</strong> - Forms, buttons, links, images, text</li>
        <li><strong>Interactive elements</strong> - What users can click or type</li>
        <li><strong>Page purpose</strong> - Landing page, form, dashboard, etc.</li>
      </ul>

      <h3>2. Testable Elements Identification</h3>

      <p>
        The AI identifies what can be tested:
      </p>

      <ul>
        <li><strong>Forms</strong> - Signup, login, contact, checkout forms</li>
        <li><strong>Buttons</strong> - Primary actions, navigation buttons</li>
        <li><strong>Links</strong> - Internal navigation, external links</li>
        <li><strong>Input fields</strong> - Text, email, password, select fields</li>
        <li><strong>Interactive components</strong> - Dropdowns, modals, tabs</li>
      </ul>

      <h3>3. Blocker Detection</h3>

      <p>
        The AI checks for things that might block testing:
      </p>

      <ul>
        <li><strong>CAPTCHA</strong> - Cannot proceed if CAPTCHA is required</li>
        <li><strong>MFA prompts</strong> - Multi-factor authentication blocks automation</li>
        <li><strong>Cookie banners</strong> - May need to be dismissed (see <a href="/docs/cookie-banners">Cookie Banner Handling</a>)</li>
        <li><strong>Auth prompts</strong> - Login screens that block access</li>
        <li><strong>Age gates</strong> - Age verification screens</li>
        <li><strong>Paywalls</strong> - Subscription or payment required</li>
      </ul>

      <h3>4. Page Complexity Assessment</h3>

      <p>
        The AI estimates how complex the page is:
      </p>

      <ul>
        <li><strong>Simple pages</strong> - Few interactive elements, quick exploration</li>
        <li><strong>Medium pages</strong> - Multiple forms or sections, moderate exploration</li>
        <li><strong>Complex pages</strong> - Many interactive elements, extensive exploration needed</li>
        <li><strong>Single-page apps</strong> - Dynamic content, may need more exploration</li>
      </ul>

      <h2>What Can Be Tested</h2>

      <h3>✅ Testable Pages</h3>

      <ul>
        <li><strong>Public pages</strong> - Landing pages, marketing pages, documentation</li>
        <li><strong>Forms</strong> - Contact forms, signup forms, search forms</li>
        <li><strong>Navigation</strong> - Menu systems, links, site structure</li>
        <li><strong>Public content</strong> - Blogs, articles, product pages</li>
        <li><strong>Staging environments</strong> - If publicly accessible</li>
        <li><strong>Protected pages</strong> - If you authenticate manually first</li>
      </ul>

      <h3>✅ Testable Elements</h3>

      <ul>
        <li>Forms and form validation</li>
        <li>Buttons and click handlers</li>
        <li>Navigation links</li>
        <li>Visual layouts</li>
        <li>Console errors</li>
        <li>Network errors</li>
        <li>Accessibility basics</li>
      </ul>

      <h2>What Can't Be Tested</h2>

      <h3>❌ Blocked by Design</h3>

      <ul>
        <li><strong>CAPTCHA-protected pages</strong> - Cannot solve CAPTCHAs automatically</li>
        <li><strong>MFA-protected flows</strong> - Requires human input</li>
        <li><strong>Age verification</strong> - Requires human confirmation</li>
        <li><strong>Payment required</strong> - Can't enter payment information</li>
      </ul>

      <h3>❌ Not Accessible</h3>

      <ul>
        <li><strong>Localhost</strong> - Must be publicly accessible URL</li>
        <li><strong>VPN-only sites</strong> - Must be accessible from public internet</li>
        <li><strong>IP-restricted sites</strong> - Must allow access from Rihario servers</li>
        <li><strong>Behind firewall</strong> - Must be publicly accessible</li>
      </ul>

      <h3>❌ Beyond Scope</h3>

      <ul>
        <li><strong>Email verification</strong> - Cannot access email inboxes</li>
        <li><strong>SMS verification</strong> - Cannot receive SMS codes</li>
        <li><strong>Third-party OAuth</strong> - Complex OAuth flows may require manual steps</li>
        <li><strong>File uploads</strong> - Limited file upload testing</li>
      </ul>

      <h2>Diagnosis Results</h2>

      <p>
        After diagnosis, the AI knows:
      </p>

      <ul>
        <li><strong>Can proceed</strong> - Page is testable, exploration will start</li>
        <li><strong>Has blockers</strong> - CAPTCHA or other blocker detected, may need manual help</li>
        <li><strong>Limited testability</strong> - Page can be tested but with limitations</li>
        <li><strong>Requires authentication</strong> - Page is protected, may need manual login</li>
      </ul>

      <h2>How Diagnosis Affects Exploration</h2>

      <h3>If Page Is Testable</h3>

      <p>
        Exploration proceeds normally:
      </p>

      <ul>
        <li>AI explores all identified interactive elements</li>
        <li>Follows natural user flows</li>
        <li>Tests forms and validation</li>
        <li>Checks for issues</li>
      </ul>

      <h3>If Blockers Detected</h3>

      <p>
        AI adjusts strategy:
      </p>

      <ul>
        <li><strong>Cookie banners</strong> - Attempts to dismiss automatically</li>
        <li><strong>Auth prompts</strong> - May pause for manual authentication</li>
        <li><strong>CAPTCHA</strong> - Marks exploration as BLOCKED, waits for manual intervention</li>
        <li><strong>Age gates</strong> - May attempt to proceed or mark as BLOCKED</li>
      </ul>

      <h3>If Limited Testability</h3>

      <p>
        AI focuses on what's testable:
      </p>

      <ul>
        <li>Tests accessible elements</li>
        <li>Reports what couldn't be tested</li>
        <li>Marks limitations clearly</li>
      </ul>

      <h2>Example Diagnosis Scenarios</h2>

      <h3>Scenario 1: Simple Landing Page</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Diagnosis Result:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>✅ Page structure: Simple landing page</li>
          <li>✅ Interactive elements: 5 links, 1 CTA button, 1 contact form</li>
          <li>✅ No blockers detected</li>
          <li>✅ Complexity: Low - quick exploration</li>
          <li>✅ Result: Ready to test</li>
        </ul>
      </div>

      <h3>Scenario 2: E-commerce Site with Cookie Banner</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Diagnosis Result:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>✅ Page structure: Product catalog</li>
          <li>✅ Interactive elements: Navigation, product links, search form, cart</li>
          <li>⚠️ Blocker detected: Cookie banner present</li>
          <li>✅ Complexity: Medium</li>
          <li>✅ Result: Will attempt to dismiss banner, then proceed</li>
        </ul>
      </div>

      <h3>Scenario 3: Protected Dashboard</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Diagnosis Result:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>✅ Page structure: Dashboard detected</li>
          <li>❌ Blocker: Authentication required</li>
          <li>⚠️ Limited testability: Cannot access protected content</li>
          <li>✅ Result: Will pause for manual authentication</li>
        </ul>
      </div>

      <h2>Why Diagnosis Matters</h2>

      <h3>Prevents Wasted Time</h3>

      <p>
        Diagnosis identifies blockers early, so the AI doesn't waste time trying to test untestable pages.
      </p>

      <h3>Better Planning</h3>

      <p>
        Understanding page structure helps the AI plan exploration more effectively.
      </p>

      <h3>Clearer Expectations</h3>

      <p>
        You know upfront what can and can't be tested, setting proper expectations.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/cookie-banners">Learn how cookie banners are handled</a></li>
        <li><a href="/docs/skipped-blocked-steps">Understand skipped and blocked steps</a></li>
        <li><a href="/docs/captcha-mfa-limits">See CAPTCHA and MFA limitations</a></li>
      </ul>
    </article>
  )
}

