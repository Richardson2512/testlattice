export default function PreShipConfidenceContent() {
  return (
    <article>
      <h1>What "Pre-Ship Confidence" Actually Means</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Pre-ship confidence means knowing your app doesn't have obvious problems before deploying.</strong> It's not about achieving perfect test coverage or catching every possible bug. It's about avoiding the embarrassing mistakes that make you look bad in production.
      </p>

      <h2>What Confidence Means (And What It Doesn't)</h2>

      <h3>Confidence Means:</h3>

      <ul>
        <li><strong>"Nothing obviously broken"</strong> - Your app doesn't have glaring issues</li>
        <li><strong>"Key flows work"</strong> - Users can accomplish primary tasks</li>
        <li><strong>"Won't embarrass me"</strong> - No obvious bugs that make you look unprofessional</li>
        <li><strong>"Safe to ship"</strong> - You're comfortable deploying, knowing you checked</li>
      </ul>

      <h3>Confidence Does NOT Mean:</h3>

      <ul>
        <li><strong>100% bug-free</strong> - There might be edge cases you haven't tested</li>
        <li><strong>Perfect coverage</strong> - Every possible scenario isn't tested</li>
        <li><strong>Guaranteed success</strong> - No tool can guarantee your app is perfect</li>
        <li><strong>Regression-proof</strong> - Future changes might break things</li>
      </ul>

      <h2>Why "Confidence" Not "Coverage"?</h2>

      <p>
        Traditional QA focuses on coverage:
      </p>

      <ul>
        <li>How many test cases exist?</li>
        <li>What percentage of code is tested?</li>
        <li>Are all edge cases covered?</li>
      </ul>

      <p>
        Coverage metrics feel good, but they're often misleading:
      </p>

      <ul>
        <li>You can have 90% coverage and still ship bugs</li>
        <li>Edge cases that affect 0.01% of users get the same priority as critical flows</li>
        <li>Tests pass but the app still feels broken</li>
        <li>Maintaining comprehensive tests slows down development</li>
      </ul>

      <p>
        <strong>Confidence is different.</strong> It's about:
      </p>

      <ul>
        <li>"Does this feel broken?" not "Is every scenario covered?"</li>
        <li>"Are there obvious issues?" not "What's my coverage percentage?"</li>
        <li>"Can I ship without embarrassment?" not "Have I tested everything?"</li>
      </ul>

      <h2>What Gives You Confidence?</h2>

      <h3>1. Key Flows Work</h3>

      <p>
        Your most important user flows work:
      </p>

      <ul>
        <li>Users can sign up</li>
        <li>Users can log in</li>
        <li>Users can complete primary actions (buy, submit, save, etc.)</li>
        <li>Navigation makes sense</li>
      </ul>

      <p>
        If these work, you have confidence that your app is usable, even if edge cases aren't tested.
      </p>

      <h3>2. No Obvious Visual Issues</h3>

      <p>
        Your app looks correct:
      </p>

      <ul>
        <li>Layout isn't broken</li>
        <li>Elements aren't overlapping</li>
        <li>Text is readable</li>
        <li>Buttons and forms look right</li>
      </ul>

      <p>
        Visual issues are embarrassing and obvious to users. If your app looks broken, confidence goes out the window.
      </p>

      <h3>3. No Blocker Errors</h3>

      <p>
        Critical errors are caught:
      </p>

      <ul>
        <li>Console errors that break functionality</li>
        <li>Network errors that prevent data loading</li>
        <li>Form validation that doesn't work</li>
        <li>Authentication that fails</li>
      </ul>

      <p>
        You don't need to catch every error - just the ones that would prevent users from using your app.
      </p>

      <h3>4. You Checked Before Shipping</h3>

      <p>
        Perhaps most importantly: <strong>you actually checked.</strong>
      </p>

      <p>
        Having a tool run an exploration and show you results is better than:
      </p>

      <ul>
        <li>Manually clicking around (easy to miss things)</li>
        <li>Assuming it works (dangerous)</li>
        <li>Only testing in development (production might differ)</li>
        <li>Not checking at all (risky)</li>
      </ul>

      <h2>Confidence Levels</h2>

      <p>
        Think of confidence on a spectrum:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🟢 High Confidence</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Explored key flows, found 0 issues, everything looks good. Ship it.
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🟡 Medium Confidence</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Found a few minor issues, but nothing blocking. Fix the obvious ones, then ship.
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🔴 Low Confidence</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Found critical issues or blockers. Don't ship until fixed.
          </div>
        </div>
      </div>

      <h2>What Rihario Provides</h2>

      <p>
        Rihario helps you achieve confidence by:
      </p>

      <ul>
        <li><strong>Exploring your app</strong> - Actually checks things, doesn't just assume</li>
        <li><strong>Finding obvious issues</strong> - Catches problems that would embarrass you</li>
        <li><strong>Showing evidence</strong> - Screenshots and logs so you know what's actually broken</li>
        <li><strong>Being fast</strong> - Get confidence in minutes, not hours</li>
        <li><strong>Requiring no maintenance</strong> - Works even when your app changes</li>
      </ul>

      <p>
        It doesn't provide:
      </p>

      <ul>
        <li>Coverage metrics</li>
        <li>Guarantees of perfection</li>
        <li>Every edge case tested</li>
        <li>Deterministic results</li>
      </ul>

      <h2>Real-World Example</h2>

      <p>
        You just updated your checkout flow. You want confidence that:
      </p>

      <ul>
        <li>Users can add items to cart</li>
        <li>Checkout form works</li>
        <li>Payment processing doesn't error out</li>
        <li>Layout looks correct</li>
        <li>No obvious console errors</li>
      </ul>

      <p>
        You <strong>don't</strong> need to test:
      </p>

      <ul>
        <li>Every possible payment method combination</li>
        <li>What happens if server is down (that's infrastructure, not your code)</li>
        <li>Edge cases with invalid data (users shouldn't be entering that anyway)</li>
        <li>Scenarios that require specific account states</li>
      </ul>

      <p>
        Run a Rihario exploration, see that the main flow works and no obvious issues were found, and ship with confidence. You know it's not perfect, but you know it's not obviously broken.
      </p>

      <h2>Balancing Confidence vs Perfection</h2>

      <p>
        The key is understanding when confidence is enough:
      </p>

      <ul>
        <li><strong>Confidence is enough for:</strong> Most apps, solo projects, fast iteration, MVPs</li>
        <li><strong>Perfection is needed for:</strong> Medical devices, financial systems, compliance-critical apps</li>
      </ul>

      <p>
        Most solo developers and indie builders don't need perfection - they need confidence. Rihario provides that without the overhead of comprehensive test suites.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/what-is-vibe-testing">Learn more about vibe testing</a></li>
        <li><a href="/docs/ai-accuracy">Understand AI accuracy and limitations</a></li>
        <li><a href="/docs/faq-worth-it">Read: Is this tool worth it for solo developers?</a></li>
      </ul>
    </article>
  )
}

