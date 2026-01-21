export const NAV_ITEMS = {
    features: [
        { name: 'All Features', href: '/features' },
        { name: 'God Mode', href: '/features/god-mode', isNew: true },
        { name: 'What We Test', href: '/features/testing-types' },
        { name: 'Behavior Analysis', href: '/behavior-test', isNew: true },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Whitepaper', href: '/whitepaper' },
        { name: 'Blog', href: '/blog' },
        { name: 'Community', href: '/community' },
        { name: 'Contact', href: '/contact' },
    ]
} as const;

