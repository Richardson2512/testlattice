'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useTierInfo } from '@/lib/hooks'
import { User } from '@supabase/supabase-js'

export default function SettingsPage() {
    const [user, setUser] = useState<User | null>(null)
    const { data: tierInfo, isLoading } = useTierInfo()
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user))
    }, [])

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: 'var(--font-sans)',
            padding: '2rem',
        }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Settings</h1>

                {/* Profile Section */}
                <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Profile</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
                            <div style={{
                                padding: '0.75rem',
                                background: 'var(--beige-100)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)'
                            }}>
                                {user?.email || 'Loading...'}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>User ID</label>
                            <code style={{
                                display: 'block',
                                padding: '0.75rem',
                                background: 'var(--beige-100)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-muted)',
                                fontSize: '0.85rem'
                            }}>
                                {user?.id || 'Loading...'}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Subscription Section */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Subscription</h2>
                        <span style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        }}>
                            {tierInfo?.tier || 'Free'}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--beige-50)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Monthly Tests</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                {(tierInfo?.limits as any)?.totalTestsPerMonth || 'Unlimited'}
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'var(--beige-50)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Data Retention</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                {tierInfo?.limits.retentionDays || 1} Days
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Features</h3>
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ color: tierInfo?.features.comprehensiveTesting ? 'var(--success)' : 'var(--text-muted)' }}>
                                {tierInfo?.features.comprehensiveTesting ? '✓' : '✗'} Comprehensive Testing
                            </li>
                            <li style={{ color: tierInfo?.features.videoRecording ? 'var(--success)' : 'var(--text-muted)' }}>
                                {tierInfo?.features.videoRecording ? '✓' : '✗'} Video Recording
                            </li>
                            <li style={{ color: tierInfo?.limits.mobileBrowsers ? 'var(--success)' : 'var(--text-muted)' }}>
                                {tierInfo?.limits.mobileBrowsers ? '✓' : '✗'} Mobile Browsers
                            </li>
                            <li style={{ color: tierInfo?.features.godMode ? 'var(--success)' : 'var(--text-muted)' }}>
                                {tierInfo?.features.godMode ? '✓' : '✗'} God Mode AI
                            </li>
                        </ul>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <button className="btn btn-primary" onClick={() => window.location.href = '/pricing'}>
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
