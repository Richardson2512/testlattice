export default function TestFormsContent() {
  return (
    <article>
      <h1>How to Test Forms and User Inputs</h1>
      
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario automatically tests forms during exploration.</strong> The AI identifies form fields, fills them with appropriate test data, validates inputs, submits forms, and reports any issues. Works for contact forms, search forms, checkout forms, and more.
      </p>

      <h2>How Form Testing Works</h2>

      <p>
        When the AI encounters any form, it:
      </p>

      <ol>
        <li><strong>Identifies the form</strong> - Recognizes form elements on the page</li>
        <li><strong>Analyzes fields</strong> - Determines field types (email, text, select, checkbox, etc.)</li>
        <li><strong>Generates test data</strong> - Creates appropriate test values for each field type</li>
        <li><strong>Tests validation</strong> - Checks required fields, formats, and rules</li>
        <li><strong>Fills the form</strong> - Types or selects values for each field</li>
        <li><strong>Submits the form</strong> - Clicks submit and observes the result</li>
        <li><strong>Reports issues</strong> - Flags validation problems, submission errors, or UX issues</li>
      </ol>

      <h2>Types of Forms Tested</h2>

      <h3>Contact Forms</h3>

      <ul>
        <li>Name, email, message fields</li>
        <li>Validation of required fields</li>
        <li>Email format checking</li>
        <li>Submission and confirmation</li>
      </ul>

      <h3>Search Forms</h3>

      <ul>
        <li>Search input fields</li>
        <li>Search button functionality</li>
        <li>Search results display</li>
        <li>Empty query handling</li>
      </ul>

      <h3>Checkout Forms</h3>

      <ul>
        <li>Shipping address fields</li>
        <li>Payment information</li>
        <li>Credit card validation</li>
        <li>Order summary</li>
      </ul>

      <h3>Multi-Step Forms</h3>

      <ul>
        <li>Wizard-style forms</li>
        <li>Step navigation</li>
        <li>Progress indicators</li>
        <li>Data persistence between steps</li>
      </ul>

      <h2>What Gets Tested</h2>

      <h3>Field Validation</h3>

      <ul>
        <li><strong>Required fields</strong> - Error when empty</li>
        <li><strong>Email format</strong> - Valid email addresses</li>
        <li><strong>Phone format</strong> - Valid phone numbers</li>
        <li><strong>Number ranges</strong> - Min/max values</li>
        <li><strong>Password strength</strong> - Password requirements</li>
        <li><strong>Custom validation</strong> - Business rule validation</li>
      </ul>

      <h3>Form Submission</h3>

      <ul>
        <li><strong>Submit button works</strong> - Form actually submits</li>
        <li><strong>Loading states</strong> - Loading indicators during submission</li>
        <li><strong>Success handling</strong> - Success messages or redirects</li>
        <li><strong>Error handling</strong> - Error messages displayed correctly</li>
        <li><strong>Prevent double submission</strong> - Can't submit multiple times</li>
      </ul>

      <h3>User Experience</h3>

      <ul>
        <li><strong>Field labels</strong> - Labels are visible and associated</li>
        <li><strong>Placeholder text</strong> - Helpful placeholder values</li>
        <li><strong>Error visibility</strong> - Error messages are visible</li>
        <li><strong>Form layout</strong> - Fields aren't overlapping or broken</li>
        <li><strong>Accessibility</strong> - Keyboard navigation works</li>
      </ul>

      <h2>How to Test Forms</h2>

      <h3>Automatic Testing</h3>

      <p>
        Forms are tested automatically during exploration. Just start an exploration and the AI will test any forms it encounters.
      </p>

      <h3>Focused Form Testing</h3>

      <p>
        To focus on form testing, add instructions:
      </p>

      <div style={{
        background: 'var(--beige-100)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example Instructions:</div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>"test the contact form"</li>
          <li>"check form validation"</li>
          <li>"test checkout form fields"</li>
          <li>"verify search form works"</li>
        </ul>
      </div>

      <h2>Understanding Form Test Results</h2>

      <p>
        Common issues found when testing forms:
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
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Validation Issue</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Form submits with empty required fields. No error messages displayed.
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Submission Error</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Form submission failed. Console error: "Cannot read property 'value' of null"
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--warning)' }}>⚠️ UX Issue</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Error messages overlap with form fields, making them hard to read.
          </div>
        </div>
      </div>

      <h2>Field Type Handling</h2>

      <p>
        The AI handles different field types:
      </p>

      <ul>
        <li><strong>Text inputs</strong> - Generates realistic text data</li>
        <li><strong>Email fields</strong> - Creates valid email addresses</li>
        <li><strong>Password fields</strong> - Generates test passwords</li>
        <li><strong>Number fields</strong> - Uses appropriate numeric values</li>
        <li><strong>Select dropdowns</strong> - Selects from available options</li>
        <li><strong>Checkboxes</strong> - Checks/unchecks as appropriate</li>
        <li><strong>Radio buttons</strong> - Selects one option</li>
        <li><strong>Date pickers</strong> - Selects valid dates</li>
        <li><strong>File uploads</strong> - May skip or use test files (varies)</li>
      </ul>

      <h2>Validation Testing</h2>

      <p>
        The AI tests validation by:
      </p>

      <ol>
        <li>Trying to submit with empty required fields</li>
        <li>Testing invalid formats (wrong email, etc.)</li>
        <li>Verifying error messages appear</li>
        <li>Checking that invalid forms don't submit</li>
        <li>Ensuring valid forms do submit</li>
      </ol>

      <h2>Limitations</h2>

      <ul>
        <li><strong>File uploads</strong> - May not test file upload functionality thoroughly</li>
        <li><strong>Complex validation</strong> - May miss business logic validation rules</li>
        <li><strong>CAPTCHA</strong> - Cannot solve CAPTCHAs (blocks exploration)</li>
        <li><strong>Not exhaustive</strong> - Tests common cases, not every possible input</li>
        <li><strong>Custom components</strong> - May not handle custom form components perfectly</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Test on staging</strong> - Use test data, avoid production submissions</li>
        <li><strong>Focus instructions</strong> - Add "test form validation" to guide the AI</li>
        <li><strong>Verify findings</strong> - Manually check if reported issues are real</li>
        <li><strong>Test edge cases manually</strong> - AI tests common cases, you test unusual ones</li>
        <li><strong>Check accessibility</strong> - Ensure forms work with keyboard navigation</li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/test-signup-forms">Learn about testing signup forms specifically</a></li>
        <li><a href="/docs/accessibility-checks">See accessibility checks for forms</a></li>
        <li><a href="/docs/generate-fix-prompts">Generate fix prompts from form issues</a></li>
      </ul>
    </article>
  )
}

