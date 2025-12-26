import { getCollection } from "$lib/core/db";
import { ObjectId } from "mongodb";

export const COLLECTION_NAME = 'resetRequest';

export async function createResetRequest(resetRequest) {
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.insertOne(resetRequest);
}

export async function updateResetRequest(resetRequest, id) {
  const collection = await getCollection(COLLECTION_NAME);

  return await collection.updateOne(
    { _id: new ObjectId(id) },   // filter
    { $set: resetRequest }       // update
  );
}

export async function getOpenResetRequestByStatus() {
  const statusesToCheck = ['NEW', 'WAITING', 'APROVED'];
  const collection = await getCollection(COLLECTION_NAME)
  return await collection.findOne({ status: { $in: statusesToCheck } });
}