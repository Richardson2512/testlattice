'use client'

import React from 'react'
import { Project } from '../../lib/api'

interface ProjectsTableProps {
    projects: Project[]
    testRuns: any[] // Just used for counting execution
    onSelectProject: (id: string) => void
    userName?: string
}

export function ProjectsTable({ projects, testRuns, onSelectProject, userName }: ProjectsTableProps) {
    const getRunCount = (projectId: string) => {
        return testRuns.filter(r => r.projectId === projectId).length
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Projects
                </h2>
            </div>

            <div className="glass-card overflow-hidden">
                {projects.length === 0 ? (
                    <div className="p-12 text-center text-[var(--text-muted)]">
                        <div className="text-2xl mb-2">📦</div>
                        <p>No projects yet.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--border-light)] bg-[var(--beige-100)]">
                                <th className="text-left py-3 px-5 font-semibold text-[var(--text-secondary)] text-xs uppercase tracking-wider w-1/2">
                                    Project
                                </th>
                                <th className="text-left py-3 px-5 font-semibold text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                                    Total Executions
                                </th>
                                <th className="text-left py-3 px-5 font-semibold text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                                    Created By
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, i) => (
                                <tr
                                    key={project.id}
                                    onClick={() => onSelectProject(project.id)}
                                    className="cursor-pointer hover:bg-[var(--beige-50)] transition-colors border-b border-[var(--border-light)] last:border-0"
                                >
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--beige-200)] to-[var(--beige-100)] flex items-center justify-center text-lg">
                                                📦
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[var(--text-primary)]">{project.name}</div>
                                                {project.description && (
                                                    <div className="text-xs text-[var(--text-muted)] max-w-[200px] truncate">{project.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-[var(--text-secondary)] font-medium">
                                        {getRunCount(project.id)}
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
                                                {(userName?.[0] || 'U').toUpperCase()}
                                            </div>
                                            <span className="text-[var(--text-secondary)]">{userName || 'You'}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
