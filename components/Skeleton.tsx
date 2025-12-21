'use client'

import React from 'react'

interface SkeletonProps {
    /** Width of the skeleton (CSS value) */
    width?: string | number
    /** Height of the skeleton (CSS value) */
    height?: string | number
    /** Border radius */
    borderRadius?: string
    /** Additional inline styles */
    style?: React.CSSProperties
    /** Additional CSS class */
    className?: string
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({
    width = '100%',
    height = '1rem',
    borderRadius = 'var(--radius-sm)',
    style,
    className,
}: SkeletonProps) {
    return (
        <div
            className={className}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius,
                background: 'linear-gradient(90deg, var(--beige-100) 25%, var(--beige-50) 50%, var(--beige-100) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                ...style,
            }}
        />
    )
}

/**
 * Skeleton for stat cards in dashboard
 */
export function StatCardSkeleton() {
    return (
        <div
            className="glass-card"
            style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Skeleton width="60%" height="0.8rem" />
                <Skeleton width="1.25rem" height="1.25rem" borderRadius="var(--radius-full)" />
            </div>
            <Skeleton width="40%" height="2rem" />
            <Skeleton width="50%" height="0.8rem" />
        </div>
    )
}

/**
 * Skeleton for project cards
 */
export function ProjectCardSkeleton() {
    return (
        <div
            className="glass-card"
            style={{
                padding: '1.25rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Skeleton width="40px" height="40px" borderRadius="var(--radius-md)" />
                <Skeleton width="20px" height="20px" borderRadius="var(--radius-full)" />
            </div>
            <Skeleton width="70%" height="1rem" style={{ marginBottom: '0.75rem' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Skeleton width="60px" height="24px" borderRadius="var(--radius-sm)" />
                <Skeleton width="50px" height="24px" borderRadius="var(--radius-sm)" />
            </div>
        </div>
    )
}

/**
 * Skeleton for table rows
 */
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <tr>
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} style={{ padding: '0.75rem 1.25rem' }}>
                    <Skeleton
                        width={i === 0 ? '80px' : i === columns - 1 ? '60px' : '100%'}
                        height="1rem"
                    />
                </td>
            ))}
        </tr>
    )
}

/**
 * Skeleton for the entire dashboard
 */
export function DashboardSkeleton() {
    return (
        <div style={{ minHeight: '100vh', fontFamily: 'var(--font-sans)', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px' }}>
                {/* Header skeleton */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <Skeleton width="150px" height="1.75rem" style={{ marginBottom: '0.5rem' }} />
                        <Skeleton width="250px" height="0.9rem" />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Skeleton width="120px" height="40px" borderRadius="var(--radius-md)" />
                        <Skeleton width="80px" height="40px" borderRadius="var(--radius-md)" />
                        <Skeleton width="110px" height="40px" borderRadius="var(--radius-md)" />
                    </div>
                </div>

                {/* Stats grid skeleton */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                </div>

                {/* Content skeleton */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    {/* Table skeleton */}
                    <div className="glass-card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                            <Skeleton width="150px" height="1rem" />
                            <Skeleton width="70px" height="0.85rem" />
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--beige-50)' }}>
                                    {['Status', 'Project', 'URL', 'Date'].map((_, i) => (
                                        <th key={i} style={{ padding: '0.75rem 1.25rem', textAlign: 'left' }}>
                                            <Skeleton width="60px" height="0.75rem" />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <TableRowSkeleton key={i} columns={4} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Projects skeleton */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <Skeleton width="80px" height="1rem" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for shimmer animation */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    )
}

/**
 * Skeleton for test run card
 */
export function TestRunCardSkeleton() {
    return (
        <div
            className="glass-card"
            style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="80px" height="24px" borderRadius="var(--radius-full)" />
                <Skeleton width="100px" height="0.8rem" />
            </div>
            <Skeleton width="90%" height="1rem" />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Skeleton width="100px" height="28px" borderRadius="var(--radius-sm)" />
                <Skeleton width="80px" height="28px" borderRadius="var(--radius-sm)" />
            </div>
        </div>
    )
}

/**
 * Inline loading indicator for fetching state  
 */
export function FetchingIndicator({ show }: { show: boolean }) {
    if (!show) return null

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                padding: '0.25rem 0.5rem',
                background: 'var(--beige-50)',
                borderRadius: 'var(--radius-sm)',
            }}
        >
            <span
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--info)',
                    animation: 'pulse 1s infinite',
                }}
            />
            Refreshing...
            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </div>
    )
}
