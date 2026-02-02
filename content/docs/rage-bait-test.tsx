export default function RageBaitTestContent() {
    return (
        <article>
            <h1>Rage Bait Test: Stress-Test Your Forms</h1>

            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                <strong>The Rage Bait test deliberately breaks your forms in 5 ways that real users will eventually trigger.</strong> It's designed to catch the edge cases that slip through manual testing.
            </p>

            <h2>Wait, What's an "Edge Case"?</h2>

            <p>
                An <strong>edge case</strong> is a situation that happens rarely—but when it does, it breaks your app.
            </p>

            <p>
                Think of it this way: Most users type "John" in a name field. But <em>one</em> user will paste 10,000 characters. Most users click Submit normally. But <em>one</em> user will accidentally press Enter in the middle of a form.
            </p>

            <p>
                These are edge cases. They're the "weird stuff" that real users accidentally do—and they can wreck your user experience if not handled.
            </p>

            <div style={{
                background: 'var(--beige-100)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '1rem',
                marginBottom: '1.5rem',
            }}>
                <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🧠 Simple Examples:</div>
                <table style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', paddingBottom: '0.5rem' }}>Normal Use</th>
                            <th style={{ textAlign: 'left', paddingBottom: '0.5rem' }}>Edge Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0.25rem 0' }}>User types "John"</td>
                            <td style={{ padding: '0.25rem 0' }}>User pastes 10,000 characters 💥</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0' }}>User clicks Submit</td>
                            <td style={{ padding: '0.25rem 0' }}>User presses Enter mid-form 💥</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0' }}>User fills form, submits</td>
                            <td style={{ padding: '0.25rem 0' }}>User hits Back button, then Forward 💥</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0' }}>Session lasts 30 minutes</td>
                            <td style={{ padding: '0.25rem 0' }}>Session expires while user is typing 💥</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0' }}>User types "hello@gmail.com"</td>
                            <td style={{ padding: '0.25rem 0' }}>User types {'<script>alert("xss")</script>'} 💥</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>The 5 Rage Bait Tests</h2>

            <p>
                Rage Bait runs 5 specific edge-case tests that commonly break forms and frustrate users:
            </p>

            <div style={{
                display: 'grid',
                gap: '1rem',
                marginTop: '1rem',
                marginBottom: '1.5rem',
            }}>
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>1. 🔙 Back Button Spam</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Fills a form, clicks back, clicks forward.<br />
                        <strong>What could break:</strong> Form loses all data. User has to start over.<br />
                        <strong>Real user scenario:</strong> "Wait, I need to check something on the previous page…"
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>2. ⏰ Session Timeout</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Simulates session expiring mid-flow.<br />
                        <strong>What could break:</strong> Silent failure. User submits but nothing happens. No error shown.<br />
                        <strong>Real user scenario:</strong> User left tab open while grabbing coffee.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>3. ⏎ Enter Key Submit</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Presses Enter inside a text field before form is complete.<br />
                        <strong>What could break:</strong> Form submits early with incomplete data.<br />
                        <strong>Real user scenario:</strong> User presses Enter out of habit while typing.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>4. 🧨 Special Characters</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Injects special characters: {'<script>'}, quotes, emojis, unicode.<br />
                        <strong>What could break:</strong> XSS vulnerabilities. Broken layouts. Database errors.<br />
                        <strong>Real user scenario:</strong> User named O'Brien. Or 日本語. Or 😀.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>5. 📦 Input Overflow</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Pastes 10,000+ characters into a field.<br />
                        <strong>What could break:</strong> Page freezes. Layout breaks. Server crashes.<br />
                        <strong>Real user scenario:</strong> User copies their entire resume into a "Bio" field.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>6. 👯 Double Submit</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Clicks the submit button twice rapidly (50ms gap).<br />
                        <strong>What could break:</strong> Duplicate database entries. Race conditions. Error pages.<br />
                        <strong>Real user scenario:</strong> "Why is this loading so slow? I'll click again."
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>7. 🔄 Refresh Persistence</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Types into a form, reloads page, checks if data stays.<br />
                        <strong>What could break:</strong> Frustration (users lose all work).<br />
                        <strong>Real user scenario:</strong> Browser crashes or user accidentally hits refresh.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>8. 🐌 Network Throttle</div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>What it does:</strong> Simulates slow 3G connection during interaction.<br />
                        <strong>What could break:</strong> Buttons clicked before JS loads. Loading states missing.<br />
                        <strong>Real user scenario:</strong> User on subways or spotty Wi-Fi.
                    </p>
                </div>
            </div>

            <h2>Why Do I Need This?</h2>

            <p>
                Great question. Here's the reality:
            </p>

            <ul>
                <li><strong>Normal testing</strong> checks that your app works when users behave normally.</li>
                <li><strong>Rage Bait testing</strong> checks that your app doesn't explode when users do weird stuff.</li>
            </ul>

            <p>
                The difference? One happy path works. The other catches the edge cases that become 1-star reviews.
            </p>

            <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '1rem',
                marginBottom: '1.5rem',
            }}>
                <div style={{ fontWeight: 600, color: 'var(--error)', marginBottom: '0.5rem' }}>❌ Real 1-Star Review:</div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                    "I spent 20 minutes filling out this form, accidentally hit Back, and lost everything. Never using this site again."
                </p>
            </div>

            <h2>When Should I Use Rage Bait?</h2>

            <p>Use Rage Bait when:</p>

            <ul>
                <li>You have <strong>any form</strong> (signup, checkout, contact, settings)</li>
                <li>You're about to <strong>launch or demo</strong></li>
                <li>You've gotten complaints about <strong>"weird bugs"</strong> that are hard to reproduce</li>
                <li>You want to find <strong>UX issues before users do</strong></li>
            </ul>

            <h2>What's the Difference Between Rage Bait and Monkey Test?</h2>

            <p>
                Good question! They're both "chaos testing" but different approaches:
            </p>

            <div style={{
                background: 'var(--beige-100)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '1rem',
                marginBottom: '1.5rem',
            }}>
                <table style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', paddingBottom: '0.5rem' }}>Aspect</th>
                            <th style={{ textAlign: 'left', paddingBottom: '0.5rem' }}>🔥 Rage Bait</th>
                            <th style={{ textAlign: 'left', paddingBottom: '0.5rem' }}>🐒 Monkey Test</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0.25rem 0', fontWeight: 500 }}>Approach</td>
                            <td style={{ padding: '0.25rem 0' }}>Targeted, 8 specific edge cases</td>
                            <td style={{ padding: '0.25rem 0' }}>Random clicks and scrolls</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0', fontWeight: 500 }}>Finds</td>
                            <td style={{ padding: '0.25rem 0' }}>Form resilience issues</td>
                            <td style={{ padding: '0.25rem 0' }}>Console errors, crashes</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0', fontWeight: 500 }}>Best for</td>
                            <td style={{ padding: '0.25rem 0' }}>Forms, checkout, settings</td>
                            <td style={{ padding: '0.25rem 0' }}>Overall app stability</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.25rem 0', fontWeight: 500 }}>Behavior</td>
                            <td style={{ padding: '0.25rem 0' }}>"Smart" chaos</td>
                            <td style={{ padding: '0.25rem 0' }}>"Dumb" chaos</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                <strong>TL;DR:</strong> Rage Bait = deliberate edge-case stress tests. Monkey = random exploration.
            </p>

            <h2>How to Run a Rage Bait Test</h2>

            <ol>
                <li>Go to your dashboard and click <strong>New Test</strong></li>
                <li>Enter your URL (the page with the form you want to test)</li>
                <li>Select <strong>Rage Bait</strong> from Test Types</li>
                <li>Click <strong>Start Test</strong></li>
            </ol>

            <p>
                The AI will find your form, run all 8 edge-case tests, and report any issues.
            </p>

            <h2>Understanding Your Results</h2>

            <p>After the test, you'll see results like:</p>

            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '1rem',
                marginBottom: '1.5rem',
            }}>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--success)' }}>✅ Back Button: PASSED</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Form data persisted after back/forward navigation.
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--error)' }}>❌ Enter Key: FAILED</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Form submitted early when Enter was pressed in email field.
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--warning)' }}>⚠️ Double Submit: WARNING</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Button not disabled on click. Multiple requests sent.
                    </div>
                </div>
            </div>

            <h2>Common Fixes</h2>

            <p>
                Here's how to fix the most common issues Rage Bait catches:
            </p>

            <h3>Back Button Data Loss</h3>
            <ul>
                <li>Use <code>localStorage</code> or <code>sessionStorage</code> to persist form data</li>
                <li>Consider a form library with built-in state management</li>
            </ul>

            <h3>Enter Key Early Submit</h3>
            <ul>
                <li>Use <code>type="button"</code> for non-submit buttons</li>
                <li>Add <code>onKeyDown</code> handler to prevent Enter submission in specific fields</li>
            </ul>

            <h3>Special Character Issues</h3>
            <ul>
                <li>Always sanitize and encode user input</li>
                <li>Use parameterized queries for database operations</li>
                <li>Set proper <code>maxLength</code> on inputs</li>
            </ul>

            <h3>Input Overflow</h3>
            <ul>
                <li>Add <code>maxLength</code> attributes to inputs</li>
                <li>Validate input length on the server too</li>
                <li>Show user-friendly error when limit exceeded</li>
            </ul>

            <h3>Double Submit</h3>
            <ul>
                <li>Disable submit button immediately after click (<code>isLoading</code> state)</li>
                <li>Use debounce on submit handler</li>
                <li>Implement idempotency keys on backend</li>
            </ul>

            <h3>Refresh Data Loss</h3>
            <ul>
                <li>Save draft data to LocalStorage on change</li>
                <li>Warn user ("Are you sure you want to leave?") using <code>beforeunload</code> event</li>
            </ul>

            <h2>Next Steps</h2>

            <ul>
                <li><a href="/docs/test-forms">Learn more about form testing</a></li>
                <li><a href="/docs/error-types">Understanding error types</a></li>
                <li><a href="/docs/generate-fix-prompts">Get AI-generated fix suggestions</a></li>
            </ul>
        </article>
    )
}
