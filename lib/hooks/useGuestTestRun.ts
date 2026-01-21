import { useState, useEffect, useRef, useCallback } from 'react'
import { api, TestRun } from '../api'

export function useGuestTestRun(testId: string) {
  const [testRun, setTestRun] = useState<TestRun | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastFrame, setLastFrame] = useState<string | undefined>(undefined)
  const wsRef = useRef<WebSocket | null>(null)

  // Verification State
  const [verificationRequired, setVerificationRequired] = useState(false)
  const [verificationType, setVerificationType] = useState<'email' | 'magic_link' | 'otp' | 'sms'>('email')
  const [verificationTimeoutMs, setVerificationTimeoutMs] = useState(120000)

  const loadData = useCallback(async () => {
    try {
      const { testRun: currentTestRun } = await api.getTestRun(testId)

      setTestRun(prev => {
        if (!prev) return currentTestRun
        if (prev.status !== currentTestRun.status) return currentTestRun
        if ((prev.steps?.length || 0) !== (currentTestRun.steps?.length || 0)) return currentTestRun
        return prev
      })

      setLoading(false)

      if (currentTestRun?.steps && currentTestRun.steps.length > 0) {
        setLastFrame(prev => {
          if (prev) return prev // If we already have a frame (e.g. from WS), keep it

          // Fallback: try to get frame from steps
          const lastStepWithScreenshot = [...(currentTestRun.steps || [])]
            .reverse()
            .find((s) => s.screenshotUrl)

          return lastStepWithScreenshot?.screenshotUrl || prev
        })
      }
    } catch (e: any) {
      console.error("Load failed", e)
      if (!e.message?.includes("404") && !e.message?.includes("not found")) {
        setLoading(false)
      }
    }
  }, [testId]) // Stable dependency

  const lastWsMessageTime = useRef<number>(0)

  // Initial Load
  useEffect(() => {
    loadData()
  }, [loadData])

  // Polling - Use faster interval for active tests
  useEffect(() => {
    const activeStatuses = ['running', 'queued', 'diagnosing', 'pending']
    const isActive = !testRun || activeStatuses.includes(testRun?.status || '')

    // Fast polling (2s) for active tests, slow polling (10s) otherwise
    const pollInterval = isActive ? 2000 : 10000

    const interval = setInterval(() => {
      // Adaptive Polling:
      // Only skip polling if we've received a WS message recently AND test is still running
      // Always poll for completed/failed to ensure final status is captured
      if (Date.now() - lastWsMessageTime.current < 5000 && testRun?.status === 'running') {
        return
      }

      // Only poll if we don't have a status or if the status indicates it's active
      if (isActive) {
        loadData()
      }
    }, pollInterval)
    return () => clearInterval(interval)
  }, [loadData, testRun?.status])

  // WebSocket - Connect for any active status, not just 'running'
  useEffect(() => {
    // Connect WebSocket for any active test status
    const activeStatuses = ['running', 'queued', 'pending', 'diagnosing']
    const isActive = testRun && activeStatuses.includes(testRun.status)

    if (!isActive) {
      // Clean up if not active
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      return
    }

    // Check if we already have an active connection
    if (wsRef.current?.readyState === WebSocket.OPEN) return
    if (wsRef.current?.readyState === WebSocket.CONNECTING) return

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
    const ws = new WebSocket(`${wsUrl}/ws/test-control?runId=${testId}`)

    ws.onopen = () => console.log("Guest Stream Connected")

    ws.onmessage = (event) => {
      try {
        lastWsMessageTime.current = Date.now()
        const msg = JSON.parse(event.data)

        if (msg.type === 'test_status' && msg.status) {
          setTestRun(prev => prev ? ({ ...prev, status: msg.status }) : null)
        }

        if (msg.type === "page_state" && msg.state?.screenshot) {
          setLastFrame(msg.state.screenshot)
        }

        if (msg.type === "test_step" && msg.step) {
          setTestRun((prev) =>
            prev ? { ...prev, steps: [...(prev.steps || []), msg.step] } : null
          )
        }

        if (msg.type === "test_log" && msg.log) {
          const logStep = {
            id: `log-${Date.now()}`,
            stepNumber: 0,
            action: 'log',
            description: msg.log.message,
            timestamp: new Date().toISOString(),
            success: true
          }
          setTestRun((prev) =>
            prev ? { ...prev, steps: [...(prev.steps || []), logStep] } : null
          )
        }

        if (msg.type === "verification_required") {
          setVerificationType(msg.context.verificationType || "email")
          setVerificationTimeoutMs(msg.context.timeoutMs || 120000)
          setVerificationRequired(true)
        }

        if (msg.type === "verification_input_received") {
          setVerificationRequired(false)
        }
      } catch (e) {
        console.error("WS Parse Error", e)
      }
    }

    wsRef.current = ws
    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [testId, testRun?.status])

  const submitVerification = async (inputType: "link" | "otp", value: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
    const response = await fetch(
      `${apiUrl}/api/tests/${testId}/verification-input`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputType, value }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to submit verification")
    }
    setVerificationRequired(false)
  }

  return {
    testRun,
    loading,
    lastFrame,
    verificationRequired,
    verificationType,
    verificationTimeoutMs,
    submitVerification
  }
}
