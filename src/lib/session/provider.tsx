'use client';

import { createContext, useContext } from 'react';

import { getUser } from './dal';

type User = Awaited<ReturnType<typeof getUser>>;

interface SessionContextType {
  user: User;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isAuthenticated: false,
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <SessionContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </SessionContext.Provider>
  );
};
