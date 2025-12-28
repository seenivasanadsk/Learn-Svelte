// src\routes\(auth)\login\+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { loginService } from '$lib/features/auth/auth.service.js';
import { getAllUsernames } from '$lib/features/users/user.repository.js';

export async function load({ cookies }) {
  const result = await getAllUsernames();
  const userList = result.map((user) => user.username);
  const lastUsername = cookies.get('LAST_USERNAME');
  return { userList, lastUsername };
}

export const actions = {
  login: async ({ cookies, request, url }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    const result = await loginService(username, password);

    // ❌ Expected error
    if (!result.ok) {
      return fail(400, { message: result?.message || 'Enter Correct Details' });
    }

    // ✅ SUCCESS → REDIRECT
    const cookieOption = {
      path: '/', // required
      httpOnly: true, // JS can't access
      sameSite: 'strict', // CSRF protection
      // secure: true, // HTTPS only (use false in dev if needed)
      secure: false,
      maxAge: 60 * 60 * 25 * 366 // Store cookies in maxAge in seconds (1year)
    };
    cookies.set('SESSION', result.data.session, cookieOption);
    cookies.set('LAST_USERNAME', username, cookieOption);
    throw redirect(303, url.searchParams.get('redirectTo') || '/');
  }
};
