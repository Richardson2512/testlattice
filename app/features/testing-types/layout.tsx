import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '9 Types of AI Testing | Functional, Visual, Security & More',
    description: 'Learn about all 9 types of automated testing Rihario performs: functional, visual regression, performance, security, accessibility, SEO, console errors, network/API, and cross-browser testing. Each explained with real-world examples.',
    keywords: ['types of testing', 'functional testing', 'visual regression', 'security testing', 'accessibility testing', 'SEO testing', 'cross-browser testing'],
}

export default function TestingTypesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
