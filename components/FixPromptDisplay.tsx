'use client'

import { useState } from 'react'

interface FixPromptDisplayProps {
  prompt: string
  onEdit?: (newPrompt: string) => void
}

export function FixPromptDisplay({ prompt, onEdit }: FixPromptDisplayProps) {
  const [editedPrompt, setEditedPrompt] = useState(prompt)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditedPrompt(newValue)
    if (onEdit) {
      onEdit(newValue)
    }
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginTop: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Fix Prompt
        </h3>
        <button
          onClick={handleCopy}
          style={{
            padding: '0.5rem 1rem',
            background: copied ? 'var(--success)' : 'var(--primary)',
            color: 'var(--text-inverse)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {copied ? (
            <>
              <span>✓</span> Copied!
            </>
          ) : (
            <>
              <span>📋</span> Copy
            </>
          )}
        </button>
      </div>

      <textarea
        value={editedPrompt}
        onChange={handleChange}
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '1rem',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.6,
          resize: 'vertical',
        }}
        placeholder="Fix prompt will appear here..."
      />

      <p
        style={{
          marginTop: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
        }}
      >
        Paste this into Cursor, ChatGPT, or your coding AI to get help debugging the issues.
      </p>
    </div>
  )
}

