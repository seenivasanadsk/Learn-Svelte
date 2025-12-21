// src\routes\(protected)\+layout.server.js
export async function load({ locals }) {
  return { user: locals.user };
}
