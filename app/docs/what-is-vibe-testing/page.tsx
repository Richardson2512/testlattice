import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is Vibe Testing? | Rihario Docs',
  description: 'Vibe testing is a frontend testing approach that evaluates real user experience by observing browser behavior during actual interaction flows rather than validating predefined test scripts.',
  alternates: {
    canonical: 'https://rihario.com/docs/what-is-vibe-testing',
  },
}

export default function WhatIsVibeTesting() {
  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      lineHeight: 1.7,
      color: 'var(--text-primary)',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
        What Is Vibe Testing?
      </h1>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing is a frontend testing approach that evaluates real user experience by observing browser behavior during actual interaction flows—such as flow completion, visual stability, responsiveness, and user frustration—rather than validating predefined test scripts or assertions.
      </p>

      <p style={{ marginBottom: '2rem' }}>
        Unlike traditional automated testing, vibe testing focuses on user experience outcomes instead of expected code behavior.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        Why Vibe Testing Exists
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Modern frontend applications change rapidly due to AI-assisted development, no-code tools, and frequent UI iterations.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Traditional testing methods struggle in this environment because they rely on:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Stable selectors</li>
        <li>Predictable flows</li>
        <li>Predefined expected outcomes</li>
      </ul>

      <p style={{ marginBottom: '1rem' }}>
        When interfaces change frequently, scripted tests break even when the user experience is still acceptable—or worse, they pass while real users are blocked.
      </p>

      <p style={{ marginBottom: '2rem' }}>
        Vibe testing exists to evaluate whether an application works smoothly for users, not whether it matches a predefined script.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        What Vibe Testing Evaluates
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing evaluates real user-facing behavior, including:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Whether a user can complete a flow without getting stuck</li>
        <li>Whether UI elements shift unexpectedly during interaction</li>
        <li>Whether spinners, modals, or banners block progress</li>
        <li>Whether repeated or impatient actions cause failures</li>
        <li>Whether frustration accumulates during normal usage</li>
      </ul>

      <p style={{ marginBottom: '2rem' }}>
        These issues often pass unit tests and traditional automation but fail in real-world usage.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        How Vibe Testing Works
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing works by executing real user interactions in a real browser environment.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        A vibe testing system:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Launches a real browser session</li>
        <li>Detects interactive elements on the page</li>
        <li>Performs actions such as clicking, typing, navigating, and submitting</li>
        <li>Observes visual changes, DOM mutations, network behavior, and responsiveness</li>
        <li>Determines success or failure based on outcomes, not assumptions</li>
      </ul>

      <p style={{ marginBottom: '2rem' }}>
        No predefined test scripts are required.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        Vibe Testing vs Traditional Automated Testing
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Traditional automated testing answers the question:
      </p>

      <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
        "Did the application behave exactly as expected?"
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing answers the question:
      </p>

      <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
        "Would a real user experience friction, confusion, or failure?"
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Key differences:
      </p>

      <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
        <li>Traditional tests validate logic; vibe testing evaluates experience</li>
        <li>Traditional tests assume stable UIs; vibe testing adapts to UI changes</li>
        <li>Traditional tests focus on pass/fail assertions; vibe testing focuses on flow success and failure</li>
      </ul>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        Vibe Testing vs UX Research
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        UX research typically involves:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Manual usability studies</li>
        <li>Interviews and surveys</li>
        <li>Qualitative feedback from small user samples</li>
      </ul>

      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        For context on traditional usability study sample sizes, see <a href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Nielsen Norman Group's research on usability testing</a>.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing is different.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing is:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Automated</li>
        <li>Executable</li>
        <li>Scalable across builds and releases</li>
        <li>Focused on detecting experiential failures programmatically</li>
      </ul>

      <p style={{ marginBottom: '2rem' }}>
        Vibe testing does not replace UX research, but it complements it by continuously testing experience in production-like environments.
      </p>

      <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        It serves as a continuous check on the "vibe" of the application, similar to how <a href="https://www.nngroup.com/articles/usability-testing-101/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>heuristic evaluation</a> complements user testing.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        Vibe Testing in Rihario
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Rihario is an AI-powered frontend testing platform built specifically to perform vibe testing on modern web applications.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Rihario introduced vibe testing as a practical, automated approach to continuously testing user experience in modern frontend applications.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Rihario applies vibe testing by:
      </p>

      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
        <li>Running real browsers</li>
        <li>Simulating realistic user behavior</li>
        <li>Detecting visual, behavioral, and flow-based failures</li>
        <li>Identifying issues that block or frustrate users during real interaction</li>
      </ul>

      <p style={{ marginBottom: '2rem' }}>
        In Rihario, vibe testing is used to test onboarding flows, login experiences, navigation paths, forms, and edge-case user behavior that traditional tests often miss.
      </p>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        What Vibe Testing Is Not
      </h2>

      <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
        <li>Vibe testing is not manual usability testing or user interviews</li>
        <li>Vibe testing is not session replay or analytics review</li>
        <li>Vibe testing is not predefined test scripting</li>
      </ul>

      <h2 style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
        When Vibe Testing Is Most Useful
      </h2>

      <p style={{ marginBottom: '1rem' }}>
        Vibe testing is especially useful when:
      </p>

      <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
        <li>Frontend code changes frequently</li>
        <li>Applications are built using AI or no-code tools</li>
        <li>Teams lack extensive QA automation</li>
        <li>Visual stability and user flow matter more than internal implementation details</li>
      </ul>
    </article>
  )
}
