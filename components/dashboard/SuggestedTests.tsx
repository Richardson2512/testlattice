'use client'

import React from 'react'

interface SuggestedTestsProps {
    onSelectSuggestion: (instructions: string) => void
}

const SUGGESTIONS = [
    {
        title: 'Test page navigation',
        description: 'Check all links and navigation menus work properly',
        prompt: 'Navigate through all main menu items and ensure no broken links or 404 errors.'
    },
    {
        title: 'Check forms functionality',
        description: 'Verify all forms work and handle validation',
        prompt: 'Find all forms on the page, try submitting empty data to check validation, then submit valid data.'
    },
    {
        title: 'Test responsive design',
        description: 'Verify layout on mobile and tablet viewports',
        prompt: 'Check the page layout on mobile (375px) and tablet (768px) to ensure no elements overlap or break.'
    },
    {
        title: 'Check interactive elements',
        description: 'Click buttons, dropdowns, and modals',
        prompt: 'Interact with all buttons, dropdowns, and modals to ensure they open/close and trigger expected actions.'
    }
]

export function SuggestedTests({ onSelectSuggestion }: SuggestedTestsProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🤖</span> Suggested tests
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUGGESTIONS.map((suggestion, i) => (
                    <button
                        key={i}
                        onClick={() => onSelectSuggestion(suggestion.prompt)}
                        className="group text-left p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-light)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200"
                    >
                        <div className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                            {suggestion.title}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                            {suggestion.description}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
