export default function DifferentFromTraditionalTestingContent() {
  return (
    <article>
      <h1>How This Is Different From Traditional Testing Tools</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario uses AI-powered exploratory testing instead of scripted test cases.</strong> Unlike Playwright, Selenium, or Cypress where you write deterministic tests, Rihario explores your app and adapts to changes automatically. It's optimized for quick confidence checks, not comprehensive test coverage.
      </p>

      <h2>The Core Difference: Scripted vs Exploratory</h2>

      <h3>Traditional Testing (Playwright, Selenium, Cypress)</h3>

      <p>
        Traditional tools require you to write scripts that define exactly what should happen:
      </p>

      <div style={{
        background: '#1e1e1e',
        color: '#fff',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        marginBottom: '2rem',
      }}>
        <div style={{ color: '#4ec9b0' }}>// Traditional test script</div>
        <div style={{ marginTop: '0.5rem' }}>
          <div>test(<span style={{ color: '#ce9178' }}>'checkout flow'</span>, async () =&gt; {'{'}</div>
          <div style={{ paddingLeft: '1rem' }}>await page.goto(<span style={{ color: '#ce9178' }}>'https://app.com'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await page.click(<span style={{ color: '#ce9178' }}>'#add-to-cart'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await page.click(<span style={{ color: '#ce9178' }}>'#checkout-btn'</span>)</div>
          <div style={{ paddingLeft: '1rem' }}>await expect(page.locator(<span style={{ color: '#ce9178' }}>'#payment-form'</span>)).toBeVisible()</div>
          <div>{'}'})</div>
        </div>
      </div>

      <p>
        <strong>Pros:</strong> Deterministic, repeatable, can integrate with CI/CD
      </p>
      <p>
        <strong>Cons:</strong> Requires writing and maintaining scripts, breaks when selectors change, can't adapt to UI changes
      </p>

      <h3>Rihario (AI-Powered Exploration)</h3>

      <p>
        Rihario doesn't use scripts. You give it instructions in plain English, and the AI decides what to do:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Rihario exploration:</div>
        <div style={{ color: 'var(--text-secondary)' }}>
          <div><strong>URL:</strong> https://app.com</div>
          <div><strong>Instructions:</strong> "check the checkout flow"</div>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            → AI explores the app
            → Finds "Add to Cart" button automatically
            → Clicks it
            → Finds checkout button
            → Navigates to checkout
            → Verifies payment form exists
            → Reports findings
          </div>
        </div>
      </div>

      <p>
        <strong>Pros:</strong> No scripts to write or maintain, adapts to UI changes, natural language instructions
      </p>
      <p>
        <strong>Cons:</strong> Probabilistic (not deterministic), can't guarantee all paths tested, requires human judgment
      </p>

      <h2>Detailed Comparison</h2>

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
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Aspect</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Traditional Tools</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Rihario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Setup Required</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Write test scripts, define selectors, set up test framework</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Point at URL, optionally add instructions</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Maintenance</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Update scripts when app changes, fix broken selectors</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>AI adapts automatically, no maintenance needed</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Determinism</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>100% deterministic - same input = same output</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Probabilistic - same input = similar results</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Coverage</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Can achieve high coverage with enough tests</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Explores what it finds, doesn't guarantee coverage</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>CI/CD Integration</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Designed for CI/CD, can block deployments</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Not designed for CI/CD, requires human judgment</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Learning Curve</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Need to learn test framework, JavaScript/TypeScript</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>No learning curve - just provide URL and instructions</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Use Case</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Comprehensive test suites, regression testing, CI/CD gates</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Quick confidence checks, pre-deployment verification</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Best For</td>
              <td style={{ padding: '0.75rem' }}>QA teams, automation engineers, enterprise teams</td>
              <td style={{ padding: '0.75rem' }}>Solo developers, indie builders, small teams</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When to Use Each</h2>

      <h3>Use Traditional Testing Tools When:</h3>

      <ul>
        <li>You need deterministic, repeatable tests</li>
        <li>You want to integrate tests into CI/CD pipelines</li>
        <li>You need test coverage metrics and audit trails</li>
        <li>You have dedicated QA resources to maintain tests</li>
        <li>You need to test specific edge cases or scenarios</li>
        <li>Compliance or regulatory requirements mandate scripted tests</li>
      </ul>

      <h3>Use Rihario When:</h3>

      <ul>
        <li>You want quick confidence checks without writing scripts</li>
        <li>You don't want to maintain test infrastructure</li>
        <li>You care more about "does it feel broken?" than coverage metrics</li>
        <li>You ship fast and iterate often</li>
        <li>You want to catch obvious issues, not test every edge case</li>
        <li>You prefer AI adapting to changes over maintaining selectors</li>
      </ul>

      <h2>Can You Use Both?</h2>

      <p>
        Absolutely. Many developers use both:
      </p>

      <ul>
        <li><strong>Traditional tools</strong> for critical paths, edge cases, and CI/CD gates</li>
        <li><strong>Rihario</strong> for quick pre-deployment checks, visual regression, and exploratory testing</li>
      </ul>

      <p>
        They complement each other. Use the right tool for each job.
      </p>

      <h2>Common Misconceptions</h2>

      <h3>"Rihario replaces Playwright"</h3>
      <p>
        No. Rihario is a different approach - exploratory and probabilistic. Playwright is deterministic and scripted. They solve different problems.
      </p>

      <h3>"I can't use Rihario because I need test coverage"</h3>
      <p>
        Correct. If you need coverage metrics, use traditional tools. Rihario is for confidence, not coverage.
      </p>

      <h3>"Rihario is better because it doesn't require maintenance"</h3>
      <p>
        It's different, not necessarily better. You trade determinism and coverage for zero maintenance. Choose based on your needs.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/not-replacement-playwright">Read: Why this tool is not a replacement for Playwright</a></li>
        <li><a href="/docs/run-first-test">Try Rihario with your first test</a></li>
        <li><a href="/docs/faq-cicd">Read: Can I use this in CI/CD pipelines?</a></li>
      </ul>
    </article>
  )
}

