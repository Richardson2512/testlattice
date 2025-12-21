export default function CannotGuaranteeCoverageContent() {
  return (
    <article>
      <h1>Why This Tool Cannot Guarantee 100% Coverage</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario cannot guarantee 100% test coverage because AI exploration is probabilistic, not exhaustive.</strong> The AI explores what it finds, takes different paths each time, and focuses on obvious issues. It's optimized for finding problems quickly, not for comprehensive coverage. This is by design - we focus on confidence, not coverage.
      </p>

      <h2>Why Coverage Guarantees Are Impossible</h2>

      <h3>1. Probabilistic Exploration</h3>

      <p>
        AI exploration is probabilistic:
      </p>

      <ul>
        <li><strong>Different paths each time</strong> - Same exploration may take different routes</li>
        <li><strong>Not deterministic</strong> - Cannot predict exactly what will be explored</li>
        <li><strong>Explores what it finds</strong> - Follows paths it discovers, not exhaustive checklist</li>
      </ul>

      <h3>2. Focus on Obvious Issues</h3>

      <p>
        AI focuses on finding problems:
      </p>

      <ul>
        <li><strong>Obvious bugs</strong> - Things that clearly look broken</li>
        <li><strong>High-impact issues</strong> - Problems that affect users</li>
        <li><strong>Common flows</strong> - Typical user paths</li>
        <li><strong>Not edge cases</strong> - Doesn't test every possible scenario</li>
      </ul>

      <h3>3. Time and Resource Limits</h3>

      <p>
        Exploration has practical limits:
      </p>

      <ul>
        <li><strong>Time limits</strong> - Cannot explore indefinitely</li>
        <li><strong>Resource constraints</strong> - Limited by compute resources</li>
        <li><strong>Efficiency focus</strong> - Optimized for speed, not completeness</li>
      </ul>

      <h2>What "Coverage" Means Here</h2>

      <h3>What We Don't Mean</h3>

      <ul>
        <li><strong>Code coverage</strong> - Not measuring lines of code tested</li>
        <li><strong>Feature coverage</strong> - Not testing every feature</li>
        <li><strong>Scenario coverage</strong> - Not testing every possible scenario</li>
        <li><strong>Edge case coverage</strong> - Not testing unusual situations</li>
      </ul>

      <h3>What We Do Mean</h3>

      <ul>
        <li><strong>Exploration of found paths</strong> - Explores routes it discovers</li>
        <li><strong>Obvious issue detection</strong> - Finds problems that are clearly broken</li>
        <li><strong>Common flow testing</strong> - Tests typical user journeys</li>
        <li><strong>Confidence building</strong> - Helps you feel confident before shipping</li>
      </ul>

      <h2>What Gets Tested</h2>

      <p>
        AI exploration typically covers:
      </p>

      <ul>
        <li><strong>Main user flows</strong> - Common paths through your app</li>
        <li><strong>Visible elements</strong> - Things that appear on pages</li>
        <li><strong>Obvious issues</strong> - Problems that are clearly broken</li>
        <li><strong>Standard interactions</strong> - Clicks, forms, navigation</li>
      </ul>

      <h2>What Might Be Missed</h2>

      <p>
        AI exploration might miss:
      </p>

      <ul>
        <li><strong>Edge cases</strong> - Unusual scenarios or inputs</li>
        <li><strong>Hidden features</strong> - Features not easily discoverable</li>
        <li><strong>Complex business logic</strong> - Subtle logic errors</li>
        <li><strong>Performance issues</strong> - Slow but functional features</li>
        <li><strong>Security vulnerabilities</strong> - Advanced security issues</li>
        <li><strong>Accessibility edge cases</strong> - Complex accessibility problems</li>
      </ul>

      <h2>Why This Is Okay</h2>

      <h3>Focus on Confidence</h3>

      <p>
        Rihario focuses on confidence, not coverage:
      </p>

      <ul>
        <li><strong>"Nothing obviously broken"</strong> - More important than complete coverage</li>
        <li><strong>"Safe to ship"</strong> - Goal is shipping confidence, not perfection</li>
        <li><strong>"Quick checks"</strong> - Fast exploration over exhaustive testing</li>
      </ul>

      <h3>Practical Trade-offs</h3>

      <p>
        For solo developers and indie builders:
      </p>

      <ul>
        <li><strong>Time is valuable</strong> - Fast checks better than slow comprehensive tests</li>
        <li><strong>Obvious bugs matter most</strong> - Catching embarrassing bugs is priority</li>
        <li><strong>Coverage isn't everything</strong> - Perfect coverage doesn't guarantee no bugs</li>
      </ul>

      <h2>How to Use Rihario Effectively</h2>

      <h3>Set Realistic Expectations</h3>

      <ul>
        <li><strong>Don't expect 100% coverage</strong> - That's not the goal</li>
        <li><strong>Expect obvious issues found</strong> - Will catch clear problems</li>
        <li><strong>Use for confidence</strong> - Helps you feel ready to ship</li>
      </ul>

      <h3>Supplement with Manual Testing</h3>

      <ul>
        <li><strong>Test critical flows manually</strong> - Verify important paths yourself</li>
        <li><strong>Test edge cases</strong> - Cover unusual scenarios manually</li>
        <li><strong>Use Rihario for quick checks</strong> - AI finds obvious issues, you find subtle ones</li>
      </ul>

      <h3>Focus on Value</h3>

      <ul>
        <li><strong>Find obvious problems fast</strong> - Catch embarrassing bugs quickly</li>
        <li><strong>Build confidence</strong> - Know nothing is obviously broken</li>
        <li><strong>Ship with confidence</strong> - Not perfection, but confidence</li>
      </ul>

      <h2>Comparison to Traditional Testing</h2>

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
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Traditional Testing</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Rihario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Coverage Goal</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>High coverage (80-90%+)</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Confidence, not coverage</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Approach</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Exhaustive, deterministic</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Probabilistic, focused</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Speed</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Slow (comprehensive)</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fast (quick checks)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Best For</td>
              <td style={{ padding: '0.75rem' }}>QA teams, compliance</td>
              <td style={{ padding: '0.75rem' }}>Solo devs, quick checks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Summary</h2>

      <p>
        Rihario cannot guarantee 100% coverage because:
      </p>

      <ul>
        <li>AI exploration is probabilistic, not exhaustive</li>
        <li>Focuses on obvious issues, not edge cases</li>
        <li>Has practical time and resource limits</li>
        <li>Optimized for confidence, not coverage</li>
      </ul>

      <p>
        This is by design. Use Rihario for quick confidence checks, not comprehensive coverage. Supplement with manual testing for critical flows and edge cases.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/pre-ship-confidence">Learn about pre-ship confidence</a></li>
        <li><a href="/docs/ai-accuracy">Understand AI accuracy and limitations</a></li>
        <li><a href="/docs/faq-worth-it">Read: Is this tool worth it for solo developers?</a></li>
      </ul>
    </article>
  )
}

