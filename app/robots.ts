import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/'],
        },
        {
        userAgent: ['Google-Extended', 'GPTBot', 'CCBot'],
            allow: '/',
        },
    sitemap: 'https://rihario.com/sitemap.xml',
    }
}
