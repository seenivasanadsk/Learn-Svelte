import { getCollection } from '$lib/core/db';
import { ObjectId } from 'mongodb';
import crypto from 'node:crypto';

export const COLLECTION_NAME = 'sessions';

export async function createSession(user, maxAge) {
  const collection = await getCollection(COLLECTION_NAME);

  const token = crypto.randomBytes(32).toString('hex');
  const expiredOn = new Date(new Date().setSeconds(maxAge));

  await collection.deleteOne({ userId: user._id });

  const sessionData = {
    token,
    userId: user._id,
    username: user.username,
    userRole: user.role,
    createdAt: new Date(),
    expiredOn
  };

  const result = await collection.insertOne(sessionData);

  if (result.acknowledged) return sessionData;
}

export async function findSessionByUsername(username) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ username });
}

export async function deleteSessionByTokenAndUserID(token, userId) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.deleteOne({ token, userId: new ObjectId(userId) });
}

export async function deleteSessionByUserId(userId) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.deleteMany({ userId: new ObjectId(userId) });
}

export async function findSessionByToken(token) {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ token });
}
