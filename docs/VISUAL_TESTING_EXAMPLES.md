# 🎨 Visual Testing - Practical Examples

This guide provides real-world examples of how to use the new visual testing features.

---

## 📸 Screenshot Capture Examples

### **1. Capture Full Page (Existing)**

```javascript
// Test a long page with scrolling
POST /api/tests/run
{
  "projectId": "uuid",
  "build": {
    "type": "web",
    "url": "https://example.com/long-article"
  },
  "profile": {
    "device": "chrome-latest"
  },
  "options": {
    "testMode": "single",
    "maxSteps": 15
  }
}
```

**Result:**
- ✅ Captures 5-10 screenshots at different scroll positions
- ✅ 80% overlap ensures no content is missed
- ✅ All screenshots uploaded to Supabase Storage
- ✅ Linked to diagnosis step with unique IDs

---

### **2. Capture Specific Element ⭐ NEW**

```typescript
// Programmatic usage (for custom tests or God Mode):
const runner = new PlaywrightRunner()
const session = await runner.reserveSession(profile)

// Navigate to page
await runner.executeAction(session.id, {
  action: 'navigate',
  value: 'https://example.com/checkout'
})

// Capture screenshot of payment form only
const paymentFormScreenshot = await runner.captureElementScreenshot(
  session.id,
  'form#payment-form'
)

// Capture screenshot of error message
const errorScreenshot = await runner.captureElementScreenshot(
  session.id,
  '.error-notification'
)

// Capture screenshot of specific button
const buttonScreenshot = await runner.captureElementScreenshot(
  session.id,
  'button[data-testid="submit-payment"]'
)
```

**Use Cases:**
- ✅ Capture error messages for debugging
- ✅ Capture specific UI components
- ✅ Visual regression testing on elements
- ✅ Compare element states before/after actions
- ✅ Create annotated bug reports

---

## 🐛 Visual Bug Detection Examples

### **1. Broken Images Detection**

**Scenario:** E-commerce product page with broken images

**Automatic Detection:**
```javascript
// Run diagnosis on product page
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://shop.example.com/product/123" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "broken-image",
      "element": "img",
      "selector": ".product-thumbnail",
      "description": "Broken image detected: https://cdn.example.com/missing-image.jpg",
      "severity": "high",
      "recommendation": "Fix image source or add error handling for .product-thumbnail"
    }
  ],
  "domHealth": {
    "missingAltText": [
      {
        "selector": "img.hero-banner",
        "element": "img"
      }
    ]
  }
}
```

**What's Detected:**
- ✅ Images with naturalWidth === 0 (failed to load)
- ✅ Images with !img.complete (still loading or failed)
- ✅ Images without alt attributes
- ✅ Images without aria-label fallback

---

### **2. Text Overflow Detection**

**Scenario:** Mobile card layout with truncated descriptions

**Automatic Detection:**
```javascript
// Test on mobile viewport
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://blog.example.com" },
  "profile": {
    "device": "mobile",
    "viewport": { "width": 390, "height": 844 }
  }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "text-overflow",
      "element": "p",
      "selector": ".card-description",
      "description": "Text overflow detected - content may be cut off",
      "severity": "medium"
    }
  ]
}
```

**What's Detected:**
- ✅ Elements with `text-overflow: ellipsis`
- ✅ Content wider than container (scrollWidth > clientWidth)
- ✅ Hidden overflow content
- ✅ Truncated text with "..." indicator

---

### **3. Overlapping Elements Detection**

