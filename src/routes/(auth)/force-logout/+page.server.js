import { forceLogoutService } from '$lib/features/auth/auth.service.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  forceLogout: async ({ cookies, request }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    const result = await forceLogoutService(username, password);

    // ❌ Expected error
    if (!result.success) {
      return fail(result.status, {
        message: result.message
      });
    }

    // ✅ SUCCESS → REDIRECT
    cookies.delete('SESSION', { path: '/' });
    throw redirect(303, '/login');
  }
};
