import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'error'

export function Callout({ 
  type = 'info', 
  title,
  children 
}: { 
  type?: CalloutType
  title?: string
  children: ReactNode 
}) {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  }

  return (
    <div className={`docs-callout docs-callout-${type}`}>
      <div className="docs-callout-header">
        <span className="docs-callout-icon">{icons[type]}</span>
        {title && <strong>{title}</strong>}
      </div>
      <div className="docs-callout-content">{children}</div>
    </div>
  )
}

