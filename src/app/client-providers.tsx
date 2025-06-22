'use client';

import { Toaster } from 'sonner';

import useShortcuts from '@hooks/useShortcuts';

import CartSync from '../components/CartSync';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  useShortcuts();

  return (
    <>
      <Toaster richColors position='top-right' offset={{ top: 100 }} />
      <CartSync />
      {children}
    </>
  );
};

export default ClientProviders;
