import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'

export const metadata = {
    title: 'Behavior Analysis Testing - Rihario Intelligence Engine',
    description: 'Evaluate the personality, compliance, and safety of your AI agents with Rihario\'s autonomous behavior analysis engine.',
}

export default function BehaviorAnalysisDocsPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)]">
            <LandingHeader />

            <main className="container max-w-4xl mx-auto px-6 pt-32 pb-24">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                    <Link href="/docs" className="hover:text-[var(--primary)] transition-colors">Docs</Link>
                    <span>/</span>
                    <span className="text-[var(--text-secondary)]">Behavior Analysis</span>
                </div>

                <article className="prose prose-lg max-w-none">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--maroon-900)] to-[var(--maroon-700)] mb-6">
                        Behavior Analysis Testing
                    </h1>

                    <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-12">
                        Go beyond functional correctness. The <strong>Rihario Intelligence Engine</strong> strictly evaluates the "soul" of your AI—testing for safety, compliance, and persona adherence under pressure.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Card className="p-6 bg-[var(--bg-card)] border-[var(--border-light)] shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Safety & Compliance</h3>
                            <p className="text-[var(--text-secondary)]">
                                Ensure your agent never leaks PII, gives medical advice, or violates regulatory standards, even when "jailbroken" by malicious users.
                            </p>
                        </Card>
                        <Card className="p-6 bg-[var(--bg-card)] border-[var(--border-light)] shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Persona Adherence</h3>
                            <p className="text-[var(--text-secondary)]">
                                Verify that your sales bot stays professional, your support agent remains empathetic, and your brand voice never breaks character.
                            </p>
                        </Card>
                    </div>

                    <h2 className="text-3xl font-bold mt-16 mb-6 text-[var(--text-primary)]">The Architecture of Autonomous Red-Teaming</h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Rihario uses a scaffolded multi-model approach to "stress test" your AI. Instead of static prompts, we use dynamic agents to simulate diverse, adversarial user interactions.
                    </p>

                    <div className="space-y-8 my-12">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--beige-200)] flex items-center justify-center text-xl font-bold text-[var(--maroon-900)] shrink-0">1</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">The Architect</h3>
                                <p className="text-[var(--text-secondary)]">
                                    Analyzes your defined "Target Behavior" (e.g., "Must not become sycophantic") and scientifically generates test heuristics.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--beige-200)] flex items-center justify-center text-xl font-bold text-[var(--maroon-900)] shrink-0">2</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">The Actor (Red Team)</h3>
                                <p className="text-[var(--text-secondary)]">
                                    Simulates thousands of conversation turns, trying different strategies (emotional manipulation, logical traps) to trigger a failure.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--beige-200)] flex items-center justify-center text-xl font-bold text-[var(--maroon-900)] shrink-0">3</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">The Judge</h3>
                                <p className="text-[var(--text-secondary)]">
                                    Reads the full transcript and provides a high-fidelity score with cited evidence, eliminating human bias from the evaluation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mt-16 mb-6 text-[var(--text-primary)]">Data Governance & Retention</h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Behavior analysis generates significant conversational data. To ensure privacy and cost-efficiency:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)] mb-8">
                        <li><strong>Sovereign Storage:</strong> All chat transcripts are stored in encrypted object storage (Wasabi), keeping your database lean.</li>
                        <li><strong>Retention Policies:</strong>
                            <ul className="list-circle pl-6 mt-2">
                                <li><strong>Indie Tier:</strong> 90-day retention</li>
                                <li><strong>Pro Tier:</strong> 365-day retention</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="bg-[var(--beige-100)] rounded-xl p-8 mt-12 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to test the unseen?</h3>
                        <p className="mb-6 text-[var(--text-secondary)]">
                            Behavior Analysis is available as an add-on for Indie and Pro plans.
                        </p>
                        <Link href="/pricing" className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            View Pricing
                        </Link>
                    </div>

                </article>
            </main>
            <Footer />
        </div>
    )
}
