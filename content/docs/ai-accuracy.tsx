export default function AIAccuracyContent() {
  return (
    <article>
      <h1>How Accurate Are AI Test Results?</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>AI test results are probabilistic, not deterministic.</strong> The same exploration might find different issues or take different paths. AI testing is best for finding obvious problems quickly, not for guaranteeing 100% accuracy. Always verify findings manually.
      </p>

      <h2>Accuracy Characteristics</h2>

      <h3>Probabilistic, Not Deterministic</h3>

      <p>
        AI test results are probabilistic:
      </p>

      <ul>
        <li><strong>Same input ≠ Same output</strong> - Running same exploration twice may produce different results</li>
        <li><strong>Different paths</strong> - AI might explore different routes each time</li>
        <li><strong>Similar but not identical</strong> - Results will be similar, but not exactly the same</li>
      </ul>

      <p>
        This is different from scripted tests (Playwright, Selenium) which are deterministic - same input always produces same output.
      </p>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        For background on probabilistic vs deterministic systems, see <a href="https://developers.google.com/machine-learning/crash-course/classification/thresholding" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google's ML Crash Course on classification thresholding</a>.
      </p>

      <h3>Best at Finding Obvious Issues</h3>

      <p>
        AI testing excels at finding:
      </p>

      <ul>
        <li><strong>Obvious bugs</strong> - Things that clearly look broken</li>
        <li><strong>Visual problems</strong> - Layout issues, overlapping elements</li>
        <li><strong>Console errors</strong> - JavaScript errors that break functionality</li>
        <li><strong>Network errors</strong> - Failed API requests</li>
      </ul>

      <p>
        AI testing struggles with:
      </p>

      <ul>
        <li><strong>Subtle bugs</strong> - Edge cases, nuanced problems</li>
        <li><strong>Logic errors</strong> - Business logic mistakes</li>
        <li><strong>Performance issues</strong> - Slow but not broken functionality</li>
        <li><strong>Design preferences</strong> - "This looks ugly" is subjective</li>
      </ul>

      <h2>False Positives</h2>

      <h3>What Are False Positives?</h3>

      <p>
        False positives are issues reported that aren't actually problems:
      </p>

      <ul>
        <li>AI flags something as broken, but it's not</li>
        <li>Visual issue reported, but design is intentional</li>
        <li>Error flagged, but it's expected behavior</li>
      </ul>

      <h3>Common False Positives</h3>

      <ul>
        <li><strong>Intentional design</strong> - AI thinks something looks wrong, but it's by design</li>
        <li><strong>Expected errors</strong> - Errors that are supposed to happen (validation, etc.)</li>
        <li><strong>Dynamic content</strong> - Content that changes, AI flags as inconsistent</li>
        <li><strong>Third-party elements</strong> - External content that behaves differently</li>
      </ul>

      <h3>How to Handle False Positives</h3>

      <ol>
        <li><strong>Review findings</strong> - Always manually verify reported issues</li>
        <li><strong>Check if intentional</strong> - Determine if "issue" is actually intended behavior</li>
        <li><strong>Ignore if false</strong> - Don't fix things that aren't actually broken</li>
        <li><strong>Learn patterns</strong> - Notice which types of false positives are common</li>
      </ol>

      <h2>False Negatives</h2>

      <h3>What Are False Negatives?</h3>

      <p>
        False negatives are problems that exist but aren't detected:
      </p>

      <ul>
        <li>Bug exists, but AI didn't find it</li>
        <li>Issue present, but AI didn't explore that path</li>
        <li>Problem exists, but AI didn't notice it</li>
      </ul>

      <h3>Why False Negatives Happen</h3>

      <ul>
        <li><strong>Didn't explore that path</strong> - AI took different route, missed the issue</li>
        <li><strong>Not obvious enough</strong> - Problem too subtle for AI to detect</li>
        <li><strong>Edge case</strong> - Requires specific conditions AI didn't trigger</li>
        <li><strong>Logic error</strong> - Business logic mistake AI can't detect</li>
      </ul>

      <h3>How to Handle False Negatives</h3>

      <ul>
        <li><strong>Don't rely solely on AI</strong> - Still do manual testing</li>
        <li><strong>Test critical paths manually</strong> - Verify important flows yourself</li>
        <li><strong>Use AI as supplement</strong> - AI finds obvious issues, you find subtle ones</li>
        <li><strong>Accept limitations</strong> - AI won't catch everything, and that's okay</li>
      </ul>

      <h2>Accuracy Expectations</h2>

      <h3>What to Expect</h3>

      <ul>
        <li><strong>Finds obvious issues reliably</strong> - Broken layouts, console errors, etc.</li>
        <li><strong>May miss subtle issues</strong> - Edge cases, logic errors</li>
        <li><strong>Some false positives</strong> - Always verify findings manually</li>
        <li><strong>Different results each run</strong> - Probabilistic, not deterministic</li>
      </ul>

      <h3>What NOT to Expect</h3>

      <ul>
        <li><strong>100% accuracy</strong> - Will miss some issues, flag some non-issues</li>
        <li><strong>Deterministic results</strong> - Same input won't always produce same output</li>
        <li><strong>Complete coverage</strong> - Won't test every possible scenario</li>
        <li><strong>Perfect understanding</strong> - May misinterpret some situations</li>
      </ul>

      <h2>Improving Accuracy</h2>

      <h3>Better Instructions</h3>

      <p>
        Provide clear, specific instructions:
      </p>

      <ul>
        <li>"Test the checkout flow" vs "explore the site"</li>
        <li>Focus AI on specific areas</li>
        <li>Clarify what's important to check</li>
      </ul>

      <h3>Manual Verification</h3>

      <p>
        Always verify findings:
      </p>

      <ul>
        <li>Review screenshots and logs</li>
        <li>Manually reproduce issues</li>
        <li>Determine if findings are real problems</li>
      </ul>

      <h3>Multiple Runs</h3>

      <p>
        Run exploration multiple times:
      </p>

      <ul>
        <li>Different runs may find different issues</li>
        <li>Increases chance of catching problems</li>
        <li>Helps identify patterns</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Verify all findings</strong> - Don't blindly trust AI results</li>
        <li><strong>Use for quick checks</strong> - Best for finding obvious issues fast</li>
        <li><strong>Supplement with manual testing</strong> - AI + manual testing = better coverage</li>
        <li><strong>Accept limitations</strong> - AI won't catch everything, and that's okay</li>
        <li><strong>Focus on confidence</strong> - Goal is confidence before shipping, not perfect coverage</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/cannot-guarantee-coverage">See why we can't guarantee 100% coverage</a></li>
        <li><a href="/docs/pre-ship-confidence">Understand pre-ship confidence</a></li>
        <li><a href="/docs/understanding-first-result">Learn how to interpret results</a></li>
      </ul>
    </article>
  )
}

