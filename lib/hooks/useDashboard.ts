/**
 * Dashboard-specific hooks for data fetching
 */
import { useApi, invalidateQueries } from './useApi'
import { api, TestRun, Project } from '../api'

interface UseDashboardDataOptions {
    selectedProject?: string
    enabled?: boolean
}

interface DashboardData {
    testRuns: TestRun[]
    projects: Project[]
}

/**
 * Hook for fetching dashboard data with caching
 */
export function useDashboardData(options: UseDashboardDataOptions = {}) {
    const { selectedProject = 'none', enabled = true } = options

    // Fetch test runs
    const testRunsQuery = useApi<TestRun[]>(
        `testRuns-${selectedProject}`,
        async () => {
            const projectId = selectedProject !== 'none' ? selectedProject : undefined
            const response = await api.listTestRuns(projectId)
            return response.testRuns
        },
        {
            enabled,
            staleTime: 10 * 1000, // 10 seconds
            refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
            initialData: [],
        }
    )

    // Fetch projects
    const projectsQuery = useApi<Project[]>(
        'projects',
        async () => {
            const response = await api.listProjects()
            return response.projects
        },
        {
            enabled,
            staleTime: 60 * 1000, // 1 minute (projects change less frequently)
            cacheTime: 5 * 60 * 1000, // 5 minutes
            initialData: [],
        }
    )

    // Combined loading state
    const isLoading = testRunsQuery.isLoading || projectsQuery.isLoading
    const isFetching = testRunsQuery.isFetching || projectsQuery.isFetching
    const isError = testRunsQuery.isError || projectsQuery.isError
    const error = testRunsQuery.error || projectsQuery.error

    // Refresh all data
    const refetch = async () => {
        await Promise.all([testRunsQuery.refetch(), projectsQuery.refetch()])
    }

    // Invalidate all dashboard data
    const invalidate = () => {
        testRunsQuery.invalidate()
        projectsQuery.invalidate()
    }

    return {
        testRuns: testRunsQuery.data || [],
        projects: projectsQuery.data || [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        invalidate,
        // Expose individual query states if needed
        testRunsQuery,
        projectsQuery,
    }
}

/**
 * Hook for fetching a single test run with polling
 */
export function useTestRun(runId: string | null, pollInterval?: number) {
    return useApi(
        `testRun-${runId}`,
        async () => {
            if (!runId) throw new Error('No run ID')
            const response = await api.getTestRun(runId)
            return response.testRun
        },
        {
            enabled: !!runId,
            staleTime: 2 * 1000, // 2 seconds for active tests
            refetchInterval: pollInterval, // Optional polling
        }
    )
}

/**
 * Hook for fetching tier information
 * @param enabled - Set to true when user is authenticated
 */
export function useTierInfo(enabled: boolean = true) {
    return useApi(
        'tierInfo',
        async () => {
            const response = await api.getTierInfo()
            return response
        },
        {
            enabled,
            staleTime: 5 * 60 * 1000, // 5 minutes (rarely changes)
            cacheTime: 10 * 60 * 1000, // 10 minutes
        }
    )
}

/**
 * Invalidate test runs cache (call after creating/deleting tests)
 */
export function invalidateTestRuns() {
    invalidateQueries('testRuns')
    invalidateQueries('testRun')
}

/**
 * Invalidate projects cache (call after creating/deleting projects)
 */
export function invalidateProjects() {
    invalidateQueries('projects')
}
