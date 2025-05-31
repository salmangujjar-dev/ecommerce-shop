import 'server-only';

import { cookies } from 'next/headers';

import CommonUtils from '@utils/common';

import {
  JWT_EXPIRATION_TIME,
  JWT_REMEMBER_ME_EXPIRATION_TIME,
  JWTService,
} from '@services/JWT';

export async function createSession(response: {
  success: boolean;
  message: string;
  accessToken: string;
  rememberMe?: boolean;
}) {
  const cookieStore = await cookies();

  cookieStore.set('token', response.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(
      Date.now() +
        CommonUtils.numberToMilliseconds(
          response.rememberMe
            ? JWT_REMEMBER_ME_EXPIRATION_TIME
            : JWT_EXPIRATION_TIME
        )
    ),
  });
}

export async function getSession() {
  const token = (await cookies()).get('token')?.value as string;
  const payload = await JWTService.decrypt(token);

  if (!token || !payload) {
    return null;
  }

  return payload;
}

export async function updateSession() {
  const token = (await cookies()).get('token')?.value as string;
  const payload = await JWTService.decrypt(token);

  if (!token || !payload) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    expires: new Date(
      Date.now() + CommonUtils.numberToMilliseconds(JWT_EXPIRATION_TIME)
    ),
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
