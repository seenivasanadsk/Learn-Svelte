import { ObjectId } from "mongodb";

export const ALLOWED_UPDATE_FIELDS = ['name', 'phone', 'note', 'isActive'];

export function partyCreateModel(data, overridableData, seed = false) {
  const input = { ...data, ...overridableData };
  return {
    name: input.name,
    phone: input.phone,
    note: input.note,
    createdAt: seed ? null : new Date(),
    createdBy: seed ? null : new ObjectId(input.createdBy),
    updatedAt: null,
    updatedBy: null,
    seededAt: seed ? new Date() : null,
    isActive: false,
  };
}

export function partyUpdateModel(data, overridableData) {
  const input = { ...data, ...overridableData };
  const update = {};

  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (field in input) {
      update[field] = input[field];
    }
  }

  update.updatedAt = new Date();
  update.updatedBy = input?.updatedBy ? new ObjectId(input.updatedBy) : null;

  return update;
}