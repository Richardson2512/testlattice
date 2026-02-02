import type { Metadata } from 'next'
import CookieBannersContent from '@/content/docs/cookie-banners'

export const metadata: Metadata = {
  title: 'How Cookie Banners Are Handled | Rihario Docs',
  description: 'Rihario automatically detects and attempts to dismiss cookie banners during exploration. Learn how cookie consent is handled and when manual intervention is needed.',
}

export default function CookieBanners() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Does Rihario handle cookie banners automatically?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Rihario automatically detects and dismisses standard cookie banners (OneTrust, Cookiebot, etc.) by identifying and clicking "Accept" or "OK" buttons.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does Rihario block marketing popups and newsletters?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Rihario identifies and closes marketing overlays, newsletter signup modals, and chat widgets that obscure the UI, ensuring the test can proceed.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What happens if a banner cannot be dismissed?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'If a banner blocks interaction and cannot be auto-dismissed, the test status is marked as BLOCKED. You can then pause the test, manually dismiss the banner, and resume execution.'
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
      <CookieBannersContent />
    </>
  )
}
