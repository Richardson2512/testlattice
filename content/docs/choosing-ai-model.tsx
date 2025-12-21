export default function ChoosingAIModelContent() {
  return (
    <article>
      <h1>Choosing an AI Model for Fix Prompts (Advanced)</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Different AI models have different strengths for code fixes.</strong> GPT-4 excels at complex reasoning, Claude is great for following instructions, and smaller models are faster but less capable. Choose based on code complexity, model capabilities, and your needs.
      </p>

      <h2>Model Options</h2>

      <h3>GPT-4 (OpenAI)</h3>

      <p>
        <strong>Best for:</strong> Complex bugs, multi-file issues, architectural problems
      </p>

      <ul>
        <li><strong>Strengths:</strong> Excellent reasoning, understands context well, good at complex problems</li>
        <li><strong>Weaknesses:</strong> Slower, more expensive, may be overkill for simple issues</li>
        <li><strong>When to use:</strong> Complex bugs, multi-file fixes, architectural issues</li>
      </ul>

      <h3>Claude (Anthropic)</h3>

      <p>
        <strong>Best for:</strong> Following detailed instructions, long codebases, precise fixes
      </p>

      <ul>
        <li><strong>Strengths:</strong> Great at following instructions, handles long context, precise fixes</li>
        <li><strong>Weaknesses:</strong> May be slower, less creative than GPT-4</li>
        <li><strong>When to use:</strong> When you need precise fixes, complex instructions</li>
      </ul>

      <h3>GPT-3.5 (OpenAI)</h3>

      <p>
        <strong>Best for:</strong> Simple bugs, quick fixes, cost-effective solutions
      </p>

      <ul>
        <li><strong>Strengths:</strong> Fast, cheap, good for simple issues</li>
        <li><strong>Weaknesses:</strong> Less capable, may struggle with complex problems</li>
        <li><strong>When to use:</strong> Simple bugs, straightforward fixes, when speed/cost matters</li>
      </ul>

      <h3>Local Models (Ollama, etc.)</h3>

      <p>
        <strong>Best for:</strong> Privacy-sensitive code, offline use, experimentation
      </p>

      <ul>
        <li><strong>Strengths:</strong> Privacy, no API costs, works offline</li>
        <li><strong>Weaknesses:</strong> Less capable, requires setup, slower</li>
        <li><strong>When to use:</strong> Sensitive code, when you need privacy</li>
      </ul>

      <h2>Choosing Based on Issue Complexity</h2>

      <h3>Simple Issues</h3>

      <p>
        For simple bugs (typos, syntax errors, obvious fixes):
      </p>

      <ul>
        <li><strong>Recommended:</strong> GPT-3.5 or Claude Haiku</li>
        <li><strong>Why:</strong> Fast, cheap, capable enough for simple fixes</li>
        <li><strong>Example:</strong> Missing semicolon, typo in variable name</li>
      </ul>

      <h3>Moderate Issues</h3>

      <p>
        For moderate bugs (logic errors, single-file fixes):
      </p>

      <ul>
        <li><strong>Recommended:</strong> GPT-4 or Claude Sonnet</li>
        <li><strong>Why:</strong> Better reasoning, understands context better</li>
        <li><strong>Example:</strong> Incorrect conditional logic, wrong function call</li>
      </ul>

      <h3>Complex Issues</h3>

      <p>
        For complex bugs (multi-file, architectural, business logic):
      </p>

      <ul>
        <li><strong>Recommended:</strong> GPT-4 or Claude Opus</li>
        <li><strong>Why:</strong> Best reasoning, handles complex context</li>
        <li><strong>Example:</strong> Refactoring needed, multi-file changes</li>
      </ul>

      <h2>Choosing Based on Your Needs</h2>

      <h3>Speed vs Quality</h3>

      <ul>
        <li><strong>Fast but less accurate:</strong> GPT-3.5, Claude Haiku</li>
        <li><strong>Balanced:</strong> Claude Sonnet, GPT-4 Turbo</li>
        <li><strong>Slower but more accurate:</strong> GPT-4, Claude Opus</li>
      </ul>

      <h3>Cost Considerations</h3>

      <ul>
        <li><strong>Budget-friendly:</strong> GPT-3.5, Claude Haiku</li>
        <li><strong>Moderate cost:</strong> Claude Sonnet, GPT-4 Turbo</li>
        <li><strong>Higher cost:</strong> GPT-4, Claude Opus</li>
      </ul>

      <h3>Privacy Requirements</h3>

      <ul>
        <li><strong>API models:</strong> Code sent to external services</li>
        <li><strong>Local models:</strong> Code stays on your machine</li>
        <li><strong>Consider:</strong> Sensitive code, company policies</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Start simple</strong> - Try GPT-3.5 first, upgrade if needed</li>
        <li><strong>Use right tool for job</strong> - Don't use GPT-4 for simple fixes</li>
        <li><strong>Experiment</strong> - Try different models to see what works</li>
        <li><strong>Consider cost</strong> - Balance quality vs cost for your needs</li>
        <li><strong>Review always</strong> - Regardless of model, always review suggestions</li>
      </ul>

      <h2>Model Comparison</h2>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '2rem',
        marginBottom: '2rem',
        overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Model</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Speed</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Quality</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Cost</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid var(--border-medium)' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>GPT-3.5</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fast</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Good</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Low</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Simple fixes</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>GPT-4</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Slow</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Excellent</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>High</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Complex issues</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>Claude Haiku</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Fast</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Good</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Low</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>Simple fixes</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>Claude Opus</td>
              <td style={{ padding: '0.75rem' }}>Slow</td>
              <td style={{ padding: '0.75rem' }}>Excellent</td>
              <td style={{ padding: '0.75rem' }}>High</td>
              <td style={{ padding: '0.75rem' }}>Complex issues</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Default Recommendations</h2>

      <ul>
        <li><strong>Most users:</strong> Start with GPT-4 or Claude Sonnet (good balance)</li>
        <li><strong>Simple bugs:</strong> Use GPT-3.5 or Claude Haiku (faster, cheaper)</li>
        <li><strong>Complex issues:</strong> Use GPT-4 or Claude Opus (better quality)</li>
        <li><strong>Privacy-sensitive:</strong> Use local models or on-premise solutions</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/using-fix-prompts">Learn how to use fix prompts</a></li>
        <li><a href="/docs/fix-prompts-assistive">Understand why fixes are assistive</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts</a></li>
      </ul>
    </article>
  )
}

