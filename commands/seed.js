// commands/seed.js

import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { getFilesName } from './helpers/utils.js';
import { blueText, greenText, redText, yellowText } from './helpers/formatText.js';
import { getCollection } from './helpers/db.js';

export const info = 'Seed data into the Database';

/**
 * Seeds all files inside the /seed directory.
 * @param {*} _flags - CLI flags (ignored, but required for CLI signature)
 * @param {boolean} fresh - If true, delete existing data before seeding.
 */
async function seed({ appPath }, fresh = false) {
  const seedFiles = getFilesName(appPath.seed);

  if (!Array.isArray(seedFiles) || seedFiles.length === 0) {
    console.log(redText('No seed files found in /seed directory.'));
    process.exit(1);
  }

  for (const fileName of seedFiles) {
    const modulePath = path.join(appPath.seed, fileName);
    const moduleURL = pathToFileURL(modulePath);

    const module = await import(moduleURL);
    const seedData = module?.seedData || [];

    const collectionName = fileName.replace('.js', '');

    await seedCollection(collectionName, seedData, fresh);
  }

  process.exit(0);
}

/**
 * Inserts seed data into a MongoDB collection.
 *
 * Modes:
 * - fresh=true  → Always clear collection before inserting.
 * - fresh=false → Skip collection if it already has data.
 */
async function seedCollection(collectionName, seedData, fresh) {
  try {
    const collection = await getCollection(collectionName);
    const existingCount = await collection.countDocuments();

    if (!fresh && existingCount > 0) {
      console.log(
        blueText(`⏭️  Skipping ${collectionName} (already contains ${existingCount} docs)`)
      );
      return;
    }

    if (fresh && existingCount > 0) {
      await collection.deleteMany({});
      console.log(yellowText(`🧹  Cleared ${collectionName} (${existingCount} docs removed)`));
    }

    console.log(yellowText(`Found totaly ${seedData.length} ${collectionName} records`));
    seedData = seedData.filter((s) => s);
    console.log(yellowText(`Valid Records: ${seedData.length} ${collectionName} records`));
    await collection.insertMany(seedData);
    console.log(greenText(`✅ Seeded ${collectionName} with ${seedData.length} documents`));
  } catch (error) {
    console.log(redText(`❌ Error seeding ${collectionName}: ${error.message}`));
  }
}

/** CLI command: forces fresh seeding */
export function fresh(_) {
  seed(_, true);
}

export default seed;
