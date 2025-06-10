'use client';

import { Toaster } from 'sonner';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster richColors position='top-right' offset={{ top: 100 }} />
      {children}
    </>
  );
};

export default ClientProviders;
