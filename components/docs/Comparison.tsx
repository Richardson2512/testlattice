import type { ReactNode } from 'react'

export function Comparison({ 
  firstColumn = 'Aspect',
  columns,
  children 
}: { 
  firstColumn?: string
  columns: string[]
  children: ReactNode 
}) {
  return (
    <div className="docs-comparison">
      <table className="docs-comparison-table">
        <thead>
          <tr>
            <th>{firstColumn}</th>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function ComparisonRow({ cells }: { cells: (string | ReactNode)[] }) {
  return (
    <tr>
      {cells.map((cell, i) => (
        <td key={i}>{cell}</td>
      ))}
    </tr>
  )
}

