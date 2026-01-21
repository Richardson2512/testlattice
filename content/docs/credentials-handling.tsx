export default function CredentialsHandlingContent() {
  return (
    <article>
      <h1>How Credentials Are Handled Safely</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario never stores your credentials permanently.</strong> If you provide credentials for testing (test accounts only), they're used only during exploration and then discarded. Credentials are transmitted securely and never logged or saved. Use test accounts, not production credentials.
      </p>

      <h2>Security Principles</h2>

      <ul>
        <li><strong>Never stored</strong> - Credentials are not saved to disk or database</li>
        <li><strong>In-memory only</strong> - Used during exploration, then discarded</li>
        <li><strong>Encrypted transmission</strong> - All data transmitted over HTTPS</li>
        <li><strong>No logging</strong> - Credentials never appear in logs</li>
        <li><strong>Test accounts only</strong> - Never use production credentials</li>
      </ul>

      <h2>How Credentials Are Used</h2>

      <h3>During Exploration</h3>

      <p>
        If you provide credentials (test accounts only):
      </p>

      <ol>
        <li>Credentials entered securely</li>
        <li>Transmitted over HTTPS to Rihario servers</li>
        <li>Used only during the active exploration session</li>
        <li>Discarded when exploration completes</li>
        <li>Never saved to disk or database</li>
      </ol>

      <h3>Manual Authentication</h3>

      <p>
        When you authenticate manually (recommended):
      </p>

      <ul>
        <li>You log in directly in the browser</li>
        <li>Rihario doesn't see your credentials</li>
        <li>Session cookies are used (standard browser behavior)</li>
        <li>Session discarded when exploration ends</li>
      </ul>

      <h2>Best Practices</h2>

      <h3>Use Test Accounts</h3>

      <ul>
        <li><strong>Never use production credentials</strong> - Always use test accounts</li>
        <li><strong>Create dedicated test accounts</strong> - Separate from real user accounts</li>
        <li><strong>Limited permissions</strong> - Test accounts should have minimal permissions</li>
        <li><strong>Regular rotation</strong> - Change test account passwords regularly</li>
      </ul>

      <h3>Manual Authentication Preferred</h3>

      <ul>
        <li><strong>More secure</strong> - You control the authentication</li>
        <li><strong>No credential sharing</strong> - Credentials never leave your browser</li>
        <li><strong>Works with complex auth</strong> - Handles MFA, OAuth, etc.</li>
        <li><strong>Recommended approach</strong> - Best for most use cases</li>
      </ul>

      <h2>What Gets Stored</h2>

      <p>
        Rihario stores:
      </p>

      <ul>
        <li><strong>Test results</strong> - Screenshots, logs, issues found</li>
        <li><strong>Exploration metadata</strong> - URLs, timestamps, status</li>
        <li><strong>Evidence</strong> - Console logs, network requests (no credentials in URLs)</li>
      </ul>

      <p>
        Rihario does NOT store:
      </p>

      <ul>
        <li>Passwords or API keys</li>
        <li>Authentication tokens (beyond session)</li>
        <li>Form data entered (if sensitive)</li>
        <li>Personal information from forms</li>
      </ul>

      <h2>Data Transmission</h2>

      <h3>HTTPS Encryption</h3>

      <p>
        All data transmitted securely:
      </p>

      <ul>
        <li>HTTPS encryption for all connections</li>
        <li>TLS 1.2+ required</li>
        <li>Encrypted in transit</li>
      </ul>

      <h3>API Security</h3>

      <p>
        API requests are secured:
      </p>

      <ul>
        <li>Authenticated API requests</li>
        <li>Rate limiting to prevent abuse</li>
        <li>No credentials in API URLs or logs</li>
      </ul>

      <h2>Limitations</h2>

      <ul>
        <li><strong>Session-based only</strong> - Cannot persist credentials between sessions</li>
        <li><strong>Manual auth for complex flows</strong> - MFA, OAuth require manual steps</li>
        <li><strong>Test environment recommended</strong> - Use test environments when possible</li>
      </ul>

      <h2>Privacy Considerations</h2>

      <ul>
        <li><strong>Test data only</strong> - Never use real user data</li>
        <li><strong>Staging environments</strong> - Test on staging, not production</li>
        <li><strong>Sensitive data</strong> - Be cautious with any sensitive information</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/data-storage">Learn what data is stored</a></li>
        <li><a href="/docs/test-login-flows">See how to test login flows safely</a></li>
        <li><a href="/docs/captcha-mfa-limits">Understand CAPTCHA and MFA limitations</a></li>
      </ul>
    </article>
  )
}

