import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './libs/utils/session.utils';
import { getCookie } from './libs/utils/cookie.utils';
import { App } from './libs/constants/app.const';

// 1. Specify public routes
const publicRoutes = ['/login', '/forbidden'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the session from the cookie
  const session = await getSession();

  // 4. Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !session.isLogin) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session.isLogin) {
    const redirect = (await getCookie(App.REDIRECT_NAME)) || '/dashboard';
    return NextResponse.redirect(new URL(redirect, req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|v1|media|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)'],
};
