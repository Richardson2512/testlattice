/**
 * Custom hooks for optimized data fetching with caching and auto-refresh
 */
import { useState, useEffect, useCallback, useRef } from 'react'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
// In-flight request deduplication - prevents duplicate concurrent calls
const inFlightRequests = new Map<string, Promise<any>>()
const DEFAULT_CACHE_TIME = 30 * 1000 // 30 seconds
const DEFAULT_STALE_TIME = 5 * 1000 // 5 seconds

interface UseApiOptions<T> {
    /** Whether to fetch immediately on mount */
    enabled?: boolean
    /** Cache time in ms (default: 30s) */
    cacheTime?: number
    /** Time after which data is considered stale (default: 5s) */
    staleTime?: number
    /** Auto-refetch interval in ms */
    refetchInterval?: number
    /** Initial data to use before fetch completes */
    initialData?: T
    /** Callback when fetch succeeds */
    onSuccess?: (data: T) => void
    /** Callback when fetch fails */
    onError?: (error: Error) => void
}

interface UseApiResult<T> {
    data: T | undefined
    isLoading: boolean
    isError: boolean
    error: Error | null
    isFetching: boolean
    isStale: boolean
    refetch: () => Promise<void>
    invalidate: () => void
}

/**
 * Custom hook for API data fetching with caching
 * Provides React Query-like functionality without additional dependencies
 */
export function useApi<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: UseApiOptions<T> = {}
): UseApiResult<T> {
    const {
        enabled = true,
        cacheTime = DEFAULT_CACHE_TIME,
        staleTime = DEFAULT_STALE_TIME,
        refetchInterval,
        initialData,
        onSuccess,
        onError,
    } = options

    const [data, setData] = useState<T | undefined>(() => {
        // Check cache on initial render
        const cached = cache.get(key)
        if (cached && Date.now() - cached.timestamp < cacheTime) {
            return cached.data
        }
        return initialData
    })
    const [isLoading, setIsLoading] = useState(!data)
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [isStale, setIsStale] = useState(false)

    const fetcherRef = useRef(fetcher)
    fetcherRef.current = fetcher

    const checkStale = useCallback(() => {
        const cached = cache.get(key)
        if (cached) {
            setIsStale(Date.now() - cached.timestamp > staleTime)
        }
    }, [key, staleTime])

    const refetch = useCallback(async () => {
        // If there's already an in-flight request for this key, wait for it
        const existingRequest = inFlightRequests.get(key)
        if (existingRequest) {
            try {
                const result = await existingRequest
                setData(result)
                setIsStale(false)
                setIsLoading(false)
                onSuccess?.(result)
                return
            } catch {
                // If shared request failed, we'll make our own below
            }
        }

        setIsFetching(true)
        setIsError(false)
        setError(null)

        // Create the fetch promise and store it for deduplication
        const fetchPromise = fetcherRef.current()
        inFlightRequests.set(key, fetchPromise)

        try {
            const result = await fetchPromise

            // Update cache
            cache.set(key, { data: result, timestamp: Date.now() })

            setData(result)
            setIsStale(false)
            onSuccess?.(result)
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err))
            setIsError(true)
            setError(error)
            onError?.(error)
        } finally {
            inFlightRequests.delete(key)
            setIsFetching(false)
            setIsLoading(false)
        }
    }, [key, onSuccess, onError])

    const invalidate = useCallback(() => {
        cache.delete(key)
        setIsStale(true)
    }, [key])

    // Initial fetch
    useEffect(() => {
        if (!enabled) return

        const cached = cache.get(key)
        if (cached && Date.now() - cached.timestamp < staleTime) {
            // Data is fresh, no need to fetch
            setData(cached.data)
            setIsLoading(false)
        } else {
            // Data is stale or missing, fetch new data
            refetch()
        }
    }, [key, enabled, staleTime, refetch])

    // Refetch interval
    useEffect(() => {
        if (!enabled || !refetchInterval) return

        const interval = setInterval(() => {
            refetch()
        }, refetchInterval)

        return () => clearInterval(interval)
    }, [enabled, refetchInterval, refetch])

    // Check staleness periodically
    useEffect(() => {
        const interval = setInterval(checkStale, 1000)
        return () => clearInterval(interval)
    }, [checkStale])

    return { data, isLoading, isError, error, isFetching, isStale, refetch, invalidate }
}

/**
 * Hook for polling API data at intervals
 */
export function usePolling<T>(
    key: string,
    fetcher: () => Promise<T>,
    intervalMs: number,
    options: Omit<UseApiOptions<T>, 'refetchInterval'> = {}
) {
    return useApi(key, fetcher, {
        ...options,
        refetchInterval: intervalMs,
    })
}

/**
 * Invalidate all cache entries matching a prefix
 */
export function invalidateQueries(keyPrefix: string) {
    const keysToDelete = Array.from(cache.keys()).filter(key => key.startsWith(keyPrefix))
    keysToDelete.forEach(key => cache.delete(key))
}

/**
 * Clear entire cache
 */
export function clearCache() {
    cache.clear()
}
