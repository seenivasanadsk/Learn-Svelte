import { data } from '$lib/message.js';
import { fail } from '@sveltejs/kit';
import { error } from 'console';

export function load({ params, cookies }) {
  return { count: 123 };
}

export const actions = {
  test: async ({ cookies, request }) => {
    // return fail(422, { error: "This is server errror" })
    const data = await request.formData();
    console.log("test", data, cookies.delete("SESSION_ID", { path: "/" }))
  }
};