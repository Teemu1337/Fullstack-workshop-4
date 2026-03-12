// @ts-nocheck
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
	const uri = process.env.MONGODB_URI;
	const client = new MongoClient(uri);

	try {
		await client.connect();
		console.log('Connected to the MongoDB cluster');

		// Example 1: find one student by name
		await findStudentByName(client, 'Aino', 'Korhonen');

		// Example 2: find all students by city
		await findStudentsByCity(client, 'Helsinki');
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
		console.log('Disconnected from the MongoDB cluster');
	}
}

main().catch(console.error);

/**
 * Find one document from opiskelijat.Fullstack2026 by first and last name.
 * @param {import('mongodb').MongoClient} client
 * @param {string} firstName
 * @param {string} lastName
 */
async function findStudentByName(client, firstName, lastName) {
	const db = client.db('opiskelijat');
	const collection = db.collection('Fullstack2026');

	const student = await collection.findOne({ firstName, lastName });

	if (student) {
		console.log('Student found:');
		console.log(student);
	} else {
		console.log(`No student found with name: ${firstName} ${lastName}`);
	}
}

/**
 * Find all documents from opiskelijat.Fullstack2026 by city.
 * @param {import('mongodb').MongoClient} client
 * @param {string} city
 */
async function findStudentsByCity(client, city) {
	const db = client.db('opiskelijat');
	const collection = db.collection('Fullstack2026');

	const students = await collection.find({ city }).toArray();

	if (students.length > 0) {
		console.log(`Students found in ${city}:`);
		console.log(students);
	} else {
		console.log(`No students found in city: ${city}`);
	}
}
