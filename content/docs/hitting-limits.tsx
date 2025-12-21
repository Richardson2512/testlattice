export default function HittingLimitsContent() {
  return (
    <article>
      <h1>What Happens When You Hit a Limit</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>When you hit your monthly test or visual test limit, Rihario will notify you and suggest upgrading or buying add-ons.</strong> You can't run new tests until the limit resets (monthly) or you upgrade. Limits reset on your billing date each month.
      </p>

      <h2>Limit Warnings</h2>

      <h3>Before You Hit the Limit</h3>

      <p>
        Rihario warns you as you approach limits:
      </p>

      <ul>
        <li><strong>80% warning</strong> - Notification when you've used 80% of limit</li>
        <li><strong>90% warning</strong> - Another warning at 90%</li>
        <li><strong>Visual indicators</strong> - Progress bars show usage</li>
        <li><strong>Usage dashboard</strong> - See exactly how many tests remain</li>
      </ul>

      <h3>When You Hit the Limit</h3>

      <p>
        When you reach your limit:
      </p>

      <ul>
        <li><strong>Clear notification</strong> - Message explaining you've hit the limit</li>
        <li><strong>Upgrade prompt</strong> - Suggestions for upgrading plan</li>
        <li><strong>Add-on option</strong> - Option to buy additional tests</li>
        <li><strong>New tests blocked</strong> - Cannot start new explorations</li>
      </ul>

      <h2>What Happens</h2>

      <h3>Test Limit Reached</h3>

      <p>
        When you hit your test limit:
      </p>

      <ul>
        <li><strong>Cannot start new tests</strong> - New explorations are blocked</li>
        <li><strong>Existing tests continue</strong> - Tests already running complete</li>
        <li><strong>Results still accessible</strong> - Can view past test results</li>
        <li><strong>Upgrade prompt shown</strong> - Suggestions for upgrading or buying add-ons</li>
      </ul>

      <h3>Visual Test Limit Reached</h3>

      <p>
        When you hit your visual test limit:
      </p>

      <ul>
        <li><strong>Visual testing disabled</strong> - New tests run without visual checks</li>
        <li><strong>Regular tests still work</strong> - Can still run non-visual explorations</li>
        <li><strong>Upgrade prompt shown</strong> - Suggestions for more visual tests</li>
        <li><strong>Add-on option</strong> - Can buy additional visual tests</li>
      </ul>

      <h2>Options When You Hit a Limit</h2>

      <h3>Option 1: Wait for Reset</h3>

      <ul>
        <li><strong>Monthly reset</strong> - Limits reset on your billing date</li>
        <li><strong>Free option</strong> - No cost, just wait</li>
        <li><strong>May take time</strong> - Could be days or weeks until reset</li>
      </ul>

      <h3>Option 2: Upgrade Plan</h3>

      <ul>
        <li><strong>Get higher limits</strong> - Move to plan with more tests</li>
        <li><strong>Immediate access</strong> - Limits apply immediately</li>
        <li><strong>Prorated billing</strong> - Pay difference for remaining month</li>
      </ul>

      <h3>Option 3: Buy Add-Ons</h3>

      <ul>
        <li><strong>Additional tests</strong> - Buy more tests without upgrading plan</li>
        <li><strong>Additional visual tests</strong> - Buy more visual tests</li>
        <li><strong>One-time purchase</strong> - Buy what you need</li>
      </ul>

      <h2>Upgrade Prompts</h2>

      <p>
        When you hit a limit, you'll see upgrade prompts:
      </p>

      <ul>
        <li><strong>Recommended plan</strong> - Suggests plan that meets your needs</li>
        <li><strong>Benefits highlighted</strong> - Shows what you get with upgrade</li>
        <li><strong>Easy upgrade flow</strong> - Simple process to upgrade</li>
        <li><strong>No pressure</strong> - Can dismiss and wait for reset</li>
      </ul>

      <h2>Understanding Usage</h2>

      <h3>Check Your Usage</h3>

      <p>
        You can always see:
      </p>

      <ul>
        <li><strong>Tests used this month</strong> - How many tests you've run</li>
        <li><strong>Tests remaining</strong> - How many tests you have left</li>
        <li><strong>Visual tests used</strong> - Visual test usage</li>
        <li><strong>Reset date</strong> - When limits reset</li>
      </ul>

      <h3>Usage Dashboard</h3>

      <p>
        View usage in your dashboard:
      </p>

      <ul>
        <li>Current usage stats</li>
        <li>Progress bars showing limits</li>
        <li>Reset date countdown</li>
        <li>Upgrade options</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Monitor usage</strong> - Check usage regularly to avoid surprises</li>
        <li><strong>Plan ahead</strong> - Upgrade before hitting limits if you know you'll need more</li>
        <li><strong>Use wisely</strong> - Focus tests on important changes</li>
        <li><strong>Consider add-ons</strong> - Sometimes cheaper than full upgrade</li>
      </ul>

      <h2>Limits Reset</h2>

      <h3>Monthly Reset</h3>

      <p>
        Limits reset monthly:
      </p>

      <ul>
        <li><strong>On billing date</strong> - Resets when subscription renews</li>
        <li><strong>Automatic</strong> - No action needed</li>
        <li><strong>Full reset</strong> - Get full allowance again</li>
        <li><strong>Unused tests don't roll over</strong> - Use them or lose them</li>
      </ul>

      <h2>Example Scenarios</h2>

      <h3>Scenario 1: Hit Test Limit Mid-Month</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Situation:</strong> You're on Starter plan (50 tests/month), used all 50 tests on day 15</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Options:</strong></div>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Wait 15 days for reset</li>
            <li>Upgrade to Indie plan (200 tests) - get 200 tests immediately</li>
            <li>Buy add-on tests (e.g., 50 more tests)</li>
          </ul>
        </div>
      </div>

      <h3>Scenario 2: Hit Visual Test Limit</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Situation:</strong> You're on Indie plan (50 visual tests/month), used all 50</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>What happens:</strong> New tests run without visual checks</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Options:</strong></div>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Continue with non-visual tests until reset</li>
            <li>Buy additional visual tests</li>
            <li>Upgrade to Pro plan (150 visual tests)</li>
          </ul>
        </div>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/pricing-plans">Learn about plans and limits</a></li>
        <li><a href="/docs/upgrading-downgrading">See how to upgrade or buy add-ons</a></li>
        <li><a href="/pricing">View pricing page</a></li>
      </ul>
    </article>
  )
}

