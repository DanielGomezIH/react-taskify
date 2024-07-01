import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/organization(.*)',
  '/select-org(.*)',
  '/board(.*)',
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  // handle authenticated users who are trying to access a public route
  if (auth().userId && !isProtectedRoute(req)) {
    let path = '/select-org';
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }
    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Handle not authenticated users who are trying to access a private route
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // Handle authenticated users who doesn't have an organization and there aren't in select-org page
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== '/select-org'
  ) {
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
