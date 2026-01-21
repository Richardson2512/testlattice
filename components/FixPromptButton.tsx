'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface FixPromptButtonProps {
  testRunId: string
  testStatus: string
  userTier?: 'guest' | 'starter' | 'indie' | 'pro' | 'agency'
  onPromptGenerated?: (prompt: string) => void
}

interface Model {
  id: string
  name: string
  provider: string
  recommended?: boolean
}

export function FixPromptButton({
  testRunId,
  testStatus,
  userTier,
  onPromptGenerated,
}: FixPromptButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [models, setModels] = useState<Model[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [recommendedModel, setRecommendedModel] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingPrompt, setExistingPrompt] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const isPaidUser = userTier && ['starter', 'indie', 'pro', 'agency'].includes(userTier)
  const isCompleted = testStatus === 'completed' || testStatus === 'failed'
  const canGenerate = isPaidUser && isCompleted

  useEffect(() => {
    if (showModal && models.length === 0) {
      loadModels()
    }
    if (showModal) {
      checkExistingPrompt()
    }
  }, [showModal, testRunId])

  async function loadModels() {
    try {
      const response = await api.getFixPromptModels()
      setModels(response.models)
      setRecommendedModel(response.recommended)
      setSelectedModel(response.recommended)
    } catch (err: any) {
      setError(err.message || 'Failed to load models')
    }
  }

  async function checkExistingPrompt() {
    try {
      const response = await api.getFixPrompt(testRunId)
      if (response.fixPrompt) {
        setExistingPrompt(response.fixPrompt.prompt)
        if (onPromptGenerated) {
          onPromptGenerated(response.fixPrompt.prompt)
        }
      }
    } catch (err: any) {
      // Ignore 404 errors
      if (!err.message?.includes('404')) {
        console.error('Failed to check existing prompt:', err)
      }
    }
  }

  async function handleGenerate() {
    if (!selectedModel) {
      setError('Please select a model')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await api.generateFixPrompt(testRunId, selectedModel)
      setExistingPrompt(response.fixPrompt.prompt)
      setShowModal(false)
      if (onPromptGenerated) {
        onPromptGenerated(response.fixPrompt.prompt)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate fix prompt')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!canGenerate) {
    return (
      <button
        disabled
        title={!isPaidUser ? 'Upgrade to a paid plan to use this feature' : 'Test must be completed'}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-muted)',
          cursor: 'not-allowed',
          fontSize: '0.9rem',
          opacity: 0.6,
        }}
      >
        Generate Fix Prompt
      </button>
    )
  }

  if (existingPrompt) {
    return (
      <button
        disabled
        title="Fix prompt already generated for this test run"
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-muted)',
          cursor: 'not-allowed',
          fontSize: '0.9rem',
          opacity: 0.6,
        }}
      >
        Fix Prompt Generated
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--primary)',
          color: 'var(--text-inverse)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--primary-hover)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--primary)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Generate Fix Prompt
      </button>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false)
            }
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              Generate Fix Prompt
            </h2>

            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Select an AI model to generate a debugging prompt. This prompt can be pasted into Cursor, ChatGPT, or GitHub Copilot to help debug issues found during testing.
            </p>

            {error && (
              <div
                style={{
                  padding: '0.75rem',
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid var(--error)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--error)',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isGenerating}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                }}
              >
                {models.length === 0 && (
                  <option value="">Loading models...</option>
                )}
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} {model.recommended ? '(Recommended)' : ''} - {model.provider}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                padding: '0.75rem',
                background: 'var(--beige-100)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}
            >
              <strong>Note:</strong> You can only generate one fix prompt per test run. The generated prompt will be saved and can be edited before copying.
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                disabled={isGenerating}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-secondary)',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !selectedModel}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: isGenerating || !selectedModel ? 'var(--bg-secondary)' : 'var(--primary)',
                  color: isGenerating || !selectedModel ? 'var(--text-muted)' : 'var(--text-inverse)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: isGenerating || !selectedModel ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {isGenerating ? 'Generating...' : 'Generate Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

