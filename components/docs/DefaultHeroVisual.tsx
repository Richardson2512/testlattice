export function DefaultHeroVisual() {
  return (
    <div className="docs-hero-visual-default">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Abstract nodes/network representing exploration */}
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.2" />
        <circle cx="150" cy="80" r="8" fill="currentColor" opacity="0.2" />
        <circle cx="100" cy="150" r="8" fill="currentColor" opacity="0.2" />
        <circle cx="70" cy="130" r="6" fill="currentColor" opacity="0.15" />
        <circle cx="130" cy="40" r="6" fill="currentColor" opacity="0.15" />
        
        {/* Connection lines suggesting flow */}
        <line
          x1="50"
          y1="50"
          x2="130"
          y2="40"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
        <line
          x1="130"
          y1="40"
          x2="150"
          y2="80"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
        <line
          x1="150"
          y1="80"
          x2="100"
          y2="150"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
        <line
          x1="50"
          y1="50"
          x2="70"
          y2="130"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
        <line
          x1="70"
          y1="130"
          x2="100"
          y2="150"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
      </svg>
    </div>
  )
}

