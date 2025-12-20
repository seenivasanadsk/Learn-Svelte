import { commonError } from "$lib/core/response";
import { getUserByUsername } from "../users/user.repository";
import { verifyPassword } from "./password";
import { createSession, deleteSessionByTokenAndUserID, findSessionByUsername } from "./session.repository";

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

  let session = await findSessionByUsername(username)

  if (session && session?.expiredOn > new Date()) {
    return commonError('User already Logged in', 401)
  }

  session = await createSession(user, maxAge)

  if (!session?.token) {
    return commonError('Session Error Occured', 401)
  }

  return {
    success: true,
    data: {
      session: `${session.token}.${user._id}`,
    }
  };
}

export async function logoutService(storedSession) {
  if (!storedSession) {
    return commonError('Session is Required', 400);
  }

  const { token, userId } = storedSession
  const result = await deleteSessionByTokenAndUserID(token, userId);
  console.log(result)

  if (!result.acknowledged) {
    return commonError('Session is Not Found', 401)
  }

  return {
    success: true
  };
}
