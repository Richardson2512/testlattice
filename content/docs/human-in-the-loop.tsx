export default function HumanInTheLoopContent() {
  return (
    <article>
      <h1>Human-in-the-Loop Testing Explained</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Human-in-the-loop means you can pause AI exploration at any time, take manual control, guide the AI, or override its decisions.</strong> It's like pair programming with an AI - the AI does most of the work, but you're always there to help when needed.
      </p>

      <h2>What Does "In the Loop" Mean?</h2>

      <p>
        Traditional automated testing is hands-off:
      </p>

      <ul>
        <li>You write a script</li>
        <li>You run it</li>
        <li>You get results</li>
        <li>No interaction during execution</li>
      </ul>

      <p>
        Human-in-the-loop means you're part of the process:
      </p>

      <ul>
        <li>You watch the AI work</li>
        <li>You can pause and intervene</li>
        <li>You can guide or override</li>
        <li>You work together</li>
      </ul>

      <h2>How It Works in Rihario</h2>

      <h3>1. Live View</h3>

      <p>
        You see exactly what the AI is doing in real-time:
      </p>

      <ul>
        <li>What page it's on</li>
        <li>What it's clicking</li>
        <li>What it's typing</li>
        <li>What it's noticing</li>
        <li>What decisions it's making</li>
      </ul>

      <p>
        This transparency builds trust. You're not waiting for results - you're watching the process.
      </p>

      <h3>2. Pause Anytime</h3>

      <p>
        During exploration, you can pause:
      </p>

      <ul>
        <li>Click "Pause" button</li>
        <li>Exploration stops immediately</li>
        <li>Browser state is preserved</li>
        <li>You can inspect what's happening</li>
      </ul>

      <p>
        Useful when:
      </p>

      <ul>
        <li>The AI is going down the wrong path</li>
        <li>You want to check something manually</li>
        <li>You need to provide additional context</li>
        <li>Something unexpected happens</li>
      </ul>

      <h3>3. Take Control</h3>

      <p>
        When paused, you can take manual control:
      </p>

      <ul>
        <li>Click "Take Control"</li>
        <li>Interact with the page yourself</li>
        <li>Navigate, fill forms, click buttons</li>
        <li>Do whatever you need to do</li>
      </ul>

      <p>
        Common use cases:
      </p>

      <ul>
        <li><strong>Authenticate manually</strong> - Log in if the AI can't handle your auth flow</li>
        <li><strong>Navigate to specific state</strong> - Go to a page the AI might not find</li>
        <li><strong>Handle edge cases</strong> - Deal with situations the AI struggles with</li>
        <li><strong>Set up test data</strong> - Create accounts, configure settings, etc.</li>
      </ul>

      <h3>4. Resume or Guide</h3>

      <p>
        After taking control, you can:
      </p>

      <ul>
        <li><strong>Resume exploration</strong> - Let the AI continue from where you left off</li>
        <li><strong>Provide guidance</strong> - Give the AI new instructions for what to check</li>
        <li><strong>Continue manually</strong> - Keep exploring yourself if needed</li>
      </ul>

      <h3>5. Override Decisions</h3>

      <p>
        You can override AI decisions:
      </p>

      <ul>
        <li>Force it to click a specific element</li>
        <li>Provide different input</li>
        <li>Skip certain steps</li>
        <li>Change exploration focus</li>
      </ul>

      <p>
        The AI adapts to your overrides and continues exploring from your guidance.
      </p>

      <h2>Why This Matters</h2>

      <h3>Trust Through Transparency</h3>

      <p>
        Watching the AI work builds trust. You see:
      </p>

      <ul>
        <li>What it's actually doing</li>
        <li>Why it made decisions</li>
        <li>When it's struggling</li>
        <li>When it's working well</li>
      </ul>

      <p>
        This transparency makes you confident in the results.
      </p>

      <h3>Handling Edge Cases</h3>

      <p>
        AI can't handle everything:
      </p>

      <ul>
        <li>Complex authentication flows</li>
        <li>CAPTCHAs and MFA</li>
        <li>Multi-step processes requiring human judgment</li>
        <li>Situations requiring domain knowledge</li>
      </ul>

      <p>
        Human-in-the-loop lets you handle these cases manually, then let the AI continue.
      </p>

      <h3>Learning and Improvement</h3>

      <p>
        When you guide the AI, it learns:
      </p>

      <ul>
        <li>Your preferences</li>
        <li>Your app's patterns</li>
        <li>What you consider important</li>
        <li>How to handle your specific edge cases</li>
      </ul>

      <p>
        Over time, the AI gets better at exploring your specific app.
      </p>

      <h2>Real-World Examples</h2>

      <h3>Example 1: Authentication Required</h3>

      <ol>
        <li>You start an exploration on a protected page</li>
        <li>AI hits the login screen</li>
        <li>You pause and take control</li>
        <li>You log in manually</li>
        <li>You resume exploration</li>
        <li>AI continues exploring authenticated areas</li>
      </ol>

      <h3>Example 2: Wrong Path</h3>

      <ol>
        <li>AI starts exploring</li>
        <li>You notice it's going down the wrong path</li>
        <li>You pause and provide new instructions: "focus on the checkout flow"</li>
        <li>AI resumes with new focus</li>
        <li>Exploration continues on the right path</li>
      </ol>

      <h3>Example 3: Complex Form</h3>

      <ol>
        <li>AI reaches a complex form</li>
        <li>It struggles to fill it correctly</li>
        <li>You pause and take control</li>
        <li>You fill the form manually with correct data</li>
        <li>You resume exploration</li>
        <li>AI continues from the submitted form</li>
      </ol>

      <h2>When to Intervene</h2>

      <p>
        You should intervene when:
      </p>

      <ul>
        <li><strong>AI is stuck</strong> - Can't proceed past a blocker</li>
        <li><strong>AI is wrong</strong> - Making incorrect decisions</li>
        <li><strong>Edge case needed</strong> - Situation requires human knowledge</li>
        <li><strong>Authentication required</strong> - Can't proceed without login</li>
        <li><strong>You want to guide</strong> - Know a better path to explore</li>
      </ul>

      <p>
        You don't need to intervene when:
      </p>

      <ul>
        <li>AI is working fine</li>
        <li>Exploration is going smoothly</li>
        <li>No blockers or issues</li>
        <li>You're just observing</li>
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
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Visibility</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>See results after execution</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Watch execution live</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Intervention</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Can't intervene during execution</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Can pause and take control anytime</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Guidance</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Must write new script for changes</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Can guide mid-exploration</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Edge Cases</td>
              <td style={{ padding: '0.75rem' }}>Must code handling in script</td>
              <td style={{ padding: '0.75rem' }}>Handle manually, then resume</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Watch first, intervene when needed</strong> - Let the AI work, but step in when necessary</li>
        <li><strong>Provide clear guidance</strong> - When you intervene, be specific about what you want</li>
        <li><strong>Use for edge cases</strong> - Handle complex situations manually, let AI handle routine exploration</li>
        <li><strong>Learn from interventions</strong> - Notice patterns in when you need to step in</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/what-happens-test-starts">See what happens when a test starts</a></li>
        <li><a href="/docs/test-login-flows">Learn how to test login flows</a></li>
        <li><a href="/docs/credentials-handling">Understand credential handling</a></li>
      </ul>
    </article>
  )
}

