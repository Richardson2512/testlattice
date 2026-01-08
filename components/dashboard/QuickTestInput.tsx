'use client'

import React, { useState } from 'react'

interface QuickTestInputProps {
    defaultUrl?: string // e.g. from project settings
    onRunTest: (instructions: string, url: string) => void
    isSubmitting: boolean
}

export function QuickTestInput({ defaultUrl = '', onRunTest, isSubmitting }: QuickTestInputProps) {
    const [instructions, setInstructions] = useState('')
    const [url, setUrl] = useState(defaultUrl)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!instructions.trim() || !url.trim()) return
        onRunTest(instructions, url)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto my-12">
            <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-3xl">🤖</span>
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
                What would you like to test?
            </h2>

            <form onSubmit={handleSubmit} className="w-full glass-card p-6 border border-[var(--border-medium)] shadow-lg relative overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-opacity-20">

                {/* Main Instruction Input */}
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="What would you like to test? Start typing or select a suggestion below..."
                    className="w-full bg-transparent border-none outline-none text-[var(--text-primary)] text-lg placeholder-[var(--text-muted)] resize-none mb-4"
                    rows={2}
                    disabled={isSubmitting}
                    style={{ fontFamily: 'var(--font-sans)' }} // Ensure League Spartan
                    autoFocus
                />

                <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-[var(--border-light)]">
                    {/* URL Input pill */}
                    <div className="flex-1 flex items-center bg-[var(--bg-primary)] rounded-md px-3 py-2 border border-[var(--border-light)] focus-within:border-[var(--primary)] transition-colors">
                        <span className="text-sm mr-2 shrink-0">🌐</span>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text-secondary)] font-medium"
                            required
                        />
                    </div>

                    <div className="text-xs text-[var(--text-muted)] font-mono">
                        0/1024
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !instructions.trim() || !url.trim()}
                        className="btn btn-primary px-6 py-2 rounded-md font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin">⏳</span> Starting...
                            </>
                        ) : (
                            <>
                                <span>▶</span> Run
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
