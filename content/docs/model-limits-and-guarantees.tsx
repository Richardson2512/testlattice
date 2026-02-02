export default function ModelLimitsAndGuaranteesContent() {
  return (
    <article>
      <h1>Model Limits & Guarantees</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Explicit, honest information about how AI models are used in Rihario.</strong> This document explains what guarantees exist, what happens when things fail, and what the models can and cannot do.
      </p>

      <h2>One-Model-Per-Test Rule</h2>

      <p>
        <strong>Guarantee:</strong> Every test run uses exactly ONE reasoning model (GPT-5 Mini) from start to finish.
      </p>

      <h3>What This Means</h3>

      <ul>
        <li><strong>No model switching</strong> - The same model is used throughout the entire test</li>
        <li><strong>No fallback models</strong> - If the model fails, the test fails (with clear error messages)</li>
        <li><strong>Consistent behavior</strong> - Same model = same behavior patterns</li>
        <li><strong>Same for all users</strong> - Guest and registered tests use the same model</li>
      </ul>

      <h3>Why This Matters</h3>

      <ul>
        <li><strong>Predictable behavior</strong> - You know what to expect</li>
        <li><strong>Consistent costs</strong> - No surprise expensive model calls</li>
        <li><strong>Easier debugging</strong> - One model to understand, not multiple</li>
        <li><strong>No model-specific quirks</strong> - Results aren't affected by switching between models</li>
      </ul>

      <h2>Model Architecture</h2>

      <h3>GPT-5 Mini (Text/Reasoning)</h3>

      <ul>
        <li><strong>Used for:</strong> All text-based reasoning, planning, and decision-making</li>
        <li><strong>When:</strong> Every step of every test</li>
        <li><strong>Retries:</strong> Yes, same-model retry (see Retry Policy below)</li>
        <li><strong>Fallback:</strong> No - if it fails, the test fails</li>
      </ul>

      <h3>GPT-4o (Visual Analysis)</h3>

      <ul>
        <li><strong>Used for:</strong> Screenshot-based visual issue detection ONLY</li>
        <li><strong>When:</strong> Selectively (final steps, layout shifts, errors)</li>
        <li><strong>Retries:</strong> No - single attempt only</li>
        <li><strong>Fallback:</strong> No - if it fails, visual analysis is skipped</li>
      </ul>

      <h2>Retry Policy</h2>

      <h3>Same-Model Retry Envelope</h3>

      <p>
        <strong>What it is:</strong> A resilience guard for transient API failures (network blips, rate limits).
      </p>

      <h3>How It Works</h3>

      <ol>
        <li><strong>First attempt</strong> with GPT-5 Mini</li>
        <li><strong>If failure is retryable</strong> (429, network error, timeout):
          <ul>
            <li>Wait 200-400ms (randomized backoff)</li>
            <li>Retry with SAME model, SAME prompt</li>
          </ul>
        </li>
        <li><strong>Maximum 1 retry</strong> (2 total attempts)</li>
        <li><strong>If retry fails:</strong> Test fails with clear error message</li>
      </ol>

      <h3>What Is Retryable</h3>

      <ul>
        <li><strong>429 (rate limit exceeded)</strong> - Too many requests</li>
        <li><strong>Network errors</strong> - Connection resets, timeouts, DNS failures</li>
        <li><strong>Timeouts</strong> - Request took too long</li>
      </ul>

      <h3>What Is NOT Retryable</h3>

      <ul>
        <li><strong>400 (bad request)</strong> - Configuration issue, invalid API key or model name</li>
        <li><strong>401 (unauthorized)</strong> - API key is invalid or expired</li>
        <li><strong>Invalid responses</strong> - Malformed JSON, unexpected format</li>
      </ul>

      <h3>Guarantee</h3>

      <ul>
        <li>Same model used for retry (no model switching)</li>
        <li>Same prompt used (deterministic behavior)</li>
        <li>Maximum 1 retry (bounded latency - 200-400ms)</li>
      </ul>

      <h2>Tier-Based Usage Limits</h2>

      <p>
        To ensure fair usage and prevent abuse, each test run has specific limits based on your subscription tier. These limits apply to every single run.
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
        overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tier</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Step Limit (LLM Calls)</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Vision Limit (Screenshots)</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Retry Limit</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Guest</td>
              <td style={{ padding: '0.75rem' }}>25 steps</td>
              <td style={{ padding: '0.75rem' }}>1 check</td>
              <td style={{ padding: '0.75rem' }}>1 retry</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Starter</td>
              <td style={{ padding: '0.75rem' }}>35 steps</td>
              <td style={{ padding: '0.75rem' }}>1 check</td>
              <td style={{ padding: '0.75rem' }}>1 retry</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Indie</td>
              <td style={{ padding: '0.75rem' }}>55 steps</td>
              <td style={{ padding: '0.75rem' }}>3 checks</td>
              <td style={{ padding: '0.75rem' }}>1 retry</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Pro</td>
              <td style={{ padding: '0.75rem' }}>75 steps</td>
              <td style={{ padding: '0.75rem' }}>5 checks</td>
              <td style={{ padding: '0.75rem' }}>1 retry</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Agency</td>
              <td style={{ padding: '0.75rem' }}>100 steps</td>
              <td style={{ padding: '0.75rem' }}>10 checks</td>
              <td style={{ padding: '0.75rem' }}>1 retry</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Limit Definitions</h3>
      <ul>
        <li><strong>Step Limit:</strong> The maximum number of actions (clicks, types, scrolls) the AI can take in one test. If reached, the test stops and is marked as "Exhausted" or "Completed" depending on outcome.</li>
        <li><strong>Vision Limit:</strong> How many times the AI can use GPT-4o analysis on a screenshot. Used for visual checks and complex debugging.</li>
      </ul>

      <h2>Token Budgets</h2>

      <h3>Per-Call Limits</h3>

      <p>
        Every LLM call has a strict token budget to prevent uncontrolled growth:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Call Type</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Token Budget</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Planning</td>
            <td style={{ padding: '0.75rem' }}>3000</td>
            <td style={{ padding: '0.75rem' }}>Test plan generation</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Diagnosis</td>
            <td style={{ padding: '0.75rem' }}>3000</td>
            <td style={{ padding: '0.75rem' }}>UI diagnosis analysis</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Testability</td>
            <td style={{ padding: '0.75rem' }}>2500</td>
            <td style={{ padding: '0.75rem' }}>Testability analysis</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Action Generation</td>
            <td style={{ padding: '0.75rem' }}>2000</td>
            <td style={{ padding: '0.75rem' }}>Step-by-step actions</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Cookie Banner</td>
            <td style={{ padding: '0.75rem' }}>1500</td>
            <td style={{ padding: '0.75rem' }}>Cookie banner detection</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Error Analysis</td>
            <td style={{ padding: '0.75rem' }}>2000</td>
            <td style={{ padding: '0.75rem' }}>Error explanation</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Self-Healing</td>
            <td style={{ padding: '0.75rem' }}>2000</td>
            <td style={{ padding: '0.75rem' }}>Alternative selector finding</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Context Synthesis</td>
            <td style={{ padding: '0.75rem' }}>2500</td>
            <td style={{ padding: '0.75rem' }}>Multi-source context</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
            <td style={{ padding: '0.75rem' }}>Summary</td>
            <td style={{ padding: '0.75rem' }}>2000</td>
            <td style={{ padding: '0.75rem' }}>Final result summary</td>
          </tr>
        </tbody>
      </table>

      <h3>DOM Pruning Rules</h3>

      <p>
        To stay within token budgets, DOM snapshots are pruned:
      </p>

      <p>
        <strong>Removed:</strong>
      </p>

      <ul>
        <li><code>&lt;script&gt;</code> tags and content</li>
        <li><code>&lt;style&gt;</code> tags and content</li>
        <li>HTML comments</li>
        <li>Excessive whitespace</li>
      </ul>

      <p>
        <strong>Kept:</strong>
      </p>

      <ul>
        <li>Interactive elements (buttons, inputs, links)</li>
        <li>Visible content</li>
        <li>Structural information</li>
      </ul>

      <p>
        <strong>Truncation:</strong>
      </p>

      <ul>
        <li>Deterministic (from start, preserving end)</li>
        <li>Tag-boundary aware when possible</li>
        <li>Never random</li>
      </ul>

      <h3>Context Limiting</h3>

      <p>
        <strong>History:</strong>
      </p>

      <ul>
        <li>Limited to last 5 steps for action generation</li>
        <li>Older steps are discarded</li>
      </ul>

      <p>
        <strong>Elements:</strong>
      </p>

      <ul>
        <li>Limited to 50-60 most relevant elements</li>
        <li>Hidden elements filtered out</li>
        <li>Prioritized by interactivity</li>
      </ul>

      <p>
        <strong>DOM Snapshots:</strong>
      </p>

      <ul>
        <li>Pruned before inclusion in prompts</li>
        <li>Maximum length enforced per call type</li>
        <li>Deterministic truncation</li>
      </ul>

      <h2>What Happens on API Failure</h2>

      <h3>GPT-5 Mini Failures</h3>

      <h4>Scenario 1: Transient Error (429, network)</h4>

      <ol>
        <li>Automatic retry after 200-400ms</li>
        <li>If retry succeeds: Test continues</li>
        <li>If retry fails: Test fails with error message</li>
      </ol>

      <h4>Scenario 2: Non-Retryable Error (400, 401)</h4>

      <ol>
        <li>No retry attempted</li>
        <li>Test fails immediately</li>
        <li>Clear error message logged</li>
      </ol>

      <h3>Error Messages</h3>

      <ul>
        <li><code>GPT-5 Mini API error (400): [details]</code> - Check API key and model name</li>
        <li><code>GPT-5 Mini API authentication failed (401)</code> - Check OPENAI_API_KEY</li>
        <li><code>GPT-5 Mini API rate limit exceeded (429)</code> - Wait and retry</li>
        <li><code>GPT-5 Mini call failed after 2 attempt(s): [details]</code> - Both attempts failed</li>
      </ul>

      <h3>GPT-4o Failures</h3>

      <p>
        <strong>Behavior:</strong>
      </p>

      <ul>
        <li>No retry attempted</li>
        <li>Visual analysis is skipped</li>
        <li>Test continues without visual issue detection</li>
        <li>Warning logged</li>
      </ul>

      <p>
        <strong>Why:</strong>
      </p>

      <ul>
        <li>Visual analysis is optional/selective</li>
        <li>Failures don't block test execution</li>
        <li>Cost optimization (don't retry expensive calls)</li>
      </ul>

      <h2>What the Model CAN Do</h2>

      <ul>
        <li>✅ Generate test actions based on page context</li>
        <li>✅ Analyze DOM structure and identify interactive elements</li>
        <li>✅ Detect cookie banners and suggest dismissal strategies</li>
        <li>✅ Explain test failures in plain English</li>
        <li>✅ Find alternative selectors when primary fails</li>
        <li>✅ Synthesize context from multiple sources (DOM, logs, errors)</li>
        <li>✅ Perform testability analysis</li>
        <li>✅ Generate structured test plans</li>
      </ul>

      <h2>What the Model CANNOT Do</h2>

      <ul>
        <li>❌ Guarantee 100% test success rate</li>
        <li>❌ Handle all edge cases perfectly</li>
        <li>❌ Work without valid API key</li>
        <li>❌ Bypass rate limits</li>
        <li>❌ Process unlimited context (token budgets enforced)</li>
        <li>❌ Compare visual baselines (not implemented)</li>
        <li>❌ Auto-fix code (read-only analysis)</li>
      </ul>

      <h2>Token Usage Guarantees</h2>

      <p>
        <strong>Guaranteed:</strong>
      </p>

      <ul>
        <li>No single call exceeds its token budget</li>
        <li>DOM pruning is deterministic (same input = same output)</li>
        <li>Context is limited to prevent unbounded growth</li>
        <li>Large DOMs don't cause unbounded latency</li>
      </ul>

      <p>
        <strong>Not Guaranteed:</strong>
      </p>

      <ul>
        <li>Exact token counts (estimates used)</li>
        <li>Perfect pruning (some edge cases may slip through)</li>
        <li>Zero token waste (conservative estimates used)</li>
      </ul>

      <h2>Cost Implications</h2>

      <h3>GPT-5 Mini</h3>

      <ul>
        <li>Used for every reasoning step</li>
        <li>Token budgets limit per-call costs</li>
        <li>Retries add minimal cost (same model, same prompt)</li>
        <li>No fallback model costs</li>
      </ul>

      <h3>GPT-4o</h3>

      <ul>
        <li>Used selectively (not every step)</li>
        <li>Only for visual analysis</li>
        <li>No retries (cost control)</li>
        <li>Failures don't block tests</li>
      </ul>

      <h3>Optimization</h3>

      <ul>
        <li>DOM pruning reduces input tokens</li>
        <li>History limiting reduces context size</li>
        <li>Selective GPT-4o usage reduces visual analysis costs</li>
      </ul>

      <h2>Failure Handling Philosophy</h2>

      <h3>Fail Fast</h3>

      <ul>
        <li>Non-retryable errors fail immediately</li>
        <li>Clear error messages for debugging</li>
        <li>No silent degradation</li>
      </ul>

      <h3>Resilient</h3>

      <ul>
        <li>Transient errors are retried once</li>
        <li>Same model ensures consistency</li>
        <li>Bounded retry latency (200-400ms)</li>
      </ul>

      <h3>Honest</h3>

      <ul>
        <li>Errors are logged with full context</li>
        <li>No false success indicators</li>
        <li>User knows exactly what failed and why</li>
      </ul>

      <h2>No Fallback Models</h2>

      <h3>Why</h3>

      <ul>
        <li><strong>Consistency:</strong> Same model = same behavior</li>
        <li><strong>Predictability:</strong> No model-specific quirks</li>
        <li><strong>Cost control:</strong> No expensive fallback calls</li>
        <li><strong>Simplicity:</strong> Easier to debug and maintain</li>
      </ul>

      <h3>What Happens Instead</h3>

      <ul>
        <li>Same-model retry for transient failures</li>
        <li>Clear error messages for permanent failures</li>
        <li>User can retry the test manually</li>
      </ul>

      <h2>Limitations</h2>

      <h3>Known Limitations</h3>

      <ol>
        <li>Token budgets may truncate very large DOMs</li>
        <li>Retry only handles transient failures</li>
        <li>GPT-4o failures are silent (visual analysis skipped)</li>
        <li>No baseline comparison for visual tests</li>
        <li>Model responses are not cached between tests</li>
      </ol>

      <h3>Acceptable Trade-offs</h3>

      <ul>
        <li>Deterministic truncation (predictable behavior)</li>
        <li>Bounded retries (controlled latency)</li>
        <li>Selective visual analysis (cost optimization)</li>
        <li>Fail-fast on permanent errors (clear feedback)</li>
      </ul>

      <h2>Support & Troubleshooting</h2>

      <h3>Common Issues</h3>

      <h4>1. "GPT-5 Mini API error (400)"</h4>

      <ul>
        <li>Check OPENAI_API_KEY is valid</li>
        <li>Verify model name is 'gpt-5-mini'</li>
        <li>Check API key has proper permissions</li>
      </ul>

      <h4>2. "GPT-5 Mini API authentication failed (401)"</h4>

      <ul>
        <li>OPENAI_API_KEY is invalid or expired</li>
        <li>Regenerate API key in OpenAI dashboard</li>
      </ul>

      <h4>3. "GPT-5 Mini API rate limit exceeded (429)"</h4>

      <ul>
        <li>Wait a few minutes</li>
        <li>Check OpenAI usage limits</li>
        <li>Retry the test</li>
      </ul>

      <h4>4. Test fails immediately after starting</h4>

      <ul>
        <li>Check API key is set in .env file</li>
        <li>Verify network connectivity</li>
        <li>Check OpenAI service status</li>
      </ul>

      <h4>5. Large DOMs causing issues</h4>

      <ul>
        <li>DOM pruning should handle this automatically</li>
        <li>Token budgets prevent unbounded growth</li>
        <li>If issues persist, check DOM size in logs</li>
      </ul>

      <h2>Summary</h2>

      <ul>
        <li><strong>One model per test:</strong> GPT-5 Mini for all reasoning</li>
        <li><strong>Retry policy:</strong> Same-model retry, max 1 retry, 200-400ms backoff</li>
        <li><strong>Token budgets:</strong> Strict per-call limits with DOM pruning</li>
        <li><strong>Failure handling:</strong> Fail-fast with clear errors, retry transient failures</li>
        <li><strong>No fallbacks:</strong> Consistency over complexity</li>
        <li><strong>Honest limitations:</strong> Documented and acknowledged</li>
      </ul>

      <p>
        This architecture prioritizes <strong>predictability</strong>, <strong>cost control</strong>, and <strong>clear failure modes</strong> over complex fallback strategies.
      </p>
    </article>
  )
}

