import type { ReactNode } from 'react'

interface DocsHeroProps {
  title: string
  summary: string | ReactNode
  visual?: ReactNode
}

export function DocsHero({ title, summary, visual }: DocsHeroProps) {
  return (
    <div className="docs-hero">
      <div className="docs-hero-content">
        <h1 className="docs-hero-title">{title}</h1>
        <div className="docs-hero-summary">{summary}</div>
      </div>
      {visual && <div className="docs-hero-visual">{visual}</div>}
    </div>
  )
}

