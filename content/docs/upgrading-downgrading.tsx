export default function UpgradingDowngradingContent() {
  return (
    <article>
      <h1>Upgrading, Downgrading, and Add-Ons</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>You can upgrade or downgrade your Rihario plan anytime.</strong> Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your billing cycle. Add-ons let you buy additional tests without changing your plan.
      </p>

      <h2>Upgrading Your Plan</h2>

      <h3>How to Upgrade</h3>

      <ol>
        <li>Go to your account settings or pricing page</li>
        <li>Select the plan you want</li>
        <li>Confirm the upgrade</li>
        <li>New limits apply immediately</li>
      </ol>

      <h3>What Happens When You Upgrade</h3>

      <ul>
        <li><strong>Immediate access</strong> - New limits apply right away</li>
        <li><strong>Prorated billing</strong> - Pay difference for remaining days in month</li>
        <li><strong>No loss of tests</strong> - Existing tests and results preserved</li>
        <li><strong>Full new allowance</strong> - Get full new plan limits</li>
      </ul>

      <h3>Example: Upgrading Mid-Month</h3>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>Situation:</strong> On Starter ($19/month), 15 days into billing cycle</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>Upgrade to:</strong> Indie ($49/month)</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>What happens:</strong></div>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Charged ~$15 (prorated difference for remaining 15 days)</li>
            <li>Get 200 tests immediately (new plan limit)</li>
            <li>Next billing cycle: $49/month</li>
          </ul>
        </div>
      </div>

      <h2>Downgrading Your Plan</h2>

      <h3>How to Downgrade</h3>

      <ol>
        <li>Go to your account settings</li>
        <li>Select the plan you want</li>
        <li>Confirm the downgrade</li>
        <li>Changes take effect at end of billing cycle</li>
      </ol>

      <h3>What Happens When You Downgrade</h3>

      <ul>
        <li><strong>End of cycle</strong> - New limits apply at next billing date</li>
        <li><strong>No refund</strong> - Keep current plan benefits until cycle ends</li>
        <li><strong>Keep existing tests</strong> - All tests and results preserved</li>
        <li><strong>No immediate charge</strong> - No charge until next cycle</li>
      </ul>

      <h3>Important: Usage When Downgrading</h3>

      <p>
        If you've used more than the new plan allows:
      </p>

      <ul>
        <li><strong>Can't exceed new limits</strong> - Must wait for reset after downgrade</li>
        <li><strong>Plan ahead</strong> - Downgrade before using too many tests</li>
      </ul>

      <h2>Add-Ons</h2>

      <h3>What Are Add-Ons?</h3>

      <p>
        Add-ons let you buy additional tests without changing your plan:
      </p>

      <ul>
        <li><strong>Additional tests</strong> - Buy more regular tests</li>
        <li><strong>Additional visual tests</strong> - Buy more visual tests</li>
        <li><strong>One-time purchase</strong> - Buy what you need, no subscription</li>
        <li><strong>Added to current month</strong> - Tests available immediately</li>
      </ul>

      <h3>When to Use Add-Ons</h3>

      <ul>
        <li><strong>Temporary need</strong> - Need more tests for one month</li>
        <li><strong>Cheaper than upgrade</strong> - Sometimes cheaper than full upgrade</li>
        <li><strong>Specific needs</strong> - Only need more tests, not other plan features</li>
      </ul>

      <h3>Add-On Pricing</h3>

      <ul>
        <li><strong>Additional tests</strong> - Typically $0.50-$1 per test</li>
        <li><strong>Additional visual tests</strong> - Typically $1-$2 per visual test</li>
        <li><strong>Bulk discounts</strong> - Better rates for larger purchases</li>
      </ul>

      <p>
        Exact pricing shown when purchasing add-ons.
      </p>

      <h2>Comparing Options</h2>

      <h3>Upgrade vs Add-On</h3>

      <p>
        When deciding between upgrade and add-on:
      </p>

      <ul>
        <li><strong>Upgrade if:</strong> You consistently need more tests</li>
        <li><strong>Add-on if:</strong> You only need more tests occasionally</li>
        <li><strong>Upgrade if:</strong> You want other plan features (mobile testing, etc.)</li>
        <li><strong>Add-on if:</strong> You only need more tests, not other features</li>
      </ul>

      <h2>Managing Your Subscription</h2>

      <h3>Account Settings</h3>

      <p>
        In your account settings, you can:
      </p>

      <ul>
        <li>View current plan</li>
        <li>See usage and limits</li>
        <li>Upgrade or downgrade</li>
        <li>Buy add-ons</li>
        <li>View billing history</li>
        <li>Update payment method</li>
      </ul>

      <h3>Billing</h3>

      <ul>
        <li><strong>Monthly billing</strong> - Plans billed monthly</li>
        <li><strong>Automatic renewal</strong> - Renews automatically each month</li>
        <li><strong>Cancel anytime</strong> - Cancel subscription anytime</li>
        <li><strong>No long-term contracts</strong> - No commitments</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Start lower</strong> - Start with lower plan, upgrade as needed</li>
        <li><strong>Monitor usage</strong> - Track usage to know when to upgrade</li>
        <li><strong>Use add-ons strategically</strong> - Use for occasional needs</li>
        <li><strong>Downgrade carefully</strong> - Make sure you won't need higher limits</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/pricing-plans">Learn about plans and limits</a></li>
        <li><a href="/docs/hitting-limits">See what happens when you hit limits</a></li>
        <li><a href="/pricing">View pricing and upgrade options</a></li>
      </ul>
    </article>
  )
}

