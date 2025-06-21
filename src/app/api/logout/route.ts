import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.headers.set(
    'Set-Cookie',
    `token=; Path=/; Expires=${new Date(
      0
    ).toUTCString()}; HttpOnly; SameSite=Lax`
  );
  return response;
}
