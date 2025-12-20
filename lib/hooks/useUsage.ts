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
        // For now, return mock data based on tier info
        const tierInfo = await api.getTierInfo()
        
        // Map backend tier to pricing tier
        const tierMap: Record<string, PricingTier> = {
          'guest': 'free',
          'starter': 'starter',
          'indie': 'indie',
          'pro': 'pro',
          'agency': 'pro',
        }
        
        const currentTier = tierMap[tierInfo.tier] || 'free'
        
        // Mock usage - in production, this would come from the API
        const mockUsage: UsageStats = {
          totalTests: 0, // TODO: Get from API
          visualTests: 0, // TODO: Get from API
          totalTestsLimit: 0, // Will be set based on tier
          visualTestsLimit: 0, // Will be set based on tier
          remainingTests: 0,
          remainingVisualTests: 0,
          currentTier,
          periodStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          periodEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
        }
        
        // Set limits based on tier (import from pricing.ts)
        const { PRICING_TIERS } = await import('../pricing')
        const tierInfo_pricing = PRICING_TIERS[currentTier]
        mockUsage.totalTestsLimit = tierInfo_pricing.limits.totalTestsPerMonth
        mockUsage.visualTestsLimit = tierInfo_pricing.limits.maxVisualTests
        mockUsage.remainingTests = Math.max(0, mockUsage.totalTestsLimit - mockUsage.totalTests)
        mockUsage.remainingVisualTests = Math.max(0, mockUsage.visualTestsLimit - mockUsage.visualTests)
        
        setUsage(mockUsage)
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

