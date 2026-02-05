'use client'

import React from 'react'
import { ContextualCTA } from './ContextualCTA'
import { UrgencyTimer } from './UrgencyTimer'
import { IronManHUD } from './IronManHUD'
import { TestRun } from '@/lib/api'

// Step data from the test run
interface TestStep {
    step: number
    action: string
    success: boolean
    note?: string
    description?: string
    severity?: 'GREEN' | 'YELLOW' | 'RED'
    samples?: string[]
    observed_state?: Record<string, any>
    error?: string
    duration?: number
    screenshotUrl?: string
}

interface GuestTestReportProps {
    testType: 'visual' | 'navigation' | 'accessibility' | 'performance' | 'full'
    steps: TestStep[]
    targetUrl: string
    testRun?: TestRun  // Optional testRun for contextual CTAs
    testCompleted?: boolean
    maxSteps?: number
}

// Map test types to relevant step actions
const TEST_TYPE_STEP_MAP: Record<string, string[]> = {
    visual: [
        'viewport_desktop', 'viewport_laptop', 'viewport_tablet', 'viewport_mobile',
        'detect_overflow', 'detect_placeholder', 'check_media', 'scroll_test',
        'render_sanity', 'final_snapshot'
    ],
    navigation: [
        'navigate_check', 'validate_links', 'check_network', 'network_idle'
    ],
    accessibility: [
        'check_a11y', 'aria_audit', 'contrast_check', 'keyboard_navigation'
    ],
    performance: [
        'check_network', 'network_idle', 'render_sanity', 'scroll_test'
    ],
    full: [] // Show all
}

