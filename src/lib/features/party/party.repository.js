import { getCollection } from '$lib/core/db';
import { ObjectId } from 'mongodb';

export const COLLECTION_NAME = 'party';
export const HIDE_FIELDS = {}
export const HEADERS = [
  { name: "Name", valuePath: 'name', align: 'left' },
  { name: "Note", valuePath: 'note', align: 'left' },
  { name: "Created By", valuePath: 'createdBy' },
  { name: "Updated By", valuePath: 'updatedBy' },
  { name: "Active", valuePath: 'isActive' },
]

export async function getAllPartyNames() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection
    .find({ isActive: true }, { projection: { name: 1, _id: 1 } })
    .toArray();
}

export async function getPartyByPartyName(name) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ name: name });
}

export async function getPartyById(id) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(id) }, { projection: HIDE_FIELDS });
}

export async function updateParty(id, data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function getParty(filter = {}, projection = {}) {
  projection = { ...HIDE_FIELDS, ...projection }
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.find(filter, { projection }).toArray();
}

export async function getTotalPartyCount() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.estimatedDocumentCount();
}

export async function countParty(filter = {}) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.countDocuments(filter);
}