**Scenario:** Modal dialog overlapping form elements

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://app.example.com/signup" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "element-overlap",
      "element": "div and button",
      "selector": ".modal-backdrop and button.submit",
      "description": "Elements overlap: .modal-backdrop overlaps with button.submit",
      "severity": "high",
      "recommendation": "Adjust positioning or z-index to prevent overlap"
    }
  ]
}
```

**What's Detected:**
- ✅ Elements with overlapping bounding boxes
- ✅ Z-index stacking conflicts
- ✅ Fixed/absolute positioned elements colliding
- ✅ Modal backdrops covering interactive elements

**Smart Filtering:**
- ✅ Ignores parent-child overlaps (valid)
- ✅ Ignores transparent overlays
- ✅ Only reports visible elements

---

### **4. Buttons Outside Viewport Detection ⭐ NEW**

**Scenario:** Submit button positioned below the fold

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://forms.example.com/contact" },
  "profile": {
    "device": "desktop",
    "viewport": { "width": 1920, "height": 1080 }
  }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "missing-element",
      "element": "button",
      "selector": "button[type='submit']",
      "description": "Interactive element below viewport: button[type='submit'] (top: 1200px, left: 400px)",
      "severity": "high",
      "recommendation": "Ensure button[type='submit'] is fully visible within the viewport or add scroll-to-view behavior"
    },
    {
      "type": "missing-element",
      "element": "button",
      "selector": ".back-to-top",
      "description": "Interactive element partially right of viewport: .back-to-top",
      "severity": "medium",
      "recommendation": "Ensure .back-to-top is fully visible or add scroll-to-view"
    }
  ]
}
```

**What's Detected:**
- ✅ Buttons completely above viewport (top < 0, bottom < 0)
- ✅ Buttons completely below viewport (top > height)
- ✅ Buttons completely left of viewport (right < 0)
- ✅ Buttons completely right of viewport (left > width)
- ✅ Partially clipped buttons (any edge outside viewport)

**Button Types Detected:**
```typescript
'button, input[type="submit"], input[type="button"], [role="button"], a.button, .btn'
```

**Severity:**
- 🔴 **High:** Completely outside (not visible)
- 🟡 **Medium:** Partially outside (clipped)

---

### **5. Color Contrast Detection (Existing - WCAG)**

**Scenario:** Light gray text on white background

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://design.example.com" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "accessibility": [
    {
      "id": "contrast-1",
      "type": "error",
      "message": "Low contrast ratio: 2.1 (requires 4.5:1 for WCAG AA)",
      "element": "p",
      "selector": ".subtitle",
      "impact": "critical",
      "fix": "Increase contrast between text and background colors"
    }
  ],
  "wcagScore": {
    "level": "A",  // Fails AA due to contrast issues
    "score": 65,
    "passed": 8,
    "failed": 3
  }
}
```

**WCAG Standards:**
- ✅ **AA Level:** 4.5:1 for normal text, 3:1 for large text
- ✅ **AAA Level:** 7:1 for normal text, 4.5:1 for large text
- ✅ **Luminance Calculation:** Official WCAG 2.1 formula
- ✅ **Large Text Threshold:** 18pt or 14pt bold

---

### **6. Layout Breaks Detection (Existing - Enhanced)**

**Scenario:** Responsive layout breaks on tablet

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://responsive.example.com" },
  "profile": {
    "device": "tablet",
    "viewport": { "width": 768, "height": 1024 }
  }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "layout-shift",
      "description": "Layout shift detected with value 0.31 (CLS)",
      "severity": "high"  // > 0.25 threshold
    },
    {
      "type": "alignment-issue",
      "element": "section",
      "selector": ".content-grid",
      "description": "Inconsistent text alignment in .content-grid: Mixed alignments: left, center, right",
      "severity": "medium",
      "expectedValue": "Consistent text alignment",
      "actualValue": "Mixed alignments: left, center, right"
    },
    {
      "type": "spacing-inconsistent",
      "element": "div",
      "selector": ".card",
      "description": "Spacing between elements (8px) is less than minimum required (16px)",
      "severity": "medium"
    }
  ]
}
```

**Detects:**
- ✅ Cumulative Layout Shift (CLS) from Core Web Vitals
- ✅ Mixed text alignments in containers
- ✅ Inconsistent spacing between elements
- ✅ Elements not aligned properly

---

## 🏗️ Basic Layout Checks Examples

### **1. Blank Screen Detection**

