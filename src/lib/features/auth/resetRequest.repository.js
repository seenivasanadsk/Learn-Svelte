import { getCollection } from "$lib/core/db";

export const COLLECTION_NAME = 'resetRequest';

export async function createResetRequest(resetRequest) {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.insertOne(resetRequest);
}

export async function findResetRequestByStatus(status) {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.findOne({ status });
}