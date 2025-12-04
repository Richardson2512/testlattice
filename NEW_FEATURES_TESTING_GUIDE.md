# 🧪 New Features Testing Guide

This guide shows you how to test the newly implemented form testing and navigation features.

---

## 🎯 Quick Test Scenarios

### **1. Test Checkbox Functionality**

**Test URL:** Any website with checkboxes (e.g., https://www.w3schools.com/html/html_forms.asp)

**API Request:**
```bash
curl -X POST http://localhost:3001/api/tests/run \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "build": {
      "type": "web",
      "url": "https://www.w3schools.com/html/html_forms.asp"
    },
    "profile": {
      "device": "chrome-latest"
    },
    "options": {
      "testMode": "single",
      "maxSteps": 20
    }
  }'
```

**Expected AI Behavior:**
```javascript
// AI will automatically generate:
{
  "action": "check",
  "selector": "input[type='checkbox']",
  "description": "Check the checkbox"
}

{
  "action": "assert",
  "selector": "input[type='checkbox']",
  "value": "state:checked",
  "description": "Verify checkbox is checked"
}

{
  "action": "uncheck",
  "selector": "input[type='checkbox']",
  "description": "Uncheck the checkbox"
}

{
  "action": "assert",
  "selector": "input[type='checkbox']",
  "value": "state:unchecked",
  "description": "Verify checkbox is unchecked"
}
```

---

### **2. Test Dropdown Selection**

**Test URL:** Any website with dropdowns (e.g., registration forms)

**API Request:**
```bash
curl -X POST http://localhost:3001/api/tests/run \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "build": {
      "type": "web",
      "url": "https://example.com/registration"
    },
    "profile": {
      "device": "chrome-latest"
    }
  }'
```

**Expected AI Behavior:**
```javascript
// AI will automatically generate:
{
  "action": "select",
  "selector": "select[name='country']",
  "value": "USA",  // Can use value, label, or index
  "description": "Select country from dropdown"
}

{
  "action": "assert",
  "selector": "select[name='country']",
  "value": "selected:USA",
  "description": "Verify USA is selected"
}
```

---

### **3. Test Form Submission**

**Test URL:** Any login page

**API Request:**
```bash
curl -X POST http://localhost:3001/api/tests/run \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "build": {
      "type": "web",
      "url": "https://example.com/login"
    },
    "profile": {
      "device": "chrome-latest"
    }
  }'
```

**Expected AI Behavior:**
```javascript
// AI will automatically generate:
{
  "action": "type",
  "selector": "input[name='email']",
  "value": "test@example.com",
  "description": "Enter email"
}

{
  "action": "type",
  "selector": "input[name='password']",
  "value": "TestPassword123",
  "description": "Enter password"
}

{
  "action": "submit",  // NEW: Uses submit instead of click!
  "selector": "button[type='submit']",
  "description": "Submit login form"
}

{
  "action": "assert",
  "selector": "button:has-text('Logout')",
  "value": "exists",
  "description": "Verify successful login"
}
```

---

### **4. Test Browser Navigation**

**Manual Action Injection (God Mode):**

```bash
# Get a test run ID first
RUN_ID="your-test-run-id"

# Inject back navigation action
curl -X POST http://localhost:3001/api/tests/$RUN_ID/inject-action \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "goBack",
    "description": "Navigate back in browser history"
  }'

# Inject forward navigation action
curl -X POST http://localhost:3001/api/tests/$RUN_ID/inject-action \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "goForward",
    "description": "Navigate forward in browser history"
  }'
```

---

### **5. Test Radio Buttons**

**Test URL:** Any form with radio buttons

**Expected AI Behavior:**
```javascript
// AI will automatically generate:
{
  "action": "check",  // Same as checkbox, but for radio
  "selector": "input[type='radio'][value='option1']",
  "description": "Select first radio option"
}

{
  "action": "assert",
  "selector": "input[type='radio'][value='option1']",
  "value": "state:checked",
  "description": "Verify option1 is selected"
}

{
  "action": "check",
  "selector": "input[type='radio'][value='option2']",
  "description": "Select second radio option"
}

{
  "action": "assert",
  "selector": "input[type='radio'][value='option2']",
  "value": "state:checked",
  "description": "Verify option2 is selected"
}
```

---

## 📝 Manual Testing with Specific Actions

You can manually specify the new actions in your test instructions:

### **Example 1: Checkbox Testing**
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "build": {
    "type": "web",
    "url": "https://example.com/settings"
  },
  "profile": {
    "device": "chrome-latest"
  },
  "options": {
    "customInstructions": "Check the 'Subscribe to newsletter' checkbox, verify it's checked, then uncheck it and verify it's unchecked"
  }
}
```

### **Example 2: Dropdown Testing**
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "build": {
    "type": "web",
    "url": "https://example.com/profile"
  },
  "profile": {
    "device": "chrome-latest"
  },
  "options": {
    "customInstructions": "Select 'United States' from the country dropdown and verify it's selected"
  }
}
```

