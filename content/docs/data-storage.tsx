export default function DataStorageContent() {
  return (
    <article>
      <h1>What Data Is Stored and What Is Not</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario stores test results, screenshots, and logs to help you understand what was found.</strong> We do NOT store credentials, sensitive form data, or personal information. All stored data is used only to provide test results and can be deleted at any time.
      </p>

      <h2>What IS Stored</h2>

      <h3>Test Results</h3>

      <ul>
        <li><strong>Screenshots</strong> - Visual evidence of pages and issues</li>
        <li><strong>Console logs</strong> - JavaScript errors and warnings</li>
        <li><strong>Network logs</strong> - HTTP request/response details (URLs, status codes, headers)</li>
        <li><strong>DOM snapshots</strong> - HTML structure at time of issues</li>
        <li><strong>Exploration steps</strong> - Sequence of actions taken</li>
      </ul>

      <h3>Metadata</h3>

      <ul>
        <li><strong>Test run information</strong> - URL tested, timestamp, duration</li>
        <li><strong>Issues found</strong> - List of problems detected</li>
        <li><strong>Test status</strong> - Success, failed, blocked, etc.</li>
        <li><strong>Browser/device info</strong> - What browser was used</li>
      </ul>

      <h3>Account Information</h3>

      <ul>
        <li><strong>User account</strong> - Your account details (email, plan, etc.)</li>
        <li><strong>Usage statistics</strong> - How many tests run, limits used</li>
        <li><strong>Project information</strong> - Projects you create</li>
      </ul>

      <h2>What Is NOT Stored</h2>

      <h3>Credentials</h3>

      <ul>
        <li><strong>Passwords</strong> - Never stored, not even encrypted</li>
        <li><strong>API keys</strong> - Never stored</li>
        <li><strong>Tokens</strong> - Authentication tokens not persisted (only session)</li>
        <li><strong>Secrets</strong> - Any sensitive credentials</li>
      </ul>

      <h3>Sensitive Form Data</h3>

      <ul>
        <li><strong>Payment information</strong> - Credit cards, billing details</li>
        <li><strong>Personal information</strong> - Names, addresses, phone numbers from forms</li>
        <li><strong>Private data</strong> - Any data entered into forms during testing</li>
      </ul>

      <h3>Request Bodies</h3>

      <p>
        Network logs include:
      </p>

      <ul>
        <li>URLs and status codes</li>
        <li>Response headers</li>
        <li>Request methods</li>
      </ul>

      <p>
        Network logs do NOT include:
      </p>

      <ul>
        <li>Request bodies with sensitive data</li>
        <li>Response bodies with personal information</li>
        <li>Authorization headers</li>
      </ul>

      <h2>Data Retention</h2>

      <h3>Test Results</h3>

      <ul>
        <li><strong>Stored until deleted</strong> - Results kept until you delete them</li>
        <li><strong>You can delete anytime</strong> - Delete individual results or all results</li>
        <li><strong>Automatic cleanup</strong> - Old results may be automatically deleted after period</li>
      </ul>

      <h3>Account Data</h3>

      <ul>
        <li><strong>Active accounts</strong> - Data kept while account is active</li>
        <li><strong>Deleted accounts</strong> - All data deleted when account is deleted</li>
        <li><strong>Compliance</strong> - Follows data retention policies</li>
      </ul>

      <h2>Data Usage</h2>

      <p>
        Stored data is used only for:
      </p>

      <ul>
        <li><strong>Displaying results</strong> - Showing you what was found</li>
        <li><strong>Historical analysis</strong> - Comparing results over time</li>
        <li><strong>Service improvement</strong> - Improving Rihario (anonymized)</li>
      </ul>

      <p>
        Stored data is NOT used for:
      </p>

      <ul>
        <li>Training AI models on your data</li>
        <li>Sharing with third parties</li>
        <li>Marketing or advertising</li>
        <li>Any purpose other than providing the service</li>
      </ul>

      <h2>Data Security</h2>

      <ul>
        <li><strong>Encrypted at rest</strong> - All stored data encrypted</li>
        <li><strong>Encrypted in transit</strong> - HTTPS for all connections</li>
        <li><strong>Access controls</strong> - Only you can access your data</li>
        <li><strong>Regular audits</strong> - Security practices reviewed regularly</li>
      </ul>

      <h2>Your Rights</h2>

      <ul>
        <li><strong>Access your data</strong> - Download or view all stored data</li>
        <li><strong>Delete your data</strong> - Remove test results anytime</li>
        <li><strong>Export data</strong> - Export results in standard formats</li>
        <li><strong>Account deletion</strong> - Delete account and all associated data</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Use test data</strong> - Never use real user data in tests</li>
        <li><strong>Test on staging</strong> - Use staging environments, not production</li>
        <li><strong>Regular cleanup</strong> - Delete old test results periodically</li>
        <li><strong>Review stored data</strong> - Check what's stored if concerned</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/credentials-handling">Learn how credentials are handled</a></li>
        <li><a href="/docs/browser-limitations">See browser and device limitations</a></li>
      </ul>
    </article>
  )
}

