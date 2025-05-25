import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@utils/cn';

import { APP_DESCRIPTION, APP_NAME } from '@globals/constant';

import Loader from './loader';
import Providers from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          inter.className,
          'antialiased flex flex-col min-h-screen'
        )}
      >
        <Loader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
