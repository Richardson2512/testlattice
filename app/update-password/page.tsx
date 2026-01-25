'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DeviceAuthFrame } from '@/components/DeviceAuthFrame'
import { theme } from '@/lib/theme'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Verify user is authenticated
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                // If no session, they might have clicked a bad link or waited too long
                router.push('/login')
            }
        }
        checkAuth()
    }, [router, supabase])

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.updateUser({ password: password })

            if (error) {
                setError(error.message)
            } else {
                setMessage('Password updated successfully! Logging out...')
                setTimeout(async () => {
                    await supabase.auth.signOut()
                    router.push('/login')
                }, 2000)
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <DeviceAuthFrame
            title="Set New Password"
            subtitle="Please enter your new password below."
        >
            <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    <label htmlFor="password" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
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

                <div>
                    <label htmlFor="confirmPassword" style={{ display: 'block', color: theme.text.secondary, fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
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
                    {loading ? 'Updating Password...' : 'Update Password'}
                </button>
            </form>
        </DeviceAuthFrame>
    )
}
