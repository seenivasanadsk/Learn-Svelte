import { getCollection } from '$lib/core/db';
import { ObjectId } from 'mongodb';

export const COLLECTION_NAME = 'party';
export const HIDE_FIELDS = {}
export const HEADERS = [
  { name: "Name", valuePath: 'name', align: 'left' },
  { name: "Note", valuePath: 'note', align: 'left' },
  { name: "Creater", valuePath: 'createdBy' },
  { name: "Updater", valuePath: 'updatedBy' },
  { name: "Active", valuePath: 'isActive' },
]

export async function getAllPartyNames() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection
    .find({ isActive: true }, { projection: { name: 1, _id: 1 } })
    .toArray();
}

export async function getPartyByPartyName(name, id) {
  const collection = await getCollection(COLLECTION_NAME);
  const filter = { name };
  if (id) {
    filter._id = { $ne: new ObjectId(id) };
  }
  return await collection.findOne(filter);
}

export async function getPartyById(id) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(id) }, { projection: HIDE_FIELDS });
}

export async function updateParty(id, data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function insertParty(data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.insertOne(data);
}

// export async function getParty(filter = {}, projection = {}) {
//   projection = { ...HIDE_FIELDS, ...projection }
//   const collection = await getCollection(COLLECTION_NAME);
//   return await collection.find(filter, { projection }).toArray();
// }

export async function getParty(filter = {}) {
  const collection = await getCollection(COLLECTION_NAME);

  return await collection.aggregate([
    { $match: filter },

    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdByUser'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'updatedBy',
        foreignField: '_id',
        as: 'updatedByUser'
      }
    },

    {
      $addFields: {
        createrName: { $first: '$createdByUser.username' },
        updaterName: { $first: '$updatedByUser.username' }
      }
    },

    {
      $project: {
        createdByUser: 0,
        updatedByUser: 0,
        ...HIDE_FIELDS
      }
    }
  ]).toArray();
}


export async function getTotalPartyCount() {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.estimatedDocumentCount();
}

export async function countParty(filter = {}) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.countDocuments(filter);
}