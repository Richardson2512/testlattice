export default function VisualTestingContent() {
  return (
    <article>
      <h1>How to Do Visual Testing with AI</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Visual testing checks if your app looks correct - no broken layouts, overlapping elements, or visual regressions.</strong> Rihario automatically detects visual issues during exploration. You don't need to write visual test scripts or maintain baseline images.
      </p>

      <h2>How It Works</h2>

      <p>
        When you run an exploration, the AI automatically:
      </p>

      <ul>
        <li><strong>Captures screenshots</strong> - Takes screenshots at key moments during exploration</li>
        <li><strong>Analyzes layouts</strong> - Detects broken CSS, overlapping elements, misaligned components</li>
        <li><strong>Compares visually</strong> - Compares current state to what it expects to see</li>
        <li><strong>Flags issues</strong> - Reports visual problems with evidence</li>
      </ul>

      <p>
        No baseline images to maintain. No visual diff configuration. The AI understands what "looks broken" means and flags it automatically.
      </p>

      <h2>What Visual Issues Are Detected</h2>

      <h3>Layout Problems</h3>

      <ul>
        <li>Elements overlapping when they shouldn't</li>
        <li>Content cut off or overflowing containers</li>
        <li>Misaligned components</li>
        <li>Broken grid layouts</li>
        <li>Responsive design issues</li>
      </ul>

      <h3>CSS Issues</h3>

      <ul>
        <li>Missing styles (elements appear unstyled)</li>
        <li>Broken media queries</li>
        <li>Incorrect z-index stacking</li>
        <li>Font loading failures</li>
        <li>Color contrast problems (accessibility)</li>
      </ul>

      <h3>Component Issues</h3>

      <ul>
        <li>Buttons that look disabled but aren't</li>
        <li>Forms with broken validation styling</li>
        <li>Navigation menus not displaying correctly</li>
        <li>Modal dialogs not appearing</li>
        <li>Tooltips or popovers mispositioned</li>
      </ul>

      <h3>Content Issues</h3>

      <ul>
        <li>Missing images (broken image placeholders)</li>
        <li>Text truncation issues</li>
        <li>Content not loading</li>
        <li>Placeholder text not replaced</li>
      </ul>

      <h2>How to Enable Visual Testing</h2>

      <h3>Automatic Detection</h3>

      <p>
        Visual testing is <strong>automatically enabled</strong> for all explorations. You don't need to configure anything. The AI detects visual issues as part of normal exploration.
      </p>

      <h3>Focus Mode (Optional)</h3>

      <p>
        When creating an exploration, you can add instructions to focus on visual aspects:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example Instructions:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>"Check if the layout looks broken"</li>
          <li>"Verify the design is consistent"</li>
          <li>"Check for visual regressions"</li>
          <li>"Make sure nothing overlaps"</li>
        </ul>
      </div>

      <h3>Visual Test Add-Ons</h3>

      <p>
        For deeper visual analysis, you can purchase visual test add-ons that provide:
      </p>

      <ul>
        <li>More detailed visual comparisons</li>
        <li>Cross-browser visual checks</li>
        <li>Multiple viewport testing</li>
        <li>Enhanced visual regression detection</li>
      </ul>

      <p>
        See <a href="/docs/pricing-plans">Pricing & Plans</a> for details.
      </p>

      <h2>Understanding Visual Test Results</h2>

      <p>
        When visual issues are found, you'll see:
      </p>

      <ul>
        <li><strong>Issue description</strong> - What's wrong (e.g., "Elements overlapping")</li>
        <li><strong>Screenshot evidence</strong> - Visual proof of the problem</li>
        <li><strong>Location</strong> - Which page and step</li>
        <li><strong>Severity</strong> - High, Medium, or Low</li>
      </ul>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Example Visual Issue:</div>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <strong>Issue:</strong> Layout broken - elements overlapping
        </div>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <strong>Found on:</strong> Step 5 - Checkout page
        </div>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <strong>Severity:</strong> HIGH
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          <strong>Evidence:</strong> Screenshot showing header overlapping with form fields
        </div>
      </div>

      <h2>Limitations</h2>

      <p>
        AI-powered visual testing has limitations:
      </p>

      <ul>
        <li><strong>Not pixel-perfect</strong> - Won't catch 1px alignment differences</li>
        <li><strong>Subjective issues</strong> - Design preferences aren't detected (e.g., "this looks ugly")</li>
        <li><strong>Dynamic content</strong> - May flag issues with dynamic/timed content as problems</li>
        <li><strong>False positives</strong> - Sometimes flags non-issues (always verify)</li>
        <li><strong>Not exhaustive</strong> - Checks what it sees, not every possible viewport/state</li>
      </ul>

      <p>
        Visual testing is best for catching <strong>obvious problems</strong> - things that clearly look broken, not subtle design tweaks.
      </p>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Test after design changes</strong> - Run visual checks after CSS or layout updates</li>
        <li><strong>Check multiple viewports</strong> - Test on different screen sizes if possible</li>
        <li><strong>Verify findings</strong> - Always manually check if reported issues are real problems</li>
        <li><strong>Use for regressions</strong> - Great for catching "did my changes break the layout?"</li>
        <li><strong>Don't rely on it exclusively</strong> - Still do manual visual review for design quality</li>
      </ul>

      <h2>Comparison to Traditional Visual Testing</h2>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Aspect</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Traditional Tools</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Rihario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Setup</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Create baseline images, configure diff thresholds</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Automatic, no setup needed</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Maintenance</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Update baselines when design changes</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>AI adapts automatically</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Precision</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Pixel-perfect comparisons</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Detects obvious issues</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Use Case</td>
              <td style={{ padding: '0.75rem' }}>Pixel-perfect regression testing</td>
              <td style={{ padding: '0.75rem' }}>Quick visual checks, obvious issues</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-navigation">Learn how to test navigation</a></li>
        <li><a href="/docs/understanding-first-result">Understand test results</a></li>
        <li><a href="/docs/pricing-plans">See visual test add-ons</a></li>
      </ul>
    </article>
  )
}

