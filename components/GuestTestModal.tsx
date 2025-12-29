'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

// Test type options
const TEST_TYPES = [
    { id: 'visual', label: 'Visual Testing', icon: '👁️', description: 'UI exploration & screenshots', tooltip: 'Detects layout shifts, broken images, and visual regressions across browsers.' },
    { id: 'login', label: 'Login Flow', icon: '🔐', description: 'Test login with credentials', tooltip: 'Verifies authentication mechanisms including valid/invalid credentials and session handling.' },
    { id: 'signup', label: 'Sign Up Flow', icon: '📝', description: 'Test registration flow', tooltip: 'Tests the complete registration process, form validation, and successful account creation.' },
    { id: 'navigation', label: 'Navigation', icon: '🔗', description: 'Test page links & routes', tooltip: 'Crawls internal links to ensure no broken paths and proper routing behavior.' },
    { id: 'form', label: 'Form Testing', icon: '📋', description: 'Test form inputs & validation', tooltip: 'Validates input fields, error states, and submission handling on contact/data forms.' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿', description: 'Basic a11y audit', tooltip: 'Checks for WCAG compliance, ARIA attributes, and screen reader compatibility.' },
    { id: 'rage_bait', label: 'Rage Bait', icon: '🔥', description: 'Edge case stress tests', tooltip: 'Tests 5 common MVP-breaking scenarios: Back button, session timeout, Enter key, special chars, and input overflow.' },
]

interface GuestTestModalProps {
    isOpen: boolean
    onClose: () => void
}

export function GuestTestModal({ isOpen, onClose }: GuestTestModalProps) {
    const [url, setUrl] = useState('')
    const [testType, setTestType] = useState('visual')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const needsCredentials = testType === 'login' || testType === 'signup'

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return
        if (needsCredentials && (!username || !password)) {
            setError('Please provide demo credentials for this test flow.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/run/guest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    testType,
                    credentials: needsCredentials ? { username, password } : undefined,
                    build: { type: 'web' },
                    profile: { device: 'CHROME_LATEST' }
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 429 || response.status === 403) {
                    setError(data.message || 'Limit reached. Please sign up to continue.')
                    return
                }
                throw new Error(data.error || 'Failed to start test')
            }

            router.push(`/guest/run/${data.runId}`)
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !mounted) return null

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(61, 54, 48, 0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                animation: 'fadeIn 0.2s ease-out',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem',
                    position: 'relative',
                    boxShadow: 'var(--shadow-lg)',
                    animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                    }}
                >
                    ×
                </button>

                <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Start Instant Test</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Enter a URL and choose what to test.
                    <br />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        (Guest Limit: 3 runs • Chrome Only)
                    </span>
                </p>

                <form onSubmit={handleSubmit}>
                    {/* URL Input */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            Target URL <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '4px' }}>(URL should start from https)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                fontSize: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '2px solid var(--border-medium)',
                                background: 'var(--bg-primary)',
                            }}
                            autoFocus
                        />
                    </div>

                    {/* Test Type Selection */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                            Test Type
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {TEST_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setTestType(type.id)}
                                    style={{
                                        position: 'relative',
                                        padding: '0.75rem 0.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: testType === type.id ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                                        background: testType === type.id ? 'rgba(92, 15, 15, 0.08)' : 'var(--bg-card)',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    <div className="info-icon" style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', zIndex: 5 }} onClick={(e) => e.stopPropagation()}>
                                        ⓘ
                                        <div className="tooltip">
                                            {type.tooltip}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{type.icon}</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{type.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Credentials Section (for login/signup) */}
                    {needsCredentials && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            {/* Demo Credentials Warning */}
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(217, 119, 6, 0.1)',
                                border: '1px solid rgba(217, 119, 6, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem',
                                fontSize: '0.8rem',
                                color: 'var(--warning)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.5rem'
                            }}>
                                <span style={{ fontSize: '1rem' }}>⚠️</span>
                                <span>
                                    <strong>Use demo credentials only!</strong> Do not enter real passwords.
                                    Create a test account or use publicly known demo credentials.
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text-secondary)' }}>
                                        Username / Email
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="demo@example.com"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            fontSize: '0.9rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-medium)',
                                            background: 'var(--bg-primary)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text-secondary)' }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            fontSize: '0.9rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-medium)',
                                            background: 'var(--bg-primary)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: 'var(--maroon-50)',
                            color: 'var(--maroon-600)',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Starting Agent...' : 'Run Test →'}
                    </button>
                </form>
                <style jsx>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                    
                    .tooltip {
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-8px);
                        background: #333;
                        color: white;
                        padding: 0.5rem 0.75rem;
                        border-radius: 4px;
                        font-size: 0.7rem;
                        line-height: 1.4;
                        width: 180px;
                        visibility: hidden;
                        opacity: 0;
                        transition: all 0.2s ease;
                        pointer-events: none;
                        z-index: 20;
                        font-weight: 400;
                        text-align: center;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }
                    
                    .tooltip::after {
                        content: '';
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: #333 transparent transparent transparent;
                    }

                    .info-icon:hover .tooltip {
                        visibility: visible;
                        opacity: 1;
                        transform: translateX(-50%) translateY(-5px);
                    }
                `}</style>
            </div>
        </div>,
        document.body
    )
}

