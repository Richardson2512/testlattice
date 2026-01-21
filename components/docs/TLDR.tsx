import type { ReactNode } from 'react'

export function TLDR({ children }: { children: ReactNode }) {
  return (
    <div className="docs-tldr">
      <div className="docs-tldr-header">
        <span className="docs-tldr-icon">💡</span>
        <strong>TL;DR</strong>
      </div>
      <div className="docs-tldr-content">{children}</div>
    </div>
  )
}

