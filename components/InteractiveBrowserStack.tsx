'use client'

const BROWSERS = [
    { id: 'chrome', name: 'Chrome', icon: '/browsers/chrome.svg' },
    { id: 'firefox', name: 'Firefox', icon: '/browsers/firefox.svg' },
    { id: 'safari', name: 'Safari', icon: '/browsers/safari.svg' },
    { id: 'edge', name: 'Edge', icon: '/browsers/edge.svg' }
]

export function InteractiveBrowserStack() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0' // Reduced padding
        }}>
            {BROWSERS.map((browser) => (
                <div
                    key={browser.id}
                    className="browser-box"
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        padding: '1.5rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        border: '1px solid var(--border-light)',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                    }}>
                        <img
                            src={browser.icon}
                            alt={`${browser.name} Logo`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div style={{
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        fontSize: '1rem'
                    }}>
                        {browser.name}
                    </div>

                    <style jsx>{`
                        .browser-box:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
                            border-color: var(--primary);
                        }
                    `}</style>
                </div>
            ))}
        </div>
    )
}
