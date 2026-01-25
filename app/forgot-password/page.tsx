'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { DeviceAuthFrame } from '@/components/DeviceAuthFrame'
import { theme } from '@/lib/theme'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
            })

            if (error) {
                setError(error.message)
            } else {
                setMessage('Check your email for the password reset link.')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <DeviceAuthFrame
            title="Reset Password"
            subtitle="Enter your email to receive connection instructions."
        >
            <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {error && (
                    <div style={{
                        padding: '0.75rem',
                        borderRadius: theme.radius.md,
                        background: theme.status.error.bg,
                        border: `1px solid ${theme.status.error.border}`,
                        color: theme.status.error.text,
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        padding: '0.75rem',
                        borderRadius: theme.radius.md,
                        background: theme.status.success.bg,
                        border: `1px solid ${theme.status.success.border}`,
                        color: theme.status.success.text,
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <div>
                    <label htmlFor="email" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Write your email address"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: theme.radius.md,
                            border: `1px solid ${theme.border.default}`,
                            background: theme.bg.tertiary,
                            color: theme.text.primary,
                            fontSize: '1rem',
                            outline: 'none',
                            transition: `border-color ${theme.transitions.fast}`
                        }}
                        onFocus={(e) => e.target.style.borderColor = theme.accent.primary}
                        onBlur={(e) => e.target.style.borderColor = theme.border.default}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '0.5rem',
                        width: '100%',
                        padding: '0.875rem',
                        borderRadius: theme.radius.md,
                        background: loading ? theme.bg.tertiary : `linear-gradient(135deg, ${theme.accent.primary} 0%, ${theme.accent.primaryDark} 100%)`,
                        color: '#fff',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'transform 0.1s',
                        boxShadow: theme.shadows.md
                    }}
                    onMouseDown={e => !loading && (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={e => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {loading ? 'Sending Instructions...' : 'Reset Password'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: theme.text.secondary }}>
                    Remember your password?{' '}
                    <Link href="/login" style={{ color: theme.accent.primary, textDecoration: 'none', fontWeight: 500 }}>
                        Sign in
                    </Link>
                </div>
            </form>
        </DeviceAuthFrame>
    )
}
