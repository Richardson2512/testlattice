export default function FAQMissedIssueContent() {
  return (
    <article>
      <h1>Why Did the AI Miss an Issue?</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>AI testing can miss issues for several reasons:</strong> it's probabilistic (not deterministic), focuses on obvious problems, may not explore certain paths, or the issue requires human judgment. This is normal and expected. AI testing finds obvious issues quickly, but doesn't guarantee finding everything. Always supplement with manual testing for critical flows.
      </p>

      <h2>Why Issues Get Missed</h2>

      <h3>1. Probabilistic Exploration</h3>

      <p>
        AI exploration is probabilistic:
      </p>

      <ul>
        <li><strong>Different paths each time</strong> - May not take the path where issue exists</li>
        <li><strong>Not exhaustive</strong> - Explores what it finds, not every possible route</li>
        <li><strong>May miss edge cases</strong> - Doesn't test every scenario</li>
      </ul>

      <h3>2. Focus on Obvious Issues</h3>

      <p>
        AI prioritizes obvious problems:
      </p>

      <ul>
        <li><strong>Broken layouts</strong> - Clear visual issues</li>
        <li><strong>Console errors</strong> - JavaScript errors</li>
        <li><strong>Network failures</strong> - Failed requests</li>
        <li><strong>May miss subtle issues</strong> - Logic errors, edge cases</li>
      </ul>

      <h3>3. Didn't Explore That Path</h3>

      <p>
        AI may not have explored where the issue is:
      </p>

      <ul>
        <li><strong>Different navigation</strong> - Took different route through site</li>
        <li><strong>Didn't trigger condition</strong> - Issue requires specific conditions</li>
        <li><strong>Limited exploration</strong> - Didn't explore deep enough</li>
      </ul>

      <h3>4. Requires Human Judgment</h3>

      <p>
        Some issues need human evaluation:
      </p>

      <ul>
        <li><strong>UX problems</strong> - "Does this feel right?"</li>
        <li><strong>Business logic</strong> - Does it meet requirements?</li>
        <li><strong>Design quality</strong> - Is design appropriate?</li>
        <li><strong>Subtle bugs</strong> - Issues that aren't obvious</li>
      </ul>

      <h3>5. Edge Cases</h3>

      <p>
        AI may not test edge cases:
      </p>

      <ul>
        <li><strong>Unusual inputs</strong> - Edge case data or scenarios</li>
        <li><strong>Specific conditions</strong> - Issues that only occur under certain conditions</li>
        <li><strong>Complex flows</strong> - Multi-step processes requiring decisions</li>
      </ul>

      <h2>This Is Normal</h2>

      <p>
        Missing some issues is expected with AI testing:
      </p>

      <ul>
        <li><strong>Not designed for 100% coverage</strong> - Focuses on confidence, not coverage</li>
        <li><strong>Finds obvious issues</strong> - Catches clear problems quickly</li>
        <li><strong>Probabilistic by nature</strong> - Cannot guarantee finding everything</li>
        <li><strong>Supplement with manual testing</strong> - Use AI + manual together</li>
      </ul>

      <h2>How to Reduce Missed Issues</h2>

      <h3>1. Provide Clear Instructions</h3>

      <ul>
        <li>Guide AI to specific areas</li>
        <li>Focus on critical flows</li>
        <li>Specify what to check</li>
      </ul>

      <h3>2. Run Multiple Times</h3>

      <ul>
        <li>Different runs may find different issues</li>
        <li>Increases chance of finding problems</li>
        <li>Explores different paths</li>
      </ul>

      <h3>3. Test Critical Flows Manually</h3>

      <ul>
        <li>Always manually test critical paths</li>
        <li>Check edge cases yourself</li>
        <li>Evaluate UX and design</li>
      </ul>

      <h3>4. Use Both AI and Manual</h3>

      <ul>
        <li>AI for quick checks of obvious issues</li>
        <li>Manual for critical flows and edge cases</li>
        <li>Together provide better coverage</li>
      </ul>

      <h2>What AI Testing Is Good For</h2>

      <ul>
        <li><strong>Finding obvious bugs</strong> - Catches clear problems</li>
        <li><strong>Quick checks</strong> - Fast verification after changes</li>
        <li><strong>Confidence building</strong> - Know nothing obvious is broken</li>
        <li><strong>Discovering unexpected issues</strong> - Finds problems you didn't think to test</li>
      </ul>

      <h2>What AI Testing Is NOT Good For</h2>

      <ul>
        <li><strong>100% coverage</strong> - Won't find everything</li>
        <li><strong>Edge cases</strong> - May miss unusual scenarios</li>
        <li><strong>UX evaluation</strong> - Requires human judgment</li>
        <li><strong>Business logic validation</strong> - Needs domain knowledge</li>
      </ul>

      <h2>Best Practice: AI + Manual</h2>

      <p>
        Use both AI and manual testing:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Recommended Approach:</div>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Run AI testing (finds obvious issues)</li>
            <li>Fix obvious issues found</li>
            <li>Manually test critical flows</li>
            <li>Manually test edge cases</li>
            <li>Ship with confidence</li>
          </ol>
        </div>
      </div>

      <h2>Answer: This Is Expected</h2>

      <p>
        <strong>AI testing missing some issues is normal and expected.</strong> AI finds obvious problems quickly, but doesn't guarantee 100% coverage. Always supplement with manual testing for critical flows and edge cases. Use AI for quick confidence checks, manual testing for comprehensive coverage.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/ai-accuracy">Learn about AI accuracy and limitations</a></li>
        <li><a href="/docs/cannot-guarantee-coverage">Understand why we can't guarantee coverage</a></li>
        <li><a href="/docs/pre-ship-confidence">Learn about pre-ship confidence</a></li>
      </ul>
    </article>
  )
}

