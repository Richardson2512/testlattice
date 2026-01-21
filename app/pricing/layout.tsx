import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Rihario Pricing | AI Testing from $19/month for Indie Hackers',
    description: 'Transparent pricing for solo developers and indie hackers. Starter $19/mo (100 tests), Indie $39/mo (300 tests + God Mode), Pro $99/mo (1000 tests + API). No enterprise sales calls. Cancel anytime.',
    keywords: ['Rihario pricing', 'AI testing pricing', 'indie hacker testing', 'affordable testing', 'no-code testing cost'],
}

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
