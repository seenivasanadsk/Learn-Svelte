import { verifySession } from '$lib/features/auth/auth.service';
import { redirect } from '@sveltejs/kit';

// Public routes (no authentication required)
const PUBLIC_ROUTES = ['/login', '/logout', '/force-logout', '/reset-request'];

// Auth routes (only accessible when NOT logged in)
const AUTH_ROUTES = ['/login', '/force-logout'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // --------------------------------------------------
  // 0. Skip JSON / data requests
  // --------------------------------------------------
  if (path.includes('/__data.json') || path.includes('.json')) {
    return await resolve(event);
  }

  // --------------------------------------------------
  // 1. Extract session from cookies
  // --------------------------------------------------
  const session = event.cookies.get('SESSION');

  // --------------------------------------------------
  // 2. Verify session and set locals
  // --------------------------------------------------
  if (session) {
    let result = await verifySession(session);
    const user = result.data

    if (user) {
      event.locals.user = {
        id: user._id.toString(),
        role: user.role,
        username: user.username,
        settings: user.settings
      };
    } else {
      event.cookies.delete('SESSION', { path: '/' });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  // --------------------------------------------------
  // 3. Route classification
  // --------------------------------------------------
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      route === path ||
      (route.endsWith('*') && path.startsWith(route.slice(0, -1)))
  );

  const isAuthRoute = AUTH_ROUTES.includes(path);

  // --------------------------------------------------
  // 4. redirectTo handling
  // --------------------------------------------------
  let redirectTo = url.searchParams.get('redirectTo');

  if (redirectTo && redirectTo.includes('__data.json')) {
    url.searchParams.delete('redirectTo');
    throw redirect(303, url.pathname + url.search);
  }

  if (redirectTo && !redirectTo.startsWith('/')) {
    redirectTo = '/';
  }

  // --------------------------------------------------
  // 5. HARD BLOCK: logged-in users on login
  // --------------------------------------------------
  if (event.locals.user && path === '/login') {
    throw redirect(303, redirectTo || '/');
  }

  // --------------------------------------------------
  // 6. Redirect logic
  // --------------------------------------------------
  if (!isPublicRoute && !event.locals.user) {
    if (path !== '/login' && path !== '/logout') {
      const fullPath = path + url.search;
      throw redirect(303, `/login?redirectTo=${encodeURIComponent(fullPath)}`);
    }
  }

  if (isAuthRoute && event.locals.user && path !== '/logout') {
    const safeRedirectTo = redirectTo || '/';

    if (safeRedirectTo !== path && safeRedirectTo !== '/login') {
      throw redirect(303, safeRedirectTo);
    }
  }

  // --------------------------------------------------
  // 7. Resolve request
  // --------------------------------------------------
  const response = await resolve(event);

  // --------------------------------------------------
  // 🔒 8. NO-CACHE HEADERS (HTML ONLY)
  // --------------------------------------------------
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('text/html')) {
    response.headers.set(
      'cache-control',
      'no-store, no-cache, must-revalidate, max-age=0'
    );
    response.headers.set('pragma', 'no-cache');
    response.headers.set('expires', '0');
  }

  return response;
}
