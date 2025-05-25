import { Feature } from './types';

export const FEATURED_ITEMS: Feature[] = [
  {
    id: 'social-impact',
    heading: 'Level up your desk',
    description:
      'Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice desk setup.',
    link: { text: 'Shop Workspace', to: '#' },
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
