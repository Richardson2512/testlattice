export default function UsingFixPromptsContent() {
  return (
    <article>
      <h1>Using Fix Prompts with Cursor, ChatGPT, or Copilot</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Fix prompts from Rihario work with any AI coding assistant.</strong> They're structured instructions that help AI assistants understand the problem and generate code fixes. Here's how to use them effectively with popular tools like Cursor, ChatGPT, and Copilot.
      </p>

      <h2>General Workflow</h2>

      <ol>
        <li><strong>Generate fix prompt</strong> - Click "Generate Fix Prompt" in Rihario</li>
        <li><strong>Copy the prompt</strong> - Copy to clipboard</li>
        <li><strong>Paste into AI assistant</strong> - Use with your preferred tool</li>
        <li><strong>Review suggestions</strong> - AI provides code fixes</li>
        <li><strong>Apply and test</strong> - Implement fixes and verify they work</li>
      </ol>

      <h2>Using with Cursor</h2>

      <h3>Step 1: Open Cursor Chat</h3>

      <p>
        Open Cursor and access the chat feature (Cmd+L or Ctrl+L).
      </p>

      <h3>Step 2: Paste Fix Prompt</h3>

      <p>
        Paste the fix prompt from Rihario. You can also:
      </p>

      <ul>
        <li>Add file paths if relevant</li>
        <li>Include code snippets for context</li>
        <li>Reference specific files or functions</li>
      </ul>

      <h3>Step 3: Get Code Suggestions</h3>

      <p>
        Cursor will analyze the issue and suggest fixes. It may:
      </p>

      <ul>
        <li>Show code changes inline</li>
        <li>Provide explanations</li>
        <li>Suggest multiple approaches</li>
      </ul>

      <h3>Step 4: Apply and Test</h3>

      <p>
        Review Cursor's suggestions, apply the fixes, and test them.
      </p>

      <h2>Using with ChatGPT</h2>

      <h3>Step 1: Start Conversation</h3>

      <p>
        Open ChatGPT and start a new conversation. Optionally provide context about your codebase first.
      </p>

      <h3>Step 2: Paste Fix Prompt</h3>

      <p>
        Paste the fix prompt. For better results:
      </p>

      <ul>
        <li>Provide code snippets if needed</li>
        <li>Specify your tech stack (React, Vue, etc.)</li>
        <li>Include file structure if helpful</li>
      </ul>

      <h3>Step 3: Get Suggestions</h3>

      <p>
        ChatGPT will provide:
      </p>

      <ul>
        <li>Explanation of the problem</li>
        <li>Code fixes</li>
        <li>Step-by-step instructions</li>
      </ul>

      <h3>Step 4: Implement and Test</h3>

      <p>
        Copy ChatGPT's code suggestions, implement them, and test.
      </p>

      <h2>Using with GitHub Copilot</h2>

      <h3>Step 1: Open Copilot Chat</h3>

      <p>
        In VS Code, open Copilot chat (Cmd+I or Ctrl+I).
      </p>

      <h3>Step 2: Paste Fix Prompt</h3>

      <p>
        Paste the fix prompt. Copilot can see your open files for context.
      </p>

      <h3>Step 3: Get Suggestions</h3>

      <p>
        Copilot will suggest fixes. You can:
      </p>

      <ul>
        <li>Accept inline suggestions</li>
        <li>Ask for explanations</li>
        <li>Request alternative approaches</li>
      </ul>

      <h3>Step 4: Apply and Test</h3>

      <p>
        Apply Copilot's suggestions and test the fixes.
      </p>

      <h2>Tips for Better Results</h2>

      <h3>Add Context</h3>

      <p>
        Enhance fix prompts with:
      </p>

      <ul>
        <li><strong>File paths</strong> - Where the code is located</li>
        <li><strong>Code snippets</strong> - Relevant code sections</li>
        <li><strong>Tech stack</strong> - Framework, library versions</li>
        <li><strong>Existing patterns</strong> - How similar issues are handled</li>
      </ul>

      <h3>Be Specific</h3>

      <p>
        If the AI doesn't understand:
      </p>

      <ul>
        <li>Clarify the problem</li>
        <li>Provide more context</li>
        <li>Show examples of what you want</li>
        <li>Break down complex issues</li>
      </ul>

      <h3>Iterate</h3>

      <p>
        If the first fix doesn't work:
      </p>

      <ul>
        <li>Provide feedback</li>
        <li>Explain what went wrong</li>
        <li>Ask for alternative approaches</li>
        <li>Provide additional context</li>
      </ul>

      <h2>Example: Using Fix Prompt</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Scenario: Console error in form</div>
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '0.5rem' }}><strong>1.</strong> Rihario finds: "Cannot read property 'value' of null"</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>2.</strong> Click "Generate Fix Prompt"</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>3.</strong> Copy prompt, paste into Cursor</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>4.</strong> Cursor suggests: Add null check before accessing .value</div>
          <div style={{ marginBottom: '0.5rem' }}><strong>5.</strong> Review code, apply fix</div>
          <div><strong>6.</strong> Test form - error fixed</div>
        </div>
      </div>

      <h2>When Fix Prompts Work Best</h2>

      <ul>
        <li><strong>Clear errors</strong> - Console errors with stack traces</li>
        <li><strong>Obvious bugs</strong> - Issues with clear causes</li>
        <li><strong>Self-contained problems</strong> - Issues in specific files/functions</li>
        <li><strong>Well-documented issues</strong> - Problems with good evidence</li>
      </ul>

      <h2>When Fix Prompts May Struggle</h2>

      <ul>
        <li><strong>Complex business logic</strong> - Requires domain knowledge</li>
        <li><strong>Architectural issues</strong> - Problems requiring refactoring</li>
        <li><strong>Vague errors</strong> - Unclear error messages</li>
        <li><strong>Multi-file issues</strong> - Problems spanning multiple files</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Always review code</strong> - Don't blindly apply AI suggestions</li>
        <li><strong>Test fixes thoroughly</strong> - Verify fixes actually work</li>
        <li><strong>Understand the fix</strong> - Make sure you understand what changed</li>
        <li><strong>Keep it simple</strong> - Fix prompts work best for straightforward issues</li>
        <li><strong>Iterate if needed</strong> - Don't hesitate to ask for clarification</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/choosing-ai-model">Choose the right AI model for your needs</a></li>
        <li><a href="/docs/generate-fix-prompts">Learn how to generate fix prompts</a></li>
        <li><a href="/docs/error-types">Understand different error types</a></li>
      </ul>
    </article>
  )
}

