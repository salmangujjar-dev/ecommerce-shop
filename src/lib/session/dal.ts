import 'server-only';

import { redirect } from 'next/navigation';

import { cache } from 'react';

import { api } from '~trpc/server';

import CommonUtils from '@utils/common';
import { isTRPCError } from '@utils/error';

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
    if (
      isTRPCError(error) &&
      (error.code === 'UNAUTHORIZED' || error.code === 'FORBIDDEN')
    ) {
      redirect(`${CommonUtils.getBaseUrl()}/api/logout`);
    }
    console.log('Failed to fetch user', error);
    return null;
  }
});