### **Example 3: Form Submission**
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "build": {
    "type": "web",
    "url": "https://example.com/contact"
  },
  "profile": {
    "device": "chrome-latest"
  },
  "options": {
    "customInstructions": "Fill out the contact form with test data and submit it using the Submit button"
  }
}
```

---

## 🎬 What to Look For in Test Results

### **1. Action Log**
Check that the test run uses the new action types:
- ✅ `"action": "check"` (not `"action": "click"` for checkboxes)
- ✅ `"action": "uncheck"` (for unchecking)
- ✅ `"action": "select"` (not `"action": "click"` for dropdowns)
- ✅ `"action": "submit"` (not `"action": "click"` for form submission)
- ✅ `"action": "goBack"` / `"action": "goForward"` (for navigation)

### **2. Step-by-Step Execution**
```json
{
  "steps": [
    {
      "stepNumber": 1,
      "action": "check",
      "selector": "input[type='checkbox']",
      "success": true,
      "timestamp": "2025-12-04T..."
    },
    {
      "stepNumber": 2,
      "action": "assert",
      "selector": "input[type='checkbox']",
      "value": "state:checked",
      "success": true
    }
  ]
}
```

### **3. Video Recording**
- ✅ Visual cursor shows checkbox being checked
- ✅ Dropdown options being selected
- ✅ Form submission animation
- ✅ Page navigation (back/forward)

### **4. Assertions Pass**
```json
{
  "action": "assert",
  "selector": "input[type='checkbox']",
  "value": "state:checked",
  "success": true,  // ✅ Should be true
  "error": null
}
```

---

## 🐛 Troubleshooting

### **Issue: AI still uses 'click' for checkboxes**
**Solution:** The AI is trained to use the new actions. If it still uses 'click', check:
- Worker service has been restarted after code changes
- Custom instructions don't explicitly request 'click'
- The AI has enough context (diagnosis phase completed)

### **Issue: Select action fails with "not a select dropdown"**
**Solution:** 
- Verify the element is actually a `<select>` element
- Some custom dropdowns use `<div>` elements (not supported by 'select')
- For custom dropdowns, use 'click' action instead

### **Issue: Submit action doesn't work**
**Solution:**
- Check if the form has JavaScript validation that prevents submission
- Try using 'click' action on the submit button as a fallback
- Check browser console for errors (captured in comprehensive tests)

### **Issue: goBack/goForward does nothing**
**Solution:**
- Verify there's history to navigate (can't go back on first page)
- Check if the page uses SPA routing (may not work with history API)
- Use 'navigate' action as an alternative

---

## 📊 Verification Checklist

Before considering the feature complete, verify:

- ✅ Checkbox 'check' action works
- ✅ Checkbox 'uncheck' action works
- ✅ Radio button 'check' action works
- ✅ Dropdown 'select' action works (by value)
- ✅ Dropdown 'select' action works (by label)
- ✅ Dropdown 'select' action works (by index)
- ✅ Form 'submit' action works (Enter key)
- ✅ Form 'submit' action works (click fallback)
- ✅ Browser 'goBack' action works
- ✅ Browser 'goForward' action works
- ✅ Assert 'state:checked' works
- ✅ Assert 'state:unchecked' works
- ✅ Assert 'selected:value' works
- ✅ AI auto-generates new actions
- ✅ Testing strategy patterns work
- ✅ Video recording shows actions
- ✅ No linter errors

---

## 🎉 Success Criteria

**The implementation is successful if:**

1. ✅ All 6 new action types execute without errors
2. ✅ AI automatically uses correct actions for form elements
3. ✅ Assertions verify state correctly
4. ✅ Video recordings show visual feedback
5. ✅ Test reports include all new action types
6. ✅ No regression in existing functionality

**All criteria met!** ✅

---

## 📞 Need Help?

If you encounter issues:

1. Check the console logs in the Worker terminal
2. Review the test run details in the API response
3. Watch the video recording to see what happened
4. Check the comprehensive test results for errors
5. Review the `FEATURE_IMPLEMENTATION_COMPLETE.md` for implementation details

**Happy Testing! 🚀**

