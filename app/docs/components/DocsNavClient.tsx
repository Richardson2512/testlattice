'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import type { DocsNavSection } from '@/lib/docs-navigation'

interface DocsNavClientProps {
    sections: DocsNavSection[]
}

/**
 * Client-side DocsNav wrapper that adds active state styling
 * All links are rendered server-side for AI crawlability
 */
export function DocsNavClient({ sections }: DocsNavClientProps) {
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href

    return (
        <nav>
            {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} style={{ marginBottom: '2.5rem' }}>
                    <div style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                        padding: '0 1.5rem',
                        marginBottom: '0.75rem',
                    }}>
                        {section.title}
                    </div>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                    }}>
                        {section.items.map((item) => {
                            const active = isActive(item.href)
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        style={{
                                            display: 'block',
                                            padding: '0.625rem 1.5rem',
                                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            transition: 'all 0.15s ease',
                                            background: active ? 'rgba(92, 15, 15, 0.08)' : 'transparent',
                                            borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                                            fontWeight: active ? 500 : 400,
                                        }}
                                        className="docs-nav-link"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    )
}