// Human-readable names for actions
const ACTION_LABELS: Record<string, { name: string; what: string; why: string }> = {
    // Visual Test Actions
    viewport_desktop: {
        name: 'Desktop View Check',
        what: 'Captured screenshot at 1920x1080 (desktop) resolution',
        why: 'Ensures your site looks correct on large screens'
    },
    viewport_laptop: {
        name: 'Laptop View Check',
        what: 'Captured screenshot at 1366x768 (laptop) resolution',
        why: 'Validates layout on common laptop displays'
    },
    viewport_tablet: {
        name: 'Tablet View Check',
        what: 'Captured screenshot at 768x1024 (tablet) resolution',
        why: 'Tests responsive breakpoints for tablets'
    },
    viewport_mobile: {
        name: 'Mobile View Check',
        what: 'Captured screenshot at 375x667 (mobile) resolution',
        why: 'Ensures mobile usability and touch-friendliness'
    },
    detect_overflow: {
        name: 'Text Overflow Detection',
        what: 'Scanned all text elements for horizontal or vertical overflow',
        why: 'Overflow text is cut off and unreadable, damaging UX'
    },
    detect_placeholder: {
        name: 'Placeholder Text Detection',
        what: 'Searched for common placeholder patterns (Lorem ipsum, TODO, etc.)',
        why: 'Placeholder text in production indicates unfinished content'
    },
    check_media: {
        name: 'Media Asset Verification',
        what: 'Checked all images and videos for successful loading',
        why: 'Broken images make your site look unprofessional'
    },
    scroll_test: {
        name: 'Scroll Behavior Test',
        what: 'Tested page scrolling from top to bottom',
        why: 'Ensures no scroll-jacking or stuck elements'
    },
    render_sanity: {
        name: 'Render Sanity Check',
        what: 'Verified the page renders without blank/white screens',
        why: 'Catches critical rendering failures'
    },
    validate_links: {
        name: 'Link Validation',
        what: 'Extracted and validated all internal links on the page',
        why: 'Broken links frustrate users and hurt SEO'
    },
    navigate_check: {
        name: 'Page Load Check',
        what: 'Navigated to the URL and verified it loads successfully',
        why: 'The most basic test - can users reach your page?'
    },
    check_network: {
        name: 'Network Health Check',
        what: 'Monitored network requests for failures (4xx, 5xx)',
        why: 'Failed requests indicate broken features or APIs'
    },
    check_console: {
        name: 'Console Error Check',
        what: 'Monitored browser console for JavaScript errors',
        why: 'Console errors often indicate bugs in your site'
    },
    network_idle: {
        name: 'Network Stability Wait',
        what: 'Waited for network activity to stabilize',
        why: 'Ensures page is fully loaded before testing'
    },
    popup_dismiss: {
        name: 'Popup Dismissal',
        what: 'Attempted to close any modal popups or overlays',
        why: 'Popups can block testing and annoy users'
    },
    final_snapshot: {
        name: 'Final Snapshot',
        what: 'Captured final state of the page after all tests',
        why: 'Provides a baseline for future comparison'
    },
    // Navigation Test Actions
    extract_primary_nav: {
        name: 'Extract Primary Navigation',
        what: 'Identified all links in your site header/navigation area',
        why: 'Understanding your navigation structure is key to testing it'
    },
    count_total_nav_items: {
        name: 'Count Navigation Items',
        what: 'Counted total navigation elements on the page',
        why: 'Provides context about your site structure'
    },
    detect_placeholders: {
        name: 'Detect Placeholder Links',
        what: 'Checked for links with # or javascript:void() href',
        why: 'Placeholder links indicate unfinished navigation'
    },
    click_first_link: {
        name: 'Test First Navigation Link',
        what: 'Clicked the first valid navigation link',
        why: 'Verifies primary navigation is functional'
    },
    verify_nav_success_1: {
        name: 'Verify First Navigation',
        what: 'Verified the page correctly navigated after clicking',
        why: 'Ensures links lead to valid pages'
    },
    return_home: {
        name: 'Return to Home',
        what: 'Navigated back to the starting page',
        why: 'Tests the ability to return to home'
    },
    click_second_link: {
        name: 'Test Second Navigation Link',
        what: 'Clicked the second valid navigation link',
        why: 'Verifies secondary navigation is functional'
    },
    verify_nav_success_2: {
        name: 'Verify Second Navigation',
        what: 'Verified the page correctly navigated after second click',
        why: 'Ensures multiple links work correctly'
    },
    validate_logo_home: {
        name: 'Logo Home Link Check',
        what: 'Verified clicking the logo returns to home page',
        why: 'Users expect logo to link home'
    },
    check_external_link_safety: {
        name: 'External Link Safety',
        what: 'Checked that external links have rel="noopener"',
        why: 'Prevents security vulnerabilities from target="_blank"'
    },
    detect_broken_anchors: {
        name: 'Broken Anchor Detection',
        what: 'Scanned for malformed or broken anchor links',
        why: 'Broken links frustrate users and hurt SEO'
    },
    record_navigation_consistency: {
        name: 'Navigation Quality Score',
        what: 'Calculated overall navigation health score',
        why: 'Summarizes navigation test results'
    },
    no_nav_links_found: {
        name: 'No Navigation Found',
        what: 'Could not find any navigation links on the page',
        why: 'Sites need clear navigation for usability'
    },
    // Accessibility Test Actions
    inject_accessibility_scanner: {
        name: 'Inject Accessibility Scanner',
        what: 'Loaded axe-core accessibility testing library',
        why: 'Enables automated WCAG compliance checking'
    },
    csp_protection_detected: {
        name: 'CSP Protection Detected',
        what: 'Site has Content Security Policy blocking external scripts',
        why: 'Security feature - not an error, but blocks automated scanning'
    },
    run_critical_rule_set: {
        name: 'Run Accessibility Scan',
        what: 'Executed WCAG 2.0 A/AA rule set against the page',
        why: 'Identifies accessibility violations'
    },
    count_critical_violations: {
        name: 'Critical Violations',
        what: 'Counted accessibility issues that block users',
        why: 'Critical issues prevent disabled users from using your site'
    },
    count_serious_violations: {
        name: 'Serious Violations',
        what: 'Counted accessibility issues that cause major barriers',
        why: 'Serious issues significantly impact disabled users'
    },
    detect_missing_alt_attributes: {
        name: 'Missing Alt Text',
        what: 'Checked images for alt attribute descriptions',
        why: 'Screen readers need alt text to describe images'
    },
    detect_unlabeled_inputs: {
        name: 'Unlabeled Form Inputs',
        what: 'Checked form fields for associated labels',
        why: 'Unlabeled inputs are unusable for screen reader users'
    },
    detect_icon_only_buttons: {
        name: 'Icon-Only Buttons',
        what: 'Found buttons with icons but no text labels',
        why: 'Icon-only buttons need aria-labels for accessibility'
    },
    automated_accessibility_scan: {
        name: 'Automated Scan',
        what: 'Ran automated accessibility analysis',
        why: 'Catches common WCAG violations'
    },
    automated_checks_skipped: {
        name: 'Automated Checks Skipped',
        what: 'Skipped automated checks due to CSP or injection failure',
        why: 'Manual keyboard tests were still performed'
    },
    perform_keyboard_tab_navigation: {
        name: 'Keyboard Navigation Test',
        what: 'Tested Tab key navigation through page elements',
        why: 'Users without mice rely on keyboard navigation'
    },
    check_focus_visibility: {
        name: 'Focus Indicator Check',
        what: 'Verified focus outline is visible on active elements',
        why: 'Keyboard users need to see which element is focused'
    },
    detect_aria_role_misuse: {
        name: 'ARIA Role Audit',
        what: 'Checked for incorrect ARIA role usage',
        why: 'Incorrect ARIA can confuse assistive technologies'
    },
    capture_accessibility_overlay_snapshot: {
        name: 'Accessibility Snapshot',
        what: 'Captured accessibility state of the page',
        why: 'Documents accessibility findings'
    },
    summarize_top_risks: {
        name: 'Accessibility Risk Summary',
        what: 'Summarized the most severe accessibility issues',
        why: 'Prioritizes what to fix first'
    },
    summarize_results: {
        name: 'Results Summary',
        what: 'Completed keyboard navigation analysis',
        why: 'Summarizes manual testing findings'
    },
    keyboard_navigation_test: {
        name: 'Keyboard Test Failed',
        what: 'Keyboard navigation test encountered an error',
        why: 'May indicate JavaScript issues blocking keyboard events'
    },
    // Form Test Actions
    detect_primary_form: {
        name: 'Detect Form',
        what: 'Located the primary form on the page',
        why: 'Forms are the main way users interact with your site'
    },
    enumerate_input_fields: {
        name: 'Count Input Fields',
        what: 'Identified all input fields in the form',
        why: 'Understanding form structure is key to testing it'
    },
    no_visible_inputs: {
        name: 'No Visible Inputs',
        what: 'Form exists but has no visible input fields',
        why: 'May indicate hidden fields or JavaScript-rendered inputs'
    },
    check_input_type_correctness: {
        name: 'Input Type Check',
        what: 'Verified email fields use type="email", etc.',
        why: 'Correct input types enable mobile keyboards and validation'
    },
    attempt_empty_submit: {
        name: 'Empty Submit Test',
        what: 'Attempted to submit the form with empty fields',
        why: 'Forms should validate and block empty submissions'
    },
    capture_validation_messages: {
        name: 'Validation Messages',
        what: 'Captured form validation error messages',
        why: 'Good validation helps users correct mistakes'
    },
    inject_safe_dummy_data: {
        name: 'Fill Test Data',
        what: 'Filled form fields with safe test data',
        why: 'Tests form with realistic input'
    },
    submit_form: {
        name: 'Submit Form',
        what: 'Submitted the form with test data',
        why: 'Tests the form submission flow'
    },
    detect_outcome: {
        name: 'Detect Outcome',
        what: 'Analyzed page for success/error indicators',
        why: 'Classifies form submission result'
    },
    capture_confirmation_clarity: {
        name: 'Confirmation Clarity',
        what: 'Captured post-submission page state',
        why: 'Users need clear confirmation after submitting'
    },
    refresh_page_post_submit: {
        name: 'Refresh After Submit',
        what: 'Refreshed page after form submission',
        why: 'Tests form reset behavior'
    },
    detect_state_persistence: {
        name: 'State Persistence',
        what: 'Checked if form data persists after refresh',
        why: 'Some forms should persist, others should reset'
    },
    final_form_state_capture: {
        name: 'Final Form State',
        what: 'Captured final state of form after testing',
        why: 'Documents form test completion'
    },
    form_test_error: {
        name: 'Form Test Error',
        what: 'An error occurred during form testing',
        why: 'May indicate JavaScript errors or form issues'
    },
    // Auth Flow Actions (Login/Signup)
    detect_signup_form: {
        name: 'Detect Signup Form',
        what: 'Located signup/registration form on the page',
        why: 'Tests user registration flow'
    },
    no_form_found: {
        name: 'No Form Found',
        what: 'Could not locate a login/signup form',
        why: 'Page may not have expected authentication UI'
    },
    count_total_fields: {
        name: 'Count Total Fields',
        what: 'Counted all input fields on the page',
        why: 'Provides context about form complexity'
    },
    count_required_fields: {
        name: 'Count Required Fields',
        what: 'Counted fields marked as required',
        why: 'Tests validation requirements'
    },
    detect_password_field: {
        name: 'Detect Password Field',
        what: 'Located password input field',
        why: 'Password field is essential for auth forms'
    },
    test_weak_password_feedback: {
        name: 'Weak Password Test',
        what: 'Tested form response to weak password',
        why: 'Good UX warns users about weak passwords'
    },
    inject_credentials: {
        name: 'Enter Credentials',
        what: 'Filled in test credentials',
        why: 'Tests credential input flow'
    },
    verify_terms_link: {
        name: 'Terms Link Check',
        what: 'Verified Terms/Privacy links are present',
        why: 'Legal links are required for user consent'
    },
    check_forgot_password: {
        name: 'Forgot Password Link',
        what: 'Checked for password reset link',
        why: 'Users need a way to recover forgotten passwords'
    },
    check_pre_input_button_state: {
        name: 'Button State (Pre-Input)',
        what: 'Checked if submit is disabled before input',
        why: 'Some forms disable submit until fields are filled'
    },
    test_blank_submission: {
        name: 'Blank Submit Test',
        what: 'Tested form with empty credentials',
        why: 'Forms should block empty submissions'
    },
    test_invalid_credentials: {
        name: 'Invalid Credentials Test',
        what: 'Tested form with wrong credentials',
        why: 'Forms should show clear error messages'
    },
    waiting_for_mfa: {
        name: 'Waiting for MFA',
        what: 'Waiting for user to complete verification',
        why: 'MFA/OTP requires human input'
    },
    mfa_complete: {
        name: 'MFA Completed',
        what: 'Multi-factor authentication was successful',
        why: 'User verified their identity'
    },
    mfa_failed: {
        name: 'MFA Failed',
        what: 'Multi-factor authentication failed or timed out',
        why: 'User did not complete verification'
    },
    detect_verification: {
        name: 'Detect Verification',
        what: 'Checked if email/phone verification is required',
        why: 'Many signups require email verification'
    },
    verification_not_completed: {
        name: 'Verification Incomplete',
        what: 'Email verification was required but not completed',
        why: 'Signup flow cannot complete without verification'
    },
    verify_creation: {
        name: 'Verify Account Creation',
        what: 'Checked if account was successfully created',
        why: 'Tests the full signup flow'
    },
    capture_snapshot: {
        name: 'Capture Final State',
        what: 'Saved screenshot of final page state',
        why: 'Documents auth flow completion'
    },
    auth_flow_error: {
        name: 'Auth Flow Error',
        what: 'An error occurred during authentication testing',
        why: 'May indicate site issues or test failures'
    },
    // Rage Bait / Chaos Test Actions
    find_form: {
        name: 'Hunt for Forms',
        what: 'Searched page for interactive forms',
        why: 'Forms are the main target for chaos testing'
    },
    back_button_zombie: {
        name: 'Back Button Test',
        what: 'Tested browser back button behavior',
        why: 'Some sites break when users press back'
    },
    enter_key_trap: {
        name: 'Enter Key Test',
        what: 'Tested if Enter key submits forms correctly',
        why: 'Users expect Enter to submit forms'
    },
    special_char_attack: {
        name: 'Special Character Test',
        what: 'Tested form with emojis and special characters',
        why: 'Forms should handle all valid input'
    },
    input_overflow: {
        name: 'Input Overflow Test',
        what: 'Tested form with extremely long input',
        why: 'Forms should handle or limit long input'
    },
    double_submit: {
        name: 'Double Submit Test',
        what: 'Tested rapid double-clicking submit button',
        why: 'Forms should prevent duplicate submissions'
    },
    session_timeout: {
        name: 'Session Timeout Test',
        what: 'Simulated session expiration mid-form',
        why: 'Tests how form handles expired sessions'
    },
    refresh_persistence: {
        name: 'Refresh Persistence Test',
        what: 'Tested if form data survives page refresh',
        why: 'Accidental refresh should not lose user data'
    },
    network_throttle: {
        name: 'Slow Network Test',
        what: 'Tested form behavior on slow 3G connection',
        why: 'Forms should handle slow connections gracefully'
    },
    observe_ux: {
        name: 'Error UX Analysis',
        what: 'Analyzed loading and error handling patterns',
        why: 'Good UX provides clear feedback'
    },
    frustration_signals: {
        name: 'Frustration Signals',
        what: 'Analyzed console for error patterns',
        why: 'Console errors often indicate user-facing issues'
    },
    final_capture: {
        name: 'Chaos Test Complete',
        what: 'Captured final state after all chaos tests',
        why: 'Documents chaos testing completion'
    }
}

