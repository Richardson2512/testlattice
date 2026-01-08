'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

// Types
interface Credential {
    id: string
    name: string
    username?: string
    email?: string
    password_encrypted: string
    created_at: string
}

// Simple Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '1rem 1.5rem',
            background: type === 'success' ? '#10B981' : '#EF4444',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'slideIn 0.3s ease-out forwards',
            fontWeight: 500,
            fontSize: '0.95rem',
        }}>
            <span>{type === 'success' ? '✅' : '❌'}</span>
            {message}
            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default function CredentialsPage() {
    const [credentials, setCredentials] = useState<Credential[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newCred, setNewCred] = useState({ name: '', username: '', email: '', password: '' })

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

    useEffect(() => {
        fetchCredentials()
    }, [])

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type })
    }

    const fetchCredentials = async () => {
        try {
            setLoading(true)
            const res = await api.getCredentials()
            setCredentials(res.credentials || [])
        } catch (error) {
            console.error('Failed to fetch credentials', error)
            showToast('Failed to load credentials', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!newCred.password) {
                showToast('Password is required', 'error')
                return
            }

            await api.createCredential(newCred)
            showToast('Credential created successfully!', 'success')
            setShowAddForm(false)
            setNewCred({ name: '', username: '', email: '', password: '' })
            fetchCredentials()
        } catch (error) {
            showToast('Failed to create credential', 'error')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this credential?')) return
        try {
            await api.deleteCredential(id)
            showToast('Credential deleted', 'success')
            setCredentials(prev => prev.filter(c => c.id !== id))
        } catch (error) {
            showToast('Failed to delete credential', 'error')
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: 'var(--font-sans)',
            padding: '2rem',
        }}>
            {/* Toast Container */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>

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
                        }}>Credentials</h1>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                            Manage test accounts for login flows.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        style={{
                            padding: '0.6rem 1.25rem',
                            background: 'var(--primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span>+</span> Add Credential
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                        <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Name (e.g. Staging Admin)</label>
                                    <input
                                        id="name"
                                        value={newCred.name}
                                        onChange={e => setNewCred({ ...newCred, name: e.target.value })}
                                        placeholder="My Test Account"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-medium)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={newCred.email}
                                        onChange={e => setNewCred({ ...newCred, email: e.target.value })}
                                        placeholder="admin@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-medium)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Username (Optional)</label>
                                    <input
                                        id="username"
                                        value={newCred.username}
                                        onChange={e => setNewCred({ ...newCred, username: e.target.value })}
                                        placeholder="admin_user"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-medium)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={newCred.password}
                                        onChange={e => setNewCred({ ...newCred, password: e.target.value })}
                                        placeholder="••••••••"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-medium)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifySelf: 'end', gap: '0.75rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border-medium)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        background: 'var(--primary)',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Save Credential
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid var(--primary)',
                            borderBottomColor: 'transparent',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <style jsx>{`
                            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                        `}</style>
                    </div>
                ) : credentials.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        border: '1px dashed var(--border-medium)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔑</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No credentials found</h3>
                        <p>Add credentials manually or run a guest test to capture them automatically.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {credentials.map(cred => (
                            <div key={cred.id} className="glass-card" style={{
                                padding: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        🔑
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cred.name}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {cred.email && <span>📧 {cred.email}</span>}
                                            {cred.username && <span>👤 @{cred.username}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(cred.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--state-error-text)',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        fontSize: '1.2rem',
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                                    title="Delete Credential"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
