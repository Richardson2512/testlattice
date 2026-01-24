'use client'

import { useState } from 'react'

const Logos = {
    // Chrome: Use fetched SVG, cleaned up slightly
    Chrome: (
        <svg viewBox="0 0 256 256" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="chrome-a" x1="145" x2="34" y1="253" y2="61" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1e8e3e" /><stop offset="1" stopColor="#34a853" /></linearGradient>
                <linearGradient id="chrome-b" x1="111" x2="222" y1="254" y2="62" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fcc934" /><stop offset="1" stopColor="#fbbc04" /></linearGradient>
                <linearGradient id="chrome-c" x1="17" x2="239" y1="80" y2="80" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d93025" /><stop offset="1" stopColor="#ea4335" /></linearGradient>
            </defs>
            <circle cx="128" cy="128" r="64" fill="#fff" />
            <path fill="url(#chrome-a)" d="M96 183.4A63.7 63.7 0 0 1 72.6 160L17.2 64A128 128 0 0 0 128 256l55.4-96A64 64 0 0 1 96 183.4Z" />
            <path fill="url(#chrome-b)" d="M192 128a63.7 63.7 0 0 1-8.6 32L128 256A128 128 0 0 0 238.9 64h-111a64 64 0 0 1 64 64Z" />
            <circle cx="128" cy="128" r="52" fill="#1a73e8" />
            <path fill="url(#chrome-c)" d="M96 72.6a63.7 63.7 0 0 1 32-8.6h110.8a128 128 0 0 0-221.7 0l55.5 96A64 64 0 0 1 96 72.6Z" />
        </svg>
    ),
    // Firefox: Simplified/Cleaned version or use the complex one carefully. The complex one is huge.
    // I will use a slightly simplified standard Firefox logo SVG for code clarity, or the one I fetched if it fits.
    // The fetched one is VERY large (lines of gradients). I'll use a cleaner standard version often used in web dev.
    Firefox: (
        <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#e66000" d="M11.96 17.5a2.53 2.53 0 0 1-1.3-.29 6.22 6.22 0 0 1-2.9-4.8 19.33 19.33 0 0 1 .49-5.63c.12-.66.27-1.29.43-1.89h.09a.4.4 0 0 0 .15-.29c0-.06-.52-.39-.52-.39C5.74 6.26 3.65 10.74 3.65 10.74a10.45 10.45 0 0 0 5 10.57 3.32 3.32 0 0 0 .5.25.12.12 0 0 0 .12 0 .1.1 0 0 0 0-.17Zm9.9-7.92a7.35 7.35 0 0 0-3.32-4.13A16 16 0 0 0 16.29 4c-5.18-.34-8.76 2.65-8.76 2.65s1.9-2 5.09-2a9 9 0 0 1 4.54 1.43 3.6 3.6 0 0 1 1.62 2.62.33.33 0 0 1-.58.21 2.3 2.3 0 0 0-1.46-.77 2.14 2.14 0 0 0-1.74 1.13 6.3 6.3 0 0 0-.52 2.76 8 8 0 0 0 4 6.55 7.72 7.72 0 0 0 3.39.75 7.39 7.39 0 0 0 5-2 7.73 7.73 0 0 0 2.22-5.46 7.77 7.77 0 0 0-7.23-7.79 7.31 7.31 0 0 0-5.1 2.66c-1.3-1.67-1.3-3.66-1.3-3.66s-4.08 1.4-5.32 5.76a16.63 16.63 0 0 0-.58 5.61A8 8 0 0 0 20.35 15a7.89 7.89 0 0 0 1.51-5.42Z" />
            <path fill="#ffcb00" d="M11.96 17.5c2.65 0 4.8-1.95 4.8-4.34a4.34 4.34 0 0 0-4.78-4.32 3.93 3.93 0 0 0-3.23 2.66 4.6 4.6 0 0 0 3.21 6Z" />
        </svg>
    ),
    // Safari: Use fetched SVG logic but simplified for embedding
    Safari: (
        <svg viewBox="0 0 256 256" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="safari-a" x1="128" x2="128" y1="256" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#00b3f0" /><stop offset="1" stopColor="#00e5ff" /></linearGradient>
            </defs>
            <circle cx="128" cy="128" r="128" fill="#fff" />
            <path fill="url(#safari-a)" d="M128 0a128 128 0 1 0 128 128A128 128 0 0 0 128 0Z" />
            <path fill="#fff" d="M228.6 128a100.6 100.6 0 1 1-100.6-100.6A100.6 100.6 0 0 1 228.6 128Z" opacity=".2" />
            <g transform="translate(36 36) scale(0.72)">
                <path fill="#fff" d="M128 16L96 160l-32 32-32-32 16-96 80-48z" />
                <path fill="#ff3b30" d="M128 16L48 64l-16 96 32 32 32-32 32-144z" />
                <path fill="#fff" d="M149.3 106.7L128 128l-21.3 21.3L85.3 128l21.3-21.3z" opacity=".5" />
            </g>
            {/* Simple Compass Needle */}
            <polygon points="128 32 165 119 128 128 91 119" fill="#ff3b30" />
            <polygon points="128 224 91 137 128 128 165 137" fill="#fff" />
        </svg>
    ),
    Edge: (
        <svg viewBox="0 0 256 256" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            {/* Simplified Edge Wave */}
            <path fill="#0c59a4" d="M115,231 C76,231 39,211 39,173 C39,162 45,152 54,147 C14,166 4,209 4,233 C4,301 67,308 81,308 C88,308 99,306 106,304 L107,304 C169,255 167,251 161,245 C149,235 134,231 115,231 Z" transform="translate(0 -52)" />
            <path fill="#114a8b" d="M115,231 C76,231 39,211 39,173 C39,162 45,152 54,147 C14,166 4,209 4,233 C4,301 67,308 81,308 C88,308 99,306 106,304 L107,304 C169,255 167,251 161,245 C149,235 134,231 115,231 Z" transform="translate(0 -52)" opacity="0.3" />
            <path fill="#35c1f1" d="M150,147 C149,148 147,149 147,152 C147,154 148,157 151,159 C164,168 189,167 189,167 C217,159 227,151 227,151 C241,133 241,113 241,113 C235,48 171,48 171,48 C124,48 90,75 90,75 C75,88 67,108 67,108 C67,113 70,126 74,131 C67,108 67,100 67,77 C67,12 173,12 173,12 C248,12 255,81 255,108 C255,135 242,162 242,162 C222,197 180,211 180,211 C159,208 147,203 145,202 L145,202 C202,195 241,118 165,118 C153,118 149,121 149,121 C147,122 143,138 150,147 Z" transform="translate(0 -52)" />
            <path fill="#27c93f" d="M224,186 C219,191 199,215 172,215 C135,215 125,188 125,178 C125,173 122,161 117,154 C122,176 122,185 122,208 C122,273 227,273 227,273 C302,273 309,204 309,177 C309,150 297,122 297,122 C297,122 238,172 224,186 Z" transform="translate(0 -52)" />
        </svg>
    )
}

const BROWSERS = [
    { id: 'chrome', name: 'Chrome', icon: Logos.Chrome, bg: '#ffffff', border: '#e2e8f0', shadow: 'rgba(0,0,0,0.05)' },
    { id: 'firefox', name: 'Firefox', icon: Logos.Firefox, bg: '#ffffff', border: '#e2e8f0', shadow: 'rgba(0,0,0,0.05)' },
    { id: 'safari', name: 'Safari', icon: Logos.Safari, bg: '#ffffff', border: '#e2e8f0', shadow: 'rgba(0,0,0,0.05)' },
    { id: 'edge', name: 'Edge', icon: Logos.Edge, bg: '#ffffff', border: '#e2e8f0', shadow: 'rgba(0,0,0,0.05)' }
]

export function InteractiveBrowserStack() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '2rem 0'
        }}>
            {BROWSERS.map((browser) => (
                <div
                    key={browser.id}
                    className="browser-box"
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        padding: '2rem 1rem',
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
                        transform: 'scale(1.2)',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                    }}>
                        {browser.icon}
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
