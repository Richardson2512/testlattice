export default function AccessibilityChecksContent() {
  return (
    <article>
      <h1>AI Accessibility Checks (What It Finds and What It Doesn't)</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario detects common accessibility issues automatically, but it's not a replacement for dedicated accessibility testing tools.</strong> The AI finds obvious problems like missing labels and poor contrast, but cannot evaluate screen reader compatibility or keyboard navigation comprehensively. Use it for quick spot checks, not compliance audits.
      </p>

      <h2>What AI Can Detect</h2>

      <h3>Missing Labels</h3>

      <ul>
        <li><strong>Input fields without labels</strong> - Form fields missing associated &lt;label&gt; elements</li>
        <li><strong>Missing ARIA labels</strong> - Interactive elements without aria-label or aria-labelledby</li>
        <li><strong>Images without alt text</strong> - &lt;img&gt; elements missing alt attributes</li>
        <li><strong>Icons without labels</strong> - Icon buttons without text or aria-label</li>
      </ul>

      <h3>Color Contrast</h3>

      <ul>
        <li><strong>Low contrast text</strong> - Text that doesn't meet WCAG contrast ratios</li>
        <li><strong>Color-only information</strong> - Information conveyed only through color</li>
        <li><strong>Poor button contrast</strong> - Buttons with insufficient contrast</li>
      </ul>

      <h3>Semantic HTML</h3>

      <ul>
        <li><strong>Missing headings</strong> - Pages without proper heading structure</li>
        <li><strong>Improper heading hierarchy</strong> - Skipped heading levels (h1 → h3)</li>
        <li><strong>Non-semantic elements</strong> - Buttons implemented as &lt;div&gt; instead of &lt;button&gt;</li>
        <li><strong>Missing landmarks</strong> - Missing ARIA landmarks or semantic regions</li>
      </ul>

      <h3>Form Accessibility</h3>

      <ul>
        <li><strong>Unlabeled form fields</strong> - Inputs without labels or placeholders</li>
        <li><strong>Error messages not associated</strong> - Error messages not linked to fields via aria-describedby</li>
        <li><strong>Required fields not indicated</strong> - Required fields without aria-required or visual indicators</li>
      </ul>

      <h3>Keyboard Navigation Basics</h3>

      <ul>
        <li><strong>Missing focus indicators</strong> - Elements that can be focused but have no visible focus state</li>
        <li><strong>Non-focusable interactive elements</strong> - Clickable elements that aren't keyboard accessible</li>
        <li><strong>Focus traps</strong> - Situations where focus gets stuck (basic detection)</li>
      </ul>

      <h2>What AI Cannot Detect</h2>

      <h3>Screen Reader Compatibility</h3>

      <ul>
        <li><strong>Screen reader announcements</strong> - Cannot verify what screen readers actually announce</li>
        <li><strong>ARIA live regions</strong> - Cannot verify dynamic content announcements</li>
        <li><strong>Screen reader navigation</strong> - Cannot test how users navigate with screen readers</li>
        <li><strong>Complex ARIA patterns</strong> - Cannot verify complex ARIA implementations work correctly</li>
      </ul>

      <h3>Keyboard Navigation</h3>

      <ul>
        <li><strong>Tab order</strong> - Cannot verify logical tab order</li>
        <li><strong>Keyboard shortcuts</strong> - Cannot test custom keyboard shortcuts</li>
        <li><strong>Escape key handling</strong> - Cannot verify ESC closes modals/menus</li>
        <li><strong>Arrow key navigation</strong> - Cannot test arrow key controls (dropdowns, menus)</li>
      </ul>

      <h3>Complex Accessibility</h3>

      <ul>
        <li><strong>Dynamic content updates</strong> - Cannot verify ARIA live regions work correctly</li>
        <li><strong>Drag and drop</strong> - Cannot test keyboard alternatives for drag-and-drop</li>
        <li><strong>Complex widgets</strong> - Cannot verify complex ARIA widgets (accordions, tabs, etc.)</li>
        <li><strong>Focus management</strong> - Cannot verify focus is managed correctly in modals</li>
      </ul>

      <h3>Contextual Issues</h3>

      <ul>
        <li><strong>Alternative text quality</strong> - Can detect missing alt text, but not if it's descriptive</li>
        <li><strong>Link purpose</strong> - Can detect links, but not if "click here" is clear without context</li>
        <li><strong>Reading order</strong> - Cannot verify logical reading order for screen readers</li>
        <li><strong>Skip links</strong> - May not verify skip links work correctly</li>
      </ul>

      <h2>Understanding Accessibility Results</h2>

      <p>
        When accessibility issues are found, they're categorized as:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Critical Issue</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Missing form label - Input field has no associated label or aria-label. Screen reader users cannot determine what the field is for.
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--warning)' }}>⚠️ Warning</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Low color contrast - Text color #999999 on background #ffffff has contrast ratio 2.3:1 (WCAG requires 4.5:1 for normal text).
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>ℹ️ Info</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Missing heading - Page starts with h3 instead of h1. Consider adding a main heading.
          </div>
        </div>
      </div>

      <h2>Limitations</h2>

      <h3>Not Comprehensive</h3>

      <p>
        Rihario finds <strong>obvious accessibility issues</strong>, not all issues. It's a spot check, not a full audit.
      </p>

      <h3>Cannot Verify Experience</h3>

      <p>
        The AI can detect missing labels, but cannot verify if the actual screen reader experience is good. Users with disabilities should test your app.
      </p>

      <h3>Not a Compliance Tool</h3>

      <p>
        Rihario is not designed for WCAG compliance audits. Use dedicated accessibility testing tools (axe, WAVE, Lighthouse) for compliance.
      </p>

      <h3>False Positives</h3>

      <p>
        Some reported issues might be false positives. Always verify findings manually.
      </p>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Use for quick checks</strong> - Catch obvious issues before user testing</li>
        <li><strong>Verify manually</strong> - Always manually verify reported issues</li>
        <li><strong>Use dedicated tools for compliance</strong> - Use axe or WAVE for WCAG audits</li>
        <li><strong>Test with real users</strong> - Have users with disabilities test your app</li>
        <li><strong>Fix obvious issues first</strong> - Address missing labels and contrast before complex issues</li>
      </ul>

      <h2>What to Use Instead (For Compliance)</h2>

      <p>
        For comprehensive accessibility testing, use:
      </p>

      <ul>
        <li><strong>axe DevTools</strong> - Browser extension for accessibility testing</li>
        <li><strong>WAVE</strong> - Web accessibility evaluation tool</li>
        <li><strong>Lighthouse</strong> - Built into Chrome DevTools</li>
        <li><strong>Screen readers</strong> - Test with NVDA, JAWS, or VoiceOver</li>
        <li><strong>Keyboard testing</strong> - Navigate entire app with keyboard only</li>
      </ul>

      <p>
        Rihario complements these tools by catching issues during regular exploration, but doesn't replace them.
      </p>

      <h2>Example: What Gets Found</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Issues Typically Found:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>Contact form email field has no label</li>
          <li>Submit button has insufficient color contrast (2.1:1, needs 4.5:1)</li>
          <li>Three images missing alt text</li>
          <li>Navigation menu button missing aria-label</li>
          <li>Error message not associated with form field</li>
        </ul>
        <div style={{ marginTop: '1rem', fontWeight: 600 }}>Issues NOT Found:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>Screen reader announcements work correctly</li>
          <li>Keyboard navigation order is logical</li>
          <li>ARIA live regions announce updates</li>
          <li>Focus management in modals works</li>
        </ul>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-forms">Learn about testing forms</a></li>
        <li><a href="/docs/understanding-first-result">Understand test results</a></li>
        <li><a href="/docs/cannot-guarantee-coverage">See limitations of AI testing</a></li>
      </ul>
    </article>
  )
}

