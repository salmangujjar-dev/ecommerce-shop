export const APP_NAME = 'BuildAStore';
export const APP_DESCRIPTION = 'BuildAStore - Modern E-Commerce Platform';

// SEO Constants
export const SEO = {
  title: 'BuildAStore - Create Your Online Store in Minutes',
  description:
    'BuildAStore is a modern ecommerce platform that helps entrepreneurs create beautiful online stores. Start selling online with our powerful, user-friendly platform built with Next.js, Prisma, and tRPC.',
  keywords: [
    'ecommerce platform',
    'online store builder',
    'shopify alternative',
    'digital commerce',
    'online retail',
    'ecommerce solution',
    'store builder',
    'online marketplace',
    'digital storefront',
    'ecommerce software',
    'online business',
    'digital entrepreneurship',
    'web store',
    'online shop',
    'ecommerce website',
  ],
  author: 'BuildAStore Team',
  creator: 'BuildAStore',
  publisher: 'BuildAStore',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
  colorScheme: 'light dark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BuildAStore',
    title: 'BuildAStore - Create Your Online Store in Minutes',
    description:
      'BuildAStore is a modern ecommerce platform that helps entrepreneurs create beautiful online stores. Start selling online with our powerful, user-friendly platform.',
    url: process.env.SITE_BASE_URL || 'https://buildastore.com',
    image: '/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'BuildAStore - Modern Ecommerce Platform',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buildastore',
    creator: '@buildastore',
    title: 'BuildAStore - Create Your Online Store in Minutes',
    description:
      'BuildAStore is a modern ecommerce platform that helps entrepreneurs create beautiful online stores.',
    image: '/twitter-image.jpg',
  },
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BuildAStore',
      url: process.env.SITE_BASE_URL || 'https://buildastore.com',
      logo:
        (process.env.SITE_BASE_URL || 'https://buildastore.com') + '/logo.png',
      description: 'Modern ecommerce platform for creating online stores',
      sameAs: [
        'https://twitter.com/buildastore',
        'https://facebook.com/buildastore',
        'https://linkedin.com/company/buildastore',
      ],
    },
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'BuildAStore',
      description: 'Modern ecommerce platform for creating online stores',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  },
};

export const SORT_OPTIONS = [
  {
    label: 'Most Popular',
    value: 'popularity',
  },
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Price: Low to High',
    value: 'price_asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price_desc',
  },
  {
    label: 'Best Rating',
    value: 'rating',
  },
];

export const CURRENCIES = [
  {
    label: 'PKR',
    code: 'pk',
  },
  {
    label: 'USD',
    code: 'us',
  },
];
export const NAVIGATION = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      href: '/shop/women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          href: '/shop/women-clothing',
          items: [
            { name: 'Tops', href: '/shop/women-tops' },
            { name: 'Dresses', href: '/shop/women-dresses' },
            { name: 'Pants', href: '/shop/women-pants' },
            { name: 'Denim', href: '/shop/women-denim' },
            { name: 'Sweaters', href: '/shop/women-sweaters' },
            { name: 'T-Shirts', href: '/shop/women-t-shirts' },
            { name: 'Jackets', href: '/shop/women-jackets' },
            { name: 'Activewear', href: '/shop/women-activewear' },
            { name: 'Browse All', href: '/shop/women-clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          href: '/shop/women-accessories',
          items: [
            { name: 'Watches', href: '/shop/women-watches' },
            { name: 'Wallets', href: '/shop/women-wallets' },
            { name: 'Bags', href: '/shop/women-bags' },
            {
              name: 'Sunglasses',
              href: '/shop/women-sunglasses',
            },
            { name: 'Hats', href: '/shop/women-hats' },
            { name: 'Belts', href: '/shop/women-belts' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      href: '/shop/men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          href: '/shop/men-clothing',
          items: [
            { name: 'Tops', href: '/shop/men-tops' },
            { name: 'Pants', href: '/shop/men-pants' },
            { name: 'Sweaters', href: '/shop/men-sweaters' },
            { name: 'T-Shirts', href: '/shop/men-shirts' },
            { name: 'Jackets', href: '/shop/men-jackets' },
            { name: 'Activewear', href: '/shop/men-activewear' },
            { name: 'Browse All', href: '/shop/men-clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          href: '/shop/men-accessories',
          items: [
            { name: 'Watches', href: '/shop/men-watches' },
            { name: 'Wallets', href: '/shop/men-wallets' },
            { name: 'Bags', href: '/shop/men-bags' },
            { name: 'Sunglasses', href: '/shop/men-sunglasses' },
            { name: 'Hats', href: '/shop/men-hats' },
            { name: 'Belts', href: '/shop/men-belts' },
          ],
        },
      ],
    },
  ],
  pages: [{ name: 'Company', href: '/company' }],
};
