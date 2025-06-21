import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/dashboard/',
        '/api/',
        '/checkout/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap:
      (process.env.SITE_BASE_URL || 'https://buildastore.com') + '/sitemap.xml',
  };
}
