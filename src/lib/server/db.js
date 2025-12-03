// src\lib\server\db.js
import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

// Load from ENV
const uri = env.MONGO_URI;
const dbName = env.MONGO_DB_NAME;

if (!uri) throw new Error('MONGO_URI is missing!');
if (!dbName) throw new Error('MONGO_DB_NAME is missing!');

// Singleton Mongo Client to avoid multiple connections
let client;
let clientPromise;

export function getMongoClient() {
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb() {
  const mongo = await getMongoClient();
  return mongo.db(dbName);
}

// Optional shortcuts
export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}
