export default function HowAIExploresContent() {
  return (
    <article>
      <h1>How AI Explores Your App (Explained Simply)</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario uses AI to explore your app like a curious user would.</strong> The AI looks at pages, understands what's there, decides what to interact with, and notices when something looks wrong. No scripts, no selectors - just intelligent exploration.
      </p>

      <h2>The Exploration Process</h2>

      <p>
        When you start an exploration, the AI goes through these steps:
      </p>

      <h3>1. Understanding the Page</h3>

      <p>
        First, the AI analyzes what's on the page:
      </p>

      <ul>
        <li><strong>What elements exist</strong> - Buttons, forms, links, images, text</li>
        <li><strong>What's interactive</strong> - Which elements can be clicked, typed into, or interacted with</li>
        <li><strong>Page structure</strong> - Navigation, headers, content areas, footers</li>
        <li><strong>What looks important</strong> - Primary actions vs secondary, key content vs decorative</li>
      </ul>

      <p>
        The AI uses computer vision and DOM analysis to understand the page structure. It's not just reading HTML - it's seeing what the page actually looks like.
      </p>

      <h3>2. Making Decisions</h3>

      <p>
        Based on what it sees, the AI decides what to do next:
      </p>

      <ul>
        <li><strong>Which button to click</strong> - Focuses on primary actions first (Sign Up, Buy Now, etc.)</li>
        <li><strong>What fields to fill</strong> - Identifies forms and understands what data they need</li>
        <li><strong>When to navigate</strong> - Decides if links should be followed</li>
        <li><strong>When to take screenshots</strong> - Captures important states</li>
      </ul>

      <p>
        The AI makes these decisions based on:
      </p>

      <ul>
        <li>Your instructions (if provided) - "check the checkout flow"</li>
        <li>Page context - What elements are visible and important</li>
        <li>Common user flows - How people typically use apps</li>
        <li>Previous exploration - What it's already checked</li>
      </ul>

      <h3>3. Interacting Naturally</h3>

      <p>
        The AI interacts with elements like a human would:
      </p>

      <ul>
        <li><strong>Clicks buttons</strong> - Uses mouse clicks, not just programmatic clicks</li>
        <li><strong>Types in fields</strong> - Generates realistic test data and types character by character</li>
        <li><strong>Scrolls pages</strong> - Scrolls to see content below the fold</li>
        <li><strong>Waits for loads</strong> - Waits for pages to load, elements to appear, animations to finish</li>
      </ul>

      <p>
        This natural interaction is important because it catches issues that programmatic testing might miss - like click handlers that don't fire properly or form validation that breaks.
      </p>

      <h3>4. Detecting Issues</h3>

      <p>
        While exploring, the AI constantly watches for problems:
      </p>

      <ul>
        <li><strong>Visual issues</strong> - Broken layouts, overlapping elements, missing styles</li>
        <li><strong>Console errors</strong> - JavaScript errors logged to the browser console</li>
        <li><strong>Network errors</strong> - Failed requests, 404s, timeouts</li>
        <li><strong>Accessibility issues</strong> - Missing alt text, unlabeled inputs, contrast problems</li>
        <li><strong>Performance issues</strong> - Slow page loads, large bundles</li>
      </ul>

      <p>
        When an issue is detected, the AI:
      </p>

      <ol>
        <li>Captures evidence (screenshot, logs, DOM snapshot)</li>
        <li>Classifies the issue (visual, console, network, etc.)</li>
        <li>Estimates severity (high, medium, low)</li>
        <li>Records where it was found (which step, which page)</li>
      </ol>

      <h3>5. Adapting to Changes</h3>

      <p>
        If your app changes, the AI adapts automatically:
      </p>

      <ul>
        <li><strong>New button text</strong> - Finds the button by visual appearance, not just text</li>
        <li><strong>Different layout</strong> - Understands the new structure and adapts</li>
        <li><strong>Updated selectors</strong> - Doesn't rely on fixed selectors, finds elements dynamically</li>
        <li><strong>New features</strong> - Discovers and explores new elements automatically</li>
      </ul>

      <p>
        This is the key advantage over scripted tests - no maintenance required when your UI changes.
      </p>

      <h2>How AI Makes Decisions</h2>

      <p>
        The AI uses several techniques to decide what to do:
      </p>

      <h3>Computer Vision</h3>

      <p>
        The AI "sees" the page like a human would:
      </p>

      <ul>
        <li>Recognizes buttons by appearance (not just HTML)</li>
        <li>Understands visual hierarchy (what's prominent vs secondary)</li>
        <li>Detects layout issues (overlapping elements, broken CSS)</li>
        <li>Reads text content (even if it's in images)</li>
      </ul>

      <h3>DOM Analysis</h3>

      <p>
        The AI also analyzes the HTML structure:
      </p>

      <ul>
        <li>Identifies semantic elements (forms, buttons, links)</li>
        <li>Reads ARIA labels and accessibility attributes</li>
        <li>Understands element relationships (form fields to labels)</li>
        <li>Analyzes class names and IDs (if helpful)</li>
      </ul>

      <h3>Heuristics and Patterns</h3>

      <p>
        The AI uses learned patterns:
      </p>

      <ul>
        <li>Common UI patterns (login forms, checkout flows, navigation menus)</li>
        <li>User behavior patterns (people typically click primary buttons first)</li>
        <li>Error patterns (what broken layouts usually look like)</li>
        <li>Flow patterns (common paths through apps)</li>
      </ul>

      <h3>Instructions from You</h3>

      <p>
        If you provide instructions like "check the checkout flow", the AI:
      </p>

      <ul>
        <li>Prioritizes actions related to your instructions</li>
        <li>Still checks for general issues</li>
        <li>Focuses exploration on relevant areas</li>
      </ul>

      <h2>What This Means in Practice</h2>

      <h3>No Selectors to Maintain</h3>

      <p>
        Traditional testing requires selectors like <code>#submit-button</code> or <code>.checkout-form</code>. If those change, tests break. Rihario doesn't rely on selectors - it finds elements by understanding what they are and what they do.
      </p>

      <h3>Smart Selector Learning</h3>

      <p>
        When a test <em>does</em> fail because of a changed selector, Rihario's "God Mode" kicks in. It analyzes the page, identifies the correct element using 20+ heuristics (like text content, nearby labels, etc.), and <strong>auto-corrects</strong> the selector for future runs.
      </p>

      <ul>
        <li><strong>Learns from failure:</strong> If <code>#submit-btn</code> vanishes but "Save" button remains, it updates.</li>
        <li><strong>Prioritizes stability:</strong> Learns to prefer <code>data-testid</code> over dynamic classes like <code>.css-1x2y3z</code>.</li>
      </ul>

      <h3>Adapts to UI Changes</h3>

      <p>
        If you redesign your login form, move buttons around, or change CSS, Rihario adapts automatically. The same exploration continues working because the AI understands the page structure, not just fixed selectors.
      </p>

      <h3>Finds Unexpected Issues</h3>

      <p>
        Because the AI explores like a human, it might find issues you didn't think to test for:
      </p>

      <ul>
        <li>Buttons that look clickable but aren't</li>
        <li>Forms that break when typed into</li>
        <li>Layout issues on certain screen sizes</li>
        <li>Errors that only appear under specific conditions</li>
      </ul>

      <h2>Limitations</h2>

      <p>
        AI exploration has limitations:
      </p>

      <ul>
        <li><strong>Not exhaustive</strong> - Explores what it finds, doesn't test every possible scenario</li>
        <li><strong>Probabilistic</strong> - Same exploration might take different paths</li>
        <li><strong>Requires human judgment</strong> - Not everything it flags is a real problem</li>
        <li><strong>Can miss edge cases</strong> - Focuses on common flows, not unusual scenarios</li>
        <li><strong>May false positive</strong> - Sometimes flags non-issues as problems</li>
      </ul>

      <p>
        This is why it's optimized for confidence, not coverage.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/what-happens-test-starts">See what happens when a test starts</a></li>
        <li><a href="/docs/pre-test-diagnosis">Learn about pre-test diagnosis</a></li>
        <li><a href="/docs/ai-accuracy">Understand AI accuracy and limitations</a></li>
        <li><a href="/docs/behavior-analysis">Learn about behavior analysis testing</a></li>
        <li><a href="/whitepaper">Read the technical whitepaper</a></li>
      </ul>
    </article>
  )
}

