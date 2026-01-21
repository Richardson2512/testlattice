export default function BrowserLimitationsContent() {
  return (
    <article>
      <h1>Browser & Device Limitations</h1>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
        <strong>Rihario supports modern browsers (Chrome, Firefox, Safari) on desktop and mobile viewports.</strong> Some features work better on desktop, mobile testing has limitations, and certain browser-specific features may not be fully supported. Here's what works and what doesn't.
      </p>

      <h2>Supported Browsers</h2>

      <h3>Desktop Browsers</h3>

      <ul>
        <li><strong>Chrome</strong> - Full support, recommended</li>
        <li><strong>Firefox</strong> - Full support</li>
        <li><strong>Safari</strong> - Full support (may have minor limitations)</li>
        <li><strong>Edge</strong> - Full support (Chromium-based)</li>
      </ul>

      <h3>Browser Versions</h3>

      <ul>
        <li><strong>Latest versions</strong> - Support for current stable versions</li>
        <li><strong>Recent versions</strong> - Support for last 2-3 major versions</li>
        <li><strong>Older versions</strong> - May not work with very old browsers</li>
      </ul>

      <h2>Viewport Testing</h2>

      <h3>Desktop Viewports</h3>

      <ul>
        <li><strong>Common resolutions</strong> - 1920x1080, 1366x768, 1440x900</li>
        <li><strong>Custom viewports</strong> - Can specify custom dimensions</li>
        <li><strong>Responsive testing</strong> - Test at different desktop sizes</li>
      </ul>

      <h3>Mobile Viewports</h3>

      <ul>
        <li><strong>Common devices</strong> - iPhone, Android sizes</li>
        <li><strong>Emulated mobile</strong> - Browser emulation, not real devices</li>
        <li><strong>Touch events</strong> - Simulated touch, not real touch</li>
      </ul>

      <h2>Mobile Device Limitations</h2>

      <h3>What Works</h3>

      <ul>
        <li><strong>Viewport emulation</strong> - Browser emulates mobile viewport</li>
        <li><strong>Responsive design testing</strong> - See how site looks on mobile</li>
        <li><strong>Basic interactions</strong> - Clicks, scrolling, form filling</li>
        <li><strong>Visual checks</strong> - See if layout breaks on mobile</li>
      </ul>

      <h3>What Doesn't Work</h3>

      <ul>
        <li><strong>Real device testing</strong> - Not testing on actual phones</li>
        <li><strong>Real touch events</strong> - Simulated, not real touch input</li>
        <li><strong>Device sensors</strong> - GPS, accelerometer, etc. not available</li>
        <li><strong>Device-specific features</strong> - Camera, microphone, etc.</li>
        <li><strong>Native app testing</strong> - Only web apps, not native mobile apps</li>
      </ul>

      <h2>Browser-Specific Limitations</h2>

      <h3>Chrome</h3>

      <ul>
        <li><strong>Best support</strong> - Most features work well</li>
        <li><strong>Fast execution</strong> - Usually fastest</li>
        <li><strong>Recommended</strong> - Best choice for most users</li>
      </ul>

      <h3>Firefox</h3>

      <ul>
        <li><strong>Good support</strong> - Most features work</li>
        <li><strong>May be slower</strong> - Sometimes slower than Chrome</li>
        <li><strong>Minor differences</strong> - Some rendering differences</li>
      </ul>

      <h3>Safari</h3>

      <ul>
        <li><strong>Good support</strong> - Most features work</li>
        <li><strong>WebKit differences</strong> - Some WebKit-specific behavior</li>
        <li><strong>May have quirks</strong> - Some edge cases behave differently</li>
      </ul>

      <h2>Feature Limitations</h2>

      <h3>Supported Features</h3>

      <ul>
        <li>DOM interactions (clicks, typing, etc.)</li>
        <li>Form filling and submission</li>
        <li>Navigation and link following</li>
        <li>Screenshot capture</li>
        <li>Console log capture</li>
        <li>Network request monitoring</li>
      </ul>

      <h3>Limited or Unsupported Features</h3>

      <ul>
        <li><strong>File uploads</strong> - Limited file upload support</li>
        <li><strong>Camera/microphone</strong> - Not accessible</li>
        <li><strong>WebRTC</strong> - May have limitations</li>
        <li><strong>WebGL</strong> - May not capture WebGL content perfectly</li>
        <li><strong>Browser extensions</strong> - Extensions not loaded</li>
        <li><strong>Local storage limitations</strong> - Some storage APIs may differ</li>
      </ul>

      <h2>Performance Considerations</h2>

      <ul>
        <li><strong>Exploration speed</strong> - Varies by browser (Chrome usually fastest)</li>
        <li><strong>Resource usage</strong> - Different browsers use different resources</li>
        <li><strong>Timeout limits</strong> - Some actions may timeout in slower browsers</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li><strong>Use Chrome for primary testing</strong> - Best support and speed</li>
        <li><strong>Test in multiple browsers</strong> - Verify cross-browser compatibility</li>
        <li><strong>Understand mobile limitations</strong> - Know what mobile testing can't do</li>
        <li><strong>Test critical features manually</strong> - Verify device-specific features yourself</li>
      </ul>

      <h2>Plans and Limits</h2>

      <p>
        Some plans may have browser/device limitations:
      </p>

      <ul>
        <li><strong>Free tier</strong> - Limited to certain browsers</li>
        <li><strong>Paid tiers</strong> - Access to all browsers</li>
        <li><strong>Mobile testing</strong> - May require higher tier or add-on</li>
      </ul>

      <p>
        See <a href="/docs/pricing-plans">Pricing & Plans</a> for details.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li><a href="/docs/pricing-plans">See pricing and plan limitations</a></li>
        <li><a href="/docs/credentials-handling">Learn about credential handling</a></li>
        <li><a href="/docs/parallel-cross-browser-testing">Learn about parallel cross-browser testing</a></li>
      </ul>
    </article>
  )
}

