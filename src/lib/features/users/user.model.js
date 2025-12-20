export const ALLOWED_UPDATE_FIELDS = ['username', 'role', 'isActive'];

export function userCreateModel(data, overridableData, seed = false) {
  const input = { ...data, ...overridableData };
  return {
    username: input.username,
    hashedPassword: input.hashedPassword,
    role: input.role,
    lastLogin: null,
    lastAccess: null,
    lastPasswordReset: null,
    createdAt: seed ? null : new Date(),
    createdBy: seed ? null : input.createdBy,
    updatedAt: null,
    updatedBy: null,
    seededAt: seed ? new Date() : null,
    isActive: true,
    settings: {}
  };
}

export function userUpdateModel(data, overridableData) {
  const input = { ...data, ...overridableData };
  const update = {};

  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (field in input) {
      update[field] = input[field];
    }
  }

  update.updatedAt = new Date();
  update.updatedBy = input.updatedBy ?? null;

  return update;

  // hashedPassword: input.hashedPassword,
  // lastLogin: null,
  // lastAccess: null,
  // lastPasswordReset: null,
  // settings: {}
}
