import type { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { PricingCards, AddOnsSection } from '@/components/pricing/PricingCards'

export const metadata: Metadata = {
  title: 'Pricing & Plans | Rihario',
  description: 'Transparent pricing for developers and solo founders. Choose from Free, Starter, Indie, or Pro plans. Upgrade anytime to unlock more features.',
  alternates: {
    canonical: 'https://rihario.com/pricing',
  },
}

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Rihario',
    'applicationCategory': 'DeveloperTool',
    'offers': [
      {
        '@type': 'Offer',
        'name': 'Guest / Free',
        'price': '0',
        'priceCurrency': 'USD',
        'description': '300 monthly tests, single browser.'
      },
      {
        '@type': 'Offer',
        'name': 'Starter',
        'price': '19',
        'priceCurrency': 'USD',
        'description': '1000 tests, God Mode, 5 concurrent runs.'
      },
      {
        '@type': 'Offer',
        'name': 'Indie',
        'price': '39',
        'priceCurrency': 'USD',
        'description': 'Unlimited tests, Priority Support, 20 concurrent runs.'
      },
      {
        '@type': 'Offer',
        'name': 'Pro',
        'price': '99',
        'priceCurrency': 'USD',
        'description': 'Dedicated infrastructure, SSO, audit logs.'
      }
    ]
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)'
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHeader />

      {/* Header Section - Static SSR content */}
      <section style={{
        paddingTop: '60px',
        paddingBottom: '4rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--beige-100) 100%)'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            color: 'var(--primary)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            Pricing &amp; Plans
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            color: 'var(--text-primary)'
          }}>
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p style={{
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            Transparent pricing for developers and solo founders. Upgrade anytime to unlock more features.
          </p>
        </div>
      </section>

      {/* Pricing Cards - Client component for checkout interaction */}
      <section style={{ paddingBottom: '6rem' }}>
        <PricingCards />
      </section>

      {/* Add-Ons Section - Client component */}
      <section style={{
        padding: '4rem 0 6rem',
        background: 'var(--beige-100)'
      }}>
        <AddOnsSection />
      </section>
    </main>
  )
}
