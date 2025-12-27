/**
 * Usage tracking hook for pricing and limits
 */
import { useState, useEffect } from 'react'
import { api } from '../api'
import type { PricingTier } from '../pricing'

export interface UsageStats {
  totalTests: number
  visualTests: number
  totalTestsLimit: number
  visualTestsLimit: number
  remainingTests: number
  remainingVisualTests: number
  currentTier: PricingTier
  periodStart: string
  periodEnd: string
}

export function useUsage() {
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsage() {
      try {
        setLoading(true)
        // TODO: Replace with actual API endpoint when backend is ready
        // Fetch real usage from API
        const [tierInfoRes, usageRes] = await Promise.all([
          api.getTierInfo(),
          api.checkUsage()
        ])

        // Map backend tier to pricing tier
        const tierMap: Record<string, PricingTier> = {
          'free': 'free', // API might return 'free' directly now
          'guest': 'free',
          'starter': 'starter',
          'indie': 'indie',
          'pro': 'pro',
          'agency': 'pro',
        }

        const currentTier = (tierMap[usageRes.tier] || tierMap[tierInfoRes.tier] || 'free') as PricingTier

        // Set limits based on tier (import from pricing.ts)
        const { PRICING_TIERS } = await import('../pricing')
        const tierInfo_pricing = PRICING_TIERS[currentTier]

        const realUsage: UsageStats = {
          totalTests: usageRes.testsUsed,
          visualTests: 0, // Not yet tracked separately in this endpoint
          totalTestsLimit: usageRes.testsLimit,
          visualTestsLimit: tierInfo_pricing.limits.maxVisualTests,
          remainingTests: usageRes.testsRemaining,
          remainingVisualTests: tierInfo_pricing.limits.maxVisualTests,
          currentTier,
          periodStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          periodEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
        }

        setUsage(realUsage)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch usage')
        console.error('Failed to fetch usage:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()
  }, [])

  return { usage, loading, error }
}

