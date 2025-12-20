export default function SkippedBlockedStepsContent() {
  return (
    <article>
      <h1>Why Some Steps Are Skipped or Blocked</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario marks steps as SKIPPED or BLOCKED when the AI cannot proceed.</strong> SKIPPED means the step was intentionally skipped for safety or efficiency. BLOCKED means exploration hit an insurmountable obstacle. Understanding these statuses helps you interpret results correctly.
      </p>

      <h2>SKIPPED Steps</h2>

      <p>
        Steps are marked as SKIPPED when:
      </p>

      <h3>Safety Guards Trigger</h3>

      <ul>
        <li><strong>Infinite loop detected</strong> - Same page loaded multiple times without progress</li>
        <li><strong>Redirect loop</strong> - Endless redirects detected</li>
        <li><strong>Time limit reached</strong> - Action taking too long, skipped to prevent hanging</li>
        <li><strong>Retry limit exceeded</strong> - Failed multiple times, giving up</li>
      </ul>

      <h3>Efficiency Optimizations</h3>

      <ul>
        <li><strong>Similar actions already performed</strong> - Already clicked similar buttons, skipping duplicates</li>
        <li><strong>Low-value exploration</strong> - Element doesn't add value to exploration</li>
        <li><strong>Already explored</strong> - Page or flow already checked</li>
      </ul>

      <h3>Example: SKIPPED Step</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Step 12: SKIPPED</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Action: Click "Terms of Service" link
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Reason: Similar legal page already explored (Privacy Policy). Skipped to optimize exploration time.
          </div>
        </div>
      </div>

      <h2>BLOCKED Steps</h2>

      <p>
        Steps are marked as BLOCKED when:
      </p>

      <h3>1. CAPTCHA Encountered</h3>

      <p>
        The AI cannot solve CAPTCHAs. When encountered:
      </p>

      <ul>
        <li>Exploration stops</li>
        <li>Status marked as BLOCKED</li>
        <li>Reason: "CAPTCHA detected"</li>
        <li>You can take control to solve manually</li>
      </ul>

      <h3>2. Multi-Factor Authentication (MFA)</h3>

      <p>
        MFA prompts require human input:
      </p>

      <ul>
        <li>Exploration stops</li>
        <li>Status marked as BLOCKED</li>
        <li>Reason: "MFA prompt detected"</li>
        <li>You can authenticate manually, then resume</li>
      </ul>

      <h3>3. Cookie Banner That Can't Be Dismissed</h3>

      <p>
        Some cookie banners cannot be auto-dismissed:
      </p>

      <ul>
        <li>Custom implementations not recognized</li>
        <li>Complex multi-step consent flows</li>
        <li>Banners that block all interaction</li>
        <li>Exploration marked as BLOCKED</li>
        <li>You can dismiss manually, then resume</li>
      </ul>

      <h3>4. Authentication Required</h3>

      <p>
        Protected pages that require login:
      </p>

      <ul>
        <li>No valid session</li>
        <li>Login prompt encountered</li>
        <li>Exploration may be BLOCKED or paused</li>
        <li>You can authenticate manually</li>
      </ul>

      <h3>5. Age Verification or Paywall</h3>

      <p>
        Content gates that block access:
      </p>

      <ul>
        <li>Age verification screens</li>
        <li>Subscription paywalls</li>
        <li>Payment required screens</li>
        <li>Exploration marked as BLOCKED</li>
      </ul>

      <h3>Example: BLOCKED Step</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--error)' }}>Step 8: BLOCKED</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Action: Submit contact form
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Reason: CAPTCHA detected after form submission. Cannot proceed automatically.
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Solution: Take control to solve CAPTCHA manually, then resume exploration.
          </div>
        </div>
      </div>

      <h2>FAILED vs BLOCKED</h2>

      <p>
        It's important to distinguish:
      </p>

      <ul>
        <li><strong>FAILED</strong> - Something broke (JavaScript error, network failure, etc.)</li>
        <li><strong>BLOCKED</strong> - Hit an intentional blocker (CAPTCHA, MFA, etc.)</li>
      </ul>

      <p>
        BLOCKED isn't necessarily a problem with your app - it's an intentional security measure that prevents automation. FAILED indicates an actual problem.
      </p>

      <p>
        See <a href="/docs/failed-vs-blocked">What FAILED vs BLOCKED vs SKIPPED Means</a> for detailed comparison.
      </p>

      <h2>How to Handle Blockers</h2>

      <h3>Option 1: Take Control</h3>

      <ol>
        <li>Pause the exploration when it gets blocked</li>
        <li>Click "Take Control"</li>
        <li>Handle the blocker manually (solve CAPTCHA, authenticate, etc.)</li>
        <li>Resume exploration</li>
        <li>AI continues from where you left off</li>
      </ol>

      <h3>Option 2: Start from Different State</h3>

      <p>
        If blockers are consistent:
      </p>

      <ul>
        <li>Authenticate manually first (in your browser)</li>
        <li>Start exploration from an already-authenticated page</li>
        <li>Avoid the blocker entirely</li>
      </ul>

      <h3>Option 3: Use Test Environment</h3>

      <p>
        For testing:
      </p>

      <ul>
        <li>Disable CAPTCHAs in staging/test environments</li>
        <li>Use test accounts without MFA</li>
        <li>Remove paywalls or age gates in test environments</li>
        <li>Then run Rihario on the test environment</li>
      </ul>

      <h2>Common Blocker Scenarios</h2>

      <h3>Scenario 1: Contact Form with CAPTCHA</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>What happens:</strong></div>
          <div style={{ marginBottom: '0.5rem' }}>1. AI fills contact form</div>
          <div style={{ marginBottom: '0.5rem' }}>2. Clicks submit</div>
          <div style={{ marginBottom: '0.5rem' }}>3. CAPTCHA appears</div>
          <div style={{ marginBottom: '0.5rem' }}>4. Exploration marked as BLOCKED</div>
          <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong>Solution:</strong></div>
          <div>Take control, solve CAPTCHA, resume. Or test form without CAPTCHA in staging.</div>
        </div>
      </div>

      <h3>Scenario 2: Login Flow with MFA</h3>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>What happens:</strong></div>
          <div style={{ marginBottom: '0.5rem' }}>1. AI fills login form</div>
          <div style={{ marginBottom: '0.5rem' }}>2. Submits credentials</div>
          <div style={{ marginBottom: '0.5rem' }}>3. MFA prompt appears</div>
          <div style={{ marginBottom: '0.5rem' }}>4. Exploration marked as BLOCKED</div>
          <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong>Solution:</strong></div>
          <div>Use test account without MFA. Or take control to authenticate manually.</div>
        </div>
      </div>

      <h2>Preventing Blockers</h2>

      <p>
        To minimize blockers:
      </p>

      <ul>
        <li><strong>Use staging environments</strong> - Disable CAPTCHAs and MFA in test environments</li>
        <li><strong>Test accounts</strong> - Create accounts specifically for testing</li>
        <li><strong>Manual pre-auth</strong> - Authenticate manually before starting exploration</li>
        <li><strong>White-list IPs</strong> - If possible, whitelist Rihario servers</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/failed-vs-blocked">Learn the difference between FAILED and BLOCKED</a></li>
        <li><a href="/docs/cookie-banners">See how cookie banners are handled</a></li>
        <li><a href="/docs/captcha-mfa-limits">Understand CAPTCHA and MFA limitations</a></li>
      </ul>
    </article>
  )
}

