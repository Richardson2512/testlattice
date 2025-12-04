import { VisionContext, VisionElement, LLMAction } from '../types'

export interface TestPattern {
  name: string
  pattern: (context: VisionContext) => boolean
  generateTests: (context: VisionContext, elements: VisionElement[]) => LLMAction[]
}

export class TestingStrategyService {
  private patterns: TestPattern[] = []

  constructor() {
    this.initializePatterns()
  }

  private initializePatterns() {
    // Checkbox Pattern - Test check/uncheck functionality
    this.patterns.push({
      name: 'checkbox-testing',
      pattern: (context) => {
        return context.elements.some(e => e.type === 'input' && e.inputType === 'checkbox')
      },
      generateTests: (context, elements) => {
        const checkboxes = elements.filter(e => e.type === 'input' && e.inputType === 'checkbox')
        const actions: LLMAction[] = []
        
        // Test the first 3 checkboxes to avoid overwhelming the test
        checkboxes.slice(0, 3).forEach((checkbox, index) => {
          if (!checkbox.selector) return
          
          // Test checking the checkbox
          actions.push({
            action: 'check' as const,
            selector: checkbox.selector,
            description: `Check ${checkbox.name || checkbox.ariaLabel || 'checkbox ' + (index + 1)}`,
            confidence: 0.9
          })
          
          // Verify it's checked
          actions.push({
            action: 'assert' as const,
            selector: checkbox.selector,
            value: 'state:checked',
            description: `Verify ${checkbox.name || checkbox.ariaLabel || 'checkbox'} is checked`,
            confidence: 0.9
          })
          
          // Test unchecking the checkbox
          actions.push({
            action: 'uncheck' as const,
            selector: checkbox.selector,
            description: `Uncheck ${checkbox.name || checkbox.ariaLabel || 'checkbox ' + (index + 1)}`,
            confidence: 0.9
          })
          
          // Verify it's unchecked
          actions.push({
            action: 'assert' as const,
            selector: checkbox.selector,
            value: 'state:unchecked',
            description: `Verify ${checkbox.name || checkbox.ariaLabel || 'checkbox'} is unchecked`,
            confidence: 0.9
          })
        })
        
        return actions
      }
    })
    
    // Radio Button Pattern - Test radio button selection
    this.patterns.push({
      name: 'radio-button-testing',
      pattern: (context) => {
        return context.elements.some(e => e.type === 'input' && e.inputType === 'radio')
      },
      generateTests: (context, elements) => {
        const radioButtons = elements.filter(e => e.type === 'input' && e.inputType === 'radio')
        const actions: LLMAction[] = []
        
        // Group radio buttons by name (radio buttons in the same group have the same name)
        const radioGroups = new Map<string, VisionElement[]>()
        radioButtons.forEach(radio => {
          const groupName = radio.name || 'default-group'
          if (!radioGroups.has(groupName)) {
            radioGroups.set(groupName, [])
          }
          radioGroups.get(groupName)!.push(radio)
        })
        
        // Test the first radio group
        const firstGroup = Array.from(radioGroups.values())[0]
        if (firstGroup && firstGroup.length > 0) {
          // Test selecting each radio button in the group
          firstGroup.slice(0, 3).forEach((radio, index) => {
            if (!radio.selector) return
            
            actions.push({
              action: 'check' as const,
              selector: radio.selector,
              description: `Select ${radio.ariaLabel || radio.text || 'option ' + (index + 1)}`,
              confidence: 0.9
            })
            
            // Verify this radio is checked
            actions.push({
              action: 'assert' as const,
              selector: radio.selector,
              value: 'state:checked',
              description: `Verify ${radio.ariaLabel || radio.text || 'option'} is selected`,
              confidence: 0.9
            })
          })
        }
        
        return actions
      }
    })
    
    // Dropdown/Select Pattern - Test option selection
    this.patterns.push({
      name: 'dropdown-testing',
      pattern: (context) => {
        return context.elements.some(e => e.type === 'select')
      },
      generateTests: (context, elements) => {
        const dropdowns = elements.filter(e => e.type === 'select')
        const actions: LLMAction[] = []
        
        // Test the first 2 dropdowns
        dropdowns.slice(0, 2).forEach((dropdown, index) => {
          if (!dropdown.selector) return
          
          // Test selecting the second option (index 1)
          actions.push({
            action: 'select' as const,
            selector: dropdown.selector,
            value: '1', // Select by index
            description: `Select second option in ${dropdown.name || dropdown.ariaLabel || 'dropdown ' + (index + 1)}`,
            confidence: 0.8
          })
          
          // Wait for potential state changes
          actions.push({
            action: 'wait' as const,
            description: 'Wait for dropdown selection to process',
            confidence: 0.9
          })
          
          // Test selecting a different option
          actions.push({
            action: 'select' as const,
            selector: dropdown.selector,
            value: '0', // Select first option
            description: `Select first option in ${dropdown.name || dropdown.ariaLabel || 'dropdown'}`,
            confidence: 0.8
          })
        })
        
        return actions
      }
    })
    
    // Login Form Pattern
    this.patterns.push({
      name: 'login-form',
      pattern: (context) => {
        const hasUsername = context.elements.some(e => 
          e.type === 'input' && 
          (e.inputType === 'text' || e.inputType === 'email') &&
          (e.name?.toLowerCase().includes('user') || 
           e.name?.toLowerCase().includes('email') ||
           e.ariaLabel?.toLowerCase().includes('user') ||
           e.ariaLabel?.toLowerCase().includes('email'))
        )
        const hasPassword = context.elements.some(e => 
          e.type === 'input' && 
          e.inputType === 'password'
        )
        const hasSubmit = context.elements.some(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('login') ||
           e.text?.toLowerCase().includes('sign in') ||
           e.inputType === 'submit')
        )
        return hasUsername && hasPassword && hasSubmit
      },
      generateTests: (context, elements) => {
        const usernameField = elements.find(e => 
          e.type === 'input' && 
          (e.inputType === 'text' || e.inputType === 'email') &&
          (e.name?.toLowerCase().includes('user') || e.name?.toLowerCase().includes('email'))
        )
        const passwordField = elements.find(e => 
          e.type === 'input' && e.inputType === 'password'
        )
        const submitButton = elements.find(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('login') || e.text?.toLowerCase().includes('sign in'))
        )

        if (!usernameField || !passwordField || !submitButton) return []

        return [
          // Happy path
          {
            action: 'type' as const,
            selector: usernameField.selector,
            value: 'test@example.com',
            description: 'Enter valid email in username field',
            confidence: 0.9
          },
          {
            action: 'type' as const,
            selector: passwordField.selector,
            value: 'TestPassword123',
            description: 'Enter valid password',
            confidence: 0.9
          },
          {
            action: 'submit' as const,
            selector: submitButton.selector,
            description: 'Submit login form',
            confidence: 0.9
          },
          {
            action: 'assert' as const,
            selector: 'button:has-text("Logout"), button:has-text("Sign Out"), [data-testid*="user-menu"]',
            value: 'exists',
            description: 'Verify successful login (logout button or user menu appears)',
            confidence: 0.8
          },
          // Negative test - invalid credentials
          {
            action: 'type' as const,
            selector: usernameField.selector,
            value: 'invalid@example.com',
            description: 'Enter invalid email',
            confidence: 0.9
          },
          {
            action: 'type' as const,
            selector: passwordField.selector,
            value: 'WrongPassword',
            description: 'Enter wrong password',
            confidence: 0.9
          },
          {
            action: 'submit' as const,
            selector: submitButton.selector,
            description: 'Attempt login with invalid credentials',
            confidence: 0.9
          },
          {
            action: 'assert' as const,
            selector: submitButton.selector,
            value: 'error',
            description: 'Verify error message appears for invalid credentials',
            confidence: 0.8
          }
        ]
      }
    })

    // Search Form Pattern
    this.patterns.push({
      name: 'search-form',
      pattern: (context) => {
        return context.elements.some(e => 
          e.type === 'input' && 
          (e.inputType === 'text' || e.inputType === 'search') &&
          (e.name?.toLowerCase().includes('search') ||
           e.ariaLabel?.toLowerCase().includes('search') ||
           e.text?.toLowerCase().includes('search'))
        )
      },
      generateTests: (context, elements) => {
        const searchInput = elements.find(e => 
          e.type === 'input' && 
          (e.inputType === 'text' || e.inputType === 'search') &&
          (e.name?.toLowerCase().includes('search') || e.ariaLabel?.toLowerCase().includes('search'))
        )
        const searchButton = elements.find(e => 
          e.type === 'button' && 
          (e.text?.toLowerCase().includes('search') || e.ariaLabel?.toLowerCase().includes('search'))
        )

        if (!searchInput) return []

        return [
          // Happy path
          {
            action: 'type' as const,
            selector: searchInput.selector,
            value: 'product',
            description: 'Enter search query',
            confidence: 0.9
          },
          ...(searchButton ? [{
            action: 'click' as const,
            selector: searchButton.selector,
            description: 'Submit search',
            confidence: 0.9
          }] : []),
          {
            action: 'assert' as const,
            selector: 'body',
            value: 'text:results',
            description: 'Verify search results appear or "no results" message',
            confidence: 0.7
          },
          // Empty search test
          {
            action: 'type' as const,
            selector: searchInput.selector,
            value: '',
            description: 'Clear search field',
            confidence: 0.9
          },
          ...(searchButton ? [{
            action: 'click' as const,
            selector: searchButton.selector,
            description: 'Submit empty search',
            confidence: 0.9
          }] : [])
        ]
      }
    })

    // Generic Form Pattern (with required fields)
    this.patterns.push({
      name: 'generic-form',
      pattern: (context) => {
        const inputs = context.elements.filter(e => e.type === 'input' && e.inputType !== 'hidden')
        const submitButtons = context.elements.filter(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('submit') || e.inputType === 'submit')
        )
        return inputs.length >= 2 && submitButtons.length > 0
      },
      generateTests: (context, elements) => {
        const requiredInputs = elements.filter(e => 
          e.type === 'input' && 
          e.inputType !== 'hidden' &&
          e.isRequired // This will be set by enhanced element detection
        )
        const submitButton = elements.find(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('submit') || e.inputType === 'submit')
        )

        if (requiredInputs.length === 0 || !submitButton) return []

        const tests: LLMAction[] = []
        
        // Test required field validation
        tests.push({
          action: 'click' as const,
          selector: submitButton.selector,
          description: 'Attempt to submit form with required fields blank',
          confidence: 0.9
        })
        tests.push({
          action: 'assert' as const,
          selector: requiredInputs[0].selector,
          value: 'error',
          description: 'Verify error message for required field',
          confidence: 0.8
        })

        // Test invalid input based on type
        requiredInputs.forEach(input => {
          if (input.inputType === 'email') {
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'invalid-email',
              description: `Test invalid email format in ${input.name || 'email field'}`,
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify email validation error',
              confidence: 0.8
            })
          } else if (input.inputType === 'number') {
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'abc',
              description: `Test invalid number format in ${input.name || 'number field'}`,
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify number validation error',
              confidence: 0.8
            })
          }
        })

        return tests
      }
    })

    // Comprehensive Form Validation Pattern - Tests all validation types
    this.patterns.push({
      name: 'form-validation-comprehensive',
      pattern: (context) => {
        // Detect any form with validation attributes or validatable input types
        const hasValidatableInputs = context.elements.some(e => 
          e.type === 'input' && 
          (e.isRequired || e.minLength || e.maxLength || e.pattern || 
           e.inputType === 'email' || e.inputType === 'url' || e.inputType === 'tel' ||
           e.inputType === 'number' || e.inputType === 'date')
        )
        const hasSubmit = context.elements.some(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('submit') || e.inputType === 'submit')
        )
        return hasValidatableInputs && hasSubmit
      },
      generateTests: (context, elements) => {
        const tests: LLMAction[] = []
        const submitButton = elements.find(e => 
          (e.type === 'button' || e.type === 'input') &&
          (e.text?.toLowerCase().includes('submit') || e.inputType === 'submit')
        )
        
        if (!submitButton) return []
        
        // Test each validatable input
        elements.forEach(input => {
          if (input.type !== 'input' || input.inputType === 'hidden' || !input.selector) return
          
          // === EMAIL VALIDATION ===
          if (input.inputType === 'email') {
            // Test 1: No @ symbol
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'notanemail',
              description: 'Test email without @ symbol',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with invalid email format',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify email format validation error',
              confidence: 0.9
            })
            
            // Test 2: Missing domain
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'test@',
              description: 'Test email without domain',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with incomplete email',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify error for incomplete email',
              confidence: 0.9
            })
            
            // Test 3: Missing username
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '@example.com',
              description: 'Test email without username',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with missing username',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify error for email without username',
              confidence: 0.9
            })
          }
          
          // === PHONE VALIDATION ===
          if (input.inputType === 'tel' || input.name?.toLowerCase().includes('phone')) {
            // Test 1: Too short
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '123',
              description: 'Test phone number too short (only 3 digits)',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with invalid phone',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify phone validation error for short number',
              confidence: 0.9
            })
            
            // Test 2: Invalid characters
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'abc-def-ghij',
              description: 'Test phone with invalid characters',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with letters in phone',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of letters in phone number',
              confidence: 0.9
            })
          }
          
          // === URL VALIDATION ===
          if (input.inputType === 'url' || input.name?.toLowerCase().includes('url') || input.name?.toLowerCase().includes('website')) {
            // Test 1: Not a URL
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'notaurl',
              description: 'Test invalid URL format (no protocol)',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with invalid URL',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify URL validation error',
              confidence: 0.9
            })
            
            // Test 2: Invalid protocol
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'ht!tp://bad-url',
              description: 'Test URL with invalid protocol',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with malformed URL',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify error for malformed URL',
              confidence: 0.9
            })
          }
          
          // === NAME FIELD VALIDATION (Special Characters) ===
          if (input.name?.toLowerCase().includes('name') || input.name?.toLowerCase().includes('firstname') || input.name?.toLowerCase().includes('lastname')) {
            // Test 1: Special characters
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'John@Doe#123',
              description: 'Test special characters in name field',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with special characters in name',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of special characters in name',
              confidence: 0.7
            })
            
            // Test 2: Numbers in name
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: 'John123Doe456',
              description: 'Test numbers in name field',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with numbers in name',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of numbers in name',
              confidence: 0.7
            })
          }
          
          // === SECURITY VALIDATION (SQL Injection) ===
          if (input.inputType === 'text' || input.inputType === 'email') {
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '\'; DROP TABLE users--',
              description: 'Test SQL injection attempt',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with SQL injection payload',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify SQL injection is rejected or sanitized',
              confidence: 0.8
            })
          }
          
          // === SECURITY VALIDATION (XSS Attempts) ===
          if (input.inputType === 'text' || input.inputType === 'email') {
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '<script>alert(\'xss\')</script>',
              description: 'Test XSS attempt with script tag',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with XSS payload',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify XSS payload is rejected or sanitized',
              confidence: 0.8
            })
          }
          
          // === BOUNDARY TESTING - Minimum Length ===
          if (input.minLength && input.minLength > 0) {
            const shortValue = 'a'.repeat(Math.max(1, input.minLength - 1))
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: shortValue,
              description: `Test input below minimum length (${shortValue.length}/${input.minLength} chars)`,
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with value below minLength',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: `Verify error for input shorter than ${input.minLength} characters`,
              confidence: 0.9
            })
          }
          
          // === BOUNDARY TESTING - Maximum Length ===
          if (input.maxLength && input.maxLength > 0) {
            const longValue = 'a'.repeat(input.maxLength + 10)
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: longValue,
              description: `Test input exceeding maximum length (${longValue.length}/${input.maxLength} chars)`,
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with value exceeding maxLength',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: `Verify error for input longer than ${input.maxLength} characters`,
              confidence: 0.8
            })
          }
          
          // === BOUNDARY TESTING - Numeric Ranges ===
          if (input.inputType === 'number') {
            // Test negative number (for age, quantity, etc.)
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '-5',
              description: 'Test negative number (likely invalid for age/quantity fields)',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with negative number',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of negative number',
              confidence: 0.8
            })
            
            // Test unreasonably large number
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '99999',
              description: 'Test unreasonably large number (age: 99999)',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with out-of-range number',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of out-of-range number',
              confidence: 0.7
            })
            
            // Test zero (sometimes invalid)
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '0',
              description: 'Test zero value (may be invalid for some fields)',
              confidence: 0.8
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with zero',
              confidence: 0.9
            })
          }
          
          // === BOUNDARY TESTING - Date Validation ===
          if (input.inputType === 'date') {
            // Test future date (invalid for birthdate)
            const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            const futureDateStr = futureDate.toISOString().split('T')[0]
            
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: futureDateStr,
              description: 'Test future date (likely invalid for birthdate field)',
              confidence: 0.9
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with future date',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of future date for birthdate',
              confidence: 0.8
            })
            
            // Test very old date (unreasonable birthdate)
            tests.push({
              action: 'type' as const,
              selector: input.selector,
              value: '1850-01-01',
              description: 'Test unreasonably old date',
              confidence: 0.8
            })
            tests.push({
              action: 'submit' as const,
              selector: submitButton.selector,
              description: 'Submit with unreasonable date',
              confidence: 0.9
            })
            tests.push({
              action: 'assert' as const,
              selector: input.selector,
              value: 'error',
              description: 'Verify rejection of unreasonable date',
              confidence: 0.7
            })
          }
        })
        
        // === SUCCESS PATH - Fill all fields with valid data ===
        const requiredInputs = elements.filter(e => 
          e.type === 'input' && 
          e.inputType !== 'hidden' && 
          e.isRequired &&
          e.selector
        )
        
        requiredInputs.forEach(input => {
          let validValue = 'Valid Input'
          
          // Generate appropriate valid value based on input type
          if (input.inputType === 'email') {
            validValue = 'valid.user@example.com'
          } else if (input.inputType === 'password') {
            validValue = 'ValidPass123!'
          } else if (input.inputType === 'tel') {
            validValue = '+1-555-123-4567'
          } else if (input.inputType === 'url') {
            validValue = 'https://www.example.com'
          } else if (input.inputType === 'number') {
            validValue = '25'
          } else if (input.inputType === 'date') {
            validValue = '1990-06-15'
          } else if (input.name?.toLowerCase().includes('name')) {
            validValue = 'John Doe'
          } else if (input.name?.toLowerCase().includes('age')) {
            validValue = '30'
          } else if (input.minLength) {
            validValue = 'a'.repeat(input.minLength + 1)
          }
          
          tests.push({
            action: 'type' as const,
            selector: input.selector,
            value: validValue,
            description: `Fill ${input.name || input.inputType || 'field'} with valid data`,
            confidence: 0.9
          })
        })
        
        // Submit form with valid data
        tests.push({
          action: 'submit' as const,
          selector: submitButton.selector,
          description: 'Submit form with all valid data (success path)',
          confidence: 0.9
        })
        
        // Wait for submission to process
        tests.push({
          action: 'wait' as const,
          description: 'Wait for form submission to complete',
          confidence: 0.9
        })
        
        // Verify success message appears
        tests.push({
          action: 'assert' as const,
          selector: '.success, .alert-success, [role="status"], .notification, .message, .toast',
          value: 'text:success',
          description: 'Verify success message appears after valid submission',
          confidence: 0.8
        })
        
        // Check if form cleared (inputs should be empty)
        if (requiredInputs.length > 0 && requiredInputs[0].selector) {
          tests.push({
            action: 'assert' as const,
            selector: requiredInputs[0].selector,
            value: 'value:',
            description: 'Verify form clears after successful submission',
            confidence: 0.6
          })
        }
        
        return tests
      }
    })
  }

  /**
   * Detect test patterns in the current context
   */
  detectPatterns(context: VisionContext): TestPattern[] {
    return this.patterns.filter(pattern => pattern.pattern(context))
  }

  /**
   * Generate test actions for detected patterns
   */
  generateTestActions(context: VisionContext): LLMAction[] {
    const detectedPatterns = this.detectPatterns(context)
    const allActions: LLMAction[] = []

    for (const pattern of detectedPatterns) {
      const actions = pattern.generateTests(context, context.elements)
      allActions.push(...actions)
    }

    return allActions
  }

  /**
   * Get testing recommendations based on detected elements
   */
  getRecommendations(context: VisionContext): string[] {
    const recommendations: string[] = []
    const detectedPatterns = this.detectPatterns(context)

    if (detectedPatterns.some(p => p.name === 'login-form')) {
      recommendations.push('Login form detected - test valid/invalid credentials, error handling')
    }
    if (detectedPatterns.some(p => p.name === 'search-form')) {
      recommendations.push('Search form detected - test query submission, empty search, no results state')
    }
    if (detectedPatterns.some(p => p.name === 'generic-form')) {
      recommendations.push('Form detected - test required fields, validation, happy path')
    }

    const hasCheckboxes = context.elements.some(e => e.type === 'input' && e.inputType === 'checkbox')
    if (hasCheckboxes) {
      recommendations.push('Checkboxes detected - use "check" and "uncheck" actions to test state changes')
      recommendations.push('Test checkbox behavior: check → verify state:checked, uncheck → verify state:unchecked')
    }

    const hasDropdowns = context.elements.some(e => e.type === 'select')
    if (hasDropdowns) {
      recommendations.push('Dropdowns detected - use "select" action with option values or labels')
      recommendations.push('Test dropdown behavior: select option → verify selected:option-value')
    }
    
    const hasRadioButtons = context.elements.some(e => e.type === 'input' && e.inputType === 'radio')
    if (hasRadioButtons) {
      recommendations.push('Radio buttons detected - use "check" action to select options')
      recommendations.push('Test radio button behavior: check one option → verify only that option is selected')
    }

    return recommendations
  }
}

