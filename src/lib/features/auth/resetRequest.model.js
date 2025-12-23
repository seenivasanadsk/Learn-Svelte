export const ALLOWED_UPDATE_FIELDS = ['username', 'role', 'isActive'];

export function resetRequestCreateModel(data, overridableData) {
  const input = { ...data, ...overridableData }
  return {
    username: input.username,
    userId: input._id,
    status: 'NEW', // [NEW, PROCESSING, APROVED, FINISHED, CANCELED]
    approver: [], // {id, username, approvedAt}
    createdAt: new Date(),
    cancelledAt: null,
    cancelledBy: null
  }
}