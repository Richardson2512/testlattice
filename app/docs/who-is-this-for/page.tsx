import type { Metadata } from 'next'
import WhoIsThisForContent from '@/content/docs/who-is-this-for'

export const metadata: Metadata = {
  title: 'Who Is This Tool For? | Rihario Docs',
  description: 'Rihario is built for solo developers and indie builders who need quick confidence checks, not enterprise QA processes.',
}

export default function WhoIsThisFor() {
  return <WhoIsThisForContent />
}
