import { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Blog | AI Testing Guides & Tutorials | Rihario',
    description: 'Learn about AI testing, no-code testing, and how to ship better software faster. Guides, tutorials, and comparisons for indie hackers and solo developers.',
    keywords: ['AI testing blog', 'testing tutorials', 'indie hacker testing', 'no-code testing guide'],
}

const blogPosts = [
    {
        slug: 'smoke-test-checklist-vibe-coding',
        title: 'Rihario\'s Smoke Test Checklist for Vibe Coded Apps',
        description: 'A 5-point automated smoke test checklist for apps built with Cursor, Replit, or Windsurf. Verify your app in 3 minutes.',
        category: 'Checklist',
        date: 'January 2026',
        readTime: '3 min'
    },
    {
        slug: 'unit-testing-ai-code',
        title: 'Why Rihario is Better Than Unit Tests for AI Generated Code',
        description: 'Stop writing brittle unit tests for ephemeral AI code. Learn why behavior-driven testing is the superior strategy.',
        category: 'Methodology',
        date: 'January 2026',
        readTime: '6 min'
    },
    {
        slug: 'staging-for-vibe-projects',
        title: 'Rihario\'s Guide to Staging Environments for Vibe Projects',
        description: 'How to set up a lightweight staging workflow using ephemeral previews and Rihario quality gates.',
        category: 'DevOps',
        date: 'January 2026',
        readTime: '5 min'
    },
    {
        slug: 'what-is-vibe-coding',
        title: 'What is Vibe Coding? The Rise of the AI-Native Developer',
        description: 'Vibe Coding is the new flow state of building software with AI tools like Cursor and Replit. Learn what it is and why it matters.',
        category: 'Trends',
        date: 'January 2026',
        readTime: '5 min'
    },
    {
        slug: 'testing-for-vibe-coders',
        title: 'How to Test While Vibe Coding: Keep Flow High, Bugs Low',
        description: 'Practical guide for Cursor, Replit, and AI-native developers on how to automate testing without breaking your flow state.',
        category: 'Guide',
        date: 'January 2026',
        readTime: '7 min'
    },
    {
        slug: 'top-10-ai-testing-tools',
        title: 'Top 10 Best AI Testing Tools in 2026',
        description: 'A comprehensive comparison of AI-powered testing tools—from indie-friendly to enterprise-grade.',
        category: 'Comparison',
        date: 'December 2025',
        readTime: '12 min'
    },
    {
        slug: 'best-ai-testing-tools',
        title: 'Best AI Testing Tools 2026: Complete Buyer\'s Guide',
        description: 'We tested every major AI testing tool. Here\'s which one to choose based on your needs.',
        category: 'Buyer\'s Guide',
        date: 'June 2025',
        readTime: '8 min'
    },
    {
        slug: 'top-10-software-testing-tools',
        title: 'Top 10 Best Software Testing Tools for Indie Hackers (2026)',
        description: 'From AI-powered no-code tools to open-source frameworks—find the right testing stack.',
        category: 'Comparison',
        date: 'February 2025',
        readTime: '10 min'
    },
    {
        slug: 'how-to-test-mvp',
        title: 'How to Test Your MVP Before Launch: Complete Guide',
        description: 'The 6-step checklist for testing your MVP. No QA team required.',
        category: 'Guide',
        date: 'October 2024',
        readTime: '10 min'
    },
    {
        slug: 'what-is-vibe-testing',
        title: 'What is Vibe Testing? The New Way to Test Apps',
        description: 'Vibe Testing explained: describe tests in plain English, AI executes them.',
        category: 'Concept',
        date: 'September 2024',
        readTime: '6 min'
    },
    {
        slug: 'what-is-ai-testing',
        title: 'What is AI Testing? Complete Guide for Indie Hackers',
        description: 'Learn what AI testing is, how it works, and why it\'s perfect for solo developers.',
        category: 'Guide',
        date: 'August 2024',
        readTime: '8 min'
    },
    {
        slug: 'no-code-testing',
        title: 'No-Code Testing: How to Test Your App Without Writing Code',
        description: 'Step-by-step guide to testing your web app without touching code.',
        category: 'Tutorial',
        date: 'July 2024',
        readTime: '6 min'
    }
]

export default function BlogPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            {/* Hero */}
            <section style={{ paddingTop: '160px', paddingBottom: '40px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Rihario <span className="text-gradient">Blog</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Guides, tutorials, and insights on AI testing for indie hackers and solo developers.
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section style={{ padding: '3rem 0 5rem' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <article className="glass-panel" style={{
                                    padding: '2rem',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                background: 'var(--bg-tertiary)',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.8rem',
                                                color: 'var(--text-muted)'
                                            }}>
                                                {post.category}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                {post.date} • {post.readTime}
                                            </span>
                                        </div>
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                            {post.title}
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                                            {post.description}
                                        </p>
                                    </div>
                                    <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>
                                        →
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* More Coming Soon */}
            <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div className="container">
                    <h3 style={{ marginBottom: '1rem' }}>More Articles Coming Soon</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        We're writing more guides on AI testing, comparisons, and best practices.
                    </p>
                    <Link href="/glossary" className="btn btn-secondary">
                        Browse Testing Glossary
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
