'use client'

import { DeviceProfile } from '@/lib/api'

// Browser logos as inline SVGs
const ChromeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#4285F4" />
    <path d="M24 12c6.627 0 12 5.373 12 12H24V12z" fill="#EA4335" />
    <path d="M12 24c0-6.627 5.373-12 12-12l-6 10.392L12 24z" fill="#FBBC05" />
    <path d="M24 36c-6.627 0-12-5.373-12-12l6 10.392L24 36z" fill="#34A853" />
    <circle cx="24" cy="24" r="8" fill="white" />
    <circle cx="24" cy="24" r="6" fill="#4285F4" />
  </svg>
)

const SafariIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="url(#safariGradient)" />
    <defs>
      <linearGradient id="safariGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="url(#firefoxGradient)" />
    <defs>
      <linearGradient id="firefoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9500" />
        <stop offset="50%" stopColor="#FF5E00" />
        <stop offset="100%" stopColor="#E52E71" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="10" fill="#0060DF" />
    <path d="M14 18c4-6 16-6 20 0-2-8-18-8-20 0z" fill="#FF9500" />
  </svg>
)

const MobileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
)

const AndroidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="20" width="32" height="20" rx="2" fill="#3DDC84" />
    <rect x="12" y="24" width="6" height="12" rx="1" fill="white" />
    <rect x="30" y="24" width="6" height="12" rx="1" fill="white" />
    <circle cx="17" cy="12" r="2" fill="#3DDC84" />
    <circle cx="31" cy="12" r="2" fill="#3DDC84" />
    <path d="M14 18h20" stroke="#3DDC84" strokeWidth="2" />
  </svg>
)

interface DeviceOption {
  value: DeviceProfile
  label: string
  description: string
  viewport: string
  icon: React.ReactNode
  priority: 1 | 2 | 3
}

const DEVICE_OPTIONS: DeviceOption[] = [
  // Desktop Browsers
  {
    value: DeviceProfile.CHROME_LATEST,
    label: 'Chrome',
    description: '90% of users',
    viewport: '1920×1080',
    icon: <ChromeIcon />,
    priority: 1
  },
  {
    value: DeviceProfile.SAFARI_LATEST,
    label: 'Safari',
    description: 'CSS differences',
    viewport: '1440×900',
    icon: <SafariIcon />,
    priority: 2
  },
  {
    value: DeviceProfile.FIREFOX_LATEST,
    label: 'Firefox',
    description: 'Form handling',
    viewport: '1920×1080',
    icon: <FirefoxIcon />,
    priority: 3
  },

  // Mobile Browsers
  {
    value: DeviceProfile.MOBILE_CHROME,
    label: 'Mobile Chrome',
    description: 'iPhone 12',
    viewport: '390×844',
    icon: <MobileIcon />,
    priority: 2
  },
  {
    value: DeviceProfile.MOBILE_SAFARI,
    label: 'Mobile Safari',
    description: 'iOS quirks',
    viewport: '390×844',
    icon: <MobileIcon />,
    priority: 2
  },
  {
    value: DeviceProfile.MOBILE_CHROME_ANDROID,
    label: 'Android Chrome',
    description: 'Android',
    viewport: '360×640',
    icon: <AndroidIcon />,
    priority: 3
  },
]

interface DeviceProfileSelectorProps {
  value: DeviceProfile
  onChange: (device: DeviceProfile) => void
}

export function DeviceProfileSelector({ value, onChange }: DeviceProfileSelectorProps) {
  const desktopDevices = DEVICE_OPTIONS.filter(opt =>
    !opt.value.includes('mobile') && !opt.value.includes('android') && !opt.value.includes('ios')
  )
  const mobileDevices = DEVICE_OPTIONS.filter(opt =>
    opt.value.includes('mobile') || opt.value.includes('android') || opt.value.includes('ios')
  )

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    display: 'block',
  }

  const groupTitleStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
  }

  const getOptionStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.75rem 0.5rem',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-light)'}`,
    background: isSelected ? 'rgba(92, 15, 15, 0.06)' : 'var(--bg-primary)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'center',
  })

  const iconStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const optionLabelStyle = (isSelected: boolean): React.CSSProperties => ({
    fontSize: '0.75rem',
    fontWeight: isSelected ? 600 : 500,
    color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
  })

  const viewportStyle: React.CSSProperties = {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
  }

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>Device Profile</label>

      {/* Desktop Browsers */}
      <div>
        <p style={groupTitleStyle}>Desktop Browsers</p>
        <div style={gridStyle}>
          {desktopDevices
            .sort((a, b) => a.priority - b.priority)
            .map((option) => {
              const isSelected = value === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  style={getOptionStyle(isSelected)}
                  onClick={() => onChange(option.value)}
                >
                  <span style={iconStyle}>{option.icon}</span>
                  <span style={optionLabelStyle(isSelected)}>{option.label}</span>
                  <span style={viewportStyle}>{option.viewport}</span>
                </button>
              )
            })}
        </div>
      </div>

      {/* Mobile Browsers */}
      <div>
        <p style={groupTitleStyle}>Mobile Browsers</p>
        <div style={gridStyle}>
          {mobileDevices
            .sort((a, b) => a.priority - b.priority)
            .map((option) => {
              const isSelected = value === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  style={getOptionStyle(isSelected)}
                  onClick={() => onChange(option.value)}
                >
                  <span style={iconStyle}>{option.icon}</span>
                  <span style={optionLabelStyle(isSelected)}>{option.label}</span>
                  <span style={viewportStyle}>{option.viewport}</span>
                </button>
              )
            })}
        </div>
      </div>
    </div>
  )
}
