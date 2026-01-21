export default function FixPromptsAssistiveContent() {
  return (
    <article>
      <h1>Why Fix Prompts Are Assistive, Not Auto-Fixes</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Fix prompts are tools to help you fix issues faster, not automatic solutions.</strong> They provide structured information you can use with AI coding assistants, but you still need to review, understand, test, and verify fixes. They assist your work, they don't replace it.
      </p>

      <h2>What "Assistive" Means</h2>

      <p>
        Assistive means the prompts help you work faster and better, but you're still in control:
      </p>

      <ul>
        <li><strong>You review</strong> - Always review AI-generated fixes before applying</li>
        <li><strong>You understand</strong> - Make sure you understand what the fix does</li>
        <li><strong>You test</strong> - Verify fixes actually work</li>
        <li><strong>You decide</strong> - Choose whether to apply fixes or try different approaches</li>
      </ul>

      <h2>Why Not Auto-Fix?</h2>

      <h3>1. Context Matters</h3>

      <p>
        AI assistants don't have full context:
      </p>

      <ul>
        <li><strong>Codebase knowledge</strong> - May not know your architecture patterns</li>
        <li><strong>Business logic</strong> - Doesn't understand domain-specific requirements</li>
        <li><strong>Team standards</strong> - May not follow your coding style or conventions</li>
        <li><strong>Dependencies</strong> - Might not know about your library versions</li>
      </ul>

      <h3>2. AI Can Be Wrong</h3>

      <p>
        AI assistants make mistakes:
      </p>

      <ul>
        <li><strong>May misunderstand the problem</strong> - Could fix the wrong thing</li>
        <li><strong>May introduce new bugs</strong> - Fix might break something else</li>
        <li><strong>May use outdated patterns</strong> - Might suggest old approaches</li>
        <li><strong>May not handle edge cases</strong> - Could miss important scenarios</li>
      </ul>

      <h3>3. Code Quality</h3>

      <p>
        Auto-applied fixes might not meet your standards:
      </p>

      <ul>
        <li><strong>Code style</strong> - May not match your team's style</li>
        <li><strong>Best practices</strong> - Might not follow your conventions</li>
        <li><strong>Performance</strong> - Might not optimize correctly</li>
        <li><strong>Maintainability</strong> - Code might be harder to maintain</li>
      </ul>

      <h2>How Fix Prompts Assist</h2>

      <h3>1. Structured Information</h3>

      <p>
        Fix prompts organize information clearly:
      </p>

      <ul>
        <li>Problem description</li>
        <li>Error details</li>
        <li>Context and evidence</li>
        <li>Suggested fix approach</li>
      </ul>

      <p>
        This saves you time organizing information yourself.
      </p>

      <h3>2. Better AI Interactions</h3>

      <p>
        Well-structured prompts lead to better AI suggestions:
      </p>

      <ul>
        <li>AI assistants understand problems better</li>
        <li>More accurate fix suggestions</li>
        <li>Less back-and-forth needed</li>
      </ul>

      <h3>3. Learning Tool</h3>

      <p>
        Fix prompts help you learn:
      </p>

      <ul>
        <li>See how issues are diagnosed</li>
        <li>Understand fix approaches</li>
        <li>Learn patterns for similar issues</li>
      </ul>

      <h2>Your Responsibilities</h2>

      <h3>Review Generated Code</h3>

      <p>
        Always review AI suggestions before applying:
      </p>

      <ul>
        <li>Understand what the code does</li>
        <li>Check if it solves the problem</li>
        <li>Verify it doesn't break other things</li>
        <li>Ensure it follows your standards</li>
      </ul>

      <h3>Test Fixes Thoroughly</h3>

      <p>
        Don't trust fixes blindly:
      </p>

      <ul>
        <li>Test the fix works</li>
        <li>Verify it doesn't break other functionality</li>
        <li>Check edge cases</li>
        <li>Re-run Rihario exploration if needed</li>
      </ul>

      <h3>Understand the Problem</h3>

      <p>
        Make sure you understand:
      </p>

      <ul>
        <li>What the issue was</li>
        <li>Why it occurred</li>
        <li>How the fix works</li>
        <li>If the fix is appropriate</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Use as starting point</strong> - Prompts help you start, not finish</li>
        <li><strong>Review everything</strong> - Never blindly apply AI suggestions</li>
        <li><strong>Test thoroughly</strong> - Verify fixes work correctly</li>
        <li><strong>Iterate if needed</strong> - Don't hesitate to refine fixes</li>
        <li><strong>Learn from prompts</strong> - Use them to improve your understanding</li>
      </ul>

      <h2>Example Workflow</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>1.</strong> Rihario finds issue</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>2.</strong> Generate fix prompt</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>3.</strong> Paste into Cursor/ChatGPT</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>4.</strong> AI suggests code fix</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>5.</strong> <strong>You review</strong> the suggestion</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>6.</strong> <strong>You understand</strong> what it does</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>7.</strong> <strong>You apply</strong> the fix (or modify it)</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>8.</strong> <strong>You test</strong> to verify it works</div>
          <div><strong>9.</strong> <strong>You verify</strong> nothing else broke</div>
        </div>
      </div>

      <p>
        Notice: Steps 5-9 are <strong>your responsibility</strong>. The prompt assists steps 1-4.
      </p>

      <h2>When Fix Prompts Work Best</h2>

      <ul>
        <li><strong>Clear, isolated issues</strong> - Well-defined problems in specific files</li>
        <li><strong>Obvious bugs</strong> - Errors with clear causes</li>
        <li><strong>You understand the domain</strong> - You can verify fixes are correct</li>
        <li><strong>You review carefully</strong> - You take time to understand suggestions</li>
      </ul>

      <h2>When to Be More Cautious</h2>

      <ul>
        <li><strong>Complex business logic</strong> - Requires deep domain knowledge</li>
        <li><strong>Architectural changes</strong> - May have wide-reaching impacts</li>
        <li><strong>Security-sensitive code</strong> - Needs careful security review</li>
        <li><strong>Performance-critical code</strong> - Needs performance validation</li>
      </ul>

      <h2>Summary</h2>

      <p>
        Fix prompts are powerful tools that help you fix issues faster, but they're assistive, not automatic. You're always responsible for:
      </p>

      <ul>
        <li>Reviewing AI suggestions</li>
        <li>Understanding what fixes do</li>
        <li>Testing fixes thoroughly</li>
        <li>Ensuring code quality</li>
      </ul>

      <p>
        Use fix prompts to speed up your work, but never skip the review and testing steps.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/using-fix-prompts">Learn how to use fix prompts effectively</a></li>
        <li><a href="/docs/generate-fix-prompts">See how to generate fix prompts</a></li>
        <li><a href="/docs/choosing-ai-model">Choose the right AI model</a></li>
      </ul>
    </article>
  )
}

