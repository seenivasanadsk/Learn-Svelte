import { getCollection } from "$lib/core/db";

export const COLLECTION_NAME = 'users'

export async function getAllUsernames() {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.find(
    { isActive: true },
    { projection: { username: 1, _id: 0 } }
  ).toArray()
}

export async function getUserByUsername(username) {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.findOne({ username: username })
}