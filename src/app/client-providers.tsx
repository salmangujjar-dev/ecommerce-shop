'use client';

import { Toaster } from 'sonner';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster richColors position='top-right' />
      {children}
    </>
  );
};

export default ClientProviders;