// Severity colors
const SEVERITY_STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    GREEN: { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', text: '#10b981', icon: '✓' },
    YELLOW: { bg: 'rgba(234, 179, 8, 0.1)', border: '#eab308', text: '#eab308', icon: '⚠' },
    RED: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444', icon: '✗' }
}

// Test type descriptions
const TEST_TYPE_INFO: Record<string, { title: string; description: string; icon: string }> = {
    visual: {
        title: 'Visual Test Report',
        description: 'This test checked your page for visual issues including layout problems, text overflow, broken images, and responsive design across different screen sizes.',
        icon: '🎨'
    },
    navigation: {
        title: 'Navigation Test Report',
        description: 'This test validated your page\'s links, navigation structure, and network health.',
        icon: '🔗'
    },
    accessibility: {
        title: 'Accessibility Test Report',
        description: 'This test evaluated your page for WCAG compliance, keyboard navigation, and screen reader compatibility.',
        icon: '♿'
    },
    performance: {
        title: 'Performance Test Report',
        description: 'This test measured loading speed, network efficiency, and rendering performance.',
        icon: '⚡'
    },
    full: {
        title: 'Comprehensive Test Report',
        description: 'This test ran a full suite of visual, navigation, accessibility, and performance checks.',
        icon: '🔬'
    }
}

