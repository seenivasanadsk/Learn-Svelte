// src/lib/features/user/user.repository.js
import { getCollection } from '$lib/core/db';
import { addDeletableField } from '$lib/core/server/deletable';
import { ObjectId } from 'mongodb';

export const COLLECTION_NAME = 'users';
export const HIDE_FIELDS = {};
export const HEADERS = [
  { name: "Username", valuePath: 'username' },
  { name: "Email", valuePath: 'email' },
  { name: "Party", valuePath: 'partyName' },
  { name: "Substitute Party", valuePath: 'substitutePartyName' },
  { name: "Active", valuePath: 'isActive', align: 'center' },
  { name: "Deletable", valuePath: 'isDeletable', align: 'center' },
];

export async function getUsers(filter = {}) {
  const collection = await getCollection(COLLECTION_NAME);

  return await collection.aggregate([
    { $match: filter },

    // Lookup party names (only if your users have partyId field)
    {
      $lookup: {
        from: 'party',
        localField: 'partyId',
        foreignField: '_id',
        as: 'partyData'
      }
    },
    {
      $lookup: {
        from: 'party',
        localField: 'substitutePartyId',
        foreignField: '_id',
        as: 'substitutePartyData'
      }
    },

    // Add display fields
    {
      $addFields: {
        partyName: { $first: '$partyData.name' },
        substitutePartyName: { $first: '$substitutePartyData.name' }
      }
    },

    ...addDeletableField('users'), // Check if user can be deleted

    {
      $sort: {
        // Sort by appropriate field - adjust based on your schema
        username: 1
      }
    },

    {
      $project: {
        partyData: 0,
        substitutePartyData: 0,
        ...HIDE_FIELDS
      }
    }
  ]).toArray();
}

// Other user repository functions...
export async function getUserById(id) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmail(email) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ email });
}

export async function insertUser(data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.insertOne(data);
}

export async function updateUser(id, data) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

// Safe delete function for users
export async function deleteUser(id) {
  const { canDelete, usedIn } = await canDelete('users', id);

  if (!canDelete) {
    throw new Error(`Cannot delete user. It is referenced in: ${usedIn.join(', ')}`);
  }

  const collection = await getCollection(COLLECTION_NAME);
  return await collection.deleteOne({ _id: new ObjectId(id) });
}