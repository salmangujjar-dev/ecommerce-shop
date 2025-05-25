import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      const originalEntry = config.entry;
      const wdyrSource = path.join(__dirname, 'src/lib/wdyr.ts');

      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main-app'] && !entries['main-app'].includes(wdyrSource)) {
          entries['main-app'].unshift(wdyrSource);
        }

        return entries;
      };
    }

    return config;
  },
  images: {
    domains: ['tailwindcss.com', 'images.unsplash.com', 'flagcdn.com'],
  },
};

export default nextConfig;
