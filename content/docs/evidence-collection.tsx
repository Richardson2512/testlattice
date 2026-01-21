export default function EvidenceCollectionContent() {
  return (
    <article>
      <h1>How Evidence Is Collected (Screenshots, Logs, DOM)</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario automatically captures evidence when issues are detected: screenshots show what the page looked like, logs show what errors occurred, and DOM snapshots show the HTML structure.</strong> This evidence helps you understand what went wrong and verify findings.
      </p>

      <h2>Types of Evidence</h2>

      <h3>1. Screenshots</h3>

      <p>
        Screenshots capture the visual state of the page:
      </p>

      <ul>
        <li><strong>Full-page screenshots</strong> - Entire page, scrolled content included</li>
        <li><strong>Viewport screenshots</strong> - What's visible in the browser viewport</li>
        <li><strong>Element screenshots</strong> - Specific elements (buttons, forms, etc.)</li>
        <li><strong>Before/after screenshots</strong> - State before and after actions</li>
      </ul>

      <h3>2. Console Logs</h3>

      <p>
        Console logs capture JavaScript errors and warnings:
      </p>

      <ul>
        <li><strong>Error messages</strong> - JavaScript exceptions</li>
        <li><strong>Warning messages</strong> - Non-fatal warnings</li>
        <li><strong>Stack traces</strong> - Where errors occurred in code</li>
        <li><strong>Timestamps</strong> - When errors occurred</li>
      </ul>

      <h3>3. Network Logs</h3>

      <p>
        Network logs capture HTTP request/response details:
      </p>

      <ul>
        <li><strong>Request details</strong> - URL, method, headers, body</li>
        <li><strong>Response details</strong> - Status code, headers, body</li>
        <li><strong>Failed requests</strong> - Network errors, timeouts</li>
        <li><strong>Timing information</strong> - Request duration, latency</li>
      </ul>

      <h3>4. DOM Snapshots</h3>

      <p>
        DOM snapshots capture the HTML structure:
      </p>

      <ul>
        <li><strong>HTML structure</strong> - Current DOM state</li>
        <li><strong>Element attributes</strong> - IDs, classes, data attributes</li>
        <li><strong>Text content</strong> - Visible text in elements</li>
        <li><strong>Structure at time of issue</strong> - What HTML looked like when problem occurred</li>
      </ul>

      <h2>When Evidence Is Collected</h2>

      <h3>On Issue Detection</h3>

      <p>
        Evidence is automatically captured when:
      </p>

      <ul>
        <li><strong>Console error detected</strong> - Screenshot + console logs</li>
        <li><strong>Network error detected</strong> - Screenshot + network logs</li>
        <li><strong>UI issue detected</strong> - Screenshot + DOM snapshot</li>
        <li><strong>Step fails</strong> - Screenshot + all available logs</li>
      </ul>

      <h3>At Key Moments</h3>

      <p>
        Evidence is also captured at:
      </p>

      <ul>
        <li><strong>Page loads</strong> - Initial page state</li>
        <li><strong>Form submissions</strong> - Before and after submission</li>
        <li><strong>Navigation events</strong> - When navigating to new pages</li>
        <li><strong>User-specified moments</strong> - If you requested specific screenshots</li>
      </ul>

      <h2>How Evidence Is Organized</h2>

      <h3>By Step</h3>

      <p>
        Each step in the log includes:
      </p>

      <ul>
        <li>Screenshot of page state</li>
        <li>Relevant logs for that step</li>
        <li>DOM snapshot if needed</li>
      </ul>

      <h3>By Issue</h3>

      <p>
        Each issue includes:
      </p>

      <ul>
        <li>Screenshot showing the problem</li>
        <li>Evidence relevant to that issue</li>
        <li>Step where issue occurred</li>
        <li>All related logs</li>
      </ul>

      <h2>Using Evidence</h2>

      <h3>Verify Issues</h3>

      <p>
        Use evidence to verify reported issues are real:
      </p>

      <ul>
        <li>Look at screenshots to see visual problems</li>
        <li>Read console logs to understand JavaScript errors</li>
        <li>Check network logs to see failed requests</li>
        <li>Inspect DOM snapshots to understand structure</li>
      </ul>

      <h3>Debug Problems</h3>

      <p>
        Evidence helps you debug:
      </p>

      <ul>
        <li>Console logs show where code broke</li>
        <li>Network logs show what API calls failed</li>
        <li>Screenshots show visual state when problem occurred</li>
        <li>DOM snapshots show HTML structure issues</li>
      </ul>

      <h3>Generate Fix Prompts</h3>

      <p>
        Evidence is used to generate fix prompts:
      </p>

      <ul>
        <li>Console errors → Fix prompts with error details</li>
        <li>Network errors → Fix prompts with request details</li>
        <li>UI issues → Fix prompts with screenshot analysis</li>
      </ul>

      <h2>Evidence Limitations</h2>

      <ul>
        <li><strong>Screenshots are static</strong> - Don't show animations or interactions</li>
        <li><strong>Logs are snapshots</strong> - Only capture what was logged at that moment</li>
        <li><strong>DOM snapshots don't include scripts</strong> - Only HTML structure, not JavaScript state</li>
        <li><strong>Not everything is captured</strong> - Some evidence might be missed</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/reading-test-logs">Learn how to read test logs</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts from evidence</a></li>
        <li><a href="/docs/error-types">Understand different error types</a></li>
      </ul>
    </article>
  )
}

