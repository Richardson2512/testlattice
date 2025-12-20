'use client'

// Browser logos as inline SVGs
const ChromeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#4285F4" />
    <path d="M24 12c6.627 0 12 5.373 12 12H24V12z" fill="#EA4335" />
    <path d="M12 24c0-6.627 5.373-12 12-12l-6 10.392L12 24z" fill="#FBBC05" />
    <path d="M24 36c-6.627 0-12-5.373-12-12l6 10.392L24 36z" fill="#34A853" />
    <circle cx="24" cy="24" r="8" fill="white" />
    <circle cx="24" cy="24" r="6" fill="#4285F4" />
  </svg>
)

const SafariIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="url(#safariGradient2)" />
    <defs>
      <linearGradient id="safariGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#19D7FF" />
        <stop offset="100%" stopColor="#1E90FF" />
      </linearGradient>
    </defs>
    <polygon points="24,8 26,22 40,24 26,26 24,40 22,26 8,24 22,22" fill="white" />
    <polygon points="24,12 25,23 24,24" fill="#EA4335" />
    <polygon points="24,36 23,25 24,24" fill="#EA4335" />
  </svg>
)

const FirefoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="url(#firefoxGradient2)" />
    <defs>
      <linearGradient id="firefoxGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9500" />
        <stop offset="50%" stopColor="#FF5E00" />
        <stop offset="100%" stopColor="#E52E71" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="10" fill="#0060DF" />
    <path d="M14 18c4-6 16-6 20 0-2-8-18-8-20 0z" fill="#FF9500" />
  </svg>
)

interface BrowserMatrixSelectorProps {
  value: Array<'chromium' | 'firefox' | 'webkit'>
  onChange: (browsers: Array<'chromium' | 'firefox' | 'webkit'>) => void
}

const BROWSERS = [
  {
    id: 'chromium' as const,
    name: 'Chrome',
    icon: <ChromeIcon />,
    description: 'Chromium engine',
  },
  {
    id: 'webkit' as const,
    name: 'Safari',
    icon: <SafariIcon />,
    description: 'WebKit engine',
  },
  {
    id: 'firefox' as const,
    name: 'Firefox',
    icon: <FirefoxIcon />,
    description: 'Gecko engine',
  },
]

export function BrowserMatrixSelector({ value, onChange }: BrowserMatrixSelectorProps) {
  const toggleBrowser = (browserId: 'chromium' | 'firefox' | 'webkit') => {
    if (value.includes(browserId)) {
      onChange(value.filter(b => b !== browserId))
    } else {
      onChange([...value, browserId])
    }
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }

  const labelRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  }

  const badgeStyle: React.CSSProperties = {
    fontSize: '0.6rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--primary), var(--maroon-700))',
    color: 'white',
    padding: '2px 6px',
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  }

  const helpTextStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    margin: 0,
  }

  const optionsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
  }

  const getOptionStyle = (isSelected: boolean): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.65rem 0.75rem',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-light)'}`,
    background: isSelected ? 'rgba(92, 15, 15, 0.06)' : 'var(--bg-primary)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  })

  const checkboxStyle = (isSelected: boolean): React.CSSProperties => ({
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-medium)'}`,
    background: isSelected ? 'var(--primary)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s ease',
  })

  const iconStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const nameStyle = (isSelected: boolean): React.CSSProperties => ({
    fontSize: '0.8rem',
    fontWeight: isSelected ? 600 : 500,
    color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
  })

  const infoTextStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    margin: 0,
    padding: '0.5rem 0.75rem',
    background: 'var(--beige-50)',
    borderRadius: 'var(--radius-sm)',
  }

  return (
    <div style={containerStyle}>
      <div>
        <div style={labelRowStyle}>
          <span style={labelStyle}>Cross-Browser Testing</span>
          <span style={badgeStyle}>Optional</span>
        </div>
        <p style={helpTextStyle}>Run tests across multiple browsers (sequential)</p>
      </div>

      <div style={optionsRowStyle}>
        {BROWSERS.map((browser) => {
          const isSelected = value.includes(browser.id)
          return (
            <button
              key={browser.id}
              type="button"
              style={getOptionStyle(isSelected)}
              onClick={() => toggleBrowser(browser.id)}
            >
              <div style={checkboxStyle(isSelected)}>
                {isSelected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={iconStyle}>{browser.icon}</span>
              <span style={nameStyle(isSelected)}>{browser.name}</span>
            </button>
          )
        })}
      </div>

      {value.length > 0 ? (
        <p style={infoTextStyle}>
          <strong>Selected:</strong> {value.map(b => BROWSERS.find(br => br.id === b)?.name).join(', ')}
          {' '}• Est. time: {value.length}× base
        </p>
      ) : (
        <p style={infoTextStyle}>
          No extra browsers selected. Test runs on primary device only.
        </p>
      )}
    </div>
  )
}
