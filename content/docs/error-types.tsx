export default function ErrorTypesContent() {
  return (
    <article>
      <h1>Console Errors vs Network Errors vs UI Issues</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario categorizes issues into three types: console errors (JavaScript problems), network errors (API/request failures), and UI issues (visual/layout problems).</strong> Understanding the difference helps you prioritize fixes and know where to look for solutions.
      </p>

      <h2>Console Errors</h2>

      <h3>What They Are</h3>

      <p>
        Console errors are JavaScript errors logged to the browser console:
      </p>

      <ul>
        <li>JavaScript exceptions</li>
        <li>Type errors, reference errors, etc.</li>
        <li>Runtime errors in your code</li>
        <li>Third-party library errors</li>
      </ul>

      <h3>Common Examples</h3>

      <ul>
        <li><code>Cannot read property 'value' of null</code></li>
        <li><code>Uncaught TypeError: ... is not a function</code></li>
        <li><code>Failed to load resource</code></li>
        <li><code>Unhandled promise rejection</code></li>
      </ul>

      <h3>What They Indicate</h3>

      <p>
        Console errors usually mean:
      </p>

      <ul>
        <li><strong>Bug in your code</strong> - Something broke in JavaScript</li>
        <li><strong>Missing dependency</strong> - Library or resource failed to load</li>
        <li><strong>Runtime error</strong> - Code executed but hit an error</li>
      </ul>

      <h2>Network Errors</h2>

      <h3>What They Are</h3>

      <p>
        Network errors are failed HTTP requests:
      </p>

      <ul>
        <li>API requests that failed</li>
        <li>404 Not Found errors</li>
        <li>500 Server errors</li>
        <li>Timeout errors</li>
        <li>CORS errors</li>
      </ul>

      <h3>Common Examples</h3>

      <ul>
        <li><code>404 Not Found</code> - Resource doesn't exist</li>
        <li><code>500 Internal Server Error</code> - Server error</li>
        <li><code>Network timeout</code> - Request took too long</li>
        <li><code>CORS policy blocked</code> - Cross-origin request blocked</li>
      </ul>

      <h3>What They Indicate</h3>

      <p>
        Network errors usually mean:
      </p>

      <ul>
        <li><strong>Backend issue</strong> - API or server problem</li>
        <li><strong>Missing resource</strong> - File or endpoint doesn't exist</li>
        <li><strong>Infrastructure problem</strong> - Server down or slow</li>
        <li><strong>Configuration issue</strong> - CORS or routing misconfigured</li>
      </ul>

      <h2>UI Issues</h2>

      <h3>What They Are</h3>

      <p>
        UI issues are visual or layout problems:
      </p>

      <ul>
        <li>Broken layouts</li>
        <li>Overlapping elements</li>
        <li>Missing styles</li>
        <li>Visual regressions</li>
        <li>Responsive design issues</li>
      </ul>

      <h3>Common Examples</h3>

      <ul>
        <li>Elements overlapping when they shouldn't</li>
        <li>Content cut off or overflowing</li>
        <li>Buttons not visible or clickable</li>
        <li>Forms with broken validation styling</li>
        <li>Text unreadable (low contrast)</li>
      </ul>

      <h3>What They Indicate</h3>

      <p>
        UI issues usually mean:
      </p>

      <ul>
        <li><strong>CSS problem</strong> - Styles broken or missing</li>
        <li><strong>Layout bug</strong> - CSS layout issue</li>
        <li><strong>Responsive issue</strong> - Doesn't work on certain screen sizes</li>
        <li><strong>Visual regression</strong> - Design changed unintentionally</li>
      </ul>

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
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Location</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Severity</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Console Error</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Browser console</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>High (breaks functionality)</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fix JavaScript code</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Network Error</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Network tab</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>High (breaks functionality)</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fix backend/API</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>UI Issue</td>
              <td style={{ padding: '0.75rem' }}>Visual/rendered page</td>
              <td style={{ padding: '0.75rem' }}>Medium (breaks UX)</td>
              <td style={{ padding: '0.75rem' }}>Fix CSS/layout</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to Fix Each Type</h2>

      <h3>Fixing Console Errors</h3>

      <ol>
        <li>Open browser DevTools console</li>
        <li>Reproduce the error</li>
        <li>Read the error message</li>
        <li>Check the stack trace</li>
        <li>Fix the JavaScript code</li>
        <li>Test the fix</li>
      </ol>

      <h3>Fixing Network Errors</h3>

      <ol>
        <li>Open browser DevTools Network tab</li>
        <li>Find the failed request</li>
        <li>Check response status and body</li>
        <li>Fix the backend/API</li>
        <li>Check server logs</li>
        <li>Test the fix</li>
      </ol>

      <h3>Fixing UI Issues</h3>

      <ol>
        <li>Review the screenshot</li>
        <li>Inspect the element in DevTools</li>
        <li>Check CSS styles</li>
        <li>Fix layout/CSS</li>
        <li>Test on different viewports</li>
        <li>Verify the fix</li>
      </ol>

      <h2>Priority</h2>

      <p>
        Generally, prioritize fixes in this order:
      </p>

      <ol>
        <li><strong>Console errors</strong> - Break functionality, need immediate fix</li>
        <li><strong>Network errors</strong> - Break functionality, need immediate fix</li>
        <li><strong>UI issues</strong> - Break UX, but app still works</li>
      </ol>

      <p>
        However, prioritize based on impact:
      </p>

      <ul>
        <li><strong>High-impact UI issues</strong> - Might be more urgent than low-impact console errors</li>
        <li><strong>Critical flows</strong> - Errors in checkout more urgent than errors in footer</li>
        <li><strong>User-facing</strong> - UI issues visible to users might need quick fixes</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts from errors</a></li>
        <li><a href="/docs/evidence-collection">See how evidence is collected</a></li>
        <li><a href="/docs/understanding-first-result">Understand test results</a></li>
      </ul>
    </article>
  )
}

