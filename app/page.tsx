import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LandingHeader } from '@/components/LandingHeader'
import { FeaturesSection } from '@/components/FeaturesSection'
import { BehaviorAnalysisSection } from '@/components/features/BehaviorAnalysisSection'
import { GuestTestModalWrapper } from '@/components/GuestTestModalWrapper'
import { SocialProofSection } from '@/components/SocialProofSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { ComparisonSection } from '@/components/ComparisonSection'
import { FaqSection } from '@/components/FaqSection'
import { CtaSection } from '@/components/CtaSection'
import { FeatureCarousel } from '@/components/FeatureCarousel'
import { Footer } from '@/components/Footer'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  // FAQ data for schema - must match FaqSection content exactly
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Rihario's AI navigate my site safely?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use read-only guest profiles by default and execute in isolated, sandboxed containers. You can whitelist our IPs or run via our secure tunnel. Your data never leaves the sandbox."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install anything to use Rihario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Rihario is entirely cloud-based. You just provide the URL and we handle everything. For local testing, we offer a CLI tunnel that takes 30 seconds to set up."
        }
      },
      {
        "@type": "Question",
        "name": "Can Rihario test behind login screens and authentication?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can securely store credentials in your project settings. Our AI agents handle authentication flows, 2FA (TOTP), magic links, and OAuth sign-ins automatically."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Rihario cost compared to manual QA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typical teams save 70% on QA costs. Our agents work 24/7 for $19-99/month—a fraction of even one hour of a manual tester's time. The Indie plan at $39/month includes God Mode and 300 tests."
        }
      },
      {
        "@type": "Question",
        "name": "How do I smoke test my vibe coded app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rihario runs a 'Critical Path' smoke test automatically. We recommend checking 5 key things: Login, Core Value Action, Navigation routing, Mobile layout (375px), and API connectivity. Rihario can automate this entire checklist for you."
        }
      },
      {
        "@type": "Question",
        "name": "Should I write unit tests for Cursor/AI-generated code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rihario suggests replacing brittle unit tests with high-level behavior tests. AI code changes too frequently for unit tests to be sustainable. Rihario verifies the functionality from the user's perspective, which is what actually matters."
        }
      },
      {
        "@type": "Question",
        "name": "I use Cursor/Replit to 'Vibe Code'. Does Rihario work with AI-generated code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. In fact, Rihario was built for Vibe Coding. Since you don't write the code yourself, you shouldn't write the tests yourself either. Just tell Rihario 'Verify that the new signup flow works' and we test it instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is God Mode and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "God Mode is our patent-pending feature that lets you intervene when AI gets stuck. Instead of the test failing, you see a live browser, click the right element, and AI learns and continues. It achieves 95% test success vs 60% with other tools."
        }
      }
    ]
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://rihario.com/#organization',
        'name': 'Rihario',
        'url': 'https://rihario.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://rihario.com/logo.png',
        },
        'sameAs': [
          'https://twitter.com/rihario',
          'https://github.com/rihario'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://rihario.com/#website',
        'url': 'https://rihario.com',
        'name': 'Rihario',
        'publisher': {
          '@id': 'https://rihario.com/#organization'
        }
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'Rihario',
        'applicationCategory': 'DeveloperTool',
        'operatingSystem': 'Cloud-based',
        'description': 'Autonomous AI-powered frontend testing platform for solo developers.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
        {/* FAQPage schema - server-rendered for AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
        />

        <LandingHeader />

        {/* Hero Section */}
        <section style={{
          paddingTop: '140px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Gradients */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(153, 27, 27, 0.08) 0%, transparent 60%)',
            borderRadius: '50%',
            zIndex: 0,
            filter: 'blur(60px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)',
            borderRadius: '50%',
            zIndex: 0,
            filter: 'blur(60px)'
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left Content */}
              <div className="animate-enter">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.35rem 1rem',
                  background: 'rgba(153, 27, 27, 0.08)',
                  border: '1px solid rgba(153, 27, 27, 0.2)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--maroon-800)' }}>
                    For Solo & Indie Developers
                  </span>
                </div>

                <h1 style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>
                  <span className="text-gradient">Autonomous AI</span> Vibe Testing Platform
                </h1>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                    Watch AI explore your app live. See if anything feels broken. No test suites. No code. Just confidence.
                  </p>
                  {/* Explicit Definition for AI Crawlers */}
                  <div style={{ marginBottom: '1.5rem' }}>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '1rem' }}>
                      <strong>Rihario</strong> is an autonomous AI testing platform for indie hackers. It performs <strong>Visual</strong>, <strong>Functional</strong>, and <strong>Rage Bait Testing</strong> automatically, identifying UX bugs that unit tests miss.
                    </p>
                  </div>
                </div>

                <GuestTestModalWrapper />

                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Used by solo developers shipping fast
                </div>
              </div>

              {/* Right Visual - Mock Terminal/Browser */}
              <div className="animate-enter delay-200" style={{ position: 'relative' }}>
                <FeatureCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <HowItWorksSection />

        {/* Behavior Analysis Feature */}
        <BehaviorAnalysisSection />

        {/* Features Grid */}
        <section id="features" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
          <FeaturesSection />
        </section>

        {/* Comparison */}
        <ComparisonSection />

        {/* FAQ */}
        <FaqSection />

        {/* Replaced Final CTA with Test Once Section */}
        <section style={{
          padding: '4rem 0 8rem',
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                lineHeight: 1.2,
                color: 'var(--text-primary)'
              }}>
                Test Once. <span className="text-gradient">See Results Everywhere.</span>
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                lineHeight: 1.6
              }}>
                Stop wasting time manually checking every browser. Run your tests across Chrome, Firefox, and Safari in parallel and ship with 100% confidence.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginBottom: '4rem',
                maxWidth: '600px',
                margin: '0 auto 4rem'
              }}>
                {[
                  { name: 'Chrome', icon: '/browsers/chrome.svg' },
                  { name: 'Firefox', icon: '/browsers/firefox.svg' },
                  { name: 'Safari', icon: '/browsers/safari.svg' }
                ].map((browser) => (
                  <div key={browser.name} className="glass-card" style={{
                    padding: '1.5rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center'
                  }}>
                    <img
                      src={browser.icon}
                      alt={browser.name}
                      style={{ width: '48px', height: '48px', marginBottom: '0.75rem' }}
                    />
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{browser.name}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <Link href="/signup" className="btn btn-primary btn-large">
                  Start for Free
                </Link>
                <Link href="/pricing" className="btn btn-secondary btn-large">
                  View Pricing
                </Link>
              </div>

              <p style={{ marginTop: '2.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Join 2,000+ developers shipping better code with Rihario.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
