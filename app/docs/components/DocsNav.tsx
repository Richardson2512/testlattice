import { docsNavSections } from '@/lib/docs-navigation'
import { DocsNavClient } from './DocsNavClient'

/**
 * Server Component that renders DocsNav with client-side active state
 * All links are in the initial HTML for AI crawlability
 */
export function DocsNav() {
  // Pass sections data to client component for rendering
  // Links are rendered in client but data comes from server
  return <DocsNavClient sections={docsNavSections} />
}
