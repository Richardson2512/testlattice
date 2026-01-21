import type { ReactNode } from 'react'

export function Insight({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className="docs-insight">
      <div className="docs-insight-icon">🧠</div>
      <div className="docs-insight-content">{children}</div>
    </div>
  )
}

