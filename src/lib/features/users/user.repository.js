import { getCollection } from '$lib/core/db';
import { ObjectId } from 'mongodb';

export const COLLECTION_NAME = 'users';
export const HIDE_FIELDS = { hashedPassword: 0 }
export const HEADERS = [
  { name: "Username", valuePath: 'username', align: 'left' },
  { name: "Role", valuePath: 'role', align: 'left' },
  { name: "Last Login", valuePath: 'lastLogin', display: 'datetime' },
  { name: "Last Access", valuePath: 'lastAccess', display: 'datetime' },
  { name: "Last Password Reset", valuePath: 'lastPasswordReset', display: 'datetime' },
  { name: "Last Logout", valuePath: 'lastLogout', display: 'datetime' },
  // { name: "Created At", valuePath: 'createdAt', display: 'datetime' },
  { name: "Created By", valuePath: 'createdBy' },
  // { name: "Updated At", valuePath: 'updatedAt', display: 'datetime' },
  { name: "Updated By", valuePath: 'updatedBy' },
  { name: "Active", valuePath: 'isActive' },
]

export async function getAllUsernames() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection
    .find({ isActive: true }, { projection: { username: 1, _id: 0 } })
    .toArray();
}

export async function getUserByUsername(username, getHasedPassword = false) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ username: username }, { projection: getHasedPassword ? {} : HIDE_FIELDS });
}

export async function getUserById(userId) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(userId) }, { projection: HIDE_FIELDS });
}

export async function changePassword(userId, hashedPassword) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { hashedPassword, lastPasswordReset: new Date() } });
}

export async function updateUser(id, data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function getUsers(filter = {}, projection = {}) {
  projection = { ...HIDE_FIELDS, ...projection }
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.find(filter, { projection }).toArray();
}

export async function getTotalUsers() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.estimatedDocumentCount();
}

export async function countUsers(filter = {}) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.countDocuments(filter);
}