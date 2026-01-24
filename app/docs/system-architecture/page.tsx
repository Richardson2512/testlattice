import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Rihario System Architecture | Documentation',
    description: 'Technical overview of Rihario\'s autonomous testing engine, worker nodes, and AI-driven selector healing.',
    openGraph: {
        title: 'Rihario System Architecture',
        description: 'Deep dive into the Rihario execution plane, IronMan HUD, and Self-Healing Memory systems.',
        url: 'https://rihario.com/docs/system-architecture'
    }
}

export default function SystemArchitectureDocPage() {
    return (
        <div className="doc-content">
            <h1>Rihario System Architecture</h1>
            <p className="lead">
                This document outlines the high-level architecture of the Rihario autonomous testing platform. It serves as the canonical reference for system behavior, security isolation, and decision-making logic.
            </p>

            <hr />

            <h2>1. High-Level Design</h2>
            <p>
                Rihario is designed as a <strong>distributed, event-driven system</strong>. It separates the <strong>Control Plane</strong> (Dashboard, API) from the <strong>Execution Plane</strong> (Worker Nodes, Browser Containers). This ensures that user data and test execution are strictly isolated.
            </p>

            <h2>2. Core Components</h2>

            <h3>2.1 The Control Plane</h3>
            <p>
                The Control Plane handles user authentication, project management, and test scheduling. It exposes a REST API consumed by the frontend dashboard and CI/CD integrations.
            </p>
            <ul>
                <li><strong>API Gateway:</strong> Routes requests and enforces rate limits.</li>
                <li><strong>Scheduler:</strong> Manages the queue of pending tests (FIFO with priority overrides).</li>
                <li><strong>Result Aggregator:</strong> Processes streams from workers (logs, video chunks) and stores them in hot storage (S3-compatible).</li>
            </ul>

            <h3>2.2 The Execution Plane (Workers)</h3>
            <p>
                Workers are stateless compute units that execute the actual tests.
            </p>
            <ul>
                <li><strong>Isolation:</strong> Each test runs in a fresh, ephemeral Docker container.</li>
                <li><strong>Browser Engine:</strong> We use a customized build of Chromium/Playwright with the Chrome DevTools Protocol (CDP) exposed to our AI agent.</li>
                <li><strong>The AI Agent:</strong> A node.js process that "drives" the browser. It does not use pre-defined scripts. Instead, it observes the DOM and decides on actions based on the Goal.</li>
            </ul>

            <h2>3. Key Technologies</h2>

            <h3>3.1 IronMan HUD (Computer Vision)</h3>
            <p>
                Rihario creates a real-time overlay on the video stream called the "IronMan HUD." This is not just a visual effect; it is a debugging tool. It maps the AI's internal "Attention Map"—what elements it considers important—directly onto the visual output, allowing users to see <em>why</em> the AI clicked a button.
            </p>

            <h3>3.2 Self-Healing Memory</h3>
            <p>
                When a test succeeds, Rihario stores a <strong>Semantic Fingerprint</strong> of the critical elements (Login Button, Nav Link). If the CSS selectors change in a future build (e.g., `btn-primary` becomes `btn-red`), Rihario uses the fingerprint to find the element again by its text, position, and attributes, healing the test automatically.
            </p>

            <h3>3.3 Rage Bait Heuristics</h3>
            <p>
                The system monitors for "Frustration Signals":
            </p>
            <ul>
                <li><strong>Rapid Clicking:</strong> &gt;3 clicks on the same coordinate in 500ms.</li>
                <li><strong>Dead Clicks:</strong> Clicks on elements with `cursor: pointer` that trigger no network or DOM change.</li>
                <li><strong>Cursor Thrashing:</strong> Rapid, erratic mouse movement indicating confusion.</li>
            </ul>

            <h2>4. Security & Privacy</h2>
            <p>
                Tests are executed in a sandbox. No data persists on the worker node after the container terminates. We support whitelisted IPs for testing internal staging environments.
            </p>
        </div>
    )
}
