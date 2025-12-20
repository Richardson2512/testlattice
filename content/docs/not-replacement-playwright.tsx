export default function NotReplacementPlaywrightContent() {
  return (
    <article>
      <h1>Why This Tool Is Not a Replacement for Playwright or Selenium</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario is not a replacement for Playwright, Selenium, or Cypress.</strong> It's a different approach - AI-powered exploration vs scripted automation. Use the right tool for each job: traditional tools for deterministic tests, Rihario for quick confidence checks.
      </p>

      <h2>The Fundamental Difference</h2>

      <h3>Playwright/Selenium/Cypress: Scripted Automation</h3>

      <ul>
        <li>You write scripts defining exact steps</li>
        <li>Tests are deterministic (same input = same output)</li>
        <li>Designed for CI/CD pipelines</li>
        <li>Can achieve high test coverage</li>
        <li>Requires maintenance when app changes</li>
        <li>Provides pass/fail status</li>
      </ul>

      <h3>Rihario: AI-Powered Exploration</h3>

      <ul>
        <li>AI decides what to do based on what it sees</li>
        <li>Results are probabilistic (similar, not identical)</li>
        <li>Designed for manual pre-deployment checks</li>
        <li>Explores what it finds, doesn't guarantee coverage</li>
        <li>Adapts automatically to app changes</li>
        <li>Provides findings and evidence, not pass/fail</li>
      </ul>

      <h2>When to Use Each</h2>

      <h3>Use Playwright/Selenium/Cypress When:</h3>

      <ul>
        <li><strong>You need deterministic tests</strong> - Same test must produce identical results every time</li>
        <li><strong>CI/CD integration required</strong> - Tests must run in pipelines and block deployments</li>
        <li><strong>Test coverage metrics needed</strong> - You need to report coverage percentages</li>
        <li><strong>Specific scenarios must be tested</strong> - You need to verify exact behaviors</li>
        <li><strong>Edge cases are critical</strong> - You need to test unusual scenarios</li>
        <li><strong>Compliance/audit trails needed</strong> - You need proof of testing for regulations</li>
        <li><strong>You have QA resources</strong> - You have people to write and maintain tests</li>
      </ul>

      <h3>Use Rihario When:</h3>

      <ul>
        <li><strong>You want quick confidence checks</strong> - Need to verify app works before deploying</li>
        <li><strong>You don't want to write scripts</strong> - Prefer zero maintenance over determinism</li>
        <li><strong>You ship fast</strong> - Need checks that don't slow down iteration</li>
        <li><strong>You're solo or small team</strong> - Don't have QA resources for test maintenance</li>
        <li><strong>You care about "feels broken"</strong> - More concerned about obvious issues than coverage</li>
        <li><strong>You want AI to adapt</strong> - Prefer automatic adaptation over maintaining selectors</li>
        <li><strong>You need exploratory testing</strong> - Want to discover issues, not just verify behaviors</li>
      </ul>

      <h2>Side-by-Side Comparison</h2>

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
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Feature</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Playwright/Selenium</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Rihario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Writing Tests</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Write scripts in code</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Provide URL and instructions</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Maintenance</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Update scripts when app changes</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>AI adapts automatically</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Determinism</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>100% deterministic</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Probabilistic</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>CI/CD</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Designed for CI/CD gates</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Not designed for CI/CD</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Coverage</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Can achieve high coverage</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Explores what it finds</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Results</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Pass/fail status</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Findings and evidence</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Learning Curve</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Learn framework and code</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>No learning curve</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Best For</td>
              <td style={{ padding: '0.75rem' }}>QA teams, CI/CD, coverage goals</td>
              <td style={{ padding: '0.75rem' }}>Solo devs, quick checks, confidence</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Can You Use Both?</h2>

      <p>
        <strong>Absolutely.</strong> Many developers use both:
      </p>

      <ul>
        <li><strong>Playwright</strong> for critical paths, edge cases, and CI/CD gates</li>
        <li><strong>Rihario</strong> for quick pre-deployment checks and exploratory testing</li>
      </ul>

      <p>
        They complement each other:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Example Workflow:</div>
        <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>You make changes to your app</li>
          <li>Run Playwright tests for critical flows (deterministic, in CI/CD)</li>
          <li>Run Rihario exploration for quick visual and exploratory checks (manual, before deploy)</li>
          <li>Fix any issues found</li>
          <li>Ship with confidence</li>
        </ol>
      </div>

      <h2>Common Misconceptions</h2>

      <h3>"Rihario replaces Playwright"</h3>
      <p>
        No. They're different tools for different needs. Playwright is for deterministic, scripted tests. Rihario is for exploratory, AI-powered checks.
      </p>

      <h3>"I should migrate my Playwright tests to Rihario"</h3>
      <p>
        Don't. If you have working Playwright tests, keep them. Use Rihario for additional checks or situations where Playwright doesn't fit.
      </p>

      <h3>"Rihario is better because it doesn't require maintenance"</h3>
      <p>
        It's different, not necessarily better. You trade determinism and coverage for zero maintenance. Choose based on your needs.
      </p>

      <h3>"I need to choose one or the other"</h3>
      <p>
        No. Use both. They solve different problems and work well together.
      </p>

      <h2>Real-World Scenarios</h2>

      <h3>Scenario 1: Solo Developer</h3>
      <p>
        <strong>Situation:</strong> You're building a SaaS app solo, shipping multiple times per week.
      </p>
      <p>
        <strong>Best choice:</strong> Rihario for quick checks. Playwright would require too much maintenance and slow you down.
      </p>

      <h3>Scenario 2: Small Team with QA</h3>
      <p>
        <strong>Situation:</strong> You have a small team with dedicated QA resources.
      </p>
      <p>
        <strong>Best choice:</strong> Both. Playwright for critical paths and CI/CD. Rihario for quick visual checks and exploratory testing.
      </p>

      <h3>Scenario 3: Enterprise Team</h3>
      <p>
        <strong>Situation:</strong> Large team, compliance requirements, need test coverage metrics.
      </p>
      <p>
        <strong>Best choice:</strong> Playwright or Selenium. Rihario doesn't meet enterprise needs for coverage and compliance.
      </p>

      <h2>Migration Path</h2>

      <p>
        If you're considering moving from Playwright to Rihario:
      </p>

      <ul>
        <li><strong>Don't replace existing tests</strong> - Keep what works</li>
        <li><strong>Use Rihario for new checks</strong> - Add it for exploratory testing</li>
        <li><strong>Evaluate over time</strong> - See which tool works better for which scenarios</li>
        <li><strong>Use both as needed</strong> - They're complementary, not replacements</li>
      </ul>

      <h2>Summary</h2>

      <p>
        Rihario and Playwright/Selenium solve different problems:
      </p>

      <ul>
        <li><strong>Playwright/Selenium:</strong> Deterministic, scripted tests for CI/CD and coverage</li>
        <li><strong>Rihario:</strong> Exploratory, AI-powered checks for quick confidence</li>
      </ul>

      <p>
        Use the right tool for each job. Many teams use both.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/different-from-traditional-testing">Learn more about differences from traditional testing</a></li>
        <li><a href="/docs/faq-cicd">Read: Can I use this in CI/CD pipelines?</a></li>
        <li><a href="/docs/run-first-test">Try Rihario to see how it differs</a></li>
      </ul>
    </article>
  )
}

