// src\hooks.server.js

import { verifySession } from '$lib/features/auth/auth.service';
import { redirect } from '@sveltejs/kit';

// Public routes (no authentication required)
const PUBLIC_ROUTES = ['/reset-request'];

// Auth routes (only accessible when NOT logged in)
const AUTH_ROUTES = ['/login', '/force-logout'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // --------------------------------------------------
  // 1. Extract session from cookies
  // --------------------------------------------------
  const session = event.cookies.get('SESSION');

  // --------------------------------------------------
  // 2. Verify session and set locals
  // --------------------------------------------------
  if (session) {
    let result = await verifySession(session);

    if (result.ok) {
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
      event.cookies.delete('SESSION', { path: '/' });
      event.locals.user = null;
    }
  } else {
    event.cookies.delete('SESSION', { path: '/' });
    event.locals.user = null;
  }

  // --------------------------------------------------
  // 3. Skip JSON / data requests
  // --------------------------------------------------
  if (path.includes('/__data.json') || path.includes('.json') || path.includes('/api/events')) {
    return await resolve(event);
  }

  // --------------------------------------------------
  // 4. Route classification
  // --------------------------------------------------
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      route === path ||
      (route.endsWith('*') && path.startsWith(route.slice(0, -1)))
  );
  const isAuthRoute = AUTH_ROUTES.includes(path);

  // --------------------------------------------------
  // 5. Make stay logged users in home page when access login page
  // --------------------------------------------------
  if (event.locals.user && isAuthRoute) {
    throw redirect(303, '/');
  }

  // --------------------------------------------------
  // 6. Redirect to login page when user not logged in
  // --------------------------------------------------
  if (!isPublicRoute && !event.locals.user) {
    if (path === '/') {
      throw redirect(303, `/login`);
    } else if (path !== '/login' && !isAuthRoute) {
      const fullPath = path + url.search;
      throw redirect(303, `/login?redirectTo=${encodeURIComponent(fullPath)}`);
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
