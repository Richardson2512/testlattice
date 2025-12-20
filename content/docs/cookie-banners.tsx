export default function CookieBannersContent() {
  return (
    <article>
      <h1>How Cookie Banners Are Handled</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario automatically detects cookie banners and attempts to dismiss them during exploration.</strong> The AI looks for common cookie consent patterns and clicks "Accept" or "OK" buttons. If it can't dismiss the banner automatically, exploration may be marked as BLOCKED.
      </p>

      <h2>How Cookie Banner Detection Works</h2>

      <p>
        When a page loads, the AI checks for cookie banners:
      </p>

      <ol>
        <li><strong>Visual detection</strong> - Looks for cookie consent overlays or banners</li>
        <li><strong>Text pattern matching</strong> - Identifies common cookie consent text</li>
        <li><strong>Button identification</strong> - Finds "Accept", "OK", "I Agree", or similar buttons</li>
        <li><strong>Automatic dismissal</strong> - Clicks the dismiss button if found</li>
        <li><strong>Verification</strong> - Confirms banner is dismissed before continuing</li>
      </ol>

      <h2>What Gets Detected</h2>

      <h3>Common Cookie Banner Patterns</h3>

      <ul>
        <li><strong>Bottom banners</strong> - Cookie notices at bottom of page</li>
        <li><strong>Top banners</strong> - Cookie notices at top of page</li>
        <li><strong>Modal overlays</strong> - Cookie consent modals/popups</li>
        <li><strong>Side panels</strong> - Cookie preferences panels</li>
      </ul>

      <h3>Common Button Text</h3>

      <p>
        The AI recognizes these button patterns:
      </p>

      <ul>
        <li>"Accept" / "Accept All"</li>
        <li>"OK" / "Okay"</li>
        <li>"I Agree" / "Agree"</li>
        <li>"Allow" / "Allow All"</li>
        <li>"Continue"</li>
        <li>"Got it"</li>
        <li>Other common consent phrases</li>
      </ul>

      <h2>When Auto-Dismissal Works</h2>

      <p>
        Cookie banners are automatically dismissed when:
      </p>

      <ul>
        <li><strong>Standard patterns</strong> - Banner follows common cookie consent patterns</li>
        <li><strong>Clear buttons</strong> - "Accept" or similar button is clearly visible</li>
        <li><strong>Simple implementation</strong> - Banner doesn't require complex interactions</li>
        <li><strong>No customization</strong> - Standard cookie consent libraries (OneTrust, Cookiebot, etc.)</li>
      </ul>

      <h2>When Auto-Dismissal Fails</h2>

      <p>
        Cookie banners cannot be dismissed automatically when:
      </p>

      <ul>
        <li><strong>Custom implementations</strong> - Non-standard cookie banner designs</li>
        <li><strong>Complex interactions</strong> - Requires scrolling, selecting preferences, etc.</li>
        <li><strong>Unclear buttons</strong> - Button text doesn't match common patterns</li>
        <li><strong>Multiple steps</strong> - Requires multiple clicks or interactions</li>
        <li><strong>CAPTCHA integration</strong> - Cookie banner includes CAPTCHA</li>
        <li><strong>Dynamic loading</strong> - Banner loads after initial page load</li>
      </ul>

      <h2>What Happens When Dismissal Fails</h2>

      <h3>Option 1: Manual Intervention</h3>

      <p>
        If auto-dismissal fails, you can:
      </p>

      <ol>
        <li>Pause the exploration</li>
        <li>Take control</li>
        <li>Manually dismiss the cookie banner</li>
        <li>Resume exploration</li>
      </ol>

      <h3>Option 2: BLOCKED Status</h3>

      <p>
        If the banner blocks all interaction and can't be dismissed, exploration may be marked as BLOCKED. This means:
      </p>

      <ul>
        <li>Exploration stops</li>
        <li>Status shows as BLOCKED</li>
        <li>You can see what blocked it (cookie banner)</li>
        <li>You can manually dismiss and retry</li>
      </ul>

      <h2>Cookie Preferences</h2>

      <h3>What Gets Selected</h3>

      <p>
        When dismissing cookie banners, the AI:
      </p>

      <ul>
        <li><strong>Accepts all cookies</strong> - Clicks "Accept All" if available</li>
        <li><strong>Minimal interaction</strong> - Takes fastest path to dismiss</li>
        <li><strong>No preference customization</strong> - Doesn't customize cookie preferences</li>
      </ul>

      <h3>Why Accept All?</h3>

      <p>
        Rihario accepts all cookies to:
      </p>

      <ul>
        <li>Minimize interactions (faster dismissal)</li>
        <li>Enable full site functionality</li>
        <li>Test the site as most users would see it</li>
      </ul>

      <p>
        If you need to test with specific cookie preferences, dismiss the banner manually after taking control.
      </p>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Let AI try first</strong> - Most standard cookie banners are dismissed automatically</li>
        <li><strong>Monitor for blockers</strong> - Watch the live view to see if dismissal worked</li>
        <li><strong>Intervene when needed</strong> - If blocked, pause and dismiss manually</li>
        <li><strong>Report issues</strong> - If your cookie banner isn't detected, let us know</li>
      </ul>

      <h2>Common Cookie Banner Libraries</h2>

      <p>
        Rihario works best with common cookie consent libraries:
      </p>

      <ul>
        <li><strong>OneTrust</strong> - Usually auto-dismissed</li>
        <li><strong>Cookiebot</strong> - Usually auto-dismissed</li>
        <li><strong>Osano</strong> - Usually auto-dismissed</li>
        <li><strong>CookieYes</strong> - Usually auto-dismissed</li>
        <li><strong>Custom implementations</strong> - May require manual dismissal</li>
      </ul>

      <h2>Example Scenarios</h2>

      <h3>Scenario 1: Standard Cookie Banner</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>1.</strong> Page loads</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>2.</strong> Cookie banner detected at bottom</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>3.</strong> AI finds "Accept All Cookies" button</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>4.</strong> AI clicks button</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>5.</strong> Banner dismissed</div>
          <div><strong>6.</strong> Exploration continues</div>
        </div>
      </div>

      <h3>Scenario 2: Complex Cookie Banner</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>1.</strong> Page loads</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>2.</strong> Cookie banner detected</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>3.</strong> AI cannot find standard dismiss button</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>4.</strong> Exploration marked as BLOCKED</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>5.</strong> You pause and take control</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>6.</strong> You manually dismiss banner</div>
          <div><strong>7.</strong> You resume exploration</div>
        </div>
      </div>

      <h2>Limitations</h2>

      <ul>
        <li><strong>Not 100% reliable</strong> - Custom banners may not be detected</li>
        <li><strong>No preference customization</strong> - Always accepts all cookies</li>
        <li><strong>May miss dynamic banners</strong> - Banners loaded after initial page load</li>
        <li><strong>Complex flows</strong> - Multi-step cookie preferences may not work</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/skipped-blocked-steps">Learn about BLOCKED status</a></li>
        <li><a href="/docs/human-in-the-loop">See how to take control manually</a></li>
        <li><a href="/docs/captcha-mfa-limits">Understand other blockers</a></li>
      </ul>
    </article>
  )
}

