import { TLDR, FitCard, Callout, DocsHero, DefaultHeroVisual } from '@/components/docs'

export default function WhoIsThisForContent() {
  return (
    <article>
      <DocsHero
        title="Who Is This Tool For?"
        summary={
          <>
            <strong>Rihario is built for solo developers and indie builders who need quick confidence checks before shipping.</strong> It's designed for people who ship fast, iterate often, and care more about "does it feel broken?" than comprehensive test coverage.
          </>
        }
        visual={<DefaultHeroVisual />}
      />

      <h2>Perfect For You If...</h2>

      <FitCard type="good">
        <ul>
          <li><strong>You build frontend apps solo or in small teams</strong> - You're building web apps, SaaS products, or frontend-heavy projects. You're the person writing the code, deploying, and making sure things work.</li>
          <li><strong>You want confidence, not guarantees</strong> - You understand that AI-powered testing is probabilistic. You want to know "are there obvious issues?" not "is every possible scenario covered?"</li>
          <li><strong>You don't want to write test scripts</strong> - The idea of writing Playwright or Cypress tests makes you cringe. You want to check your app, not maintain test infrastructure.</li>
          <li><strong>You ship fast and iterate often</strong> - You deploy multiple times per day or week. You need quick checks that don't slow you down.</li>
          <li><strong>You're pragmatic about testing</strong> - You know that perfect test coverage is impossible. You care about catching obvious problems, not edge cases that affect 0.01% of users.</li>
        </ul>
      </FitCard>

      <h2>Probably Not For You If...</h2>

      <FitCard type="bad">
        <ul>
          <li><strong>You need test coverage metrics</strong> - If your stakeholders or compliance requires test coverage percentages, Rihario won't meet those needs.</li>
          <li><strong>You want to replace Playwright or Selenium</strong> - Rihario isn't a replacement. It's a different approach - exploratory rather than scripted.</li>
          <li><strong>You need CI/CD pipeline integration</strong> - While you could run Rihario in CI/CD, it's not designed for that. Results are probabilistic and require human judgment.</li>
          <li><strong>You need compliance or audit trails</strong> - Rihario doesn't provide detailed audit logs or compliance reports for regulatory requirements.</li>
          <li><strong>You want deterministic results</strong> - If you need the same test to produce identical results every time, Rihario isn't for you.</li>
        </ul>
      </FitCard>

      <h2>Use Cases That Work Well</h2>

      <ul>
        <li><strong>Pre-deployment checks</strong> - "Let me quickly check if my latest changes broke anything obvious"</li>
        <li><strong>Visual regression checks</strong> - "Did my CSS changes break the layout?"</li>
        <li><strong>Flow verification</strong> - "Does the checkout flow still work end-to-end?"</li>
        <li><strong>Cross-browser checks</strong> - "Does this work in Chrome, Firefox, and Safari?"</li>
        <li><strong>Accessibility spot checks</strong> - "Are there obvious accessibility issues?"</li>
        <li><strong>Form validation checks</strong> - "Do my forms handle errors correctly?"</li>
      </ul>

      <h2>Use Cases That Don't Work Well</h2>

      <ul>
        <li><strong>Comprehensive regression testing</strong> - AI explores what it finds, doesn't guarantee all paths are tested</li>
        <li><strong>CI/CD gates</strong> - Results are probabilistic, shouldn't block deployments</li>
        <li><strong>Performance benchmarking</strong> - Not designed for precise performance metrics</li>
        <li><strong>API testing</strong> - Focused on frontend, not backend APIs</li>
        <li><strong>Mobile app testing</strong> - Desktop web apps only, not native mobile apps</li>
        <li><strong>Automated monitoring</strong> - Designed for on-demand checks, not continuous monitoring</li>
      </ul>

      <Callout type="info">
        <p>
          <strong>Still not sure?</strong> Try it. There's a free tier with 5 tests per month - no credit card required. Run a test on your app and see if the results are useful to you.
        </p>
      </Callout>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/different-from-traditional-testing">Learn how this differs from traditional testing</a></li>
        <li><a href="/docs/run-first-test">Run your first test</a></li>
        <li><a href="/docs/faq-worth-it">Read: Is this tool worth it for solo developers?</a></li>
      </ul>
    </article>
  )
}
