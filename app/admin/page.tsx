'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface AdminStats {
    users: {
        total: number
        paid: number
        active: number
        tierBreakdown: {
            free: number
            starter: number
            indie: number
            pro: number
        }
    }
    tests: {
        total: number
        completed: number
        failed: number
        running: number
    }
    steps: {
        passed: number
        failed: number
        total: number
        passRate: number
    }
    projects: number
    fixPrompts: number
}

interface AdminUser {
    id: string
    email: string
    createdAt: string
    lastSignIn: string
    isAdmin: boolean
    subscription: {
        tier: string
        status: string
        testsUsed: number
    }
    analytics: {
        projects: number
        testRuns: number
        completedTests: number
        failedTests: number
        passedSteps: number
        failedSteps: number
        fixPrompts: number
    }
}

const StatCard = ({ title, value, subtext, color = 'var(--primary)' }: {
    title: string
    value: string | number
    subtext: string
    color?: string
}) => (
    <div className="glass-card" style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {title}
        </span>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 500, color }}>{subtext}</div>
    </div>
)

const TierBadge = ({ tier }: { tier: string }) => {
    const colors: Record<string, { bg: string; text: string }> = {
        free: { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280' },
        starter: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
        indie: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6' },
        pro: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' },
    }
    const style = colors[tier] || colors.free
    return (
        <span style={{
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            background: style.bg,
            color: style.text,
        }}>
            {tier}
        </span>
    )
}

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [users, setUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        checkAdminAccess()
    }, [])

    async function checkAdminAccess() {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setIsAdmin(false)
            setLoading(false)
            return
        }

        // Check if user has admin role
        const isUserAdmin = user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin'
        setIsAdmin(isUserAdmin)

        if (isUserAdmin) {
            await loadAdminData()
        } else {
            setLoading(false)
        }
    }

    async function loadAdminData() {
        try {
            setLoading(true)
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

            // Load stats
            const statsRes = await fetch(`${apiUrl}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!statsRes.ok) throw new Error('Failed to load stats')
            const statsData = await statsRes.json()
            setStats(statsData)

            // Load users
            const usersRes = await fetch(`${apiUrl}/api/admin/users?search=${encodeURIComponent(search)}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!usersRes.ok) throw new Error('Failed to load users')
            const usersData = await usersRes.json()
            setUsers(usersData.users)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Access denied
    if (isAdmin === false) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
            }}>
                <div style={{ fontSize: '4rem' }}>🔒</div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Access Denied</h1>
                <p style={{ color: 'var(--text-muted)' }}>You need admin privileges to view this page.</p>
                <Link href="/dashboard" style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontWeight: 600,
                }}>
                    Go to Dashboard
                </Link>
            </div>
        )
    }

    // Loading
    if (loading || isAdmin === null) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚙️</div>
                    <p style={{ color: 'var(--text-muted)' }}>Loading admin dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    🛡️ Admin Dashboard
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Platform analytics and user management
                </p>
            </div>

            {error && (
                <div style={{
                    padding: '1rem',
                    background: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--error)',
                    marginBottom: '1.5rem',
                }}>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            {stats && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    <StatCard
                        title="Total Users"
                        value={stats.users.total}
                        subtext={`${stats.users.active} active`}
                        color="var(--info)"
                    />
                    <StatCard
                        title="Paid Users"
                        value={stats.users.paid}
                        subtext={`${Math.round((stats.users.paid / Math.max(stats.users.total, 1)) * 100)}% conversion`}
                        color="var(--success)"
                    />
                    <StatCard
                        title="Total Tests"
                        value={stats.tests.total}
                        subtext={`${stats.tests.running} running now`}
                        color="var(--warning)"
                    />
                    <StatCard
                        title="Pass Rate"
                        value={`${stats.steps.passRate}%`}
                        subtext={`${stats.steps.passed.toLocaleString()} / ${stats.steps.total.toLocaleString()} steps`}
                        color={stats.steps.passRate >= 80 ? 'var(--success)' : 'var(--error)'}
                    />
                    <StatCard
                        title="Fix Prompts"
                        value={stats.fixPrompts}
                        subtext="AI prompts generated"
                        color="var(--primary)"
                    />
                </div>
            )}

            {/* Tier Breakdown */}
            {stats && (
                <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Subscription Breakdown
                    </h2>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Free</span>
                                <span style={{ fontWeight: 600 }}>{stats.users.tierBreakdown.free}</span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--beige-100)', borderRadius: '4px' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(stats.users.tierBreakdown.free / Math.max(stats.users.total, 1)) * 100}%`,
                                    background: '#6B7280',
                                    borderRadius: '4px',
                                }} />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Starter</span>
                                <span style={{ fontWeight: 600 }}>{stats.users.tierBreakdown.starter}</span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--beige-100)', borderRadius: '4px' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(stats.users.tierBreakdown.starter / Math.max(stats.users.total, 1)) * 100}%`,
                                    background: '#3B82F6',
                                    borderRadius: '4px',
                                }} />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Indie</span>
                                <span style={{ fontWeight: 600 }}>{stats.users.tierBreakdown.indie}</span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--beige-100)', borderRadius: '4px' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(stats.users.tierBreakdown.indie / Math.max(stats.users.total, 1)) * 100}%`,
                                    background: '#8B5CF6',
                                    borderRadius: '4px',
                                }} />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Pro</span>
                                <span style={{ fontWeight: 600 }}>{stats.users.tierBreakdown.pro}</span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--beige-100)', borderRadius: '4px' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(stats.users.tierBreakdown.pro / Math.max(stats.users.total, 1)) * 100}%`,
                                    background: '#F59E0B',
                                    borderRadius: '4px',
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users Table */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                        All Users ({users.length})
                    </h2>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search by email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && loadAdminData()}
                            style={{
                                padding: '0.5rem 0.75rem',
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--border-medium)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                width: '200px',
                            }}
                        />
                        <button
                            onClick={loadAdminData}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--primary)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--beige-50)' }}>
                            <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>User</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Tier</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Projects</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Tests</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Passed</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Failed</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Prompts</th>
                            <th style={{ padding: '0.75rem 1.25rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={user.id}
                                style={{
                                    borderBottom: i < users.length - 1 ? '1px solid var(--border-light)' : 'none',
                                }}
                            >
                                <td style={{ padding: '0.75rem 1.25rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {user.email}
                                            {user.isAdmin && (
                                                <span style={{ fontSize: '0.65rem', background: 'rgba(220, 38, 38, 0.1)', color: 'var(--error)', padding: '2px 6px', borderRadius: '4px' }}>
                                                    ADMIN
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {user.id.substring(0, 8)}...
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <TierBadge tier={user.subscription.tier} />
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
                                    {user.analytics.projects}
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                    <span style={{ fontWeight: 600 }}>{user.analytics.testRuns}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        {' '}({user.analytics.completedTests}✓ / {user.analytics.failedTests}✗)
                                    </span>
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--success)', fontWeight: 600 }}>
                                    {user.analytics.passedSteps.toLocaleString()}
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--error)', fontWeight: 600 }}>
                                    {user.analytics.failedSteps.toLocaleString()}
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
                                    {user.analytics.fixPrompts}
                                </td>
                                <td style={{ padding: '0.75rem 1.25rem', textAlign: 'right', color: 'var(--text-muted)' }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
