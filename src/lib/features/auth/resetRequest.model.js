import { serializeDoc } from "$lib/utils/serializer";

export const ALLOWED_UPDATE_FIELDS = ['username', 'role', 'isActive'];

export function resetRequestCreateModel(data, overridableData) {
  const input = { ...data, ...overridableData }
  return {
    username: input.username,
    userId: input._id,
    status: 'NEW', // [NEW, WAITING, APPROVED, FINISHED, REJECTED]
    approver: [], // {id, username, approvedAt}
    createdAt: new Date(),
    cancelledAt: null,
    cancelledBy: null
  }
}

export function resetRequestSerializer(resetRequest) {
  return serializeDoc(resetRequest)
}