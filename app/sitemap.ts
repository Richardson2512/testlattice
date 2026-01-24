import { MetadataRoute } from 'next'
import { getAllDocsUrls } from '@/lib/docs-navigation'
import { getAllBlogSlugs } from '@/lib/blog-discovery'
import { glossaryTerms } from '@/lib/glossary-data'

const BASE_URL = 'https://rihario.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const docsUrls = getAllDocsUrls()
    const blogSlugs = getAllBlogSlugs()

    // Main pages - highest priority
    const mainPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/features`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/pricing`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/why-rihario`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/whitepaper`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/faq`,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // Feature pages
    const featurePages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/features/god-mode`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/vibe-coding`,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        // Canonical Definitions
        {
            url: `${BASE_URL}/testing-types`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/rage-bait-testing`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/how-rihario-works`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/docs/testing-localhost`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/docs/system-architecture`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/behavior-testing`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/behavior-test`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // ... (docsPages, blogPages) ...



    // Docs pages - dynamically generated from navigation data
    const docsPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/docs`,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...docsUrls.map(path => ({
            url: `${BASE_URL}${path}`,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        })),
    ]

    // Blog pages - dynamically generated from filesystem
    const blogPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blog`,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...blogSlugs.filter(slug => slug !== '/blog/best-ai-testing-tools').map(path => ({
            url: `${BASE_URL}${path}`,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]


    // Community and contact
    const communityPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/community`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    // Glossary pages - dynamically generated from data
    const glossaryPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/glossary`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...glossaryTerms.map(term => ({
            url: `${BASE_URL}/glossary/${term.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ]



    // Comparison pages
    const comparisonPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/compare/playwright`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/compare/cypress`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/compare/selenium`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/compare/manual-qa`,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Legal pages
    const legalPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/privacy-policy`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms-of-service`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Auth pages (low priority)
    const authPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/signup`,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/login`,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ]

    return [
        ...mainPages,
        ...featurePages,
        ...docsPages,
        ...blogPages,
        ...communityPages,
        ...glossaryPages,
        ...comparisonPages,
        ...legalPages,
        ...authPages,
    ]
}
