'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api, Project } from '@/lib/api'
import { useDashboardData, invalidateProjects, useTierInfo } from '@/lib/hooks'
import { FetchingIndicator } from '@/components/Skeleton'
import { PRICING_TIERS, PricingTier } from '@/lib/pricing'

export default function ProjectsPage() {
    const router = useRouter()
    const { projects, isLoading, isFetching, refetch } = useDashboardData()
    const { data: tierInfo, isLoading: tierLoading } = useTierInfo(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    // Create Project State
    const [newProjectName, setNewProjectName] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('')

    // Redirect free tier users to dashboard - they don't have project access
    useEffect(() => {
        if (!tierLoading && tierInfo) {
            const tier = tierInfo.tier
            if (['free', 'guest'].includes(tier)) {
                router.replace('/dashboard')
            }
        }
    }, [tierInfo, tierLoading, router])

    // Get tier limits
    const tierKey = (tierInfo?.tier as PricingTier) || 'starter'
    const tierLimits = PRICING_TIERS[tierKey]?.limits || PRICING_TIERS.starter.limits
    const maxProjects = tierLimits.maxProjects
    const currentProjectCount = projects.length
    const canCreateProject = maxProjects === 'unlimited' || currentProjectCount < maxProjects
    const projectsRemaining = maxProjects === 'unlimited' ? '∞' : Math.max(0, maxProjects - currentProjectCount)

    // Don't render page for free users while redirecting
    if (tierLoading || ['free', 'guest'].includes(tierInfo?.tier || '')) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Loading...
            </div>
        )
    }

    async function handleCreateProject(e: React.FormEvent) {
        e.preventDefault()
        if (!canCreateProject) {
            alert(`You've reached your project limit (${maxProjects}). Upgrade to create more projects.`)
            return
        }
        setIsCreating(true)
        try {
            const { project } = await api.createProject({
                name: newProjectName,
                description: newProjectDescription,
                teamId: 'default-team', // TODO: Get from useUser hook
            })

            invalidateProjects()
            refetch()
            setShowCreateModal(false)
            setNewProjectName('')
            setNewProjectDescription('')
            router.push(`/dashboard/projects/${project.id}`)
        } catch (error: any) {
            alert(`Failed to create project: ${error.message}`)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Projects</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Manage your test suites • {currentProjectCount}/{maxProjects === 'unlimited' ? '∞' : maxProjects} projects used
                    </p>
                </div>
                <button
                    onClick={() => canCreateProject && setShowCreateModal(true)}
                    disabled={!canCreateProject}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: canCreateProject ? 'var(--primary)' : 'var(--bg-muted)',
                        color: canCreateProject ? 'white' : 'var(--text-muted)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        cursor: canCreateProject ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: canCreateProject ? 1 : 0.7,
                    }}
                    title={!canCreateProject ? `Project limit reached (${maxProjects}). Upgrade for more.` : ''}
                >
                    <span>+</span> {canCreateProject ? 'New Project' : 'Upgrade for More'}
                </button>
            </div>

            {isLoading && projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    Loading projects...
                </div>
            ) : projects.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px dashed var(--border-medium)'
                }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No projects yet</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Create your first project to start testing.</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Create Project
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {projects.map(project => (
                        <Link
                            key={project.id}
                            href={`/dashboard/projects/${project.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{
                                background: 'var(--bg-card)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-light)',
                                transition: 'all 0.2s',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                                className="hover-card"
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--beige-200)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    fontSize: '1.25rem'
                                }}>
                                    📦
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.name}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    flex: 1,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {project.description || 'No description provided'}
                                </p>
                                <div style={{
                                    marginTop: '1.5rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border-light)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        width: '100%',
                        maxWidth: '500px',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Create New Project</h2>
                        <form onSubmit={handleCreateProject}>
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Project Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newProjectName}
                                    onChange={e => setNewProjectName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-medium)',
                                        background: 'var(--bg-primary)'
                                    }}
                                    placeholder="e.g. My Awesome App"
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                                <textarea
                                    value={newProjectDescription}
                                    onChange={e => setNewProjectDescription(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-medium)',
                                        background: 'var(--bg-primary)',
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="What is this project about?"
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border-medium)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600,
                                        cursor: isCreating ? 'not-allowed' : 'pointer',
                                        opacity: isCreating ? 0.7 : 1
                                    }}
                                >
                                    {isCreating ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
