'use client'

import { useEffect, useState, useCallback } from 'react'

interface TOCItem {
    id: string
    text: string
}

const tocSections: TOCItem[] = [
    { id: 'why-not-playwright', text: 'Why Rihario vs Playwright?' },
    { id: 'god-mode', text: 'What is God Mode?' },
    { id: 'no-code-testing', text: 'Does it work without code?' },
    { id: 'non-technical', text: 'For non-technical founders?' },
    { id: 'pricing', text: 'Why is it cheaper?' },
    { id: 'save-time-money', text: 'ROI Calculation' },
    { id: 'comprehensive-testing', text: 'What can it test?' },
    { id: 'trust', text: 'Why trust Rihario?' },
]

export function WhyRiharioTOC() {
    const [activeId, setActiveId] = useState<string>('')

    const scrollToElement = useCallback((element: HTMLElement) => {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
        })
    }, [])

    useEffect(() => {
        const observerOptions = {
            rootMargin: '-100px 0% -60% 0%',
            threshold: [0, 0.1, 0.5, 1],
        }

        let visibleSections: { id: string; ratio: number }[] = []

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id
                const existingIndex = visibleSections.findIndex((s) => s.id === id)

                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    if (existingIndex >= 0) {
                        visibleSections[existingIndex].ratio = entry.intersectionRatio
                    } else {
                        visibleSections.push({ id, ratio: entry.intersectionRatio })
                    }
                } else {
                    visibleSections = visibleSections.filter((s) => s.id !== id)
                }

                if (visibleSections.length > 0) {
                    const mostVisible = visibleSections.reduce((prev, current) =>
                        prev.ratio > current.ratio ? prev : current
                    )
                    setActiveId(mostVisible.id)
                }
            })
        }, observerOptions)

        // Observe all sections
        tocSections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault()
            const element = document.getElementById(id)
            if (element) {
                scrollToElement(element)
                setActiveId(id)
            }
        },
        [scrollToElement]
    )

    return (
        <aside
            style={{
                width: '240px',
                flexShrink: 0,
                position: 'sticky',
                top: '100px',
                alignSelf: 'flex-start',
                height: 'fit-content',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
            }}
        >
            <div
                style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted, #6b7280)',
                    marginBottom: '1rem',
                    paddingLeft: '0.75rem',
                }}
            >
                On this page
            </div>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tocSections.map((section) => {
                        const isActive = activeId === section.id
                        return (
                            <li key={section.id} style={{ marginBottom: '0.25rem' }}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={(e) => handleClick(e, section.id)}
                                    style={{
                                        display: 'block',
                                        padding: '0.375rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: isActive ? 'var(--accent-primary, #6366f1)' : 'var(--text-secondary, #6b7280)',
                                        textDecoration: 'none',
                                        borderLeft: isActive ? '2px solid var(--accent-primary, #6366f1)' : '2px solid transparent',
                                        fontWeight: isActive ? 500 : 400,
                                        transition: 'all 0.15s ease',
                                        borderRadius: '0 4px 4px 0',
                                    }}
                                >
                                    {section.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
