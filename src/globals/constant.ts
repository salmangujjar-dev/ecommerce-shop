export const APP_NAME = 'E-Commerce Shop';
export const APP_DESCRIPTION = 'E-Commerce Shop';

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
            { name: 'Tops', href: '/shop/women-clothing?q=tops' },
            { name: 'Dresses', href: '/shop/women-clothing?q=dresses' },
            { name: 'Pants', href: '/shop/women-clothing?q=pants' },
            { name: 'Denim', href: '/shop/women-clothing?q=denim' },
            { name: 'Sweaters', href: '/shop/women-clothing?q=sweaters' },
            { name: 'T-Shirts', href: '/shop/women-clothing?q=t-shirts' },
            { name: 'Jackets', href: '/shop/women-clothing?q=jackets' },
            { name: 'Activewear', href: '/shop/women-clothing?q=activewear' },
            { name: 'Browse All', href: '/shop/women-clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          href: '/shop/women-accessories',
          items: [
            { name: 'Watches', href: '/shop/women-accessories?q=watches' },
            { name: 'Wallets', href: '/shop/women-accessories?q=wallets' },
            { name: 'Bags', href: '/shop/women-accessories?q=bags' },
            {
              name: 'Sunglasses',
              href: '/shop/women-accessories?q=sunglasses',
            },
            { name: 'Hats', href: '/shop/women-accessories?q=hats' },
            { name: 'Belts', href: '/shop/women-accessories?q=belts' },
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
            { name: 'Tops', href: '/shop/men-clothing?q=tops' },
            { name: 'Pants', href: '/shop/men-clothing?q=pants' },
            { name: 'Sweaters', href: '/shop/men-clothing?q=sweaters' },
            { name: 'T-Shirts', href: '/shop/men-clothing?q=t-shirts' },
            { name: 'Jackets', href: '/shop/men-clothing?q=jackets' },
            { name: 'Activewear', href: '/shop/men-clothing?q=activewear' },
            { name: 'Browse All', href: '/shop/men-clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          href: '/shop/men-accessories',
          items: [
            { name: 'Watches', href: '/shop/men-accessories?q=watches' },
            { name: 'Wallets', href: '/shop/men-accessories?q=wallets' },
            { name: 'Bags', href: '/shop/men-accessories?q=bags' },
            { name: 'Sunglasses', href: '/shop/men-accessories?q=sunglasses' },
            { name: 'Hats', href: '/shop/men-accessories?q=hats' },
            { name: 'Belts', href: '/shop/men-accessories?q=belts' },
          ],
        },
      ],
    },
  ],
  pages: [{ name: 'Company', href: '/company' }],
};
