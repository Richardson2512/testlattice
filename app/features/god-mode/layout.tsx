import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'God Mode™ | Interactive AI Test Recovery | Rihario',
    description: 'When AI gets stuck, take over the live browser yourself. Click the right element, AI learns and continues. 95% test success rate vs 60% with other tools. Patent-pending technology.',
    keywords: ['God Mode', 'AI test recovery', 'interactive testing', 'live browser control', 'self-healing tests'],
}

export default function GodModeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
