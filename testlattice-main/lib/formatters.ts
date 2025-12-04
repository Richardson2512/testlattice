// Utility functions for formatting test data

export function formatActionType(action: string): { label: string; icon: string; color: string } {
  const actionMap: Record<string, { label: string; icon: string; color: string }> = {
    // Existing actions
    'click': { label: 'Click', icon: '👆', color: '#0075FF' },
    'type': { label: 'Type', icon: '⌨️', color: '#10B981' },
    'scroll': { label: 'Scroll', icon: '📜', color: '#718096' },
    'navigate': { label: 'Navigate', icon: '🧭', color: '#8B5CF6' },
    'wait': { label: 'Wait', icon: '⏱️', color: '#F6AD55' },
    'assert': { label: 'Assert', icon: '✓', color: '#14B8A6' },
    'complete': { label: 'Complete', icon: '🎉', color: '#10B981' },
    
    // NEW: Form actions
    'check': { label: 'Check', icon: '☑️', color: '#10B981' },
    'uncheck': { label: 'Uncheck', icon: '☐', color: '#718096' },
    'select': { label: 'Select', icon: '📋', color: '#0075FF' },
    'submit': { label: 'Submit', icon: '📤', color: '#8B5CF6' },
    
    // NEW: Navigation actions
    'goBack': { label: 'Back', icon: '⬅️', color: '#F97316' },
    'goForward': { label: 'Forward', icon: '➡️', color: '#F97316' },
  }
  
  return actionMap[action] || { label: action, icon: '❓', color: '#718096' }
}

export function getDeviceInfo(device: string): {
  name: string
  icon: string
  viewport: string
  description: string
  priority: number
} {
  const deviceMap: Record<string, any> = {
    'chrome-latest': {
      name: 'Chrome Desktop',
      icon: '🌐',
      viewport: '1920×1080',
      description: '90% of users',
      priority: 1
    },
    'firefox-latest': {
      name: 'Firefox Desktop',
      icon: '🦊',
      viewport: '1920×1080',
      description: 'Form handling differences',
      priority: 3
    },
    'safari-latest': {
      name: 'Safari Desktop',
      icon: '🧭',
      viewport: '1440×900',
      description: 'CSS differences from Chrome',
      priority: 2
    },
    // NEW: Mobile devices
    'mobile-chrome': {
      name: 'Mobile Chrome',
      icon: '📱',
      viewport: '390×844',
      description: '60% of mobile traffic',
      priority: 2
    },
    'mobile-safari': {
      name: 'Mobile Safari',
      icon: '📱',
      viewport: '390×844',
      description: 'iOS-specific quirks',
      priority: 2
    },
    'mobile-chrome-android': {
      name: 'Mobile Chrome (Android)',
      icon: '🤖',
      viewport: '360×640',
      description: 'Android viewport',
      priority: 3
    },
  }
  
  return deviceMap[device] || {
    name: device,
    icon: '❓',
    viewport: 'Unknown',
    description: '',
    priority: 99
  }
}

export function getBrowserName(browser: string): string {
  switch (browser) {
    case 'chromium': return 'Chrome'
    case 'firefox': return 'Firefox'
    case 'webkit': return 'Safari'
    default: return browser
  }
}

export function getBrowserIcon(browser: string): string {
  switch (browser) {
    case 'chromium': return '🌐'
    case 'firefox': return '🦊'
    case 'webkit': return '🧭'
    default: return '🌐'
  }
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}m ${seconds}s`
}

export function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    return date.toLocaleString()
  } catch {
    return timestamp
  }
}

