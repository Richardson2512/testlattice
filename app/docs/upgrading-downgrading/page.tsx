import type { Metadata } from 'next'
import UpgradingDowngradingContent from '@/content/docs/upgrading-downgrading'

export const metadata: Metadata = {
  title: 'Upgrading, Downgrading, and Add-Ons | Rihario Docs',
  description: 'Learn how to upgrade or downgrade your Rihario plan, buy add-ons for additional tests, and manage your subscription.',
}

export default function UpgradingDowngrading() {
  return <UpgradingDowngradingContent />
}
