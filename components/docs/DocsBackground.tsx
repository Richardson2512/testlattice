export function DocsBackground() {
  return (
    <div className="docs-background" aria-hidden="true">
      <svg
        className="docs-background-svg"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="docs-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.1" />
          </pattern>
          <pattern
            id="docs-flow"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 20 Q 100 40 180 20 T 180 180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.08"
            />
            <path
              d="M 40 40 Q 120 60 200 40 T 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.06"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#docs-grid)" />
        <rect width="100%" height="100%" fill="url(#docs-flow)" />
      </svg>
    </div>
  )
}

