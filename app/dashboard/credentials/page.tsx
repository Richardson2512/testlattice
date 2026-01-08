'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar' // Assuming there is a common layout or sidebar component, but I'll stick to a standalone page if needed or use a Layout wrapper if present.
import { api } from '@/lib/api'
import { Card } from '@/components/ui/card' // Assuming shadcn-like components exist
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Key, Edit, Save, X } from 'lucide-react'
import { toast } from 'sonner' // Assuming sonner is used for toasts based on typical next/shadcn stacks

// Types
interface Credential {
    id: string
    name: string
    username?: string
    email?: string
    password_encrypted: string // We display this masked
    created_at: string
}

export default function CredentialsPage() {
    const [credentials, setCredentials] = useState<Credential[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newCred, setNewCred] = useState({ name: '', username: '', email: '', password: '' })
    const [editingId, setEditingId] = useState<string | null>(null)

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = async () => {
        try {
            setLoading(true)
            const res = await api.getCredentials() // We need to add this to lib/api
            setCredentials(res.credentials || [])
        } catch (error) {
            console.error('Failed to fetch credentials', error)
            toast.error('Failed to load credentials')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!newCred.password) {
                toast.error('Password is required')
                return
            }

            await api.createCredential(newCred)
            toast.success('Credential created')
            setShowAddForm(false)
            setNewCred({ name: '', username: '', email: '', password: '' })
            fetchCredentials()
        } catch (error) {
            toast.error('Failed to create credential')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this credential?')) return
        try {
            await api.deleteCredential(id)
            toast.success('Credential deleted')
            setCredentials(prev => prev.filter(c => c.id !== id))
        } catch (error) {
            toast.error('Failed to delete credential')
        }
    }

    // Placeholder for api.createCredential and api.deleteCredential since I haven't added them to lib/api yet
    // I will add them in the next step.

    return (
        <div className="flex h-screen bg-[var(--bg-primary)]">
            {/* Sidebar would typically be in a layout, but if I'm creating a page inside app/dashboard, it might inherit layout */}

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Credentials</h1>
                            <p className="text-[var(--text-secondary)]">Manage test accounts for login flows.</p>
                        </div>
                        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-[var(--primary)] text-white gap-2">
                            <Plus size={16} /> Add Credential
                        </Button>
                    </div>

                    {/* Add Form */}
                    {showAddForm && (
                        <Card className="p-6 mb-8 border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name (e.g. Staging Admin)</Label>
                                        <Input
                                            id="name"
                                            value={newCred.name}
                                            onChange={e => setNewCred({ ...newCred, name: e.target.value })}
                                            placeholder="My Test Account"
                                            required
                                            className="bg-[var(--bg-tertiary)] border-[var(--border-subtle)]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={newCred.email}
                                            onChange={e => setNewCred({ ...newCred, email: e.target.value })}
                                            placeholder="admin@example.com"
                                            className="bg-[var(--bg-tertiary)] border-[var(--border-subtle)]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username (Optional)</Label>
                                        <Input
                                            id="username"
                                            value={newCred.username}
                                            onChange={e => setNewCred({ ...newCred, username: e.target.value })}
                                            placeholder="admin_user"
                                            className="bg-[var(--bg-tertiary)] border-[var(--border-subtle)]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={newCred.password}
                                            onChange={e => setNewCred({ ...newCred, password: e.target.value })}
                                            placeholder="••••••••"
                                            required
                                            className="bg-[var(--bg-tertiary)] border-[var(--border-subtle)]"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-[var(--primary)] text-white">Save Credential</Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {/* List */}
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                        </div>
                    ) : credentials.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-[var(--border-subtle)] rounded-lg">
                            <Key className="mx-auto h-12 w-12 text-[var(--text-muted)] mb-4" />
                            <h3 className="text-lg font-medium text-[var(--text-primary)]">No credentials found</h3>
                            <p className="text-[var(--text-muted)] mt-1">Add credentials manually or run a guest test to capture them automatically.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {credentials.map(cred => (
                                <Card key={cred.id} className="p-4 flex items-center justify-between border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--primary)] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-[var(--bg-tertiary)] rounded-full">
                                            <Key className="h-5 w-5 text-[var(--primary)]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--text-primary)]">{cred.name}</h3>
                                            <div className="text-sm text-[var(--text-secondary)] flex gap-4 mt-1">
                                                {cred.email && <span>{cred.email}</span>}
                                                {cred.username && <span>@{cred.username}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(cred.id)}
                                            className="text-[var(--state-error-text)] hover:text-[var(--state-error-text)] hover:bg-[var(--state-error-bg)]"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
