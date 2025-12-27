export const NAV_ITEMS = {
    features: [
        { name: 'Functional Testing', href: '/features/functional' },
        { name: 'Visual Regression', href: '/features/visual' },
        { name: 'Performance', href: '/features/performance' },
        { name: 'Behavior Analysis', href: '/docs/behavior-analysis', isNew: true },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Blog', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Contact', href: '/contact' }, // Added in previous step
    ]
} as const;
