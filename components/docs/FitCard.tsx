import type { ReactNode } from 'react'

export function FitCard({ 
  type = 'good', 
  children 
}: { 
  type?: 'good' | 'bad'
  children: ReactNode 
}) {
  return (
    <div className={`docs-fit-card docs-fit-card-${type}`}>
      <div className="docs-fit-card-header">
        {type === 'good' ? (
          <>
            <span className="docs-fit-card-icon">✅</span>
            <strong>Perfect for you if…</strong>
          </>
        ) : (
          <>
            <span className="docs-fit-card-icon">❌</span>
            <strong>Probably not for you if…</strong>
          </>
        )}
      </div>
      <div className="docs-fit-card-content">{children}</div>
    </div>
  )
}

