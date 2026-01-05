// src\lib\features\auth\auth.service.js

import { env } from '$env/dynamic/private';
import { ObjectId } from 'mongodb';
import {
  changePassword,
  getAllUsernames,
  getUserById,
  getUserByUsername,
  updateUser
} from '../users/user.repository';
import { hashPassword, verifyPassword } from './password';
import { resetRequestCreateModel } from './resetRequest.model';
import {
  createResetRequest,
  getOpenResetRequestByStatus,
  updateResetRequest
} from './resetRequest.repository';
import {
  createSession,
  deleteSessionByToken,
  deleteSessionByTokenAndUserID,
  deleteSessionByUserId,
  findSessionByToken,
  findSessionByUsername
} from './session.repository';

export async function loginService(username, password) {
  const maxAge = env.SESSION_MAX_AGE || 60 * 60 * 24; // 1 days in sesconds

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

  await updateUser(user._id, { lastLogin: new Date() })

  return {
    ok: true,
    data: {
      session: `${session.token}.${user._id}`,
      user
    },
    message: 'Login successful'
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

  await updateUser(userId, { lastLogout: new Date() })

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

  await updateUser(user._id, { lastLogout: new Date() })

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

  if (session.expiredOn < new Date()) {
    await deleteSessionByToken(token);
    return { message: 'Session Expired', ok: false };
  }

  if (session.userId != userId) {
    return {
      message: 'Wrong Session',
      ok: false
    };
  }

  const user = await getUserById(userId);

  if (!user) {
    await deleteSessionByToken(token);
    return {
      message: 'User not found',
      ok: false
    };
  }

  if (!user.isActive) {
    await deleteSessionByToken(token);
    return {
      message: 'User is Deactivated',
      ok: false
    };
  }

  await updateUser(userId, { lastAccess: new Date() })

  return {
    ok: true,
    data: user,
    message: 'Verificaiton successful'
  };
}

// -------------------------------------
//  Reset Request Related Services
// -------------------------------------

export async function createResetRequestService(username) {
  if (!username) {
    return { message: 'Username is required', ok: false };
  }

  const exsitingNewResetReqeust = await getOpenResetRequestByStatus();
  if (exsitingNewResetReqeust?._id) {
    return { message: 'Reset Request Already Requested', ok: false };
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return { message: 'User not exist', ok: false };
  }

  if (!user.isActive) {
    return { message: 'User Deactivated', ok: false };
  }

  const resetRequest = resetRequestCreateModel(user);
  const result = await createResetRequest(resetRequest);

  if (!result.acknowledged) {
    return { message: 'Reset request not created', ok: false };
  }

  return {
    ok: true,
    message: 'Reset Request Created'
  };
}

export async function getActiveResetRequest() {
  return await getOpenResetRequestByStatus();
}

export async function approveResetRequestService(currentUser, STATUS, index) {
  const approver = { id: currentUser?.id, username: currentUser?.username, approvedAt: new Date() };
  const exsitingNewResetReqeust = await getOpenResetRequestByStatus();

  if (!exsitingNewResetReqeust?._id) {
    return { message: 'Reset Request not exist', ok: false };
  }

  if (exsitingNewResetReqeust.userId == currentUser?.id) {
    return { message: `Can't approve own request`, ok: false };
  }

  if (exsitingNewResetReqeust.approver[index]?.userId) {
    return { message: 'Already approved', ok: false };
  }

  const isCurrentUserAlreadyApproved =
    exsitingNewResetReqeust?.approver?.some((a) => a?.id === currentUser?.id) ?? false;

  if (isCurrentUserAlreadyApproved) {
    return { message: `Same user can't approve twice`, ok: false };
  }

  exsitingNewResetReqeust.approver[index] = approver;

  const activeUsers = await getAllUsernames();
  const users = activeUsers.map((u) => u.username);

  let approverCount = users.filter((u) => u !== exsitingNewResetReqeust?.username).length;
  approverCount = approverCount >= 2 ? 2 : 1;

  const approvedCount = exsitingNewResetReqeust.approver.filter((a) => a?.username).length;

  exsitingNewResetReqeust.status = approvedCount == approverCount ? 'APPROVED' : 'WAITING';

  const { _id, ...resetRequest } = exsitingNewResetReqeust;

  const result = await updateResetRequest(resetRequest, _id);

  if (!result.acknowledged) {
    return { message: 'Reset Request not Updated', ok: false };
  }

  return { ok: true, data: await getOpenResetRequestByStatus() };
}

export async function changePasswordByResetRequest(newPassword, confirmPassword, currentUser) {
  if (newPassword !== confirmPassword) {
    return { message: 'Confrim password not match', ok: false };
  }

  const exsitingNewResetReqeust = await getOpenResetRequestByStatus();

  if (currentUser?.id ? exsitingNewResetReqeust?.userId?.toString() !== currentUser?.id : false) {
    return { message: `You can't change password`, ok: false };
  }

  const hashedPassword = await hashPassword(newPassword);

  let result = await changePassword(exsitingNewResetReqeust?.userId, hashedPassword);

  if (!result.acknowledged) {
    return { message: `Password Can't changed`, ok: false };
  }

  result = await deleteSessionByUserId(exsitingNewResetReqeust?.userId)

  if (!result.acknowledged) {
    return { message: `Password Changed, But session not removed`, ok: false };
  }

  const { _id, ...resetRequest } = exsitingNewResetReqeust;
  resetRequest.status = 'FINISHED';

  result = await updateResetRequest(resetRequest, _id);

  if (!result.acknowledged) {
    return { message: `Password Updated Reset request can't updated`, ok: false };
  }

  return { ok: true, message: 'Passwrod Updated successful' };
}

export async function cancelResetRequestService(currentUser) {
  if (!currentUser?.id) {
    return { message: `Only a logged-in user can cancel the request.`, ok: false };
  }

  const exsitingNewResetReqeust = await getOpenResetRequestByStatus();

  const { _id, ...resetRequest } = exsitingNewResetReqeust;
  resetRequest.status = 'REJECTED';
  resetRequest.cancelledAt = new Date();
  resetRequest.cancelledBy = new ObjectId(currentUser?.id);

  const result = await updateResetRequest(resetRequest, _id);

  if (!result.acknowledged) {
    return { message: `Can't Cancel Request`, ok: false };
  }

  return { ok: true, message: 'Reset Request Cancelled' };
}
