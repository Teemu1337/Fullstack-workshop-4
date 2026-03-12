require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const DB_NAME = 'opiskelijat';
const COLLECTION_NAME = 'Fullstack2026';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db(DB_NAME);

    // Drop collection first (if it exists)
    const collections = await db.listCollections({ name: COLLECTION_NAME }).toArray();
    if (collections.length > 0) {
      await db.collection(COLLECTION_NAME).drop();
      console.log(`Dropped collection: ${COLLECTION_NAME}`);
    } else {
      console.log(`Collection not found: ${COLLECTION_NAME}`);
    }

    // Drop database
    const droppedDb = await db.dropDatabase();
    console.log(droppedDb ? `Dropped database: ${DB_NAME}` : `Database not dropped: ${DB_NAME}`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

main();