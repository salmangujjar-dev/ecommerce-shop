'use client';

import { Toaster } from 'sonner';

import CartSync from '../components/CartSync';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster richColors position='top-right' offset={{ top: 100 }} />
      <CartSync />
      {children}
    </>
  );
};

export default ClientProviders;
