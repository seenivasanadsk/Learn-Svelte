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
    return { message: 'Username and password are required', ok: false };
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return { message: 'Invalid username or password', ok: false };
  }

  if (!user.isActive) {
    return { message: 'User is Deactivated', ok: false };
  }

  const isValid = await verifyPassword(user.hashedPassword, password);

  if (!isValid) {
    return { message: 'Invalid username or password', ok: false };
  }

  let session = await findSessionByUsername(username);

  if (session && session?.expiredOn > new Date()) {
    return { message: 'User already Logged in', ok: false };
  }

  session = await createSession(user, maxAge);

  if (!session?.token) {
    return { message: 'Session Error Occured', ok: false };
  }

  return {
    ok: true,
    data: {
      session: `${session.token}.${user._id}`,
      user
    },
    message: "Login successful"
  };
}

export async function logoutService(storedSession) {
  if (!storedSession) {
    return { message: 'Session is Required', ok: false };
  }

  const [token, userId] = storedSession.split('.');
  const result = await deleteSessionByTokenAndUserID(token, userId);

  if (!result.acknowledged) {
    return { message: 'Session is Not Found', ok: false };
  }

  return {
    ok: true,
    message: 'Logout successful'
  };
}

export async function forceLogoutService(username, password) {
  if (!username || !password) {
    return { message: 'Username and password are required', ok: false };
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return { message: 'Invalid username or password', ok: false };
  }

  if (!user.isActive) {
    return { message: 'User is Deactivated', ok: false };
  }

  const isValid = await verifyPassword(user.hashedPassword, password);

  if (!isValid) {
    return { message: 'Invalid username or password', ok: false };
  }

  let result = await deleteSessionByUserId(user._id);

  if (!result.acknowledged) {
    return { message: 'Force Logout Faild', ok: false };
  }

  return {
    ok: true,
    message: 'Force logout successful'
  };
}

export async function verifySession(session) {
  const [token, userId] = session.split('.');

  if (!token || !userId) {
    return { message: 'Invalid Session', ok: false };
  }

  session = await findSessionByToken(token);

  if (!session) {
    return { message: 'Session Not Found', ok: false };
  }

  if (session.userId != userId) {
    return {
      message: 'Wrong Session', ok: false
    }
  }

  const user = await findUserById(userId);

  if (!user) {
    return {
      message: 'User not found', ok: false
    }
  }

  if (!user.isActive) {
    return {
      message: 'User is Deactivated', ok: false
    }
  }

  return {
    ok: true,
    data: user,
    message: "Verificaiton successful"
  };
}
