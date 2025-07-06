import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Suspense } from 'react';

import Spinner from '@ui/Spinner';

import { cn } from '@utils/cn';

import { APP_NAME, SEO } from '@globals/constant';

import Loader from './loader';
import Providers from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | ${APP_NAME}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: SEO.author }],
  creator: SEO.creator,
  publisher: SEO.publisher,
  robots: SEO.robots,
  // viewport: SEO.viewport,
  // themeColor: SEO.themeColor,
  // colorScheme: 'light',
  metadataBase: new URL(process.env.SITE_BASE_URL || 'https://buildastore.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SEO.openGraph.locale,
    siteName: SEO.openGraph.siteName,
    title: SEO.openGraph.title,
    description: SEO.openGraph.description,
    url: SEO.openGraph.url,
    images: [
      {
        url: SEO.openGraph.image,
        width: SEO.openGraph.imageWidth,
        height: SEO.openGraph.imageHeight,
        alt: SEO.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO.twitter.site,
    creator: SEO.twitter.creator,
    title: SEO.twitter.title,
    description: SEO.twitter.description,
    images: [SEO.twitter.image],
  },
  other: {
    'msapplication-TileColor': SEO.themeColor,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': APP_NAME,
    'application-name': APP_NAME,
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO.structuredData.organization),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO.structuredData.softwareApplication),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* Favicon and Icons */}
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        {/* Additional meta tags for better branding */}
        <meta name='application-name' content='BuildAStore' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='BuildAStore' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#3B82F6' />
        <meta name='msapplication-tap-highlight' content='no' />
      </head>
      <body
        className={cn(
          inter.className,
          'antialiased flex flex-col min-h-screen'
        )}
      >
        <Suspense fallback={<Spinner />}>
          <Loader />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
