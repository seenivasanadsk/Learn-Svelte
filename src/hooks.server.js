import { verifySession } from '$lib/features/auth/auth.service';
import { redirect } from '@sveltejs/kit';

// Public routes (no authentication required)
const PUBLIC_ROUTES = ['/login', '/logout', '/force-logout'];

// Auth routes (only accessible when NOT logged in)
const AUTH_ROUTES = ['/login', '/force-logout'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // --- Skip JSON/data requests ---
  if (path.includes('/__data.json') || path.includes('.json')) {
    return await resolve(event);
  }

  // --- 1. Extract session from cookies ---
  const session = event.cookies.get('SESSION');

  // --- 2. Verify session and set locals ---
  if (session) {
    const user = await verifySession(session);
    if (user) {
      event.locals.user = {
        id: user._id.toString(),
        role: user.role,
        username: user.username,
        settings: user.settings
      };
    } else {
      // Invalid session
      event.cookies.delete('SESSION', { path: '/' });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  // --- 3. Route classification ---
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => route === path || (route.endsWith('*') && path.startsWith(route.slice(0, -1)))
  );

  const isAuthRoute = AUTH_ROUTES.includes(path);

  // --- 4. Get redirectTo parameter ---
  let redirectTo = url.searchParams.get('redirectTo');

  // Prevent data.json redirects
  if (redirectTo && redirectTo.includes('__data.json')) {
    url.searchParams.delete('redirectTo');
    throw redirect(303, url.pathname + url.search);
  }

  // Normalize redirectTo: make sure it’s internal
  if (redirectTo && !redirectTo.startsWith('/')) {
    redirectTo = '/';
  }

  // --- 5. Redirect logic ---

  // 5a. Unauthenticated user trying to access protected routes
  if (!isPublicRoute && !event.locals.user) {
    // Skip redirect if already on login/logout
    if (path !== '/login' && path !== '/logout') {
      const fullPath = path + url.search;
      throw redirect(303, `/login?redirectTo=${encodeURIComponent(fullPath)}`);
    }
  }

  // 5b. Authenticated user on auth-only pages
  if (isAuthRoute && event.locals.user && path !== '/logout') {
    // Prevent redirect loops
    const safeRedirectTo = redirectTo || '/';
    if (safeRedirectTo !== path && safeRedirectTo !== '/login') {
      throw redirect(303, safeRedirectTo);
    }
  }

  // --- 6. Proceed normally ---
  return await resolve(event);
}
