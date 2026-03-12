// @ts-nocheck
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
	const uri = process.env.MONGODB_URI;
	const client = new MongoClient(uri);

	try {
		await client.connect();
		console.log('Connected to the MongoDB cluster');

		// Example 1: update one student's city by studentId
		await updateOneStudent(client, '2000001', { city: 'Espoo' });

		// Example 2: update many students — set a new field for all students in a given city
		await updateManyStudents(client, { city: 'Espoo' }, { $set: { campus: 'Leppävaara' } });
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
		console.log('Disconnected from the MongoDB cluster');
	}
}

main().catch(console.error);

/**
 * Update one student document matched by studentId.
 * @param {import('mongodb').MongoClient} client
 * @param {string} studentId     - The studentId of the document to update.
 * @param {object} fieldsToUpdate - Fields and values to set, e.g. { city: 'Espoo' }.
 */
async function updateOneStudent(client, studentId, fieldsToUpdate) {
	const collection = client.db('opiskelijat').collection('Fullstack2026');

	// updateOne updates the first document matching the filter.
	const result = await collection.updateOne(
		{ studentId },          // filter: match by studentId
		{ $set: fieldsToUpdate } // update: set only the given fields
	);

	if (result.matchedCount === 0) {
		console.log(`No student found with studentId: ${studentId}`);
	} else {
		console.log(
			`updateOne — matched: ${result.matchedCount}, modified: ${result.modifiedCount} (studentId: ${studentId})`
		);
	}
}

/**
 * Update all student documents matching a filter.
 * @param {import('mongodb').MongoClient} client
 * @param {object} filter  - Query filter, e.g. { city: 'Espoo' }.
 * @param {object} update  - MongoDB update expression, e.g. { $set: { campus: 'Leppävaara' } }.
 */
async function updateManyStudents(client, filter, update) {
	const collection = client.db('opiskelijat').collection('Fullstack2026');

	// updateMany updates every document matching the filter.
	const result = await collection.updateMany(filter, update);

	console.log(
		`updateMany — matched: ${result.matchedCount}, modified: ${result.modifiedCount}`
	);
}
