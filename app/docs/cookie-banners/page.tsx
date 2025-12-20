import type { Metadata } from 'next'
import CookieBannersContent from '@/content/docs/cookie-banners'

export const metadata: Metadata = {
  title: 'How Cookie Banners Are Handled | Rihario Docs',
  description: 'Rihario automatically detects and attempts to dismiss cookie banners during exploration. Learn how cookie consent is handled and when manual intervention is needed.',
}

export default function CookieBanners() {
  return <CookieBannersContent />
}
