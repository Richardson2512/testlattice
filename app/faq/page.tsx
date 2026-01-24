
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
    title: 'Frequently Asked Questions | Rihario',
    description: 'Answers about Rihario\'s AI testing, security, pricing, and browser compatibility.',
}

export default function FaqPage() {
    const faqs = [
        {
            q: "How does Rihario's AI find elements without CSS selectors?",
            a: "Rihario uses a Semantic Analysis Engine. Instead of looking for `.btn-primary`, it looks for 'The button labeled Submit' using the Accessibility Tree and visual layout data. This looks more like how a human sees the page, making it immune to CSS class changes."
        },
        {
            q: "What browsers does Rihario test automatically?",
            a: "We currently support concurrent testing on the latest versions of Google Chrome, Mozilla Firefox, Apple Safari (WebKit), and Microsoft Edge. All tests run in parallel in isolated sandboxes."
        },
        {
            q: "How is Vibe Testing different from unit testing?",
            a: "Unit tests check if a function returns the right value (code correctness). Vibe Testing checks if the user can actually use the feature (behavior correctness). Unit tests pass even if the button is invisible; Vibe Tests will fail, catching the real bug."
        },
        {
            q: "Can Rihario test SPAs and React applications?",
            a: "Yes. Rihario waits for network quiescence and hydration automatically. It is built specifically for modern frameworks like Next.js, React, Vue, and Svelte where the DOM is dynamic."
        },
        {
            q: "How does Rihario's AI navigate my site safely?",
            a: "We use read-only guest profiles by default and execute in isolated, sandboxed containers. You can whitelist our IPs or run via our secure tunnel."
        }
    ]

    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />
            <Script id="faq-page-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(faq => ({
                        "@type": "Question",
                        "name": faq.q,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.a
                        }
                    }))
                })}
            </Script>

            <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{faq.q}</h3>
                                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
