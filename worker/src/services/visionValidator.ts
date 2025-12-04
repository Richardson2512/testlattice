import axios from 'axios'

export interface VisionIssue {
  description: string
  severity: 'high' | 'medium' | 'low'
  suggestion?: string
}

interface VisionValidatorContext {
  url?: string
  goal?: string
}

export class VisionValidatorService {
  private apiKey: string
  private model: string
  private endpoint: string
  private interval: number
  private onError: boolean
  private onIRLFallback: boolean

  constructor(
    apiKey: string,
    model: string = process.env.VISION_MODEL || 'gpt-4o',
    endpoint: string = process.env.VISION_MODEL_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
    interval: number = parseInt(process.env.VISION_INTERVAL || '5', 10),
    onError: boolean = process.env.VISION_ON_ERROR !== 'false',
    onIRLFallback: boolean = process.env.VISION_ON_IRL !== 'false'
  ) {
    this.apiKey = apiKey
    this.model = model
    this.endpoint = endpoint
    this.interval = interval
    this.onError = onError
    this.onIRLFallback = onIRLFallback
  }

  /**
   * Determine if vision should be used (selective usage strategy)
   */
  shouldUseVision(params: {
    stepNumber: number
    hasError: boolean
    irlFailed: boolean
    visualRegressionEnabled: boolean
  }): boolean {
    // Use vision:
    // - Every N steps (configurable interval)
    if (params.stepNumber % this.interval === 0) {
      return true
    }
    // - On errors (if enabled)
    if (this.onError && params.hasError) {
      return true
    }
    // - When IRL fails (if enabled)
    if (this.onIRLFallback && params.irlFailed) {
      return true
    }
    // - For visual regression (when enabled)
    if (params.visualRegressionEnabled) {
      return true
    }
    return false
  }

  async analyzeScreenshot(imageBase64: string, context?: VisionValidatorContext): Promise<VisionIssue[]> {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are an expert QA engineer with advanced visual perception specializing in UI/UX bug detection and layout validation.

Your role: Catch subjective visual issues and design quality problems that automated checks cannot detect.

IMPORTANT: The following are already checked programmatically (do NOT report these unless you see them visually):
- Broken images (img.complete, naturalWidth checks)
- Text overflow (scrollWidth calculations)  
- Color contrast (WCAG luminance formulas)
- Layout shifts (CLS metrics)
- Elements outside viewport (bounding box math)
- Header/footer/main existence (DOM queries)

FOCUS ON:
- Design quality and visual consistency
- Subjective UX issues ("feels off", "looks wrong")
- Inter-element relationships
- Visual hierarchy problems
- Unclear UI states
- Design system violations

Respond with JSON: {"issues":[{"severity":"high|medium|low","description":"...","suggestion":"..."}]}
If no visual issues found, return: {"issues":[]}`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this screenshot for visual bugs and design quality issues:

**Context:**
- URL: ${context?.url || 'unknown'}
- Test Goal: ${context?.goal || 'General QA'}

**Comprehensive Visual Analysis - Check ALL of the following:**

1. 🖼️ **Broken Images**
   - Are there any images showing error icons, broken image placeholders, or "X" marks?
   - Are there images displaying only alt text instead of the actual image?
   - Are there blank white/gray boxes where images should be?

2. ✂️ **Text Overflow / Cut-Off Text**
   - Is any text visually cut off or truncated with "..."?
   - Is any text extending beyond its container boundary?
   - Are there text blocks with visible overflow or clipping?

3. 👁️ **Button & Element Visibility**
   - Are all buttons and important interactive elements clearly visible?
   - Are any critical buttons obscured, hidden, or pushed off-screen?
   - Are loading states, disabled states, or hover states visually clear?
   - Can you identify what elements are clickable vs non-clickable?

4. 📐 **Layout Breaks & Misalignment**
   - Is the layout broken or rendered incorrectly?
   - Are elements misaligned vertically or horizontally?
   - Are there unexpected gaps or spacing inconsistencies?
   - Is content overlapping or stacked incorrectly?
   - Are columns or grids displaying correctly?

5. 🎨 **Obvious Visual Issues**
   - Overlapping elements (z-index problems)
   - Elements too close together (cramped UI)
   - Inconsistent styling (fonts, colors, spacing)
   - Poor visual hierarchy (hard to scan)
   - Confusing navigation or unclear call-to-actions
   - Elements with negative margins causing layout issues
   - Missing visual feedback (hover, focus, active states)

6. 🔘 **Interactive Element Clarity**
   - Are buttons, links, and forms clearly identifiable?
   - Is it obvious what actions users can take?
   - Are form fields properly labeled and grouped?

7. 📱 **Responsive Design Quality**
   - Does the layout look appropriate for this viewport size?
   - Are mobile elements sized correctly?
   - Is there proper spacing for touch targets?

8. 🚨 **Critical Blocking Issues**
   - Are there any visual bugs that would completely block user flows?
   - Is the page essentially unusable due to visual problems?
   - Are error messages or success notifications visible when they should be?

**Analysis Guidelines:**
- Be specific: "Submit button overlaps with logo" not "layout issue"
- Provide context: Include element descriptions when possible
- Prioritize: High = blocking issues, Medium = UX problems, Low = minor polish
- Be practical: Only report issues a real user would notice
- Skip non-issues: If everything looks good, return empty array

**Return Format:**
{
  "issues": [
    {
      "severity": "high|medium|low",
      "description": "Clear, specific description of the visual bug",
      "suggestion": "Actionable fix recommendation"
    }
  ]
}

Analyze thoroughly and return all visual issues found, or empty array if page looks good.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${imageBase64}`
              }
            }
          ]
        }
      ]

      const response = await axios.post(
        this.endpoint,
        {
          model: this.model,
          temperature: 0.2,
          response_format: { type: 'json_object' },
          messages,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      )

      const content = response.data.choices?.[0]?.message?.content
      if (!content) {
        return []
      }

      let parsed: any
      try {
        parsed = JSON.parse(content)
      } catch {
        return []
      }

      const issues: any[] = Array.isArray(parsed?.issues) ? parsed.issues : Array.isArray(parsed) ? parsed : []
      return issues
        .filter(issue => issue?.description)
        .map(issue => ({
          description: issue.description as string,
          severity: this.normalizedSeverity(issue.severity),
          suggestion: issue.suggestion,
        }))
    } catch (error: any) {
      console.warn('Vision validator error:', error.message)
      return []
    }
  }

  private normalizedSeverity(value?: string): 'high' | 'medium' | 'low' {
    if (!value) return 'medium'
    const severity = value.toLowerCase()
    if (severity.includes('high') || severity.includes('blocker')) return 'high'
    if (severity.includes('low')) return 'low'
    return 'medium'
  }
}


