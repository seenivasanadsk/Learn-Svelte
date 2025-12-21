import { commonError } from '$lib/core/response';
import { findUserById, getUserByUsername } from '../users/user.repository';
import { verifyPassword } from './password';
import {
  createSession,
  deleteSessionByTokenAndUserID,
  deleteSessionByUserId,
  findSessionByToken,
  findSessionByUsername
} from './session.repository';

export async function loginService(username, password, maxAge = 60 * 60 * 24 * 366) {
  if (!username || !password) {
    return commonError('Username and password are required', 400);
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return commonError('Invalid username or password', 401);
  }

  if (!user.isActive) {
    return commonError('User is Deactivated', 401);
  }

  const isValid = await verifyPassword(user.hashedPassword, password);

  if (!isValid) {
    return commonError('Invalid username or password', 401);
  }

  let session = await findSessionByUsername(username);

  if (session && session?.expiredOn > new Date()) {
    return commonError('User already Logged in', 401);
  }

  session = await createSession(user, maxAge);

  if (!session?.token) {
    return commonError('Session Error Occured', 401);
  }

  return {
    success: true,
    data: {
      session: `${session.token}.${user._id}`,
      user
    }
  };
}

export async function logoutService(storedSession) {
  if (!storedSession) {
    return commonError('Session is Required', 400);
  }

  const [token, userId] = storedSession.split('.');
  const result = await deleteSessionByTokenAndUserID(token, userId);

  if (!result.acknowledged) {
    return commonError('Session is Not Found', 401);
  }

  return {
    success: true
  };
}

export async function forceLogoutService(username, password) {
  if (!username || !password) {
    return commonError('Username and password are required', 400);
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return commonError('Invalid username or password', 401);
  }

  if (!user.isActive) {
    return commonError('User is Deactivated', 401);
  }

  const isValid = await verifyPassword(user.hashedPassword, password);

  if (!isValid) {
    return commonError('Invalid username or password', 401);
  }

  let result = await deleteSessionByUserId(user._id);

  if (!result.acknowledged) {
    return commonError('Force Logout Faild', 401);
  }

  return {
    success: true
  };
}

export async function verifySession(session) {
  const [token, userId] = session.split('.');

  if (!token || !userId) {
    return commonError('Invalid Session', 400);
  }

  session = await findSessionByToken(token);

  if (!session) {
    return commonError('Session Not Found', 400);
  }

  if (session.userId != userId) {
    return commonError('Wrong Session');
  }

  const user = await findUserById(userId);

  if (!user) {
    return commonError('User not found');
  }

  if (!user.isActive) {
    return commonError('User is Deactivated');
  }

  return user;
}
