'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { api, Project, TestRun } from '@/lib/api'
import { useDashboardData, invalidateProjects } from '@/lib/hooks'

export default function ProjectDetailsPage() {
    const params = useParams()
    const projectId = params.id as string
    const router = useRouter()
    // const { projects } = useDashboardData() // Could use this but simpler to fetch directly for freshness
    const [project, setProject] = useState<Project | null>(null)
    const [testRuns, setTestRuns] = useState<TestRun[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Edit State
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() => {
        async function fetchProject() {
            if (!projectId) return

            try {
                setLoading(true)
                const { project } = await api.getProject(projectId)
                setProject(project)
                setEditName(project.name)
                setEditDescription(project.description || '')

                // Fetch test runs
                const { testRuns } = await api.listTestRuns(projectId)
                setTestRuns(testRuns)
            } catch (err: any) {
                setError(err.message || 'Failed to load project')
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [projectId])

    async function handleSave() {
        if (!project) return
        try {
            setSaveLoading(true)
            const { project: updated } = await api.updateProject(project.id, {
                name: editName,
                description: editDescription
            })
            setProject(updated)
            setIsEditing(false)
            invalidateProjects() // Update global cache
        } catch (err: any) {
            alert(`Failed to save: ${err.message}`)
        } finally {
            setSaveLoading(false)
        }
    }

    async function handleDelete() {
        if (!project || !confirm('Are you sure you want to delete this project? This cannot be undone.')) return

        try {
            await api.deleteProject(project.id)
            invalidateProjects()
            router.push('/dashboard/projects')
        } catch (err: any) {
            alert(`Failed to delete: ${err.message}`)
        }
    }

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading project...</div>
    if (error || !project) return <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>Error: {error || 'Project not found'}</div>

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '2rem',
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ flex: 1 }}>
                    {isEditing ? (
                        <div style={{ maxWidth: '600px' }}>
                            <input
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-medium)',
                                    background: 'var(--bg-primary)'
                                }}
                            />
                            <textarea
                                value={editDescription}
                                onChange={e => setEditDescription(e.target.value)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-medium)',
                                    background: 'var(--bg-primary)',
                                    minHeight: '80px'
                                }}
                            />
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={handleSave}
                                    disabled={saveLoading}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: saveLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {saveLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border-medium)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {project.name}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        fontSize: '0.875rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'var(--bg-secondary)',
                                        border: 'none',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'pointer',
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    Edit
                                </button>
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                {project.description || 'No description provided'}
                            </p>
                            <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Project ID: {project.id}
                            </div>
                        </>
                    )}
                </div>

                <div>
                    {!isEditing && (
                        <button
                            onClick={handleDelete}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#fee2e2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Delete Project
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Total Tests</h4>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{testRuns.length}</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Last Run</h4>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {testRuns[0] ? new Date(testRuns[0].createdAt).toLocaleDateString() : 'Never'}
                    </div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Status</h4>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--success)' }}>Active</div>
                </div>
            </div>

            {/* Test Runs List */}
            <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Test Runs</h2>
                {testRuns.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-medium)' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No test runs yet.</p>
                    </div>
                ) : (
                    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-medium)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Run ID</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testRuns.map(run => (
                                    <tr key={run.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontFamily: 'monospace' }}>{run.id.substring(0, 8)}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                background: run.status === 'completed' ? '#dcfce7' : run.status === 'failed' ? '#fee2e2' : '#e0f2fe',
                                                color: run.status === 'completed' ? '#166534' : run.status === 'failed' ? '#991b1b' : '#075985'
                                            }}>
                                                {run.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{new Date(run.createdAt).toLocaleString()}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => router.push(`/test/run/${run.id}`)}
                                                style={{
                                                    padding: '0.25rem 0.75rem',
                                                    background: 'white',
                                                    border: '1px solid var(--border-medium)',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
