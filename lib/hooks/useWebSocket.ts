/**
 * WebSocket hook with automatic reconnection and exponential backoff
 */
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseWebSocketOptions {
    /** Reconnect automatically on disconnect (default: true) */
    reconnect?: boolean
    /** Maximum reconnection attempts (default: 10) */
    maxReconnectAttempts?: number
    /** Base delay for reconnection in ms (default: 1000) */
    reconnectBaseDelay?: number
    /** Maximum delay for reconnection in ms (default: 30000) */
    reconnectMaxDelay?: number
    /** Callback when connection opens */
    onOpen?: () => void
    /** Callback when connection closes */
    onClose?: (event: CloseEvent) => void
    /** Callback when error occurs */
    onError?: (event: Event) => void
    /** Callback when message received */
    onMessage?: (message: any) => void
}

interface UseWebSocketResult {
    /** Current connection status */
    status: 'connecting' | 'connected' | 'disconnected' | 'reconnecting'
    /** Last received message */
    lastMessage: any
    /** Current reconnection attempt number */
    reconnectAttempt: number
    /** Send a message (auto-converts objects to JSON) */
    send: (message: any) => void
    /** Manually reconnect */
    reconnect: () => void
    /** Close connection */
    disconnect: () => void
}

/**
 * WebSocket hook with automatic reconnection and exponential backoff
 */
export function useWebSocket(
    url: string | null,
    options: UseWebSocketOptions = {}
): UseWebSocketResult {
    const {
        reconnect = true,
        maxReconnectAttempts = 10,
        reconnectBaseDelay = 1000,
        reconnectMaxDelay = 30000,
        onOpen,
        onClose,
        onError,
        onMessage,
    } = options

    const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'reconnecting'>('disconnected')
    const [lastMessage, setLastMessage] = useState<any>(null)
    const [reconnectAttempt, setReconnectAttempt] = useState(0)

    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const mountedRef = useRef(true)

    // Store callbacks in refs to avoid stale closures
    const onOpenRef = useRef(onOpen)
    const onCloseRef = useRef(onClose)
    const onErrorRef = useRef(onError)
    const onMessageRef = useRef(onMessage)

    onOpenRef.current = onOpen
    onCloseRef.current = onClose
    onErrorRef.current = onError
    onMessageRef.current = onMessage

    const getReconnectDelay = useCallback((attempt: number) => {
        // Exponential backoff with jitter
        const exponentialDelay = reconnectBaseDelay * Math.pow(2, attempt)
        const jitter = Math.random() * 1000
        return Math.min(exponentialDelay + jitter, reconnectMaxDelay)
    }, [reconnectBaseDelay, reconnectMaxDelay])

    const connect = useCallback(() => {
        if (!url || !mountedRef.current) return

        // Clean up existing connection
        if (wsRef.current) {
            wsRef.current.close()
        }

        setStatus(reconnectAttempt > 0 ? 'reconnecting' : 'connecting')

        try {
            const ws = new WebSocket(url)

            ws.onopen = () => {
                if (!mountedRef.current) return
                setStatus('connected')
                setReconnectAttempt(0)
                onOpenRef.current?.()
            }

            ws.onclose = (event) => {
                if (!mountedRef.current) return
                setStatus('disconnected')
                onCloseRef.current?.(event)

                // Auto-reconnect if enabled and not at max attempts
                if (reconnect && reconnectAttempt < maxReconnectAttempts && !event.wasClean) {
                    const delay = getReconnectDelay(reconnectAttempt)
                    console.log(`WebSocket reconnecting in ${Math.round(delay)}ms (attempt ${reconnectAttempt + 1}/${maxReconnectAttempts})`)

                    reconnectTimeoutRef.current = setTimeout(() => {
                        if (mountedRef.current) {
                            setReconnectAttempt(prev => prev + 1)
                            connect()
                        }
                    }, delay)
                }
            }

            ws.onerror = (event) => {
                if (!mountedRef.current) return
                onErrorRef.current?.(event)
            }

            ws.onmessage = (event) => {
                if (!mountedRef.current) return
                try {
                    const data = JSON.parse(event.data)
                    setLastMessage(data)
                    onMessageRef.current?.(data)
                } catch {
                    // Not JSON, pass raw data
                    setLastMessage(event.data)
                    onMessageRef.current?.(event.data)
                }
            }

            wsRef.current = ws
        } catch (err) {
            console.error('WebSocket connection error:', err)
            setStatus('disconnected')
        }
    }, [url, reconnect, maxReconnectAttempts, reconnectAttempt, getReconnectDelay])

    const send = useCallback((message: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const payload = typeof message === 'string' ? message : JSON.stringify(message)
            wsRef.current.send(payload)
        } else {
            console.warn('WebSocket is not connected, cannot send message')
        }
    }, [])

    const manualReconnect = useCallback(() => {
        setReconnectAttempt(0)
        connect()
    }, [connect])

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
        }
        if (wsRef.current) {
            wsRef.current.close(1000, 'User disconnected')
        }
        setStatus('disconnected')
        setReconnectAttempt(0)
    }, [])

    // Connect on mount / url change
    useEffect(() => {
        mountedRef.current = true
        if (url) {
            connect()
        }

        return () => {
            mountedRef.current = false
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current)
            }
            if (wsRef.current) {
                wsRef.current.close()
            }
        }
    }, [url]) // Only reconnect when URL changes

    return {
        status,
        lastMessage,
        reconnectAttempt,
        send,
        reconnect: manualReconnect,
        disconnect,
    }
}

/**
 * Create WebSocket URL for test control
 */
export function getTestControlWebSocketUrl(runId: string, userId?: string): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const wsProtocol = apiUrl.startsWith('https') ? 'wss' : 'ws'
    const host = apiUrl.replace(/^https?:\/\//, '')
    const userParam = userId ? `&userId=${userId}` : ''
    return `${wsProtocol}://${host}/ws/test-control?runId=${runId}${userParam}`
}
