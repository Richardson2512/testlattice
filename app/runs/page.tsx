'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDashboardData, useTierInfo } from '@/lib/hooks'
import { api, TestRun } from '@/lib/api'
import { FetchingIndicator } from '@/components/Skeleton'

export default function RunsPage() {
    const { testRuns, projects, isLoading, isFetching, refetch } = useDashboardData()
    const { data: tierInfo } = useTierInfo()
    const [downloadingId, setDownloadingId] = useState<string | null>(null)
    const [sharingId, setSharingId] = useState<string | null>(null)

    // Handle retention logic
    const getRetentionDays = () => {
        if (!tierInfo?.limits?.retentionDays) return 1 // Default to 1 day (24h) if not specified or 0
        return tierInfo.limits.retentionDays === 0 ? 1 : tierInfo.limits.retentionDays
    }

    const isRunExpired = (run: TestRun) => {
        const retentionDays = getRetentionDays()
        const runDate = new Date(run.createdAt)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - runDate.getTime())
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        return diffDays > retentionDays
    }

    const handleDownload = async (runId: string) => {
        try {
            setDownloadingId(runId)
            await api.downloadReport(runId)
        } catch (error: any) {
            alert(`Failed to download report: ${error.message}`)
        } finally {
            setDownloadingId(null)
        }
    }

    const handleShare = async (runId: string) => {
        try {
            setSharingId(runId)
            const result = await api.generateReport(runId)
            // Copy to clipboard or show modal
            await navigator.clipboard.writeText(window.location.origin + '/test/report/' + runId)
            alert('Report link copied to clipboard! (Note: Public access depends on your settings)')
        } catch (error: any) {
            alert(`Failed to share report: ${error.message}`)
        } finally {
            setSharingId(null)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'var(--success)'
            case 'failed': return 'var(--error)'
            case 'running': return 'var(--info)'
            default: return 'var(--text-muted)'
        }
    }

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'completed': return 'rgba(5, 150, 105, 0.1)'
            case 'failed': return 'rgba(220, 38, 38, 0.1)'
            case 'running': return 'rgba(37, 99, 235, 0.1)'
            default: return 'var(--beige-100)'
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: 'var(--font-sans)',
            padding: '2rem',
        }}>
            <div style={{ width: '100%' }}> {/* Fit to screen */}

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            margin: 0,
                            marginBottom: '0.25rem',
                        }}>Test Runs</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                                Manage and view your test history
                            </p>
                            <FetchingIndicator show={isFetching && !isLoading} />
                        </div>
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        background: 'var(--beige-100)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                    }}>
                        Retention: <strong>{getRetentionDays()} Days</strong>
                    </div>
                </div>

                {/* Runs List */}
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    {testRuns.length === 0 ? (
                        <div style={{
                            padding: '4rem',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
                            <h3>No test runs found</h3>
                            <p>Start your first test run from the dashboard.</p>
                            <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--beige-50)', borderBottom: '1px solid var(--border-medium)' }}>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Run Details</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Project</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Date</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testRuns.map((run, i) => {
                                    const expired = isRunExpired(run)
                                    const reportUrl = `/test/report/${run.id}`

                                    return (
                                        <tr
                                            key={run.id}
                                            style={{
                                                borderBottom: '1px solid var(--border-light)',
                                                background: 'transparent',
                                                transition: 'background 0.2s',
                                            }}
                                        >
                                            <td style={{ padding: '1rem 1.5rem', verticalAlign: 'middle' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '4px 12px',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    textTransform: 'capitalize',
                                                    background: getStatusBg(run.status),
                                                    color: getStatusColor(run.status),
                                                }}>
                                                    {run.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', verticalAlign: 'middle' }}>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                                    <Link href={reportUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        Run #{run.id.slice(0, 8)}
                                                    </Link>
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {run.build?.url || 'No URL'}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', verticalAlign: 'middle', color: 'var(--text-secondary)' }}>
                                                {projects.find(p => p.id === run.projectId)?.name || 'Unknown'}
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', verticalAlign: 'middle', color: 'var(--text-secondary)' }}>
                                                {new Date(run.createdAt).toLocaleString()}
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right', verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    {expired ? (
                                                        <span style={{
                                                            fontSize: '0.8rem',
                                                            color: 'var(--text-muted)',
                                                            background: 'var(--beige-200)',
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}>
                                                            <span>⚠️</span> Expired
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleShare(run.id)}
                                                                disabled={sharingId === run.id}
                                                                className="btn btn-secondary"
                                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                                title="Copy Report Link"
                                                            >
                                                                {sharingId === run.id ? '...' : '🔗 Share'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDownload(run.id)}
                                                                disabled={downloadingId === run.id}
                                                                className="btn btn-primary"
                                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                                title="Download Report (Wasabi)"
                                                            >
                                                                {downloadingId === run.id ? 'Downloading...' : '⬇ Download'}
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
