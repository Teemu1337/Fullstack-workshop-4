// @ts-nocheck
// Import MongoDB client for connecting to Atlas.
const { MongoClient } = require('mongodb');
// Load environment variables from .env (expects MONGODB_URI).
require('dotenv').config();

// Application entry point.
async function main() {
	// Read Atlas connection string from environment variables.
	const uri = process.env.MONGODB_URI;
	// Create a MongoDB client instance.
	const client = new MongoClient(uri);

	try {
		// Open connection to MongoDB Atlas.
		await client.connect();
		console.log('Connected to the MongoDB cluster');

		// Create/update collection data for this exercise.
		await createStudentsData(client);
	} catch (e) {
		// Print any runtime/connection errors.
		console.error(e);
	} finally {
		// Always close connection before exiting.
		await client.close();
		console.log('Disconnected from the MongoDB cluster');
	}
}

// Start the script and catch top-level async errors.
main().catch(console.error);

/** @param {import('mongodb').MongoClient} client */
async function createStudentsData(client) {
	// Target database and collection required by the exercise.
	const db = client.db('opiskelijat');
	const collectionName = 'Fullstack2026';

	// Create collection only if it does not already exist.
	const exists = await db.listCollections({ name: collectionName }).toArray();
	if (exists.length === 0) {
		await db.createCollection(collectionName);
		console.log(`Created collection: ${collectionName}`);
	} else {
		console.log(`Collection already exists: ${collectionName}`);
	}

	const collection = db.collection(collectionName);

	// Seed data: 5 students with Laurea-format student IDs and emails.
	const students = [
		{ studentId: '2000001', firstName: 'Aino', lastName: 'Korhonen', email: 'aino.korhonen@student.laurea.fi', city: 'Helsinki' },
		{ studentId: '2000002', firstName: 'Mikko', lastName: 'Laine', email: 'mikko.laine@student.laurea.fi', city: 'Espoo' },
		{ studentId: '2000003', firstName: 'Sara', lastName: 'Virtanen', email: 'sara.virtanen@student.laurea.fi', city: 'Vantaa' },
		{ studentId: '2000004', firstName: 'Joonas', lastName: 'Niemi', email: 'joonas.niemi@student.laurea.fi', city: 'Turku' },
		{ studentId: '2000005', firstName: 'Emilia', lastName: 'Hakalo', email: 'emilia.hakalo@student.laurea.fi', city: 'Tampere' }
	];

	// Build idempotent upsert operations (no duplicate students on re-run).
	const operations = students.map((student) => ({
		updateOne: {
			filter: { studentId: student.studentId },
			update: { $set: student },
			upsert: true
		}
	}));

	// Execute all upserts in one bulk operation and report result.
	const result = await collection.bulkWrite(operations, { ordered: true });
	console.log(
		`Upsert complete in opiskelijat.${collectionName}: inserted=${result.upsertedCount}, updated=${result.modifiedCount}`
	);
}
