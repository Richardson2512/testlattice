import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from './components/Navigation'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ScrollToTop } from '../components/ScrollToTop'
import { createClient } from '@/lib/supabase/server'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Rihario',
    default: 'Rihario - The Vibe Testing Platform',
  },
  description: 'Rihario uses autonomous AI agents to perform 7 types of frontend testing including Visual, Functional, and Rage Bait testing. No code required. Self-healing E2E tests.',
  keywords: ['vibe testing', 'ai testing', 'autonomous testing', 'playwright alternative', 'selenium alternative', 'test automation', 'self-healing tests'],
  authors: [{ name: 'Rihario Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rihario.com',
    title: 'Rihario - AI Testing for Indie Hackers | No Code Required',
    description: 'Stop writing flaky scripts. Start Vibe Testing with autonomous AI agents. No code. No setup. Just paste your URL.',
    siteName: 'Rihario',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rihario - AI Testing for Indie Hackers',
    description: 'Stop writing flaky scripts. Start Vibe Testing with autonomous AI agents. No code required.',
  },
  icons: {
    icon: '/image/favicon.png',
    shortcut: '/image/favicon.png',
    apple: '/image/favicon.png',
  },
  alternates: {
    canonical: 'https://rihario.com',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  let isAuthenticated = false
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    isAuthenticated = !!user
  } catch (error) {
    // If Supabase is not configured, assume not authenticated
    isAuthenticated = false
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={leagueSpartan.variable} style={{ background: 'var(--bg-primary)' }} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D4E4CRWZ6F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-D4E4CRWZ6F');
          `}
        </Script>
        {/* Organization Schema for GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Rihario',
              url: 'https://rihario.com',
              logo: 'https://rihario.com/image/logo.png',
              description: 'AI-powered testing platform for indie hackers and solo developers. No-code alternative to Playwright and Cypress.',
              sameAs: [
                'https://twitter.com/riharioapp',
                'https://github.com/rihario'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                url: 'https://rihario.com/contact'
              }
            }),
          }}
        />
        {/* Product Schema with Pricing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Rihario',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              description: 'Autonomous AI testing platform with God Mode intervention, self-healing tests, and 9 types of automated testing.',
              featureList: [
                'Functional Testing',
                'Visual Regression Testing',
                'Performance Testing',
                'Security Testing',
                'Accessibility Testing',
                'SEO Testing',
                'Console Error Detection',
                'API Monitoring',
                'Cross-Browser Testing'
              ],
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '0',
                highPrice: '99',
                priceCurrency: 'USD',
                offerCount: 4
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127'
              }
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress browser extension errors
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  // Suppress known extension-related errors
                  const errorString = args.join(' ');
                  if (
                    errorString.includes('message channel closed') ||
                    errorString.includes('Extension context invalidated') ||
                    errorString.includes('chrome.runtime')
                  ) {
                    // Silently ignore extension errors
                    return;
                  }
                  // Log all other errors normally
                  originalError.apply(console, args);
                };

                // Also handle unhandled promise rejections from extensions
                window.addEventListener('unhandledrejection', (event) => {
                  const errorString = event.reason?.message || String(event.reason);
                  if (
                    errorString.includes('message channel closed') ||
                    errorString.includes('Extension context invalidated')
                  ) {
                    event.preventDefault(); // Suppress the error
                  }
                });
              }
            `,
          }}
        />
        <ErrorBoundary>
          {isAuthenticated && <Navigation />}
          <main
            style={{
              minHeight: '100vh',
              background: 'var(--bg-primary)',
              padding: 0,
              marginLeft: isAuthenticated ? 'var(--sidebar-width)' : '0',
              width: isAuthenticated ? 'calc(100% - var(--sidebar-width))' : '100%',
              transition: 'margin-left var(--transition-base), width var(--transition-base)',
            }}
          >
            {children}
          </main>
          <ScrollToTop />
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

