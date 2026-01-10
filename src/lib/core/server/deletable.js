// src/lib/utils/deletable.js
import { getCollection } from '$lib/core/db';
import { ObjectId } from 'mongodb';

// Define which collections reference other collections
const REFERENCE_MAP = {
  // For users collection - where is user ID referenced?
  users: [
    // If user IDs are referenced in party collection as createdBy/updatedBy
    { collection: 'party', fields: ['createdBy', 'updatedBy'] },
    // Add other collections that reference users if needed
  ],

  // For party collection - where is party ID referenced?
  party: [
    { collection: 'users', fields: ['partyId', 'substitutePartyId'] },
  ],
};

/**
 * Check if a document can be deleted
 * @param {string} collectionName - Name of your collection (e.g., 'party')
 * @param {string} documentId - ID of the document to check
 * @returns {Promise<{canDelete: boolean, usedIn: string[]}>}
 */
export async function canDelete(collectionName, documentId) {
  const references = REFERENCE_MAP[collectionName] || [];

  if (references.length === 0) {
    return { canDelete: true, usedIn: [] };
  }

  const id = new ObjectId(documentId);
  const usedIn = [];

  // Check each collection that might reference this document
  for (const ref of references) {
    const collection = await getCollection(ref.collection);

    // Build query: check if this ID exists in any of the reference fields
    const query = {
      $or: ref.fields.map(field => ({
        [field]: id
      }))
    };

    const exists = await collection.findOne(query, { projection: { _id: 1 } });

    if (exists) {
      usedIn.push(ref.collection);
    }
  }

  return {
    canDelete: usedIn.length === 0,
    usedIn
  };
}

/**
 * Add isDeletable field to your MongoDB aggregation
 * @param {string} collectionName - Collection name
 */
export function addDeletableField(collectionName) {
  const references = REFERENCE_MAP[collectionName] || [];

  if (references.length === 0) {
    return [
      {
        $addFields: {
          isDeletable: true
        }
      }
    ];
  }

  // Create aggregation stages for each reference
  const stages = references.map((ref, index) => ({
    $lookup: {
      from: ref.collection,
      let: { docId: '$_id' }, // This creates a variable docId with the current document's _id
      pipeline: [
        {
          $match: {
            $expr: {
              $or: ref.fields.map(field => {
                // For each field (like 'createdBy'), check if it equals docId
                return {
                  $eq: [
                    `$${field}`,  // This should be the field name in the referenced collection
                    '$$docId'     // This is the variable we created with let
                  ]
                };
              })
            }
          }
        },
        { $limit: 1 }
      ],
      as: `_ref${index}`
    }
  }));

  // Add the isDeletable field
  stages.push({
    $addFields: {
      isDeletable: {
        $and: references.map((_, index) => ({
          $eq: [{ $size: `$_ref${index}` }, 0]
        }))
      }
    }
  });

  // Clean up temporary fields
  stages.push({
    $project: {
      ...references.reduce((proj, _, index) => {
        proj[`_ref${index}`] = 0;
        return proj;
      }, {})
    }
  });

  return stages;
}