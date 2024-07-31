import { NextResponse } from 'next/server';
import { userByToken } from '@/lib/services';

export async function middleware(request) {
  const session = request.cookies.has('session');

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data } = await userByToken();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-rol', data?.rol);
  requestHeaders.set('x-user-punto', data?.areaVenta?.id);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg|login).*)',
  ],
};
