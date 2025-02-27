import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { ALMACENES, ROLES } from '@/app/(with-layout)/users/types';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  const verifyToken =
    token &&
    (await verifyAuth(token).catch((e) => {
      console.log(e);
    }));

  if (!verifyToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  const encodedRole = encodeURIComponent(verifyToken?.rol as string);
  requestHeaders.set('x-user-id', verifyToken?.id as string);
  requestHeaders.set('x-user-rol', encodedRole);
  requestHeaders.set('x-user-area-venta', verifyToken?.area_venta as string);
  requestHeaders.set('x-user-almacen', verifyToken?.almacen as string);

  if (verifyToken?.rol !== ROLES.ADMIN && request.nextUrl.pathname == '/') {
    if (verifyToken?.rol === ROLES.SUPERVISOR) {
      return NextResponse.redirect(new URL('/tarjetas', request.url));
    }
    if (
      verifyToken?.rol === ROLES.ALMACENERO &&
      verifyToken?.almacen === ALMACENES.CAFETERIA
    ) {
      return NextResponse.redirect(
        new URL('/inventario-cafeteria', request.url)
      );
    }
    if (verifyToken?.rol === ROLES.VENDEDOR_CAFETERIA) {
      return NextResponse.redirect(new URL('/cafeteria', request.url));
    }
  }

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
