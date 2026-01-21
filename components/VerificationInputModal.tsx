'use client'

import React, { useState, useEffect, useRef } from 'react'

interface VerificationInputModalProps {
    isOpen: boolean
    verificationType: 'email' | 'magic_link' | 'otp' | 'sms'
    timeoutMs: number
    onSubmit: (inputType: 'link' | 'otp', value: string) => Promise<void>
    onClose?: () => void
}

/**
 * Verification Input Modal
 * 
 * Displayed when signup flow requires email verification or OTP.
 * User can paste the verification link or enter OTP code.
 */
export function VerificationInputModal({
    isOpen,
    verificationType,
    timeoutMs,
    onSubmit,
    onClose,
}: VerificationInputModalProps) {
    const [inputValue, setInputValue] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(Math.floor(timeoutMs / 1000))
    const inputRef = useRef<HTMLInputElement>(null)

    const isOTP = verificationType === 'otp' || verificationType === 'sms'
    const inputType = isOTP ? 'otp' : 'link'

    // Countdown timer
    useEffect(() => {
        if (!isOpen) return

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isOpen])

    // Focus input on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setInputValue('')
            setError('')
            setTimeRemaining(Math.floor(timeoutMs / 1000))
        }
    }, [isOpen, timeoutMs])

    const handleSubmit = async () => {
        setError('')

        if (!inputValue.trim()) {
            setError(isOTP ? 'Please enter the OTP code' : 'Please enter the verification link')
            return
        }

        // Validate input
        if (isOTP) {
            if (!/^\d{4,8}$/.test(inputValue.trim())) {
                setError('OTP must be 4-8 digits')
                return
            }
        } else {
            try {
                new URL(inputValue.trim())
            } catch {
                setError('Please enter a valid URL')
                return
            }
        }

        setIsSubmitting(true)
        try {
            await onSubmit(inputType, inputValue.trim())
        } catch (err: any) {
            setError(err.message || 'Failed to submit verification')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
        }}>
            <div style={{
                backgroundColor: 'var(--bg-secondary, #1f2937)',
                borderRadius: '0.75rem',
                padding: '2rem',
                maxWidth: '480px',
                width: '90%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                        {isOTP ? '🔢' : '📧'}
                    </div>
                    <h2 style={{
                        color: '#fff',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        margin: '0 0 0.5rem 0'
                    }}>
                        {isOTP ? 'Enter OTP Code' : 'Paste Verification Link'}
                    </h2>
                    <p style={{
                        color: '#9ca3af',
                        fontSize: '0.875rem',
                        margin: 0
                    }}>
                        {isOTP
                            ? 'Enter the verification code sent to your email or phone'
                            : 'Check your email and paste the verification link below'
                        }
                    </p>
                </div>

                {/* Timer */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    color: timeRemaining <= 30 ? '#ef4444' : '#9ca3af',
                    fontSize: '0.875rem',
                }}>
                    ⏱️ Time remaining: <strong>{formatTime(timeRemaining)}</strong>
                </div>

                {/* Instructions */}
                <div style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{ color: '#60a5fa', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        📝 Instructions:
                    </div>
                    {isOTP ? (
                        <ol style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0, paddingLeft: '1.25rem' }}>
                            <li>Check your email or phone for the OTP</li>
                            <li>Enter the numerical code below</li>
                            <li>Click "Continue Test"</li>
                        </ol>
                    ) : (
                        <ol style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0, paddingLeft: '1.25rem' }}>
                            <li>Check your email inbox</li>
                            <li>Find the verification email</li>
                            <li>Copy the verification link (right-click → Copy link)</li>
                            <li>Paste it in the field below</li>
                        </ol>
                    )}
                </div>

                {/* Input Field */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>
                        {isOTP ? 'OTP Code' : 'Verification Link'}
                    </label>
                    <input
                        ref={inputRef}
                        type={isOTP ? 'text' : 'url'}
                        inputMode={isOTP ? 'numeric' : 'url'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        placeholder={isOTP ? 'Enter 6-digit code' : 'https://example.com/verify?token=...'}
                        disabled={isSubmitting || timeRemaining === 0}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            backgroundColor: '#374151',
                            color: '#fff',
                            border: error ? '2px solid #ef4444' : '1px solid #4b5563',
                            borderRadius: '0.5rem',
                            fontSize: isOTP ? '1.5rem' : '0.875rem',
                            fontFamily: isOTP ? 'monospace' : 'inherit',
                            textAlign: isOTP ? 'center' : 'left',
                            letterSpacing: isOTP ? '0.5rem' : 'normal',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        color: '#ef4444',
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Timeout Message */}
                {timeRemaining === 0 && (
                    <div style={{
                        color: '#ef4444',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        fontWeight: '600',
                    }}>
                        ⏱️ Time expired. The test will end.
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {onClose && (
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                backgroundColor: '#374151',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !inputValue.trim() || timeRemaining === 0}
                        style={{
                            flex: onClose ? 2 : 1,
                            padding: '0.75rem',
                            backgroundColor: isSubmitting || !inputValue.trim() || timeRemaining === 0
                                ? '#6b7280'
                                : '#10b981',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: isSubmitting || !inputValue.trim() || timeRemaining === 0
                                ? 'not-allowed'
                                : 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                        }}
                    >
                        {isSubmitting ? '⏳ Submitting...' : '✓ Continue Test'}
                    </button>
                </div>
            </div>
        </div>
    )
}
