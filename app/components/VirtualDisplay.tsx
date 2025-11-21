'use client'

import { useState, useEffect } from 'react'

interface TestStep {
  id: string
  stepNumber: number
  action: string
  target?: string
  value?: string
  timestamp: string
  screenshotUrl?: string
  success: boolean
}

interface VirtualDisplayProps {
  steps: TestStep[]
  currentStep?: number
}

export default function VirtualDisplay({ steps, currentStep }: VirtualDisplayProps) {
  // Use currentStep if provided, otherwise default to last step
  const activeStepNumber = currentStep || steps.length || 1
  const [selectedStep, setSelectedStep] = useState(activeStepNumber)
  const activeStep = steps.find(s => s.stepNumber === selectedStep) || steps[0]
  
  // Update selected step when currentStep changes (for live updates)
  useEffect(() => {
    if (currentStep && currentStep !== selectedStep) {
      setSelectedStep(currentStep)
    }
  }, [currentStep])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '20px',
      marginTop: '20px',
    }}>
      {/* Main Display */}
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        padding: '20px',
        minHeight: '600px',
        position: 'relative',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid #667eea',
        }}>
          {activeStep?.screenshotUrl ? (
            <iframe
              src={activeStep.screenshotUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title={`Step ${activeStep.stepNumber} Screenshot`}
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#666',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📱</div>
              <div>Virtual Display</div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>Step {activeStep?.stepNumber || 1}</div>
            </div>
          )}
          
          {/* Overlay showing action */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            {activeStep?.action?.toUpperCase() || 'IDLE'}
          </div>

          {/* Step indicator */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: activeStep?.success ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
          }}>
            {activeStep?.success ? '✓' : '✗'} Step {activeStep?.stepNumber || 1}
          </div>
        </div>

        {/* Action details */}
        {activeStep && (
          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
          }}>
            <div style={{ color: '#fff', marginBottom: '10px' }}>
              <strong>Action:</strong> {activeStep.action}
            </div>
            {activeStep.target && (
              <div style={{ color: '#ccc', marginBottom: '10px' }}>
                <strong>Target:</strong> {activeStep.target}
              </div>
            )}
            {activeStep.value && (
              <div style={{ color: '#ccc', marginBottom: '10px' }}>
                <strong>Value:</strong> {activeStep.value}
              </div>
            )}
            <div style={{ color: '#999', fontSize: '12px' }}>
              <strong>Time:</strong> {new Date(activeStep.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Step Timeline */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '20px',
        maxHeight: '600px',
        overflowY: 'auto',
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Test Steps</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => setSelectedStep(step.stepNumber)}
              style={{
                padding: '15px',
                backgroundColor: selectedStep === step.stepNumber ? '#667eea' : 'white',
                color: selectedStep === step.stepNumber ? 'white' : '#333',
                borderRadius: '6px',
                cursor: 'pointer',
                border: `2px solid ${selectedStep === step.stepNumber ? '#667eea' : '#e5e7eb'}`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (selectedStep !== step.stepNumber) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStep !== step.stepNumber) {
                  e.currentTarget.style.backgroundColor = 'white'
                }
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
              }}>
                <span style={{ fontWeight: '600' }}>Step {step.stepNumber}</span>
                <span style={{
                  fontSize: '12px',
                  color: step.success ? (selectedStep === step.stepNumber ? '#86efac' : '#10b981') : '#ef4444',
                }}>
                  {step.success ? '✓' : '✗'}
                </span>
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                {step.action}
              </div>
              {step.target && (
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                  → {step.target}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Playback controls */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '6px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
            disabled={selectedStep === 1}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedStep === 1 ? '#e5e7eb' : '#667eea',
              color: selectedStep === 1 ? '#999' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedStep === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => {
              const interval = setInterval(() => {
                setSelectedStep((prev) => {
                  if (prev >= steps.length) {
                    clearInterval(interval)
                    return prev
                  }
                  return prev + 1
                })
              }, 1000)
              setTimeout(() => clearInterval(interval), (steps.length - selectedStep) * 1000)
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ▶ Play
          </button>
          <button
            onClick={() => setSelectedStep(Math.min(steps.length, selectedStep + 1))}
            disabled={selectedStep === steps.length}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedStep === steps.length ? '#e5e7eb' : '#667eea',
              color: selectedStep === steps.length ? '#999' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedStep === steps.length ? 'not-allowed' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

