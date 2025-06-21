import { getUser } from '@lib/session/dal';
import { SessionProvider } from '@lib/session/provider';

import { TRPCReactProvider } from '~trpc/client';

import ClientProviders from './client-providers';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <TRPCReactProvider>
      <SessionProvider user={user}>
        <ClientProviders>{children}</ClientProviders>
      </SessionProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
