export default function GenerateFixPromptsContent() {
  return (
    <article>
      <h1>How to Generate Fix Prompts from Test Results</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario can generate fix prompts from detected issues, helping you use AI coding assistants (Cursor, ChatGPT, Copilot) to fix problems quickly.</strong> Fix prompts include error details, context, and instructions for fixing the issue. They're assistive, not automatic - you review and apply the fixes.
      </p>

      <h2>What Are Fix Prompts?</h2>

      <p>
        Fix prompts are structured instructions you can give to AI coding assistants:
      </p>

      <ul>
        <li><strong>Problem description</strong> - What issue was found</li>
        <li><strong>Error details</strong> - Console errors, network errors, or UI problems</li>
        <li><strong>Context</strong> - Where the issue occurred, what was happening</li>
        <li><strong>Evidence</strong> - Screenshots, logs, DOM snapshots</li>
        <li><strong>Fix instructions</strong> - How to fix the problem</li>
      </ul>

      <h2>How to Generate Fix Prompts</h2>

      <h3>Step 1: Review Test Results</h3>

      <p>
        After an exploration completes:
      </p>

      <ol>
        <li>Open the test results</li>
        <li>Find the issue you want to fix</li>
        <li>Review the evidence (screenshots, logs, etc.)</li>
        <li>Understand what the problem is</li>
      </ol>

      <h3>Step 2: Generate Fix Prompt</h3>

      <p>
        Click "Generate Fix Prompt" on the issue:
      </p>

      <ul>
        <li>Rihario creates a structured prompt</li>
        <li>Includes all relevant details</li>
        <li>Formatted for AI coding assistants</li>
        <li>Ready to copy and paste</li>
      </ul>

      <h3>Step 3: Use with AI Assistant</h3>

      <p>
        Copy the prompt and use it with:
      </p>

      <ul>
        <li><strong>Cursor</strong> - Paste into Cursor chat, get code suggestions</li>
        <li><strong>ChatGPT</strong> - Use in ChatGPT conversation for fix suggestions</li>
        <li><strong>GitHub Copilot</strong> - Use Copilot chat for code fixes</li>
        <li><strong>Other AI assistants</strong> - Works with any coding assistant</li>
      </ul>

      <h2>Example Fix Prompt</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        whiteSpace: 'pre-wrap',
      }}>
        {`Issue: Console error in contact form submission

Error: Cannot read property 'value' of null

Location: Contact form on /contact page

Context:
- User fills email and message fields
- Clicks "Submit" button
- JavaScript error occurs before form submission

Console Error:
TypeError: Cannot read property 'value' of null
  at submitForm (contact.js:25)
  at HTMLButtonElement.onclick (contact.html:42)

Screenshot: [Attached screenshot showing form state]

Fix Instructions:
1. Check contact.js line 25 - likely accessing null element
2. Ensure form fields are properly selected before accessing .value
3. Add null checks or ensure elements exist before accessing
4. Verify form field IDs/selectors match HTML

Please provide code fix for this issue.`}
      </div>

      <h2>Types of Fix Prompts</h2>

      <h3>Console Error Prompts</h3>

      <p>
        For JavaScript errors:
      </p>

      <ul>
        <li>Error message and stack trace</li>
        <li>File and line number where error occurred</li>
        <li>Context about what action triggered error</li>
        <li>Instructions for fixing the error</li>
      </ul>

      <h3>Network Error Prompts</h3>

      <p>
        For failed API requests:
      </p>

      <ul>
        <li>Request URL and method</li>
        <li>Response status and error message</li>
        <li>Request payload if available</li>
        <li>Instructions for fixing backend/API</li>
      </ul>

      <h3>UI Issue Prompts</h3>

      <p>
        For visual/layout problems:
      </p>

      <ul>
        <li>Screenshot showing the problem</li>
        <li>Description of what looks wrong</li>
        <li>Element details (HTML/CSS)</li>
        <li>Instructions for fixing CSS/layout</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Review before using</strong> - Verify the issue is real before generating prompt</li>
        <li><strong>Provide additional context</strong> - Add code snippets or file paths if helpful</li>
        <li><strong>Verify fixes</strong> - Always test fixes from AI assistants</li>
        <li><strong>Review generated code</strong> - Don't blindly apply fixes, review first</li>
        <li><strong>Iterate if needed</strong> - Provide feedback if fix doesn't work</li>
      </ul>

      <h2>Limitations</h2>

      <ul>
        <li><strong>Not automatic</strong> - Prompts are assistive, not auto-fixes</li>
        <li><strong>May not be perfect</strong> - AI assistants might not fix correctly</li>
        <li><strong>Requires verification</strong> - Always test fixes manually</li>
        <li><strong>May need iteration</strong> - Might need multiple attempts to fix</li>
      </ul>

      <h2>Using with Different AI Assistants</h2>

      <h3>Cursor</h3>

      <ol>
        <li>Copy fix prompt from Rihario</li>
        <li>Open Cursor chat</li>
        <li>Paste prompt</li>
        <li>Review code suggestions</li>
        <li>Apply fixes and test</li>
      </ol>

      <h3>ChatGPT</h3>

      <ol>
        <li>Copy fix prompt from Rihario</li>
        <li>Open ChatGPT conversation</li>
        <li>Paste prompt</li>
        <li>Get code suggestions</li>
        <li>Apply fixes and test</li>
      </ol>

      <h3>GitHub Copilot</h3>

      <ol>
        <li>Copy fix prompt from Rihario</li>
        <li>Open Copilot chat in VS Code</li>
        <li>Paste prompt</li>
        <li>Review suggestions</li>
        <li>Apply fixes and test</li>
      </ol>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/using-fix-prompts">Learn how to use fix prompts effectively</a></li>
        <li><a href="/docs/choosing-ai-model">Choose the right AI model for fix prompts</a></li>
        <li><a href="/docs/error-types">Understand different error types</a></li>
      </ul>
    </article>
  )
}

