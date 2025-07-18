import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './libs/utils/session.utils';
import { getCookie } from './libs/utils/cookie.utils';
import { App } from './libs/constants/app.const';

// 1. Specify public routes
const publicRoutes = ['/login', '/forbidden'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname || '/dashboard';
  const isPublicRoute = publicRoutes.includes(path);
  const session = await getSession();

  if (!isPublicRoute && !session.isLogin) {
    const response = NextResponse.redirect(new URL('/login', req.nextUrl));
    response.cookies.set('current-path', path || '/dashboard');
    // if (path !== '/dashboard') {
    // }
    return response;
  }

  if (isPublicRoute && session.isLogin) {
    const redirect = (await getCookie(App.REDIRECT_NAME)) || '/dashboard';
    const response = NextResponse.redirect(new URL(redirect, req.nextUrl));
    response.cookies.delete('current-path'); // opsional: hapus jika tidak diperlukan
    return response;
  }

  // Untuk route public atau protected yang sudah lolos validasi
  const response = NextResponse.next();
  if (!isPublicRoute && path !== '/dashboard') {
    response.cookies.set('current-path', path);
  }
  return response;
}
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|v1|media|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)'],
};
