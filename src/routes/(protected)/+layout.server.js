import { getServerIPv4 } from '$lib/core/server/network.js';

// src\routes\(protected)\+layout.server.js
export async function load({ locals, url }) {
  return { user: locals.user, serverIP: getServerIPv4(), port: url.port || null };
}
