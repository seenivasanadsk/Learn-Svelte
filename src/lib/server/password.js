// src/lib/server/password.js
import argon2 from 'argon2';

// Hash a plain password. Uses secure Argon2id by default.
export async function hashPassword(password) {
  if (!password) throw new Error('Password is required');
  return await argon2.hash(password);
}

// Verify a password against a hash
export async function verifyPassword(hash, password) {
  if (!hash || !password) return false;
  return await argon2.verify(hash, password);
}
