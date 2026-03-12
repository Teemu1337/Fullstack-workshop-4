// @ts-nocheck
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
	const uri = process.env.MONGODB_URI;
	const client = new MongoClient(uri);

	try {
		await client.connect();
		console.log('Connected to the MongoDB cluster');

		// Example 1: add one new student
		await addOneStudent(client, {
			studentId: '2000006',
			firstName: 'Noora',
			lastName: 'Lehtinen',
			email: 'noora.lehtinen@student.laurea.fi',
			city: 'Helsinki'
		});

		// Example 2: add many new students
		await addManyStudents(client, [
			{
				studentId: '2000007',
				firstName: 'Olli',
				lastName: 'Rantanen',
				email: 'olli.rantanen@student.laurea.fi',
				city: 'Espoo'
			},
			{
				studentId: '2000008',
				firstName: 'Helmi',
				lastName: 'Salonen',
				email: 'helmi.salonen@student.laurea.fi',
				city: 'Vantaa'
			}
		]);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
		console.log('Disconnected from the MongoDB cluster');
	}
}

main().catch(console.error);

/**
 * Add one student if studentId does not already exist.
 * @param {import('mongodb').MongoClient} client
 * @param {{studentId: string, firstName: string, lastName: string, email: string, city: string}} student
 */
async function addOneStudent(client, student) {
	const collection = client.db('opiskelijat').collection('Fullstack2026');

	const existing = await collection.findOne({ studentId: student.studentId });
	if (existing) {
		console.log(`Skipped existing studentId: ${student.studentId}`);
		return;
	}

	const result = await collection.insertOne(student);
	console.log(`Inserted one student with _id: ${result.insertedId}`);
}

/**
 * Add many students; inserts only those with new studentId values.
 * @param {import('mongodb').MongoClient} client
 * @param {Array<{studentId: string, firstName: string, lastName: string, email: string, city: string}>} students
 */
async function addManyStudents(client, students) {
	const collection = client.db('opiskelijat').collection('Fullstack2026');

	const studentIds = students.map((student) => student.studentId);
	const existingStudents = await collection.find({ studentId: { $in: studentIds } }).project({ studentId: 1, _id: 0 }).toArray();
	const existingIdSet = new Set(existingStudents.map((student) => student.studentId));

	const newStudents = students.filter((student) => !existingIdSet.has(student.studentId));

	if (newStudents.length === 0) {
		console.log('No new students to insert in addManyStudents');
		return;
	}

	const result = await collection.insertMany(newStudents, { ordered: true });
	console.log(`Inserted ${result.insertedCount} new students in addManyStudents`);
}
