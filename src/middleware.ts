import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { JWTService } from '@services/JWT';

export const protectedRoutes = ['/admin', '/dashboard', '/setting', '/orders'];
export const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log({ path });
  console.log({ srcPath: request.url });
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value as string;
  const userPayload = await JWTService.decrypt(token);

  if (isProtectedRoute && !userPayload?.id) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isAuthRoute && userPayload?.id) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-pathname', path);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
