'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { api } from '@/lib/api'
import { PRICING_TIERS, type PricingTier } from '@/lib/pricing'
import Link from 'next/link'

interface SubscriptionInfo {
    tier: PricingTier
    status: string
    testsUsed: number
    visualTestsUsed: number
    addonVisualTests: number
    currentPeriodStart?: string
    currentPeriodEnd?: string
    cancelAtPeriodEnd?: boolean
    polarCustomerId?: string
    polarSubscriptionId?: string
}

interface UsageInfo {
    canRun: boolean
    testsUsed: number
    testsLimit: number
    testsRemaining: number
    tier: string
}

export default function ProfilePage() {
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)
    const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
    const [usage, setUsage] = useState<UsageInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)

    // Fetch user and subscription data
    const loadData = async () => {
        try {
            // Get user info
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                // Fetch subscription from API
                const { data: { session } } = await supabase.auth.getSession()
                if (session?.access_token) {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

                    // Fetch subscription
                    const subRes = await fetch(`${apiUrl}/api/billing/subscription`, {
                        headers: { Authorization: `Bearer ${session.access_token}` },
                    })
                    if (subRes.ok) {
                        const data = await subRes.json()
                        setSubscription(data.subscription || {
                            tier: 'free',
                            status: 'active',
                            testsUsed: 0,
                            visualTestsUsed: 0,
                            addonVisualTests: 0,
                        })
                    }

                    // Fetch usage
                    const usageRes = await fetch(`${apiUrl}/api/billing/usage`, {
                        headers: { Authorization: `Bearer ${session.access_token}` },
                    })
                    if (usageRes.ok) {
                        const usageData = await usageRes.json()
                        setUsage(usageData)
                    }
                }
            }
        } catch (error) {
            console.error('Failed to load profile data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()

        // Refresh every 30 seconds for real-time updates
        const interval = setInterval(loadData, 30000)
        return () => clearInterval(interval)
    }, [])

    // Sync with Polar
    const handleSync = async () => {
        setSyncing(true)
        try {
            const result = await api.reconcileSubscription()
            if (result.updated) {
                await loadData()
                alert(`Subscription synced! Updated from ${result.previousTier} to ${result.tier}`)
            } else {
                alert('Subscription is already in sync')
            }
        } catch (error: any) {
            console.error('Sync failed:', error)
        } finally {
            setSyncing(false)
        }
    }

    // Calculate days until renewal
    const getDaysUntilRenewal = () => {
        if (!subscription?.currentPeriodEnd) return null
        const end = new Date(subscription.currentPeriodEnd)
        const now = new Date()
        const diff = end.getTime() - now.getTime()
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    // Format date nicely
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    // Get tier info from pricing
    const tierInfo = subscription ? PRICING_TIERS[subscription.tier as PricingTier] || PRICING_TIERS.free : PRICING_TIERS.free

    // Get next tier for upgrade button
    const getNextTier = (currentTier: string): string => {
        const tierOrder = ['free', 'starter', 'indie', 'pro']
        const currentIndex = tierOrder.indexOf(currentTier)
        if (currentIndex === -1 || currentIndex >= tierOrder.length - 1) {
            return 'Pro' // Already at max or unknown
        }
        const nextTier = tierOrder[currentIndex + 1]
        return nextTier.charAt(0).toUpperCase() + nextTier.slice(1)
    }

    if (loading) {
        return (
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    👤 Profile
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Manage your account and subscription
                </p>
            </div>

            {/* User Info Card */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📧</span> Account Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Email
                        </label>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 500 }}>
                            {user?.email || 'Not signed in'}
                        </p>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Name
                        </label>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 500 }}>
                            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'N/A'}
                        </p>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            User ID
                        </label>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                            {user?.id?.substring(0, 8)}...{user?.id?.substring(user.id.length - 4)}
                        </p>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Member Since
                        </label>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 500 }}>
                            {formatDate(user?.created_at)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Subscription Card */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <span>💳</span> Subscription Plan
                    </h2>
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)',
                            cursor: syncing ? 'not-allowed' : 'pointer',
                            opacity: syncing ? 0.7 : 1,
                        }}
                    >
                        {syncing ? '🔄 Syncing...' : '🔄 Sync with Polar'}
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Current Plan
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: tierInfo.popular ? 'var(--primary)' : 'var(--text-primary)',
                                textTransform: 'capitalize',
                            }}>
                                {subscription?.tier || 'Free'}
                            </span>
                            {subscription?.tier !== 'free' && (
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    background: 'var(--success)',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontWeight: 600,
                                }}>
                                    {subscription?.status === 'active' ? 'ACTIVE' : subscription?.status?.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Monthly Price
                        </label>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 700 }}>
                            {tierInfo.priceLabel}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/mo</span>
                        </p>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Subscription Date
                        </label>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 500 }}>
                            {formatDate(subscription?.currentPeriodStart)}
                        </p>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Renewal Date
                        </label>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontWeight: 500 }}>
                            {formatDate(subscription?.currentPeriodEnd)}
                            {subscription?.cancelAtPeriodEnd && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--error)', marginLeft: '0.5rem' }}>
                                    (Canceling)
                                </span>
                            )}
                        </p>
                    </div>

                    {subscription?.currentPeriodEnd && (
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Days Until Renewal
                            </label>
                            <p style={{ fontSize: '1.5rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 700 }}>
                                {getDaysUntilRenewal()} <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-secondary)' }}>days</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Upgrade Button */}
                {subscription?.tier === 'free' && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg, rgba(92, 15, 15, 0.05) 0%, rgba(92, 15, 15, 0.1) 100%)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                            Upgrade to unlock more tests, visual testing, and premium features.
                        </p>
                        <Link
                            href="/pricing"
                            style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--maroon-700) 100%)',
                                color: 'white',
                                fontWeight: 600,
                                borderRadius: 'var(--radius-md)',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                            }}
                        >
                            🚀 Upgrade Plan
                        </Link>
                    </div>
                )}
            </div>

            {/* Usage & Features Card */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📊</span> Usage & Features
                </h2>

                {/* Usage Progress */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tests Used This Month</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {usage?.testsUsed || 0} / {usage?.testsLimit || tierInfo.limits.totalTestsPerMonth}
                        </span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--beige-200)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${Math.min(100, ((usage?.testsUsed || 0) / (usage?.testsLimit || tierInfo.limits.totalTestsPerMonth)) * 100)}%`,
                            background: usage?.canRun ? 'var(--primary)' : 'var(--error)',
                            borderRadius: '4px',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: (usage?.canRun !== false) ? 'var(--success)' : 'var(--error)', marginTop: '0.5rem' }}>
                        {(usage?.canRun !== false)
                            ? `✅ ${usage?.testsRemaining ?? (tierInfo.limits.totalTestsPerMonth - (usage?.testsUsed || 0))} tests remaining`
                            : '❌ Monthly limit reached'}
                    </p>
                </div>

                {/* Features Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <FeatureItem label="Total Tests / Month" value={`${tierInfo.limits.totalTestsPerMonth}`} />
                    <FeatureItem label="Visual Tests / Month" value={`${tierInfo.limits.maxVisualTests}`} />
                    <FeatureItem label="Browsers" value={tierInfo.limits.browsers.length === 1 ? 'Chrome' : 'All 3 Browsers'} />
                    <FeatureItem label="Mobile Support" value={tierInfo.limits.mobileSupported ? '✅ Yes' : '❌ No'} />
                    <FeatureItem label="Projects" value={tierInfo.limits.maxProjects === 'unlimited' ? 'Unlimited' : `${tierInfo.limits.maxProjects}`} />
                    <FeatureItem label="History" value={tierInfo.limits.historyDays === 0 ? 'None' : `${tierInfo.limits.historyDays} days`} />
                    <FeatureItem label="Exports" value={tierInfo.limits.exports ? '✅ Yes' : '❌ No'} />
                    <FeatureItem label="Re-runs" value={tierInfo.limits.reRuns ? '✅ Yes' : '❌ No'} />
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {subscription?.tier !== 'pro' && (
                    <Link href="/pricing" style={{
                        padding: '1rem',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--maroon-700) 100%)',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                    }}>
                        <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🚀</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
                            Upgrade to {getNextTier(subscription?.tier || 'free')}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.2rem' }}>
                            Unlock more features
                        </div>
                    </Link>
                )}

                <Link href="/dashboard" className="glass-card" style={{
                    padding: '1rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📊</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dashboard</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Run tests</div>
                </Link>

                <Link href="/runs" className="glass-card" style={{
                    padding: '1rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🔬</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Test History</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>View all runs</div>
                </Link>
            </div>
        </div>
    )
}

// Helper component for feature items
function FeatureItem({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {label}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {value}
            </div>
        </div>
    )
}
