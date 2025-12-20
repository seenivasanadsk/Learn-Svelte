// src\routes\(auth)\login\+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { loginService } from '$lib/features/auth/auth.service.js';
import { getAllUsernames } from '$lib/features/users/user.repository.js';

export async function load() {
  const result = await getAllUsernames();
  const userList = result.map(user => user.username);
  return { userList };
}

export const actions = {
  login: async ({ cookies, request }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    const maxAge = 60 * 60 * 24 * 366;

    const result = await loginService(username, password, maxAge);

    // ❌ Expected error
    if (!result.success) {
      return fail(result.status, {
        message: result.message
      });
    }

    // ✅ SUCCESS → REDIRECT
    const cookieOption = {
      path: '/',              // required
      httpOnly: true,         // JS can't access
      sameSite: 'strict',     // CSRF protection
      secure: true,           // HTTPS only (use false in dev if needed)
      maxAge
    }
    cookies.set('SESSION', result.data.session, cookieOption)
    throw redirect(303, '/');
  }
};
