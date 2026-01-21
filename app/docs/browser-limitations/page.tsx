import type { Metadata } from 'next'
import BrowserLimitationsContent from '@/content/docs/browser-limitations'

export const metadata: Metadata = {
  title: 'Browser & Device Limitations | Rihario Docs',
  description: 'Learn about browser and device limitations in Rihario: supported browsers, mobile device limitations, viewport constraints, and what works best.',
}

export default function BrowserLimitations() {
  return <BrowserLimitationsContent />
}
