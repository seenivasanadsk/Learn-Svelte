import { getCollection } from "$lib/core/db";

export const COLLECTION_NAME = 'resetRequest';

export async function createResetRequest(resetRequest) {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.insertOne(resetRequest);
}