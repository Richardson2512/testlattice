import type { Metadata } from 'next'
import CaptchaMFALimitsContent from '@/content/docs/captcha-mfa-limits'

export const metadata: Metadata = {
  title: 'CAPTCHA, MFA, and Verification Limits | Rihario Docs',
  description: 'Rihario cannot automatically solve CAPTCHAs, handle MFA, or complete age verification. Learn what these limitations mean and how to work around them.',
}

export default function CaptchaMFALimits() {
  return <CaptchaMFALimitsContent />
}
