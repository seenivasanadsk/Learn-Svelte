import crypto from 'node:crypto';

export function sessionCreateModel(data, overridableData) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiredOn = new Date(new Date().setSeconds(overridableData.maxAge));
  const user = overridableData.user
  return {
    token: token,
    userId: user._id,
    username: user.username,
    userRole: user.role,
    createdAt: new Date(),
    expiredOn,
  }
}