import { verifySession } from '$lib/features/auth/auth.service';
import { redirect } from '@sveltejs/kit';

// Define public routes (no authentication required)
const PUBLIC_ROUTES = [
  '/login',
  '/logout', // Add logout to public routes
  '/force-logout'
];

// Define auth routes (only accessible when NOT logged in)
const AUTH_ROUTES = ['/login', '/force-logout'];

export async function handle({ event, resolve }) {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // SKIP DATA REQUESTS IN HOOKS (IMPORTANT!)
  if (path.includes('/__data.json') || path.includes('.json')) {
    return await resolve(event);
  }

  // 1. Extract session from cookies
  const session = event.cookies.get('SESSION');

  // 2. Verify session and set user in locals
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
      // Invalid session - clear cookie
      event.cookies.delete('SESSION', { path: '/' });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  // 3. Route protection logic
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => route === path || (route.endsWith('*') && path.startsWith(route.slice(0, -1)))
  );

  const isAuthRoute = AUTH_ROUTES.includes(path);

  // 4. CRITICAL FIX: Check for data.json in redirect URLs
  const redirectTo = url.searchParams.get('redirectTo');

  if (redirectTo && redirectTo.includes('__data.json')) {
    // Remove the redirectTo parameter if it points to a data file
    url.searchParams.delete('redirectTo');
    throw redirect(303, url.pathname + url.search);
  }

  // 5. Redirect logic
  if (!isPublicRoute && !event.locals.user) {
    // Don't redirect if we're already on login or logout
    if (path !== '/login' && path !== '/logout') {
      throw redirect(303, `/login?redirectTo=${encodeURIComponent(path)}`);
    }
  }

  if (isAuthRoute && event.locals.user && path !== '/logout') {
    // Redirect away from auth pages if already logged in
    const safeRedirectTo = redirectTo || '/';
    // Ensure we're not creating a loop
    if (safeRedirectTo !== path) {
      throw redirect(303, safeRedirectTo);
    }
  }

  // 6. Proceed with the request
  return await resolve(event);
}
