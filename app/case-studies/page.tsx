
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Case Studies: How Vibe Coding Teams Ship Faster | Rihario',
    description: 'See how real teams use Rihario to catch bugs 10x faster. 30% reduction in QA time. 95% critical bug detection rate.',
}

export default function CaseStudiesPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                        Customer <span className="text-gradient">Case Studies</span>
                    </h1>
                    <p style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
                        See how autonomous testing transforms development workflows.
                    </p>

                    {/* Featured Case Study */}
                    <div className="glass-panel" style={{ padding: '3rem', marginBottom: '4rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                                    Featured Story
                                </div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Shipping "Drafts" 3x Faster with Zero Regressions</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    <strong>App:</strong> Drafts.io (Productivity Tool)<br />
                                    <strong>Challenge:</strong> Solo founder couldn't manually test Safari and Mobile layouts before every deploy.<br />
                                    <strong>Solution:</strong> Rihario runs "Grid Tests" on every Vercel preview deployment.
                                </p>
                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                                    <div>
                                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>30%</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Faster Release Cycle</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>95%</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Critical Bug Catch Rate</div>
                                    </div>
                                </div>
                                <blockquote style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                    "I used to spend Friday nights clicking buttons. Now Rihario sends me a video of the bug, and I fix it in 5 minutes. It feels like cheating."
                                    <footer style={{ marginTop: '0.5rem', fontWeight: 600, fontStyle: 'normal' }}>— Alex C., Founder of Drafts.io</footer>
                                </blockquote>
                            </div>

                            {/* Video Embed Simulation */}
                            <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: '#fff', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>▶</div>
                                    <div>Watch the AI find a Safari layout bug</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