export function GuestTestReport({ testType, steps, targetUrl, testRun, testCompleted, maxSteps = 10 }: GuestTestReportProps) {
    const info = TEST_TYPE_INFO[testType] || TEST_TYPE_INFO.full
    // Show ALL steps - backend already filters based on test type
    // No frontend filtering needed
    const relevantSteps = steps

    // Group steps by status
    const issues = relevantSteps.filter(s => !s.success || s.severity === 'RED')
    const warnings = relevantSteps.filter(s => s.success && s.severity === 'YELLOW')
    const passed = relevantSteps.filter(s => s.success && (!s.severity || s.severity === 'GREEN'))

    // Calculate contextual CTA metrics
    const criticalIssues = issues.filter(s => s.severity === 'RED').length
    const hitStepLimit = steps.length >= maxSteps

    return (
        <div style={{ marginBottom: '2rem' }}>
            {/* Urgency Timer - Guest results expire */}
            {testRun?.expiresAt && (
                <UrgencyTimer expiresAt={testRun.expiresAt} />
            )}

            {/* Contextual CTA - Smart signup prompts */}
            {testRun && (
                <ContextualCTA
                    testRun={testRun}
                    issuesFound={issues.length}
                    criticalIssues={criticalIssues}
                    hitStepLimit={hitStepLimit}
                    testCompleted={testCompleted}
                />
            )}

            {/* Header */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{info.icon}</span>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{info.title}</h2>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            Tested: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>{targetUrl}</code>
                        </div>
                    </div>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {info.description}
                </p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <SummaryCard
                    title="Issues Found"
                    count={issues.length}
                    color="#ef4444"
                    icon="✗"
                    description={issues.length > 0 ? 'Requires immediate attention' : 'No issues detected'}
                />
                <SummaryCard
                    title="Warnings"
                    count={warnings.length}
                    color="#eab308"
                    icon="⚠"
                    description={warnings.length > 0 ? 'Review recommended' : 'All clear'}
                />
                <SummaryCard
                    title="Passed"
                    count={passed.length}
                    color="#10b981"
                    icon="✓"
                    description="Tests completed successfully"
                />
            </div>

            {/* Detailed Results */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
                    Test Results
                </h3>

                {/* Issues First */}
                {issues.length > 0 && (
                    <ResultSection title="🔴 Issues" steps={issues} />
                )}

                {/* Then Warnings */}
                {warnings.length > 0 && (
                    <ResultSection title="🟡 Warnings" steps={warnings} />
                )}

                {/* Then Passed */}
                {passed.length > 0 && (
                    <ResultSection title="🟢 Passed" steps={passed} defaultCollapsed={issues.length > 0 || warnings.length > 0} />
                )}
            </div>
        </div>
    )
}

function SummaryCard({ title, count, color, icon, description }: {
    title: string; count: number; color: string; icon: string; description: string
}) {
    return (
        <div style={{
            background: `${color}10`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            border: `1px solid ${color}30`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color, fontSize: '1.25rem' }}>{icon}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{title}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{count}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{description}</div>
        </div>
    )
}

function ResultSection({ title, steps, defaultCollapsed = false }: {
    title: string; steps: TestStep[]; defaultCollapsed?: boolean
}) {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <button
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    width: '100%',
                    textAlign: 'left'
                }}
            >
                <span style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
                {title} ({steps.length})
            </button>

            {!collapsed && (
                <div style={{ marginTop: '0.5rem' }}>
                    {steps.map((step, i) => (
                        <StepCard key={`${step.action}-${i}`} step={step} />
                    ))}
                </div>
            )}
        </div>
    )
}

