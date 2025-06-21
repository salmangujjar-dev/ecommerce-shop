export const APP_NAME = 'E-Commerce Shop';
export const APP_DESCRIPTION = 'E-Commerce Shop';

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
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
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
