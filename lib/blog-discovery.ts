import { readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * Dynamically discover all blog post slugs from the filesystem
 * Reads app/blog/* directories that contain a page.tsx file
 */
export function getAllBlogSlugs(): string[] {
    const blogDir = join(process.cwd(), 'app', 'blog')

    try {
        const entries = readdirSync(blogDir)

        const slugs = entries.filter(entry => {
            // Skip files (like page.tsx for the blog index)
            const entryPath = join(blogDir, entry)
            const stat = statSync(entryPath)

            if (!stat.isDirectory()) {
                return false
            }

            // Skip hidden directories
            if (entry.startsWith('.')) {
                return false
            }

            // Verify the directory has a page.tsx file (is a valid route)
            try {
                const pagePath = join(entryPath, 'page.tsx')
                statSync(pagePath)
                return true
            } catch {
                return false
            }
        })

        return slugs.map(slug => `/blog/${slug}`)
    } catch (error) {
        console.error('Error reading blog directory:', error)
        return []
    }
}
