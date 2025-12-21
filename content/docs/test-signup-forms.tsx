export default function TestSignupFormsContent() {
  return (
    <article>
      <h1>How to Test Sign-Up Forms Without Writing Tests</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario automatically tests sign-up forms during exploration.</strong> The AI identifies form fields, fills them with test data, validates input, submits the form, and reports any issues. No test scripts needed - just point the AI at your signup page.
      </p>

      <h2>How It Works</h2>

      <p>
        When the AI encounters a sign-up form, it:
      </p>

      <ol>
        <li><strong>Identifies the form</strong> - Recognizes signup forms by structure and field types</li>
        <li><strong>Finds all fields</strong> - Email, password, name, phone, etc.</li>
        <li><strong>Generates test data</strong> - Creates realistic test values for each field</li>
        <li><strong>Fills the form</strong> - Types data into each field</li>
        <li><strong>Checks validation</strong> - Tests field requirements, formats, and rules</li>
        <li><strong>Submits the form</strong> - Clicks submit and observes the result</li>
        <li><strong>Reports issues</strong> - Flags errors, broken validation, or submission problems</li>
      </ol>

      <h2>What Gets Tested Automatically</h2>

      <h3>Form Field Validation</h3>

      <ul>
        <li><strong>Required fields</strong> - Tests that required fields show errors when empty</li>
        <li><strong>Email format</strong> - Validates email format checking</li>
        <li><strong>Password requirements</strong> - Tests password strength rules</li>
        <li><strong>Phone format</strong> - Validates phone number formatting</li>
        <li><strong>Custom validation</strong> - Tests any validation rules your form has</li>
      </ul>

      <h3>Form Submission</h3>

      <ul>
        <li><strong>Submit button works</strong> - Verifies form actually submits</li>
        <li><strong>Loading states</strong> - Checks for loading indicators during submission</li>
        <li><strong>Success handling</strong> - Verifies successful signup redirects or messages</li>
        <li><strong>Error handling</strong> - Tests error message display</li>
      </ul>

      <h3>User Experience</h3>

      <ul>
        <li><strong>Form layout</strong> - Checks for broken layouts or overlapping elements</li>
        <li><strong>Field accessibility</strong> - Verifies labels and ARIA attributes</li>
        <li><strong>Error visibility</strong> - Ensures error messages are visible</li>
        <li><strong>Form flow</strong> - Tests multi-step forms if applicable</li>
      </ul>

      <h2>How to Test Sign-Up Forms</h2>

      <h3>Method 1: Start on Signup Page</h3>

      <p>
        Start your exploration directly on the signup page:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example:</div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
          URL: https://app.com/signup<br />
          Instructions: "test the signup form"
        </div>
      </div>

      <p>
        The AI will explore the signup page, find the form, test it, and report findings.
      </p>

      <h3>Method 2: Include in Multi-Page Flow</h3>

      <p>
        Include signup as part of a larger exploration:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example:</div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
          URL: https://app.com<br />
          Instructions: "check homepage, then test signup flow, then test login"
        </div>
      </div>

      <p>
        The AI will navigate to signup, test it, then continue with other flows.
      </p>

      <h2>What the AI Tests</h2>

      <h3>Happy Path</h3>

      <p>
        The AI tests the successful signup flow:
      </p>

      <ol>
        <li>Fills all required fields with valid data</li>
        <li>Submits the form</li>
        <li>Verifies successful submission (redirect, confirmation message, etc.)</li>
        <li>Checks if user is logged in or redirected appropriately</li>
      </ol>

      <h3>Validation Errors</h3>

      <p>
        The AI also tests validation by:
      </p>

      <ul>
        <li>Trying empty required fields</li>
        <li>Testing invalid email formats</li>
        <li>Checking password requirements</li>
        <li>Verifying error messages appear</li>
        <li>Ensuring form doesn't submit with invalid data</li>
      </ul>

      <h2>Understanding Results</h2>

      <p>
        When testing signup forms, you'll see issues like:
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>✅ Form Validation Works</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Required fields show errors. Email format validated. Form submits successfully.
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Validation Issue</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Form submits with empty required fields. No error messages displayed.
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--warning)' }}>⚠️ UX Issue</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Error messages are not visible or overlapping with form fields.
          </div>
        </div>
      </div>

      <h2>Common Issues Found</h2>

      <h3>Validation Problems</h3>

      <ul>
        <li>Forms that submit with invalid data</li>
        <li>Missing error messages</li>
        <li>Error messages not visible or poorly positioned</li>
        <li>Validation that triggers on wrong events</li>
        <li>Required fields that don't show errors</li>
      </ul>

      <h3>Form Functionality</h3>

      <ul>
        <li>Submit button doesn't work</li>
        <li>Form doesn't submit (JavaScript errors)</li>
        <li>Loading states missing or broken</li>
        <li>Success messages not displayed</li>
        <li>Redirects not working after signup</li>
      </ul>

      <h3>Accessibility Issues</h3>

      <ul>
        <li>Missing form labels</li>
        <li>No ARIA attributes</li>
        <li>Error messages not associated with fields</li>
        <li>Keyboard navigation doesn't work</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Test on staging</strong> - Use test data, not production signups</li>
        <li><strong>Focus instructions</strong> - Add "test signup form validation" to focus the AI</li>
        <li><strong>Review findings carefully</strong> - Not every finding is a critical bug</li>
        <li><strong>Test edge cases manually</strong> - AI tests common cases, you test unusual ones</li>
        <li><strong>Verify fixes</strong> - Re-run exploration after fixing issues</li>
      </ul>

      <h2>Limitations</h2>

      <ul>
        <li><strong>Email verification</strong> - Cannot test email verification flows automatically</li>
        <li><strong>CAPTCHA blocks</strong> - Cannot solve CAPTCHAs (exploration marked as BLOCKED)</li>
        <li><strong>Custom validation logic</strong> - May not test complex business rule validation</li>
        <li><strong>Not exhaustive</strong> - Tests common scenarios, not every possible input</li>
        <li><strong>Dynamic content</strong> - May miss issues with dynamically loaded form fields</li>
      </ul>

      <h2>Example: Testing a Signup Form</h2>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Step-by-Step Process:</div>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>Start exploration on signup page</li>
          <li>AI finds signup form with email, password, name fields</li>
          <li>AI tries submitting empty form → checks for validation errors</li>
          <li>AI fills form with test data</li>
          <li>AI tests email format validation</li>
          <li>AI tests password requirements</li>
          <li>AI submits form with valid data</li>
          <li>AI verifies successful signup (redirect, message, etc.)</li>
          <li>AI reports any issues found</li>
        </ol>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-forms">Learn about testing other types of forms</a></li>
        <li><a href="/docs/test-login-flows">See how to test login flows</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts from signup issues</a></li>
      </ul>
    </article>
  )
}