function StepCard({ step }: { step: TestStep }) {
    const label = ACTION_LABELS[step.action] || {
        name: step.action,
        what: step.description || 'Executed test step',
        why: 'Part of the test suite'
    }
    const severity = step.severity || (step.success ? 'GREEN' : 'RED')
    const styles = SEVERITY_STYLES[severity]

    return (
        <div style={{
            background: styles.bg,
            border: `1px solid ${styles.border}30`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '0.75rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{
                    color: styles.text,
                    fontSize: '1.25rem',
                    flexShrink: 0
                }}>{styles.icon}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{label.name}</div>

                    {/* What was tested */}
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {label.what}
                    </div>

                    {/* Result/Note */}
                    {step.note && (
                        <div style={{
                            fontWeight: 500,
                            color: styles.text,
                            marginBottom: '0.5rem'
                        }}>
                            Result: {step.note}
                        </div>
                    )}

                    {/* Error message */}
                    {step.error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            marginBottom: '0.5rem'
                        }}>
                            Error: {step.error}
                        </div>
                    )}

                    {/* Screenshot with IronManHUD */}
                    {step.screenshotUrl && (
                        <div style={{ marginTop: '1rem', position: 'relative', height: '300px' }}>
                            <IronManHUD
                                screenshotUrl={step.screenshotUrl}
                                targetElementBounds={step.success === false ? {
                                    selector: step.note || step.action,
                                    bounds: { x: 0, y: 0, width: 0, height: 0 },
                                    interactionType: 'failed'
                                } : undefined}
                                showAll={false}
                            />
                        </div>
                    )}

                    {/* Samples/Details */}
                    {step.samples && step.samples.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                Found elements:
                            </div>
                            <div style={{
                                background: 'var(--bg-tertiary)',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)'
                            }}>
                                {step.samples.slice(0, 5).map((s, i) => (
                                    <div key={i} style={{ marginBottom: i < step.samples!.length - 1 ? '0.25rem' : 0 }}>
                                        • {s}
                                    </div>
                                ))}
                                {step.samples.length > 5 && (
                                    <div style={{ color: 'var(--text-muted)' }}>...and {step.samples.length - 5} more</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Why it matters */}
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.5rem',
                        fontStyle: 'italic'
                    }}>
                        Why: {label.why}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestTestReport
