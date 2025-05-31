'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import z from 'zod';

import { createSession, deleteSession } from '@lib/session';

import { api } from '~trpc/server';

import { protectedRoutes } from '../../../middleware';

import { loginSchema, registerSchema } from './validation';

export async function registerAction(data: z.infer<typeof registerSchema>) {
  const response = await api.auth.register(data);

  if (response.success) {
    redirect('/login');
  }
}

export async function loginAction(data: z.infer<typeof loginSchema>) {
  const response = await api.auth.login(data);

  if (response.success) {
    await createSession({
      ...response,
      accessToken: response.accessToken,
      rememberMe: data.rememberMe,
    });
    redirect('/dashboard');
  }
}

export async function logoutAction() {
  await deleteSession();
  const headerList = await headers();
  const pathname = headerList.get('x-current-pathname');
  if (pathname && protectedRoutes.some((route) => pathname.startsWith(route))) {
    redirect('/login');
  }
}
