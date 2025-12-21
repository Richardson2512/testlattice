export default function TestNavigationContent() {
  return (
    <article>
      <h1>How to Test Navigation and Broken Links</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario automatically checks navigation and detects broken links during exploration.</strong> As the AI navigates your app, it follows links, checks if they work, and flags 404 errors, broken redirects, or inaccessible pages. No need to manually check every link.
      </p>

      <h2>How Navigation Testing Works</h2>

      <p>
        During exploration, the AI:
      </p>

      <ol>
        <li><strong>Identifies navigation elements</strong> - Finds menus, links, buttons that navigate</li>
        <li><strong>Follows links</strong> - Clicks navigation items to explore different pages</li>
        <li><strong>Checks link health</strong> - Verifies links load correctly</li>
        <li><strong>Detects broken links</strong> - Flags 404s, timeouts, or inaccessible pages</li>
        <li><strong>Tests navigation structure</strong> - Verifies menus work, breadcrumbs are correct</li>
      </ol>

      <h2>What Gets Tested</h2>

      <h3>Link Functionality</h3>

      <ul>
        <li><strong>Internal links</strong> - Links within your app</li>
        <li><strong>External links</strong> - Links to other sites (checks if accessible)</li>
        <li><strong>Anchor links</strong> - Links to page sections</li>
        <li><strong>Button navigation</strong> - Buttons that navigate (not just links)</li>
      </ul>

      <h3>Broken Links</h3>

      <ul>
        <li><strong>404 errors</strong> - Pages that don't exist</li>
        <li><strong>Timeout errors</strong> - Links that take too long to load</li>
        <li><strong>Redirect loops</strong> - Infinite redirects detected</li>
        <li><strong>Access denied</strong> - Pages that return 403 or authentication errors</li>
        <li><strong>Malformed URLs</strong> - Links with invalid URLs</li>
      </ul>

      <h3>Navigation Structure</h3>

      <ul>
        <li><strong>Menu functionality</strong> - Dropdowns, mobile menus, navigation drawers</li>
        <li><strong>Breadcrumbs</strong> - If present, verifies they're correct</li>
        <li><strong>Back/forward buttons</strong> - Browser navigation works</li>
        <li><strong>Deep linking</strong> - Direct URL access works</li>
      </ul>

      <h2>How to Test Navigation</h2>

      <h3>Method 1: General Exploration</h3>

      <p>
        Start an exploration and let the AI naturally follow navigation:
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
          URL: https://app.com<br />
          Instructions: (leave empty or "explore the site")
        </div>
      </div>

      <p>
        The AI will follow navigation links as it explores, automatically checking for broken links.
      </p>

      <h3>Method 2: Focused Navigation Testing</h3>

      <p>
        Add instructions to focus on navigation:
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
          URL: https://app.com<br />
          Instructions: "check all navigation links for broken pages"
        </div>
      </div>

      <h2>Understanding Results</h2>

      <p>
        When broken links are found, you'll see:
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
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Broken Link</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <strong>Link:</strong> "About Us" in header navigation<br />
            <strong>URL:</strong> https://app.com/about<br />
            <strong>Error:</strong> 404 Not Found<br />
            <strong>Found on:</strong> Homepage
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--warning)' }}>⚠️ Slow Link</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <strong>Link:</strong> "Products" in main menu<br />
            <strong>URL:</strong> https://app.com/products<br />
            <strong>Issue:</strong> Took 15 seconds to load (threshold: 5 seconds)
          </div>
        </div>
      </div>

      <h2>What Gets Checked</h2>

      <h3>Header Navigation</h3>

      <ul>
        <li>Main menu items</li>
        <li>Dropdown menus</li>
        <li>Logo links</li>
        <li>Mobile menu</li>
      </ul>

      <h3>Footer Links</h3>

      <ul>
        <li>Footer navigation</li>
        <li>Social media links</li>
        <li>Legal pages (Privacy, Terms)</li>
        <li>Support links</li>
      </ul>

      <h3>In-Page Links</h3>

      <ul>
        <li>Links within content</li>
        <li>CTA buttons that navigate</li>
        <li>Breadcrumb links</li>
        <li>Related content links</li>
      </ul>

      <h2>Limitations</h2>

      <ul>
        <li><strong>Not exhaustive</strong> - Explores navigation it finds, doesn't check every possible link</li>
        <li><strong>Protected pages</strong> - May mark protected pages as broken if authentication required</li>
        <li><strong>External links</strong> - Checks if accessible, but doesn't verify content correctness</li>
        <li><strong>Dynamic links</strong> - May miss links loaded via JavaScript after initial page load</li>
        <li><strong>Hash links</strong> - May not verify anchor links work correctly</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Test after restructuring</strong> - Run navigation checks after changing site structure</li>
        <li><strong>Check important pages</strong> - Focus on critical navigation paths</li>
        <li><strong>Verify manually</strong> - Always manually verify broken links are real issues</li>
        <li><strong>Test across viewports</strong> - Navigation may differ on mobile vs desktop</li>
        <li><strong>Check authenticated state</strong> - Some links only work when logged in</li>
      </ul>

      <h2>Example: Testing Site Navigation</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Step-by-Step Process:</div>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>Start exploration on homepage</li>
          <li>AI identifies header navigation menu</li>
          <li>AI clicks "Products" link → verifies page loads</li>
          <li>AI clicks "About" link → finds 404 error → flags as broken</li>
          <li>AI continues exploring other navigation items</li>
          <li>AI checks footer links</li>
          <li>AI reports all broken links found</li>
        </ol>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-login-flows">Learn about testing login flows</a></li>
        <li><a href="/docs/failed-vs-blocked">Understand FAILED vs BLOCKED status</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts for broken links</a></li>
      </ul>
    </article>
  )
}