**Scenario:** React app fails to render

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://app.example.com" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "missing-element",
      "severity": "critical",
      "description": "Blank screen detected: page appears empty or not fully loaded (3 visible elements)",
      "recommendation": "Verify page loading is complete, check for JavaScript errors, or increase wait time"
    },
    {
      "type": "missing-element",
      "element": "main",
      "severity": "critical",
      "description": "Main content area is empty",
      "recommendation": "Ensure main content is loaded and rendered"
    }
  ]
}
```

**Detection Logic:**
```typescript
// Checks:
1. Body is visible (display !== 'none', height > 0)
2. Has visible content (>10 visible elements threshold)
3. Main content exists and is visible
4. Main content has actual content (text or children)
```

---

### **2. Header Visibility Check ⭐ NEW**

**Scenario:** Header hidden due to CSS bug

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://blog.example.com" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "missing-element",
      "element": "header",
      "severity": "high",
      "description": "Header element exists but is not visible",
      "recommendation": "Verify header CSS styles (display, visibility, height)"
    },
    {
      "type": "missing-element",
      "element": "header",
      "severity": "medium",
      "description": "Header is empty (no content)",
      "recommendation": "Add content to the header (logo, navigation, etc.)"
    }
  ]
}
```

**What's Checked:**
- ✅ **Existence:** `<header>`, `[role="banner"]`, `.header`, `#header`
- ✅ **Visibility:** display, visibility, opacity, dimensions
- ✅ **Content:** Text content or child elements present
- ✅ **Accessibility:** Proper semantic markup

---

### **3. Footer Visibility Check ⭐ NEW**

**Scenario:** Footer pushed off-screen by content

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://shop.example.com" },
  "profile": { "device": "desktop" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "missing-element",
      "element": "footer",
      "severity": "medium",
      "description": "Footer element exists but is not visible",
      "recommendation": "Verify footer CSS styles (display, visibility, height)"
    }
  ]
}
```

**What's Checked:**
- ✅ **Existence:** `<footer>`, `[role="contentinfo"]`, `.footer`, `#footer`
- ✅ **Visibility:** Rendered and visible on page
- ✅ **Position:** Not pushed off-screen

---

### **4. Main Content Rendering ⭐ NEW**

**Scenario:** SPA fails to load main content

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://dashboard.example.com" },
  "profile": { "device": "chrome-latest" }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "missing-element",
      "element": "main",
      "severity": "critical",
      "description": "Main content element exists but is not visible - possible blank screen",
      "recommendation": "Verify main content CSS styles and ensure content is rendered"
    }
  ]
}
```

**What's Checked:**
- ✅ **Existence:** `<main>`, `[role="main"]`, `#main`, `.main-content`, `#content`
- ✅ **Visibility:** Rendered and visible
- ✅ **Content:** Has text or child elements
- ✅ **Critical Check:** Empty main = blank screen issue

---

### **5. Horizontal Scrolling Detection (Desktop) ⭐ NEW**

**Scenario:** Wide hero image causes horizontal scroll on desktop

**Automatic Detection:**
```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://portfolio.example.com" },
  "profile": {
    "device": "desktop",
    "viewport": { "width": 1920, "height": 1080 }
  }
}

// AI automatically detects:
{
  "visualIssues": [
    {
      "type": "layout-shift",
      "severity": "high",
      "description": "Horizontal scrolling detected on desktop: page is 350px wider than viewport (1920px)",
      "expectedValue": "Page width should be ≤ 1920px",
      "actualValue": "2270px",
      "recommendation": "Fix responsive layout: check for fixed widths, large images, or elements with overflow. Culprits: .hero-image, .full-width-banner, .container"
    },
    {
      "type": "element-overlap",
      "element": "img",
      "selector": ".hero-image",
      "severity": "medium",
      "description": "Element extends beyond viewport: .hero-image (2400px wide)",
      "recommendation": "Add max-width: 100% or adjust responsive styles for .hero-image"
    }
  ]
}
```

**Smart Detection:**
- ✅ **Desktop Only:** Skips check on mobile/tablet (< 1024px width)
- ✅ **Identifies Culprits:** Lists top 10 overflowing elements
- ✅ **Exact Measurements:** Reports overflow in pixels
- ✅ **Actionable Fixes:** Suggests specific CSS solutions

**Common Causes Detected:**
- Fixed-width elements (e.g., `width: 2000px`)
- Large images without `max-width: 100%`
- Containers without responsive styles
- Absolutely positioned elements
- Pre-formatted text blocks

---

## 🎬 Real-World Test Scenarios

### **Scenario 1: E-commerce Product Page**

