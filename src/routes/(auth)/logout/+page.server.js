import { logoutService } from '$lib/features/auth/auth.service.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
  const session = cookies.get('SESSION');
  const result = logoutService(session);
  if (result) {
    cookies.delete('SESSION', { path: '/' });
    locals.user = null;
    throw redirect(303, '/login');
  }
}
