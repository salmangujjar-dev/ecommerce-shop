import { Feature } from './types';

export const FEATURED_ITEMS: Feature[] = [
  {
    id: 'social-impact',
    heading: 'Elevate Your Style',
    description:
      'Discover clothing that blends comfort, quality, and modern design. Express yourself with our curated collection, crafted to help you stand out and feel confident every day. Refresh your wardrobe and make every outfit count.',
    link: { text: 'Shop Clothing', to: '/shop' },
    coverImg:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-01.jpg',
  },
  {
    id: 'comfort',
    heading: 'Simple productivity',
    description:
      "Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the undeniable urge to fill empty circles.",
    link: { text: 'Shop Focus', to: '#' },
    coverImg:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-02.jpg',
  },
];