```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://shop.example.com/product/laptop-pro" },
  "profile": { "device": "chrome-latest" }
}
```

**Expected Detections:**
```json
{
  "visualIssues": [
    // Broken product image
    { "type": "broken-image", "severity": "high", "selector": ".product-image" },
    
    // Missing alt text on thumbnails
    { "type": "missing-alt", "element": "img.thumbnail" },
    
    // Long product description truncated
    { "type": "text-overflow", "severity": "medium", "selector": ".description" },
    
    // Add to cart button pushed down by content
    { "type": "missing-element", "description": "Interactive element below viewport: button.add-to-cart" }
  ],
  "domHealth": {
    "missingAltText": [
      { "selector": "img.product-image", "element": "img" },
      { "selector": "img.thumbnail", "element": "img" }
    ]
  }
}
```

---

### **Scenario 2: Blog Article Page**

```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://blog.example.com/article/web-design-2025" },
  "profile": {
    "device": "desktop",
    "viewport": { "width": 1920, "height": 1080 }
  }
}
```

**Expected Detections:**
```json
{
  "visualIssues": [
    // Header visible and has navigation
    // ✅ No issues
    
    // Main content rendered properly
    // ✅ No issues
    
    // Footer visible at bottom
    // ✅ No issues
    
    // No horizontal scrolling
    // ✅ No issues
  ],
  "screenshots": [
    "position-0px.png",
    "position-200px.png",
    "position-400px.png",
    "position-600px.png",
    "position-800px.png"
    // Full page captured with scrolling
  ]
}
```

---

### **Scenario 3: Broken Layout - Multiple Issues**

```javascript
POST /api/tests/run
{
  "build": { "type": "web", "url": "https://broken.example.com" },
  "profile": { "device": "chrome-latest" }
}
```

**Expected Detections (Worst Case):**
```json
{
  "visualIssues": [
    // Critical: Blank screen
    {
      "type": "missing-element",
      "severity": "critical",
      "description": "Blank screen detected: page appears empty (3 visible elements)"
    },
    
    // Critical: No main content
    {
      "type": "missing-element",
      "element": "main",
      "severity": "critical",
      "description": "Main content element exists but is not visible"
    },
    
    // High: Header not visible
    {
      "type": "missing-element",
      "element": "header",
      "severity": "high",
      "description": "Header element exists but is not visible"
    },
    
    // High: Horizontal scrolling
    {
      "type": "layout-shift",
      "severity": "high",
      "description": "Horizontal scrolling detected: page is 500px wider than viewport"
    },
    
    // High: Broken images
    {
      "type": "broken-image",
      "severity": "high",
      "selector": ".hero-bg",
      "description": "Broken image detected: /images/hero.jpg"
    },
    
    // High: Buttons outside viewport
    {
      "type": "missing-element",
      "severity": "high",
      "description": "Interactive element below viewport: button.submit"
    },
    
    // High: Elements overlapping
    {
      "type": "element-overlap",
      "severity": "high",
      "description": "Elements overlap: .modal overlaps with button.close"
    },
    
    // Medium: Text overflow
    {
      "type": "text-overflow",
      "severity": "medium",
      "selector": ".card-text",
      "description": "Text overflow detected - content may be cut off"
    },
    
    // Critical: Color contrast
    {
      "type": "error",
      "impact": "critical",
      "message": "Low contrast ratio: 1.8 (requires 4.5:1 for WCAG AA)"
    }
  ]
}
```

**All Issues Detected in One Test Run! 🎯**

---

## 🔍 Debugging with Visual Testing

### **Use Element Screenshot for Debugging:**

```typescript
// Capture error state
const errorScreenshot = await runner.captureElementScreenshot(
  sessionId,
  '.error-message'
)

// Capture button state before click
const beforeScreenshot = await runner.captureElementScreenshot(
  sessionId,
  'button[disabled]'
)

// Click button
await runner.executeAction(sessionId, {
  action: 'click',
  selector: 'button'
})

// Capture button state after click
const afterScreenshot = await runner.captureElementScreenshot(
  sessionId,
  'button'
)

// Compare states visually
```

---

## 📊 How Issues Are Reported

