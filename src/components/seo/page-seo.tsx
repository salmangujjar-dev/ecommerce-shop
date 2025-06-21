import { Metadata } from 'next';

import { SEO } from '@globals/constant';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  structuredData?: Record<string, unknown>;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  structuredData,
}: PageSEOProps): Metadata {
  const pageTitle = title ? `${title} | BuildAStore` : SEO.title;
  const pageDescription = description || SEO.description;
  const pageKeywords = [...SEO.keywords, ...keywords];
  const pageImage = image || SEO.openGraph.image;
  const pageUrl = url || SEO.openGraph.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: author ? [{ name: author }] : [{ name: SEO.author }],
    openGraph: {
      type,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: pageImage,
          width: SEO.openGraph.imageWidth,
          height: SEO.openGraph.imageHeight,
          alt: pageTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: author ? [author] : [SEO.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      ...(structuredData && {
        'application/ld+json': JSON.stringify(structuredData),
      }),
    },
  };
}

export function generateProductStructuredData({
  name,
  description,
  price,
  currency = 'USD',
  image,
  url,
  availability = 'InStock',
  brand,
  category,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image: string;
  url: string;
  availability?: string;
  brand?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    category,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
    },
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating,
          reviewCount,
        },
      }),
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
