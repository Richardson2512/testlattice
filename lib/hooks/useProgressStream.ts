import { useState, useEffect } from 'react'

export interface DiagnosisProgress {
    step: number
    totalSteps: number
    stepLabel: string
    subStep: number
    totalSubSteps: number
    subStepLabel?: string
    percent: number
}

export function useProgressStream(testId: string, enabled: boolean) {
    const [progress, setProgress] = useState<DiagnosisProgress | null>(null)

    useEffect(() => {
        if (!enabled || !testId) return

        // Connect to API SSE endpoint
        // Using relative path assumes frontend proxies /api to backend
        // or backend is on same domain. If separate, might need full URL.
        // Given existing api.ts uses relative /api or configured base, we check env.
        // Usually /api is proxied or CORS allows it.
        // We'll try relative path first as typical in Next.js + API setups.
        // But wait, the backend runs on port 3001 typically (API).
        // Frontend runs on 3000.
        // We might need NEXT_PUBLIC_API_URL or get it from config.

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const url = `${apiUrl}/api/tests/${testId}/progress`

        const eventSource = new EventSource(url)

        eventSource.onopen = () => {
            // connection established
        }

        eventSource.onmessage = (event) => {
            try {
                // Ignore heartbeats or comments checking
                if (!event.data || event.data.trim().startsWith(':')) return

                const data = JSON.parse(event.data)
                setProgress(data)
            } catch (e) {
                // Silent fail on parse error
            }
        }

        eventSource.onerror = (err) => {
            console.debug('Progress stream disconnected (likely complete or network issue)')
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [testId, enabled])

    return progress
}