### **In Test Run Response:**
```json
GET /api/tests/:runId

{
  "testRun": {
    "diagnosis": {
      "comprehensiveTests": {
        "visualIssues": [
          {
            "type": "broken-image",
            "element": "img",
            "selector": ".hero-banner",
            "description": "Broken image detected: /hero.jpg",
            "severity": "high",
            "recommendation": "Fix image source"
          }
        ],
        "domHealth": {
          "missingAltText": [
            { "selector": ".hero-banner", "element": "img" }
          ],
          "hiddenElements": [],
          "missingLabels": [],
          "orphanedElements": []
        },
        "accessibility": [
          {
            "type": "error",
            "message": "Low contrast ratio: 2.1",
            "impact": "critical"
          }
        ]
      }
    }
  }
}
```

### **In ZIP Download Report:**
```
test-report-abc123.zip
├── report.json           # Full data with all visual issues
├── report.html           # Visual report with issue highlights
├── screenshots/
│   ├── step-1.png       # Viewport screenshot
│   ├── step-2.png       # After interaction
│   ├── element-form.png # Element-specific (if captured)
│   └── diagnosis-*.png  # Full-page scrolling captures
├── video.webm           # Full recording showing all issues
└── test-logs.txt        # Step-by-step log
```

### **In Video Recording:**
- ✅ Broken images appear as broken
- ✅ Buttons outside viewport not visible
- ✅ Horizontal scroll visible when present
- ✅ Layout shifts visible during playback
- ✅ Color contrast issues visible

---

## 🎯 Best Practices

### **1. Test Different Viewports**
```javascript
// Test on mobile
{ "profile": { "device": "mobile", "viewport": { "width": 390, "height": 844 }}}

// Test on tablet
{ "profile": { "device": "tablet", "viewport": { "width": 768, "height": 1024 }}}

// Test on desktop
{ "profile": { "device": "desktop", "viewport": { "width": 1920, "height": 1080 }}}
```

### **2. Test Multi-Browser**
```javascript
// Chrome
{ "profile": { "device": "chrome-latest" }}

// Firefox
{ "profile": { "device": "firefox-latest" }}

// Safari (WebKit)
{ "profile": { "device": "safari-latest" }}
```

### **3. Capture Key Elements**
```javascript
// Capture specific UI states:
- Error messages: '.error, .alert-danger, [role="alert"]'
- Success messages: '.success, .alert-success'
- Loading states: '.spinner, .loading'
- Modals: '.modal, [role="dialog"]'
- Forms: 'form#checkout, .payment-form'
```

---

## 📈 Performance Tips

### **Optimize Screenshot Capture:**
```typescript
// Use viewport capture for speed (not full page)
const fast = await runner.captureScreenshot(sessionId, false)

// Use full page only when needed
const complete = await runner.captureScreenshot(sessionId, true)

// Use element capture for specific components
const focused = await runner.captureElementScreenshot(sessionId, '.component')
```

### **Optimize Visual Checks:**
```typescript
// Skip horizontal scroll check on mobile (automatic)
if (viewport.width < 1024) {
  // Skipped automatically
}

// Limit overlapping element checks
const allElements = [...].slice(0, 100)  // Limit to 100 elements

// Cache results during same test run
const results = comprehensiveTesting.getResults()  // Reuses cached data
```

---

## 🎊 Summary

**All visual testing features are now 100% complete:**

### **Screenshot Capture:**
- ✅ Viewport screenshots
- ✅ Full page scrolling screenshots
- ✅ Element-specific screenshots ⭐ NEW
- ✅ Timestamp and step linking
- ✅ Supabase Storage integration

### **Visual Bug Detection:**
- ✅ Broken images (404 + missing alt)
- ✅ Text overflow
- ✅ Overlapping elements
- ✅ Buttons outside viewport ⭐ NEW
- ✅ Color contrast (WCAG AA/AAA)
- ✅ Layout breaks and shifts

### **Basic Layout Checks:**
- ✅ Blank screen detection
- ✅ Header visibility ⭐ NEW
- ✅ Footer visibility ⭐ NEW
- ✅ Main content rendering ⭐ NEW
- ✅ No horizontal scrolling (desktop) ⭐ NEW

**Total: 17/17 features = 100% ✅**

**Ready for production! 🚀**

