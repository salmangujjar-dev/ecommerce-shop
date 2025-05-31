import 'server-only';

import { cache } from 'react';

import { api } from '~trpc/server';

import { getSession } from '.';

export const verifySession = cache(async () => {
  console.log('cache verifySession');

  const session = await getSession();

  return { isAuth: true, id: session?.id };
});

export const getUser = cache(async () => {
  console.log('cache getUser');

  const session = await verifySession();
  if (!session.id) return null;

  try {
    const user = await api.users.getById(session.id);

    return user;
  } catch (error) {
    console.log('Failed to fetch user', error);
    return null;
  }
});
