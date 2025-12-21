export default function FAQCICDContent() {
  return (
    <article>
      <h1>Can I Use This Tool in CI/CD Pipelines?</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario is not designed for CI/CD pipelines.</strong> It's optimized for manual pre-deployment checks, not automated gate conditions. Results are probabilistic (not deterministic), and exploration takes variable time. For CI/CD, use deterministic tools like Playwright or Selenium that provide pass/fail status and consistent execution times.
      </p>

      <h2>Why Rihario Isn't for CI/CD</h2>

      <h3>1. Probabilistic Results</h3>

      <p>
        Rihario results are probabilistic:
      </p>

      <ul>
        <li><strong>Not deterministic</strong> - Same input doesn't guarantee same output</li>
        <li><strong>Variable paths</strong> - May explore different routes each time</li>
        <li><strong>No pass/fail</strong> - Provides findings, not binary status</li>
        <li><strong>CI/CD needs deterministic</strong> - Pipelines need consistent pass/fail</li>
      </ul>

      <h3>2. Variable Execution Time</h3>

      <p>
        Exploration time varies:
      </p>

      <ul>
        <li><strong>Can take 1-30+ minutes</strong> - Depends on site complexity</li>
        <li><strong>Unpredictable duration</strong> - Hard to set timeouts</li>
        <li><strong>CI/CD needs predictable</strong> - Pipelines need consistent timing</li>
      </ul>

      <h3>3. Manual Review Required</h3>

      <p>
        Results require human review:
      </p>

      <ul>
        <li><strong>Findings, not pass/fail</strong> - Need human to evaluate issues</li>
        <li><strong>False positives</strong> - Some findings aren't real problems</li>
        <li><strong>CI/CD needs automation</strong> - Pipelines should run without human intervention</li>
      </ul>

      <h2>What Rihario Is For</h2>

      <ul>
        <li><strong>Manual pre-deployment checks</strong> - Run before deploying</li>
        <li><strong>Quick confidence checks</strong> - Verify nothing obvious is broken</li>
        <li><strong>Exploratory testing</strong> - Discover issues you might miss</li>
        <li><strong>Fast feedback</strong> - Get results quickly without writing tests</li>
      </ul>

      <h2>What CI/CD Tools Are For</h2>

      <ul>
        <li><strong>Deterministic tests</strong> - Same input, same output</li>
        <li><strong>Pass/fail gates</strong> - Clear success/failure status</li>
        <li><strong>Predictable timing</strong> - Consistent execution times</li>
        <li><strong>Automated gates</strong> - Block deployments automatically</li>
      </ul>

      <h2>Use the Right Tool for Each Job</h2>

      <h3>For CI/CD: Use Playwright/Selenium</h3>

      <p>
        Deterministic tools work better for CI/CD:
      </p>

      <ul>
        <li><strong>Playwright</strong> - Modern, fast, deterministic</li>
        <li><strong>Selenium</strong> - Mature, widely used</li>
        <li><strong>Cypress</strong> - Good for frontend testing</li>
      </ul>

      <h3>For Manual Checks: Use Rihario</h3>

      <p>
        Rihario works better for manual checks:
      </p>

      <ul>
        <li><strong>Quick confidence checks</strong> - Run before deploying</li>
        <li><strong>Exploratory testing</strong> - Find issues you didn't think to test</li>
        <li><strong>No test maintenance</strong> - Works without writing scripts</li>
      </ul>

      <h2>Can You Use Both?</h2>

      <p>
        <strong>Yes, use both:</strong>
      </p>

      <ul>
        <li><strong>Playwright in CI/CD</strong> - Deterministic tests that block deployments</li>
        <li><strong>Rihario manually</strong> - Quick checks before pushing to CI/CD</li>
      </ul>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Example Workflow:</div>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Make changes to your app</li>
            <li>Run Rihario manually (quick check)</li>
            <li>Fix obvious issues found</li>
            <li>Push to CI/CD</li>
            <li>Playwright tests run in pipeline (deterministic)</li>
            <li>Deploy if all tests pass</li>
          </ol>
        </div>
      </div>

      <h2>Future Possibilities</h2>

      <p>
        We may add CI/CD features in the future, but currently Rihario is optimized for:
      </p>

      <ul>
        <li>Manual pre-deployment checks</li>
        <li>Quick confidence verification</li>
        <li>Exploratory testing</li>
        <li>Fast feedback without test maintenance</li>
      </ul>

      <h2>Answer: No, Use Playwright/Selenium for CI/CD</h2>

      <p>
        <strong>Rihario is not designed for CI/CD pipelines.</strong> Use Playwright or Selenium for deterministic, automated CI/CD tests. Use Rihario for manual pre-deployment checks and exploratory testing.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/not-replacement-playwright">Learn why this isn't a replacement for Playwright</a></li>
        <li><a href="/docs/pre-ship-confidence">Understand pre-ship confidence</a></li>
        <li><a href="/docs/run-first-test">Try Rihario for manual checks</a></li>
      </ul>
    </article>
  )
}

